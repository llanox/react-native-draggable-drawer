/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 */
'use strict';

var React = require('react-native');
var rebound = require('rebound');
var precomputeStyle = require('precomputeStyle');


var {
  AppRegistry,
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
var DEFAULT_DRAWER_USED_SPACE = 0.10;
var DraggableDrawer = require('./DraggableDrawer');




var component = React.createClass({

  getInitialState: function() {
    return {scale: 0};
  },

  onDrawerDragDown: function( currentUsedSpace ) {      
       console.log(' used space ', currentUsedSpace);
       var diff = DEFAULT_DRAWER_USED_SPACE - currentUsedSpace;

       if(diff>=0){
          this.setState({scale: DEFAULT_DRAWER_USED_SPACE - currentUsedSpace });
       }
  },




  render: function() {



     var imageStyle = { width: 250, height: 200, transform: [{scaleX: 1}, {scaleY: 1}]};

    var bouncingView = (
       <Image 
       source={{uri: "https://facebook.github.io/react-native/img/ReboundExample.png"}} 
       style={imageStyle} />
    );



    var containerView = (
      <View style={styles.left}>
         <Text>Container !! </Text> 
         {bouncingView}
      </View>
    );

     var drawerView = (
      <View style={styles.drawer}>
      <Text> Drawer View !! </Text>    
      </View>
    );

    return (    
        <DraggableDrawer 
        onDragDown = {this.onDrawerDragDown}
        initialUsedSpace  = {DEFAULT_DRAWER_USED_SPACE}       
        renderContainerView = {() => containerView}
        renderDrawerView = {() => drawerView} />
    )
  }
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


AppRegistry.registerComponent('DraggableDrawer', () => component);
