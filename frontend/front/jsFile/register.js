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