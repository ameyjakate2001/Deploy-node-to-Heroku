const nodemailer = require('nodemailer');
const mailGun = require('nodemailer-mailgun-transport');



const auth = {
    auth:{
        api_key:'e0ac86fd630d2ba33e8e0329a6973e57-b6190e87-f7216dfc',
        domain:'sandboxa4b65a2036b745a4b897058b6a677c33.mailgun.org'
    }
};

const transporter = nodemailer.createTransport(mailGun(auth));




const sendMail = (email,text,cb)=>{
    const mailOptions = {
        from: email,
        to:'ameyjakate2001@gmail.com',
        subject:'Application',
        text
    };
    
    transporter.sendMail(mailOptions,function(err,data){
        if(err){
            cb(err,null);
        }
        else{
            cb(null,data);
        }
    });
}

module.exports = sendMail;


