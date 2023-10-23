const nodemailer=require("nodemailer");
exports.sendEmail=async(options)=>{
    const transporter=  nodemailer.createTransport({
        
        service:process.env.SMPT_SERVICE,
        auth:{
            user:process.env.SMPT_MAIL,
            pass:process.env.SMPT_PASSWORD,
        },
    });
    const mailoption ={
        from:process.env.SMPT_MAIL,
        to:options.email,
        subject:options.subject,
        text:options.message,

    }
    await transporter.sendMail(mailoption); 
};
