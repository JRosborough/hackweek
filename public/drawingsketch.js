var socket;


function setup() {
  createCanvas(1280, 720);
    background(0);
    socket = io.connect('https://localhost:8080')

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
    
}