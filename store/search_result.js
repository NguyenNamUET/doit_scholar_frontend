import {paper_by_title, paper_by_topic} from "@/API/elastic_api";
import {paper_by_venue} from "@/API/elastic_api";
import {author_by_id} from "@/API/elastic_api";
import {searchByTitle} from "@/API/lucene_api";
//Only update search_results when there is a new query
//Update both search_results and aggregation when query changes

export const state = () => ({
  query: '',
  search_results: null,
  total: 0,
  aggregation: null,
  filters: {
    fos_checked: [],
    authors_checked: [],
    venue_checked: [],
    year_check: {start: 0, end: new Date().getFullYear()}
  }
});

export const mutations = {
  submit_search(state, params) {
    state.search_results = params.result.data.docs
    // state.total = params.result.hits.total.value
    state.aggregation = params.result.data.facet
    state.total = params.result.data.total

    if(params.payload.query === state.query
            || (state.query === '' && (Object.keys(params.payload).includes('author')
                                      ||Object.keys(params.payload).includes('fos')
                                      ||Object.keys(params.payload).includes('venue')
                                      ||Object.keys(params.payload).includes('end_year')))){
      //Same query, just update the filtering parameter
      state.filters.year_check.start = params.payload?.from_year | 0
      state.filters.year_check.end = params.payload?.end_year | new Date().getFullYear()
      state.filters.venue_checked = params.payload?.venue
      state.filters.fos_checked = params.payload?.fos
      state.filters.authors_checked = params.payload?.author
    }
    else if (params.payload.query !== state.query) {
      //New query, refresh all parameters
      if (params.result.length !== 0) {
        state.query = params.payload.query
        state.filters = {
          fos_checked: [],
          authors_checked: [],
          venue_checked: [],
          year_check: {start: 0, end: new Date().getFullYear()}
        }
      }
    }
  },
  clear_sorting_params(state) {
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
    let result = await searchByTitle(payload);
    let params = {
      result: result,
      payload: payload
    }
    context.commit('submit_search', params);
  },

  async paper_by_venue(context, payload) {
    let result = await paper_by_venue(payload);
    let params = {
      result: result,
      payload: payload
    }
    context.commit('submit_search', params);
  },

  async paper_by_author(context, payload) {
    let result = await author_by_id(payload);
    let params = {
      result: result,
      payload: payload
    }
    context.commit('submit_search', params);
  },

  async paper_by_topic(context, payload) {
    let result = await paper_by_topic(payload);
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
