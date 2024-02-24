function registerAdd() {
    return `
    <div class="profil-backgraund">
        <div class="login">
            
                <form action="" method="get" id="auth-registerForm" class="auth-form">
                    <h2>KAYIT OL</h2>
                    <label for="username" class="auth-label">Kullanıcı Adı</label>
                    <input type="text" id="username" name="username" class="auth-input" required>
                    <label for="id_password1" class="auth-label">Şifre</label>
                    <input type="password" id="id_password1" name="password1" class="auth-input" required>
                    <label for="email" class="auth-label">E-posta Adresi</label>
                    <input type="email" id="email" name="email" class="auth-input" required>
                    <label for="first_name" class="auth-label">Ad</label>
                    <input type="text" id="first_name" name="first_name" class="auth-input" required>
                    <label for="last_name" class="auth-label">Soyad</label>
                    <input type="text" id="last_name" name="last_name" class="auth-input" required>
                    <button type="submit" class="auth-button">KAYIT OL</button>
                </form>
         </div>

            <div id="back-button-container"onclick="changePage('login')">
            <button id="back-button">Back</button>
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

    signup(formData);
}

function signup(data) {
    var xhr = new XMLHttpRequest();
    xhr.open('POST', 'http://localhost:8000/api/register/', true);
    xhr.setRequestHeader('Content-Type', 'application/json;charset=UTF-8');

    xhr.onload = function() {
        if (xhr.status === 201) {
            alert("Kayıt Başarılı : ");
            //changePage("login");
        }
        // if (xhr.status === 2233) {
        //     alert("Kullanıcı adı veya eposta kullanılıyor : ");
        //}
         else {
            console.error('Hata:', xhr.responseText);
        }
    };

    let da = {
        username: data["username"],
        first_name: data["first_name"],
        last_name: data["last_name"],
        email: data["email"],
        password: data["password1"]
    };
    xhr.send(JSON.stringify(da));
}

