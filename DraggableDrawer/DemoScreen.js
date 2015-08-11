/**
 * Demo DraggableDrawer component
 * 
 */
'use strict';

var React = require('react-native');
var precomputeStyle = require('precomputeStyle');


var {
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
var DEFAULT_DRAWER_USED_SPACE = 0.15;
var DraggableDrawer = require('./DraggableDrawer.jsx');




var component = React.createClass({

  getInitialState: function() {
    return {scale: 1};
  },

  onDrawerDragDown: function( currentUsedSpace ) {      
       var diff = DEFAULT_DRAWER_USED_SPACE - currentUsedSpace;
      
       console.log(' diff ', diff);

       if(diff>=0){
          var scaleTo = diff/DEFAULT_DRAWER_USED_SPACE;
          this.setState({scale: (this.state.scale + scaleTo ) });
       }
  },

  onInitialPositionReached: function(){
        console.log('InitialPositionReached ',true)
        this.setState({scale: 1 });

  },

  render: function() {



    var imageStyle = { width: 250, height: 200, transform: [{scaleX: this.state.scale}, {scaleY: this.state.scale}]};

    var bouncingView = (
       <Image 
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
        onDragDown = {this.onDrawerDragDown}
        onInitialPositionReached = {this.onInitialPositionReached}
        initialUsedSpace  = {DEFAULT_DRAWER_USED_SPACE}       
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