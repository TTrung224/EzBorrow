const nodemailer = require('nodemailer');
const fs = require('fs');
const ejs = require("ejs");
const juice = require("juice");
const AccountController = require("../controllers/AccountController")
const { HOSTING_URL_BASE } = process.env 

const website_link = HOSTING_URL_BASE;

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

var vars = {
    "website_link": website_link,
    "app_logo": "https://res.cloudinary.com/dw725nuqc/image/upload/v1672923717/EzBorrow%20equipment/logo/icon_oabfgo.png"
}


class EmailService {
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
            var tempVars = vars;
            tempVars["name"] = name;
            tempVars["link"] = HOSTING_URL_BASE+"request";
            // const vars = {
            //     "name": name,
            //     "link": HOSTING_URL_BASE+"request",
            //     "website_link": website_link,
            // }
            const html = await this.readTemplate("lecturerApprove", tempVars)

            mailOptions['to'] = request.lecturer_email;
            mailOptions['subject'] = "[EzBorrow] New equipment borrowing request";
            mailOptions['html'] = html;
            this.sendMail();

        } catch(err){
            console.log(err);
        }
    }
    
    async emailForTechnicianApprove(request){
        const technician_emails = await AccountController.getAllTechnicians();
        console.log(technician_emails);
        try{
            technician_emails.forEach(async technician => {
                var tempVars = vars;
                tempVars["link"] = HOSTING_URL_BASE+"request";
                // const vars = {
                //     "link": HOSTING_URL_BASE+"request",
                //     "website_link": website_link,
                // }
                const html = await this.readTemplate("technicianApprove", tempVars)
    
                mailOptions['to'] = technician.email;
                mailOptions['subject'] = "[EzBorrow] New equipment borrowing request";
                mailOptions['html'] = html;
                this.sendMail();
            });
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
            var tempVars = vars;
            tempVars["link"] = HOSTING_URL_BASE+"request";
            tempVars["name"] = name;
            tempVars["createdDate"] = createdDateString;
            tempVars["pickupDate"] = pickupDateString;

            // const vars = {
            //     "name" : name,
            //     "createdDate": createdDateString,
            //     "pickupDate": pickupDateString,
            //     "link": HOSTING_URL_BASE+"request",
            //     "website_link": website_link,
            // }
            const html = await this.readTemplate("studentApprovedStatus", tempVars)

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
            var tempVars = vars;
            tempVars["link"] = HOSTING_URL_BASE+"request";
            tempVars["name"] = name;
            tempVars["createdDate"] = createdDateString;
            tempVars["reason"] = reason;
            // const vars = {
            //     "name" : name,
            //     "createdDate": createdDateString,
            //     "reason": reason,
            //     "link": HOSTING_URL_BASE+"request",
            //     "website_link": website_link,
            // }
            const html = await this.readTemplate("studentCancelStatus", tempVars)

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
            var tempVars = vars;
            tempVars["link"] = HOSTING_URL_BASE+"request";
            tempVars["name"] = name;
            tempVars["createdDate"] = createdDateString;
            tempVars["expectedReturnDate"] = expectedReturnDateString;
            // const vars = {
            //     "name" : name,
            //     "createdDate": createdDateString,
            //     "expectedReturnDate": expectedReturnDateString,
            //     "link": HOSTING_URL_BASE+"request",
            //     "website_link": website_link,
            // }
            const html = await this.readTemplate("studentReturnRemind", tempVars)

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
            const expectedReturnDateString = expectedReturnDate.toLocaleDateString("en-US", options);

            const name = await AccountController.getUserNameByEmail(request.borrower_email);
            var tempVars = vars;
            tempVars["link"] = HOSTING_URL_BASE+"request";
            tempVars["name"] = name;
            tempVars["createdDate"] = createdDateString;
            tempVars["expectedReturnDate"] = expectedReturnDateString;
            const vars = {
                "name" : name,
                "createdDate": createdDateString,
                "expectedReturnDate": expectedReturnDateString,
                "link": HOSTING_URL_BASE+"request",
                "website_link": website_link,
            }
            const html = await this.readTemplate("studentFineAnnounce", tempVars)

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