noseX = 0;
noseY = 0;
leftwristX = 0;
rightwristX = 0;
difference = 0;

function setup() {
    video = createCapture(VIDEO);
    video.size(550,550);
    video.position(50,50);

    canvas = createCanvas(550,550);
    canvas.position(700,125);

    poseNet = ml5.poseNet(video, modelLoaded);
    poseNet.on('pose',gotPoses);
}

function draw() {
    background("#000066"); 
    fill("#ff66ff");
    stroke("black");
    square(noseX,noseY,difference);
    document.getElementById("square").innerHTML = "The size of the square is:" + difference + "px";
}

function modelLoaded() {
    console.log("Model is loaded.");
}

function gotPoses(results) {
    if (results.length > 0) {
       console.log(results); 
       noseX = results[0].pose.nose.x;
       noseY = results[0].pose.nose.y;
       console.log("noseX = " + noseX + " noseY =" + noseY);

       leftwristX = results[0].pose.leftWrist.x;
       rightwristX = results[0].pose.rightWrist.x;
       console.log("leftwristX =" + leftwristX + " rightwristX =" + rightwristX);
       difference = floor(leftwristX - rightwristX);
       console.log("difference =" + difference);
    }
}