const RequestController = require("../controllers/RequestController");
const AccountController = require("../controllers/AccountController");
const EmailService = require("./EmailService");
const epoq = require('epoq');

RequestController

async function dailyService(){
    try{
        var dateNow = new Date();
        // console.log(dateNow);
        dateNow.setUTCHours(0,0,0,0);
        returnRemind(dateNow);
        autoCancel(dateNow);
    } catch(err){
        console.log(err);
    }

}

async function returnRemindAndFine(dateNow){
    try{
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

            if(dateNow.getTime() >= fineDate.getTime()){
                if(AccountController.getFineStatusByEmail(request.borrower_email) == "NONE"){
                    AccountController.fineSet("LATE_RETURN", "overdue of return date", request.borrower_email)
                    EmailService.emailForStudentFineAnnounce(request._id);
                }
            } else if(dateNow.getTime() >= remindDate.getTime()){
                if(!request.reminded){
                    EmailService.emailForStudentReturnRemind(request._id);
                }
            }
        });
    } catch(err){
        console.log(err);
    }
}

async function autoCancel(dateNow){
    try{
        const requests = await RequestController.getWaiting();
        requests.map(function(request){
            var createdDate = request.createdAt;
            console.log(createdDate)
            createdDate.setUTCHours(0,0,0,0);
            console.log(createdDate)

            var autoCancelDate = createdDate
            console.log(autoCancelDate)
            autoCancelDate.setUTCDate(createdDate.getDate() + 3);
            console.log(autoCancelDate)

            console.log(dateNow + " - " + autoCancelDate);

            if(dateNow.getTime() >= autoCancelDate.getTime()){
                RequestController.autoCancel(request._id);
            }
        });
    } catch(err){
        console.log(err);
    }
}

module.exports = { dailyService };