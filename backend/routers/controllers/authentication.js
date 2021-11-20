const userModel = require("../../db/models/user");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt")
require("dotenv").config();
const { OAuth2Client } = require("google-auth-library");
const client = new OAuth2Client(
  "831343529176-d16rhc56dha5digsv3pt76cej56qnqdm.apps.googleusercontent.com"
);
831343529176-d16rhc56dha5digsv3pt76cej56qnqdm.apps.googleusercontent.com

const Login = (req, res) => {
  const email = req.body.email.toLowerCase();
  const password = req.body.password;
  userModel.findOne({ email })
  .then(async(result) => {
    if (!result) {
     return res.json({
        success: false,
        message: "The email doesn't exist",
      });
    }
    try {
        const check = bcrypt.compareSync(password,result.password)
        if(!check){
            res.json({
                success: false,
                message:"The password you’ve entered is incorrect"
            })
        }
        const payload={
            userId : result._id,
            firstName: result.firstName,
            email: result.email,
            dateOfBirthday: result.BirthDate,
            cart: result.cart
        }
        const options = {
         expiresIn: "10000000h",
       };
       const token = await jwt.sign(payload, process.env.SECRET, options);
    
       res.status(200).json({
         success: true,
         message: `Email and Password are correct`,
         token: token,
       });
    } catch (error) {
        throw new Error(error.message);
    }

    
  
  })
  .catch((err) => {
    res.status(500).json({
      success: false,
      message: `Server Error`,
      err: err,
    });
  });
};

const loginWithGoogle=async(req,res)=>{
  const tokenId=req.body.tokenId
  client.verifyIdToken({idToken:tokenId,audience:"831343529176-d16rhc56dha5digsv3pt76cej56qnqdm.apps.googleusercontent.com"})
  .then(response=>{
    console.log(response);
    const {email_verified,given_name,family_name,email}=response.payload
    if(email_verified){
      userModel.findOne({email})
      .then(async result=>{
        // console.log(result);
          if(result){
            try {
              const valid= await bcrypt.compare(email+process.env.SECRET,result.password);
              if(!valid){
                return res.status(403).json({
                  success:false,
                  message:"Password incorrect"
                });
              }
              const payload={
                firstName:result.userName,
                userId:result._id
              }
              const options={
                expiresIn:"2h"
              }
              const token=jwt.sign(payload,process.env.SECRET,options);
              return res.status(200).json({
                  success:true,
                  message:"login successfuly",
                  token:token
              })
          } catch (error) {
                console.log("newError");
          }
          }else{
            
                    let password=email+process.env.SECRET;
                    const newuser= new userModel({
                      firstName:given_name,
                      lastName: family_name,
                      email: email ,   
                      password:  password
 
                      });
                      newuser
                      .save()
                      .then(result=>{
                        const payload={
                          firstName:result.firstName,
                          userId:result._id
                      }
                      const options={
                          expiresIn:"2h"
                      }
                      const token=jwt.sign(payload,process.env.SECRET,options);
                      return res.status(200).json({
                          success:true,
                          message:"login successfuly",
                          token:token
                      })
                      })
                      .catch((err) => {
                          res.status(500).json({
                            success: false,
                            message: `Server Error`,
                            err: err,
                          });
                        });
          }
      })
    }
  })
}

module.exports = { Login , loginWithGoogle};
