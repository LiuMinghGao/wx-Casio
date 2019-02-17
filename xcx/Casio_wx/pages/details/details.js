// pages/details/details.js
Page({
  tiaozhuan:function(){
    wx.reLaunch({
      url: '/pages/shopCart/shopCart'
    })
  },
  /**
   * 页面的初始数据
   */
  data: {
     did:"",
     list:[],
     img:[],
     count:1,
     price:0
  },
  subCount:function(){
    if(this.data.count>1){
      this.data.count--
    }
    this.setData({
      count: this.data.count
    })
  },
  addCount: function () {
    this.data.count++;
    this.setData({
      count: this.data.count
    })
  },
  addcart:function(){
      var did=this.data.did;
      var count=this.data.count;
      var price = this.data.price;
      wx.request({
        url: 'http://127.0.0.1:3000/addCart',
        method:'get',
        data:{did:did,price:price,count:count},
        success:(res)=>{
         if(res.data.code>0){
           wx.showToast({
             title: '添加成功',
           })
         }else{
           wx.showToast({
             title: '添加失败',
           })
         }
        },
        fail:(res)=>{
         console.log(res)
        }
      })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.data.did=options.pid;
    this.getDetails();
  },
   getDetails(){
     console.log(this.data.did)
        wx.request({
          url: 'http://127.0.0.1:3000/getDetails?did='+this.data.did,
          method:"get",
          success:(res)=>{
            var imgs=JSON.parse(res.data[0].img);
             this.setData({
              list:res.data,
              img:imgs,
               price: res.data[0].price
            })
            
          }
        })
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