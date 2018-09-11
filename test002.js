var co = require('co');
var oss = require('ali-oss');

var client = new oss({
    region: 'oss-cn-beijing',
    accessKeyId: 'LTAIC76SG3LvIDTu',
    accessKeySecret: 'yAnmnQjjzG0M40XzhFjmJf1iUPLB2l',
    bucket: 'm1o2o3n'
});

// co(function* () {
//     var result = yield client.listBuckets();
//     for (i = 0 ; i <= result.buckets.length-1; i++) {
//         console.log(JSON.stringify(result.buckets[i].name));
//     }
// }).catch(function (err) {
//     console.log(err);
// });
//列出bucket
// co(function* () {
//     var result = yield client.putBucket("moonnoom19");
//     console.log(result);
// }).catch(function (err) {
//     console.log(err)
// })
//创建bucket
// co(function* () {
//     var result = yield client.deleteBucket("moonnoom19");
//     console.log(result);
// }).catch(function (err) {
//     console.log(err)
// })


function listDir(dir) {
    var result = yield client.list({
        prefix: dir,
        delimiter: '/'
    });
    result.prefixes.forEach(function (subDir) {
        console.log('SubDir: %s', subDir);
    });
    result.objects.forEach(function (obj) {
        console.log('Object: %s', obj.name);
    });
}
