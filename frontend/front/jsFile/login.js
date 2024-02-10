function loginAdd() {
    return `
     <div class="profil-backgraund">
            <title>GİRİŞ YAP - KAYIT OL</title>
        <div class="login">
        <form action="" method="get" id="girisyapForm">
            <h2>GİRİŞ YAP</h2>
            <hr>
            <label for="username">KULLANICI ADI</label>
            <input type="text" id="username" name="username" required>
            <hr>
            <label for="password">ŞİFRE</label>
            <input type="password" id="password" name="password" required>
            <button type="submit">Giriş Yap</button>
        </form>
        <hr>

    `;
}