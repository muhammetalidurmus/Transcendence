document.addEventListener('DOMContentLoaded', function () {
    // localStorage'dan oturum durumunu kontrol et
    var check = localStorage.getItem('isLoggedIn');
    if(check)
    loginstatus();

    isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';

    if (window.location.hash) {
        const page = window.location.hash.substring(1);
        changePage(page);
    } 
    else 
    {
        changePage(isLoggedIn ? 'home' : 'login'); // isLoggedIn true ise home, değilse login sayfasına yönlendir
    }
});

var searchlanguages = localStorage.getItem('selectedLanguage');
if(!searchlanguages)
localStorage.setItem('selectedLanguage', 'tr');

function changePage(page) {
    let content = '';

    if (animationFrameId.length > 0)
    {
        stopGame();
    }
    
    if (!isLoggedIn && page !== 'login' && page !== 'register' && page !== '2fa') {
        // Kullanıcı giriş yapmamış ve login sayfasında değilse, login sayfasına yönlendir
        window.location.hash = 'login';
        // Fonksiyonun geri kalanını çalıştırmamak için return kullanın
        return;
    }

    if (isLoggedIn && page == 'exit') {
        isLoggedIn = false;
        localStorage.setItem('isLoggedIn', false);
        page = 'login';
        exituser();
    }

    switch (page) {
        case 'login':
            content = loginAdd();
            break;
        case 'home':
            content = homeAdd();
            break;
        case 'game':
            content = gameAdd();
            break;
        case 'pong-game':
            content = buttonstart();
            break;
        case 'profile':
            content = profilAdd();
            break;
        case 'register':
            content = registerAdd();
            break;
        case '2fa':
            content = twofaAdd();
            break;
        case 'redirect':
            content = redirectAdd();
            setTimeout(() => window.location.hash = 'home', 2000);
            break;

        default:
            content = '<h1>404 Not Found</h1><p>Sayfa bulunamadı.</p>';
    }

    document.getElementById('content').innerHTML = content;
    window.location.hash = page;

    var languages = localStorage.getItem('selectedLanguage');
    changeLanguage(languages);
    
    // Yalnızca oyun sayfasına geçildiğinde oyunu başlat
    if (page === 'pong-game') {
        game_start();
        loop();
        make_sound();
    }
}

window.addEventListener('hashchange', function () {
    var check = localStorage.getItem('isLoggedIn');
    if(check)
    loginstatus();

    if (window.location.hash) {
        const page = window.location.hash.substring(1);
        changePage(page);
    }
});