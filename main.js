status1 = "";
input = "";
objects = [];

function preload() {

}

function setup() {
    canvas = createCanvas(380, 380);
    canvas.center();
    video = createCapture(VIDEO);
    video.size(380, 380);
    video.hide();
}

function start() {
    objectDetector = ml5.objectDetector('cocossd', modelLoaded);
    document.getElementById("status").innerHTML = "Status: Detecting Objects";
    input = document.getElementById("input").value;
}

function modelLoaded() {
    console.log("Model Loaded");
    status1 = true;

}

function draw() {
    image(video, 0, 0, 380, 380);
    if(status1 != "") {
        objectDetector.detect(video, gotResults);
        for (i = 0; i < objects.length; i++) {

            fill("#FF0000");
            percent = floor(objects[i].confidence * 100);
            text(objects[i].label + " " + percent + "%", objects[i].x + 15, objects[i].y + 15);
            noFill();
            stroke("#FF0000");
            rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height);

            if(objects[i].label == input) {
                console.log("if condition working");
                video.stop();
                console.log("live cam stopped");
                objectDetector.detect(gotResults);
                console.log("object detector stops");
                document.getElementById("detection").innerHTML = "Object Mentioned Found";
                console.log("label working");
                var synth = window.speechSynthesis;
                speak_data = "Object Mentioned Found";
                var utterThis = new SpeechSynthesisUtterance(speak_data);
                synth.speak(utterThis);
                console.log("speech is working");
            }
        
            else {
                document.getElementById("detection").innerHTML = "Object Mentioned Not Found";
            }
        }
        }
    }


function gotResults (error, results) {
    if(error) {
        console.log(error);
    }
    console.log(results);
    objects = results;
}