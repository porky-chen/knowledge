<template>
  <!-- 尾部组件 -->
  <footer class="footer">
    <div class="footer-container">
      <div class="container">
        <div class="footer-main">
          <h4>内部链接</h4>
          <a href="http://192.168.0.53/SunRTWeb/SunrtUI/" class="footer-main-link" target="_blank">代码仓库</a>
          <a href="http://192.168.0.53/SunRTWeb/SunrtUI/commits/dev" class="footer-main-link" target="_blank">更新日志</a>
          <a href="http://dev.sunrtnet.com:10002/login.jsp" class="footer-main-link" target="_blank">JiRa管理</a>
        </div>
        <div class="footer-main">
          <h4>函数库文档</h4>
          <a href="https://dayjs.fenxianglu.cn/" class="footer-main-link" target="_blank">Day.js</a>
          <a href="https://mikemcl.github.io/bignumber.js/" class="footer-main-link" target="_blank">Bignumber.js</a>
          <a href="https://ramda.cn/" class="footer-main-link" target="_blank">Ramda.js</a>
          <a href="https://www.lodashjs.com/" class="footer-main-link" target="_blank">Lodash.js</a>
          <a href="https://underscorejs.net/" class="footer-main-link" target="_blank">underscore.js</a>
        </div>
        <div class="footer-main">
          <h4>第三方组件</h4>
          <a href="https://regexr.com/" class="footer-main-link" target="_blank">正则表达式测试</a>
          <a href="https://bpmn.io/toolkit/bpmn-js/" class="footer-main-link" target="_blank">Bpmn流程绘图</a>
          <a href="https://github.com/hql7/tree-transfer" class="footer-main-link" target="_blank">tree-transfer树形穿梭框</a>
        </div>
        <div class="footer-social">
          <p class="footer-social-title">Sunrtui {{config.version}} Fullerene</p>
          <el-popover ref="weixin" placement="top" width="120" popper-class="footer-popover" trigger="hover">
            <div class="footer-popover-title"> UED</div>
            <img src="../assets/images/qrcode.png" alt="">
          </el-popover>
          <i class="doc-icon-weixin elementdoc" v-popover:weixin></i>
          <a href="https://github.com/elemefe" target="_blank">
            <i class="doc-icon-github elementdoc"></i>
          </a>
          <a :href="gitterLink" target="_blank">
            <i class="doc-icon-gitter elementdoc"></i>
          </a>
        </div>
      </div>
      <div class="Copyright">
        <el-row style="flex-direction:column;text-align:center" type="flex" justify="center" align='middle'>
          <el-col :span='24'>
            广东瀚阳轨道信息科技有限公司 Copyright © 2019 Guangdong Sun Railway Information Technology,Inc. All rights reserved.
          </el-col>
          <el-col :span='24'>
            粤ICP备12038171号-3
          </el-col>
        </el-row>
      </div>
    </div>
  </footer>
</template>

<style lang="scss">
.footer {
  background-color: #f7fbfd;
  width: 100%;
  padding: 40px 0 0;
  box-sizing: border-box;

  .footer-container {
    width: 1200px;
    margin: 0 auto;
  }

  .container {
    box-sizing: border-box;
    width: auto;
  }

  .footer-main {
    font-size: 0;
    display: inline-block;
    vertical-align: top;
    margin-right: 110px;

    h4 {
      font-size: 18px;
      color: #333;
      line-height: 1;
      margin: 0 0 15px 0;
    }

    .footer-main-link {
      display: block;
      margin: 0;
      line-height: 2;
      font-size: 14px;
      color: #666;

      &:hover {
        color: #333;
      }
    }
  }

  .footer-social {
    float: right;
    text-align: right;

    .footer-social-title {
      color: #666;
      font-size: 18px;
      line-height: 1;
      margin: 0 0 20px 0;
      padding: 0;
      font-weight: bold;
    }

    .elementdoc {
      transition: 0.3s;
      display: inline-block;
      line-height: 32px;
      text-align: center;
      color: #c8d6e8;
      background-color: transparent;
      size: 32px;
      font-size: 32px;
      vertical-align: middle;
      margin-right: 20px;
      &:hover {
        transform: scale(1.2);
        color: #8d99ab;
      }
    }

    .doc-icon-gitter {
      margin-right: 0;
    }
  }
}

.el-popover.footer-popover {
  padding: 0;
  min-width: 120px;
  line-height: normal;
  box-shadow: 0 0 11px 0 rgba(174, 187, 211, 0.24);

  .footer-popover-title {
    border-bottom: solid 1px #eaeefb;
    height: 30px;
    line-height: 30px;
    text-align: center;
    color: #99a9bf;
    background-color: #f8f9fe;
  }

  img {
    size: 100px;
    margin: 10px;
  }
}
@media (max-width: 1140px) {
  .footer {
    height: auto;
  }
}

@media (max-width: 1000px) {
  .footer-social {
    display: none;
  }
}

@media (max-width: 768px) {
  .footer {
    .footer-main {
      margin-bottom: 30px;
    }
  }
}

.Copyright {
  font-size: 13px;
  margin-top: 150px;
  padding-bottom: 20px;
}
</style>

<script type="text/babel">
import Element from 'element-ui'
const { version } = Element;
import config from '../../package.json'

export default {
  data () {
    return {
      version,
      config
    };
  },
  computed: {
    lang () {
      return this.$route.path.split('/')[1] || 'zh-CN';
    },


    gitterLink () {
      return this.lang === 'zh-CN' ? 'https://gitter.im/ElemeFE/element' : 'https://gitter.im/element-en/Lobby';
    }
  }
};
</script>
