// pages/home/home.js
var { getHomeBanner, getHomeGoods, getCategories } = require("../../api/Home");
const App = getApp();//设立顶部栏高度

Page({

    /**
     * 页面的初始数据
     */
    data: {
        imgs: [
            "/images/banner01.jpg",
            "/images/banner02.jpg",
            "/images/banner03.jpg",
            "/images/banner04.jpg",
        ],
        iconCate: [],
        iconArray: [
            {
                url: "/images/icon-qiandao.png",
                text: "签到",
            },
            {
                url: "/images/icon-fujin.png",
                text: "附近",
            },
            {
                url: "/images/icon-zhanhui.png",
                text: "展会",
            },
            {
                url: "/images/icon-fuli.png",
                text: "福利",
            },
            {
                url: "/images/icon-muma.png",
                text: "玩乐",
            },
            {
                url: "/images/icon-tiyu.png",
                text: "体育",
            },
            {
                url: "/images/icon-xingxing.png",
                text: "周边",
            },
            {
                url: "/images/icon-qinzi.png",
                text: "亲子",
            },
        ],
        goodsList: [
            {
                id: 1,
                goodsImage: "/images/lists01.webp",
                goodsName: "1商品名称",
                goodsAddress: "广州",
                goodsPrice: "200"
            },
            {
                id: 2,
                goodsImage: "/images/lists02.webp",
                goodsName: "2商品名称",
                goodsAddress: "广州",
                goodsPrice: "200"
            },
            {
                id: 3,
                goodsImage: "/images/lists03.webp",
                goodsName: "2商品名称",
                goodsAddress: "广州",
                goodsPrice: "200"
            }
        ],

    },
    goCategory(options) {
        let index = options.currentTarget.dataset.index;
        // 向数据缓存中存储数据,因为wx.switchTab tabbar中方法无法传参
        wx.setStorageSync('categoryIndex', index);
        wx.switchTab({
            url: '/pages/category/category',
        })
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        //自定义头部方法
        this.setData({
            navH: App.globalData.navHeight
        });

        
        wx.setNavigationBarColor({
            frontColor: '#ffffff',
            backgroundColor: '#000000',
        })

        // console.log(this);
        // 点击分类
        getCategories().then(data => {
            console.log("分类数据", data);
            let lis = data.message
            let texts = [];
            lis.forEach((item, index) => {
                // console.log(item.cat_name);
                texts.push(item.cat_name);
                if (this.data.iconArray.length < lis.length) {
                    this.data.iconArray.push(this.data.iconArray[index])
                }
            })
            // console.log(texts);
            this.setData({
                iconCate: texts
            })
            this.setData({
                iconArray: this.data.iconArray
            })
        }
        );
        // 获取轮播图的数据
        getHomeBanner().then((data) => {
            // console.log("轮播图",data);
            this.setData({
                imgs: data.message
            })
        });
        // 获取购物数据
        getHomeGoods({ cid: 926}).then((data) => {
            console.log("购物数据", data);
            let lists = [];
            let goodslists = data.message.goods;
            goodslists.forEach(item => {
                let { goods_id, goods_name, goods_small_logo, goods_price } = item;
                let data = {
                    id: goods_id,
                    goodsImage: goods_small_logo,
                    goodsName: goods_name,
                    goodsAddress: "广州",
                    goodsPrice: goods_price
                };
                if (goods_small_logo) {
                    lists.push(data);
                }
            })
            this.setData({
                goodsList: lists
            })
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