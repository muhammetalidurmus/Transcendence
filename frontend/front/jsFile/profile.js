function profilAdd() {
    return `
    <title>Profil Sayfası</title>
    <title>Profil Sayfası</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            margin: 0;
            padding: 0;
            box-sizing: border-box;
            background-color:rgb(170, 170, 157);
        }
        .container {
            max-width: 600px;
            max-heigt: 600px;
            margin: 50px auto;
            padding: 20px;
            background-color: #fff;
            border-radius: 8px;
            box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
            margin-top:5%;
        }
        .profile-img {
            width: 150px;
            height: 150px;
            border-radius: 50%;
            margin: 0 auto 20px;
            display: block;
            border: 4px solid #b40303;
            box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
        }
        .profile-info {
            text-align: center;
        }
        .profile-info p {
            margin: 10px 0;
        }
        .profile-info p strong {
            font-weight: bold;
            color: #ca2626;
        }
        .profile-info p span {
            color: #000000;
        }
    </style>
    <body>
    
    <div class="container">
        <img src="img/images.png" alt="Profil Resmi" class="profile-img">
        <div class="profile-info">
            <p><strong>Ad Soyad:</strong> <span id="fullName"></span></p>
            <p><strong>Kullanıcı Adı:</strong> <span id="username"></span></p>
            <p><strong>Şifre:</strong> <span id="password"></span></p>
            <p><strong>E-Posta:</strong> <span id="email"></span></p>
        </div>
    </div>
    
    <script>
        // Profil bilgileri
        const profil = {
            fullName: "muhammetalidurmus@gmail.com",
            kullaniciAdi: "kullanici123",
            sifre: "gizliSifre123",
            eposta: "ornek@eposta.com"
        };
    
    
        // Profil bilgilerini güncelle
        document.getElementById("fullName").textContent = fullName;
        document.getElementById("username").textContent = profil.kullaniciAdi;
        document.getElementById("password").textContent = profil.sifre;
        document.getElementById("email").textContent = profil.eposta;
    </script>
    

</body>
    `;
}