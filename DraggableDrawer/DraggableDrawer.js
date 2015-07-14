
'use strict'

var React = require('react-native');
var rebound = require('rebound');

var Dimensions = require('Dimensions');
var SCREEN_HEIGHT = Dimensions.get('window').height;
var HIGHER_TENSION = 5000;
var EMPTY_SPACE = 0.91;
var FRICTION = 1200;


var {
  AppRegistry,
  StyleSheet,
  Text,
  Image,
  View,
  PanResponder,
  StyleSheet
  
} = React;


var component = React.createClass({

  getInitialState: function() {
    // naming it initialX clearly indicates that the only purpose
    // of the passed down prop is to initialize something internally
    
    var initialPosition = (SCREEN_HEIGHT * ( 1 - this.props.initialUsedSpace ));  
    console.log('initial position ',initialPosition);

    return {position: initialPosition };
  },

  componentWillMount: function() {
    

 // Initialize the spring that will drive animations   

    this.springSystem = new rebound.SpringSystem();
    this._scrollSpring = this.springSystem.createSpring();
    var springConfig = this._scrollSpring.getSpringConfig();
    springConfig.tension = HIGHER_TENSION;
    springConfig.friction = FRICTION;

    this._scrollSpring.setCurrentValue(0);

    this._scrollSpring.addListener({
      onSpringUpdate: () => {

         if (!this.center) return;

         var currentValue = this._scrollSpring.getCurrentValue();
         var topPosition =  SCREEN_HEIGHT * currentValue;

         this.setState({position: topPosition });
         this._previousTop = topPosition;
              
      },
    });

    

   
    this._previousTop = this.top;
    this._scrollSpring.setCurrentValue(1 - this.props.initialUsedSpace);
    



    this._panGesture = PanResponder.create({
      onMoveShouldSetPanResponder: (evt, gestureState) => {

       var moveTravelledFarEnough =  Math.abs(gestureState.dy) > Math.abs(gestureState.dx)
               && Math.abs(gestureState.dy) > 2;

       return  moveTravelledFarEnough;      
      },
      onPanResponderGrant: (evt, gestureState) => this.onGrant(gestureState),
      onPanResponderMove: (evt, gestureState) => this.moveDrawerView(gestureState),
      onPanResponderRelease: (evt, gestureState) => this.moveFinished(gestureState),
      onPanResponderTerminate:(evt, gestureState) => this.moveFinished(gestureState),
    })
  },

  onGrant: function(up, vy) {

     //So far, nothing to do here.

  },



  moveDrawerView: function(gestureState) {
    
    if (!this.center) return;

    this.setState({position: ( this._previousTop + gestureState.dy ) });


    console.log('position moveDrawerView',this._previousTop + gestureState.dy);

    var currentValue = Math.abs(gestureState.moveY / SCREEN_HEIGHT);

    var isGoingToUp = ( gestureState.vy < 0 )? true : false;   

      
    if(!isGoingToUp) this.props.onDragDown(1-currentValue);  
       

  },

  moveFinished: function(gestureState) {

     if (!this.center) return;

     this._previousTop += gestureState.dy;   

     var isGoingToUp = ( gestureState.vy < 0 )? true : false;   

     var speedMagnitude = Math.abs(gestureState.vy);    
     var currentValue = Math.abs(gestureState.moveY / SCREEN_HEIGHT); 

     this._scrollSpring.tension = HIGHER_TENSION * speedMagnitude;
     this._scrollSpring.setCurrentValue(currentValue);

     console.log('Initial Used Space ',this.props.initialUsedSpace);

     this._scrollSpring.setVelocity(speedMagnitude).setEndValue(isGoingToUp? 0 : this.props.initialUsedSpace) ; 
   

  },

  render: function() {
    var containerView = this.props.renderContainerView ? this.props.renderContainerView() : null;
    var drawerView = this.props.renderDrawerView ? this.props.renderDrawerView() : null;
    
    
      
    return (
      <View style={styles.container}>
       
         <View style={styles.left}>
          {containerView}
         </View>        
    
        <View
          style={[styles.center, {top: this.state.position}]}
          ref={(center) => this.center = center}
          {...this._panGesture.panHandlers}>
          {drawerView}
        </View>
      </View>
    )
  },
});


var styles = StyleSheet.create({
  drawer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    //blue color
    backgroundColor: '#333333',
  },
  welcome: {
    textAlign: 'center',
    // gray color
    color: '#333333',
    margin: 10,
  },
    container: {
    flex: 1,
    margin: 20,
    //red color
    backgroundColor: '#F23607',

  },
  instructions: {
    textAlign: 'center',
      // gray color
    color: '#333333',
    marginBottom: 5,
  },
  center: {
    flex: 1,
    //dark blue
    backgroundColor: '#150D61',
  },
  left: {
    position: 'absolute',
   // flex: 1,
     top:0,
     left:0,
     bottom: 0,
     right: 0,
    //green color
    backgroundColor: '#1FA763',
  },
  
});



module.exports = component;