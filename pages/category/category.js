// pages/category/category.js
var { getCategories } = require("../../api/Home.js");
const App = getApp();//设立顶部栏高度
Page({

    /**
     * 页面的初始数据
     */
    data: {
        // scrollHeight:400,
        num: 0, //左侧按钮下标
        categoryItem: [
            "签到",
            "附近",
            "展会",
            "福利",
            "玩乐",
            "体育",
            "周边",
            "亲子",
        ],
        content: [
            [
                {
                    img: "/images/goods01.jpg",
                    name: "商品"
                },
                {
                    img: "/images/goods01.jpg",
                    name: "商品"
                },
            ],
            [
                {
                    img: "/images/goods02.jpg",
                    name: "商品"
                },
                {
                    img: "/images/goods02.jpg",
                    name: "商品"
                },
            ],
            [
                {
                    img: "/images/goods03.jpg",
                    name: "商品"
                },
                {
                    img: "/images/goods03.jpg",
                    name: "商品"
                },
            ],
        ]
    },
    // 自定义方法
    setIndex(options) {
        let index = options.target.dataset.id;
        this.setData({
            num: index
        })
    },
    godetails(options) {
        console.log('content',this.data.content);
    //     let id = options.currentTarget.dataset.id;
    //     wx.navigateTo({
    //         url: `/pages/list/list?id=${id}&texts=${this.data.texts}`,
    //     })
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
         //自定义头部方法
         this.setData({
            navH: App.globalData.navHeight
        });

        getCategories().then(data => {
            console.log("分类数据",data);
            // let catname = data.
            let lis = data.message
            let texts = [];
            let contents = [];
            lis.forEach((item, index) => {
                // console.log(item.cat_name);
                texts.push(item.cat_name);
                contents.push(item.children);

            })
            this.setData({
                categoryItem: texts,
                content: contents,
            })
            // console.log("content的内容",contents);
            // console.log("item的内容",this.data.content);
        })




        // 通过微信api接口获取信息
        // 这是获取微信视口的剩余高度
        // wx.getSystemInfo({
        //     success: (result) => {
        //         console.log(result.windowHeight);
        //         // 修改data里面数据
        //         // 调用this.setData();
        //         this.setData({
        //             scrollHeight: result.windowHeight
        //         })
        //     },
        // })
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
        // 因为经常切换路由，使用onshow
        this.setData({
            num: wx.getStorageSync("categoryIndex") || 0
        })
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