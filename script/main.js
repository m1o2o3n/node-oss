'use strict';
var urllib = OSS.urllib;
var Buffer = OSS.Buffer;
var OSS = OSS.Wrapper;
var STS = OSS.STS;
var client = new OSS({
    region: 'oss-cn-beijing',
    accessKeyId: 'LTAIC76SG3LvIDTu',
    accessKeySecret: 'yAnmnQjjzG0M40XzhFjmJf1iUPLB2l',
    bucket: 'm1o2o3n'
});
//全局初始化
var applyTokenDo = function (func) {
    return func(client);
};

var listFiles = function (client) {
    var list_name = document.getElementById("head_name").value;
    return client.list({
        "max-keys":100,"prefix":list_name
        // prefix 指定只列出符合特定前缀的文件
        // marker 指定只列出文件名大于marker之后的文件
        // delimiter 用于获取文件的公共前缀
        // max-keys 用于指定最多返回的文件个数
    }).then(function (result) {
        var objects = result.objects;
        console.info("获取完毕");
        //获取完毕
        var main = document.getElementById("main");
        for (var i = 0; i< objects.length; i++){
            //没有进行名称切割
            main.insertAdjacentHTML("beforeEnd",'<h1>'+objects[i].name+'<small>'+ objects[i].size +'</small>'+'</h1>')
        }
    })
}

var listBucket = function (client) {
    return client.listBuckets({
    }).then(function () {
        console.log("获取成功");
    });

}


var uploadFile = function (client) {
    var checkpoint;
    var file = document.getElementById("upload_file_name");//获取文件
    if (file.value==""){
        alert("没有文件");
    }else{
        file = file.files[0];
        var key = file.name;
        console.info(key);
        return client.multipartUpload(key,file,{
            progress:function * (percentage , cpt){
                //progress进行事件，percentage是进度函数（固定时间获取传输状态），cpt是状态参数
                checkpoint = cpt;
                console.info(percentage);
            }
        }).then(function (res) {
            console.info("上传完成: %j",res);
        });
    }
}

