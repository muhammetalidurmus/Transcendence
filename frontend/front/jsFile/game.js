function gameAdd() {
  const username = localStorage.getItem('username');
  const profileImage = localStorage.getItem('profileImage');
    return `
    <title> PONG GAME </title>

    <div class="profil-backgraund">

        <button type="button" class="btn btn-danger" onclick="changePage('pong-game1')" data-translate="startgame"></button>
        </button>
        <br>
        <button type="button" class="btn btn-danger" onclick="changePage('pong-game2')" data-translate="startgame2"></button>
        </button>
        <br>
        <button type="button" class="btn btn-danger" onclick="changePage('turnuva_lobi')" data-translate="turnuva" >TURNUVA</button>
        </button>

        <div id="back-button-container" onclick="changePage('home')">
            <button id="back-button" data-translate="back">Back</button>
        </div>

        <div class="home-profile">
                <home-profile-text>${username}</home-profile-text>
                <img src="${profileImage}" alt="Profil Resmi" class="home-profile-img">
        </div>

    `;
}

function gamestartup() {
    return `
    <title> PONG GAME </title>

    <div class="camera-buttons">
      <div class="camera-button" onclick="changeCamera('1')">1</div>
      <div class="camera-button" onclick="changeCamera('2')">2</div>
      <div class="camera-button" onclick="changeCamera('3')">3</div>
      <div class="camera-button" onclick="changeCamera('4')">4</div>
      <div class="camera-button" onclick="changeCamera('5')">5</div>
    </div>

    <div class="audio-button" id="audioButton"><i class="bi bi-volume-up-fill"></i></div>

    <div class="scoreboard-container">
        <div class="score">
        <span id="player1" data-translate="red"> : 0</span>
        <span id="leftPlayerScore">0</span>
        </div>
        <div class="score">
        <span id="player2" data-translate="yellow"> : 0</span>
        <span id="rightPlayerScore">0</span>
        </div>
      </div>
      <div id="scene-container"></div>
       <div id="back-button-container" onclick="changePage('game')">
            <button id="back-button" data-translate="back">Back</button>
        </div>

    `;
   
}

function gameRaund1() {
  const player1 = localStorage.getItem('player1');
  const player2 = localStorage.getItem('player2');

    return `

    <title> PONG GAM </title>

    <div class="camera-buttons">
      <div class="camera-button" onclick="changeCamera('1')">1</div>
      <div class="camera-button" onclick="changeCamera('2')">2</div>
      <div class="camera-button" onclick="changeCamera('3')">3</div>
      <div class="camera-button" onclick="changeCamera('4')">4</div>
      <div class="camera-button" onclick="changeCamera('5')">5</div>
    </div>

    <div class="audio-button" id="audioButton"><i class="bi bi-volume-up-fill"></i></div>
    <div class="scoreboard-container">
        <div class="score">
        ${player1} : <span id="leftPlayerScore">0</span>
        </div>
        <div class="score">
        ${player2} : <span id="rightPlayerScore">0</span>
        </div>
      </div>
      <div id="scene-container"></div>
       <div id="back-button-container" onclick="changePage('game')">
            <button id="back-button" data-translate="back">Back</button>
        </div>

    `;
   
}

function gameRaund2() {

  const player3 = localStorage.getItem('player3');
  const player4 = localStorage.getItem('player4');

    return `

    <title> PONG GAM </title>

    <div class="camera-buttons">
      <div class="camera-button" onclick="changeCamera('1')">1</div>
      <div class="camera-button" onclick="changeCamera('2')">2</div>
      <div class="camera-button" onclick="changeCamera('3')">3</div>
      <div class="camera-button" onclick="changeCamera('4')">4</div>
      <div class="camera-button" onclick="changeCamera('5')">5</div>
    </div>

    <div class="audio-button" id="audioButton"><i class="bi bi-volume-up-fill"></i></div>
    <div class="scoreboard-container">
        <div class="score">
        ${player3} : <span id="leftPlayerScore">0</span>
        </div>
        <div class="score">
        ${player4} : <span id="rightPlayerScore">0</span>
        </div>
      </div>
      <div id="scene-container"></div>
       <div id="back-button-container" onclick="changePage('game')">
            <button id="back-button" data-translate="back">Back</button>
        </div>

    `;
   
}

function gameRaund3() {

  const final1 = localStorage.getItem('raund1_win');
  const final2 = localStorage.getItem('raund2_win');

    return `

    <title> PONG GAM </title>

    <div class="camera-buttons">
      <div class="camera-button" onclick="changeCamera('1')">1</div>
      <div class="camera-button" onclick="changeCamera('2')">2</div>
      <div class="camera-button" onclick="changeCamera('3')">3</div>
      <div class="camera-button" onclick="changeCamera('4')">4</div>
      <div class="camera-button" onclick="changeCamera('5')">5</div>
    </div>

    <div class="audio-button" id="audioButton"><i class="bi bi-volume-up-fill"></i></div>
    <div class="scoreboard-container">
        <div class="score">
        ${final1} : <span id="leftPlayerScore">0</span>
        </div>
        <div class="score">
        ${final2} : <span id="rightPlayerScore">0</span>
        </div>
      </div>
      <div id="scene-container"></div>
       <div id="back-button-container" onclick="changePage('game')">
            <button id="back-button" data-translate="back">Back</button>
        </div>

    `;
   
}

function clearLocalStorageGame() {
  localStorage.removeItem('player1');
  localStorage.removeItem('player2');
  localStorage.removeItem('player3');
  localStorage.removeItem('player4');
  localStorage.removeItem('player1_color');
  localStorage.removeItem('player2_color');
  localStorage.removeItem('player3_color');
  localStorage.removeItem('player4_color');
  localStorage.removeItem('raund1_win');
  localStorage.removeItem('raund2_win');
}

