let scene;
let camera;
let renderer;
let l_player_p;
let r_player_p;

let r_player_size;
let r_player_material;
let r_player;

let leftPlayerScore = 0;
let rightPlayerScore = 0;
let animationFrameId;

let ground;
let groundGeometry;
let groundMaterial;

let ball;
let geometry;
let material;
let light;

let ball_x = 0.25;
let ball_z = 0.065;
let random = random_count(1, 4);

let listener;
let audioLoader;
let sound;

let isAudioOn = true;
const audioButton = document.getElementById('audioButton');

function game_start()
{   
    create_scene();
    create_light();
    create_floor();
    l_player_p = create_player(-28.5);
    r_player_p = create_player(28.5);
    create_ball();
    console.log("ball_x: " + ball_x + " ball_z: " + ball_z);
}

function loop()
{
    document.addEventListener("keypress", player_move);
    document.addEventListener("keypress", cam_pos);
    move_ball();
    check_score();
    renderer.render(scene, camera);
    animationFrameId = requestAnimationFrame(loop);
}

// function create_scene()
// {
//     scene = new THREE.Scene();
//     camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
//     scene.background = new THREE.Color(0xffbae9);
    
//     renderer = new THREE.WebGLRenderer();
//     renderer.shadowMap.enabled = true;
//     renderer.setSize(window.innerWidth, window.innerHeight);
//     document.getElementById('scene-container').appendChild(renderer.domElement);
    
//     camera.position.set(0, 14, 20);
//     camera.lookAt(0, 0, 0);
// }

function create_scene() {
    scene = new THREE.Scene();
    camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    
    var loader = new THREE.TextureLoader();
    // loader.load('/img/background.jpg', function(texture) {
    //     scene.background = texture;
    // });
    
    renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.shadowMap.enabled = true;
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.getElementById('scene-container').appendChild(renderer.domElement);
    
    camera.position.set(0, 40, 25);
    camera.lookAt(0, 0, 0);
}

function changeCamera(key) {
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

// Mause ile tanımladığınız butonlara tıklama olduğunda
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

function create_floor()
{
    groundGeometry = new THREE.BoxGeometry(60, 40, 1);
    groundMaterial = new THREE.MeshStandardMaterial({ color: 0x323232});
    ground = new THREE.Mesh(groundGeometry, groundMaterial);
    ground.receiveShadow = true;
    ground.rotation.x = -Math.PI / 2;
    ground.position.y = -1;

    var material = new THREE.LineBasicMaterial({ color: 0xffffff });
    var points = [];
    
    
    points.push(new THREE.Vector3(0, 0, 20));
    points.push(new THREE.Vector3(0, 0, -20));
    
    var geometry = new THREE.BufferGeometry().setFromPoints(points);
    var line = new THREE.Line(geometry, material);
    scene.add(line);
    scene.add(ground);
    create_z_edge(0, -1, 20.5);
    create_z_edge(0, -1, -20.5);
    create_x_edge(30.5, -1, 0);
    create_x_edge(-30.5, -1, 0);
}

function create_x_edge(x, y, z)
{
    r_player_size = new THREE.BoxGeometry(1, 1.5, 42);
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

function create_player(x)
{
    r_player_size = new THREE.BoxGeometry(0.5, 0.5, 4);
    r_player_material = new THREE.MeshStandardMaterial({color: 0xFFC300});
    r_player = new THREE.Mesh(r_player_size, r_player_material);
    scene.add(r_player);
    r_player.position.x = x;
    return r_player;
}

function player_move(event)
{
    if ((event.key == "w" || event.key == "a") && l_player_p.position.z >= -17)
        l_player_p.position.z -= 1;
    if ((event.key == "s" || event.key == "d") && l_player_p.position.z <= 17)
        l_player_p.position.z += 1;
    if (event.key == "o" && r_player_p.position.z >= -17)
        r_player_p.position.z -= 1;
    if (event.key == "l" && r_player_p.position.z <= 17)
        r_player_p.position.z += 1;
    console.log("-----------------------");
    console.log("player " + (l_player_p.position.x) + " " + (l_player_p.position.y) + " "  + (l_player_p.position.z));
    console.log("player " + (l_player_p.position.x) + " " + (l_player_p.position.y) + " "  + (l_player_p.position.z - 2));
    console.log("player " + (l_player_p.position.x) + " " + (l_player_p.position.y) + " "  + (l_player_p.position.z + 2));
    console.log("-----------------------");
    console.log("-----------------------");
    console.log("player " + (r_player_p.position.x) + " " + (r_player_p.position.y) + " "  + (r_player_p.position.z));
    console.log("player " + (r_player_p.position.x) + " " + (r_player_p.position.y) + " "  + (r_player_p.position.z - 2));
    console.log("player " + (r_player_p.position.x) + " " + (r_player_p.position.y) + " "  + (r_player_p.position.z + 2));
    console.log(event.code);
    console.log("-----------------------");
}

function create_ball()
{
    geometry = new THREE.SphereGeometry(0.5, 32,32);
    material = new THREE.MeshStandardMaterial({ color: 0xE63946});
    ball = new THREE.Mesh(geometry, material);
    ball.castShadow = true;
    ball.position.set(0, 0, 0);
    scene.add(ball);
}

function move_ball() {
    // Topun koordinatlarını güncelle
    ball.position.x += ball_x;
    ball.position.z += ball_z;

    const leftScoreElement = document.getElementById('leftPlayerScore');
    const rightScoreElement = document.getElementById('rightPlayerScore');

    if (!leftScoreElement || !rightScoreElement) {
        // Gerekli öğeler henüz yüklenmedi, bu yüzden işlemi burada durdur
        return;
    }

    // Oyun alanının sınırları için çarpışma kontrolü
    if (ball.position.z + 0.5 >= 20 || ball.position.z - 0.5 <= -20) {
        ball_z *= -1;
    }

    // Skor kontrolü ve topun sıfırlanması
    if (ball.position.x + 0.5 >= 30) {
        console.log('Sol Oyuncu Skoru: ', ++leftPlayerScore);
        document.getElementById('leftPlayerScore').innerText = leftPlayerScore;
        reset_ball();
    } else if (ball.position.x - 0.5 <= -30) {
        console.log('Sağ Oyuncu Skoru: ', ++rightPlayerScore);
        document.getElementById('rightPlayerScore').innerText = rightPlayerScore;
        reset_ball();
    }
    
    if(((ball.position.x - 0.5) == (l_player_p.position.x)) && ((ball.position.z) >= ((l_player_p.position.z) - 2.25) && (ball.position.z) <= ((l_player_p.position.z) + 2.25)))
    {
        ball_x = -ball_x;
        //sound.play();
    }

    if(((ball.position.x + 0.5) == (r_player_p.position.x)) && ((ball.position.z) >= ((r_player_p.position.z) - 2.25) && (ball.position.z) <= ((r_player_p.position.z) + 2.25)))  
    {
        ball_x = -ball_x;
        //sound.play();
    }

}

function reset_ball()
{
    ball.position.set(0, 0, 0);

    let x = random_count(1, 4);
      
    if (x == 3)
    {
        ball_x *= 1
    }
    else if (x == 2)
    {
        ball_x *= -1
    }
    else if (x == 1)
    {
        ball_z *= 1
    }
    else if (x == 4)
    {
        ball_z *= -1
    }
}

function random_count(min, max)
{
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function check_score()
{
    if (leftPlayerScore >= 100) {
        stopGame();
        alert("Kazanan: Sol Oyuncu");
    } else if (rightPlayerScore >= 100) {
        stopGame();
        alert("Kazanan: Sağ Oyuncu");
    }
}

function stopGame() {
    cancelAnimationFrame(animationFrameId);
    resetGame();
}

function resetGame() {
    leftPlayerScore = 0;
    rightPlayerScore = 0;
    resetBallAndPlayers(); 
    loop();
}

function resetBallAndPlayers() {
    // Topun ve oyuncuların başlangıç pozisyonlarını ayarlayın.
    ball.position.set(0, 0, 0); // Topu ortaya koy
    l_player_p.position.set(-28.5, 0, 0); // Sol oyuncuyu başlangıç pozisyonuna getir
    r_player_p.position.set(28.5, 0, 0); // Sağ oyuncuyu başlangıç pozisyonuna getir
    // Diğer başlangıç ayarlarını da burada yapabilirsiniz.
}

function make_sound()
{
    listener = new THREE.AudioListener();
    audioLoader = new THREE.AudioLoader();
    sound;

    audioLoader.load('hit.mp3', function(buffer){
    sound = new THREE.Audio(listener);
    sound.setBuffer(buffer);
});
    camera.add(listener);

audioButton.addEventListener('click', function() {
    if (isAudioOn) {
        isAudioOn = false;
        sound.setVolume(0);
        audioButton.innerText = 'Ses: Kapalı';
        
    } else {
        isAudioOn = true;
        sound.setVolume(1);
        audioButton.innerText = 'Ses: Açık';
    }
});
}
