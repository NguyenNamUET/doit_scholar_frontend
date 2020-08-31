import {paper_by_title} from "@/API/elastic_api";

export const state = () => ({
  fos_checked: [],
  authors_checked: [],
  venue_checked: null
});

export const mutations = {
  submit_fos_checked(state, fieldsChecked) {
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
  },
  submit_authors_states(context, fieldsChecked){
    context.commit("submit_authors_checked", fieldsChecked)
  },
  submit_venue_states(context, fieldsChecked){
    context.commit("submit_venue_checked", fieldsChecked)
  },
};
