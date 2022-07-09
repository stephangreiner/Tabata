if (navigator.serviceWorker) {
  // Start registration process on every page load
  window.addEventListener('load', () => {
      navigator.serviceWorker
          // The register function takes as argument
          // the file path to the worker's file
          .register('/sw.js')
          // Gives us registration object
          .then(reg => console.log('Service Worker Registered'))
          .catch(swErr => console.log(
                `Service Worker Installation Error: ${swErr}}`));
    });
}






// Contanten zeigen lediglich auf html Elemente der Input von html 
const belastungseingabe = document.getElementById('eindauer');
const ausruheingabe = document.getElementById('einruhe');
const rundeneingabe = document.getElementById('einrunden');
const medienwahl = document.getElementById("Medienwahl");
// der Ausgang zu html 
const ZA = document.getElementById('Zeitanzeige');
const RA = document.getElementById('Rundenanzeige');
const TA = document.getElementById('Textanzeige');
const BB = document.getElementById("Balkenzeit")


// Starten des Programms durch ausführen von Funktionen
wertzeigen();
function wertzeigen() {
  belastungseingabe.min = 1;
  ausruheingabe.min = 1;
  rundeneingabe.min = 1;
  belastungseingabe.max = 60;
  ausruheingabe.max = 60;
  rundeneingabe.max = 20;
  belastungseingabe.value = 20;
  ausruheingabe.value = 10;
  rundeneingabe.value = 8;
  // Anzeige der eingegebenen Werte schon bevor Wertsetzenfunktion ausgeführt wird
  document.getElementById('dauer').innerHTML = belastungseingabe.value;
  document.getElementById('ruhe').innerHTML = ausruheingabe.value;
  document.getElementById('runden').innerHTML = rundeneingabe.value;
  // Grundanzeige vor Änderung der Variablen 
  belastungseingabe.oninput = function() {document.getElementById('dauer').innerHTML = belastungseingabe.value;};
  ausruheingabe.oninput = function() {document.getElementById('ruhe').innerHTML = ausruheingabe.value;};
  rundeneingabe.oninput = function() {document.getElementById('runden').innerHTML = rundeneingabe.value;};
}


ZA.innerHTML = "-----";
RA.innerHTML = '0 / 0';
zurueckknopf.onclick = function(){location.reload()}

// Änderungen bei button start und zurück
startknopf.onclick = function() {
  runTabata( 5 , belastungseingabe.value, ausruheingabe.value, rundeneingabe.value);
  document.getElementById('zeigendiv').style.visibility = 'visible';
  document.getElementById("Einstellungsdiv").style.display = "none"; 
      }

  
// Eigentlicher Tabata array
function runTabata(vorlauf, dauer, ruhe, runden) {
  let arrPeriods = [vorlauf],
  index = 0;
  for(let i = 0; i < runden; i++) {
    arrPeriods.push(dauer);
    arrPeriods.push(ruhe);
    }
   uhrwerk(arrPeriods, index);
}

// Setzen des Timers
function uhrwerk(arrPeriods, index) {
  jetzt = Date.now()
  dann = jetzt + arrPeriods[index] * 1000;
  window.index = index;
  window.arrPeriods = arrPeriods;

 // Die setintervall Methode ruft die funtion x alle 1000ms auf. sie ist an l gekoppelt um mit der clearIntervall Methode gestoppt werden zu können
   l = setInterval(function x() {
    var zeitunterschied = Math.round((dann - Date.now()) / 1000) + 1;
    ZA.innerHTML ="Noch  " + zeitunterschied + "s";
    RA.innerHTML ="Runde " + Math.floor(((index + 1) / 2)) + "/" + (arrPeriods.length - 1) / 2;
    BB.innerHTML = zeitunterschied;
  // 5 Sekunden vor Zeitablauf verschwindet die Zeitanzeige
    if (zeitunterschied < 5) {BB.innerHTML= ""}
  // Bei Zeitablauf wird das Intervall beendet und ein Index hochgezählt
    if(zeitunterschied == 0) {clearInterval(l);
    if(index < arrPeriods.length -1) {index++; uhrwerk(arrPeriods, index);} }
    },1000); 
 // Prüfung index (Arraydurchgänge 0 , gerade und vorletze, nirmalgerade , ungerade Reihenfolge
 if (index == 0 ) {vorlauf()}
  else if (index % 2 == 0 &&  index == arrPeriods.length-1){ende()}
  else if (index % 2 == 0 ) {setTimeout(function(){ruhe()},1000)}
  else if (index % 1 == 0 ) {setTimeout(function(){aktiv()},1000)}
  }


//  Es wird eine globale mediaV eingeführt, die je nach Stand des Selektors geändert wird
var mediaV = 1
medienwahl.addEventListener("change", function() {
    if(medienwahl.value == "1"){mediaV = 1;}
    else if(medienwahl.value == "2"){mediaV = Math.floor(Math.random() * (5 - 1 + 1)) + 1;}
    else if(medienwahl.value == "3"){mediaV = 6}
})
//  Bei der Hälfte der eingegebenen Vorlaufzeit wird die Camera ausgelöst wenn camera nicht an geht der Auslöser einfach  ins leerer kann
function vorlauf(){
    document.body.style.backgroundColor = "black";
    document.getElementById("Balkendiv").style.display = "none";
    TA.innerHTML = "gleich geht es los";
  }
       
function aktiv(){
  balkenschrumpfer();
  // Erzeugt eine Zufallszahl zwischen 0 und 3. Wenn Zufallszahl 0 und die Camera noch an ist, dann mach bei Ende der häfteBelastungszeit ein Foto
  var fotorand = Math.floor(Math.random() * 4 );
  if (fotorand == 0 && Streamansicht.srcObject != null) {setTimeout(function(){fotomachen()},
  (belastungseingabe.value*1000/2)), setTimeout(function(){cameraStop()},belastungseingabe.value*1000)};
   document.getElementById("zurueckknopf").style.display = "none"
   document.body.style.backgroundImage = "none";
   document.body.style.backgroundColor = "#00ff00";
   document.getElementById("Balkendiv").style.display = "";
   BB.style.color = "black"; ZA.style.display = "none"; TA.innerHTML= "GO !!" 
   if (mediaV==1){document.getElementById('gongsound').play();}
   else if (mediaV==2){document.getElementById('gosound1').play();}
   else if (mediaV==3){document.getElementById('gosound2').play();}
   else if (mediaV==4){document.getElementById('gosound3').play();}
   else if (mediaV==5){document.getElementById('gosound4').play();}
   else if (mediaV==6){document.getElementById('m1').play();}
   console.log(Streamansicht.srcObject)
   }
  
function ruhe(){
  //die Kamera wird mit der ersten Ruhephase gestoppt. Wenn sie nicht läuft, geht es ins leere. kann man sicher ebsser machen  
   balkenwachser(),
   document.getElementById('m1').pause();
   document.body.style.background = "black";  
   BB.style.color = "black";ZA.style.display = "none";TA.innerHTML = "Pause";
   if (index % 2 == 0 &&  index == arrPeriods.length-3){vorletztepause()}
   else {normalepause()}  
}

function  normalepause(){
  if (mediaV==1){document.getElementById('gongsound').play();}
  else if (mediaV==2){document.getElementById('kurzepausesound1').play()}
  else if (mediaV==3){document.getElementById('kurzepausesound2').play()}
  else if (mediaV==4){document.getElementById('kurzepausesound3').play()}
  else if (mediaV==5){document.getElementById('kurzepausesound4').play()}
  else if (mediaV==6) {document.getElementById('m1').pause();}
}

function vorletztepause(){
  if (mediaV==1){document.getElementById('gongsound').play();}
  else if (mediaV==2){document.getElementById('vor1').play();}
  else if (mediaV==3){document.getElementById('vor2').play();}
  else if (mediaV==4){document.getElementById('vor3').play();}
  else if (mediaV==5){document.getElementById('vor4').play();}
  else if (mediaV==5){document.getElementById('vor4').play();}
  else if (mediaV==6) {document.getElementById('m1').pause();}   
      }

      // 
function ende(){ 
  // Wenn Camera noch an aus machen
  if (Streamansicht.srcObject != null) {cameraStop()};
   document.getElementById("zurueckknopf").style.display = "none";
   document.body.style.backgroundColor = "blue";
   BB.style.display = "none";TA.innerHTML = "Gratulation !!";ZA.style.display = "none";
   if (mediaV==1){document.getElementById('gongsound').play();}
   else if (mediaV==2){document.getElementById('endesound1').play()}
   else if (mediaV==3){document.getElementById('endesound2').play()}
   else if (mediaV==4){document.getElementById('endesound3').play()}
   else if (mediaV==5){document.getElementById('endesound4').play()}
                   }


// eigene Uhrwerke (setInterval) für das wachsen und schrumpfen des Balkens
function balkenschrumpfer() {
  var Ausganswert = 100;
  var id = setInterval(was, belastungseingabe.value*10,1000);
  function was()
  {if (Ausganswert === 1) {clearInterval(id);} 
  else { Ausganswert= Ausganswert-1; BB.style.width = Ausganswert + '%';}}
                     }
function balkenwachser() {
  var Ausgangswert = 1;
  var id = setInterval(was, ausruheingabe.value*10,1000);
  function was() { 
  if (Ausgangswert === 100) {clearInterval(id);}
  else {Ausgangswert = Ausgangswert+1}; BB.style.width = Ausgangswert + '%';}
                    }
                
// Fotoapp____________________________________________
// das Gesamt Fotodiv urspünglich nicht anzeigen
const GFD = document.getElementById("Gesamtfotodiv")
GFD.style.display="none"

// Camera wird gestopt, wenn 1.Alt ausgewählt wird. Wenn 2.Alt nie ausgewählt geht es ins leere.
const Foto = document.getElementById("Fotomodus");
Foto.addEventListener("change", function() {
    if(Foto.value == "1"){GFD.style.display="none",cameraStop()}
    else if(Foto.value == "2"){GFD.style.display="",cameraStart()}
  })

// constraints für Videostream festlegen hier fullhd Auflösung selbscamer und kein Audio
// alternative 4K video: {width: {exact: }, height: {exact: }}
// ideal : auflöung wenn möglich wie angegeben
var constraints = { video: {width: {ideal: 3840}, height: {ideal: 2160}, facingMode: "user" }, audio: false };
var track = null;

const Streamansicht = document.getElementById("streamansicht");
const Bildcanvas = document.getElementById("bildcanvas");

// zugriff auf camera und stream zur Streamansicht
document.getElementById("herunterladenknopf").style.display='none'
function cameraStart() {
    navigator.mediaDevices
        .getUserMedia(constraints)
        .then(function(stream) {
            track = stream.getTracks()[0];
            Streamansicht.srcObject = stream;
                            })
        .catch(function(error) {
            console.error("Etwas hat nicht geklappt", error);
                            });
}
 // der track wird gestoppt, und die src auf null zuückgesetzt
function cameraStop(){track.stop(),Streamansicht.srcObject = null };

function fotomachen()  {
    document.getElementById("herunterladenknopf").style.display=''; 
    // der Stream hat eine andere größe, als das Bild, was man davon machen will, deshab muss man gleichsetzen
    Bildcanvas.width = Streamansicht.videoWidth;
    Bildcanvas.height = Streamansicht.videoHeight;
    Bildcanvas.getContext("2d").drawImage(Streamansicht, 0, 0);
    
};
//Zum Download data URL durch actet stream ersetzen. Da browser download nur über html link in body erlauben wird temporärer link erschaffen
function bildherunterladen() {
const canvas =  Bildcanvas.toDataURL("image/png").replace("image/png", "image/octet-stream");;
var l = document.createElement( 'a' );  
  l.download = 'HIITBild.png'; 
  l.href = canvas;   
  document.body.appendChild( l );  
  l.click();  
  document.body.removeChild( l );
 }
 
