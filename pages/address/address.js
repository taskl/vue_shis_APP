// pages/address/address.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        list: [
            {
                "id": "1",
                "name": "李四",
                "tel": "13825518355",
                "addre": "XXXXXXXXXX",
                "checked": false,
            }
        ],
    },
    // 复选框的状态 
    checkboxChange(e) {
        let id = parseInt(e.detail.value[0]);
        let fromLists = wx.getStorageSync('fromLists');
        let index = fromLists.findIndex(item => item.id == id);
        // 排他思想
        fromLists.forEach((item) => {
            item.checked = false;
        })
        fromLists[index].checked = true;
        wx.setStorageSync('fromLists', fromLists)
        this.setData({
            list: fromLists
        });
        console.log("复选框的状态checked", fromLists[index].checked);

    },
    // 点击获取地址
    getAddress() {
        wx.navigateTo({
            url: '/pages/setaddress/setaddress',
        })
    },
    // 导入地址
    goAddress() {
        let fromLists = wx.getStorageSync('fromLists');
        let _this = this;
        wx.chooseAddress({
            success(res) {
                let addtr = res.provinceName + res.cityName + res.countyName + res.detailInfo;
                let choose = {
                    id: new Date().getTime(),
                    name: res.userName,
                    tel: res.telNumber,
                    addre: addtr,
                    checked: false,
                };
                console.log('choose', choose);
                fromLists.push(choose);
                wx.setStorageSync('fromLists', fromLists)
                _this.setData({
                    list: fromLists
                });
            }
        })

    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        let fromLists = wx.getStorageSync('fromLists');
        if (fromLists) {
            // fromLists.push(this.data.fromList)
            wx.setStorageSync('fromLists', fromLists)
            console.log('fromLists', fromLists);
        } else {
            wx.setStorageSync('fromLists', [])
        }
        // console.log('addtress', fromLists);
        this.setData({
            list: fromLists
        });
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
        let fromLists = wx.getStorageSync('fromLists');
        this.setData({
            list: fromLists
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