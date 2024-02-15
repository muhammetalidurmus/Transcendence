function profilAdd() {
    const lastname = localStorage.getItem('lastname') || 'Soyad';
    const firsname = localStorage.getItem('firstname') || 'Adı';
    const username = localStorage.getItem('username') || 'Kullanıcı Adı';
    const email = localStorage.getItem('email') || 'E-Posta';
    const profileImage = localStorage.getItem('profileImage') || '/img/default.png';

    return `
    <title>Profil Sayfası</title>

    <div class="profil-backgraund">
        <div class="container-profil">
            <img src="${profileImage}" alt="Profil Resmi" class="profile-img">
            <div class="profile-info">
                <p><strong>Ad Soyad:</strong> <span>${firsname +' '+ lastname}</span></p>
                <p><strong>Kullanıcı Adı:</strong> <span>${username}</span></p>
                <p><strong>E-Posta:</strong> <span>${email}</span></p>
            </div>
        </div>

        <div id="back-button-container" onclick="changePage('home')">
            <button id="back-button">Back</button>
        </div>
    </div>
    `;
}