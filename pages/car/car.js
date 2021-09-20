// pages/car/car.js
var {  getHomeGoods } = require("../../api/Home.js");

Page({

    /**
     * 页面的初始数据
     */
    data: {
        totalData: 0,
        goodsList: [
            // {
            //     id: 1,
            //     goodsImage: "/images/lists01.webp",
            //     goodsName: "1商品名称",
            //     goodsAddress: "广州",
            //     goodsPrice: "200",
            //     num: 1,
            // },
            // {
            //     id: 2,
            //     goodsImage: "/images/lists02.webp",
            //     goodsName: "2商品名称",
            //     goodsAddress: "广州",
            //     goodsPrice: "200",
            //     num: 1,
            // },
        ],
        recomList:[
            {
                id:1,
                goodsImage:"/images/lists01.webp",
                goodsName:"1商品名称",
                goodsAddress:"广州",
                goodsPrice:"200"
            },
            {
                id:2,
                goodsImage:"/images/lists02.webp",
                goodsName:"2商品名称",
                goodsAddress:"广州",
                goodsPrice:"200"
            },
            {
                id:3,
                goodsImage:"/images/lists03.webp",
                goodsName:"2商品名称",
                goodsAddress:"广州",
                goodsPrice:"200"
            }
        ]
    },
    // 自定义方法
    // 跳转购物车页面
    goPay(){
        wx.navigateTo({
          url: '/pages/pay/pay',
        })
    },
    // 加法
    add(options) {
        // console.log(options);
        let index = options.target.dataset.id;
        let num = this.data.goodsList[index].num;
        let key = "goodsList[" + index + "].num"
        // 这是改变data中的值
        this.setData({
            [key]: num + 1
        });
        this.getTotal();

    },
    // 减法
    reduce(options) {
        console.log(options);
        let index = options.currentTarget.dataset.id;
        let num = this.data.goodsList[index].num;
        let key = "goodsList[" + index + "].num";
        num = num <= 1 ? 1 : num - 1;
        this.setData({
            [key]: num
        });
        this.getTotal();
    },
    // 删除
    del(options) {
        // console.log(options);
        // 外部获取不到goodsList，所以只能使用以下方法获取goodsList
        let index = options.currentTarget.dataset.id;
        console.log("这是this",this);
        this.data.goodsList.splice(index, 1);
        // this中数据删除后重新渲染视图
        // 这个方法可以设置data里面的数据
        this.setData({
            goodsList: this.data.goodsList
        });
        this.getTotal();
        console.log("长度",this.data.goodsList.length);
    },
    // 计算总价
    getTotal() {
        let goodslst = this.data.goodsList;
        // 得到总价格
        if(goodslst){
            let data = goodslst.reduce((total, item) => {
                return total + item.num * item.goodsPrice;
            }, 0);
            this.setData({
                totalData: data
            })
        }
        
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function () {
        // onLoad:页面加载时触发。一个页面只会调用一次. onShow: 页面显示/切入前台时触发。
        this.getTotal();

        getHomeGoods({ cid: 940 }).then(data => {
            console.log("分类数据", data);
            let paramx = data.message.goods
                let lists = [];
                paramx.forEach(item => {
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
                recomList: lists
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
        let getCartData = wx.getStorageSync('goodsCarlist');
        this.setData({
            goodsList: getCartData
        })
        this.getTotal();

    },

    /**
     * 生命周期函数--监听页面隐藏
     */
    onHide: function () {
        // 离开页面，更新数据缓存
        wx.setStorageSync("goodsCarlist", this.data.goodsList)
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