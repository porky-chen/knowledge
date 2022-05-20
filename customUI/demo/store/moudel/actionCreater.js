

const actionCreater = {
  getters: {
    templateStr: (state) => {
      let buttonsStr = ''
      if(!state.actionItems){
        return ''
      }
      console.log(state.actionItems)
      state.actionItems.forEach(elm => {
        buttonsStr = `${buttonsStr}<su-button buttonType="${elm.buttonType ? elm.buttonType : ''}">${elm.text ? elm.text : ''}</su-button>`
      })
      
      return `<div class="action">${buttonsStr}</div>`
    },
    actionItems: (state) => {
      const aitems = state.actionItems ? [...state.actionItems] : []
      return aitems
    }
  },

  mutations: {
    setTemplateStr: (state, data)=>{
      state.templateStr = data
    },
    setActionItems: (state,data) => {
      console.log(data)
      state.actionItems = [...data]
    }
  },

  actions: {
    // eslint-disable-next-line no-unused-vars
 
  },
  state: {
    templateStr: '',
    actionItems: []
  },
}

export default actionCreater
