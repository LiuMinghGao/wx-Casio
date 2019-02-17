// pages/shop_list/shop_list.js
Page({
  data: {
    shopList: [],
    pageIndex: 0,
    pageSize: 6,
    hasMore:true,
    fl:''
    
  },

  // 获取商品信息
  
  // 跳转详情
  skip: function (e) {
    var pid = e.target.dataset.id;
    wx.navigateTo({
      url: '/pages/details/details?pid=' + pid
    })
  },
  /**
   * 页面的初始数据
   */

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
      this.data.fl=options.fl;
      this.getShopList();
  },
  getShopList: function () {
    if (this.data.hasMore === false) return;
    var fl = this.data.fl;
    var pno = this.data.pageIndex + 1;
    var ps = this.data.pageSize;
    wx.showLoading({
      title: '正在加载中'
    })
    setInterval(() => {
      wx.hideLoading()
    }, 500)
    wx.request({
      url: 'http://127.0.0.1:3000/getGoodsList',
      method: 'get',
      data: { fl: fl, pno: pno, pageSize: ps },
      success: (res) => {
        var rows = this.data.shopList.concat(res.data.data);
        var pc = res.data.pageCount;
        var flag = pno < pc;
        this.setData({
          shopList: rows,
          pageIndex: pno,
          hasMore: flag
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
    
    this.setData({
      pageIndex:0,
      shopList:[],
      hasMore:true
    })
    this.getShopList();
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
   
    this.getShopList();
    
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  }
})