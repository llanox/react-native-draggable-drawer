
'use strict'


var React = require('react-native');

var {
  Animated
} = React;


module.exports = function (screen_height ) {
    var module = {};
    var initialUsedSpace;
    var tension;
    var friction;
    var initialPosition;

    var callbackPositionUpdated;

    
     module.calculateInitialPosition = function ( initial_used_space ){
         initialUsedSpace = Math.abs(initial_used_space);
         initialPosition = (screen_height * ( 1 - initialUsedSpace ));
         return initialPosition;
     };

    module.getInitialUsedSpace = function(){
        return initialUsedSpace;
    };

    module.getInitialPosition = function(){
        return initialPosition;
    };


    module.setupAnimation = function ( higher_tension, friction, callbackPositionUpdated ){
           

          this.tension = higher_tension;
          this.friction = friction;
          this.callbackPositionUpdated = callbackPositionUpdated; 

       };


      module.isAValidMovement = function(distanceX, distanceY){

         var moveTravelledFarEnough =  Math.abs(distanceY) > Math.abs(distanceX) && Math.abs(distanceY) > 2;

        return moveTravelledFarEnough;

      };


      module.startAnimation = function (velocityY, positionY ){     


         var isGoingToUp = ( velocityY < 0 )? true : false;   
         var speed = Math.abs(velocityY);    
         var currentPosition = Math.abs(positionY / screen_height); 
         var endPosition = isGoingToUp? 0 : 1 - initialUsedSpace; 

         var position = new Animated.Value(currentPosition);
         
         Animated.spring(position, {toValue: endPosition, 
                                   velocity: speed, 
                                   tension:this.tension, 
                                   friction: this.friction 
                                   }
          ).start(this.callbackPositionUpdated);

      
      };

   


    return module;
};



