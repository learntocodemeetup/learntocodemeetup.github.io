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
      bufferReady,
      playing,
      startTime,
      duration;
  
  function finishedLoading(bufferList) {
    
    var characters = document.getElementById('characters');
    
    setTimeout(function() {
     characters.style.opacity = "1"; 
    }, 1000);


    bufferReady = true;
  }  
  
  function playSound(bufferNum) {
      if(bufferReady){
          soundSource = context.createBufferSource();
          soundSource.buffer = bufferLoader.bufferList[bufferNum];
          soundSource.connect(context.destination);
          durration = bufferLoader.bufferList[bufferNum].durration;
          startTime = context.currentTime;
          soundSource.start(context.currentTime);
          console.log("Start time: " + startTime);
          console.log("Duration: " + durration);
          playing = true;
      }
      // play the source now
      
  }

  function stopSound() {
    if(playing)
      soundSource.stop(context.currentTime);
      console.log("Stop aaa Playing");
    if(context.currentTime < startTime + duration){
      soundSource.stop(context.currentTime);
      console.log("Stop Playing");
    }
      
      // stop the source now
      //onsole.log(context.state);
      //if(isPlaying)
        console.log("Playing");
       // Create a gain node.
      /*var gainNode = context.createGain();
      // Connect the source to the gain node.
      soundSource.connect(gainNode);
      // Connect the gain node to the destination.
      gainNode.connect(context.destination);
      //gainNode.gain.value = 0;
        //soundSource.stop(context.currentTime);*/
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
  
  
  $(".character").on("click", function() {
    $(".character").removeClass('selected');
   
    
    if ( $(this).hasClass("c3po") ) {
       $(this).addClass('selectedC3po');
        selectedCharacter = 0;
    } else if ( $(this).hasClass("chewbacca") ) {
        $(this).addClass('selectedChewbacca');
        selectedCharacter = 1;
    } else if ( $(this).hasClass("darthvader") ) {
        $(this).addClass('selectedDarthVader');
        selectedCharacter = 2;
    } else if ( $(this).hasClass("han") ) {
        $(this).addClass('selectedHan');
        selectedCharacter = 3;
    } else if ( $(this).hasClass("leia") ) {
        $(this).addClass('selectedLeia');
        selectedCharacter = 4;
    } else if ( $(this).hasClass("luke") ) {
       $(this).addClass('selectedLuke');
        selectedCharacter = 5;
    } else if ( $(this).hasClass("r2d2") ) {
       $(this).addClass('selectedR2d2');
        selectedCharacter = 6;
    } else if ( $(this).hasClass("stormtrooper") ) {
       $(this).addClass('selectedStormtrooper');
        selectedCharacter = 7;
    } else if ( $(this).hasClass("obiwan") ) {
       $(this).addClass('selectedObiwan');
        selectedCharacter = 8;
    } else if ( $(this).hasClass("yoda") ) {
       $(this).addClass('selectedYoda');
        selectedCharacter = 9;
    }
    
    stopSound();
    playSound(selectedCharacter);
    
  });
  
  
  function init() {   
    
    bufferLoader = new BufferLoader(context, soundBitesList, finishedLoading);

    bufferLoader.load();
  }
  
  init();

})();

