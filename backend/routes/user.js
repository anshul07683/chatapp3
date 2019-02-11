var express = require('express');
var router = express.Router();
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const User =require("../models/user");
const jwt = require('jsonwebtoken');

router.post("/signup",(req,res,next)=>{
console.log(req.body)
  User.find({email:req.body.email})
  .exec()
  .then(user =>{
    if(user.length>=1){
      return res.status(409).json({
        message: 'mail exist'
      })
    }else{
      bcrypt.hash(req.body.password,10, (err,hash)=>{
        if(err){
          return res.status(500).json({
            error:err
          });
        }else {
          const user = new User({
            _id:new mongoose.Types.ObjectId(),
            email:req.body.email,
            password:hash
          });
          user
            .save()
            .then(result =>{
              console.log(result);
              res.status(201).json({
                message:'user Created'
              })
            }).catch(err=>{
                console.log(err);
                res.status(500).json({
                  error:err,
                  message:"123"
                });
              })
          }
      })
    }
  })

});


router.post('/login',(req,res,next)=>{
  User.find({email:req.body.email})
    .exec()
    .then(user =>{
      if(user.length<1){

        return res.status(401).json({
          message:'Auth failed 1'
        });
      }
      bcrypt.compare(req.body.password,user[0].password,(err,result)=>{
        if(err){
          console.log(req.body.password, user[0].password)
          return res.status(401).json({
            message:"auth failed 2"
          });
        }
        if(result){
          const token=jwt.sign({
            email:user[0].email,
            userId:user[0]._id
          },"Anshul",{      //JWT KEY
              expiresIn:"1h"
          });
          return res.status(200).json({
            message:"Auth successfull",
            token:token
          });
        }
        res.status(401).json({
          message:'Auth failed 3'
        });
      });
    })
    .catch(err=>{
      console.log(err);
      res.status(500).json({
        error:err
      });
    });
});

router.delete("/:userId",(req,res,next)=>{
  User.remove({_id:req.params.userId})
  .exec()
  .then(result=>{
    res.status(200).json({
      message:'User deleted'
    })
  })
  .catch(err =>{
    console.log(err);
    res.status(500).json({
      error:err
    });
  });
});

module.exports = router;