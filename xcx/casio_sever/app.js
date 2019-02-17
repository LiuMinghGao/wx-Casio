//vue_app_server 服务器

const express = require("express");
const bodyParser=require('body-parser');
var app = express();
app.use(express.static("public"));
app.use(bodyParser.urlencoded({
  extended:false
 }));
app.listen(3000);
const pool = require("./pool");

//express mysql 参数 request;response
//跨域访问配置
//1:加载模块cors
const cors = require("cors");
//2:配置cors
app.use(cors({
  origin:["http://127.0.0.1:8080",
         "http://localhost:8080"],//允许列表
  credentials:true   //是否验证
}))
//3.加载第三方模块：express-session
const session = require("express-session");
//4.对模块配置
app.use(session({
  secret:"128位随机字符串",   //安全令牌
  resave:false,             //请求保存
  saveUninitialized:true,   //初始化
  cookie:{                  //sessionid保存时间1天 cookie
    maxAge:1000*60*60*24
  }
}));

/**轮播图**/
app.get("/carousel",(req,res)=>{
    pool.query("SELECT * FROM xcx_cs_carousel",(err,result)=>{
      if(err) throw err;
      res.send(result)
    })
})

//#功能六:商品列表
app.get("/getGoodsList", (req,res) => {
  //1:参数       pno 页码;pageSize 页大小
  var fl=req.query.fl;
  var pno=req.query.pno;
  var pageSize=req.query.pageSize;
  //1.2:默认值
  if (!pno) {
    pno = 1;
  }
  if (!pageSize) {
    pageSize = 6;
  }
  //2:验证正则表达式
  var reg = /^[0-9]{1,}$/;
  if (!reg.test(pno)) {
    res.send({ code: -1, msg: "页码格式不正确" });
    return;
  }
  if (!reg.test(pageSize)) {
    res.send({ code: -2, msg: "页大小格式不正确" });
    return;
  }
  //  查询总页数
  var progress = 0; //sql执行进度
  obj = { code: 1 };
  pool.query("SELECT count(pid) as c FROM xcx_cs_product", (err, result) => {
    if (err) throw err;
    //console.log(result[0].c);
    var pageCount = Math.ceil(result[0].c / pageSize);
    obj.pageCount = pageCount;
    progress += 50;
    if (progress == 100) {
      res.send(obj);
    }
  });
  //  查询当前页内容
  var offset = parseInt((pno - 1) * pageSize);
  pageSize = parseInt(pageSize);
  pool.query("SELECT * FROM xcx_cs_product WHERE fl=? LIMIT ?,?", [fl,offset, pageSize], (err, result) => {
    if (err) throw err;
    //console.log(result);
    obj.data = result;
    progress += 50;
    if (progress == 100) {
      res.send(obj);
    }
  });
});


//商品列表信息
app.use("/getproductlist",(req,res)=>{
   pool.query("SELECT * FROM xcx_cs_product",(err,result)=>{
     if(err) throw err;
     res.send(result)
   })
})
//商品详情
app.use("/getDetails",(req,res)=>{
    var did=req.query.did;
    pool.query("SELECT * FROM xcx_cs_details WHERE did=?",[did],(err,result)=>{
       if(err) throw err;
       res.send(result)
    })
})

//添加商品到购物车
app.use("/addCart",(req,res)=>{
	var uid=1;
  var did=req.query.did;
  var price=req.query.price;
  var count=parseInt(req.query.count);
  pool.query("SELECT count as c FROM xcx_cs_cart WHERE did=? AND uid=?",[did,uid],(err,result)=>{
      if(err) throw err;
      if(result.length>0){
          var count2=result[0].c+count;
          pool.query("UPDATE xcx_cs_cart SET count=? WHERE did=? AND uid=?",[count2,did,uid],(err,result)=>{
            if(err) throw err;
            if (result.affectedRows > 0) {
              res.send({ code: 1, msg: "添加成功" });
            }else{
              res.send({ code: -1, msg: "添加失败" });
            }
          })
      }else{
          pool.query("INSERT INTO `xcx_cs_cart`(`id`, `uid`,`did`,`price`,`count`) VALUES(null,?,?,?,?)",[uid,did,price,count], (err, result)=>{
            if (err) throw err;
            if (result.affectedRows > 0) {
              res.send({ code: 1, msg: "添加成功" });
            }else{
              res.send({ code: -1, msg: "添加失败" });
            }
        })
      }
  })
})


//获取购物车信息
app.get("/getcartlist",(req,res)=>{
	var uid=1;
 pool.query("SELECT d.title,d.img,c.count,c.did,c.price,c.id FROM xcx_cs_product d,xcx_cs_cart c WHERE d.pid=c.did AND uid=?",[uid],(err,result)=>{
    if(err) throw err;
    res.send(result)
  })
})

//加，减商品数量更新
app.get("/updateCart",(req,res)=>{
    var id=req.query.id;
    var count=req.query.count;
  pool.query("UPDATE xcx_cs_cart SET count=? WHERE id=?",[count,id],(err,result)=>{
    if(err) throw err;
    if(result.affectedRows > 0){
      res.send({code:1,msg:"更新成功"});
    }else{
      res.send({code:-1,msg:"更新失败"});
    }
  })
})

/*
//删除单个购物车商品
app.get("/delete",(req,res)=>{
  var id=parseInt(req.query.id);
    pool.query("DELETE FROM move_cs_cart WHERE id=?",[id],(err,result)=>{
       if(err)throw err;
       if(result.affectedRows>0){
        res.send({code:1,msg:"删除成功"});
       }else{
        res.send({code:-1,msg:"删除失败"});
       }
   })
  })
//删除购物车全部商品
  app.get("/deleteAll",(req,res)=>{
    pool.query("DELETE FROM move_cs_cart WHERE id",(err,result)=>{
      if(err)throw err;
      if(result.affectedRows>0){
       res.send({code:1,msg:"删除成功"});
      }else{
       res.send({code:-1,msg:"删除失败"});
      }
    })
 })
//获取购物车数量
app.get("/getCount",(req,res)=>{
  var uid=req.session.uid;
  if(!uid){
    res.send("用户未登陆");
    return;
  }
	pool.query("SELECT sum(count) as c FROM move_cs_cart WHERE uid=?",[uid],(err,result)=>{
		if(err) throw err;
	  res.send({code:1,count:result[0].c});
	})
})*/


