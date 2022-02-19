const { Board, Led, Sensor } = require("johnny-five");
const board = new Board({ port: 'COM5' });

var firebase = require("firebase");




//Firebase iniciando as config.
var firebaseConfig = {
  apiKey: "AIzaSyBUJj7zSJW1d2r93EosrWI-dqkI5U4aa4M",
  authDomain: "dbestacione.firebaseapp.com",
  databaseURL: "https://dbestacione.firebaseio.com",
  projectId: "dbestacione",
  storageBucket: "dbestacione.appspot.com",

};


board.on("ready", () => {

  firebase.initializeApp(firebaseConfig);

  const andar1 = new Led(13)
  const terreo = new Led(12)

  const ledVaga1 = new Led.RGB({
    pins: {
      red: 6,
      green: 5,
      blue: 3
    },
    isledVaga1: false
  });

  const ledVaga2 = new Led.RGB({
    pins: {
      red: 11,
      green: 10,
      blue: 9
    },
    isledVaga2: false
  });
  // Add led to REPL (optional)
  board.repl.inject({ ledVaga1, ledVaga2 });

  // Turn it on and set the initial color


  andar1.on()
  terreo.on()
  ledVaga1.color("red");


  vaga1 = new Sensor({
    pin: "A1",
    freq: 1000
  });

  vaga2 = new Sensor({
    pin: "A2",
    freq: 1000
  });

  // vaga1 = new Sensor({
  //   pin: "A2  ",
  //   freq: 1000
  // });


  vaga1.on("data", function () {

   

    if (this.value >= 900) {

      //   // vaga1
      firebase.database().ref('VAGA1').set({
        id: 1,
        status: 'on',
        vagaTime: 'off',
        time: 1000,
        direction: 'left'
      });


      ledVaga1.color("red");
     

      console.log('red', this.value)
    } else {


      ledVaga1.color("green");
      
      firebase.database().ref('VAGA1').set({
        id: 1,
        status: 'off',
        vagaTime: 'off',
        time: 1000,
        direction: 'left'
      });


    }



  });




  // VAGA 2
  vaga2.on("data", function () {

   

    if (this.value >= 900) {

      //   // vaga1
      firebase.database().ref('VAGA2').set({
        id: 2,
        status: 'on',
        vagaTime: 'off',
        time: 1000,
        direction: 'right'
      });


      ledVaga2.color("red");
     

      console.log('red', this.value)
    } else {


      ledVaga2.color("green");
      
      firebase.database().ref('VAGA2').set({
        id: 2,
        status: 'off',
        vagaTime: 'off',
        time: 1000,
        direction: 'right'
      });


    }



  });

});
console.log("Projeto EstacionaE Iniciado!\n Integrantes:\n Alex Ferman \n Cleriston Barbosa \n Matheus Gabriel");



