module.exports = function HTTP(objAll){
    
    return new Promise(function(resolve,reject){
        wx.request({
            header:{
                "content-type":"application/json" //默认值
            },
            ...objAll,
            success(res){  //成功返回
                resolve(res.data);
            },
            fail(err){  //失败返回
                reject(err);
            },
            complete(){ //接口调用结束的回调函数（调用成功、失败都会执行）

            }

        })
    })
}