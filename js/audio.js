 (function() {
  
  var context = new AudioContext(),
      soundBitesList = [
        'sounds/c3po.mp3', //c3po 0
        'sounds/chewbacca.mp3', //chewbacca 1
        'sounds/darth-vader.mp3', // darthvader 2
        'sounds/han-solo.mp3', //han 3
        'sounds/leia.mp3', //leia 4
        'sounds/luke.mp3', //luke 5
        'sounds/r2d2.mp3', //r2d2 6
        'sounds/storm-trooper-blaster.mp3', //stormtrooper 7
        'sounds/obi-wan.mp3', //obiwan 8 
        'sounds/yoda.mp3', // yoda 9

      ],
      soundBitesListMusic = [
        'music/StarWarsThemeSongByJohnWilliams.mp3', //c3po 0
        /*'sounds/chewbacca.mp3', //chewbacca 1
        'sounds/darth-vader.mp3', // darthvader 2
        'sounds/han-solo.mp3', //han 3
        'sounds/leia.mp3', //leia 4
        'sounds/luke.mp3', //luke 5
        'sounds/r2d2.mp3', //r2d2 6
        'sounds/storm-trooper-blaster.mp3', //stormtrooper 7
        'sounds/obi-wan.mp3', //obiwan 8 
        'sounds/yoda.mp3', // yoda 9*/

      ],
      bufferReady,
      playing;
  
  function finishedLoading(bufferList) {
    
    var characters = document.getElementById('characters');
    
    setTimeout(function() {
     characters.style.opacity = "1"; 
    }, 1000);


    bufferReady = true;
  }  
  
  function finishedLoadingMusic(bufferList) {
    
          soundSource = context.createBufferSource();
          soundSource.buffer = bufferLoaderMusic.bufferList[0];
          soundSource.connect(context.destination);
          soundSource.start(context.currentTime);
  }  

  function playSound(bufferNum) {
      if(bufferReady){
          soundSource = context.createBufferSource();
          soundSource.buffer = bufferLoader.bufferList[bufferNum];
          soundSource.connect(context.destination);
           soundSource.start(context.currentTime);

          playing = true;
      }
      // play the source now
      
  }

  function stopSound() {
    if(playing)
      soundSource.stop(context.currentTime);
  }  
  
  // BufferLoader is a constructor function, similar to a class/blueprint. It create instances of objects using the 'new' keyword.
  
  
  function BufferLoader(context, soundBitesList, callback) {
    this.context = context;
    this.soundBitesList = soundBitesList;
    this.onload = callback;
    this.bufferList = [];
    this.loadCount = 0;
  }
    
  BufferLoader.prototype.loadBuffer = function(url, index) {
    
    // Load buffer asynchronously
    var request = new XMLHttpRequest();
    request.open("GET", url, true);
    request.responseType = "arraybuffer";

    var self = this;
    
    console.log(this);

    request.onload = function() {
      
      // Asynchronously decode the audio file data in request.response
      self.context.decodeAudioData(
        request.response,
        function(buffer) {  
          if (!buffer) {
            alert('error decoding file data: ' + url);
            return;
          }
          
          self.bufferList[index] = buffer;
          
          if (++self.loadCount == self.soundBitesList.length)
            self.onload(self.bufferList);
        },
        function(error) {
          console.error('decodeAudioData error', error);
        }
      );
    }

    request.onerror = function() {
      alert('BufferLoader: XHR error');
    }

    request.send();
  }

  BufferLoader.prototype.load = function() {
    for (var i = 0; i < this.soundBitesList.length; i++) {
      this.loadBuffer(this.soundBitesList[i], i);
    }  
  }
  
  
  $('.character').on('click', function() {
   
    var character = $(this).data('character'); // c3po, chewbacca etc

    // $(this).addClass('selected-' + character);
    $('.character').removeClass('selected');
    $(this).addClass('selected');

    switch (character) {
      case "c3po":
      selectedCharacter = 0;
      break;

      case "chewbacca":
      selectedCharacter = 1;
      break;

      case "darth-vader":
      selectedCharacter = 2;
      break;

      case "han":
      selectedCharacter = 3;
      break;

      case "leia":
      selectedCharacter = 4;
      break;

      case "luke":
      selectedCharacter = 5;
      break;

      case "r2d2":
      selectedCharacter = 6;
      break;

      case "stormtrooper":
      selectedCharacter = 7;
      break;

      case "obi-wan":
      selectedCharacter = 8;
      break;

      case "yoda":
      selectedCharacter = 9;
      break;
    } 
    
    stopSound();
    playSound(selectedCharacter);
    
  });
  
  
  function init() {   
    
    bufferLoader = new BufferLoader(context, soundBitesList, finishedLoading);



    bufferLoader.load();

    bufferLoaderMusic = new BufferLoader(context, soundBitesListMusic, finishedLoadingMusic);

    bufferLoaderMusic.load();
  }
  
  init();

})();







