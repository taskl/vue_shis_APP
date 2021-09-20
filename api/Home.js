const HTTP = require("./request.js");

module.exports = {

    "getHomeBanner":function(){
        return HTTP({
            // method:"post",
            // data:{},
            url:"https://api-hmugo-web.itheima.net/api/public/v1/home/swiperdata",
        })
    },
    "getHomeGoods":function(data){
        return HTTP({
            url:"https://api-hmugo-web.itheima.net/api/public/v1/goods/search",
            data
        })
    },
    "getGoodsDetail":function(data){
        return HTTP({
            url:"https://api-hmugo-web.itheima.net/api/public/v1/goods/detail",
            data
        })
    },
    "getCategories":function(data){
        return HTTP({
            url:"https://api-hmugo-web.itheima.net/api/public/v1/categories",
            data
        })
    },
    "getQsearch":function(data){
        return HTTP({
            url:"https://api-hmugo-web.itheima.net/api/public/v1/goods/search",
            data
        })
    }


}