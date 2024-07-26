let gameselect = 0;
let scene;
let camera;
let renderer;

let l_player_p;
let r_player_p;

let l_player_p2;
let r_player_p2;

let r_player_size;
let r_player_material;
let r_player;

let player_speed_l = 0;
let player_speed_r = 0;
let player_speed_l2 = 0;
let player_speed_r2 = 0;

let leftPlayerScore = 0;
let rightPlayerScore = 0;
let animationFrameId = [];

let ground;
let groundGeometry;
let groundMaterial;

let ball;
let ball_bounce = 1;
let geometry;
let material;
let light;

const hiz_magnitude = 0.25;
let ball_x = Math.cos(1.1052744050774266) * hiz_magnitude;
let ball_z = Math.sin(1.1052744050774266) * hiz_magnitude;

let listener;
let audioLoader;
let sound;

let isAudioOn = true;

let player1_color = 'red';
let player2_color = 'yellow';
let player3_color = 'red';
let player4_color = 'yellow';

let left_color = 'red';
let right_color = 'yellow';



function game_start()
{
    
    create_scene();
    create_light();

    if(raundStatus === 1){
        create_floor(60, 32);

        var color1 = localStorage.getItem('player1_color');
        var color2 = localStorage.getItem('player2_color');
        l_player_p = create_player(-28.5, 0 , color1);
        r_player_p = create_player(28.5, 0, color2);
    }
    else if(raundStatus === 2){
        create_floor(60, 32);

        var color3 = localStorage.getItem('player3_color');
        var color4 = localStorage.getItem('player4_color');
        l_player_p = create_player(-28.5, 0 , color3);
        r_player_p = create_player(28.5, 0, color4);
    }

    else if(raundStatus === 3){
        create_floor(60, 32);

        var color3 = localStorage.getItem('player1_color');
        var color4 = localStorage.getItem('player2_color');
        l_player_p = create_player(-28.5, 0 , color3);
        r_player_p = create_player(28.5, 0, color4);
    }

    else if(gameselect === 1 )
    {
        create_floor(60, 32);
        l_player_p = create_player(-28.5, 0 , left_color);
        r_player_p = create_player(28.5, 0, right_color);
    }

    else if(gameselect === 2)
    {
        create_floor(60, 40);
        l_player_p = create_player(-28.5, -10 ,player1_color);
        r_player_p = create_player(28.5, -10 ,player2_color);
        l_player_p2 = create_player(-28.5, 10 ,player3_color);
        r_player_p2 = create_player(28.5, 10 ,player4_color);
    }
    create_ball();
}

function loop()
{
    document.addEventListener("keypress", handle_keyDown_l);
    document.addEventListener("keyup", handle_keyUp_l);
    document.addEventListener("keypress", cam_pos);
    move_ball();
    check_score();
    animationFrameId.push(requestAnimationFrame(loop));
    renderer.render(scene, camera);
}

function handle_keyDown_l(event) {
    if (gameselect === 1) {
        if ((event.key == "w" || event.key == "W") && l_player_p.position.z >= -14)
            player_speed_l = -0.2;
        if ((event.key == "s" || event.key == "S") && l_player_p.position.z <= 14)
            player_speed_l = 0.2;
        if ((event.key == "o" || event.key == "O") && r_player_p.position.z >= -14)
            player_speed_r = -0.2;
        if ((event.key == "l" || event.key == "L") && r_player_p.position.z <= 14)
            player_speed_r = 0.2;
    }

    if (gameselect === 2) {
        if ((event.key == "q" || event.key == "Q") && l_player_p2.position.z >= 0)
            player_speed_l2 = -0.2;
        if ((event.key == "a" || event.key == "A") && l_player_p2.position.z <= 18)
            player_speed_l2 = 0.2;
        if ((event.key == "u" || event.key == "U") && r_player_p2.position.z >= 0)
            player_speed_r2 = -0.2;
        if ((event.key == "j" || event.key == "J") && r_player_p2.position.z <= 18)
            player_speed_r2 = 0.2;
        if ((event.key == "w" || event.key == "W") && l_player_p.position.z >= -18)
            player_speed_l = -0.2;
        if ((event.key == "s" || event.key == "S") && l_player_p.position.z <= 0)
            player_speed_l = 0.2;
        if ((event.key == "o" || event.key == "O") && r_player_p.position.z >= -18)
            player_speed_r = -0.2;
        if ((event.key == "l" || event.key == "L") && r_player_p.position.z <= 0)
            player_speed_r = 0.2;
    }
}


function handle_keyUp_l(event) {
    if (gameselect === 1) {
        if (event.key == "w" || event.key == "W" || event.key == "s" || event.key == "S")
            player_speed_l = 0;
        if (event.key == "o" || event.key == "O" || event.key == "l" || event.key == "L")
            player_speed_r = 0;
    }
    if (gameselect === 2) {
        if (event.key == "w" || event.key == "W" || event.key == "s" || event.key == "S")
            player_speed_l = 0;
        if (event.key == "o" || event.key == "O" || event.key == "l" || event.key == "L")
            player_speed_r = 0;
        if (event.key == "q" || event.key == "Q" || event.key == "a" || event.key == "A")
            player_speed_l2 = 0;
        if (event.key == "u" || event.key == "U" || event.key == "j" || event.key == "J")
            player_speed_r2 = 0;
    }
}


function create_scene()
{
    scene = new THREE.Scene();
    camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    
    var loader = new THREE.TextureLoader();
    
    renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.shadowMap.enabled = true;
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.getElementById('scene-container').appendChild(renderer.domElement);
    
    camera.position.set(0, 40, 25);
    camera.lookAt(0, 0, 0);
}

function changeCamera(key) 
{
    if (key === "1") {
        camera.position.set(0, 40, 25);
        camera.lookAt(0, 0, 0);
    } else if (key === "2") {
        camera.position.set(0, 40, -25);
        camera.lookAt(0, 0, 0);
    } else if (key === "3") {
        camera.position.set(-40, 20, 0);
        camera.lookAt(0, 0, 0);
    } else if (key === "4") {
        camera.position.set(40, 20, 0);
        camera.lookAt(0, 0, 0);
    } else if (key === "5") {
        camera.position.set(0, 40, 0);
        camera.lookAt(0, 0, 0);
    }
}

document.querySelectorAll('.camera-button').forEach(item => {
    item.addEventListener('click', event => {
        changeCamera(item.textContent);
    });
});

function cam_pos(event) 
{
    if (event.key == "1") // ana kamera
    {
        camera.position.set(0, 40, 25);
        camera.lookAt(0, 0, 0);
    }
    else if (event.key == "2") // ana kamera ters açıdan
    {
        camera.position.set(0, 40, -25);
        camera.lookAt(0, 0, 0);
    }
    else if (event.key == "3") // sol oyuncunun arkasından 
    {
        camera.position.set(-40, 20, 0);
        camera.lookAt(0, 0, 0);
    }
    else if (event.key == "4")
    {
        camera.position.set(40, 20, 0); // sağ oyuncunun arkasından
        camera.lookAt(0, 0, 0);
    }
    else if (event.key == "5")
    {
        camera.position.set(0, 40, 0);
        camera.lookAt(0, 0, 0);
    }
}

function create_light() 
{
    light = new THREE.DirectionalLight(0xffffff, 1);
    light.castShadow = true;
    light.intensity = 1;
    light.shadow.camera.left = -20;
    light.shadow.camera.right = 20;
    light.shadow.camera.top = 20;
    light.shadow.camera.bottom = -20;
    light.shadow.camera.near = 0.5;
    light.shadow.camera.far = 100;
    light.position.set(0, 2000, 0);
    light.target.position.set(0, 20, 0);
    scene.add(light);
}

function create_floor(x, z)
{
    groundGeometry = new THREE.BoxGeometry(x, z, 1);
    groundMaterial = new THREE.MeshStandardMaterial({ color: 0x323232});
    ground = new THREE.Mesh(groundGeometry, groundMaterial);
    ground.receiveShadow = true;
    ground.rotation.x = -Math.PI / 2;
    ground.position.y = -1;

    var material = new THREE.LineBasicMaterial({ color: 0xffffff });
    var points = [];

    if(gameselect === 1){
    points.push(new THREE.Vector3(0, 0, 16));
    points.push(new THREE.Vector3(0, 0, -16));
    }

    if(gameselect === 2){
    points.push(new THREE.Vector3(30, 0, 0));
    points.push(new THREE.Vector3(-30, 0, 0));
    }
    
    var geometry = new THREE.BufferGeometry().setFromPoints(points);
    var line = new THREE.Line(geometry, material);
    scene.add(line);
    scene.add(ground);

    if(gameselect == 1){
        create_z_edge(0, -1, 16.5);
        create_z_edge(0, -1, -16.5);
        create_x_edge(30.5, -1, 0, 34);
        create_x_edge(-30.5, -1, 0, 34);
    }
    if(gameselect == 2){
        create_z_edge(0, -1, 20.5);
        create_z_edge(0, -1, -20.5);
        create_x_edge(30.5, -1, 0, 42);
        create_x_edge(-30.5, -1, 0, 42);
    }
}

function create_x_edge(x, y, z, v)
{
    r_player_size = new THREE.BoxGeometry(1, 1.5, v);
    r_player_material = new THREE.MeshStandardMaterial({color: 0xffffff});
    r_player = new THREE.Mesh(r_player_size, r_player_material);
    r_player.receiveShadow = true;
    r_player.position.x = x;
    r_player.position.y = y;
    r_player.position.z = z;
    scene.add(r_player);
    return r_player;
}

function create_z_edge(x, y, z)
{
    r_player_size = new THREE.BoxGeometry(60, 1.5, 1);
    r_player_material = new THREE.MeshStandardMaterial({color: 0xffffff});
    r_player = new THREE.Mesh(r_player_size, r_player_material);
    r_player.receiveShadow = true;
    r_player.position.x = x;
    r_player.position.y = y;
    r_player.position.z = z;
    scene.add(r_player);
    return r_player;
}

function create_player(x, z, new_color)
{
    r_player_size = new THREE.BoxGeometry(0.5, 2, 4);
    r_player_material = new THREE.MeshStandardMaterial({color: new_color});
    r_player = new THREE.Mesh(r_player_size, r_player_material);
    scene.add(r_player);
    r_player.position.x = x;
    r_player.position.z = z;
    return r_player;
}


function create_ball()
{
    geometry = new THREE.SphereGeometry(0.75, 32, 32);
    material = new THREE.MeshStandardMaterial({ color: 0xE63946});
    ball = new THREE.Mesh(geometry, material);
    ball.castShadow = true;
    ball.position.set(0, 0, 0);
    scene.add(ball);
}

function move_ball()
{

    ball.position.x += ball_x;
    ball.position.z += ball_z;
    if(gameselect === 1){
        l_player_p.position.z += player_speed_l;
        r_player_p.position.z += player_speed_r;
    }

    if(gameselect == 2){
        l_player_p.position.z += player_speed_l;
        r_player_p.position.z += player_speed_r;
        l_player_p2.position.z += player_speed_l2;
        r_player_p2.position.z += player_speed_r2;
    }

    if(gameselect === 1){
        if(l_player_p.position.z <= -14)
            l_player_p.position.z = -14;
        if(l_player_p.position.z >= 14)
            l_player_p.position.z = 14;
        if(r_player_p.position.z <= -14)
            r_player_p.position.z = -14;
        if(r_player_p.position.z >= 14)
            r_player_p.position.z = 14;
    }

    if(gameselect === 2){
        if(l_player_p2.position.z <= 2)
            l_player_p2.position.z = 2;
        if(l_player_p2.position.z >= 18)
            l_player_p2.position.z = 18;
        if(r_player_p2.position.z <= 2)
            r_player_p2.position.z = 2;
        if(r_player_p2.position.z >= 18)
            r_player_p2.position.z = 18;
        if(l_player_p.position.z <= -18)
            l_player_p.position.z = -18;
        if(l_player_p.position.z >= -2)
            l_player_p.position.z = -2;
        if(r_player_p.position.z <= -18)
            r_player_p.position.z = -18;
        if(r_player_p.position.z >= -2)
            r_player_p.position.z = -2;  
    }

    if(gameselect == 1){
        if (ball.position.z + 0.75 >= 16 || ball.position.z - 0.75 <= -16) {
            ball_z *= -1;
        }
    }
    if(gameselect == 2){
        if (ball.position.z + 0.75 >= 20 || ball.position.z - 0.75 <= -20) {
            ball_z *= -1;
        }
    }

    if (ball.position.x + 0.75 >= 30) {
        leftPlayerScore++;
        document.getElementById('leftPlayerScore').innerText = leftPlayerScore;
        reset_ball();
    } else if (ball.position.x - 0.75 <= -30) {
        rightPlayerScore++;
        document.getElementById('rightPlayerScore').innerText = rightPlayerScore;
        reset_ball();
    }
    
    if(gameselect === 1){
        if (Math.abs(ball.position.x - l_player_p.position.x) <= 0.75 &&
        ball.position.z >= l_player_p.position.z - 2 && 
        ball.position.z <= l_player_p.position.z + 2 && ball_bounce == 0)
        {
            sound.play();
            ball_x = -ball_x;
            ball_bounce = 1;
        }

        if (Math.abs(ball.position.x - r_player_p.position.x) <= 0.75 &&
        ball.position.z >= r_player_p.position.z - 2 && 
        ball.position.z <= r_player_p.position.z + 2 && ball_bounce == 1)  
        {
            sound.play();
            ball_x = -ball_x;
            ball_bounce = 0;
        }
    }
    if(gameselect === 2)
    {
        if (Math.abs(ball.position.x - l_player_p.position.x) <= 0.75 &&
        ball.position.z >= l_player_p.position.z - 2 && 
        ball.position.z <= l_player_p.position.z + 2 && ball_bounce == 0)
        {
            sound.play();
            ball_x = -ball_x;
            ball_bounce = 1;
        }

        if (Math.abs(ball.position.x - r_player_p.position.x) <= 0.75 &&
        ball.position.z >= r_player_p.position.z - 2 && 
        ball.position.z <= r_player_p.position.z + 2 && ball_bounce == 1)  
        {
            sound.play();
            ball_x = -ball_x;
            ball_bounce = 0; 
        }

        if (Math.abs(ball.position.x - l_player_p2.position.x) <= 0.75 &&
        ball.position.z >= l_player_p2.position.z - 2 && 
        ball.position.z <= l_player_p2.position.z + 2 && ball_bounce == 0)
        {
            sound.play();
            ball_x = -ball_x;
            ball_bounce = 1;
        }

        if (Math.abs(ball.position.x - r_player_p2.position.x) <= 0.75 &&
        ball.position.z >= r_player_p2.position.z - 2 && 
        ball.position.z <= r_player_p2.position.z + 2 && ball_bounce == 1)  
        {
            sound.play();
            ball_x = -ball_x;
            ball_bounce = 0;
        }
    }
}

function reset_ball()
{
    // Açıyı rastgele seçerken, belirli bir aralıkta (bu durumda -60° ile +60° arasında) bir değer üretir.
    // Bu, topun farklı yönlerde ve açılarda hareket etmesini sağlar.
    let angle = Math.random() * (5 * Math.PI / 7) - Math.PI / 3;

    // Topun X eksenindeki yönünü rastgele seçer. Bu, topun saha içindeki hareket yönünü değiştirir,
    // ve böylece her iki taraf için de adil bir oyun ortamı sunar.
    if (Math.random() < 0.5) {
        angle = Math.PI - angle; //%50 ihtimalle Açıyı ters çevirerek topun yönünü değiştirir.    
    }

    // Rastgele seçilen açı ve belirlenen hız büyüklüğü kullanılarak, topun X ve Z eksenlerindeki hız bileşenlerini hesaplar.
    // Bu, topun oyun alanında belirli bir yörüngede hareket etmesini sağlar.
    ball_x = Math.cos(angle) * hiz_magnitude;
    ball_z = Math.sin(angle) * hiz_magnitude;
    if(ball_x < 0)
    {
        ball_bounce = 0;
    }
    else
        ball_bounce = 1;

    // Topun pozisyonunu oyun alanının merkezine sıfırlar. Bu, puanlandırma sonrası veya oyunun yeniden başlatılması durumunda kullanılır.
    ball.position.set(0, 0, 0);
}


function check_score()
{
    const player1 = localStorage.getItem('player1');
    const player2 = localStorage.getItem('player2');
    const player3 = localStorage.getItem('player3');
    const player4 = localStorage.getItem('player4');
    const raund1_win = localStorage.getItem('raund1_win');
    const raund2_win = localStorage.getItem('raund2_win');
    

    if(leftPlayerScore >= 2 && raundStatus === 1 )
    {
        stopGame();
        localStorage.setItem('raund1_win', player1);
        winnerplayer(player1);
        changePage('TurnuvaStart2');
    }
    else if(rightPlayerScore >= 2 && raundStatus === 1 )
    {
        stopGame();
        localStorage.setItem('raund1_win', player2);
        winnerplayer(player2);
        changePage('TurnuvaStart2');
    }

    if(leftPlayerScore >= 2 && raundStatus === 2 )
    {
        stopGame();
        localStorage.setItem('raund2_win', player3);
        winnerplayer(player3);
        changePage('TurnuvaStart3');
    }
    else if(rightPlayerScore >= 2 && raundStatus === 2 )
    {
        stopGame();
        localStorage.setItem('raund2_win', player4);
        winnerplayer(player4);
        changePage('TurnuvaStart3');
    }

    if(leftPlayerScore >= 2 && raundStatus === 3 )
    {
        stopGame();
        winnerplayer(raund1_win);
        clearLocalStorageGame();
        changePage('game');
    }
    else if(rightPlayerScore >= 2 && raundStatus === 3 )
    {
        stopGame();
        winnerplayer(raund2_win);
        clearLocalStorageGame();
        changePage('game');
    }
    
    else if (leftPlayerScore >= 5) 
    {
        stopGame();
        winnerplayer("Kırmızı");
        changePage('game');
    } 
    else if (rightPlayerScore >= 5) 
    {
        stopGame();
        winnerplayer("Sarı");
        changePage('game');
    }
}

function stopGame()
{
    for (let index = 0; index < animationFrameId.length; index++) {
        const element = animationFrameId[index];
        cancelAnimationFrame(element);
    }
    resetGame();
}

function resetGame()
{
    leftPlayerScore = 0;
    rightPlayerScore = 0;
    resetBallAndPlayers(); 
}

function resetBallAndPlayers()
{
    ball.position.set(0, 0, 0);
    l_player_p.position.set(-28.5, 0, 0);
    r_player_p.position.set(28.5, 0, 0);
}

function make_sound()
{
    listener = new THREE.AudioListener();
    camera.add(listener)
    sound = new THREE.Audio(listener);

    audioLoader = new THREE.AudioLoader();
    audioLoader.load('/img/hit.mp3', function(buffer) {
    sound.setBuffer(buffer);
    sound.setVolume(0.5); 
    });
    
    document.getElementById('audioButton').addEventListener('click', function() {
        var icon = this.querySelector('i');
        if (icon.classList.contains('bi-volume-up-fill') && (isAudioOn)) {
            icon.classList.remove('bi-volume-up-fill');
            icon.classList.add('bi-volume-mute-fill');
            isAudioOn = false;
            sound.setVolume(0);
        } else {
            icon.classList.remove('bi-volume-mute-fill');
            icon.classList.add('bi-volume-up-fill');
            sound.setVolume(1);
            isAudioOn = true;
        }
    });
}
