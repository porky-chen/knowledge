/**
 * @author: czh
 * @description 接口配置
 *
 * Changelog:
 * Revision 1.0 2021/11/19 czh
 */

// 服务器名或IP
const API = 'http://localhost:5000/'

export default {
    upload: API + 'upload',
    all: API + 'user/all',
    getFiles: API + 'files',
    login: API + 'user/login',
    register: API + 'user/register',
    viewFile:API + 'view/'
}
