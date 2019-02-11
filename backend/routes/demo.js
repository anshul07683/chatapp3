
var express = require('express');

var router = express.Router();

const mongoose = require('mongoose');

const multer = require('multer');

const checkAuth = require('../middleware/check-auth');

var Post = require('../models/demo');

const storage = multer.diskStorage({
  destination:function(req,file,cb){
    cb(null,'./uploads/');
  },
  filename:function(req,file,cb){
    cb(null,new Date().toISOString()+file.originalname);
  }
});

const fileFilter = (req,file,cb)=>{
  if(file.mimetype === 'image/jpeg'|| file.mimetype ==='image/png')
  {
    cb(null,true);
  }else{
    cb(null.false);
  }
};

const upload = multer({storage : storage,
  limits:{fileSize:1024*1024*5},
  fileFilter:fileFilter});



router.get('/',(req,res,next)=>{
  Post.find()
    .select("title body _id postImage")
    .exec()
      .then(docs =>{
        console.log(docs);
        res.setHeader('Content-Type', 'text/plain');
        res.send(docs);
      })
      .catch(err =>{
        console.log(err);
        res.status(500).json({
          error:err
        })
      })
});

router.post('/',checkAuth,upload.single('postImage'),(req,res,next)=>{
  console.log(req.data);
  console.log('post is callling from express')

  const post = new Post({
    _id: new mongoose.Types.ObjectId(),
    title:req.body.title,
    body:req.body.body,
    postImage:req.file.path
  })
  post.save().then(result=>{
    console.log(result);
  })
  .catch(err => console.log(err));

  res.status(200).json({
    message: 'Post request',
    createdPost: post
  });
});

router.get('/:postId',(req,res,next)=>{
  const id = req.params.postId;
  Post.findById(id)
    .exec()
    .then(doc=>{
      console.log("from database",doc);
      if(doc){
        res.status(200).json({doc});
      }
      else{
          res.status(404).json({message:'no  id found'})
      }
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({error:err})
    });
});

router.patch('/:postId',checkAuth,(req,res,next)=>{
  const id = req.params.postId;
  const updateOps ={
    title:req.body.title,
    body:req.body.body
  }

  Post.update({ _id:id }, { $set: updateOps }).exec()
  .then(result =>{
    console.log(result);
    res.status(200).json(result);
  })
  .catch(err => {
    console.log(err);
    res.status("error from patch route",500).json({
      error:err
    });

});
});

router.delete('/:postId',checkAuth,(req,res,next)=>{
  console.log('delete is calling from express')
  const id = req.params.postId;
  Post.remove({_id:id})
    .exec()
    .then(result => {
      res.status(200).json(result);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        error:err
      });
    });
});
module.exports = router;