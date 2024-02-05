function headerAdd() {
    return `
    <header>

        <button class="page-button" onclick="changePage('anasayfa')">
        <img src="img/buton.png" alt="Anasayfa"/>
        </button>
        
        <button class="page-button" onclick="changePage('chat')">
            <img src="img/buton.png" alt="Chat"/>
        </button>

        <button class="page-button" onclick="changePage('oyun')">
            <img src="img/buton.png" alt="Oyun"/>
        </button>

        <button class="page-button" onclick="changePage('profil')">
            <img src="img/buton.png" alt="Profil"/>
        </button>

    </header>
    `;
}