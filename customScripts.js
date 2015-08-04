"use strict";

function hideCarouselControls() {
    var carouselControls = document.getElementsByClassName('carousel-control');
    
       for(var i=0;i<carouselControls.length;i++){
    carouselControls[i].style.visibility= 'hidden';
           window.alert('Hidden');
}
    
}

function showCarouselControls() {
    var carouselControls = document.getElementsByClassName('carousel-control');
    
       for(var i=0;i<carouselControls.length;i++){
    carouselControls[i].style.visibility= 'visible';
           window.alert('visible');
}
    
}

function init() {

}


onload = init;


// VIMEO adding event listeners for pause and play of multiple videos using API 
$(function() {
    var player = $('iframe');
    var playerOrigin = '*';
    

    // Listen for messages from the player
    if (window.addEventListener) {
        window.addEventListener('message', onMessageReceived, false);
    }
    else {
        window.attachEvent('onmessage', onMessageReceived, false);
    }

    // Handle messages received from the player
    function onMessageReceived(event) {
        // Handle messages from the vimeo player only
        if (!(/^https?:\/\/player.vimeo.com/).test(event.origin)) {
            return false;
        }
        
        if (playerOrigin === '*') {
            playerOrigin = event.origin;
        }
        
        
        var data = JSON.parse(event.data);
        
        switch (data.event) {
            case 'ready':
                onReady();
                break;
               
            case 'play':
                play();
                break;
                
            case 'pause':
                onPause();
                break;
               
        }
    }

    // Call the API when a button is pressed
    $('button').on('click', function() {
        post($(this).text().toLowerCase());
    });

    // Helper function for sending a message to the player
    function post(action, value) {
        var data = {
          method: action
        };
        
        if (value) {
            data.value = value;
        }
        
        var message = JSON.stringify(data);
        
              for (var i = 0, length = player.length; i < length; i++) {
                player[i].contentWindow.postMessage(data, playerOrigin);
            }
            
    }

    function onReady() {
        post('addEventListener', 'pause');
        post('addEventListener', 'play');
    }

    function onPause() {
          window.alert('paused');
    }

    function play() {
          window.alert('Play');
    }
});