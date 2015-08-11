/**
 * Entry point DraggableView demo 
 */
'use strict';

var DemoScreen = require('./DemoScreen')
var React = require('react-native')



var {
  AppRegistry
} = React


var component = React.createClass({


       render: function() {
          return (  <DemoScreen/> )
       }

})




AppRegistry.registerComponent('draggabledrawer', () => component);
