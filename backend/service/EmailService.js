const nodemailer = require('nodemailer');
const fs = require('fs');
const ejs = require("ejs");
const juice = require("juice");
const AccountController = require("../controllers/AccountController")

const technician_email = "technician@rmit.edu.vn";
// const technician_email = "s3891724@rmit.edu.vn";
const website_link = "abc.com";

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'ezborrow.rmit@gmail.com',
        pass: 'dizwtfrnuvmggzwn'
    }
});
      
var mailOptions = {
    from: 'ezborrow.rmit@gmail.com',
};


class EmailService {
    technician_email = technician_email;

    async readTemplate(templateName, templateVars){

        const templatePath = `service/emailTemplates/${templateName}.html`;
        if (templateName && fs.existsSync(templatePath)) {
            const template = fs.readFileSync(templatePath, "utf-8");
            const html = ejs.render(template, templateVars);
            const htmlWithStylesInlined = juice(html);
            return htmlWithStylesInlined;
        }
        return null;
    }

    async sendMail(){
        transporter.sendMail(mailOptions, function(error, info){
            if (error) {
            console.log(error);
            } else {
            console.log('Email sent: ' + info.response);
            }
        });
    }

    async emailForLecturerApprove(request){
        try{
            const name = await AccountController.getUserNameByEmail(request.lecturer_email);
            const vars = {
                "name": name,
                "link": "https://www.w3schools.com/nodejs/nodejs_email.asp",
                "website_link": website_link,
            }
            const html = await this.readTemplate("lecturerApprove", vars)

            mailOptions['to'] = request.lecturer_email;
            mailOptions['subject'] = "[EzBorrow] New equipment borrowing request";
            mailOptions['html'] = html;
            this.sendMail();

        } catch(err){
            console.log(err);
        }
    }
    
    async emailForTechnicianApprove(request){
        try{
            const vars = {
                "link": "https://www.w3schools.com/nodejs/nodejs_email.asp",
                "website_link": website_link,
            }
            const html = await this.readTemplate("technicianApprove", vars)

            mailOptions['to'] = technician_email;
            mailOptions['subject'] = "[EzBorrow] New equipment borrowing request";
            mailOptions['html'] = html;
            this.sendMail();

        } catch(err){
            console.log(err);
        }
    }

    async emailForStudentApprovedStatus(request){
        try{
            // const dateTimeStamp = request.createdAt;
            const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
            // const createdDate  = new Date(dateTimeStamp);
            const createdDateString = request.createdAt.toLocaleDateString("en-US", options);
            const pickupDateString = request.pickup_date.toLocaleDateString("en-US", options);

            const name = await AccountController.getUserNameByEmail(request.borrower_email);

            const vars = {
                "name" : name,
                "createdDate": createdDateString,
                "pickupDate": pickupDateString,
                "link": "https://www.w3schools.com/nodejs/nodejs_email.asp",
                "website_link": website_link,
            }
            const html = await this.readTemplate("studentApprovedStatus", vars)

            mailOptions['to'] = request.borrower_email;
            mailOptions['subject'] = "[EzBorrow] Your equipment borrowing request has been approved";
            mailOptions['html'] = html;
            this.sendMail();

        } catch(err){
            console.log(err);
        }
    }

    async emailForStudentCancelStatus(request, reason){
        try{
            // const dateTimeStamp = request.createdAt;
            const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
            // const createdDate  = new Date(dateTimeStamp);
            const createdDateString = request.createdAt.toLocaleDateString("en-US", options);

            const name = await AccountController.getUserNameByEmail(request.borrower_email);

            const vars = {
                "name" : name,
                "createdDate": createdDateString,
                "reason": reason,
                "link": "https://www.w3schools.com/nodejs/nodejs_email.asp",
                "website_link": website_link,
            }
            const html = await this.readTemplate("studentCancelStatus", vars)

            mailOptions['to'] = request.borrower_email;
            mailOptions['subject'] = "[EzBorrow] Your equipment borrowing request has been canceled";
            mailOptions['html'] = html;
            this.sendMail();

        } catch(err){
            console.log(err);
        }
    }
    
    async emailForStudentReturnRemind(request){
        try{

            // const dateTimeStamp = request.createdAt;
            const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
            // const createdDate  = new Date(dateTimeStamp);
            const createdDate = new Date(request.createdAt);
            const createdDateString = createdDate.toLocaleDateString("en-US", options);

            const expectedReturnDate = new Date(request.expected_return_date);
            const expectedReturnDateString = expectedReturnDate.toLocaleDateString("en-US", options);

            const name = await AccountController.getUserNameByEmail(request.borrower_email);

            const vars = {
                "name" : name,
                "createdDate": createdDateString,
                "expectedReturnDate": expectedReturnDateString,
                "link": "https://www.w3schools.com/nodejs/nodejs_email.asp",
                "website_link": website_link,
            }
            const html = await this.readTemplate("studentReturnRemind", vars)

            mailOptions['to'] = request.borrower_email;
            mailOptions['subject'] = "[EzBorrow] Equipment borrowing return reminder";
            mailOptions['html'] = html;
            this.sendMail();

        } catch(err){
            console.log(err);
        }
    }    
    
    async emailForStudentFineAnnounce(request){
        try{
            // const dateTimeStamp = request.createdAt;
            const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
            // const createdDate  = new Date(dateTimeStamp);
            const createdDate = new Date(request.createdAt);
            const createdDateString = createdDate.toLocaleDateString("en-US", options);

            const expectedReturnDate = new Date(request.expected_return_date);
            const expectedReturnDateString = expectedReturnDate.expectedReturnDate("en-US", options);

            const name = await AccountController.getUserNameByEmail(request.borrower_email);

            const vars = {
                "name" : name,
                "createdDate": createdDateString,
                "expectedReturnDate": expectedReturnDateString,
                "link": "https://www.w3schools.com/nodejs/nodejs_email.asp",
                "website_link": website_link,
            }
            const html = await this.readTemplate("studentFineAnnounce", vars)

            mailOptions['to'] = request.borrower_email;
            mailOptions['subject'] = "[EzBorrow] Fine announcement due to late";
            mailOptions['html'] = html;
            this.sendMail();

        } catch(err){
            console.log(err);
        }
    }
}

module.exports = new EmailService();