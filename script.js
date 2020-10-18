// Deklarierung der Variablen
var vorlaufinput = document.querySelector('input.range.vorlauf'),
    belastungsinput = document.querySelector('input.range.dauer'),
    ausruhinput = document.querySelector('input.range.ruhe'),
    rundeninput = document.querySelector('input.range.runden')
;

var preparationSpan = document.querySelector('span.value.vorlauf'),
    dauerSpan = document.querySelector('span.value.dauer'),
    restSpan = document.querySelector('span.value.ruhe'),
    roundsSpan = document.querySelector('span.value.runden')
;

var zeitanzeige = document.getElementById('timer'),
    rundeAnzeige = document.getElementById('runde');
    
var intervall;


wertzeigen();
wertsetzen();


// Anzeigen der Auswahlmöglichkeiten
function wertzeigen() {
  
  vorlaufinput.min = 1;
  belastungsinput.min = 1;
  ausruhinput.min = 1;
  rundeninput.min = 1;
  
  vorlaufinput.max = 60;
  belastungsinput.max = 60;
  ausruhinput.max = 60;
  rundeninput.max = 20;
  
  vorlaufinput.value = 5;
  belastungsinput.value = 20;
  ausruhinput.value = 10;
  rundeninput.value = 8;
  
  preparationSpan.innerHTML = vorlaufinput.value;
  dauerSpan.innerHTML = belastungsinput.value;
  restSpan.innerHTML = ausruhinput.value;
  roundsSpan.innerHTML = rundeninput.value;
  
  zeitanzeige.innerHTML = "-----";
  rundeAnzeige.innerHTML = '0 / 0';
}

// Speichern der Auswahl in Variablen
function wertsetzen() {
  vorlaufinput.oninput = function() {preparationSpan.innerHTML = vorlaufinput.value;};
  belastungsinput.oninput = function() {dauerSpan.innerHTML = belastungsinput.value;};
  ausruhinput.oninput = function() {restSpan.innerHTML = ausruhinput.value;};
  rundeninput.oninput = function() {roundsSpan.innerHTML = rundeninput.value;};
 
  
// Änderungen bei button start und zurück
  startknopf.onclick = function() {
  runTabata(vorlaufinput.value, belastungsinput.value, ausruhinput.value, rundeninput.value);
  document.getElementById('zurückknopf').style.visibility = 'visible';
  document.getElementById('zeigendiv').style.visibility = 'visible';
  document.getElementById("Einstellungsdiv").style.display = "none"; 
      }

  zurückknopf.onclick = function(){location.reload()}
  };

// Eigentlicher Tabata array
function runTabata(vorlauf, dauer, ruhe, runden) {
  let arrPeriods = [vorlauf],
  index = 0
  ;

  for(let i = 0; i < runden; i++) {
    arrPeriods.push(dauer);
    arrPeriods.push(ruhe);
    }
   runtimer(arrPeriods, index);
}

// Setzen des Timers
function runtimer(arrPeriods, index) {
timeFuture = Date.now()
timeFuture2 = timeFuture + arrPeriods[index] * 1000;

window.index = index;
window.arrPeriods = arrPeriods;

  interval = setInterval(() => {
     const timeDifference = Math.round((timeFuture2 - Date.now()) / 1000) + 1;
    
    zeitanzeige.innerHTML ="Noch  " + timeDifference + "s";
      rundeAnzeige.innerHTML ="Runde " + Math.floor(((index + 1) / 2)) + "/" + (arrPeriods.length - 1) / 2;
      document.getElementById("myBar").innerHTML = timeDifference;

  if(timeDifference == 0) {clearInterval(interval);
  if(index < arrPeriods.length -1) {index++; runtimer(arrPeriods, index);} }},1000);  
  if (index === 0 ) {vorlauf()}
  else if (index % 2 == 0 &&  index == arrPeriods.length-1){ende()}
  else if (index % 2 == 0 ) {setTimeout(function(){ruhe()},1000)}
  else if (index % 1 == 0 ) {setTimeout(function(){aktiv()},1000)}
  }

// deklarierung der Globalen Medienvariablen

var a = document.getElementById("selector");
var mediaV = 1
//  beobachtung der  von a und Anpassung der mediaV
a.addEventListener("change", function() {
    if(a.value == "1"){window.mediaV = 1}
    if(a.value == "2"){window.mediaV = Math.floor(Math.random() * (5 - 1 + 1)) + 1}
    if(a.value == "3"){window.mediaV = 6}
})


 function vorlauf(){
    document.body.style.backgroundColor = "#2c687f";
    document.getElementById("was").innerHTML = "gleich geht es los";
    document.getElementById("progressdiv").style.display = "none";
    }
       
 function aktiv(){
  moveaktiv()
  document.body.style.backgroundImage = "none";
  document.body.style.backgroundColor = "#FF4E4E";
  document.getElementById("myBar").style.color = "#FF4E4E";
    document.getElementById("was").innerHTML= "GO !!"
    document.getElementById("progressdiv").style.display = "";
    document.getElementById("timer").style.display = "none";
    if (mediaV==1){document.getElementById('gongsound').play();}
    if (mediaV==2){document.getElementById('gosound1').play();}
    if (mediaV==3){document.getElementById('gosound2').play();}
    if (mediaV==4){document.getElementById('gosound3').play();}
    if (mediaV==5){document.getElementById('gosound4').play();}
    if (mediaV==6){document.getElementById('m1').play();}
   }
  
 function ruhe(){
  moveruhe(),
   document.getElementById('m1').pause();
   document.body.style.background = "#2c687f",  
   document.getElementById("myBar").style.color = "#2c687f";
  document.getElementById("timer").style.display = "none";
   document.getElementById("was").innerHTML = "Pause";
   if (index % 2 == 0 &&  index == arrPeriods.length-3)

   { if (mediaV==1){document.getElementById('gongsound').play();}
     if (mediaV==2){document.getElementById('vor1').play()
       document.body.style.background = "#2c687f url('image/vor1.jpg') no-repeat center";}
       if (mediaV==3){document.getElementById('vor2').play()
       document.body.style.background = "#2c687f url('image/vor2.jpg') no-repeat center";;}
       if (mediaV==4){document.getElementById('vor3').play();}
       if (mediaV==5){document.getElementById('vor4').play();}
       if (mediaV==5){document.getElementById('vor4').play();}
       if (mediaV==6) {document.getElementById('m1').pause();}   
      }
  else {
     if (mediaV==1){document.getElementById('gongsound').play();}
      if (mediaV==2){document.getElementById('kurzepausesound1').play()
      document.body.style.background = "#2c687f url('image/ruhe1.jpg') no-repeat center";}
      if (mediaV==3){document.getElementById('kurzepausesound2').play()
      document.body.style.background = "#2c687f url('image/ruhe2.jpg') no-repeat center";}
      if (mediaV==4){document.getElementById('kurzepausesound3').play();
      document.body.style.background = "#2c687f url('image/ruhe3.jpg') no-repeat center"}
      if (mediaV==5){document.getElementById('kurzepausesound4').play()
      document.body.style.background = "#2c687f url('image/ruhe4.jpg') no-repeat center";}
      if (mediaV==6) {document.getElementById('m1').pause();}
    }  
                }


function ende(){ 
document.body.style.backgroundColor = "#0FC2CF";
document.getElementById("myBar").style.display = "none";
document.getElementById("was").innerHTML = "Gratulation !!";
document.getElementById("timer").style.display = "none";

   if (mediaV==1){document.getElementById('gongsound').play();}
   if (mediaV==2){document.getElementById('endesound1').play() 
   document.body.style.background = "#2c687f url('image/ende1.jpg') no-repeat center";}
   if (mediaV==3){document.getElementById('endesound2').play()
   document.body.style.background = "#2c687f url('image/ende2.jpg') no-repeat center";}
   if (mediaV==4){document.getElementById('endesound3').play()
   document.body.style.background = "#2c687f url('image/ende3.jpg') no-repeat center";}
   if (mediaV==5){document.getElementById('endesound3').play()
   document.body.style.background = "#2c687f url('image/ende4.jpg') no-repeat center";}
                   }


function moveaktiv() {
  var w = 100;
  var id = setInterval(frame, belastungsinput.value*10,1000);
  function frame()
  {if (w === 1) {clearInterval(id);} 
  else { w= w-1; document.getElementById("myBar").style.width = w + '%';}}
                     }
function moveruhe() {
  var w = 1;
  var id = setInterval(frame, ausruhinput.value*10,1000);
  function frame() { 
  if (w === 100) {clearInterval(id);}
   else {w = w+1}; document.getElementById("myBar").style.width = w + '%';}
                    }
  