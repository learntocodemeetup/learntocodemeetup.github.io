fs = require('fs');
var consoleString = 0;
var stringsIn = "";
var listVideos = "";
var listPaths = "";
var node = "";
var last3 = "";
var currentPath = "";
var count = 0;

var output = "";
fs.readFile(process.argv[2],function(err, data){
    if(err){
    console.log('Error: ' + err);
    } else {
    stringsIn = data.toString().split('\n');
    for(var i = 0; i < stringsIn.length; i ++){
        for(var j = 0; j < stringsIn[i].length; j ++){
            
            if(stringsIn[i][j] == '\\'){
                node = "";
            } else if (stringsIn[i][j] == '.') {
                last3 = stringsIn[i][j+1] + stringsIn[i][j+2] + stringsIn[i][j+3];
                if(last3 == "mpg" || last3 == "avi" || last3 == "mkv" || last3 == "mov"){
                listVideos += node+"."+last3+'\r\n';
                listPaths += stringsIn[i] + '\r\n';
                count++;
                }                
                node = "";
            } else {
                node += stringsIn[i][j];
            }
        }    
    }
    output = listVideos + '\r\n' + listPaths;
    fs.writeFile("VideoList.txt", output , function(err){
        console.log('Count: ' + count);
        if(err){
            console.log('Error writing output: ' + err);
        }
    });
    }
});