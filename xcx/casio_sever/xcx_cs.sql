SET NAMES UTF8;
DROP DATABASE IF EXISTS move_cs;
CREATE DATABASE xcx_cs CHARSET=UTF8;
USE xcx_cs;




/**轮播图**/
CREATE TABLE xcx_cs_carousel(
  cid INT PRIMARY KEY AUTO_INCREMENT,
  img VARCHAR(128),
  title VARCHAR(64),
  href VARCHAR(128)
);

/**插入轮播图**/
INSERT INTO  xcx_cs_carousel VALUES
(NULL, 'http://127.0.0.1:3000/img/banner1.jpg','轮播广告商品1','1'),
(NULL, 'http://127.0.0.1:3000/img/banner2.jpg','轮播广告商品2','1'),
(NULL, 'http://127.0.0.1:3000/img/banner3.jpg','轮播广告商品3','1'),
(NULL, 'http://127.0.0.1:3000/img/banner4.jpg','轮播广告商品4','1');



#创建商品列表 xcx_cs_product
CREATE TABLE xcx_cs_product(
  pid INT PRIMARY KEY AUTO_INCREMENT,
	fl INT,
	img VARCHAR(225),
  title VARCHAR(2000),
  price DECIMAL(10,2),
  shelf_time DATE
);
INSERT INTO xcx_cs_product VALUES(null,2,'http://127.0.0.1:3000/img/thumb1.jpg',"DW-5600CX-4",1188,"2018-9-12");
INSERT INTO xcx_cs_product VALUES(null,2,'http://127.0.0.1:3000/img/thumb2.jpg',"GA-110DDR-7A",1288,"2018-10-06");
INSERT INTO xcx_cs_product VALUES(null,2,'http://127.0.0.1:3000/img/thumb3.jpg',"DW-5600HDR-1",1388,"2018-9-15");
INSERT INTO xcx_cs_product VALUES(null,2,'http://127.0.0.1:3000/img/thumb4.jpg',"DW-5600SLG-7",1688,"2018-12-02");
INSERT INTO xcx_cs_product VALUES(null,2,'http://127.0.0.1:3000/img/thumb5.jpg',"GA-135DD-1A",1888,"2018-9-26");
INSERT INTO xcx_cs_product VALUES(null,2,'http://127.0.0.1:3000/img/thumb6.jpg',"GAW-100CG-4A",1988,"2018-11-12");
INSERT INTO xcx_cs_product VALUES(null,2,'http://127.0.0.1:3000/img/thumb7.jpg',"GWF-1035F-1",988,"2018-3-28");
INSERT INTO xcx_cs_product VALUES(null,2,'http://127.0.0.1:3000/img/thumb8.jpg',"DW-6900SLG-1",888,"2018-6-19");
INSERT INTO xcx_cs_product VALUES(null,1,'http://127.0.0.1:3000/img/thumb22.jpg',"DW-SD164-4A",1891,"2018-4-07");
INSERT INTO xcx_cs_product VALUES(null,1,'http://127.0.0.1:3000/img/thumb23.jpg',"WQ-DLAJSD-1",9798,"2018-6-27");
INSERT INTO xcx_cs_product VALUES(null,1,'http://127.0.0.1:3000/img/thumb24.jpg',"DW-6ASDLG-64",1838,"2018-6-11");
INSERT INTO xcx_cs_product VALUES(null,1,'http://127.0.0.1:3000/img/thumb27.jpg',"CS-A00SLG-2",2108,"2018-8-10");
INSERT INTO xcx_cs_product VALUES(null,1,'http://127.0.0.1:3000/img/thumb28.jpg',"DW-6DAS6LG-8",390,"2018-9-16");
INSERT INTO xcx_cs_product VALUES(null,1,'http://127.0.0.1:3000/img/thumb29.jpg',"WD-6ASD8LG-9",5408,"2018-7-17");
INSERT INTO xcx_cs_product VALUES(null,1,'http://127.0.0.1:3000/img/thumb30.jpg',"DW-5H1LG-9",8648,"2018-1-12");
INSERT INTO xcx_cs_product VALUES(null,1,'http://127.0.0.1:3000/img/thumb31.jpg',"GS-9ASDG-1",1508,"2018-12-15");
INSERT INTO xcx_cs_product VALUES(null,1,'http://127.0.0.1:3000/img/thumb32.jpg',"UR-6900SLG-1",8918,"2018-11-29");


#创建商品详情 xcx_cs_details
CREATE TABLE xcx_cs_details(
  did INT PRIMARY KEY AUTO_INCREMENT,
	img VARCHAR(1000),
  title VARCHAR(2000),
  price DECIMAL(10,2),
  shelf_time DATE,
	trait VARCHAR(255),
	functions VARCHAR(1000)
);
INSERT INTO xcx_cs_details VALUES
(null,'["http://127.0.0.1:3000/img/thumb1.jpg","http://127.0.0.1:3000/img/11.png","http://127.0.0.1:3000/img/12.png","http://127.0.0.1:3000/img/13.png","http://127.0.0.1:3000/img/14.png","http://127.0.0.1:3000/img/15.png"]',"DW-5600CX-4",1188,"2018-9-12","2019年猪年新年款由潮流品牌ACU设计、搭配风靡全球的潮流玩具Be@rbrick公仔（约7CM高）。以生肖猪为设计概念，结合潮流元素，创造具有中国新年特色的G-SHOCK腕表。",'["防震","200米防水","电子荧光照明","秒表(1/100秒)","12/24小时时制","倒计时","多功能闹铃,整点响报","全自动日历"]'),
(null,'["http://127.0.0.1:3000/img/thumb2.jpg","http://127.0.0.1:3000/img/21.png","http://127.0.0.1:3000/img/22.png","http://127.0.0.1:3000/img/23.png","http://127.0.0.1:3000/img/24.png","http://127.0.0.1:3000/img/25.png","http://127.0.0.1:3000/img/26.png"]',"GA-110DDR-7A",1288,"2018-10-06","与美国人气说唱歌手A$AP FERG 的合作款。全透明元素配以表盘红黄蓝的点缀。背盖和游环上都印有FERG的logo。表盒采用首饰盒设计，增添特别感。",'["防震","200米防水","电子荧光照明","秒表(1/100秒)","12/24小时时制","倒计时","多功能闹铃,整点响报","全自动日历"]'),
(null,'["http://127.0.0.1:3000/img/thumb3.jpg","http://127.0.0.1:3000/img/31.png","http://127.0.0.1:3000/img/32.png","http://127.0.0.1:3000/img/33.png","http://127.0.0.1:3000/img/34.png","http://127.0.0.1:3000/img/35.png","http://127.0.0.1:3000/img/36.png"]',"DW-5600HDR-1",1388,"2018-9-15","本款是与今年成立15周年的洛杉矶品牌THEHUNDREDS®合作推出的。 原型采用DW-5600款， 设计上使用哑光黑色表圈和表带，与充满活力、色彩鲜艳的THEHUNDREDS® LOGO相结合。 顶部短表带标有“BLOOD SWEAT＆YEARS”字样，标志着品牌的历史，而底部长表带则印有品牌LOGO。",'["防震","200米防水","电子荧光照明","秒表(1/100秒)","12/24小时时制","倒计时","多功能闹铃,整点响报","全自动日历"]'),
(null,'["http://127.0.0.1:3000/img/thumb4.jpg","http://127.0.0.1:3000/img/41.png"]',"DW-5600SLG-7",1688,"2018-12-02","七福神系列中的“布袋尊”型号基于DW-5600。 基本的灰色施以“布袋尊”一直携带的拐杖和麻袋图案，还有松树元素。 游环上有折扇图样，寓意吉祥。 按下本表照明按钮后会有字母“S”浮动在电子背光屏中。七福神系列中的每一款都显示出不同的字母，集齐七款可拼出特别设计的G-SHOCK标志。",'["防震","200米防水","电子荧光照明","秒表(1/100秒)","12/24小时时制","倒计时","多功能闹铃,整点响报","全自动日历"]'),
(null,'["http://127.0.0.1:3000/img/thumb5.jpg"]',"GA-135DD-1A",1888,"2018-9-26","35周年纪念表款，使用钻石为点缀，是一款非常特别的产品。闪耀的钻石分别点缀在12点、3点、7点、9点的位置，其中外圈施以金色IP涂层包边的7点（35分钟）位置钻石，同时也强调了G-SHOCK的35周年纪念。背盖为金色IP涂层35周年纪念LOGO特别刻印。",'["防震","200米防水","电子荧光照明","秒表(1/100秒)","12/24小时时制","倒计时","多功能闹铃,整点响报","全自动日历"]'),
(null,'["http://127.0.0.1:3000/img/thumb6.jpg"]',"GAW-100CG-4A",1988,"2018-11-12","七福神系列的惠比寿表款原型采用高性能的G-7900，适用于恶劣环境。 基本的红色配以黑色按钮和螺丝，游环上印有金色图像的大鲷鱼。金配红寓意吉祥。即使戴着厚手套，大按钮也可以轻松操作,大型LCD增强了显示信息的可读性。 这个型号可在寒冷温度下(-20℃)的恶劣环境中运行。 后盖的设计不仅耐冲击，更提高的佩戴的舒适性。",'["防震","200米防水","电子荧光照明","秒表(1/100秒)","12/24小时时制","倒计时","多功能闹铃,整点响报","全自动日历"]'),
(null,'["http://127.0.0.1:3000/img/thumb7.jpg","http://127.0.0.1:3000/img/61.png"]',"GWF-1035F-1",988,"2018-3-28","35周年纪念限定款最终弹—MAGMA OCEAN MAGMA OCEAN 系列采用有象征性的 G-SHOCK 品牌颜色黑色和红色作为基础，为庆祝35周年采用了鲜艳的玫瑰金和金色作配色。这个用色象征着地球初形成时覆蓋地球的熔岩海，设计不仅回顾了 G-SHOCK 品牌的起源，同时也宣告了G-SHOCK致力于持续创造新价值的理念。",'["防震","200米防水","电子荧光照明","秒表(1/100秒)","12/24小时时制","倒计时","多功能闹铃,整点响报","全自动日历"]'),
(null,'["http://127.0.0.1:3000/img/thumb8.jpg"]',"DW-6900SLG-1",888,"2018-6-19","35周年纪念限定款最终弹—MAGMA OCEAN MAGMA OCEAN 系列采用有象征性的 G-SHOCK 品牌颜色黑色和红色作为基础，为庆祝35周年采用了鲜艳的玫瑰金和金色作配色。这个用色象征着地球初形成时覆蓋地球的熔岩海，设计不仅回顾了 G-SHOCK 品牌的起源，同时也宣告了G-SHOCK致力于持续创造新价值的理念。",'["防震","200米防水","电子荧光照明","秒表(1/100秒)","12/24小时时制","倒计时","多功能闹铃,整点响报","全自动日历"]');

/*购物车表*/
CREATE TABLE xcx_cs_cart(
  id INT PRIMARY KEY AUTO_INCREMENT,
  uid INT,
  did INT,
  price DECIMAL(10,2),
  count INT
);