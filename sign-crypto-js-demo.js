/**
 * 签名算法
 * 1、对请求参数名按照ASCII正序排序
 * 2、排序后拼接成字符串：key1 + value1 + key2 +value2 + ... 如果为null不拼接，为true/false转成1/0，如果为字典/数组，对内部拼接完在外部一起拼接
 * 3、对2得到的字符串MD5（大写），然后拼接 密钥
 * 4、对3得到的字符串MD5（大写）
 * 
 * 
 * 签名加密
 *
 * 以MD5为主要
 * import 'md5.js'
 * import 'core.js'
 */
// 

// CryptoJS.MD5(signStr)



function getEncryptParams(params) {
	// params 遍历，属性给空则不传
	params = fillterParams(params);
	// 获取时间戳
	let timestamp = Math.round(new Date().getTime()).toString();
	// 通过required.data获取body的内容
	params = Object.assign({},params,{sn:timestamp}) //重定义参数对象		

	let appSecret = 'xxxxxxgrondlkjonxxxxxx';
	let signStr = sign(params, appSecret)
	let result = params = Object.assign({},params,{ _sign: signStr,app_id:'21016' });
	let formData = new FormData()
	for(let key of result){
		formData.append(key,result[key])
	}
	return result
}

// 生成签名方法
function sign(data, appSecret){
	const SORT_STRING;
	let signData = ksort(data, "");
	if(typeof data.sign !== 'undefined' && data.sign !== null){
		delete signData.sign;
	}
	let signStr = createLinkstring(signData);
	let md5 = CryptoJS.MD5(signStr).toString();
	let signs = CryptoJS.MD5(m5.toUpperCase() + appSecret).toString().toUpperCase();
	return signs;
}

// 无效参数过滤
function fillterParams(obj) {
	let _newPar = {};
	for(let key of obj){
		// 判断属性值为0、不存在、空格字符串都属于空
		if(obj[key] === 0 || obj[key] && obj[key].toString().replace(/(^\s+)|(\s+$)/g,'') !== ''){
			_newPar[key] = obj[key]
		}
	}
	return _newPar
}





// =========================================================================
    const CryptoJS = require('crypto-js');  //引用AES源码js
    
    // 接口返回值
    const key = CryptoJS.enc.Utf8.parse("1234123412ABCDEF");  //十六位十六进制数作为密钥
    const iv = CryptoJS.enc.Utf8.parse('ABCDEF1234123412');   //十六位十六进制数作为密钥偏移量
    
    //解密方法
    function Decrypt(word) {
        let encryptedHexStr = CryptoJS.enc.Hex.parse(word);
        let srcs = CryptoJS.enc.Base64.stringify(encryptedHexStr);
        let decrypt = CryptoJS.AES.decrypt(srcs, key, { iv: iv, mode: CryptoJS.mode.CBC, padding: CryptoJS.pad.Pkcs7 });
        let decryptedStr = decrypt.toString(CryptoJS.enc.Utf8);
        return decryptedStr.toString();
    }
    
    //加密方法
    function Encrypt(word) {
        let srcs = CryptoJS.enc.Utf8.parse(word);
        let encrypted = CryptoJS.AES.encrypt(srcs, key, { iv: iv, mode: CryptoJS.mode.CBC, padding: CryptoJS.pad.Pkcs7 });
        return encrypted.ciphertext.toString().toUpperCase();
    }
    
    export default {
        Decrypt ,
        Encrypt
    }




// ============================Node,js + crypto-js
var CryptoJS = require("crypto-js");
var key ="aaaabbbbccccddddeeeeffffgggghhhh";
var iv = "1234567812345678";

function encrypt(text){
    return CryptoJS.AES.encrypt(text,CryptoJS.enc.Utf8.parse(key),{
        iv:CryptoJS.enc.Utf8.parse(iv),
        mode:CryptoJS.mode.CBC,
        padding:CryptoJS.pad.Pkcs7
    })
}

function decrypt(text){
    var result = CryptoJS.AES.decrypt(text,CryptoJS.enc.Utf8.parse(key),{
        iv:CryptoJS.enc.Utf8.parse(iv),
        mode:CryptoJS.mode.CBC,
        padding:CryptoJS.pad.Pkcs7
    })
    return result.toString(CryptoJS.enc.Utf8)
}

var text="ni你好hao";
var encoded=encrypt(text)
console.log(encoded.toString());
console.log(decrypt(encoded))

/**
 * 
 * 现在aes的参数都变成可配置的，接下来验证一下之前对AES的理解。
	改变IV的长度，发现当IV大于16字节的时候，不管16字节之后的是什么，都不影响加密结果，应该是种自动截取机制(nodejs原生库IV不是16字节，就会报错）
	改变IV的长度，当IV小于16字节，还可以成功加密，可能是自动补齐机制
	加密IV和解密IV不同的时候，并不影响解密是否成功，但是解密的结果有差别，比如将解密的IV变成1234567813345678，则解密结果变为ni你好h`o
	修改padding，加密解密的padding换成NoPadding，发现解密之后生成utf8字符串出错
	经过多次尝试，加密为Pkcs7和ZeroPadding时，加密后的字符串变化显著，这时解密用任何padding模式，都可以成功解密。

	ni你好hao，经过Pkcs7后，输出为
			WfH4hzIc3dc0pjxa9V/RgQ==
	nopadding后，输出为
			OtSNypfx1SF6C2E=
	zeropadding后，输出为
			OtSNypfx1SF6C2GfyXMidA==

	Pkcs7的结果和其他结果相差很大，很难相信其padding是补充最后一块
	有趣的是Pkcs7的结果和zeropadding的结果通过同样的解密设置，能解出同样的字符串ni你好hao

	总结
		AES加密解密的秘钥有一对，一个是IV一个是KEY，并且他们的长度都有严格要求。
		Padding的作用似乎不只是补齐最后，如果自己什么都对，但是加密失败，可以尝试不同Padding
 * /


登录总结，
loginInfo:'用户信息对象集合的加密字符串'
接收浏览器信息例如：
carrier:"Chrome/96.0.4664.110",
loginInfo:'加密集合'
osVersion:"win10 64位"操作系统版本
terminal:'Chrome' 浏览器名称

navigator可以获取浏览器信息

/* 获取浏览器信息，浏览器 */
function getExplore(){
 var Sys = {};  
 var ua = navigator.userAgent.toLowerCase();  
 var s;  
 (s = ua.match(/rv:([\d.]+)\) like gecko/)) ? Sys.ie = s[1] :
 (s = ua.match(/msie ([\d\.]+)/)) ? Sys.ie = s[1] :  
 (s = ua.match(/edge\/([\d\.]+)/)) ? Sys.edge = s[1] :
 (s = ua.match(/firefox\/([\d\.]+)/)) ? Sys.firefox = s[1] :  
 (s = ua.match(/(?:opera|opr).([\d\.]+)/)) ? Sys.opera = s[1] :  
 (s = ua.match(/chrome\/([\d\.]+)/)) ? Sys.chrome = s[1] :  
 (s = ua.match(/version\/([\d\.]+).*safari/)) ? Sys.safari = s[1] : 0;  
  // 根据关系进行判断
 if (Sys.ie) return ('IE: ' + Sys.ie);  
 if (Sys.edge) return ('EDGE: ' + Sys.edge);
 if (Sys.firefox) return ('Firefox: ' + Sys.firefox);  
 if (Sys.chrome) return ('Chrome: ' + Sys.chrome);  
 if (Sys.opera) return ('Opera: ' + Sys.opera);  
 if (Sys.safari) return ('Safari: ' + Sys.safari);
 return 'Unkonwn';
}

/* 获取浏览器信息，浏览器名称 */
function getExploreName(){
   var userAgent = navigator.userAgent;
   if(userAgent.indexOf("Opera") > -1 || userAgent.indexOf("OPR") > -1){
     return 'Opera';
   }
   else if(userAgent.indexOf("compatible") > -1 && userAgent.indexOf("MSIE") > -1){
     return 'IE';
   }
   else if(userAgent.indexOf("Edge") > -1){
      return 'Edge';
   }
   else if(userAgent.indexOf("Firefox") > -1){
      return 'Firefox';
   }
   else if(userAgent.indexOf("Safari") > -1 && userAgent.indexOf("Chrome") == -1){
     return 'Safari';
   }
   else if(userAgent.indexOf("Chrome") > -1 && userAgent.indexOf("Safari") > -1){
      return 'Chrome';
   }
   else if(!!window.ActiveXObject || "ActiveXObject" in window){
      return 'IE>=11';
   }
   else{
    return 'Unkonwn';
   }
}

