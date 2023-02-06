import { dijikstraArray, graph } from "./dijikstra.js";


let canvas = document.getElementById("canvas");
let context = canvas.getContext("2d");
let name = document.getElementById('portName');
let labXpo = document.getElementById('xposition');
let labYpo = document.getElementById('yposition');
let devise = document.getElementById('deviste');
let capital = document.getElementById('State');


// <label id="portName">AirPort :</label><br>
//         <label id="xposition">Xposition :</label><br>
//         <label id="yposition">Yposition :</label><br>
//         <label id="deviste">Deviste :</label><br>
//         <label id="State">State :</label>
//         <label id="State">State :</label>

//         <label id="State">State :</label>

var window_width = 1200;
var window_height = 600;

canvas.width = window_width;
canvas.height = window_height;

canvas.style.background = "#ff8";

const planeright = new Image();
planeright.src = "plane_right.png";
const planeleft = new Image();
planeleft.src = "plane_left.png";
const planeright1 = new Image();
planeright1.src = "plane_right1.png";
const planeleft1 = new Image();
planeleft1.src = "plane_left1.png";
const planeright2 = new Image();
planeright2.src = "plane_right2.png";
const planeleft2 = new Image();
planeleft2.src = "plane_left2.png";
const planeright3 = new Image();
planeright3.src = "plane_right3.png";
const planeleft3 = new Image();
planeleft3.src = "plane_left3.png";

const img1 = new Image();
img1.src = "local.png";
const map = new Image();
map.src = "map2.jpg";





class Position {
    constructor(x, y, name, devise, capital, port) {
        this.x = x;
        this.y = y;
        this.name = name;
        this.devise = devise;
        this.capital = capital;
        this.port = port;
    }
}


const canada = new Position(200, 200, "canada", "Canadian dollar", "Ottawa", "Ottawa Macdonald–Cartier International Airport");
const usa = new Position(251, 299, "usa", "United States dollar", "Washington", "Ronald Reagan Washington National Airport");
const brazil = new Position(420, 430, "brazil", "Brazilian Real ", "Brasília", "President Juscelino Kubitschek International Airport");
const norvege = new Position(627, 190, "norvege", "Norwegian krone", "Oslo", "Oslo Gardermoen Airport");
const morocco = new Position(550, 330, "morocco", "Moroccan Dirham", "Rabat", "Rabat-Salé Airport");
const southAfrica = new Position(645, 485, "southAfrica", "Bloemfontein", "Cape Town", "OR Tambo International Airport");
const russia = new Position(900, 180, "russia", "Russian Ruble ", "Moscow ", "Sheremetyevo International Airport");
const china = new Position(920, 321, "china", "Chinese Yuan", "Beijing", "Beijing Capital International Airport");
const australia = new Position(995, 470, "australia", " Australian dollar", "Canberra", "Canberra Airport");

// Array des aeroports
let aeroports = [canada, usa, brazil, norvege, morocco, southAfrica, russia, china, australia];

function shortestPath(start, end) {
    let path = [];
    let temporeryarray = [];
    var dijikstraArray = graph.Dijkstra(start, end);
    for (let port of dijikstraArray) {
        for (let portpay of aeroports) {
            if (port == portpay.name) {
                temporeryarray = [portpay.x, portpay.y]
                path.push(temporeryarray);
            }

        }
    }
    return path;
}



function draw() {
    var pos1;
    var pos2;

    context.drawImage(map, 0, 0, 1200, 600);
    context.drawImage(img1, 200 - 10, 200 - 20, 20, 20);
    context.drawImage(img1, 420 - 10, 430 - 20, 20, 20); //brazil
    context.drawImage(img1, 627 - 10, 190 - 20, 20, 20); //norvege
    context.drawImage(img1, 251 - 10, 299 - 20, 20, 20);
    context.drawImage(img1, 995 - 10, 470 - 20, 20, 20); //australia
    context.drawImage(img1, 645 - 10, 485 - 20, 20, 20); //southAfrica
    context.drawImage(img1, 550 - 10, 330 - 20, 20, 20); //morocco
    context.drawImage(img1, 920 - 10, 321 - 20, 20, 20);
    context.drawImage(img1, 900 - 10, 180 - 20, 20, 20);

    for (let i = 0; i < dijikstraArray.length; i++) {
        for (let j = 0; j < aeroports.length; j++) {
            if (dijikstraArray[i][0] == aeroports[j].name) {
                pos1 = aeroports[j];
            }
            if (dijikstraArray[i][1] == aeroports[j].name) {
                pos2 = aeroports[j];
            }

        }


        context.beginPath();
        context.lineWidth = 1;
        context.fillStyle = 'red';
        context.moveTo(pos1.x, pos1.y);
        context.lineTo(pos2.x, pos2.y);

        context.stroke();
        context.save();


    }


}



class Plane {
    constructor(arrayPs, speed) {
        this.xpos = arrayPs[0][0];
        this.ypos = arrayPs[0][1];
        this.speed = speed;
        this.i = 0;
        this.xDepart = arrayPs[this.i][0];
        this.yDepart = arrayPs[this.i][1];
        this.yArriver = arrayPs[this.i + 1][1];
        this.xArriver = arrayPs[this.i + 1][0];
        this.angle = 0;
        this.arrat = arrayPs;


    }
    draw(context) {
        // context.beginPath();
        context.drawImage(planeright, this.xpos, this.ypos, 407 / 10, 383 / 10);
    }
    update(planeright, planeleft) {
        var distance = 0;
        var nx = 0,
            ny = 0;




        distance = Math.sqrt(Math.pow(this.xArriver - this.xDepart, 2) + Math.pow(this.yArriver - this.yDepart, 2));
        nx = ((this.xArriver - (this.xDepart + nx)) / distance) * this.speed;
        ny = ((this.yArriver - (this.yDepart + ny)) / distance) * this.speed;
        for (let i = 0; i < this.arrat.length - 1; i++) {
            for (let j = 0; j < aeroports.length; j++) {
                if (this.arrat[i][0] == aeroports[j].x) {
                    context.fillStyle = 'red';
                    context.beginPath();
                    context.lineWidth = 3;

                    context.moveTo(this.arrat[i][0], this.arrat[i][1]);
                    context.lineTo(this.arrat[i + 1][0], this.arrat[i + 1][1]);
                    context.stroke();
                }

            }
        }

        for (let i = 0; i < aeroports.length; i++) {
            if (this.xDepart == aeroports[i].x) {
                name.innerHTML = "Airport Name  :  " + aeroports[i].port;
                labXpo.innerHTML = "Position x   :  " + aeroports[i].x;
                labYpo.innerHTML = "Position y  :  " + aeroports[i].y;
                devise.innerHTML = "Currency  :  " + aeroports[i].devise;
                capital.innerHTML = "Capital  :  " + aeroports[i].capital;
            }
        }

        if (Math.floor(this.xpos - 5) <= this.xArriver && Math.floor(this.xpos + 5) >= this.xArriver) {
            if (this.i + 2 < this.arrat.length) {

                this.i++;
                this.xDepart = this.arrat[this.i][0];
                this.yDepart = this.arrat[this.i][1];
                this.yArriver = this.arrat[this.i + 1][1];
                this.xArriver = this.arrat[this.i + 1][0];
            } else {
                for (let i = 0; i < aeroports.length; i++) {
                    if (this.xArriver == aeroports[i].x) {
                        name.innerHTML = "Airport Name  :  " + aeroports[i].port;
                        labXpo.innerHTML = "Position x   :  " + aeroports[i].x;
                        labYpo.innerHTML = "Position y  :  " + aeroports[i].y;
                        devise.innerHTML = "Currency  :  " + aeroports[i].devise;
                        capital.innerHTML = "Capital  :  " + aeroports[i].capital;
                    }
                }
                return;
            }


        }


        this.xpos += nx;
        this.ypos += ny;
        this.angle = Math.atan((this.yArriver - this.yDepart) / (this.xArriver - this.xDepart));
        if (this.xDepart > this.xArriver) { this.angle = this.angle + Math.PI }
        context.save();
        context.translate(this.xpos, this.ypos);
        context.rotate(this.angle);
        // context.drawImage(planeright, this.xpos, this.ypos, 407 / 8, 383 / 8);
        context.drawImage(planeright, -407 / 16, -383 / 16, 407 / 8, 383 / 8);
        context.translate(0, 0);
        context.restore();


    }
}

const plane1 = new Plane(shortestPath("usa", "australia"), 1);
let plane2;
const plane3 = new Plane(shortestPath("canada", "morocco"), 0.3);
const plane4 = new Plane(shortestPath("russia", "brazil"), 0.3);
const plane5 = new Plane(shortestPath("russia", "australia"), 0.3);
const plane6 = new Plane(shortestPath("morocco", "china"), 0.3);

let game = 0;
const planes = [];


function flyPlane() {

    if (game % 80 == 0) {

        let src = document.getElementById('source').value;
        let dst = document.getElementById('destination').value;
        let speed = document.getElementById('speed').value;

        if (speed == '')
            speed = 0.3;


        if (src == dst) {
            alert('u can not choose the same sorce and destination !');
            return;
        }

        console.log(src);
        console.log(dst);

        planes.push(new Plane(shortestPath(src, dst), 0.3));
        const plane = new Plane(shortestPath(src, dst), speed);


        return plane;

    }





}





let plane = flyPlane();





function animate() {
    context.clearRect(0, 0, window_width, window_height);
    context.fillStyle = 'white';
    draw();
    plane.update(planeright, planeleft);
    game++;
    requestAnimationFrame(animate);
}
animate();


{ /* <form action="javascript:void();" */ }