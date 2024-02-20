function registerAdd() {
    return `
    <div class="profil-backgraund">
        <div class="login">
            
                <form action="" method="get" id="auth-registerForm" class="auth-form">
                    <h2>KAYIT OL</h2>
                    <label for="newUsername" class="auth-label">Kullanıcı Adı</label>
                    <input type="text" id="newUsername" name="newUsername" class="auth-input" required>
                    <label for="newPassword" class="auth-label">Şifre</label>
                    <input type="password" id="newPassword" name="newPassword" class="auth-input" required>
                    <label for="email" class="auth-label">E-posta Adresi</label>
                    <input type="email" id="email" name="email" class="auth-input" required>
                    <label for="fullName" class="auth-label">Ad Soyad</label>
                    <input type="text" id="fullName" name="fullName" class="auth-input" required>
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
    return pageHash === '#login' || pageHash === '#register';
}

// Bu fonksiyonu sayfa yüklendiğinde veya bir sayfa değişikliği olduğunda çağırın
if (isLoginPageOrRegisterPage()) {
    let currentUrl = window.location.href; // Geçerli URL'yi al
    let formData = getQueryParams(currentUrl);

    // URL'deki sorgu parametrelerini temizle
    const cleanUrl = window.location.href.split('?')[0] + window.location.hash;
    window.history.replaceState(null, null, cleanUrl);

    console.log(formData); // Konsolda form verilerini göster
}