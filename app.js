var express = require("express");
var app = express();
var router = require("./router/router.js");
var cartoon = require("./router/cartoon.js");
var session = require('express-session');

//使用session
app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true
}));

//模板引擎
app.set("view engine","ejs");
//静态页面
app.use(express.static("./public"));
//静态漫画文件夹
app.use("/cartoon",express.static("./cartoon"));
//首页图片文件夹
app.use("/avatar",express.static("./avatar"));
//路由表
app.get("/",router.showIndex);              //显示首页
app.get("/regist",router.showRegist);       //显示注册页面
app.post("/doregist",router.doRegist);      //执行注册，Ajax服务
app.get("/login",router.showLogin);         //显示登陆页面
app.post("/dologin",router.doLogin);        //执行注册，Ajax服务
app.get("/setavatar",router.showSetavatar); //上传图片
app.post("/dosetavatar",router.dosetavatar);//执行设置头像，Ajax服务
app.get("/cut",router.showcut);             //剪裁头像页面
app.post("/post",router.doPost);            //发表说说
app.get("/docut",router.docut);             //执行剪裁
app.get("/getAllShuoshuo",router.getAllShuoshuo);  //列出所有说说Ajax服务
app.get("/getuserinfo",router.getuserinfo);  //列出所有说说Ajax服务
app.get("/getshuoshuoamount",router.getshuoshuoamount);  //总数
app.get("/user/:user",router.showUser);  //显示用户所有
app.get("/post/:oid",router.showUser);  //显示用户所有
app.get("/userlist",router.showuserlist);  //显示所有用户列表
app.get("/cartoon",cartoon.showIndex);  //列出图片文件夹
app.get("/cartoon/:wjj/:albumName", cartoon.showAlbum);//列出特定文件夹的图片
app.listen(3000);
