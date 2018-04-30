var socket;
var cap;
var constraints;



function setup() {
  createCanvas(1280, 720);
    background(0);
    socket = io.connect('https://localhost:8080')
   constraints = {
    video: {
      mandatory: {
        minWidth: 1280,
        minHeight: 720,
      },
      optional: [{ maxFrameRate: 10 }]
    },
    audio: true
  };
    imageMode(CENTER);
  
    cap = createCapture(VIDEO);
  cap.hide(); 
    
    socket.on('mouse', function(data){
     rect(data.x,data.y,10,10) ;   
    }
    );
    

}
function mouseDragged() {
    
    var data = {
        x:mouseX,
        y:mouseY,
    };

    fill(255);
    ellipse(data.x,data.y,100,100);
        
    socket.emit('mouse',data);
}



function draw() {
    
    if(frameCount%300==0){
        console.log("framecount test");
        
  image(cap, width/2, height/2, 640, 360);
       // cap.save('photo', 'png');
        saveCanvas();
        
       
       
        
        
}
}


