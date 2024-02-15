let isLoggedIn = false; // Kullanıcı girişi durumunu takip etmek için global değişken

function loginSuccess() {
    isLoggedIn = true; // Kullanıcı giriş yaptı
    localStorage.setItem('isLoggedIn', 'true'); // Oturum durumunu localStorage'a kaydet
    window.location.hash = 'home'; // Kullanıcıyı anasayfaya yönlendir
}

function loginWithEcole42() {
    const client_id = 'u-s4t2ud-c61dbf9496f4cd97c24a0e1df99aa98bd56d9fa972d4ba6f7fce16704a824d0a'; // Ecole 42 uygulamanızın istemci kimliği
    const redirect_uri = 'http://localhost:443'; // Ecole 42 tarafından yetkilendirme sonrası yönlendirileceğiniz URI
    const scopes = 'public'; // İzin istediğiniz kapsamlar
    const authUrl = `https://api.intra.42.fr/oauth/authorize?client_id=${client_id}&redirect_uri=${encodeURIComponent(redirect_uri)}&response_type=code&scope=${encodeURIComponent(scopes)}`;

    window.location.href = authUrl;
}

// Giriş sayfası içeriğini oluşturan fonksiyon
function loginAdd() {
    return `
        <div class="profil-backgraund">
            <div class="login">
                <h2>GİRİŞ YAP</h2>
                <button onclick="loginWithEcole42()">Ecole 42 ile Giriş Yap</button>
            </div>
        </div>
    `;
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
            token(accessToken);  
        }
        
});

function token(accessToken) { // accessToken parametresini kabul et
    const xhr = new XMLHttpRequest();
    xhr.open('POST', 'http://localhost:8000/api/add/', true);
    xhr.setRequestHeader('Content-Type', 'application/json');

    xhr.onreadystatechange = function () {
        if (xhr.readyState == 4) {
            if (xhr.status == 200) {
                const data = JSON.parse(xhr.responseText);
                console.log(data);
                if (data) 
                {
                    loginSuccess();
                    localStorage.setItem('firstname', data.result.first_name);
                    localStorage.setItem('lastname', data.result.last_name);
                    localStorage.setItem('email', data.result.email);
                    localStorage.setItem('username', data.result.login);
                    localStorage.setItem('profileImage', data.result.image.link);

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





