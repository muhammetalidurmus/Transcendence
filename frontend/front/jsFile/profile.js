function profilAdd() {
    const lastname = localStorage.getItem('lastname');
    const firsname = localStorage.getItem('firstname');
    const username = localStorage.getItem('username');
    const email = localStorage.getItem('email');
    const profileImage = localStorage.getItem('profileImage');
    const country = localStorage.getItem('country');
    const city = localStorage.getItem('city');

    return `
    <title>Profil Sayfası</title>

    <div class="profil-backgraund">
        <div class="container-profil">
            <img src="${profileImage}" alt="Profil Resmi" class="profile-img">
            <div class="profile-info">
            <p><strong>User Name :</strong> <span>${username}</span></p>
                <p><strong>Name Surname :</strong> <span>${firsname +' '+ lastname}</span></p>
                <p><strong>E-Mail :</strong> <span>${email}</span></p>
                <br>
                <p><strong>Country / City:</strong> <span>${country +' - '+ city}</span></p>
            </div>
        </div>

        <div id="back-button-container" onclick="changePage('home')">
            <button id="back-button">Back</button>
        </div>
    </div>
    `;
}