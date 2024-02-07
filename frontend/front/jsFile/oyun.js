function gameAdd() {
    return `
        <button class="start-button" onclick="changePage('buttonstart')">
        <img src="img/basla.png" alt="buttonstart" style="width: 250px; height: 100px;"/>
        </button>
    `;
}

function buttonstart() {
    return `
        <canvas id="pong" width="600" height="400"></canvas>
    `;
}
