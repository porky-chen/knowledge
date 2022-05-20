import { shallowMount } from '@vue/test-utils'
import SuSearch from '@/components/su-search.vue'

describe('SuSearch.vue', () => {
  
  const placeholder = '请输入'
  const wrapper = shallowMount(SuSearch, {
    propsData: { placeholder }
  })

  it('设置placeholder 测试', () => {
    const input = wrapper.find('input')
    expect(input.attributes('placeholder')).toMatch(placeholder)
  })

  it('输入值触发 updateKeyword函数 返回填充值', async () => {
    const textInput = wrapper.find('input[type="text"]')
    const update = jest.fn()
    wrapper.vm.$on('updateKeyword', update)
    const inputvalue = '关键字';
    await textInput.setValue(inputvalue)
    const callBackObj = {
      keyword: inputvalue,
      pageIndex: 1
    }
    expect(update).toHaveBeenCalledWith(callBackObj)
  })

  it('输入值触发 updateKeyword函数 没有keyword', async () => {
    const textInput = wrapper.find('input[type="text"]')
    const update = jest.fn()
    wrapper.vm.$on('updateKeyword', update)
    const inputvalue = null;
    await textInput.setValue(inputvalue)
    const callBackObj = {
      keyword: '',
      pageIndex: 1
    }
    expect(update).toHaveBeenCalledWith(callBackObj)
  })


  it('输入值点击触发 updateKeyword函数 返回填充值', async () => {
    const textInput = wrapper.find('input[type="text"]')
    const btn = wrapper.find('.el-icon-search')
    const update = jest.fn()
    wrapper.vm.$on('click', update)
    const inputvalue = '关键字';
    await textInput.setValue(inputvalue)
    await btn.trigger('click')
    const callBackObj = {
      keyword: inputvalue,
      pageIndex: 1
    }
    expect(update).toHaveBeenCalledWith(callBackObj)
    expect(update).toHaveBeenCalledTimes(1)
  })
})
