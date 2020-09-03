import createPersistedState from 'vuex-persistedstate'

export default ({store}) => {
  createPersistedState({
    key: 'hacked',
    paths: ["search_result.query"],
    storage: {
      getItem: (key)=>{
        localStorage.getItem(key)
      },
      setItem: (key,value)=>{
        localStorage.setItem(key, value)
      },
      removeItem: (key) => {
        localStorage.removeItem(key)
      }
    }
  })(store)
}
