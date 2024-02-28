// Giriş sayfası içeriğini oluşturan fonksiyon
function loginAdd() {
    return `
    <title> Login </title>
        <div class="profil-backgraund">
            <div class="login">
           
            <form action="" method="get" id="auth-girisyapForm" class="auth-form">
                <h2>GİRİŞ YAP</h2>
                <label for="username" class="auth-label">Kullanıcı Adı</label>
                <input type="text" id="username" name="username" class="auth-input" required>
                <label for="id_password1" class="auth-label">Şifre</label>
                <input type="password" id="id_password1" name="password1" class="auth-input" required>
                <button type="submit" class="auth-button">Giriş Yap</button>
                <hr>
                <button type="submit" class="register-button" onclick="changePage('register')">KAYIT OL</button>
            </form>
            <hr>
            <button onclick="loginWithEcole42()" class="ecole42-login-btn">Ecole 42 ile Giriş Yap</button>
            </form>
        </div>

        </div>
    `;
}

let isLoggedIn = false; // Kullanıcı girişi durumunu takip etmek için global değişken

function loginSuccess() {
    isLoggedIn = true; // Kullanıcı giriş yaptı
    localStorage.setItem('isLoggedIn', 'true'); // Oturum durumunu localStorage'a kaydet
    changePage('redirect'); // Ana sayfaya yönlendir
}

function loginWithEcole42() {
    const client_id = 'u-s4t2ud-c61dbf9496f4cd97c24a0e1df99aa98bd56d9fa972d4ba6f7fce16704a824d0a'; // Ecole 42 uygulamanızın istemci kimliği
    const redirect_uri = 'http://localhost:443'; // Ecole 42 tarafından yetkilendirme sonrası yönlendirileceğiniz URI
    const scopes = 'public'; // İzin istediğiniz kapsamlar
    const authUrl = `https://api.intra.42.fr/oauth/authorize?client_id=${client_id}&redirect_uri=${encodeURIComponent(redirect_uri)}&response_type=code&scope=${encodeURIComponent(scopes)}`;

    window.location.href = authUrl;
}

// URL'de bir kod varsa (OAuth işlemi sonrası), giriş başarılı olarak kabul et
document.addEventListener('DOMContentLoaded', function () 
{

        if (window.location.search.includes('code=')) 
        {
                // Yetkilendirme kodunu URL'den çıkar
            const accessToken = new URLSearchParams(window.location.search).get('code');
            const cleanUrl = window.location.href.split('?')[0] + window.location.hash;
            window.history.replaceState(null, null, cleanUrl);
        
            // `accessToken` değişkenini kullanarak sunucu tarafında erişim token'ı almak için bir istek yapın
            loginSuccess();
            token(accessToken);
        }
        
});

function token(accessToken) { // accessToken parametresini kabul et
    const xhr = new XMLHttpRequest();
    xhr.open('POST', 'http://localhost:8000/api/add/');
    xhr.setRequestHeader('Content-Type', 'application/json');

    xhr.onreadystatechange = function () {
        if (xhr.readyState == 4) {
            if (xhr.status == 200) {
                const data = JSON.parse(xhr.responseText);
                if (data) 
                {
                    localStorage.setItem('username', data.result.login);
                    localStorage.setItem('profileImage', data.result.image.link);
                    localStorage.setItem('firstname', data.result.first_name);
                    localStorage.setItem('lastname', data.result.last_name);
                    localStorage.setItem('email', data.result.email);
                    localStorage.setItem('country', data.result.campus[0].country);
                    localStorage.setItem('city', data.result.campus[0].city);

                } 
                else {
                    alert('Error while processing the request.');
                }

            } else {
                alert('Error while processing the request.');
            }
        }
    };

    // accessToken'i doğru şekilde kullan
    const requestBody = JSON.stringify({ code: accessToken });
    xhr.send(requestBody);
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
function isLoginPage() {
    const pageHash = window.location.hash;
    return pageHash === '#login';

}

// Bu fonksiyonu sayfa yüklendiğinde veya bir sayfa değişikliği olduğunda çağırın
if (isLoginPage()) {
    let currentUrl = window.location.href; // Geçerli URL'yi al
    let formData = getQueryParams(currentUrl);

    // URL'deki sorgu parametrelerini temizle
    const cleanUrl = window.location.href.split('?')[0] + window.location.hash;
    window.history.replaceState(null, null, cleanUrl);

    if(formData && formData.hasOwnProperty('username') && formData.hasOwnProperty('password1'))
    {
        loginup(formData);
    }

}

function loginup(data) {
    var xhr = new XMLHttpRequest();
    xhr.open('POST', 'http://localhost:8000/api/loginup/', true);
    xhr.setRequestHeader('Content-Type', 'application/json;charset=UTF-8');

    xhr.onload = function() {
        if (xhr.status === 201) {
            // Yanıttan elde edilen veriyi ayrıştır
            var response = JSON.parse(xhr.responseText);
            // Kullanıcı verilerini localStorage'a ayrı ayrı kaydet
            localStorage.setItem('username', response.user.username);
            localStorage.setItem('firstname', response.user.first_name);
            localStorage.setItem('lastname', response.user.last_name);
            localStorage.setItem('email', response.user.email);
            localStorage.setItem('country', response.user.country);
            localStorage.setItem('city', response.user.city);
            localStorage.setItem('profileImage', response.user.profile_image_url);
            loginSuccess();
        } 
        else if (xhr.status === 400) {
            notpassword();
            changePage('login');
        }

        if (xhr.status === 404) {
            notuser();
            changePage('login');
        } 
    };

    let da = {
        username: data["username"],
        password: data["password1"]
    };
    xhr.send(JSON.stringify(da));
}

function notuser() {
    Swal.fire({
        title: 'Böyle Bir Kullanıcı Yok!',
        icon: 'error',
        confirmButtonText: 'Tamam',
        customClass: {
            popup: 'popupclass'
        }
    });
}

function notpassword() {
    Swal.fire({
        title: 'Şifreniz Yanlış!',
        icon: 'error',
        confirmButtonText: 'Tamam',
        confirmButtonColor: '#d33',
        customClass: {
            popup: 'popupclass'
        }
    });
}

