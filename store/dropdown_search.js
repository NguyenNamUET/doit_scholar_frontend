export const state = () => ({
  query: null,
  fos_checked: [],
  authors_checked: [],
  venue_checked: [],
  year_check: {start:0, end:2020}
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
  submit_year_checked(state, yearChecked) {
    state.year_check = {start: yearChecked.start, end:yearChecked.end}
  },
  clear_DDstates(state) {
    state.fos_checked = []
    state.authors_checked = []
    state.venues_checked = []
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
  submit_year_states(context, yearChecked){
    context.commit("submit_year_checked", yearChecked)
    console.log("submit_year_states", yearChecked)
  },
};
