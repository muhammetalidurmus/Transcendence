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
        clearLocalStorageExit();
        clearLocalStorageGame();
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
        case 'pong-game1':
            content = gamestartup();
            break;
        case 'pong-game2':
            content = gamestartup();
            break;
        case 'gameRaund1':
            content = gameRaund1();
            break;
        case 'gameRaund2':
            content = gameRaund2();
            break;
        case 'gameRaund3':
            content = gameRaund3();
            break;
        case 'turnuva_lobi':
            content = gameTurnuva();
            break;
        case 'TurnuvaStart1':
            content = TurnuvaStart1();
            break;
        case 'TurnuvaStart2':
            content = TurnuvaStart2();
            break;
        case 'TurnuvaStart3':
            content = TurnuvaStart3();
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
    if (page === 'pong-game1') {
        raundStatus = 0;
        gameselect = 1;
        game_start();
        loop();
        make_sound();
    }
    if (page === 'pong-game2') {
        raundStatus = 0;
        gameselect = 2;
        game_start();
        loop();
        make_sound();
    }
    if (page === 'gameRaund1') {
        gameselect = 1;
        raundStatus = 1;
        game_start();
        loop();
        make_sound();
    }
    if (page === 'gameRaund2') {
        gameselect = 1;
        raundStatus = 2;
        game_start();
        loop();
        make_sound();
    }
    if (page === 'gameRaund3') {
        gameselect = 1;
        raundStatus = 3;
        game_start();
        loop();
        make_sound();
    }
}

function clearLocalStorageExit() {
    localStorage.removeItem('firstname');
    localStorage.removeItem('loginToken');
    localStorage.removeItem('profileImage');
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('username');
    localStorage.removeItem('email');
    localStorage.removeItem('city');
    localStorage.removeItem('lastname');
    localStorage.removeItem('country');
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