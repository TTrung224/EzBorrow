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
        returnRemindAndFine(dateNow);
        autoCancel(dateNow);
    } catch(err){
        console.log(err);
    }

}

async function returnRemindAndFine(dateNow){
    try{
        const requests = await RequestController.getPickedUp();
        requests.map(async function(request){
            var dateExpectToReturn = request.expected_return_date;
            dateExpectToReturn.setUTCHours(0,0,0,0);

            var remindDate = new Date(dateExpectToReturn);
            remindDate.setUTCDate(remindDate.getDate()-1);
            var fineDate = new Date(dateExpectToReturn);
            fineDate.setUTCDate(fineDate.getDate()+2);

            console.log("remind: " + dateNow + " - " + remindDate);
            console.log("fine: " + dateNow + " - " + fineDate);

            if(dateNow.getTime() >= fineDate.getTime()){
                console.log("meet fine condition");
                AccountController.getFineStatusByEmail(request.borrower_email).then(async fineStatus =>{
                    if(fineStatus == "NONE"){
                        console.log("start fine");
                        AccountController.fineSet("LATE_RETURN", "overdue of return date", request.borrower_email)
                        await EmailService.emailForStudentFineAnnounce(request);
                        console.log("fine")
                    } 
                })
                
            } else if(dateNow.getTime() >= remindDate.getTime()){
                if(!request.reminded){
                    await EmailService.emailForStudentReturnRemind(request);
                    RequestController.setReminded(request._id);
                    console.log("remind")
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
            createdDate.setUTCHours(0,0,0,0);

            var autoCancelDate = new Date(createdDate);
            autoCancelDate.setUTCDate(createdDate.getDate() + 3);

            console.log("auto cancel: " + dateNow + " - " + autoCancelDate);

            if(dateNow.getTime() >= autoCancelDate.getTime()){
                RequestController.autoCancel(request._id);
                console.log("auto canceled");
            }
        });
    } catch(err){
        console.log(err);
    }
}

module.exports = { dailyService };