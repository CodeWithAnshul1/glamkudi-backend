import transporter from "../config/mail.js";

const sendEmail = async({to,subject,text ,html})=>{
    const info = await transporter.sendMail({
        from: `"GlamKudi" <${process.env.EMAIL_USER}>`,
        to,
        subject, 
        text,
        html,
    });
    return info ;

};
export default sendEmail;