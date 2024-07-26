from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
import json
from django.shortcuts import render
import requests  # requests kütüphanesini içe aktarın
from .models import ecole
from django.contrib.auth.hashers import make_password
from django.contrib.auth.hashers import check_password 
from django.core.files.base import ContentFile
from django.conf import settings
import base64
import re
import jwt
from django.contrib.auth.models import User
from rest_framework.exceptions import AuthenticationFailed
from django.shortcuts import render, redirect, HttpResponseRedirect
import jwt
from datetime import datetime, timedelta
import random
from django.core.mail import send_mail
import os
from dotenv import load_dotenv
load_dotenv()

tempkey = os.getenv('JWTKEY')

@csrf_exempt
def is_password_valid(password):
    if len(password) < 8:
        return False
    if not re.search("[A-Z]", password):
        return False
    if not re.search("[!+@#$%^&*(),.?\":{}|<>]", password):
        return False
    return True

@csrf_exempt
def register(request):
    if request.method == 'POST':
            data = json.loads(request.body)
            username = data['username']
            password = data['password']
                
            # 42 API'sini kullanarak kullanıcı adının var olup olmadığını kontrol et
            user_exists_in_42 = check_user_in_42_api(username)
            if user_exists_in_42:
               return JsonResponse({"error_code": "user_exists_in_42", "error_message": "Bu kullanıcı adı 42 sisteminde zaten var."})

            # Kullanıcı adı veya e-posta adresi zaten var mı diye kontrol et
            if ecole.objects.filter(username=username).exists():
                return JsonResponse({"error_code": "username_taken", "error_message": "Bu kullanıcı adı zaten alınmış."})
            if ecole.objects.filter(email=data['email']).exists():
                return JsonResponse({"error_code": "email_taken", "error_message": "Bu e-posta adresiyle bir hesap zaten var."})
            if not is_password_valid(password):
                return JsonResponse({"error_code": "passwordlow", "error_message": "Şifre en az 8 karakter uzunluğunda olmalı, en az bir büyük harf ve bir özel karakter içermelidir."})

            # Kullanıcıyı kaydet
            ecole.objects.create(
                username=username,
                first_name=data['first_name'],
                last_name=data['last_name'],
                email=data['email'],
                country=data['country'],
                city=data['city'],
                password=make_password(data['password']),
            )
            return JsonResponse({"message": "Kullanıcı başarıyla oluşturuldu"}, status=201)
    

@csrf_exempt
def loginup(request):
    if request.method == 'POST':
        data = json.loads(request.body)
        username = data.get('username')
        password = data.get('password1')

        try:
            user = ecole.objects.get(username=username)
            
            if check_password(str(password), str(user.password)):
                logintrue(username)
                
                if user.enable2f == True:
                    randint = random.randint(1000, 9999)
                    #def send_email(subject, message, recipient_list):
                    send_email("Transcendence Verification Code", "Ur Code Is " + str(randint), user.email)
                    print(randint)
                    user.two_factor_code = randint
                    user.save()
                    jwtToken = generate_jwt({"username": username, "type": 2}, tempkey, 1)
                    return JsonResponse({"status": "2f", "result": jwtToken})
                jwtToken = generate_jwt({"username": username, "type": 1}, tempkey, 60)
                print("PRINTING: " + jwtToken)
                return JsonResponse({"status": "jwt", 'result': jwtToken})
            else:
                return JsonResponse({"error": "Kullanıcı adı veya şifre hatalı"}, status=400)
        except ecole.DoesNotExist:
            return JsonResponse({"error": "Kullanıcı bulunamadı"}, status=404)
    else:
        return JsonResponse({"error": "Invalid request"}, status=400)

@csrf_exempt
def gettoken():
    token_url = 'https://api.intra.42.fr/oauth/token'
    client_id = os.getenv('Eclient_id')
    client_secret = os.getenv('Eclient_secret')
    data = {
        'grant_type': 'client_credentials',
        'client_id': client_id,
        'client_secret': client_secret,
    }
    response = requests.post(token_url, data=data)
    if response.status_code == 200:
        return response.json().get('access_token')
    else:
        raise Exception("Access token could not be retrieved")
    
@csrf_exempt
def check_user_in_42_api(username):
    access_token = gettoken()
    if access_token:
        user_info_url = f'https://api.intra.42.fr/v2/users/{username}'
        headers = {'Authorization': f'Bearer {access_token}'}
        response = requests.get(user_info_url, headers=headers)
        if response.status_code == 200:
            # Kullanıcı bulundu
            return True
        elif response.status_code == 404:
            # Kullanıcı bulunamadı
            return False
        else:
            raise Exception("API request failed with status code: {}".format(response.status_code))
    else:
        raise Exception("Failed to get access token")
   
# @csrf_exempt
# def update_profile_image(request):
#     if request.method == 'POST':
#         # request'ten gelen JSON verisini yükle
#         data = json.loads(request.body)
#         username = data.get('username')
#         image_data = data.get('image')

#         # Base64 kodlanmış resim verisini Django ImageField ile uyumlu hale getir
#         format, imgstr = image_data.split(';base64,')
#         ext = format.split('/')[-1]

#         # Kullanıcıyı bul
#         user = ecole.objects.get(username=username)

#         # Resim dosyasını ve dosya adını oluştur
#         image_file = ContentFile(base64.b64decode(imgstr), name=f'{user.username}.{ext}')

#         # Kullanıcının profil resmini güncelle
#         user.profile_image = image_file
#         user.save()

#         # Başarılı bir yanıt dön
#         return JsonResponse({'status': 'success', 'message': 'Profile image updated successfully.'})
#     else:
#         # Yanlış istek tipi için hata mesajı dön
#         return JsonResponse({'status': 'error', 'message': 'Invalid request'}, status=400)
    
def index(request):
    return render(request,'index.html')

@csrf_exempt
def get_access_token(request):
    if request.method == 'POST':
        data = json.loads(request.body)
        authorization_code = data.get('code')  # Frontend'den gelen yetkilendirme kodu
        if authorization_code:
            # Yetkilendirme kodunu kullanarak access_token al
            token_url = 'https://api.intra.42.fr/oauth/token'
            client_id = os.getenv('Eclient_id')
            client_secret = os.getenv('Eclient_secret')
            redirect_uri = 'https://10.12.4.4/'
            grant_type = 'authorization_code'
            
            token_data = {
                'grant_type': grant_type,
                'client_id': client_id,
                'client_secret': client_secret,
                'code': authorization_code,
                'redirect_uri': redirect_uri
            }
            token_response = requests.post(token_url, data=token_data)
            if token_response.status_code == 200:
                token_info = token_response.json()
                access_token = token_info.get('access_token')

                # Access token ile kullanıcı bilgilerini al
                user_info_url = 'https://api.intra.42.fr/v2/me'
                headers = {'Authorization': f'Bearer {access_token}'}
                user_response = requests.get(user_info_url, headers=headers)
                
                if user_response.status_code == 200:
                    user_data = user_response.json()
                    user_exists = ecole.objects.filter(username=user_data['login']).exists()# Kullanıcı adıyla veritabanını kontrol et eğer bu kullanıcı yoksa veritabanına kaydet.
                    if user_exists:
                        logintrue(user_data['login'])
                    if not user_exists:
                        ecole.objects.create(
                        username=user_data['login'],
                        first_name=user_data['first_name'],
                        last_name=user_data['last_name'],
                        email=user_data['email'],
                        country=user_data['campus'][0]['country'],
                        city=user_data['campus'][0]['city'],
                        profile_image=user_data['image']['link'],
                        loginIn=True,
                    )
                    else:
                        user = ecole.objects.get(username=user_data['login'])
                        if user.enable2f == True:
                            randint = random.randint(1000, 9999)
                            #def send_email(subject, message, recipient_list):
                            send_email("Transcendence Verification Code", "Ur Code Is " + str(randint), user_data['email'])
                            print(randint)
                            user.two_factor_code = randint
                            user.save()
                            jwtToken = generate_jwt({"username": user_data["login"], "type": 2}, tempkey, 1)
                            return JsonResponse({"status": "2f", "result": jwtToken})

                    jwtToken = generate_jwt({"username": user_data["login"], "type": 1}, tempkey, 60)
                    print("PRINTING: " + jwtToken)
                    return JsonResponse({"status": "jwt", 'result': jwtToken})
                else:
                    return JsonResponse({'error': 'Failed to fetch user data', 'status_code': user_response.status_code})
            else:
                return JsonResponse({'error': 'Failed to obtain access token', 'status_code': token_response.status_code})
        else:
            return JsonResponse({'error': 'No authorization code provided'})

    else:
        return JsonResponse({'error': 'Invalid request method'})


##Oymsk
def generate_jwt(payload, secretKey, expiration_minutes):
    # Expiration süresi hesaplanıyor
    expiration_time = datetime.utcnow() + timedelta(minutes=expiration_minutes)

    # Payload'a 'exp' (expiration) alanı ekleniyor
    payload['exp'] = expiration_time

    # JWT oluşturuluyor
    return jwt.encode(payload, secretKey, algorithm='HS256')


def validate_jwt(token, secretKey):
    try:
        payload = jwt.decode(token, secretKey, algorithms=['HS256'])
        user = ecole.objects.get(username=payload['username'])
        return payload, user
    except jwt.ExpiredSignatureError:
        raise AuthenticationFailed('JWT token süresi doldu.')
    except jwt.InvalidTokenError:
        raise AuthenticationFailed('Geçersiz JWT token.')
    except User.DoesNotExist:
        raise AuthenticationFailed('Kullanıcı bulunamadı.')

# sunucu tokene bakarak kullanın kimliliğini belirliyor. Bu görevi me fonksiyonu icra ediyor.json dönüyoruz.
# {
#   "jwt": "dsadasdasdasd"
# }
#
#
    
@csrf_exempt
def me(request):
    if request.method == 'POST':
        data = json.loads(request.body)
        jwtToken = data.get("jwt")
        payload, user = validate_jwt(jwtToken, tempkey)
        if payload.get("type") != 1: #login token degilse fail dondurur (token 2fa token de olabilir!)
            return JsonResponse({'result': "fail"})
        user_json = {
            'username': user.username,
            'profileImage': "https://10.12.4.4" + user.profile_image.url,
            'first_name': user.first_name,
            'last_name': user.last_name,
            'email': user.email,
            'country': user.country,
            'city': user.city
        }
        print("deneme",user_json)
        return JsonResponse({'result': user_json})

@csrf_exempt
def setTwoFactor(request):
    if request.method == "POST":
        data = json.loads(request.body)
        jwtToken = data.get("jwt")
        state = data.get("state")

        # JWT doğrulama
        payload, user = validate_jwt(jwtToken, tempkey)
        if payload.get("type") != 1: #login token degilse fail dondurur (token 2fa token de olabilir!)
            return JsonResponse({'result': "fail"})
        if user:
            # Kullanıcıyı bul ve enable2f değerini güncelle
            try:
                user_instance = ecole.objects.get(username=user.username)
                user_instance.enable2f = state
                user_instance.save()

                return JsonResponse({"message": "Enable2f successfully updated."}) 
            except ecole.DoesNotExist:
                return JsonResponse({"error": "User not found."}, status=404)
            except Exception as e:
                return JsonResponse({"error": str(e)}, status=500)
        else:
            return JsonResponse({"error": "JWT validation failed."}, status=401)

    return JsonResponse({"error": "Invalid request method."}, status=405)

@csrf_exempt
def validateTwoFactor(request):
    if request.method == "POST":
        data = json.loads(request.body)
        jwtToken = data.get("jwt")
        code = data.get("code")

        payload, user = validate_jwt(jwtToken, tempkey)
        if payload.get("type") != 2: #2fa token degilse fail dondurur (token login token de olabilir!)
            return JsonResponse({'result': "fail"})
        
        if user:
            try:
                user_instance = ecole.objects.get(username=payload.get("username"))
                #if user_instance.two_factor_retry > 2:
                #    return JsonResponse({"status": "fail", "message": "cok fazla deneme yaptınız hesabınız askida"})
                if str(code) == str(user_instance.two_factor_code):
                    logintrue(user_instance.username)
                    loginToken = generate_jwt({"username": user_instance.username, "type": 1}, tempkey, 60)
                    return JsonResponse({"status": "success", "loginToken": loginToken})
                else:
                    #user_instance.two_factor_retry = int(user_instance.two_factor_retry) + 1
                    return JsonResponse({"status": "fail", "message": "non-matching code"}) 
                
            except ecole.DoesNotExist:
                return JsonResponse({"error": "User not found."}, status=404)
            except Exception as e:
                return JsonResponse({"error": str(e)}, status=500)
        else:
            return JsonResponse({"error": "JWT validation failed."}, status=401)
    return JsonResponse({"error": "Invalid request method."}, status=405)


def send_email(subject, message, recipient):
    recipient_list = []
    recipient_list.append(recipient) 
    # E-posta gönderme işlemi
    send_mail(
        subject,    # E-posta konusu
        message,    # E-posta içeriği
        'fedailer.transcendence@gmail.com',  # Gönderen e-posta adresi
        recipient_list,  # Alıcıların e-posta adresleri
        fail_silently=False,  # Hata oluştuğunda sessizce başarısız olma (False ile hata gösterilir)
    )

@csrf_exempt
def exituser(request):
    if request.method == 'POST':
        try:
            data = json.loads(request.body)
            username = data.get('username')
            
            # Kullanıcıyı bulma işlemi
            user = ecole.objects.get(username=username)
            user.loginIn = 'False'
            user.save()

            return JsonResponse({"message": "ÇIKIŞ YAPILDI"}, status=201)
        except ecole.DoesNotExist:
            # Kullanıcı bulunamazsa
            return JsonResponse({"error": "Kullanıcı bulunamadı"}, status=404)
        except Exception as e:
            return JsonResponse({"error": str(e)}, status=400)
    else:
        return JsonResponse({"error": "Geçersiz istek"}, status=400)

@csrf_exempt
def loginstatus(request):
    if request.method == 'POST':
        try:
            data = json.loads(request.body)
            username = data.get('username')
            
            user = ecole.objects.get(username=username)
            
            if user.loginIn == 'True':
                return JsonResponse({}, status=200)
            else:
                return JsonResponse({}, status=201)
        except ecole.DoesNotExist:
            return JsonResponse({"error": "Kullanıcı bulunamadı"}, status=404)
        except Exception as e:
            return JsonResponse({"error": str(e)}, status=400)
    else:
        return JsonResponse({"error": "Geçersiz istek"}, status=400)
    
def logintrue(username):
    user = ecole.objects.get(username=username)
    user.loginIn = 'True'
    user.save()

def loginfalse(username):
    user = ecole.objects.get(username=username)
    user.loginIn = 'False'
    user.save()

def get_client_id(request):
    client_id = os.getenv('Eclient_id')
    return JsonResponse({'client_id': client_id})
