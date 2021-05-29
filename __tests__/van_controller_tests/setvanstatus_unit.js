const mongoose = require('mongoose')

const vanController = require("../../controllers/vanController")

const Van = require("../../models/van");

// defining a test suite for testing the updateVanStatus
describe("Unit testing updateVanStatus from vanController.js", () => {

    // mocking the request object. The controller function expects 
    // that at least the request object will have an 'id' params, and
    // isAuthenticated() function.
    // we create a mocking function using jest.fn(), and we can
    // return a mock value for the mock function as well.
    const req = {
        // searching for Van in my database
        session: {van_name:'Niceday'},
        // assuming that  the user is logged in
        isLoggedIn: jest.fn().mockReturnValue('True')
    };

    // response object should have at least a render method
    // so that the controller can render the view
    const res = {
        render: jest.fn()
    };

    // the setup function does a few things before
    // any test is run
    beforeAll(() => {
        // clear the render method (also read about mockReset)
        res.render.mockClear();

        // I'm going to mock the updateVanStatus method
        // to return some of the status of the object
        // that I'm searching. Note that 
        // our DB has more details, but I'm just mocking
        // the details to test the controller
        Van.updateVanStatus = jest.fn().mockResolvedValue([{
            vanId: 'Niceday',
            status: 'open',
            __v: 0
        }]);
        // We are using the lean() method, so need to 
        // mock that as well. I'm mocking the function
        // to return Plain Old JavaScript Object (POJO)
        Van.updateVanStatus.mockImplementationOnce(() => ({
            lean: jest.fn().mockReturnValue({
                vanId: 'Niceday',
                status: 'open'
            }),
        }));
        // And, we call the updateVanStatus with the mocked
        // request and response objects!
        vanController.updateVanStatus(req, res);
      });

    // This demo has only one test with a valid van ID 
    test("Test case 1: testing with existing van id \
        Niceday, expecting status to be close", () => {
        // when I run the controller, I expect that the render method will
        // be called exactly once        
        expect(res.render).toHaveBeenCalledTimes(1);
        // and because I'm looking up a van status that I expect to be in my
        // database, the controller should render the page and not
        // return an error message!
        expect(res.render).toHaveBeenCalledWith('showVanStatus', { "oneVan":{
            vanId: "Niceday", status: 'close'}, "loggedin":"True"});
    });
  });


  // defining a test suite for testing the updateVanStatus
describe("Unit testing updateVanStatus from vanController.js with invalid van", () => {
    
    // mocking the request object. The controller function expects 
    // that at least the request object will have an 'id' params, and
    // isAuthenticated() function.
    // we create a mocking function using jest.fn(), and we can
    // return a mock value for the mock function as well.
    const req = {
        // searching for van in my database
        session: {van_name:'Fake Van'},
        // assuming that the user is logged in
        isLoggedIn: jest.fn().mockReturnValue('True')
    };

    // response object should have at least a render method
    // so that the controller can render the view
    const res = {
        render: jest.fn()
    };

    // the setup function does a few things before
    // any test is run
    beforeAll(() => {
        // clear the render method 
        res.render.mockClear();

        // I'm going to mock the updateVanStatus Mongoose method
        // to return some of the details of the object
        // that I'm searching, i.e. Apple. Note that 
        // our DB has more details, but I'm just mocking
        // the details to test the controller
        Van.updateVanStatus = jest.fn().mockResolvedValue();
        // The database will throw an error when the Object ID
        // is not found, so simulate this with our 
        // database
        Van.updateVanStatus.mockImplementationOnce(() => {
            throw new Error();
          });
        // And, we call the getOneFood with the mocked
        // request and response objects!
        vanController.updateVanStatus(req, res);
      });

    // This demo has only one test with a valid van ID 
    test("Test case 2: testing with invalid van id \
        Fake Van, expecting error message", () => {
        // when I run the controller, I expect that the render method will
        // be called exactly once        
        expect(res.render).toHaveBeenCalledTimes(1);
        // and because I'm looking up a food that is not in my
        // database, the controller should render the error message!
        expect(res.render).toHaveBeenCalledWith('error', { errorCode: '400', message: 'Database query failed'});
    });
  });