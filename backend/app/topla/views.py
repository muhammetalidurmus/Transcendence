from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
import json
from django.shortcuts import render
import requests  # requests kütüphanesini içe aktarın
from .models import ecole
from django.contrib.auth.hashers import make_password
from django.contrib.auth.hashers import check_password 


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
def register(request):
    if request.method == 'POST':
        try:
            data = json.loads(request.body)
            print(data)

            # Kullanıcı adı veya e-posta adresi zaten var mı diye kontrol et
            if ecole.objects.filter(username=data['username']).exists():
                return JsonResponse({"error": "Bu kullanıcı adı zaten alınmış."}, status=400)
            if ecole.objects.filter(email=data['email']).exists():
                return JsonResponse({"error": "Bu e-posta adresiyle bir hesap zaten var."}, status=400)
            
            ecole.objects.create(
                username=data['username'],
                first_name=data['first_name'],
                last_name=data['last_name'],
                email=data['email'],
                country=data['country'],
                city=data['city'],
                password=make_password(data['password'])
            )
            
            return JsonResponse({"message": "Kullanıcı başarıyla oluşturuldu"}, status=201)
        except Exception as e:
            print(e)  # Hatanın ne olduğunu konsolda görmek için
            return JsonResponse({"error": str(e)}, status=400)
    else:
        return JsonResponse({"error": "Invalid request"}, status=400)
    

@csrf_exempt
def loginup(request):
    if request.method == 'POST':
        data = json.loads(request.body)
        username = data.get('username')
        password = data.get('password')  # Frontend'den alınan password alanı

        try:
            user = ecole.objects.get(username=username)
            if check_password(password, user.password):
                # Kullanıcının şifresi hariç tüm verilerini al
                user_data = {
                    "id": user.id,
                    "username": user.username,
                    "first_name": user.first_name,
                    "last_name": user.last_name,
                    "email": user.email,
                    "country": user.country,
                    "city": user.city
                }
                
                return JsonResponse({
                    "message": "Kullanıcı doğrulandı",
                    "user": user_data
                }, status=201)
            else:
                return JsonResponse({"error": "Kullanıcı adı veya şifre hatalı"}, status=400)
        except ecole.DoesNotExist:
            return JsonResponse({"error": "Kullanıcı bulunamadı"}, status=404)
    else:
        return JsonResponse({"error": "Invalid request"}, status=400)

def index(request):
    return render(request,'index.html')