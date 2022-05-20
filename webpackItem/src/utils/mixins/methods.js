import axios from 'axios'
// 下载模板
const methods = {
    methods:{
        // 下载模板
        downLoadTemplate(tType){
            let params = {templateType:'measureData'}
            if(tType){
                params.templateType = tType
            }
            let accountName = JSON.parse(this.$cache.getUserAccount()).accountName || ''
            axios({
                url: this.$api.template.download,
                method: 'get',
                responseType: 'arraybuffer',
                headers:{
                    authorization: this.$cache.getToken() || '',
                    accessToken: this.$cache.getAccessToken() || '',
                    accountName: accountName
                },
                params,
            }).then(response => {
                // console.log(response)
                let blob = new Blob([response.data], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' })
                // let blob = new Blob([response.data], { type: 'application/vnd.ms-excel' });
                let typeTxt = this.getTypeTxt(tType)
                let name = typeTxt + '模板.xlsx'
                if (window.navigator && window.navigator.msSaveOrOpenBlob) {
                    window.navigator.msSaveOrOpenBlob(blob, name);
                } else {
                    let a = document.createElement('a');
                    let objectUrl = URL.createObjectURL(blob);
                    a.setAttribute('href', objectUrl);
                    a.setAttribute('download', name);
                    a.click();
                }
            }).catch(e => {
            })
        },
        // 模板标题
        getTypeTxt(type){
            switch(type){
                case 'measureData':
                    return '测量数据';
                case 'site':
                    return '工点';
                case 'basePoint':
                    return '基点';
                case 'measurePoint':
                    return '测点';
                case 'section':
                    return '断面';
                default:
                    return '数据';
            }
        }
    }
}

export default methods
