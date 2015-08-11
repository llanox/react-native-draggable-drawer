/**
 * Created by jgabrielgutierrez on 15-08-10.
 */

jest.dontMock('../DraggableDrawerHelper');
jest.dontMock('rebound');


describe('DraggableDrawerHelper ', function(){

    var SCREEN_HEIGHT = 3456;
    var INITIAL_USED_SPACE = -0.5;
    var HIGHER_TENSION = 5000;
    var FRICTION = 1200;
    var VELOCITY_Y = 1.5;

    var DraggableDrawerHelper = require('../helpers/DraggableDrawerHelper')(SCREEN_HEIGHT)

    var callbackPositionUpdated = jest.genMockFunction()
    var initial_position


    it(' sets a visible  initial position for DraggableDrawer component ', function() {

        initial_position = DraggableDrawerHelper.calculateInitialPosition(INITIAL_USED_SPACE)

        expect(initial_position).toBeLessThan(SCREEN_HEIGHT+1)
        expect(initial_position).toBeGreaterThan(-1)

    });


    it('configures an animation for the component ', function() {


        DraggableDrawerHelper.setupAnimation( HIGHER_TENSION, FRICTION, callbackPositionUpdated )

        expect(callbackPositionUpdated).toBeCalled()


    });


    it('starts an animation for the component ', function() {

        DraggableDrawerHelper.startAnimation( VELOCITY_Y, initial_position)

        // The mock function was called at least once
        expect(callbackPositionUpdated.mock.calls.length).toBeGreaterThan(0)

        expect(callbackPositionUpdated.mock.calls[callbackPositionUpdated.mock.calls.length - 1][0]).toBeGreaterThan(0)

    });







});


