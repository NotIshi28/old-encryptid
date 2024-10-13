
// function applyBarrelDistortion() {
//     const content = document.getElementById('content');
//     const rect = content.getBoundingClientRect();
//     const centerX = rect.width / 2;
//     const centerY = rect.height / 2;

//     // dividing balances and multiplying increases the effect
//     content.style.transform = `
//         perspective(1000px)
//         rotateX(${(centerY - rect.height / 2.1) * 0.2}deg)
//         rotateY(${-(centerX - rect.width / 2.1) * 0.2 }deg)
//         scale(1.1)
//     `;
// }

// window.addEventListener('resize', applyBarrelDistortion);
// applyBarrelDistortion();

// BLUE COLOR
// 				0	0.15	0	0	0
// 				0	0.5	0	0	0
// 				0	1	1	0	0
// 				1	1	1	1	0 
//
// YELLOW COLOR
// 				0	1	0	0	0
// 				0	1	0	0	0
// 				0	0	0	0	0
// 				0	0	0	1	0
//
// GREEN COLOR
// 				0	0	0	0	0
// 				0	1	0	0	0
// 				0	0	0	0	0
// 				0	0	0	1	0
// 
// RED COLOR
// 				0	1	0	0	0
// 				0	0.25	0	0	0
// 				0	0.25	0	0	0
// 				0	1	0	1	0
//
// GRAY COLOR
// 				0	1	0	0	0
// 				0	1	0	0	0
// 				0	1	0	0	0
// 				1	1	0	1	0
// 
// ORIGINAL COLOR
// 				1	0	0	0	0
// 				0	1	0	0	0
// 				0	0	1	0	0
// 				0	0	0	1	0

function getRndInteger(min, max){
    return Math.floor(Math.random() * (max - min + 1) ) + min;
}
var colorAnt = "originalC";

function setColor(wich, rootEl, color) {
    var arrColors = {}
    arrColors['yellowC'] = "0 1 0 0 0 0 1 0 0 0 0 0 0 0 0 0 0 0 1 0";
    arrColors['greenC'] = "0 0 0 0 0 0 1 0 0 0 0 0 0 0 0 0 0 0 1 0";
    arrColors['blueC'] = "0 0.15 0 0 0 0 0.6 0 0 0 0 0.8 1 0 0 1 1 1 1 0";
    arrColors['redC'] = "0 0.8 0 0 0 0 0.4 0 0 0 0 0.3 0 0 0 0 0.9 0.8 1 0";
    arrColors['grayC'] = "0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 1 1 0 1 0";
    arrColors['originalC'] = "1 0 0 0 0 0 1 0 0 0 0 0 1 0 0 0 0 0 1 0";

    colorAnt = color;
    
    document.getElementById(wich).setAttribute("dur","0.75s");
    document.getElementById(wich).setAttribute("fill","freeze");
    document.getElementById(wich).setAttribute("begin","0s");
    document.getElementById(wich).setAttribute("repeatCount","1");
    
    var colrT = arrColors[colorAnt] + "; " + arrColors['grayC'] + "; " + arrColors[color];
    
    document.getElementById(wich).setAttribute("values",colrT);

    localStorage.setItem('chosenColor', color);
    // Log the color from local storage
    console.log('Color from local storage:', localStorage.getItem('chosenColor'));
}

//function getRndInteger(min, max)
function loadColor()
{
    
    if(localStorage.getItem('chosenColor') == null){
        setColor('colA','svg-root','originalC');
    }
    else{
        setColor('colA', 'svg-root', localStorage.getItem('chosenColor'));
    }
    
}

var div_menu = document.getElementById("menu");
var div_content = document.getElementById("content");


function showWin(wich,vis)
{
    document.getElementById(wich).style.display = vis;
    if(vis == "block")
    {
        document.getElementById(wich).style.zIndex = "1000000";
    }
    else
    {
        document.getElementById(wich).style.zIndex = "0";
    }
    
}

function powerOff()
{
    document.getElementById("screensaver").style.visibility = "visible";

    document.getElementById("screen").style.opacity = "0%";
    document.getElementById("scanline").style.opacity = "0%";

    document.getElementById("screen").style.visibility = "hidden";
    document.getElementById("scanline").style.visibility = "hidden";
    document.getElementById("scanline").style.display = "none";
    
    
    let logo = document.getElementById('logo');
    let screensaver = document.getElementById('screensaver');
    let posX = 0, posY = 0;
    let velX = 2, velY = 2;

    console.log(document.getElementById('crt-frame').style.zIndex);
    console.log(document.getElementById('logo').style.zIndex);

    function updatePosition() {
    posX += velX;
    posY += velY;

    if (posX + logo.clientWidth >= window.innerWidth || posX <= 0) {
        velX = -velX;
    }
    if (posY + logo.clientHeight >= window.innerHeight || posY <= 0) {
        velY = -velY;
    }

    logo.style.left = posX + 'px';
    logo.style.top = posY + 'px';
    }

    function startScreensaver() {
    screensaver.style.display = 'block';
    setInterval(updatePosition, 1);
    }

    function stopScreensaver() {
    screensaver.style.display = 'none';
    }

    startScreensaver();
}

function powerOn()
{
    document.getElementById("screensaver").style.visibility = "hidden";
    document.getElementById("screensaver").style.display = "none";

    document.getElementById("screen").style.opacity = "100%";
    document.getElementById("scanline").style.opacity = "100%";

    document.getElementById("screen").style.visibility = "visible";
    document.getElementById("scanline").style.visibility = "visible";
    document.getElementById("scanline").style.display = "block";
}

function start(){
    if(document.getElementById("start-menu").style.display == "block")
    {
        showWin('start-menu','none');
    }
    else if(document.getElementById("start-menu").style.display == "none")
    {
        showWin('start-menu','block');
    }
}
