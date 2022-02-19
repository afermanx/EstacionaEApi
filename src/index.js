
// var five = require("johnny-five"),
//   board, photoresistor;




// board = new five.Board({ port: 'COM5' });


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







// board.on("ready", function () {

//   firebase.initializeApp(firebaseConfig);

//   //leds
//   const G = new five.Led(13);




//   // vaga1
//   firebase.database().ref('VAGA1').set({
//     id:01,
//     status: 'off',
//     vagaTime: 'off',
//     time: 1000,
//     direction:'left'
//   });

//   // vaga2
//   firebase.database().ref('VAGA2').set({
//     id:02,
//     status: 'on',
//     vagaTime: 'off',
//     time: 1000,
//     direction:'right'

//   });

//   // vaga3
//   firebase.database().ref('VAGA3').set({
//     id:03,
//     status: 'off',
//     vagaTime: 'off',
//     time: 1000,
//     direction:'left'

//   });
//   // vaga4
//   firebase.database().ref('VAGA4').set({
//     id:04,
//     status: 'off',
//     vagaTime: 'off',
//     time: 1000,
//     direction:'right'

//   });

//    // vaga4
//    firebase.database().ref('VAGA5').set({
//     id:05,
//     status: 'off',
//     vagaTime: 'off',
//     time: 1000,
//     direction:'left'

//   });
//    // vaga4
//    firebase.database().ref('VAGA6').set({
//     id:06,
//     status: 'off',
//     vagaTime: 'off',
//     time: 1000,
//     direction:'right'

//   });


//    // vaga4
//    firebase.database().ref('VAGA7').set({
//     id:07,
//     status: 'off',
//     vagaTime: 'off',
//     time: 1000,
//     direction:'left'

//   });
//  // vaga4
//  firebase.database().ref('VAGA8').set({
//   id:08,
//   status: 'off',
//   vagaTime: 'off',
//   time: 1000,
//   direction:'right'

// });








//   const rootRef = firebase.database().ref().child('VAGA1');

//   const vaga1Ref = rootRef.child('status');
//   const vaga1vagaTime = rootRef.child('vagaTime');
//   const vaga1Time = rootRef.child('time');







//   let timeVaga1 = 0;
//   vaga1Time.on('value', snap => {

//     let time = snap.val()

//     timeVaga1 = time


//   });


//   vaga1vagaTime.on('value', snap => {


//     let temporary;
//     if (snap.val() === "on") {



//       temporary = setInterval(function () {
//         G.blink(1000)
//       }, timeVaga1, "sai da vaga")

//     } else {

//       G.off()

//       clearInterval(temporary)

//     }




//   });



//   vaga1Ref.on('value', snap => {



//     snap.val() === "on" ? G.on()  : G.off()


//   });



//   //   vaga1 = new five.Sensor({
//   //     pin: "A0",
//   //     freq: 250
//   //   });


//   //   vaga1.on("data", function() {
//   //     console.log(this.value)
//   //     if(this.value < 1023 ){


//   //       G.off()

//   //       // firebase.database().ref('VAGA1').set({
//   //       //   VAGA1:'on'

//   //       // });

//   //     }else if(this.value >= 1023){     
//   //       G.on()
//   //       // firebase.database().ref('VAGA1').set({
//   //       //   VAGA1:'off'
//   //       // });


//   //     }


//   //   });

// });
console.log("Projeto EstacionaE Iniciado!\n Integrantes:\n Alex Ferman \n Cleriston Barbosa \n Matheus Gabriel");