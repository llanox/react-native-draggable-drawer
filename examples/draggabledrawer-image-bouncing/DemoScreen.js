/**
 * Demo DraggableDrawer component
 * 
 */
'use strict';

var React = require('react-native');
var precomputeStyle = require('precomputeStyle');


var {
  Animated,
  StyleSheet,
  Text,
  Image,
  View,
  PanResponder,
  StyleSheet
  
} = React;

var Dimensions = require('Dimensions');
var SCREEN_HEIGHT = Dimensions.get('window').height;
var HIGHER_TENSION = 5000;
var FRICTION = 1200;
//maximum drawer size is 1 that means its use 100% of avalaible space on the screen
var DEFAULT_DRAWER_SIZE = 0.30;
var DraggableDrawer = require('react-native-draggable-drawer');




var component = React.createClass({

  getInitialState: function() {
    return {scale: new Animated.Value(1) };
  },

  onDragDown: function( drawerPosition ) {   

       var diff = DEFAULT_DRAWER_SIZE - drawerPosition;
      
     
       if(diff>=0){
          var scaleTo = 1 - ( (1 * drawerPosition)/DEFAULT_DRAWER_SIZE );
          this.state.scale.setValue(1 + scaleTo); 
       }
  },


  onRelease: function( isGoingUp ){

    console.log(' onRelease drawer '+ isGoingUp);
   
    if(isGoingUp) return;


     Animated.spring(  // Base: spring, decay, timing
        this.state.scale,  // Animate `scale`
          { 
            toValue: 1,  // Animate to smaller size
            friction: 20,  // Bouncier spring
            tension: 20  // Controls speed

          } )
     .start(); 


  },

  render: function() {



    var imageStyle = { flex:1, alignSelf:'center', width: 250, height: 250, transform: [{scaleX: this.state.scale}, {scaleY: this.state.scale}]};

    var bouncingView = (
       <Animated.Image 
       source={{uri: "https://facebook.github.io/react-native/img/ReboundExample.png"}} 
       style={imageStyle} />
    );



    var containerView = (
      <View >
         <Text>Container !! </Text> 
         {bouncingView}
      </View>
    );

     var drawerView = (
      <View style={styles.drawerviewStyle}>
      <Text> Text !! </Text>  
      <Text> Text !! </Text>  
      <Text> Text !! </Text>  
      <Text> Text !! </Text>  
      <Text> Text !! </Text>  
      <Text> Text !! </Text>  
      <Text> Text !! </Text>  
      <Text> Text !! </Text>  
      <Text> Text !! </Text>  
      <Text> Text !! </Text>  
      <Text> Text !! </Text>  
      <Text> Text !! </Text>  

      </View>
    );

    return (    
        <DraggableDrawer 
        onDragDown = {this.onDragDown}
        onRelease = {this.onRelease}
        initialDrawerSize  = {DEFAULT_DRAWER_SIZE}       
        renderContainerView = {() => containerView}
        renderDrawerView = {() => drawerView} />
    )
  }
});

var styles = StyleSheet.create({
  drawerviewStyle: {    
    backgroundColor: '#55cccc',
  }

  
});

module.exports = component;