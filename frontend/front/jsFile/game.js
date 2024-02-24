function gameAdd() {
  const username = localStorage.getItem('username');
  const profileImage = localStorage.getItem('profileImage');
    return `
    <title> PONG GAME </title>

    <div class="profil-backgraund">
        <button class="start-button" onclick="changePage('pong-game')">
        <img src="img/basla.png" alt="buttonstart" style="width: 250px; height: 100px;"/>
        </button>

        <div id="back-button-container"onclick="changePage('home')">
        <button id="back-button">Back</button>
        </div>

        <div class="home-profile">
                <home-profile-text>${username}</home-profile-text>
                <img src="${profileImage}" alt="Profil Resmi" class="home-profile-img">
        </div>

    `;
}

function buttonstart() {
  const username = localStorage.getItem('username');
  const profileImage = localStorage.getItem('profileImage');
    return `
    <title> PONG GAME </title>

    <div class="camera-buttons">
      <div class="camera-button" onclick="changeCamera('1')">1</div>
      <div class="camera-button" onclick="changeCamera('2')">2</div>
      <div class="camera-button" onclick="changeCamera('3')">3</div>
      <div class="camera-button" onclick="changeCamera('4')">4</div>
      <div class="camera-button" onclick="changeCamera('5')">5</div>
    </div>

    <div class="audio-button" id="audioButton"><i class="fa-solid fa-volume-off fa-2xl" style="color: #c70505;"></i></div>
    <div class="scoreboard-container">
        <div class="score">
          Sol Oyuncu: <span id="leftPlayerScore">0</span>
        </div>
        <div class="score">
          Sağ Oyuncu: <span id="rightPlayerScore">0</span>
        </div>
      </div>
      <div id="scene-container"></div>
       <div id="back-button-container"onclick="changePage('game')">
        <button id="back-button">Back</button>
        </div>

        <div class="home-profile">
                <home-profile-text>${username}</home-profile-text>
                <img src="${profileImage}" alt="Profil Resmi" class="home-profile-img">
        </div>

    `;
   
}