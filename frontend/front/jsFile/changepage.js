document.addEventListener('DOMContentLoaded', function () {
    if (window.location.hash) {
        const page = window.location.hash.substring(1);
        changePage(page);
    } else {
        // Eğer sayfa yüklendiğinde hash yoksa, varsayılan olarak oyun sayfasına geçelim
        changePage('home');
    }
});

function changePage(page) {
    let content = '';

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
        default:
            content = '<h1>404 Not Found</h1><p>Sayfa bulunamadı.</p>';
    }

    document.getElementById('content').innerHTML = content;
    window.location.hash = page;

    // Yalnızca oyun sayfasına geçildiğinde oyunu başlat
    if (page === 'pong-game') {
        startgame();
    }
}

window.addEventListener('hashchange', function () {
    if (window.location.hash) {
        const page = window.location.hash.substring(1);
        changePage(page);
    }
});