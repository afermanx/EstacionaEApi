
//chama a biblioteca do jhony-five, pegando o board a ser trabalhada
var five = require("johnny-five"),
  board, photoresistor;


  //import .env
  require('dotenv').config()

  //chama o firebase database nao relacional para o fluxo das vagas
  var firebase = require("firebase");



 // seta a porta do arduino no meu caso a com5
  board = new five.Board({port :'COM5'});


  // setanto as config dos parametros para conectar ao databse
  
 var firebaseConfig = {
  apiKey: process.env.FB_APIKEY,
  authDomain: process.env.FB_AUTHDOMAIN,
  databaseURL: process.env.FB_DATABSEURL,
  projectId: process.env.FB_PROJECTID,
  storageBucket: process.env.FB_STORAGEBUCKET,
 
};




  // inicia a board com os parametros ja setados para começar a brincadeira
board.on("ready", function() {

  firebase.initializeApp(firebaseConfig);

   // setando os  leds para cada pino e passando para um constante
   const G = new five.Led(13);



   firebase.database().ref('VAGA1').set({
    status:'off'
     
    
    
  });


  const rootRef = firebase.database().ref().child('VAGA1');
  const vaga1Ref= rootRef.child('status');

  

  vaga1Ref.on('value', snap =>{
    // this.setState({
    //   v1: snap.val()
      
    // });

    snap.val() === "on" ? G.on() : G.off()
  
    
   
    });



//   vaga1 = new five.Sensor({
//     pin: "A0",
//     freq: 250
//   });


//   vaga1.on("data", function() {
//     console.log(this.value)
//     if(this.value < 1023 ){
      
    
//       G.off()
    
//       // firebase.database().ref('VAGA1').set({
//       //   VAGA1:'on'
        
//       // });

//     }else if(this.value >= 1023){     
//       G.on()
//       // firebase.database().ref('VAGA1').set({
//       //   VAGA1:'off'
//       // });
      
    
//     }
    

//   });

});
console.log("Projeto EstacionaE Iniciado!");