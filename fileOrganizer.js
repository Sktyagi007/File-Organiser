// let input = process.argv;
// console.log(input);
// ['pathnode','pathtofile','input_pass']
// let input = process.argv[2];
// console.log(input);

let fs = require("fs");
let path = require("path");
let folderPath = process.argv[2];
// console.log(folderPath);

let folderExists = fs.existsSync(folderPath);

let extentions = {
    Video:[".mp4"],
    Music:["mp3"],
    Document:[".doc",".xlsx"],
    Image:[".jpeg",".png",".gif"],
    Software:[".apk"],
    Zipfile:[".rar",".zip"]
};

if(folderExists){
    let files = fs.readdirSync(folderPath);
    // console.log(files);
    for(let i=0; i<files.length;i++){
        let ext = path.extname(files[i]);
        let nameOfFolder = giveFolderName(ext);
        // console.log("Ext--",ext,"Folder--",nameOfFolder);
        let pathtOfFile = path.join(folderPath,nameOfFolder); 
        // console.log(pathtOfFile);
        let exist = fs.existsSync(pathtOfFile);
        if(exist){
            moveFile(folderPath,pathtOfFile,files[i]);
        }else{
            fs.mkdirSync(pathtOfFile);
            moveFile(folderPath,pathtOfFile,files[i]);
        }
    }
}
else{
    console.log("please enter a valid path")
}


function giveFolderName(ext){
    for(let key in extentions){
        let extArr = extentions[key];
        for(let i=0;i<extArr.length; i++){
            if(extArr[i] == ext){
                return key;
            }
        }
    }
    return "others";
}

function moveFile(folderPath,pathtOfFile,fileName){
    let sourcePath = path.join(folderPath,fileName);
    let destinationPath = path.join(pathtOfFile,fileName);
    fs.copyFileSync(sourcePath,destinationPath);
    fs.unlinkSync(sourcePath);
}
