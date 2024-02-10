function loginAdd() {
    return `
     <div class="profil-backgraund">
     <div class="login">
     <h2>GİRİŞ YAP</h2>
     <button onclick="loginWithEcole42()">Ecole 42 ile Giriş Yap</button>
 </div>

    `;
}

function loginWithEcole42() {
    const client_id = 'u-s4t2ud-c61dbf9496f4cd97c24a0e1df99aa98bd56d9fa972d4ba6f7fce16704a824d0a'; // Ecole 42 uygulamanızın istemci kimliği
    const redirect_uri = 'http://172.24.144.1:443'; // Ecole 42 tarafından yetkilendirme sonrası yönlendirileceğiniz URI
    const scopes = 'public'; // İzin istediğiniz kapsamlar
    const authUrl = `https://api.intra.42.fr/oauth/authorize?client_id=${client_id}&redirect_uri=${encodeURIComponent(redirect_uri)}&response_type=code&scope=${encodeURIComponent(scopes)}`;

    window.location.href = authUrl;
}
