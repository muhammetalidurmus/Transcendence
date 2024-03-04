from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
import json
from django.shortcuts import render
import requests
from .models import ecole
from django.contrib.auth.hashers import make_password
from django.contrib.auth.hashers import check_password 
from django.core.files.base import ContentFile
from django.conf import settings
import base64
import re

@csrf_exempt
def get_access_token(request):
    if request.method == 'POST':
        data = json.loads(request.body)
        authorization_code = data.get('code')  # Frontend'den gelen yetkilendirme kodu
        if authorization_code:
            # Yetkilendirme kodunu kullanarak access_token al
            token_url = 'https://api.intra.42.fr/oauth/token'
            client_id = 'u-s4t2ud-c61dbf9496f4cd97c24a0e1df99aa98bd56d9fa972d4ba6f7fce16704a824d0a'
            client_secret = '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'
            redirect_uri = 'http://localhost:443'
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
                        loginIn=True,
                    )
                    return JsonResponse({'result': user_data})
                else:
                    return JsonResponse({'error': 'Failed to fetch user data', 'status_code': user_response.status_code})
            else:
                return JsonResponse({'error': 'Failed to obtain access token', 'status_code': token_response.status_code})
        else:
            return JsonResponse({'error': 'No authorization code provided'})

    else:
        return JsonResponse({'error': 'Invalid request method'})
    
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
                password=make_password(data['password'])
            )
            return JsonResponse({"message": "Kullanıcı başarıyla oluşturuldu"}, status=201)
    

@csrf_exempt
def loginup(request):
    if request.method == 'POST':
        data = json.loads(request.body)
        username = data.get('username')
        password = data.get('password')  # Frontend'den alınan password alanı

        try:
            user = ecole.objects.get(username=username)
            if check_password(password, user.password):
                # Kullanıcının profil resminin tam URL'sini oluştur
                profile_image_url = str('http://localhost:8000/') + settings.MEDIA_URL + str(user.profile_image)
                logintrue(username)
                
                # Kullanıcının şifresi hariç tüm verilerini al
                user_datas = {
                    "id": user.id,
                    "username": user.username,
                    "first_name": user.first_name,
                    "last_name": user.last_name,
                    "email": user.email,
                    "country": user.country,
                    "city": user.city,
                    "profile_image_url": profile_image_url,
                }
                
                return JsonResponse({"message": "Kullanıcı doğrulandı", "user": user_datas}, status=201)
            else:
                return JsonResponse({"error": "Kullanıcı adı veya şifre hatalı"}, status=400)
        except ecole.DoesNotExist:
            return JsonResponse({"error": "Kullanıcı bulunamadı"}, status=404)
    else:
        return JsonResponse({"error": "Invalid request"}, status=400)

@csrf_exempt
def gettoken():
    token_url = 'https://api.intra.42.fr/oauth/token'
    client_id = 'u-s4t2ud-c61dbf9496f4cd97c24a0e1df99aa98bd56d9fa972d4ba6f7fce16704a824d0a'
    client_secret = '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'
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
   
@csrf_exempt
def update_profile_image(request):
    if request.method == 'POST':
        # request'ten gelen JSON verisini yükle
        data = json.loads(request.body)
        username = data.get('username')
        image_data = data.get('image')

        # Base64 kodlanmış resim verisini Django ImageField ile uyumlu hale getir
        format, imgstr = image_data.split(';base64,')
        ext = format.split('/')[-1]

        # Kullanıcıyı bul
        user = ecole.objects.get(username=username)

        # Resim dosyasını ve dosya adını oluştur
        image_file = ContentFile(base64.b64decode(imgstr), name=f'{user.username}.{ext}')

        # Kullanıcının profil resmini güncelle
        user.profile_image = image_file
        user.save()

        # Başarılı bir yanıt dön
        return JsonResponse({'status': 'success', 'message': 'Profile image updated successfully.'})
    else:
        # Yanlış istek tipi için hata mesajı dön
        return JsonResponse({'status': 'error', 'message': 'Invalid request'}, status=400)
    

def logintrue(username):
    user = ecole.objects.get(username=username)
    user.loginIn = 'True'
    user.save()

def loginfalse(username):
    user = ecole.objects.get(username=username)
    user.loginIn = 'False'
    user.save()

    
def index(request):
    return render(request,'index.html')

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

