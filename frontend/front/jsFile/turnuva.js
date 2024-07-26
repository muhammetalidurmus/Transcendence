let swapStatus = -1;
let raundStatus = -1;
let Player1_color = 0xE63946;
let Player2_color = 0xE63946;
let Player3_color = 0xE63946;
let Player4_color = 0xE63946;

function gameTurnuva() {
    const username = localStorage.getItem('username');
    swapStatus = 0;
    return `
    <title> PONG GAME </title>

    <div class="profil-backgraund">
    <div class="turnuva">

    <form action="" method="get" id="tournament" class="turnuva-label" onsubmit="return validateForm()">

        <label for="player1" class="turnuva-label" data-translate="player1"> PLAYER 1 </label>
        <input type="text" id="player1" name="P1" class="auth-input" required value="${username}">
        <hr>

        <label for="player2" class="turnuva-label" data-translate="player2">PLAYER 2</label>
        <input type="text" id="player2" name="P2" class="auth-input" required>
        <hr>

        <label for="player3" class="turnuva-label" data-translate="player3">PLAYER 3</label>
        <input type="text" id="player3" name="P3" class="auth-input" required>
        <hr>

        <label for="player4" class="turnuva-label" data-translate="player4">PLAYER 4</label>
        <input type="text" id="player4" name="P4" class="auth-input" required>
        <hr>
        <br>
        <button type="submit" class="turnuva-button" data-translate="register" >TAKIMI OLUŞTUR</button>

    </form>


        <div id="back-button-container" onclick="changePage('game')">
        <button id="back-button" data-translate="back">Back</button>
    </div>
    </div>

    `;
}


function TurnuvaStart1() {

    var player1;
    var player2;
    raundStatus = 1;

    if(swapStatus === 0)
    {
        const swap = swap_name();
        for (let i = 1; i <= 4; i++) {
            const player = swap(i);
            localStorage.setItem('player' + i, player.name);
            localStorage.setItem('player' + i + '_color', player.color);
        }
        player1 = swap(1);
        player2 = swap(2);
        player3 = swap(3);
        player4 = swap(4);
        swapStatus = 1;
    }
    else
    {
        player1 = localStorage.getItem('player1');
        player2 = localStorage.getItem('player2');
        player3 = localStorage.getItem('player3');
        player4 = localStorage.getItem('player4');
    }


    return `
    <title> PONG GAME </title>

    <div class="profil-backgraund">
        <div class="turnuva2">

          <hr>
            <h2 data-translate="1raund"> İLK KARŞILAŞMA </h2>
            <hr>
            <br>
            <br>
            <h2> | ${player1} |  --- VS ---  | ${player2} |</h2>
            <hr>
            <br>
            <br>
            <div class="button-container" id="container1">
                <h2>${player1}</h2>
                <button class="color-button red" onclick="selectColor('red', 'container1')"></button>
                <button class="color-button blue" onclick="selectColor('blue', 'container1')"></button>
                <button class="color-button green" onclick="selectColor('green', 'container1')"></button>
                <button class="color-button yellow" onclick="selectColor('yellow', 'container1')"></button>
                <button class="color-button white" onclick="selectColor('white', 'container1')"></button>
                <button class="color-button orange" onclick="selectColor('orange', 'container1')"></button>
                <br>
            </div>

            <br>
            <hr>
            <br>

            <div class="button-container" id="container2">
                <h2>${player2}</h2>
                <button class="color-button red" onclick="selectColor('red', 'container2')"></button>
                <button class="color-button blue" onclick="selectColor('blue', 'container2')"></button>
                <button class="color-button green" onclick="selectColor('green', 'container2')"></button>
                <button class="color-button yellow" onclick="selectColor('yellow', 'container2')"></button>
                <button class="color-button white" onclick="selectColor('white', 'container2')"></button>
                <button class="color-button orange" onclick="selectColor('orange', 'container2')"></button>
                <br>
            </div>
            <br>
            <br>
            <br>
            <br>

            <h5 data-translate="selectcolorpls"> LÜTFEN RENKLERİNİZİ SEÇİN </h5>
            <br>
            <br>

            <button type="button" class="btn btn-danger" onclick="changePage('gameRaund1')" data-translate="startgame"></button>
            </button>
    
        </div>

    </div>

    <div id="back-button-container" onclick="changePage('turnuva_lobi')">
    <button id="back-button" data-translate="back">Back</button>
    </div>

    `;
}

function TurnuvaStart2() {

    var player3;
    var player4;
    raundStatus = 2;

    player3 = localStorage.getItem('player3');
    player4 = localStorage.getItem('player4');

    return `
    <title> PONG GAME </title>

    <div class="profil-backgraund">
        <div class="turnuva2">
            <hr>
            <h2 data-translate="2raund"> İKİNCİ KARŞILAŞMA </h2>
            <hr>
            <br>
            <br>
            <h2> | ${player3} |  --- VS ---  | ${player4} |</h2>
            <hr>
            <br>
            <br>
            <div class="button-container" id="container3">
                <h2>${player3}</h2>
                <button class="color-button red" onclick="selectColor('red', 'container3')"></button>
                <button class="color-button blue" onclick="selectColor('blue', 'container3')"></button>
                <button class="color-button green" onclick="selectColor('green', 'container3')"></button>
                <button class="color-button yellow" onclick="selectColor('yellow', 'container3')"></button>
                <button class="color-button white" onclick="selectColor('white', 'container3')"></button>
                <button class="color-button orange" onclick="selectColor('orange', 'container3')"></button>
                <br>
            </div>

            <br>
            <hr>
            <br>

            <div class="button-container" id="container4">
                <h2>${player4}</h2>
                <button class="color-button red" onclick="selectColor('red', 'container4')"></button>
                <button class="color-button blue" onclick="selectColor('blue', 'container4')"></button>
                <button class="color-button green" onclick="selectColor('green', 'container4')"></button>
                <button class="color-button yellow" onclick="selectColor('yellow', 'container4')"></button>
                <button class="color-button white" onclick="selectColor('white', 'container4')"></button>
                <button class="color-button orange" onclick="selectColor('orange', 'container4')"></button>
                <br>
            </div>
            <br>
            <br>
            <br>
            <br>

            <h5 data-translate="selectcolorpls"> LÜTFEN RENKLERİNİZİ SEÇİN </h5>
            <br>
            <br>

            <button type="button" class="btn btn-danger" onclick="changePage('gameRaund2')" data-translate="startgame"></button>
            </button>
    
        </div>

    </div>

    <div id="back-button-container" onclick="changePage('turnuva_lobi')">
    <button id="back-button" data-translate="back">Back</button>
    </div>

    `;
}

function TurnuvaStart3() {

    var final1;
    var final2;
    raundStatus = 3;

    final1 = localStorage.getItem('raund1_win');
    final2 = localStorage.getItem('raund2_win');

    return `
    <title> PONG GAME </title>

    <div class="profil-backgraund">
        <div class="turnuva2">
            <hr>
            <h2 data-translate="finalraund"> FİNAL KARŞILAŞMASI </h2>
            <hr>
            <br>
            <br>
            <h2> | ${final1} |  --- VS ---  | ${final2} |</h2>
            <hr>
            <br>
            <br>
            <div class="button-container" id="container1">
                <h2>${final1}</h2>
                <button class="color-button red" onclick="selectColor('red', 'container1')"></button>
                <button class="color-button blue" onclick="selectColor('blue', 'container1')"></button>
                <button class="color-button green" onclick="selectColor('green', 'container1')"></button>
                <button class="color-button yellow" onclick="selectColor('yellow', 'container1')"></button>
                <button class="color-button white" onclick="selectColor('white', 'container1')"></button>
                <button class="color-button orange" onclick="selectColor('orange', 'container1')"></button>
                <br>
            </div>

            <br>
            <hr>
            <br>

            <div class="button-container" id="container2">
                <h2>${final2}</h2>
                <button class="color-button red" onclick="selectColor('red', 'container2')"></button>
                <button class="color-button blue" onclick="selectColor('blue', 'container2')"></button>
                <button class="color-button green" onclick="selectColor('green', 'container2')"></button>
                <button class="color-button yellow" onclick="selectColor('yellow', 'container2')"></button>
                <button class="color-button white" onclick="selectColor('white', 'container2')"></button>
                <button class="color-button orange" onclick="selectColor('orange', 'container2')"></button>
                <br>
            </div>
            <br>
            <br>
            <br>
            <br>

            <h5 data-translate="selectcolorpls"> LÜTFEN RENKLERİNİZİ SEÇİN </h5>
            <br>
            <br>

            <button type="button" class="btn btn-danger" onclick="changePage('gameRaund3')" data-translate="startgame"></button>
            </button>
    
        </div>

    </div>

    <div id="back-button-container" onclick="changePage('turnuva_lobi')">
    <button id="back-button" data-translate="back">Back</button>
    </div>

    `;
}



function selectColor(color, container) {

    // Renk değişkenlerine rengi kaydet
    if(container === 'container1') {
        Player1_color = color;
    } else if(container === 'container2') {
        Player2_color = color;
    } else if(container === 'container3') {
        Player3_color = color;
    } else if(container === 'container4') {
        Player4_color = color;
    }

    // Tüm butonların çerçeve stilini kaldır
    var buttons = document.querySelectorAll('#' + container + ' .color-button');
    buttons.forEach(function(button) {
        button.style.boxShadow = 'none';
    });

    // Tıklanan butona kırmızı çerçeve ekle
    var selectedButton = document.querySelector('#' + container + ' .color-button.' + color);
    selectedButton.style.boxShadow = '0 0 0 10px black';

    localStorage.setItem('player1_color', Player1_color);
    localStorage.setItem('player2_color', Player2_color);
    localStorage.setItem('player3_color', Player3_color);
    localStorage.setItem('player4_color', Player4_color);

}


document.addEventListener('DOMContentLoaded', function () {

    if (window.location.search.includes('?P1')) 
        {
            const urlParams = new URLSearchParams(window.location.search);

            const player1 = urlParams.get('P1');
            const player2 = urlParams.get('P2');
            const player3 = urlParams.get('P3');
            const player4 = urlParams.get('P4');

            const cleanUrl = window.location.href.split('?P1')[0] + window.location.hash;
            window.history.replaceState(null, null, cleanUrl);


            localStorage.setItem('player1', player1);
            localStorage.setItem('player2', player2);
            localStorage.setItem('player3', player3);
            localStorage.setItem('player4', player4);

            changePage('TurnuvaStart1');
        
        }

});


function swap_name() {
    const names = [];
    const colors = [];
    for (let i = 1; i <= 4; i++) {
        names.push(localStorage.getItem('player' + i));
        colors.push(localStorage.getItem('player' + i + '_color'));
    }
    const shuffledNames = shuffleArray(names);
    const shuffledColors = shuffleArray(colors);
    return function(playerNumber) {
        return {
            name: shuffledNames[playerNumber - 1],
            color: shuffledColors[playerNumber - 1]
        };
    };
}

// Diziyi karıştıran yardımcı fonksiyon
function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}
