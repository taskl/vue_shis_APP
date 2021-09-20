// pages/order/order.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        orderLists: null,
        index: 0  //全部显示
    },
    // 修改tabs下标
    setIndex(options) {
        let index = options.target.dataset.index;
        this.setData({
            index
        })
    },
      // 封装方法
      payedDelivery(num,options) {
        let orderLists = wx.getStorageSync('orderLists');
        // console.log('options',options);
        let id = options.currentTarget.dataset.id;
        let index = orderLists.findIndex(item => item.orderId == id);
        // console.log(index);
        orderLists[index].type = num;
        wx.setStorageSync('orderLists', orderLists)
        this.setData({
            index: num,
            orderLists
        })
    },
    // 点击支付
    goPayed(options) {
        this.payedDelivery(2,options);
    },
    // 点击发货
    goDelivery(options) {
        this.payedDelivery(3,options);
    },
    // 点击收货
    goGoods(options){
        this.payedDelivery(4,options);
    },
    // 点击评价
    goEvaluation(options){
        this.payedDelivery(0,options);
    },
  
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        // 接收个人中心navigator传递过来的状态
        this.setData({
            index: options.index
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
        console.log(12345);
        let orderLists = wx.getStorageSync('orderLists');
        this.setData({
            orderLists
        })
        console.log('orderLists', orderLists);
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
        // 控制小程序自带的返回按钮，返回指定的页面
        wx.reLaunch({
            url: '/pages/my/my',
        })
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