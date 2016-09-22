/**
 * Created by Danny on 2015/9/22 15:30.
 */
var file = require("../models/file.js");
var formidable = require('formidable');
var path = require("path");
var fs = require("fs");
var sd = require("silly-datetime");

//首页
exports.showIndex = function(req,res,next){
    
     var bh=req.query.bh;
    
     var tu=req.query.tu;


     if (req.session.login == "1") {
        //如果登陆了
        var username = req.session.username;
        var login = true;
    } else {
        //没有登陆
        var username = "";  //制定一个空用户名
        var login = false;
    }
   
    file.getAllAlbums(bh,function(err,allAlabums){
        //err是字符串
        if(err){
           // next(); 
            res.redirect(tu);

            return;
        }
            res.render("cartoon_index", {
                "login": login,
                "username": username,
                "active": "漫画列表",
                "albums" : allAlabums,    //数组
                "wjj":bh
                });



       
    })
}

//图片页
exports.showAlbum = function(req,res,next){
    //遍历相册中的所有图片
    var wjj = req.params.wjj;

    if (req.session.login == "1") {
        //如果登陆了
        var username = req.session.username;
        var login = true;
    } else {
        //没有登陆
        var username = "";  //制定一个空用户名
        var login = false;
    }

    var albumName = req.params.albumName;
    //console.log(wjj+albumName);
    albumName=wjj+"/"+albumName;
    //具体业务交给model
    file.getAllImagesByAlbumName(albumName,function(err,imagesArray){
        if(err){
          // next(); 

            return;
        }

         res.render("album", {
                "login": login,
                "username": username,
                "active": "浏览漫画",
                 "albumname" : albumName,
                "images" : imagesArray,
                "wjj":wjj
                });

        // res.render("album",{
        //     "albumname" : albumName,
        //     "images" : imagesArray
        // });
    });
};

