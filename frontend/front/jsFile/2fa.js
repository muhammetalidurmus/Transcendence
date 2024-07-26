let faTimer = true;
function twofaAdd() {
    return `
    <title data-translate="titlelogin"> Two Factor Auth </title>
    <div class="profil-backgraund">
        <div class="login">
            <form action="" method="post" id="twofactorform" class="auth-form" onsubmit="validateTwoFactor(event)">
                <label class="auth-label" data-translate="2fa"></label>
                <label class="auth-label" data-translate="2fa2"></label>
                <input type="text" id="2facode" name="twofa" class="auth-input" required>
                <button type="submit" class="auth-button" data-translate="yes"></button>
            </form>
        </div>
        <div id="countdown"></div>
    </div>
    `;
}


function startCountdown() {

        var timeleft = 60; // Geri sayım süresi (saniye cinsinden)
        var countdownTimer = setInterval(function(){
        var seconds = timeleft % 60;
        var minutes = Math.floor(timeleft / 60);
        
        if(faTimer === true){
        var countdownElement = document.getElementById("countdown");
        countdownElement.innerHTML = "<h1 style='color:white;'>" + minutes + ":" + seconds + "</h1>"; }

        timeleft--;

        if(timeleft < 0) {
            clearInterval(countdownTimer);
            changePage('login');
            localStorage.removeItem("2faToken");
        }
    }, 1000);
}

function validateTwoFactor(event)
{
    event.preventDefault();
    const code = document.getElementById("2facode").value;

    const xhr = new XMLHttpRequest();
    xhr.open('POST', 'https://10.12.4.4/api/validateTwoFactor/');
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.onreadystatechange = function () {
        if (xhr.readyState == 4) {
            if (xhr.status == 200) {
                const data = JSON.parse(xhr.responseText);
                if (data) 
                {
                    if(data.status == "success")
                    {
                        localStorage.setItem("loginToken", data.loginToken);
                        localStorage.removeItem("2faToken");
                        faTimer = false; 
                        loginSuccess();
                        getMe(data.loginToken);
                    }
                    else{
                        badcodeFA();
                    }
                } 
                else {
                    alert('Error while processing the request.');
                }

            } else {
                timeFA();
            }
        }
    };

    // accessToken'i doğru şekilde kullan
    const requestBody = JSON.stringify({ jwt: localStorage.getItem("2faToken"), code: code});
    xhr.send(requestBody);
}

function set2fa(state)
{
    const xhr = new XMLHttpRequest();
    xhr.open('POST', 'https://10.12.4.4/api/set2fa/');
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.onreadystatechange = function () {
        if (xhr.readyState == 4) {
            if (xhr.status == 200) {
                const data = JSON.parse(xhr.responseText);
                if (data) 
                {
                    FAstatus();
                } 
                else {
                    alert('Error while processing the request.');
                }

            } else {
                alert('Error while processing the request.');
            }
        }
    };

    const requestBody = JSON.stringify({ 
        jwt: localStorage.getItem("loginToken"), 
        state: state == true ? "True" : "False" 
    });
    xhr.send(requestBody);
}