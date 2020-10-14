export const state = () => ({
  query: null,
  fos_checked: [],
  authors_checked: [],
  venue_checked: []
});

export const mutations = {
  submit_fos_checked(state, query, fieldsChecked) {
    state.fos_checked = fieldsChecked
  },
  submit_authors_checked(state, fieldsChecked) {
    state.authors_checked = fieldsChecked
  },
  submit_venue_checked(state, fieldsChecked) {
    state.venue_checked = fieldsChecked
  },
  clear_DDstates(state) {
    state.fos_checked = []
    state.authors_checked = []
    state.venues_checked = null
  }
};

export const actions = {
  submit_fos_states(context, fieldsChecked){
    context.commit("submit_fos_checked", fieldsChecked)
    console.log("submit_fos_states", fieldsChecked)
  },
  submit_authors_states(context, fieldsChecked){
    context.commit("submit_authors_checked", fieldsChecked)
    console.log("submit_authors_states", fieldsChecked)
  },
  submit_venue_states(context, fieldsChecked){
    context.commit("submit_venue_checked", fieldsChecked)
    console.log("submit_venue_states", fieldsChecked)
  },
};
