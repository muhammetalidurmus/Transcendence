var translations = {
  tr: {
    'titlelogin': 'GİRİŞ YAP',
    'login': 'GİRİŞ YAP',
    'usernick': 'KULLANICI ADI',
    'password': 'ŞİFRE',
    'login2': 'GİRİŞ YAP',
    'register': 'KAYIT OL',
    'ecolelogin': 'Ecole 42 ile Giriş Yap',
    'email': 'E-POSTA ADRESİ',
    'firstname': 'AD',
    'lastname': 'SOYAD',
    'country': 'ÜLKE',
    'city': 'ŞEHİR',
    'back': 'GERİ',
    'game': 'OYUN',
    'profilhome': 'PROFİL',
    'exit': 'ÇIKIŞ',
    'username': 'Kullanıcı Adı',
    'namesurname': 'Ad Soyad',
    'countrycity': 'Ülke / Şehir',
    'titleprofile': 'PROFİL',
    'profilemail': 'E-Posta',
    'rightplayer': 'Sol Oyuncu',
    'leftplayer': 'Sağ Oyuncu',
    "titleredirec": "Yönlendiriliyorsunuz...",
    "loginSuccess": "GİRİŞ BAŞARILI",
    "lowPassword": "Şifre en az 8 karakter uzunluğunda olmalı, en az bir büyük harf ve bir özel karakter içermelidir.",
    "successRegister": "Kayıt Başarılı, Giriş Yapabilirsiniz",
    "failRegister": "Kullanıcı Adı ya da E-posta Kullanılıyor",
    "noUser": "Böyle Bir Kullanıcı Yok!",
    "wrongPassword": "Şifreniz Yanlış!",
    "ok": "TAMAM",
    "startgame": "OYUNA BAŞLA",
    
  },
  en: {
    'titlelogin': 'LOGIN',
    'login': 'LOGIN',
    'usernick': 'USERNAME',
    'password': 'PASSWORD',
    'login2': 'LOGIN',
    'register': 'REGISTER',
    'ecolelogin': 'Login with Ecole 42',
    'email': 'EMAIL ADDRESS',
    'firstname': 'FIRST NAME',
    'lastname': 'LAST NAME',
    'country': 'COUNTRY',
    'city': 'CITY',
    'back': 'BACK',
    'game': 'GAME',
    'profilhome': 'PROFILE',
    'exit': 'EXIT',
    'username': 'User Name',
    'namesurname': 'Name Surname',
    'countrycity': 'Country / City',
    'titleprofile': 'PROFILE',
    'profilemail': 'E-Mail',
    'rightplayer': 'Right Player',
    'leftplayer': 'Left Player',
    "redirecting": "Redirecting...",
    "loginSuccess": "LOGIN SUCCESSFUL",
    "lowPassword": "The password must be at least 8 characters long and contain at least one uppercase letter and one special character.",
    "successRegister": "Registration Successful, You Can Login Now",
    "failRegister": "Username or Email is Already in Use",
    "noUser": "No Such User Exists!",
    "wrongPassword": "Your Password is Incorrect!",
    "ok": "OKEY",
    "startgame": "GAME START",
  },
  ru: {
    'titlelogin': 'ВХОД',
    'login': 'ВХОД',
    'usernick': 'ИМЯ ПОЛЬЗОВАТЕЛЯ',
    'password': 'ПАРОЛЬ',
    'login2': 'ВХОД',
    'register': 'РЕГИСТРАЦИЯ',
    'ecolelogin': 'Вход через Ecole 42',
    'email': 'ЭЛ. ПОЧТА',
    'firstname': 'ИМЯ',
    'lastname': 'ФАМИЛИЯ',
    'country': 'СТРАНА',
    'city': 'ГОРОД',
    'back': 'НАЗАД',
    'game': 'ИГРА',
    'profilhome': 'ПРОФИЛЬ',
    'exit': 'ВЫХОД',
    'username': 'Имя Пользователя',
    'namesurname': 'Имя Фамилия',
    'countrycity': 'Страна / Город',
    'titleprofile': 'ПРОФИЛЬ',
    'profilemail': 'Эл. Почта',
    'rightplayer': 'Правый Игрок',
    'leftplayer': 'Левый Игрок',
    "redirecting": "Перенаправление...",
    "loginSuccess": "ВХОД УСПЕШЕН",
    "lowPassword": "Пароль должен иметь длину не менее 8 символов и содержать хотя бы одну заглавную букву и один специальный символ.",
    "successRegister": "Регистрация успешна, теперь вы можете войти",
    "failRegister": "Имя пользователя или электронная почта уже используются",
    "noUser": "Такого пользователя не существует!",
    "wrongPassword": "Неверный пароль!",
    "ok": "окей",
    "startgame": "НАЧАТЬ ИГРУ",
  }
};
  
function changeLanguage(language) {
  document.querySelectorAll('[data-translate]').forEach(function(element) {
      var key = element.getAttribute('data-translate');
      element.textContent = translations[language][key];
  });
}

function language(language) {
  localStorage.setItem('selectedLanguage', language);
  changeLanguage(language);
}


// Tarayıcının varsayılan dil olarak form required msjlarını seçilen dile göre değiştirme
function setCustomValidationMessages(language) {
  const validationMessages = {
    en: {
      username: "Username is required.",
      password1: "Password is required.",
      email: "Email address is required.",
      first_name: "First name is required.",
      last_name: "Last name is required.",
      country_: "Country is required.",
      city_: "City is required."
    },
    tr: {
      username: "Kullanıcı adı zorunludur.",
      password1: "Şifre zorunludur.",
      email: "E-posta adresi zorunludur.",
      first_name: "Ad zorunludur.",
      last_name: "Soyad zorunludur.",
      country_: "Ülke zorunludur.",
      city_: "Şehir zorunludur."
    },
    ru: {
      username: "Имя пользователя обязательно.",
      password1: "Пароль обязателен.",
      email: "Адрес электронной почты обязателен.",
      first_name: "Имя обязательно.",
      last_name: "Фамилия обязательна.",
      country_: "Страна обязательна.",
      city_: "Город обязателен."
    }
  };

  document.querySelectorAll('.auth-input').forEach(input => {
    const fieldName = input.name;

    if (validationMessages[language][fieldName]) {

      input.oninvalid = function(event) {
        event.target.setCustomValidity(validationMessages[language][fieldName]);
      };
      input.oninput = function(event) {
        event.target.setCustomValidity('');
      };
    }
  });
}

const originalChangeLanguage = changeLanguage;
changeLanguage = function(language) {
  originalChangeLanguage(language);
  setCustomValidationMessages(language);
};
