var five = require("johnny-five"),
  board, photoresistor;
 
  board = new five.Board({port :'COM5'});



board.on("ready", function() {

   //leds
   const G = new five.Led(13);

  vaga1 = new five.Sensor({
    pin: "A0",
    freq: 250
  });


  vaga1.on("data", function() {
    console.log(this.value)
    if(this.value < 1023 ){
      
    
      G.off()
    
      // firebase.database().ref('VAGA1').set({
      //   VAGA1:'on'
        
      // });

    }else if(this.value >= 1023){     
      G.on()
      // firebase.database().ref('VAGA1').set({
      //   VAGA1:'off'
      // });
      
    
    }
    

  });

});
console.log("Projeto EstacionaE Iniciado!");