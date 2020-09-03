import {paper_by_title} from "@/API/elastic_api";
import {filteredKeys} from "@/assets/utils.js"

export const state = () => ({
  query: null,
  search_results: [],
  aggregation: null,
  current_aggregation: null,
  total: null
});

export const mutations = {
  submit_search_result(state, {search_results, local_query, payload_query}) {
    console.log('local_query', local_query)
    console.log('payload_query', payload_query)

    if(Object.keys(search_results).length !== 0){
      state.search_results = search_results.hits.hits;
      state.total = search_results.hits.total.value;
      state.query = payload_query
      if (payload_query === local_query){
        console.log("old query")
        state.current_aggregation = search_results.aggregations;
      }
      else{
        console.log('new query')
        console.log('state query(new)', state.query)
        state.aggregation = search_results.aggregations;
        state.current_aggregation = null
      }
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
  async paper_by_title(context, {query_params, local_query}) {
    let search_results = await paper_by_title(query_params);
    let payload_query = query_params.query
    context.commit('submit_search_result', {search_results, local_query, payload_query});
  }
};
