function notuser() {
    var selectedLanguage = localStorage.getItem('selectedLanguage') || 'tr';
    Swal.fire({
        title: translations[selectedLanguage]['noUser'],
        icon: 'error',
        confirmButtonText: translations[selectedLanguage]['ok'],
        confirmButtonColor: '#d33',
        customClass: {
            popup: 'popupclass'
        }
    });
}

function notpassword() {
    var selectedLanguage = localStorage.getItem('selectedLanguage') || 'tr';
    Swal.fire({
        title: translations[selectedLanguage]['wrongPassword'],
        icon: 'error',
        confirmButtonText: translations[selectedLanguage]['ok'],
        confirmButtonColor: '#d33',
        customClass: {
            popup: 'popupclass'
        }
    });
}

function successregister() {
    var selectedLanguage = localStorage.getItem('selectedLanguage') || 'tr';
    Swal.fire({
        title: translations[selectedLanguage]['successRegister'],
        icon: 'success',
        confirmButtonText: translations[selectedLanguage]['ok'],
        confirmButtonColor: '#d33',
        customClass: {
            popup: 'popupclass'
        }
    });
}

function failregister() {
    var selectedLanguage = localStorage.getItem('selectedLanguage') || 'tr';
    Swal.fire({
        title: translations[selectedLanguage]['failRegister'],
        icon: 'error',
        confirmButtonText: translations[selectedLanguage]['ok'],
        confirmButtonColor: '#d33',
        customClass: {
            popup: 'popupclass'
        }
    });
}

function lowpassword() {
    var selectedLanguage = localStorage.getItem('selectedLanguage') || 'tr';
    var message = translations[selectedLanguage]['lowPassword'];

    Swal.fire({
        title: message,
        icon: 'error',
        confirmButtonText: translations[selectedLanguage]['ok'],
        confirmButtonColor: '#d33',
        customClass: {
            popup: 'popupclass'
        }
    });
}

function badcodeFA() {
    var selectedLanguage = localStorage.getItem('selectedLanguage') || 'tr';
    var message = translations[selectedLanguage]['errorFA'];

    Swal.fire({
        title: message,
        icon: 'error',
        confirmButtonText: translations[selectedLanguage]['ok'],
        confirmButtonColor: '#d33',
        customClass: {
            popup: 'popupclass'
        }
    });
}

function timeFA() {
    var selectedLanguage = localStorage.getItem('selectedLanguage') || 'tr';
    var message = translations[selectedLanguage]['timeFA'];

    Swal.fire({
        title: message,
        icon: 'error',
        confirmButtonText: translations[selectedLanguage]['ok'],
        confirmButtonColor: '#d33',
        customClass: {
            popup: 'popupclass'
        }
    });
}

function FAstatus() {
    var selectedLanguage = localStorage.getItem('selectedLanguage') || 'tr';
    var message = translations[selectedLanguage]['FAstatus'];

    Swal.fire({
        title: message,
        icon: 'error',
        confirmButtonText: translations[selectedLanguage]['ok'],
        confirmButtonColor: '#d33',
        customClass: {
            popup: 'popupclass'
        }
    });
}

