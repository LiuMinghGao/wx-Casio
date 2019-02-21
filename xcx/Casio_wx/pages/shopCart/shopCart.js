// pages/shopCart/shopCart.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    shoplist:[],
    count:1,
    isAllSelected:false,
    total:0,
    selectCount:0,
    shopCount:0
  },
  // 计算选中的商品的总价格
  calcAll(){
    var totalPrice = 0;
    for (var i = 0; i < this.data.shoplist.length; i++) {
      var p = this.data.shoplist[i];
      if (p.isSelected) {
        totalPrice += (p.price * p.count);
      }
    }
    this.setData({
      total: totalPrice,
      shoplist: this.data.shoplist
    })

  },
  //全选
  selectAll(){
    this.data.isAllSelected = !this.data.isAllSelected;
    for (var i=0;i<this.data.shoplist.length;i++){
      this.data.shoplist[i].isSelected = this.data.isAllSelected;
    }
    if (this.data.isAllSelected){
      this.data.selectCount=this.data.shoplist.length;
      for (var i = 0; i < this.data.shoplist.length;i++){
        this.data.shopCount+=this.data.shoplist[i].count;
      }
    }else{
      this.data.selectCount=0;
      this.data.shopCount=0;
    }
    this.calcAll();
    this.setData({
      selectCount: this.data.selectCount,
      isAllSelected:this.data.isAllSelected,
      shopCount: this.data.shopCount
    })
  },
  //单选
  select(e){
    var i = e.target.dataset.p;
    var shopList = this.data.shoplist;
    if (shopList[i].isSelected){
      shopList[i].isSelected=false;
      this.data.selectCount--;
      this.data.shopCount -= shopList[i].count;
    }else{
      shopList[i].isSelected = true;
      this.data.selectCount++;
      this.data.shopCount += shopList[i].count;
    }
    if (this.data.selectCount == shopList.length){
      this.data.isAllSelected=true
    }else{
      this.data.isAllSelected = false
    }
    this.calcAll();
    this.setData({
      shoplist: shopList,
      isAllSelected: this.data.isAllSelected,
      shopCount: this.data.shopCount
    })
  },
  subCount(e){
    //不更新数据库  //页面自定义绑定下标index
    /*var shopList = this.data.shoplist
    var i = e.target.dataset.id;
    if (shopList[i].count>1){
      shopList[i].count--;
    }
    if (shopList[i].isSelected) {
      this.data.shopCount--
    }
    this.setData({
      shoplist: shopList,
      shopCount: this.data.shopCount
    })*/
    //更新到数据库  //页面自定义绑定item.id
      var shoplist = this.data.shoplist;
      var id=e.target.dataset.id;
      for(var p of this.data.shoplist){
        if(p.id==id && p.count>1){
            p.count--;
          this.updateCount(p.id, p.count);
          this.setData({
            shoplist: shoplist
          })
          break;
        }
      }
  },
  addCount(e){
    //不更新数据库  //页面自定义绑定下标index
   /* var shopList=this.data.shoplist
    var i= e.target.dataset.id;
    shopList[i].count++;
    if (shopList[i].isSelected){
      this.data.shopCount++
    }
    this.setData({
      shoplist: shopList,
      shopCount: this.data.shopCount
    })*/
    //更新到数据库  //页面自定义绑定item.id
     var shoplist=this.data.shoplist;
     var id=e.target.dataset.id;
     for(var p of this.data.shoplist){
      if(p.id==id){
        p.count++;
        this.updateCount(p.id,p.count);
        this.setData({
          shoplist: shoplist
        })
        break;
      }
    }
  },
  updateCount(id,count){
      wx.request({
        url: 'http://127.0.0.1:3000/updateCart',
        method:'get',
        data:{id:id,count:count},
        success:(res)=>{
          console.log(res)
        },
        fail:(res)=>{
          console.log(res)
        }
      })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options){
     this.getShopCart();
  },
  getShopCart:function(){
      wx.request({
        url: 'http://127.0.0.1:3000/getcartlist',
        method:'get',
        success:(res)=>{
          for (var i = 0; i < res.data.length; i++) {
            res.data[i].isSelected = false;
          }
          this.setData({
            shoplist: res.data
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