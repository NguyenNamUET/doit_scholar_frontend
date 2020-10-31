import {paper_by_title} from "@/API/elastic_api";

//Only update search_results when there is a new query
//Update both search_results and aggregation when query changes

export const state = () => ({
  query: '',
  search_results: [],
  aggregation: null,
  filters: {
    fos_checked: [],
    authors_checked: [],
    venue_checked: [],
    year_check: {start: 0, end: 2020}
  }
});

export const mutations = {
  submit_search(state, params) {
    // console.log('store here', params)
    if (params.payload.query !== state.query) {
      //New query, refresh all parameters
      // console.log('new query')
      if(Object.keys(params.result).length !== 0) {
        state.query = params.payload.query
        state.search_results = params.result.hits.hits
        state.total = params.result.hits.total.value
        state.aggregation = params.result.aggregations
        state.filters = {
          fos_checked: [],
          authors_checked: [],
          venue_checked: [],
          year_check: {start: 0, end: 2020}
        }
      }
      // console.log(state.filters)
    }
    else {
      //Same query, just update the filtering parameter
      // console.log('sorting')
      state.filters.year_check.start = params.payload?.from_year | 0
      state.filters.year_check.end = params.payload?.end_year | new Date().getFullYear()
      state.filters.venue_checked = params.payload?.venue
      state.filters.fos_checked = params.payload?.fos
      state.filters.authors_checked = params.payload?.author
      // console.log(state.filters)
      //Update search result, but not query
      state.search_results = params.result.hits.hits

      // console.log('store', state.filters)
    }
  },
  clear_sorting_params(state) {
    console.log('clearing sorting params')
    state.filters = {
      fos_checked: [],
      authors_checked: [],
      venue_checked: [],
      year_check: {start: 0, end: 2020}
    }
  }
};

export const actions = {
  async paper_by_title(context, payload) {
    let result = await paper_by_title(payload);
    let params = {
      result: result,
      payload: payload
    }
    context.commit('submit_search', params);
  },
  clear_sorting_params(context) {
    context.commit('clear_sorting_params')
  }
};
