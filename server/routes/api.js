const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Video = require('../models/video');
const User = require('../models/user');

const db = "mongodb://uservishwas:uservishwas9@ds137281.mlab.com:37281/videoplayer"
mongoose.Promise = global.Promise;
mongoose.connect(db, { useNewUrlParser: true }, function(err){
	if(err){
		console.error('Error! '+err);
	}
});

router.get('/videos', function(req, res){
	console.log('get request for all videos');
	Video.find({}).exec(function(err, videos){
		if(err){
			console.log('error')
		} else {
			res.json(videos)
		}
	})
});
router.get('/videos/:id', function(req, res){
	console.log('get request for all videos');
	Video.findById(req.params.id).exec(function(err, video){
		if(err){
			console.log('error')
		} else {
			res.json(video)
		}
	})
});
router.post('/video', function(req, res){
	console.log('Post a video');
	var newVideo = new Video();
	newVideo.title = req.body.title;
	newVideo.url = req.body.url;
	newVideo.description = req.body.description;
	newVideo.save(function(err, insertedVideo){
		if(err){
			console.log('error'+err);
		} else {
			res.json(insertedVideo)
		}
	})
})
router.put('/video/:id', function(req, res){
	console.log('update vidoe');
	Video.findByIdAndUpdate(req.params.id, 
	{
		$set:{
			title:req.body.title,
			url:req.body.url,
			description:req.body.description
		}
	},
	{
		new: true
	},
	function(err, updatedVideo){
		if(err){
			res.send('error while updating')
		} else {
			res.json(updatedVideo)
		}
	})
})
router.delete('/video/:id',function(req, res){
	console.log('deleting a video');
	Video.findByIdAndRemove(req.params.id,function(err, deletedVideo){
		if(err){
			res.send('error delting video')
		} else {
			res.json(deletedVideo)
		}
	});
});
router.post('/register', function(req, res){
	var userName = req.body.userName;
	var password = req.body.password;
	var email = req.body.email;
	var newUser = new User();
	newUser.userName = userName;
	newUser.password = password;
	newUser.email = email;
	newUser.save(function(err, savedUser){
		if(err){
			console.log(err);
			return res.status(500).send(err);
		} else {
			res.json(savedUser)
		}
	})
});
router.post('/login', function(req, res){
	var userName = req.body.userName;
	var password = req.body.password;
	User.findOne({
		userName:userName,
		password:password
	}, function(err, user){
		if(err){
			res.json(err)
		} 
		if(!user){
			res.json(err)
		}else {
			res.json(user)
		}
	})
})
module.exports = router;