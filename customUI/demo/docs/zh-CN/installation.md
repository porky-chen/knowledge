## 安装

### npm 私服配置

1.地址：[仓库](http://192.168.0.80:8081/repository/npm-public/ )，该仓库已经整合了 npm 官方仓库及公司内部 npm-sun 仓库。

```shell
地址：http://192.168.0.80:8081/repository/npm-public/
```

2.先配置npm私服地址 再发布上传npm包

```shell
配置：npm config set registry http://192.168.0.80:8081/repository/npm-public/
```

### npm 账号登录

在上传之前，先要登录npm 账号

```shell
npm login --registry=http://192.168.0.80:8081/repository/npm-sun/
```

:::tip
输入用户名：sun，密码：nexus4sun，邮箱：webadmin@sunengineering.cn
:::


### npm 自动上传包文件

登录号账号之后，在命令行输入以下代码会自动打包并且上传 详情看package.json script中upload 效果等于npm run package 和 npm run deploy 两条命令

```shell
npm run upload
```


### npm包引用方式

目前可以通过 [仓库](http://192.168.0.80:8081/repository/npm-public/ ) 获取到最新版本的资源，命令行执行以下代码

```html
npm install SunrtUI -save
```

### npm包使用方式
在入口文件 src/main.js中添加以下代码

```html
import Su from '../src'
import i18n from 'sunrtui/src/utils/I18n'
import 'sunrtui/src/css/app.sass'
import 'sunrtui/dist/sunrtui.css'

Vue.use(ElementUI, {
  i18n: (key, value) => i18n.t(key, value)
});
Vue.use(Su)
```
