function profilAdd() {
    const lastname = localStorage.getItem('lastname');
    const firsname = localStorage.getItem('firstname');
    const username = localStorage.getItem('username');
    const email = localStorage.getItem('email');
    const profileImage = localStorage.getItem('profileImage');
    const country = localStorage.getItem('country');
    const city = localStorage.getItem('city');

    return `
    <title data-translate="titleprofile"> Profile </title>

    <div class="profil-backgraund">
        <div class="container-profil">
            <img src="${profileImage}" alt="Profil Resmi" class="profile-img" id="profile-img">
            <div class="profile-info">
            <p><strong data-translate="username">User Name :</strong> <span>${username}</span></p>
                <p><strong data-translate="namesurname">Name Surname :</strong> <span>${firsname +' '+ lastname}</span></p>
                <p><strong data-translate="email">E-Mail :</strong> <span>${email}</span></p>
                <br>
                <p><strong data-translate="countrycity">Country / City:</strong> <span>${country +' - '+ city}</span></p>
                <button type="button" class="btn btn-warning" onclick="set2fa(true)" data-translate="FAtrue"></button>
                <button type="button" class="btn btn-warning" onclick="set2fa(false)" data-translate="FAfalse"></button>
            </div>
        </div>

        <div id="back-button-container" onclick="changePage('home')">
            <button id="back-button" data-translate="back">Back</button>
        </div>
    </div>
    `;
}

// function changeProfileImage() {
//     const fileInput = document.createElement('input');
//     fileInput.type = 'file';
//     fileInput.accept = 'image/*';

//     fileInput.onchange = e => {
//         const file = e.target.files[0];
//         const reader = new FileReader();
        
//         reader.onload = e => {
//             // LocalStorage'a kaydetme
//             localStorage.setItem('profileImage', e.target.result);
//             // Profil resmini güncelleme
//             document.getElementById('profile-img').src = e.target.result;
//             // Sunucuya gönderme
//             imageChange(e.target.result);
//         };

//         reader.readAsDataURL(file);
//     };

//     fileInput.click();
// }

// function imageChange(imageData) {
//     var xhr = new XMLHttpRequest();
//     xhr.open('POST', 'https://10.12.4.4/api/update_profile_image/', true);
//     xhr.setRequestHeader('Content-Type', 'application/json;charset=UTF-8');

//     const username = localStorage.getItem('username');

//     xhr.send(JSON.stringify({ image: imageData, username: username })); /// eklenmeli resime onclick="changeProfileImage()
// }