const readline = require('readline');
const fs = require('fs');
const path = require('path')


console.log(process.argv);

const puttype = process.argv[2]

let i = 1; //txt中的行数


const targetdir = path.resolve(__dirname,puttype === 'input' ? './langfile' : './src/lang')
const outputdir = path.resolve(__dirname,puttype === 'input' ? './src/lang' : './langfile')


async function ergodicFiles(path) {
  const fileList = []
  const dir = await fs.promises.opendir(path);
  for await (const dirent of dir) {
    fileList.push(dirent.name)
  }
  return fileList
}


async function getFile(){
  const filelist = await ergodicFiles(targetdir)
  if(puttype === 'input') {
    createInputFileReader(filelist) //生成i8njs  的文件读取
  } else {
    createOutputFileReader(filelist) //生成txt模板  的文件读取
  }
}



function createOutputFileReader (filelist){//生成txt模板  的文件读取
  if(filelist.length === 0)return
  const files = [...filelist]
  const filequanty = files.length

  console.log(files)

  files.forEach(obj => {

    const filetype = obj.split('.')[0]

    const data = fs.readFileSync(`${targetdir}/${filetype}.js`, 'utf-8')

    const dataJson = JSON.parse(data.replace('export default ',''))
  
    const txtJSON =  deconstruct(dataJson)
  
  
    let file = `${outputdir}/${filetype}.txt`
  
    
    let jsonStr = ''
    txtJSON.forEach(elm => {
      jsonStr = `${jsonStr}${elm}\n`
    })
  
    fs.writeFile(file, jsonStr, { encoding: 'utf8' }, err => {//写入文件
      console.log(err)
    })
  })



}

function deconstruct(json){// 生成输出数组
  const datas = Object.entries(json)
  const txtArray = []

  datas.forEach(elm => {
    if(typeof elm[1] === 'string') {
      txtArray.push(`${elm[0]}=${elm[1]}`)
    } else {
      const second = Object.entries(elm[1])
      second.forEach(res => {
        txtArray.push(`${elm[0]}.${res[0]}=${res[1]}`)
      })
    }
    txtArray.push('')
  })
  return txtArray
};

const zhjson = []

function createInputFileReader (filelist,jsonlist = [],filenamelist=[]){//生成i8njs  的文件读取
  
  

  if(filelist.length === 0){
    console.log(jsonlist,filenamelist)
    console.log(zhjson)

    jsonlist.forEach((elm,index) => {
      const json = {...zhjson,...elm}
      
      const jsonStr = `export default ${JSON.stringify(json, null, 4)}`
      
      fs.writeFile(filenamelist[index], jsonStr, { encoding: 'utf8' }, err => {//写入文件
        console.log(err)
      })
      console.log(json)
    })
    

    return
  }
  const files = [...filelist]

  const langJson = {} 
  
  const jsons = [...jsonlist]
  const filenames = [...filenamelist]


  const r1 = readline.createInterface({
    input: fs.createReadStream(`${targetdir}/${filelist[0]}`)
  });
  r1.on('line', function(line){ //事件监听 读取每行
      const str = line
      if(str&&str.length > 0) {
        const lineArr = str.split('=')
        const keyArr = lineArr[0].split('.')
        const val = lineArr[1]
        
        
        if(!langJson[keyArr[0]]) {
          langJson[keyArr[0]] = {}
          if(filelist[0].split('.')[0] === 'zh'){
            zhjson[keyArr[0]] = {}
          }
        }
        langJson[keyArr[0]][keyArr[1]] = val
        if(filelist[0].split('.')[0] === 'zh'){
          zhjson[keyArr[0]][keyArr[1]] = val
        }
        
  
      }
  　　i+=1;
  })
  
  r1.on('close', function(){ //事件监听 读取文件结束
    console.log('success')
    let file = `${outputdir}${'/'}${filelist[0].split('.')[0]}.js`
    
    files.shift()

    jsons.push(langJson)
    filenames.push(file)

    createInputFileReader(files,jsons,filenames)

   
    
  })
}



getFile()

