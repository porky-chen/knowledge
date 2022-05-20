<!--
- Copyright (c) 2021 Guangdong Sun Railway Information Technology, Inc.
- All rights reserved.
-
- @author wenteng
-
- Description:
-
- Changelog:
-
- Revision:
-->

<template>
  <div class='su-label-view'
       :class='{
         "su-left-placement" : labelPlacement === "left",
         "su-top-start-placement" : labelPlacement === "top-start",
         "su-error-view" : error
       }'
  >
    <div class='label-view'
         v-if='labelContent'
         :style='{
           "width" : labelWidth,
           "text-align" : labelAlign,
         }'
    >
      <div class='label-require-view'>
        <i class='required-tag' v-if='showRequiredTag && labelPlacement === "left"'>*</i>
        <div class='label'>{{ labelContent }}</div>
        <i class='required-tag' v-if='showRequiredTag && labelPlacement === "top-start"'>*</i>
      </div>
    </div>
    <div class='content-view'>
      <slot />
    </div>
  </div>
</template>

<script>

export default {
  name: 'su-label-view',
  props: {
    error: Boolean,

    showRequiredTag: {
      type: Boolean,
      default: false,
    },
    // 标签的文本对齐方式
    labelAlign: {
      type: String,
      default: null,
    },
    // 标签长度
    labelWidth: {
      type: String,
      default: null,
    },
    // 标签内容
    labelContent: {
      type: String,
      default: null,
    },
    // 方位信息
    labelPlacement: {
      type: String,
      default: 'left',
    },
  },
}
</script>

<style scoped lang='scss'>
.su-left-placement {
  display: flex;
  flex-direction: row;
  align-items: center;

  .label-view {
    margin-right: 12px;

    .label {
      flex: 1;
    }
  }

  .required-tag {
    margin-right: 4px;
  }
}


.su-top-start-placement {
  display: flex;
  flex-direction: column;

  //.label-require-view {
  //  flex-direction: column-reverse !important;
  //}

  .label-view {
    margin-bottom: 4px;
  }

  .required-tag {
    margin-left: 4px;
  }
}


.su-label-view {

  .content-view {
    width: inherit;
    text-align: left;

    //> div {
    //  width: 100%;
    //}
  }

  .label-require-view {
    display: flex;
    flex-direction: row;
    align-items: center;

    .label {
      word-break: keep-all;
      font-size: 14px;
      color: #333752;
      line-height: 20px;
    }

    .required-tag {
      width: 8px;
      height: 8px;
      margin-bottom: 6px;
      font-size: 20px;
      color: #F12B43;
    }
  }
}
</style>
