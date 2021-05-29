const mongoose = require('mongoose')

const vanController = require("../../controllers/vanController")
const van = require("../../models/van");
const Van = van.Van

// defining a test suite for testing the updateVanStatus
describe("Unit testing for  updateVanStatus from vanController.js", () => {

    const req = {
        // searching for Van in my database
        session: {van_name:'Niceday'}
    };

    const res = {
        render: jest.fn()
    };

    beforeAll(() => {
        res.render.mockClear();
        
        Van.findOne = jest.fn().mockResolvedValue([
            {
            VanId: 'Niceday',
            status: 'close',
            __v: 0
            }
        ]);
        
        Van.findOne.mockImplementationOnce(() => ({
            lean: jest.fn().mockReturnValue({
                VanId: 'Niceday',
                status: 'close',
            }),
        }));

        // mock update one

        Van.updateOne = jest.fn().mockResolvedValue([
            {
            VanId: 'Niceday',
            status: 'open',
            __v: 0
            }
        ], );
        
        Van.updateOne.mockImplementationOnce(() => ({
            lean: jest.fn().mockReturnValue({
                VanId: 'Niceday',
                status: 'open'
            }),
        }));

        // mock find one again
        Van.findOne.mockImplementationOnce(() => ({
            lean: jest.fn().mockReturnValue({
                VanId: 'Niceday',
                status: 'open',
            }),
        }));
        
        vanController.updateVanStatus(req, res);
        });

        test("Test case 1: testing with status updated of \
        Niceday, expecting Niceday's status has been updated", () => {   
        expect(Van.findOne).toHaveBeenCalledTimes(2); 
        expect(Van.updateOne).toHaveBeenCalledTimes(1); 
        expect(res.render).toHaveBeenCalledTimes(1);
        // as the van's status is updated, we expect Van.findOne to be error 
        // because the the status of van is no longer close( has been updated by Van.updateOne)
        expect(res.render).toHaveBeenCalledWith('showVanStatus', {"oneVan": {
            "VanId": "Niceday",
            "status": "open"}, 
            "layout": 'vendor_main.hbs'
        });

        // expect(res.render).toHaveBeenCalledWith('error', {"errorCode": 404,
        // "message": "Error: Van not found!"});
        });
      
  });


//   defining a test suite for testing the updateVanStatus
describe("Unit testing updateVanStatus from vanController.js with invalid van", () => {
    
    const req = {
        // searching for van in my database
        session: {van_name:'1234'}
    };

    const res = {
        render: jest.fn()
    };

    beforeAll(() => {
        // clear the render method 
        res.render.mockClear();

        Van.findOne = jest.fn().mockResolvedValue();
        Van.findOne.mockImplementationOnce(() => {
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
        expect(res.render).toHaveBeenCalledWith('error', {"errorCode": 404,
        "message": "Error: Van not found!"});
    });
  }
  );