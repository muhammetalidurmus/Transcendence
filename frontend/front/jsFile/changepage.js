document.addEventListener('DOMContentLoaded', function () {
    var check = localStorage.getItem('isLoggedIn');
    if(check)
    loginstatus();
    if (window.location.hash) {
        const page = window.location.hash.substring(1);
        changePage(page);
    } 
    else 
    {
        changePage('login');
    }
});

function changePage(page) {
    let content = '';
    var check = localStorage.getItem('isLoggedIn');
        if(check)
        loginstatus();
    if (animationFrameId.length > 0)
    {
        stopGame();
    }

    if (!isLoggedIn && page !== 'login' && page !== 'register') {
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
    var check = localStorage.getItem('isLoggedIn');
    if(check)
    loginstatus();

    if (isLoggedIn || page === 'login' || page === 'register'){
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
    else
        window.location.hash = 'login';
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