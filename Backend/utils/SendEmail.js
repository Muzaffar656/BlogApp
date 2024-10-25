import nodemailer from 'nodemailer'

export const  sendEmail = async(email,subject,text)=>{
try {
    const transporter = nodemailer.createTransport({
        host :"sandbox.smtp.mailtrap.io",
        service : "gmail",
        port: 2525,
        secure:true, 
        auth:{
            user:"hussainmuzaffar656@gmail.com",
            pass:"ffqr ocam czyj kejb"
        }
    })
    await transporter.sendMail({
        from:email,
        to:"hussainmuzaffar656@gmail.com",
        subject:subject,
        text:text
    
})
console.log('send email succesfully')
} catch (error) {
  console.log(error)
}
}