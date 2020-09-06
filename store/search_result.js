import {paper_by_title} from "@/API/elastic_api";
import {filteredKeys} from "@/assets/utils.js"

export const state = () => ({
  query: null,
  search_results: [],
  aggregation: null,
  fos_aggregation: null,
  current_fos_aggregation: null,
  authors_aggregation: null,
  venues_aggregation: null,
  total: null
});

export const mutations = {
  set_static_fos_aggregation(state, search_results){
    if(Object.keys(search_results).length !== 0){
      state.fos_aggregation = search_results.aggregations.fos_count.buckets;
    }
    else{
      state.fos_aggregation = null;
    }
  },
  submit_search_result(state, {search_results, query_params}) {

    if(Object.keys(search_results).length !== 0){
      state.search_results = search_results.hits.hits;
      state.total = search_results.hits.total.value;

      state.authors_aggregation = search_results.aggregations.author_count.name.buckets;
      state.venues_aggregation = search_results.aggregations.venue_count.buckets;

      if (state.query===null && (filteredKeys(query_params,/fos\d/).length===0
                              && filteredKeys(query_params,/author\d/).length===0
                              && filteredKeys(query_params,/venue\d/).length===0)){
        //just reach from homepage

        state.current_fos_aggregation = null
      }
      else if (state.query===null && (filteredKeys(query_params,/fos\d/).length!==0
                              || filteredKeys(query_params,/author\d/).length!==0
                              || filteredKeys(query_params,/venue\d/).length!==0)){
        //just refresh

        state.current_fos_aggregation = search_results.aggregations
      }
      else if (state.query !== query_params.query){

        state.current_fos_aggregation = null
      }
    }
    else{
      state.search_results = [];
      state.total = null;
      state.aggregation = null;
      state.fos_aggregation = null;
      state.authors_aggregation = null;
      state.venues_aggregation = null;
    }

  },
  clear_search_result(state) {
    state.search_results = [];
    state.aggregation = null;
    state.fos_aggregation = null;
    state.authors_aggregation = null;
    state.venues_aggregation = null;
    state.total = null;
  }
};

export const actions = {
  async set_static_fos_aggregation(context, query_params){
    let search_results = await paper_by_title(query_params);
    context.commit('set_static_fos_aggregation', search_results);
  },
  async paper_by_title(context, query_params) {
    let search_results = await paper_by_title(query_params);
    context.commit('submit_search_result', {search_results, query_params});
  }
};
