let isLoggedIn = false;
let intra = false;
/* 
JWT(JSON Web Token) 3 bölümden oluşur; başlık, bilgi ("payload") ve imza.
Bunlar '.' ile birbirinden ayrıştırılmıştır. İmza ya göre başlık ve bilgi
şifrelidir (www.jwt.io).

Aşağıdaki fonksiyon şifrelenmiş JWT'yi parametre olarak kabul eder, tokendeki
şifreli bilgiyi atob() ile ifşa eder. JSON.parse() ile de JSON formatına dönüştürür.

Fonksiyon JWT'deki bilgiyi JSON formatında eder.

FONKSİYON NE ZAMAN İHTİYAÇTIR: 
*/
function decodeJWT(token) {
    // Token'i split ederek ikinci bölümü al
    const tokenPayload = token.split('.')[1];

    // Base64 ile çöz ve JSON'a çevir
    const decodedToken = JSON.parse(atob(tokenPayload));

    return decodedToken;
}

function loginAdd() {
    return `
    <title data-translate="titlelogin"> LOGIN </title>
    <div class="profil-backgraund">
        
        <div class="login">
        <button class="language-selector" onclick="language('tr')">Turkish</button>
        <button class="language-selector" onclick="language('en')">English</button>
        <button class="language-selector" onclick="language('ru')">Russian</button>
    <hr>
            <form action="" method="get" id="auth-girisyapForm" class="auth-form">
                <h2 data-translate="login">LOGIN</h2>
                <label for="username" class="auth-label" data-translate="usernick">USERNAME</label>
                <input type="text" id="username" name="username" class="auth-input" required>
                <label for="id_password1" class="auth-label" data-translate="password">PASSWORD</label>
                <input type="password" id="id_password1" name="password1" class="auth-input" required>
                <button type="submit" class="auth-button" data-translate="login2">LOGIN</button>
                <hr>
                <button type="button" class="register-button" onclick="changePage('register')" data-translate="register">REGISTER</button>
            </form>
            <hr>
            <button onclick="loginWithEcole42()" class="ecole42-login-btn" data-translate="ecolelogin">Login with Ecole 42</button>
        </div>
    </div>
    `;
}

function loginSuccess() {

    isLoggedIn = true; // Kullanıcı giriş yaptı
    localStorage.setItem('isLoggedIn', true);
    changePage('redirect'); // Ana sayfaya yönlendir
}


//Aşağıdaki fonksiyon yalnızca başlangıç yetkilendirme URL'sini ve bir kod talebi oluşturur.
function loginWithEcole42() {

    // Backend tarafına istek atmamın sebebi 42 tarafından almış olduğum client id .env den alınıyor.
    var xhr = new XMLHttpRequest();
    xhr.open('GET', 'https://10.12.4.4/api/get_client_id/', true);
    xhr.setRequestHeader('Content-Type', 'application/json;charset=UTF-8');
    
    xhr.onload = function() {
        if (xhr.status >= 200 && xhr.status < 300) {
            const response = JSON.parse(xhr.responseText);
            const client_id = response.client_id;

            const redirect_uri = 'https://10.12.4.4/'; // Ecole 42 tarafından yetkilendirme/izinlendirme sonrası yönlendirileceğimiz URI
            const scopes = 'public'; // İzin istediğiniz kapsam
            const authUrl = `https://api.intra.42.fr/oauth/authorize?client_id=${client_id}&redirect_uri=${encodeURIComponent(redirect_uri)}&response_type=code&scope=${encodeURIComponent(scopes)}`;

            window.location.href = authUrl;
        } else {
            console.error('İstek başarısız. Durum kodu:', xhr.status);
        }
    };
    
    xhr.onerror = function() {
        console.error('İstek başarısız. Bağlantı hatası.');
    };
    
    xhr.send();
}

// URL'de bir kod varsa (OAuth işlemi sonrası), giriş başarılı olarak kabul et
/* 
Bu fonksiyon ecole 42'ye başarılı istemde bulunma sonrasını Ecole42'den gelen 
yanıtı yönetmektedir. Sonuç URL'den yetkilendirme kodunu ayıklar. Sonuç itibariyle
loginSuccess()'e yönlendirir. Elde edilen kod neticesinde kendi sunucumuzdan sürekli
izin için token talep eder.

*/

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
            token(accessToken);
        }
        if (window.location.search.includes('?username')) {
            let currentUrl = window.location.href;
            let formData = getQueryParams(currentUrl);
        
            // URL'deki sorgu parametrelerini temizle
            const cleanUrl = window.location.href.split('?')[0] + window.location.hash;
            window.history.replaceState(null, null, cleanUrl);
        
            if(formData && formData.hasOwnProperty('username') && formData.hasOwnProperty('password1'))
            {
                loginup(formData);
            }
        
        }
        
});

function getMe(jwtToken)
{
    const xhr = new XMLHttpRequest();
    xhr.open('POST', 'https://10.12.4.4/api/me/');
    xhr.setRequestHeader('Content-Type', 'application/json');

    xhr.onreadystatechange = function () {
        if (xhr.readyState == 4) {
            if (xhr.status == 200) {
                const data = JSON.parse(xhr.responseText);
                if (data) 
                {  
                    localStorage.setItem('username', data.result.username);
                    localStorage.setItem('profileImage', data.result.profileImage);
                    localStorage.setItem('firstname', data.result.first_name);
                    localStorage.setItem('lastname', data.result.last_name);
                    localStorage.setItem('email', data.result.email);
                    localStorage.setItem('country', data.result.country);
                    localStorage.setItem('city', data.result.city);
                    if(intra === true){
                        let prefixToRemove = 'https://10.12.4.4/media/https%3A/';
                        let httpsPrefix = 'https://';
                        let cleanedProfileImage = data.result.profileImage.replace(prefixToRemove, httpsPrefix);
                        localStorage.setItem('profileImage', cleanedProfileImage);
                        loginSuccess();
                    }
                    else {

                        localStorage.setItem('profileImage', 'https://i.hizliresim.com/6vuwh1q.jpg');
                        loginSuccess();
                    }
                
                    var check = localStorage.getItem('isLoggedIn');
                    if(check)
                    loginstatus();
                
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
    const requestBody = JSON.stringify({ jwt: jwtToken });
    xhr.send(requestBody);
}


/*
Bu fonksiyon Ecole 42'den elde edilen yetki kodunu, bizim sunucunun JWT tokeni ile
takas etmektedir. Elde edilen JWT token bilgileri cache'de - browswer local storage
de muhafaza edilmektedir.   

*/
function token(accessToken) { // accessToken (doğru kavram "yetki kodu" olmalı) parametresini kabul eder
    intra = true;
    const xhr = new XMLHttpRequest();   // XMLHttpRequest türünde bir nesne tanımlıyoruz. Sunucudan asenkron HTTP istemlerinde kullanılacaktır.
    xhr.open('POST', 'https://10.12.4.4/api/get_access_token/'); // Sunucunun /api/add "endpoint"ine bir POST istemi kurguluyoruz. Bu endpoint yüksek ihtimal yetki kodunu JWT ye takas edilmesi işlemini yönetecektir.
    xhr.setRequestHeader('Content-Type', 'application/json');   // İstem başlığında istem içeriğinin JSON formatında olacağını bildiriyoruz.

    xhr.onreadystatechange = function () {  //sunucuya iletilen istemler asenkron niteliktedir. UI sunucudan yanıt gelene kadar duraksamak yerine xhr sunucudan bilgi geldiğinde harekete geçmektedir.
                                            // sunucudan bilgi ulaştığında xhr istemi "açık"tan, "teslim almaktadır"a dönüşmektedir. Bu durumda function() tetiklenmektedir, tanımı parantez içidir. 
                                            //function() xhr'nin mevcut durumuna readystate metodundan erişmektedir. readystate'in alabileceği değerler; 0-Henüz istem gönderilmedi, 1-İstem açıldı
                                            //ancak henüz gönderilmedi, 2-sunucu yanıtının başlığı ulaştı ancak bilgi bölümü ulaşmadı, 3-Bil bölümü alınmaktadır ve 4-İstem neticelenmiştir.
        if (xhr.readyState == 4) {          //böylece istem tamamlandımı diye sorgulamış oluyoruz
            if (xhr.status == 200) {        //xhr nin status metodundan neticelenen istemin başarılı bir netice olup olmadığını kontrol ediyoruz
                const data = JSON.parse(xhr.responseText);  //Sunucunun başarılı yanıtına xhr nin responseText metodundan string olarak erişebiliyoruz. JSON.parse bunu JSON formatına dönüştürmekte
                                                            // ve data değişkenine atanmaktadır.
                if (data)                   // data nın bir değeri varsa
                {
                      // data.result 'un bizim beklediğimişz JSON tokeni olduğu varsayılmaktadır. Bunu cachte - browser'a ait local storage de jwtToken 
                                                                    // etiketi ile muhafaza ediyoruz.
                    
                    let jwtPayload = decodeJWT(data.result);
                    
                    if (jwtPayload.type == 1)
                    {
                        localStorage.setItem("loginToken", data.result);
                        loginSuccess();
                        getMe(data.result);
                    }
                    else if (jwtPayload.type == 2)
                    {
                        localStorage.setItem("2faToken", data.result);
                        changePage('2fa');
                        startCountdown();
                    }

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

function loginup(data) {
    var xhr = new XMLHttpRequest();
    xhr.open('POST', 'https://10.12.4.4/api/loginup/', true);
    xhr.setRequestHeader('Content-Type', 'application/json;charset=UTF-8');

    xhr.onload = function() {
        if (xhr.status === 200) {
            // Yanıttan elde edilen veriyi ayrıştır
            response = JSON.parse(xhr.responseText);

            // Kullanıcı verilerini localStorage'a ayrı ayrı kaydet
            let jwtPayload = decodeJWT(response.result);
            
            if (jwtPayload.type == 1) {
                localStorage.setItem("loginToken", response.result);
                loginSuccess();
                getMe(response.result);

            } else if (jwtPayload.type == 2) {
                localStorage.setItem("2faToken", response.result);
                changePage('2fa');
                startCountdown();
            }
        } else if (xhr.status === 400) {
            notpassword();
            changePage('login');
        } else if (xhr.status === 404) {
            notuser();
            changePage('login');
        } 
    };
    xhr.send(JSON.stringify(data));
}


