document.addEventListener('DOMContentLoaded', function () {
    // Sayfa yüklendiğinde hash'i kontrol et ve sayfayı değiştir
    if (window.location.hash) {
        const page = window.location.hash.substring(1);
        changePage(page);
    } else {
        // Başlangıçta anasayfa yüklenmesini istedim 
        changePage('login');
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
            content = headerAdd() + oyunAdd();
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

    // Sayfa değiştikçe URL hash'ini güncelle
    window.location.hash = page;
    
}

// Geri ve İleri tuşlarına tepki verme
window.addEventListener('hashchange', function () {
    if (window.location.hash) {
        const page = window.location.hash.substring(1);
        changePage(page);
    }
});

