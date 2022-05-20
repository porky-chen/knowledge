# SunrtUI

瀚阳轨道科技的前端通用组件库，基于element ui 二次封装

## 安装方式

npm install SunrtUI -save

## 运行demo

git clone http://192.168.0.53/SunRTWeb/SunrtUI.git

npm install / yarn

npm run serve

## 开发分支 : dev

## 文件目录说明

###########目录结构描述
├── Readme.md                   // help   
├── src                         // 组件代码src   
   ├── index.js                // 组件入口    
   ├── assets                  // 资源文件夹 如果组件没有其对应的文件夹 资源放这个文件夹下    
   ├── lang                    // 国际化js存放文件夹    
        ├── en.js              // 英文js  
        └── zh.js              // 中文js   
   ├── utils                   // 通用工具类文件夹    
   ├── index.js                // 组件入口  
   ├── assets  
   ├── components              // 组件代码文件夹  组件的代码放这个文件夹下   
   ├── css                     // 组件样式文件夹  组件的样式文件放这个文件夹下   
        ├── color-variable-1.0 // 1.0版本启用的新的颜色变量    
├── .gitignore
├── vue.config.js          
├── .eslintrc.js         
├── node_modules  
├── package.json  
├── public                      // web静态资源加载  
    └── indexhtml    

## 上传私服
npm run package
npm run deploy









