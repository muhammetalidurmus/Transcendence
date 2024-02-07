document.addEventListener('DOMContentLoaded', function () {
    if (window.location.hash) {
        const page = window.location.hash.substring(1);
        changePage(page);
    } else {
        // Eğer sayfa yüklendiğinde hash yoksa, varsayılan olarak oyun sayfasına geçelim
        changePage('anasayfa');
    }
});

function changePage(page) {
    let content = '';

    switch (page) {
        case 'login':
            content = loginAdd();
            break;
        case 'chat':
            content = headerAdd() + chatAdd();
            break;
        case 'oyun':
            content = headerAdd() + gameAdd();
            break;
        case 'buttonstart':
            content = headerAdd() + buttonstart();
            break;
        case 'profil':
            content = headerAdd() + profilAdd();
            break;
        case 'anasayfa':
            content = headerAdd() + anasayfaAdd();
            break;
        default:
            content = '<h1>404 Not Found</h1><p>Sayfa bulunamadı.</p>';
    }

    document.getElementById('content').innerHTML = content;
    window.location.hash = page;

    // Yalnızca oyun sayfasına geçildiğinde oyunu başlat
    if (page === 'buttonstart') {
        startgame();
    }
}

window.addEventListener('hashchange', function () {
    if (window.location.hash) {
        const page = window.location.hash.substring(1);
        changePage(page);
    }
});