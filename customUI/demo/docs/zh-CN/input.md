## Input 输入框

Input 输入框

### 右对齐

::: demo

```html

<su-input label-content='输入框标题'
          :showRequiredTag='true'
          v-model='value'
          placeholder='请输入'
          suffix-icon='el-icon-view'
/>
<su-input label-content='身份证'
          style='margin-top: 12px'
          :showRequiredTag='true'
          v-model='value'
          disabled
          placeholder='请输入'
/>
</su-input>
<script>
  export default {
    data() {
      return {
        value: '',
      }
    }
  }
</script>
```

:::

### 顶对齐

::: demo

```html

<su-input label-content='输入框标题'
          label-placement='top-start'
          :showRequiredTag='true'
          v-model='value'
          placeholder='请输入'
          suffix-icon='el-icon-view'
/>
<su-input label-content='身份证'
          label-placement='top-start'
          style='margin-top: 12px'
          :showRequiredTag='true'
          v-model='value'
          placeholder='请输入'
/>
</su-input>
<script>
  export default {
    data() {
      return {
        value: '',
      }
    }
  }
</script>
```

:::

### 密码输入框

::: demo

```html

<su-input input-type='password'
          style='margin-top: 12px'
          v-model='value'
          placeholder='请输入'
/>
<su-input label-placement='top-start'
          input-type='password'
          style='margin-top: 12px'
          v-model='value'
          placeholder='请输入'
/>
</su-input>
<script>
  export default {
    data() {
      return {
        value: '',
      }
    }
  }
</script>
```

:::

### 数字输入框及精度控制

::: demo

```html

<su-input style='margin-top: 12px'
          label-content='带单位输入(5个整数)'
          placeholder='请输入内容'
          type='number'
          :maxlength='5'
          v-model='value'
>
  <div slot='suffix'>个</div>
</su-input>
<su-input style='margin-top: 24px'
          label-content='带单位输入（3个整数，2个小数）'
          placeholder='请输入内容'
          type='number'
          :maxlength='5'
          :precision='2'
          v-model='value'
>
  <div slot='suffix'>个</div>
</su-input>
<script>
  export default {
    data() {
      return {
        value: '',
      }
    }
  }
</script>
```

:::

### 更多类型

::: demo

```html

<su-input style='margin-top: 12px'
          label-content='单行输入'
          placeholder='请输入'
          v-model='value'
/>
<su-input label-content='多行输入'
          type='textarea'
          style='margin-top: 12px'
          :rows='2'
          placeholder='请输入内容'
          v-model='value'
/>

<su-input style='margin-top: 12px'
          type='textarea'
          :rows='2'
          :maxlength='200'
          show-word-limit
          label-content='字符限制'
          resize='none'
          placeholder='请输入内容'
          v-model='value'
/>

<su-input style='margin-top: 24px'
          label-content='网址'
          placeholder='请输入内容'
          v-model='value'
>
  <template slot='prepend'>Http://</template>
  <template slot='append'>
    <su-dropdown type='text'
                 size='small'
                 :text='moreSelectTitle'
                 :list='moreSelectList'
                 @command='handleCommandClick'
    />
  </template>
</su-input>

<su-input style='margin-top: 24px'
          label-content='邮箱'
          placeholder='请输入内容'
          v-model='value'
>
  <template slot='append'>
    <su-dropdown type='text'
                 size='small'
                 :text='moreSelectTitle'
                 :list='moreSelectList'
                 @command='handleCommandClick'
    />
  </template>
</su-input>
<script>
  export default {
    data() {
      return {
        value: '',

        moreSelectTitle: '.com',
        moreSelectList: [
          {value: 1, label: '.com'},
          {value: 2, label: '.com1'},
          {value: 3, label: '.com2'},
        ],
      }
    }
  }
</script>
```

:::

### 标签参数（和form的label是不同的）

| 参数 | 说明 | 类型 | 可选值 | 默认值 |
|---------- |-------------- |---------- |---------- |---------- |
| showRequiredTag | 标签文本的是否显示必填*号 | Boolean | - | false |
| labelAlign | 标签文本的对齐方式，对应css的text-align | String | - | - |
| labelWidth | 标签文本的长度，对应css的width | String | - | - |
| labelContent | 标签文本内容 | String | - | - |
| labelPlacement | 标签文本的放置位置 | String | left左边，top-start上面 | left |

### Input Attributes

| 参数 | 说明 | 类型 | 可选值 | 默认值 |
|---------- |-------------- |---------- |---------- |---------- |
| type | 类型 | string | number,text等原生input的type属性值 | text |
| value/v-model | 绑定值     | string / number     | - | - |
| maxlength | 原生属性，最大输入长度 | number | - | 50 |
| minlength | 原生属性，最小输入长度 | number | - | 0 |
| show-word-limit | 是否显示输入字数统计，只在 type = "text" 或 type = "textarea" 时有效 | boolean | - | false |
| placeholder | 输入框占位文本     | string | - | - |
| clearable | 是否可清空     | boolean | - | true |
| show-password | 是否显示切换密码图标 | boolean | - | false |
| disabled | 禁用 | boolean | - | false |
| size | 输入框尺寸，只在 type!="textarea" 时有效 | string | medium / small / mini     | small |
| prefix-icon | 输入框头部图标 | string | - | - |
| suffix-icon | 输入框尾部图标 | string | - | - |
| rows | 输入框行数，只对 type="textarea" 有效 | number | - | 2 |
| autosize | 自适应内容高度，只对 type="textarea" 有效，可传入对象，如，{ minRows: 2, maxRows: 6 } | boolean / object | - | false |
| autocomplete | 原生属性，自动补全 | string | on, off | off |
| name | 原生属性 | string | - | - |
| readonly | 原生属性，是否只读 | boolean | - | false |
| max | 原生属性，设置最大值 | - | - | - |
| min | 原生属性，设置最小值 | - | - | - |
| step | 原生属性，设置输入字段的合法数字间隔 | - | - | - |
| resize | 控制是否能被用户缩放 | string | none, both, horizontal, vertical | - |
| autofocus | 原生属性，自动获取焦点 | boolean | true, false | false |
| form | 原生属性 | string | - | - |
| label | 输入框关联的label文字 | string | - | - |
| tabindex | 输入框的tabindex | string | - | - |
| validate-event | 输入时是否触发表单的校验 | boolean | - | true |
| precision | type=number下生效，数字的精度 | number | - | 0 |

### Input Slots

| name | 说明 |
|---------- |-------------- |
| prefix | 输入框头部内容，只对 type="text" 有效 |
| suffix | 输入框尾部内容，只对 type="text" 有效 |
| prepend | 输入框前置内容，只对 type="text" 有效 |
| append | 输入框后置内容，只对 type="text" 有效 |

### Input Events

| 事件名称 | 说明 | 回调参数 | 
|---------- |-------------- |---------- |
| blur | 在 Input 失去焦点时触发 | - |
| focus | 在 Input 获得焦点时触发 | - |
| change | 仅在输入框失去焦点或用户按下回车时触发 | (value: string | number) |
| input | 在 Input 值改变时触发 | (value: string | number) |
| clear | 在点击由 clearable 属性生成的清空按钮时触发 | - |

### Input Methods（通过组件的getRef()获取其原生element组件的ref对象）

| 方法名 | 说明 | 参数 |
|---------- |-------------- |---------- |
| focus | 使 input 获取焦点 | - |
| blur | 使 input 失去焦点 | - |
| select | 选中 input 中的文字 | - |




