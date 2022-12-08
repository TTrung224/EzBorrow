const RequestController = require("../controllers/RequestController");
const AccountController = require("../controllers/AccountController");
const EmailService = require("./EmailService");
const epoq = require('epoq');

RequestController

async function dailyService(){
    try{
        var dateNow = new Date();
        console.log(dateNow);
        dateNow.setUTCHours(0,0,0,0);
        returnRemind(dateNow);
    } catch(err){
        console.log(err);
    }

}

async function returnRemindAndFine(dateNow){
    const requests = await RequestController.getPickedUp();
    requests.map(function(request){
        var dateExpectToReturn = request.expected_return_date;
        console.log(dateExpectToReturn)
        dateExpectToReturn.setUTCHours(0,0,0,0);
        console.log(dateExpectToReturn)

        var remindDate = dateExpectToReturn;
        remindDate.setUTCDate(dateExpectToReturn.getDate()-1);
        var fineDate = dateExpectToReturn;
        fineDate.setUTCDate(dateExpectToReturn.getDate()+2);

        console.log(dateNow + " - " + remindDate);

        if(dateNow.getTime() <= fineDate.getTime()){
            console.log("fine");
            EmailService.emailForStudentFineAnnounce(request._id);
        } else if(dateNow.getTime() <= remindDate.getTime()){
            console.log("remind");
            EmailService.emailForStudentReturnRemind(request._id);
        }
    })
}

function autoCancel(dateNow){
    
}

module.exports = { dailyService };