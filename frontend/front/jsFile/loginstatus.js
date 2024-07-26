
function loginstatus(callback) {
    var xhr = new XMLHttpRequest();
    xhr.open('POST', 'https://10.12.4.4/api/loginstatus/', true);
    xhr.setRequestHeader('Content-Type', 'application/json;charset=UTF-8');

    const username = localStorage.getItem('username');
    xhr.onload = function() {
        if (xhr.status === 200) {
            isLoggedIn = true;
        } if(xhr.status === 201) {
            localStorage.setItem('isLoggedIn', false);
            isLoggedIn = false; 
        }
        if (typeof callback === "function") {
            callback(loginStatus); // Callback fonksiyonunu çağır
        }
    };
    if(username === false)
    xhr.send(JSON.stringify({username: username}));
}


function exituser() {
    var xhr = new XMLHttpRequest();
    xhr.open('POST', 'https://10.12.4.4/api/exituser/', true);
    xhr.setRequestHeader('Content-Type', 'application/json;charset=UTF-8');

    const username = localStorage.getItem('username');
    xhr.onload = function() {
        if(xhr.status === 201)
        {    
            isLoggedIn = false;
        }
        if(xhr.status === 400)
        {     
            alert('Çıkış Yapılamadı');
        }
    };
    xhr.send(JSON.stringify({username: username}));
}
