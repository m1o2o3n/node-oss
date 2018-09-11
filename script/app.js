'use strict';

var appServer = 'aliyuncs.com';
var bucket = 'm1o2o3n';
var region = 'oss-cn-beijing';

var urllib = OSS.urllib;
var Buffer = OSS.Buffer;
var OSS = OSS.Wrapper;
var STS = OSS.STS;

// Play without STS. NOT SAFE! Because access key id/secret are
// exposed in web page.

var client = new OSS({
  region: 'oss-cn-beijing',
  accessKeyId: 'LTAIC76SG3LvIDTu',
  accessKeySecret: 'yAnmnQjjzG0M40XzhFjmJf1iUPLB2l',
  bucket: 'm1o2o3n'
});

var applyTokenDo = function (func) {
  return func(client);
};

// var applyTokenDo = function (func) {
//   var url = appServer;
//   return urllib.request(url, {
//     method: 'GET'
//   }).then(function (result) {
//     var creds = JSON.parse(result.data);
//     var client = new OSS({
//       region: region,
//       accessKeyId: creds.AccessKeyId,
//       accessKeySecret: creds.AccessKeySecret,
//       stsToken: creds.SecurityToken,
//       bucket: bucket
//     });
//     return func(client);
//   });
// };

var progress = function (p) {
  return function (done) {
    var bar = document.getElementById('progress-bar');
    bar.style.width = Math.floor(p * 100) + '%';
    bar.innerHTML = Math.floor(p * 100) + '%';
    done();
  }
};

var uploadFile = function (client) {
  var file = document.getElementById('file').files[0];
  var key = document.getElementById('object-key-file').value.trim() || 'object';
  console.log(file.name + ' => ' + key);

  return client.multipartUpload(key, file, {
    progress: progress
  }).then(function (res) {
    console.log('upload success: %j', res);
    return listFiles(client);
  });
};

var uploadContent = function (client) {
  var content = document.getElementById('file-content').value.trim();
  var key = document.getElementById('object-key-content').value.trim() || 'object';
  console.log('content => ' + key);

  return client.put(key, new Buffer(content)).then(function (res) {
    return listFiles(client);
  });
};

var listFiles = function (client) {
  console.log('list files');
  return client.list({
    'max-keys': 100
  }).then(function (result) {
    var objects = result.objects;
    //数据获取完毕
    objects.sort(function (a, b) {
      var ta = new Date(a.name);
      var tb = new Date(b.name);
      if (ta > tb) return -1;
      if (ta < tb) return 1;
      return 0;
    });
	var index_header = document.getElementById('index_header');
    for (var i = 0; i < objects.length; i ++) {
      index_header.insertAdjacentHTML("beforeEnd",'<div class="aui-card-list-header">'+objects[i].name+'</div>');
    }
    //排序完毕
  });
};

var downloadFile = function (client) {
  var object = document.getElementById('dl-object-key').value.trim();
  var filename = document.getElementById('dl-file-name').value.trim();
  console.log(object + ' => ' + filename);

  var result = client.signatureUrl(object, {
    response: {
      'content-disposition': 'attachment; filename="' + filename + '"'
    }
  });
  window.location = result;

  return result;
};

// window.onload = function () {
// document.getElementById('file-button').onclick = function () {
//     applyTokenDo(uploadFile);
// }
//
// document.getElementById('content-button').onclick = function () {
//     applyTokenDo(uploadContent);
// }
//
// document.getElementById('list-files-button').onclick = function () {
//     applyTokenDo(listFiles);
// }
//
// document.getElementById('dl-button').onclick = function () {
//     applyTokenDo(downloadFile);
// }
//
// //applyTokenDo(listFiles);
// };
