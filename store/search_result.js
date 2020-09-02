import {paper_by_title} from "@/API/elastic_api";
import {paper_by_abstract} from "@/API/elastic_api";

export const state = () => ({
  query: null,
  search_results: [],
  aggregation: null,
  total: null
});

export const mutations = {
  submit_search_result(state, search_results, query) {
    console.log('store', search_results)
    if(Object.keys(search_results).length !== 0){
      state.search_results = search_results.hits.hits;
      state.total = search_results.hits.total.value;
      // Store will check query, if query stays the same, meaning the user is filtering and aggregations won't change
      if (query !== state.query) {
        console.log('new query')
        state.query = query;
        state.aggregation = search_results.aggregations;
      }
    }
    else{
      state.query = null;
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
    console.log('query', payload);
    let result = await paper_by_title(payload);
    context.commit('submit_search_result', result, payload.query);
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
