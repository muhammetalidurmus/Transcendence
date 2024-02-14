from django.shortcuts import render, redirect
from django.contrib.auth import login, authenticate
from .forms import SignUpForm

def signup_view(request):
    if request.method == 'POST':
        form = SignUpForm(request.POST)
        if form.is_valid():
            user = form.save()
            login(request, user)
            return redirect('login')
    else:
        form = SignUpForm()
    return render(request, 'accounts/signup.html', {'form': form})

def login_view(request):
    if request.method == 'POST':
        username = request.POST['username']
        password = request.POST['password']
        user = authenticate(request, username=username, password=password)
        if user is not None:
            login(request, user)
            return redirect('success')
        else:
            # Hatalı giriş durumunda
            return render(request, 'accounts/login.html', {'error': 'Invalid login credentials'})
    return render(request, 'accounts/login.html')

def success_view(request):
    print("sfdsdf")
    username = request.user.username  # Şu anki kullanıcının kullanıcı adını al
    return render(request, 'accounts/success.html', {'username': username})


from django.http import HttpResponse

def home_view(request):
    return HttpResponse('<h1>Ana Sayfa</h1>')
