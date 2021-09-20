// pages/pay/pay.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        goodsList: [],
        totalData: 0,
        uname: "李四",
        tel: "15172225222",
        addre: "长沙市岳麓区中南大学校本部五舍11号",

    },
    // 计算总价
    getTotal() {
        let goodslist = this.data.goodsList;
        console.log(this.data.goodsList);
        // 得到总价格
        // 因为进入把goodslist删除了，所以所以一下方法不用，需做判断
        if (goodslist) {
            let data = goodslist.reduce((total, item) => {
                return total + item.num * item.goodsPrice;
            }, 0);
            this.setData({
                totalData: data
            })
        }

    },
    // 点击支付
    goOrder() {
        wx.navigateTo({
            url: '/pages/order/order',
        })
        this.setOrderLists(2);
    },
    // 点击修改地址
    getAddress() {
        // let fromLists = wx.getStorageSync('fromLists');
        // console.log('fromLists',fromLists);
        wx.navigateTo({
            url: '/pages/address/address',
        })

    },
    // 点击获取地址
    goAddtre() {
        let _this = this;
        wx.chooseAddress({
            success(res) {
                let addtr = res.provinceName + res.cityName + res.countyName + res.detailInfo;
                _this.setData({
                    uname: res.userName,
                    tel: res.telNumber,
                    addre: addtr
                });
            }
        })

    },
    // 支付的状态类型
    setOrderLists(type) {
        // 没有数据时候不添加订单
        let goodsCarlistData = wx.getStorageSync("goodsCarlist");
        if (!goodsCarlistData) {
            return;
        }
        let orderData = {
            // 设置时间戳为订单号
            orderId: new Date().getTime(),
            orderLists: null,
            type, //1:待支付 2:待发货 3:待收货 4:待评价
            total: this.data.totalData
        };
        // 添加商品列表到订单中
        orderData.orderLists = this.data.goodsList;
        // 1.判断是否有订单
        let orderLists = wx.getStorageSync("orderLists");
        if (orderLists) {
            // 有订单添加订单
            orderLists.unshift(orderData);
            wx.setStorageSync('orderLists', orderLists);
        } else {
            // 没有订单
            wx.setStorageSync('orderLists', [orderData]);
        }
        // 清除购物车页面的数据
        wx.removeStorageSync("goodsCarlist");
    },
    // 更改地址
    setAddtr() {
        let fromLists = wx.getStorageSync('fromLists');
        let index = fromLists.findIndex(item => item.checked == true);
        this.setData({
            uname: fromLists[index].name,
            tel: fromLists[index].tel,
            addre: fromLists[index].addre
        });
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        this.setAddtr();
        console.log(this.data.uname);

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
        let getCartData = wx.getStorageSync('goodsCarlist');
        this.setData({
            goodsList: getCartData
        })
        this.getTotal();
        this.setAddtr();
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
        // 点击页面返回，也添加未付款的数据在我的订单中
        this.setOrderLists(1);

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