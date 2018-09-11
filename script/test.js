var objects = new Array("data_photo/javascript/扫描_20160912090623.jpg");


var arrobject = new Array();
var arrbucket = new Array();
var pid = '3';
var aa = 0;
for(var i = 0;i<=objects.length-1;i++){

	var n = objects[i].split('/');
	// var n = objects[i].name.split('/');

	if (n[n.length-1]!=''&&n.length == pid) {
		//是object,并且是对应文件级数
		
		arrobject[aa][0] = objects[i];

		aa++;
		console.info(arrobject[aa][0]);

	}else{

	}
	//判断bucket和object

}
  
