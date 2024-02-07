function headerAdd() {
    return `
    <header>

        <button class="page-button" onclick="changePage('anasayfa')">
        <img src="img/anasayfa.png" alt="Anasayfa"/>
        </button>
        
        <button class="page-button" onclick="changePage('chat')">
            <img src="img/chat.png" alt="Chat"/>
        </button>

        <button class="page-button" onclick="changePage('oyun')">
            <img src="img/oyun.png" alt="Oyun"/>
        </button>

        <button class="page-button" onclick="changePage('profil')">
            <img src="img/profil.png" alt="Profil"/>
        </button>

    </header>

    `;
}