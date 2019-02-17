//index.js
//获取应用实例
const app = getApp()
Page({
  skip:function(e){
    var pid = e.target.dataset.id;
   console.log(pid);
   wx.navigateTo({
     url: '/pages/details/details?pid='+pid
   })
  },
  shopList(e){
    var fl=e.target.dataset.id;
    wx.navigateTo({
      url:'/pages/shop_list/shop_list?fl='+fl
    })
  },
  /**
   * 页面的初始数据
   */
  data: {
     list:[],
     navlist:[
       { id: 1, img:"http://127.0.0.1:3000/img/icon1.jpg",title:"航海系列"},
       { id: 2, img:"http://127.0.0.1:3000/img/icon2.jpg",title:"陆地系列"},
       { id: 3, img:"http://127.0.0.1:3000/img/icon3.jpg",title:"航空系列"},
       { id: 4, img:"http://127.0.0.1:3000/img/icon4.jpg",title:"航海系列"},
       { id: 5, img:"http://127.0.0.1:3000/img/icon5.jpg",title:"经典系列"},
       { id: 6, img:"http://127.0.0.1:3000/img/icon6.png",title:"金属系列"}
       ],
     guarante: [{id:1,img:"http://127.0.0.1:3000/img/7.png",title:"7天",subtitle:"无理由退款"},
                {id:2,img:"http://127.0.0.1:3000/img/8.png",title:"顺丰包邮",subtitle:"偏远地区除外"},
                {id:3,img:"http://127.0.0.1:3000/img/9.png",title:"正品",subtitle:"官方旗舰店"},
                {id:3,img:"http://127.0.0.1:3000/img/10.png",title:"保障",subtitle:"全国联保"}
               ],
      product_list:[]
  },
  
  /**轮播图**/
  getImages:function(){
      wx.request({
        url: 'http://127.0.0.1:3000/carousel',
        method:'get',
        success:(res)=>{
         this.setData({
            list:res.data
          })
        }
      })
  },
  getproductList(){
      wx.request({
        url: 'http://127.0.0.1:3000/getproductlist',
        method:'get',
        success:(res)=>{
          this.setData({
            product_list:res.data
          })
        }
      })

  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
      this.getImages();
      this.getproductList();
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
    
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
    
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
    
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
    
  }
})