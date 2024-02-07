function loginAdd() {
    return `
            <title>GİRİŞ YAP - KAYIT OL</title>
            <style>
            body {
                font-family:Arial;
                display: flex;
                align-items: center;
                justify-content: center;
                height: 100vh;
                margin: 0;
                color: rgb(0, 0, 0);
                background-color: rgb(170, 170, 157);
            }

            .container {
                background-color: #fff;
                padding: 20px;
                border-radius: 8px;
                box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
                width: 300px;
                text-align: center;
                
            }

            form {
                display: flex;
                flex-direction: column;
                gap: 10px;
            }

            label {
                font-weight: bold;
            }

            input {
                padding: 8px;
                border: 1px solid #ccc;
                border-radius: 4px;
            }

            button {
                background-color: #4caf50;
                color: #fff;
                padding: 10px;
                border: none;
                border-radius: 4px;
                cursor: pointer;
                font-size: 16px;
            }

            button:hover {
                background-color: #45a049;
            }
        </style>
        <div class="container">
        <form action="" method="get" id="girisyapForm">
            <h2>GİRİŞ YAP</h2>
            <label for="username">Kullanıcı Adı</label>
            <input type="text" id="username" name="username" required>
            <label for="password">Şifre</label>
            <input type="password" id="password" name="password" required>
            <button type="submit">Giriş Yap</button>
        </form>
        <hr>
        <form action="" method="get" id="registerForm">
            <h2>KAYIT OL</h2>
            <label for="newUsername">Kullanıcı Adı</label>
            <input type="text" id="newUsername" name="newUsername" required>
            <label for="newPassword">Şifre</label>
            <input type="password" id="newPassword" name="newPassword" required>
            <label for="email">E-posta Adresi</label>
            <input type="email" id="email" name="email" required>
            <label for="fullName">Ad Soyad</label>
            <input type="text" id="fullName" name="fullName" required>
            <button type="submit">KAYIT OL</button>
        </form>
        </div>

    `;
}