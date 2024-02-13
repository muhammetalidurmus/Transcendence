function gameAdd() {
    return `
    <title> PONG GAME </title>

    <div class="profil-backgraund">
        <button class="start-button" onclick="changePage('pong-game')">
        <img src="img/basla.png" alt="buttonstart" style="width: 250px; height: 100px;"/>
        </button>

        <div id="back-button-container"onclick="changePage('home')">
        <button id="back-button">Back</button>
        </div>

    `;
}

function buttonstart() {
    return `
    <title> PONG GAME </title>

    <div class="audio-button" id="audioButton">Ses: Açık</div>
    <div class="scoreboard-container">
        <div class="score">
          Sol Oyuncu: <span id="leftPlayerScore">0</span>
        </div>
        <div class="score">
          AI <span id="rightPlayerScore">0</span>
        </div>
      </div>
      <div id="scene-container"></div>
       <div id="back-button-container"onclick="changePage('home')">
        <button id="back-button">Back</button>
        </div>
        
      
    `;
   
}
