/**
 * @author: zhangzhantong
 * @description Promise模式HTTP请求组件
 * 两种请求风格
 * 1: 传统方式 api, 通过使用POST请求API,参数和地址分开,参数放在body里面
 * 2. RESTFUL风格API,约束如下:
 * A. 通用：
 * a) 尽量使用 restful 风格 api，无法使用 restful 时使用传统方式 api
 * b) Content-Type 默认使用 application/json
 * c) pageSize：前端不传时默认 10
 * d) 一个接口返回的数据格式必须固定，不能在不同情况下返回不同格式的数据
 * B. 新增：
 * a) 接口设计应尽量简单，尽量避免多级数据同时新增
 * C. 编辑：
 * a) 接口设计应尽量简单，尽量避免批量更新多个数据的不同字段（同时更新多个实体的相 同字段是合理的）
 * b) 所有更新的字段必须显式传递（即便设置为空），不能不传
 * c) 前端传输数据应尽量只传后台接口所需字段
 * d) 对于自动生成的字段或其他关键字段，后台须根据情况进行处理，不能直接使用前端返回的值
 * D. 删除：
 * a) 默认只提供一个批量删除接口
 */

import axios from 'axios';
import Utils from './utils';
import API from '@/api';

/**
 * 发送HTTP请求
 *
 * @param {any} [opts={}] 选项
 * @returns {promise}
 */

const httpPromise = {
  // 1: 传统方式 api
  poster: function (opts = {}) {
    const {
      dataType = 'json',
      param = {},
      timeout = 30000,
      type = 'post',
      url,
      ...other
    } = opts;
    // 添加 token 到请求参数
    param.token = sessionStorage.token || sessionStorage.oldToken;
    // 过滤掉值为null的参数
    for (const i in param) {
      if (param[i] === null) delete param[i];
    }
    // 参数封装成 FormData
    const data = new FormData();
    for (let k in param) {
      data.append(k, param[k]);
    }
    return new Promise((resolve, reject) => {
      axios({
        url,
        method: type,
        data,
        timeout,
        responseType: dataType,
        ...other
      })
        .then(res => {
          const data = res.data;
          // 打印请求信息，方便调试
          const style =
            'background-color: #174040;color: #ffffff;padding: 5px;border-radius: 5px;';
          console.log('%c' + url, style);
          console.log('%c[Param]', style, param);
          console.log('%c[Response]', style, data);

          if (data.code === 0) {
            resolve(data);
          } else if (data.code === -1 || data.code === 6) {
            reject(new Error());
            Utils.alert('登录超时，请重新登录', '提示', {
              callback: action => {
                location.href = API.LOGIN;
                console.log(action);
              }
            });
          } else {
            reject(new Error());
            Utils.alert(data.message, '错误', {
              type: 'error'
            });
          }
        })
        .catch(e => {
          reject(e);
          Utils.alert('请求超时，请重试');
        });
    });
  },
  // restful 风格 api
  restful: function (opts = {}) {
    const {
      dataType = 'json',
      params = {},
      timeout = 30000,
      type = 'post',
      url,
      data = {},
      contentType,
      ...other
    } = opts;

    for (const i in params) {
      if (params[i] === undefined) {
        params[i] = null;
      }
    }

    for (const i in data) {
      if (data[i] === undefined) {
        data[i] = null;
      }
    }

    // post或put请求就把数据封装成formData
    const formData = new FormData();
    if (type === 'post' || type === 'put' || type === 'delete') {
      // 参数封装成 FormData
      for (let k in data) {
        formData.append(k, data[k]);
      }
    }

    return new Promise((resolve, reject) => {
      // token加在头部
      axios.defaults.headers.common['token'] = sessionStorage.token;
      axios.defaults.headers.common['Pragma'] = 'no-cache';
      if (contentType) {
        axios.defaults.headers.post['Content-Type'] = contentType;
      }
      axios({
        url,
        method: type,
        data: formData,
        params,
        timeout,
        responseType: dataType,
        ...other
      })
        .then(res => {
          const data = res.data;

          if (data.code === 0) {
            resolve(data);
          } else if (data.code === -1 || data.status === -1) {
            reject(new Error());
            Utils.alert('登录超时，请重新登录', '提示', {
              callback: action => {
                location.href = API.LOGIN;
                console.log(action);
              }
            });
          } else {
            reject(new Error());
            Utils.alert(data.message, '错误', {
              type: 'error'
            });
          }
        })
        .catch(e => {
          reject(e);
          Utils.alert('请求错误，请稍后重试');
        });
    });
  }
};

// 根据不同的项目来决定用那种风格
export default httpPromise.restful;
// export default httpPromise.restful
