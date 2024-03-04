function registerAdd() {
    return `
    <title data-translate="register">Register</title>
    <div class="profil-backgraund">
        <div class="login">
            <form action="" method="get" id="auth-registerForm" class="auth-form">
                <h2 data-translate="register">REGISTER</h2>
                <label for="username" class="auth-label" data-translate="usernick">Username</label>
                <input type="text" id="username" name="username" class="auth-input" required>
                <label for="id_password1" class="auth-label" data-translate="password">Password</label>
                <input type="password" id="id_password1" name="password1" class="auth-input" required>
                <label for="email" class="auth-label" data-translate="email">Email Address</label>
                <input type="email" id="email" name="email" class="auth-input" required>
                <label for="first_name" class="auth-label" data-translate="firstname">First Name</label>
                <input type="text" id="first_name" name="first_name" class="auth-input" required>
                <label for="last_name" class="auth-label" data-translate="lastname">Last Name</label>
                <input type="text" id="last_name" name="last_name" class="auth-input" required>
                <label for="country_" class="auth-label" data-translate="country">Country</label>
                <input type="text" id="country_" name="country_" class="auth-input" required>
                <label for="city_" class="auth-label" data-translate="city">City</label>
                <input type="text" id="city_" name="city_" class="auth-input" required>
                <button type="submit" class="auth-button" data-translate="register">REGISTER</button>
            </form>
        </div>
        <div id="back-button-container" onclick="changePage('home')">
        <button id="back-button" data-translate="back">Back</button>
        </div>
    </div>
    `;
}

function getQueryParams(url) {
    let queryParams = {};
    // URL'den sorgu dizgisini ayrıştırma
    let queryString = url.split('?')[1];
    if (queryString) {
        queryString = queryString.split('#')[0]; // Fragment identifier'ı kaldır
        let params = queryString.split('&');
        params.forEach(param => {
            let [key, value] = param.split('=');
            queryParams[decodeURIComponent(key)] = decodeURIComponent(value.replace(/\+/g, ' '));
        });
    }
    const cleanUrl = window.location.href.split('?')[0] + window.location.hash;
    window.history.replaceState(null, null, cleanUrl);

    return queryParams;
}

// URL'den sayfanın hash kısmını kontrol eden fonksiyon
function isLoginPageOrRegisterPage() {
    const pageHash = window.location.hash;
    return pageHash === '#register';

}

// Bu fonksiyonu sayfa yüklendiğinde veya bir sayfa değişikliği olduğunda çağırın
if (isLoginPageOrRegisterPage()) {
    let currentUrl = window.location.href; // Geçerli URL'yi al
    let formData = getQueryParams(currentUrl);

    // URL'deki sorgu parametrelerini temizle
    const cleanUrl = window.location.href.split('?')[0] + window.location.hash;
    window.history.replaceState(null, null, cleanUrl);

    if(formData && formData.hasOwnProperty('username') && formData.hasOwnProperty('password1'))
    {
        signup(formData);
    }
}

function signup(data) {
    var xhr = new XMLHttpRequest();
    xhr.open('POST', 'http://localhost:8000/api/register/', true);
    xhr.setRequestHeader('Content-Type', 'application/json;charset=UTF-8');

    xhr.onload = function() {

        var response = JSON.parse(xhr.responseText);

        if(xhr.status === 201)
        {
             successregister();
              changePage("login");
        }
        if(response.error_code === 'passwordlow')
        {
            lowpassword();
             changePage("register");
        }
        if(response.error_code === 'user_exists_in_42' || response.error_code === 'username_taken' ||response.error_code === 'email_taken')
        {
            failregister();
            changePage("register");
        }   
    };

    let da = {
        username: data["username"],
        first_name: data["first_name"],
        last_name: data["last_name"],
        email: data["email"],
        password: data["password1"],
        country: data["country_"],
        city: data["city_"]
    };
    xhr.send(JSON.stringify(da));
}

function successregister() {
    var selectedLanguage = localStorage.getItem('selectedLanguage') || 'tr';
    Swal.fire({
        title: translations[selectedLanguage]['successRegister'],
        icon: 'success',
        confirmButtonText: translations[selectedLanguage]['ok'],
        confirmButtonColor: '#d33',
        customClass: {
            popup: 'popupclass'
        }
    });
}

function failregister() {
    var selectedLanguage = localStorage.getItem('selectedLanguage') || 'tr';
    Swal.fire({
        title: translations[selectedLanguage]['failRegister'],
        icon: 'error',
        confirmButtonText: translations[selectedLanguage]['ok'],
        confirmButtonColor: '#d33',
        customClass: {
            popup: 'popupclass'
        }
    });
}

function lowpassword() {
    var selectedLanguage = localStorage.getItem('selectedLanguage') || 'tr';
    var message = translations[selectedLanguage]['lowPassword'];

    Swal.fire({
        title: message,
        icon: 'error',
        confirmButtonText: translations[selectedLanguage]['ok'],
        confirmButtonColor: '#d33',
        customClass: {
            popup: 'popupclass'
        }
    });
}
