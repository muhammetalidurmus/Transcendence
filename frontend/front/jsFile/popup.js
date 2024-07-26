function notuser() {
    var selectedLanguage = localStorage.getItem('selectedLanguage') || 'tr';
    var errorMessage = translations[selectedLanguage]['noUser'];
    var errorMessageElement = document.getElementById('errorMessage');
    errorMessageElement.innerText = errorMessage;
    var errorModal = new bootstrap.Modal(document.getElementById('errorModal'));
    errorModal.show();
}

function notpassword() {
    var selectedLanguage = localStorage.getItem('selectedLanguage') || 'tr';
    var errorMessage = translations[selectedLanguage]['wrongPassword'];
    var errorMessageElement = document.getElementById('errorMessage');
    errorMessageElement.innerText = errorMessage;
    var errorModal = new bootstrap.Modal(document.getElementById('errorModal'));
    errorModal.show();
}

function successregister() {
    var selectedLanguage = localStorage.getItem('selectedLanguage') || 'tr';
    var successMessage = translations[selectedLanguage]['successRegister'];
    var successMessageElement = document.getElementById('successMessage');
    successMessageElement.innerText = successMessage;
    var successModal = new bootstrap.Modal(document.getElementById('successModal'));
    successModal.show();
}

function failregister() {
    var selectedLanguage = localStorage.getItem('selectedLanguage') || 'tr';
    var errorMessage = translations[selectedLanguage]['failRegister'];
    var errorMessageElement = document.getElementById('errorMessage');
    errorMessageElement.innerText = errorMessage;
    var errorModal = new bootstrap.Modal(document.getElementById('errorModal'));
    errorModal.show();
}

function lowpassword() {
    var selectedLanguage = localStorage.getItem('selectedLanguage') || 'tr';
    var errorMessage = translations[selectedLanguage]['lowPassword'];
    var errorMessageElement = document.getElementById('errorMessage');
    errorMessageElement.innerText = errorMessage;
    var errorModal = new bootstrap.Modal(document.getElementById('errorModal'));
    errorModal.show();
}

function badcodeFA() {
    var selectedLanguage = localStorage.getItem('selectedLanguage') || 'tr';
    var errorMessage = translations[selectedLanguage]['errorFA'];
    var errorMessageElement = document.getElementById('errorMessage');
    errorMessageElement.innerText = errorMessage;
    var errorModal = new bootstrap.Modal(document.getElementById('errorModal'));
    errorModal.show();
}

function timeFA() {
    var selectedLanguage = localStorage.getItem('selectedLanguage') || 'tr';
    var errorMessage = translations[selectedLanguage]['timeFA'];
    var errorMessageElement = document.getElementById('errorMessage');
    errorMessageElement.innerText = errorMessage;
    var errorModal = new bootstrap.Modal(document.getElementById('errorModal'));
    errorModal.show();
}

function FAstatus() {
    var selectedLanguage = localStorage.getItem('selectedLanguage') || 'tr';
    var successMessage = translations[selectedLanguage]['FAstatus'];
    var successMessageElement = document.getElementById('successMessage');
    successMessageElement.innerText = successMessage;
    var successModal = new bootstrap.Modal(document.getElementById('successModal'));
    successModal.show();
}

function winnerplayer(player) {
    var selectedLanguage = localStorage.getItem('selectedLanguage') || 'tr';
    var successMessage = translations[selectedLanguage]['winnerplayer'] + " " + player;
    var successMessageElement = document.getElementById('successMessage');
    successMessageElement.innerText = successMessage;
    var successModal = new bootstrap.Modal(document.getElementById('successModal'));
    successModal.show();
}

