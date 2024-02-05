// document.addEventListener('DOMContentLoaded', function () {
//     // Başlangıçta anasayfa yüklenmesini istedim 
//     changePage('anasayfa');
// });

function changePage(page) {
    let content = '';

    switch (page) {
        case 'anasayfa':
            content = buildAnasayfaContent();
            break;
        case 'chat':
            content = '<h1>Chat</h1><p>Bu bir sohbet sayfasıdır.</p>';
            break;
        case 'oyun':
            content = '<h1>Oyun</h1><p>Bu bir oyun sayfasıdır.</p>';
            break;
        case 'profil':
            content = '<h1>Profil</h1><p>Bu bir profil sayfasıdır.</p>';
            break;
        default:
            content = '<h1>404 Not Found</h1><p>Sayfa bulunamadı.</p>';
    }

    document.getElementById('content').innerHTML = content;

    // Sayfa değiştikçe URL hash'ini güncelle
    window.location.hash = page;
}

function buildAnasayfaContent() {
    return `
        <h1>Anasayfa</h1>
        <p>Hoş geldiniz!</p>
        
        <h1>Add Numbers</h1>
        <label for="num1">Number 1:</label>
        <input type="text" id="num1" name="num1">
        
        <label for="num2">Number 2:</label>
        <input type="text" id="num2" name="num2">
        
        <button onclick="addNumbers()">Add</button>
    `;
}

// Sayfa yüklendiğinde hash'i kontrol et ve sayfayı değiştir
window.addEventListener('DOMContentLoaded', function () {
    if (window.location.hash) {
        const page = window.location.hash.substring(1);
        changePage(page);
    }
});

// Geri ve İleri tuşlarına tepki verme
window.addEventListener('hashchange', function () {
    if (window.location.hash) {
        const page = window.location.hash.substring(1);
        changePage(page);
    }
});

