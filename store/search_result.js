import {paper_by_title} from "@/API/elastic_api";

export const state = () => ({
  search_results: [],
  aggregation: null,
  total: null
});

export const mutations = {
  submit_search_result(state, search_results) {
    if(Object.keys(search_results).length !== 0){
      state.search_results = search_results.hits.hits;
      state.total = search_results.hits.total.value;
      state.aggregation = search_results.aggregations;
    }
    else{
      state.search_results = [];
      state.total = null;
      state.aggregation = null;
    }

  },
  filter_doc(state, search_results) {
    if(Object.keys(search_results).length !== 0){
      state.search_results = search_results.hits.hits;
      state.total = search_results.hits.total.value;
    }
    else{
      state.search_results = [];
      state.total = null;
      state.aggregation = null;
    }
  },
  clear_search_result(state) {
    state.search_results = [];
    state.aggregation = null;
    state.total = null;
  }
};

export const actions = {
  async paper_by_title(context, payload) {
    // console.log('query', payload);
    let result = await paper_by_title(payload);
    context.commit('submit_search_result', result);
  },
  // async paper_by_abstract(context, payload) {
  //   let result = await paper_by_abstract(payload);
  //   context.commit('submit_search_result', result)
  // },
  // async paper_by_fos_and_title(context, payload) {
  //   let result = await paper_by_title(payload);
  //   context.commit('submit_search_result', result);
  // },
  // async paper_by_authors_and_title(context, payload) {
  //   let result = await paper_by_title(payload);
  //   context.commit('submit_search_result', result);
  // },
};
