const nodemailer = require('nodemailer');
const mailGun = require('nodemailer-mailgun-transport');



const auth = {
    auth:{
        api_key:'key-741835db5220d8ae59d99fca86c41d3f',
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


