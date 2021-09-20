// pages/details/details.js
var { getGoodsDetail } = require("../../api/Home.js");

Page({

    /**
     * 页面的初始数据
     */
    data: {
        flag: true,
        words: "未收藏",
        mycolle: [],
        index: null,
        goods: {
            id: 10,
            goodsImage: "/images/lists01.webp",
            goodsName: "2商品名称",
            goodsImgs: [
                "/images/banner01.jpg",
                "/images/banner02.jpg",
                "/images/banner03.jpg",
                "/images/banner04.jpg",
            ],
            goodsAddress: "广州",
            goodsPrice: "200",
            goodsPriceOld: "300",
            goodsDetails: "/images/IMG_0466.JPG"
        },
        //购物车商品数量
        sum: 0,
    },
    getDetails() {
        let goodsDetail = wx.getStorageSync('goodsDetail');
        let goodslis = {
            collect: false,
            id: this.data.goods.id,
            goodsImage: this.data.goods.goodsImage,
            goodsName: this.data.goods.goodsName,
            goodsImgs: this.data.goods.goodsImgs,
            goodsAddress: this.data.goods.goodsAddress,
            goodsPrice: this.data.goods.goodsPrice,
            goodsPriceOld: this.data.goods.goodsPricee + 100,
            goodsDetails: this.data.goods.goodsDetails
        }
        goodsDetail.push(goodslis);
        wx.setStorageSync('goodsDetail', goodsDetail);
        console.log('goodslis', goodslis);
        console.log('goodsDetail', goodsDetail);
    },
    // 收藏
    collect(options) {
        let flag = !this.data.flag;
        let goodsDetail = wx.getStorageSync('goodsDetail');

        let words = flag ? "未收藏" : "已收藏";
        // 设置收藏的状态
        wx.setStorageSync("flag", flag);
        wx.setStorageSync("word", words);
        let flags = wx.getStorageSync('flag');
        let word = wx.getStorageSync('word');
        this.setData({
            flag: flags,
            words: word
        });

        let id = options.currentTarget.dataset.id;
        if (flag) {
            // goodsDetail.pop();
            goodsDetail.splice(this.data.index,1)
            wx.setStorageSync("goodsDetail", goodsDetail);

        } else {
            this.getDetails();

        }

    },
    goCart() {
        // 跳转到 tabBar 页面，并关闭其他所有非 tabBar 页面   
        wx.switchTab({
            url: '/pages/car/car',
        })
    },
    goHome() {
        wx.switchTab({
            url: '/pages/home/home',
        })
    },
    setPay() {
        // 不加入购物车，直接支付
        wx.navigateTo({
            url: '/pages/pay/pay',
        });
        this.setCart();

    },
    setCart() {
        // console.log("这是购物车");
        // 购物车数据结构
        let carList = {
            id: this.data.goods.id,
            goodsImage: this.data.goods.goodsImage,
            goodsName: this.data.goods.goodsName,
            goodsPrice: this.data.goods.goodsPrice,
            num: 1,
        };
        // 数据添加数据缓存中
        // 1.判断数据缓存中是否有数据
        let goodscarList = wx.getStorageSync('goodsCarlist');
        // 2.有数据
        if (goodscarList) {
            // 2.1有相同数据，数据加一
            let index = goodscarList.findIndex(item => item.id == this.data.goods.id);
            console.log(index);
            if (index != -1) {
                console.log("这是购物车");

                //有相同数据
                goodscarList[index].num += 1;
            }
            else {
                // 2.2有数据没有相同数据,添加数据
                goodscarList.push(carList);
            }
            wx.setStorageSync("goodsCarlist", goodscarList);
        }
        else {
            // 3.没有数据 添加数据
            wx.setStorageSync("goodsCarlist", [carList]);
        }
        // 设置加载到购物车的不同产品的数量
        this.setData({
            sum: wx.getStorageSync('goodsCarlist').length
        });

    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        // 设置收藏数据
        // 获取传递过来的id
        let id = options.id;
        let _this = this;
        let goodsDetail = wx.getStorageSync('goodsDetail');
        console.log("传递过来的id", id);
        // console.log("goodsDetail", goodsDetail);
        // 判断收藏的数据
        if (goodsDetail) {
            let index = goodsDetail.findIndex(item => item.id == id);
            if (index != -1) {
                let goodslis = {
                    collect: false,
                    id: goodsDetail[index].id,
                    goodsImage: goodsDetail[index].goodsImage,
                    goodsName: goodsDetail[index].goodsName,
                    goodsImgs: goodsDetail[index].goodsImgs,
                    goodsAddress: goodsDetail[index].goodsAddress,
                    goodsPrice: goodsDetail[index].goodsPrice,
                    goodsPriceOld: goodsDetail[index].goodsPricee + 100,
                    goodsDetails: goodsDetail[index].goodsDetails
                }
                _this.setData({
                    goods: goodslis,
                    index: index,
                    flag: goodslis.collect
                })
            }

        } else {
            wx.setStorageSync('goodsDetail', []);
        }
        getGoodsDetail({ "goods_id": id }).then((data) => {
            console.log("这是获取到的详情的数据", data.message);
            let { goods_id, goods_name, goods_small_logo, pics, goods_price, goods_introduce } = data.message;
            let goods = {
                collect: true,
                id: goods_id,
                goodsImage: goods_small_logo,
                goodsName: goods_name,
                goodsImgs: pics,
                goodsAddress: "广州",
                goodsPrice: goods_price,
                goodsPriceOld: goods_price + 100,
                goodsDetails: goods_introduce
            }
            _this.setData({
                goods
            })
            console.log("goodsDetail的数据", goodsDetail);
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
        // 设置加载到购物车的不同产品的数量
        this.setData({
            sum: wx.getStorageSync('goodsCarlist').length
        });
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