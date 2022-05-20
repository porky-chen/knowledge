import actionCreater from './actionCreater'

const projectCreater = {
  namespaced: true,
  getters: {
    ...actionCreater.getters
  },

  mutations: {
    ...actionCreater.mutations
  },

  actions: {
    // eslint-disable-next-line no-unused-vars
    ...actionCreater.actions
  },
  state: {
    ...actionCreater.templateStr
  },
}

export default projectCreater
