
'use strict'

var rebound = require('rebound');


module.exports = function (screen_height ) {
    var module = {};
    var initialUsedSpace;
    var tension;
    var _scrollSpring;
    var _springSystem;
    var initialPosition;

    
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
           

          tension = higher_tension;
           // Initialize the spring that will drive animations
          _springSystem = new rebound.SpringSystem();
          _scrollSpring = _springSystem.createSpring();
          var springConfig = _scrollSpring.getSpringConfig();
          springConfig.tension = tension;
          springConfig.friction = friction;

          _scrollSpring.setCurrentValue(0);

          _scrollSpring.addListener({
             onSpringUpdate: () => {

               var currentValue = _scrollSpring.getCurrentValue();
               var newPosition =  screen_height * currentValue;

                 callbackPositionUpdated && callbackPositionUpdated(newPosition);
              
             },
         });


          _scrollSpring.setCurrentValue( 1 - initialUsedSpace );



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
         _scrollSpring.tension = tension * speed;
         _scrollSpring.setCurrentValue(currentPosition); 
         _scrollSpring.setVelocity(speed).setEndValue(endPosition) ; 
     

      };

   


    return module;
};



