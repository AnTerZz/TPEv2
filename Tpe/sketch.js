/* Valeurs utilisées :
Altitude : 0ft Conditions normale de Pression
Coefficiend d'Oswald 0,7 (généralement compris entre 0,7 et 0,9), valeur estimée par M. Goumain
aP = aT = 0,11 (calculé)*/
//temperature = 288,15K CHTP



var sVitesse, sIncidence, sAltitude, vPortance, vTrainée, Patm;

function setup() {
	createCanvas(800, 500);
	background(0,0,0);
	//images
	sky = loadImage("images/sky.jpeg");
	plane = loadImage("images/avion.png");
	portance = loadImage("images/portance.png");


	//slider
	sVitesse = createSlider(50, 120);
	sVitesse.position(30, 30);
	sIncidence = createSlider(1, 14);
	sIncidence.position(30, 80);
	sAltitude = createSlider(0, 10000);
	sAltitude.position(30, 130);
}


function draw() {
	Patm = (1225/1000)*Math.pow(1 - (((65/10000)/((28815/100)))*sAltitude.value()), 4,255);


	image(sky,0,0,800,500);
	imageMode(CENTER);
	translate(400,250);
	rotate(PI / 180 * sIncidence.value());
	image(plane,0,150,332,200);
	imageMode(CORNER);


	chiffres();

	//Calcul Portance
	var Rz = (Patm * sq(sVitesse.value() * (514/1000)) * (142/10) * (sIncidence.value()/10))/2;
	text("Portance : " + nfc(Rz,0) + " N",120,30);

	//Calcul Trainée
	var Cx = ((5/100) + ((sq(11/100)*sq(sIncidence.value()))/(PI*(535/100)*(7/10))));
	var Rx = (Patm * sq(sVitesse.value() * (514/1000)) * (142/10) * Cx)/2;
	text("Traînée : " + nfc(Rx,0) + " N",120,60);

	strokeWeight(4);
	stroke(255, 0, 0);

	//Vecteur Portance
	vPortance = createVector(0, Rz / 130);
	fleche("v", vPortance.y, 0, 150);

	//Vecteur Trainée
	vTrainée = createVector(Rx / 25, 0);
	fleche("h", vTrainée.x, 0, 150);

	translate(100,-100);

	//Echelle Portance 50px = 6500N
	fleche("v", 50, 0, 0);
	text("6500 N", -20, -60);

	//Echelle trainée 50px = 1250N
	fleche("h", 50, 0, 0);
	text("1250 N", 60, 4);

}

function chiffres() {
	strokeWeight(1);
	stroke(0,0,0);
	rotate(-PI / 180 * sIncidence.value());
	translate(-400, -250);
	textSize(16);
	text("Vitesse : " + sVitesse.value().toString() + " kts", 200, 45);
	text("Incidence : " + sIncidence.value().toString() + " °", 200, 97);
	text("Altitude : " + sAltitude.value().toString() + " m", 200, 146);
	translate(400, 250);
	rotate(PI / 180 * sIncidence.value());
}

function fleche(str, length, x, y) {
	var a = 10;
	if (length < 0) {
		a = -a;
	}
	beginShape(LINES);
	vertex(x, y);
	if (str == "v") {
		vertex(x, y - length);
		vertex(x, y - length);
		vertex(x - a, y - length + a);
		vertex(x, y - length);
		vertex(x + a, y - length + a);
	} else if (str == "h") {
		vertex(x + length, y);
		vertex(x + length, y);
		vertex(x + length - a, y - a);
		vertex(x + length, y);
		vertex(x + length - a, y + a);
	}
	endShape();
}
