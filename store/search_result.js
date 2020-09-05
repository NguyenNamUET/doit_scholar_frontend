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
  set_static_aggregation(state, search_results){
    if(Object.keys(search_results).length !== 0){
      state.aggregation = search_results.aggregations
    }
    else{
      state.aggregation = null;
    }
    console.log("set_static_aggregation", state.aggregation)
  },
  submit_search_result(state, {search_results, query_params}) {
    console.log('state.query', state.query)
    console.log('query_params.query', query_params.query)

    if(Object.keys(search_results).length !== 0){
      state.search_results = search_results.hits.hits;
      state.total = search_results.hits.total.value;

      if (state.query===null && (filteredKeys(query_params,/fos\d/).length===0
                              && filteredKeys(query_params,/author\d/).length===0
                              && filteredKeys(query_params,/venue\d/).length===0)){
        //just reach from homepage
        console.log("from homepage")
        state.current_aggregation = null
      }
      else if (state.query===null && (filteredKeys(query_params,/fos\d/).length!==0
                              || filteredKeys(query_params,/author\d/).length!==0
                              || filteredKeys(query_params,/venue\d/).length!==0)){
        //just refresh
        console.log("refresh")
        state.current_aggregation = search_results.aggregations
      }
      else if (state.query !== query_params.query){
        console.log('new query')
        state.current_aggregation = null
      }
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
  async set_static_aggregation(context, query_params){
    let search_results = await paper_by_title(query_params);
    context.commit('set_static_aggregation', search_results);
  },
  async paper_by_title(context, query_params) {
    let search_results = await paper_by_title(query_params);
    context.commit('submit_search_result', {search_results, query_params});
  }
};
