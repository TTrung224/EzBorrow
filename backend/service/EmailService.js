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



class EmailService {
    async readTemplate(templateName, templateVars){

        const templatePath = `${__dirname}/emailTemplates/${templateName}.html`;
        if (templateName && fs.existsSync(templatePath)) {
            const template = fs.readFileSync(templatePath, "utf-8");
            const html = ejs.render(template, templateVars);
            const htmlWithStylesInlined = juice(html);
            return htmlWithStylesInlined;
        }
        return null;
    }

    // async sendMail(){
    //     transporter.sendMail(mailOptions, function(error, info){
    //         if (error) {
    //         console.log(error);
    //         } else {
    //         console.log('Email sent: ' + info.response);
    //         }
    //     });
    // }

    async sendMail(){
        await new Promise((resolve, reject) => {transporter.sendMail(mailOptions, function(error, info){
            if (error) {
                console.log(error);
                reject(error);
            } else {
                console.log('Email sent: ' + info.response);
                resolve(info);
            }
        });})
    }

    async emailForLecturerApprove(request){
        try{
            const name = await AccountController.getUserNameByEmail(request.lecturer_email);
            const vars = {
                "name": name,
                "link": HOSTING_URL_BASE+"request",
                "website_link": website_link,
            }
            const html = await this.readTemplate("lecturerApprove", vars)

            mailOptions['to'] = request.lecturer_email;
            mailOptions['subject'] = "[EzBorrow] New equipment borrowing request";
            mailOptions['html'] = html;
            await this.sendMail();

        } catch(err){
            console.log(err);
        }
    }
    
    async emailForTechnicianApprove(request){
        const technician_emails = await AccountController.getAllTechnicians();
        console.log(technician_emails);
        try{
            technician_emails.forEach(async technician => {
                const vars = {
                    "link": HOSTING_URL_BASE+"request",
                    "website_link": website_link,
                }
                const html = await this.readTemplate("technicianApprove", vars)
    
                mailOptions['to'] = technician.email;
                mailOptions['subject'] = "[EzBorrow] New equipment borrowing request";
                mailOptions['html'] = html;
                await this.sendMail();
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

            const vars = {
                "name" : name,
                "createdDate": createdDateString,
                "pickupDate": pickupDateString,
                "link": HOSTING_URL_BASE+"request",
                "website_link": website_link,
            }
            const html = await this.readTemplate("studentApprovedStatus", vars)

            mailOptions['to'] = request.borrower_email;
            mailOptions['subject'] = "[EzBorrow] Your equipment borrowing request has been approved";
            mailOptions['html'] = html;
            await this.sendMail();

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
                "link": HOSTING_URL_BASE+"request",
                "website_link": website_link,
            }
            const html = await this.readTemplate("studentCancelStatus", vars)

            mailOptions['to'] = request.borrower_email;
            mailOptions['subject'] = "[EzBorrow] Your equipment borrowing request has been canceled";
            mailOptions['html'] = html;
            await this.sendMail();

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
                "link": HOSTING_URL_BASE+"request",
                "website_link": website_link,
            }
            const html = await this.readTemplate("studentReturnRemind", vars)

            mailOptions['to'] = request.borrower_email;
            mailOptions['subject'] = "[EzBorrow] Equipment borrowing return reminder";
            mailOptions['html'] = html;
            await this.sendMail();

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

            const vars = {
                "name" : name,
                "createdDate": createdDateString,
                "expectedReturnDate": expectedReturnDateString,
                "link": HOSTING_URL_BASE+"request",
                "website_link": website_link,
            }
            const html = await this.readTemplate("studentFineAnnounce", vars)

            mailOptions['to'] = request.borrower_email;
            mailOptions['subject'] = "[EzBorrow] Fine announcement due to late";
            mailOptions['html'] = html;
            await this.sendMail();

        } catch(err){
            console.log(err);
        }
    }
}

module.exports = new EmailService();