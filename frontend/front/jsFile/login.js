function loginAdd() {
    return `
            <style>
        body {
            font-family: 'Arial', sans-serif;
            display: flex;
            align-items: center;
            justify-content: center;
            height: 100vh;
            margin: 0;
            background-color:rgb(170, 170, 157);
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
        <form id="GİRİŞ YAPForm">
            <h2>GİRİŞ YAP</h2>
            <label for="username">Kullanıcı Adı</label>
            <input type="text" id="username" required>
            <label for="password">Şifre</label>
            <input type="password" id="password" required>
            <button type="button" onclick="GİRİŞ YAP()">GİRİŞ YAP</button>
        </form>

        <hr>

        <form id="registerForm">
            <h2>KAYIT OL</h2>
            <label for="newUsername">Yeni Kullanıcı Adı</label>
            <input type="text" id="newUsername" required>
            <label for="newPassword">Yeni Şifre</label>
            <input type="password" id="newPassword" required>
            <button type="button" onclick="register()">KAYIT OL</button>
        </form>
        </div>

        <script>
        function GİRİŞ YAP() {
            var username = document.getElementById("username").value;
            var password = document.getElementById("password").value;
            
            // Burada GİRİŞ YAP işlemleri gerçekleştirilebilir (örneğin: kullanıcı adı ve şifrenin kontrolü).
            console.log("GİRİŞ YAP:", username, password);
        }

        function register() {
            var newUsername = document.getElementById("newUsername").value;
            var newPassword = document.getElementById("newPassword").value;
            
            // Burada kayıt işlemleri gerçekleştirilebilir (örneğin: yeni kullanıcı oluşturma).
            console.log("KAYIT OL:", newUsername, newPassword);
        }
        </script>
    `;
}