document.addEventListener('DOMContentLoaded', function () {
    // localStorage'dan oturum durumunu kontrol et
    isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';

    if (window.location.hash) {
        const page = window.location.hash.substring(1);
        changePage(page);
    } else {
        changePage(isLoggedIn ? 'home' : 'login'); // isLoggedIn true ise home, değilse login sayfasına yönlendir
    }
});

function changePage(page) {
    let content = '';
    
    
    //console.log(animationFrameId.length);
    if (animationFrameId.length > 0)
    {
        stopGame();
        console.log("oyun durduruldu.");
    }
    
    if (!isLoggedIn && page !== 'login' && page !== 'register') {
        // Kullanıcı giriş yapmamış ve login sayfasında değilse, login sayfasına yönlendir
        window.location.hash = 'login';
        // Fonksiyonun geri kalanını çalıştırmamak için return kullanın
        return;
    }

    if (isLoggedIn && page == 'exit') {
        isLoggedIn = false;
        localStorage.setItem('isLoggedIn', 'false'); // Oturum durumunu localStorage'a kaydet
        page = 'login';
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
        case 'redirect':
            content = redirectAdd();
            setTimeout(() => window.location.hash = 'home', 2000);
            break;

        default:
            content = '<h1>404 Not Found</h1><p>Sayfa bulunamadı.</p>';
    }

    document.getElementById('content').innerHTML = content;
    window.location.hash = page;

    // Yalnızca oyun sayfasına geçildiğinde oyunu başlat
    if (page === 'pong-game') {
        game_start();
        loop();
        make_sound();
    }
}

window.addEventListener('hashchange', function () {
    if (window.location.hash) {
        const page = window.location.hash.substring(1);
        changePage(page);
    }
});
