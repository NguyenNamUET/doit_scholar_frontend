import {SEARCH_DOCUMENTS} from "@/config/elastic_api_config";
import axios from "axios";


/***************************************** Counting function ******************************************/
const all_author = async (query_params) => {
  try {
    const result = await axios.get(SEARCH_DOCUMENTS.count_authors)
    return result.data
  } catch(e) {
    console.log(e)
    return null
  }
}


const all_paper = async (query_params) => {
  try {
    const result = await axios.get(SEARCH_DOCUMENTS.count_paper, {
        start: 0,
        size: 0,
      }
    )
    return result.data
  } catch(e) {
    console.log(e)
    return null
  }
}

const all_field = async (query_params) => {
  try {
    const result = await axios.get(SEARCH_DOCUMENTS.count_field)
    return result.data
  } catch(e) {
    console.log(e)
    return null
  }
}

const all_topics = async() => {
  try {
    let result = await axios.get(SEARCH_DOCUMENTS.count_topics)
    return result.data
  } catch(e) {
    console.log(e)
    return null
  }
}
/***************************************** Counting function ******************************************/

/***************************************** Search paper function ******************************************/
const paper_detail = async (params) => {
  try {
    let result = await axios.get(SEARCH_DOCUMENTS.paper_detail + '/' + params.paper_id,
      {params: {cstart:params.cstart,
                      csize:params.csize,
                      rstart:params.rstart,
                      rsize:params.rsize}
      })
    console.log("paper_detail", params)
    return result.data
  } catch(e) {
    console.log(e)
    return null
  }
}

const paper_by_title = async (query_params) => {
  // console.log('api', query_params)
  try {
    const result = await axios.post(SEARCH_DOCUMENTS.paper_by_title, {
      search_content:query_params.query,
      sort_by: query_params.sort,
      venues:query_params.venue, venues_is_should: true, return_venue_aggs: true,
      authors:query_params.author, author_is_should: true, return_top_author: true, top_author_size: 30,
      fields_of_study:query_params.fos, fos_is_should: true, return_fos_aggs: true,
      start:query_params.start, size:query_params.size,
      from_year:query_params.from_year, end_year:query_params.end_year, return_year_aggs: true
    })
    return result.data
  } catch(e) {
    console.log(e)
    return null
  }
}

const paper_by_abstract = async(query_params) => {
  try {
    let result = await axios.post(SEARCH_DOCUMENTS.paper_by_abstract, {
      searchContent: query_params.query,
      start: query_params.start,
      size: query_params.size,
      return_top_author: query_params.return_top_author,
      top_author_size: query_params.top_author_size
    })
    return result.data
  } catch(e) {
    console.log(e)
    return null
  }
}


const paper_by_topic = async(query_params) => {
  try {
    const result = await axios.post(SEARCH_DOCUMENTS.paper_by_topic, {
      topics: query_params.topics, topic_is_should: true,
      search_content: query_params.query,
      start: query_params.start, size: query_params.size,
      sort_by: query_params.sort,
      venues: query_params.venue, venues_is_should:true, return_venue_aggs: true,
      authors: query_params.author, author_is_should: true, return_top_author: true, top_author_size: 10,
      fields_of_study: query_params.fos, fos_is_should: true, return_fos_aggs: true,
      from_year: query_params.from_year, end_year: query_params.end_year, return_year_aggs: true
    },
      {params: {
              topics_size:query_params.topics_size, year_size:query_params.year_size
            }
      })
    return result.data
  } catch(e) {
    console.log(e)
    return null
  }
}

const paper_by_fos = async(query_params) => {
  try {
    // console.log("paper_by_fos query: ", query_params)
    const result = await axios.post(SEARCH_DOCUMENTS.paper_by_fos, {
      fields_of_study: query_params.fields_of_study,
      size: query_params.size,
      fos_is_should: true
    })
    // console.log("paper_by_fos result: ", result.data)
    return result.data
  } catch(e) {
    console.log(e)
    return null
  }
}

const paper_by_venue = async(query_params) => {
  try {
    console.log("paper_by_venue query: ", query_params)
    const result = await axios.post(SEARCH_DOCUMENTS.paper_by_venue, {
      search_content: query_params.query,
      start: query_params.start, size: query_params.size,
      sort_by: query_params.sort,
      venues: query_params.venue, venues_is_should:true, return_venue_aggs: true,
      authors: query_params.author, author_is_should: true, return_top_author: true, top_author_size: 10,
      fields_of_study: query_params.fos, fos_is_should: true, return_fos_aggs: true,
      from_year: query_params.from_year, end_year: query_params.end_year, return_year_aggs: true
    })
    return result.data
  } catch(e) {
    console.log(e)
    return null
  }
}

/***************************************** Search paper function ******************************************/


/***************************************** Search author function ******************************************/

const author_by_id = async (query_params) => {
  try {
    let result = await axios.post(SEARCH_DOCUMENTS.author_by_id + '/' + query_params.author_id, {
      search_content: query_params.query,
      start: query_params.start, size: query_params.size,
      sort_by: query_params.sort_by,
      authors: query_params.author, author_is_should: true, return_top_author: true, top_author_size: 10,
      fields_of_study: query_params.fos, fos_is_should: true, return_fos_aggs: true,
      venues: query_params.venue, venues_is_should:true, return_venue_aggs: true,
      from_year: query_params.from_year, end_year: query_params.end_year, return_year_aggs: true
    })
    return result.data
  } catch(e) {
    console.log(e)
    return null
  }
}

/***************************************** Search author function ******************************************/


/**************************************** Function for both paper and author page ********************************/
const paper_citation = async (query_params) => {
  try {
    let result = await axios.get(SEARCH_DOCUMENTS.paper_detail + '/' + query_params.paper_id + '/citations', {
      params: {
        start: query_params.start,
        size: 10
      }
    })
    return result.data
  } catch(e) {
    console.log(e)
    return null
  }
}

const paper_references = async(query_params) => {
  try {
    let result = await axios.get(SEARCH_DOCUMENTS.paper_detail + '/' + query_params.paper_id + '/references', {
      params: {
        start: query_params.start,
        size: 10
      }
    })
    return result.data
  } catch(e) {
    console.log(e)
    return null
  }
}
/**************************************** Function for both paper and author page ********************************/

/*************** WIKI ********************/
const wiki_summary = async(query_params) => {
  try {
    let result = await axios.get(SEARCH_DOCUMENTS.wiki_summary, {
      name: query_params.author_name
    })
    return result.data
  } catch(e) {
    console.log(e)
    return null
  }
}
/*************** WIKI ********************/

/************** Autocomple search *************/
const autocomplete = async(query_params) => {
  try {
    console.log("autocomplete", query_params)
    const result = await axios.post(SEARCH_DOCUMENTS.autocomplete, {
      search_content: query_params.query,
      authors: query_params.authors,
      venues: query_params.venues,
      topics: query_params.topics,
      size: query_params.size
    })
    console.log(result.data)
    return result.data
  } catch(e) {
      console.log(e)
    return null
  }
}
/************** Autocomple search *************/

/************************************************* Homepage function **********************************************/
const home_status_graph = async (query_params) => {
  try {
    let result = await axios.get(SEARCH_DOCUMENTS.home_status_graph, {
      params: {
        fos_graph: query_params.fos_graph,
        venues_graph: query_params.venues_graph,
        topics_graph: query_params.topics_graph,
        size: query_params.size,
        topics_size: query_params.topics_size,
        year_size: query_params.year_size
      }
    })
    return result.data
  } catch(e) {
    console.log(e)
    return null
  }
}

const home_papers = async (query_params) => {
  try {
    let result = await axios.get(SEARCH_DOCUMENTS.home_papers, {
      params: {
        size: query_params.size,
        topics_size: query_params.topics_size,
        order_by_citations_count: query_params.order_by_citations_count,
        order_by_year: query_params.order_by_year,
        order_by_topics__year: query_params.order_by_topics__year
      }
    })
    return result.data
  } catch(e) {
    console.log(e)
    return null
  }
}

const home_status_count = async (query_params) => {
  try {
    let result = await axios.get(SEARCH_DOCUMENTS.home_status_count, {
      params: {
        is_papers_count: query_params.is_papers_count,
        is_authors_count: query_params.is_authors_count,
        is_fos_count: query_params.is_fos_count,
        is_topics_count: query_params.is_topics_count
      }
    })
    return result.data
  } catch(e) {
    console.log(e)
    return null
  }
}

const citation_chart_data = async (paper_id) => {
  try {
    let result = await axios.get(SEARCH_DOCUMENTS.paper_detail + '/' + paper_id + '/citationsGraph', {
      params: {
        paperID: paper_id
      }
    })
    return result.data
  } catch(e) {
    console.log(e)
    return null
  }
}

const most_cited_authors = async() => {
  try {
    let result = await axios.get(SEARCH_DOCUMENTS.most_cited_authors)
    return result.data
  } catch (e) {
    console.log(e)
    return null
  }
}

const most_cited_papers = async() => {
  try {
    let result = await axios.get(SEARCH_DOCUMENTS.most_cited_papers)
    return result.data
  } catch (e) {
    console.log(e)
    return null
  }
}

const fos_graph_data = async(queryParams) => {
  try {
    let result = await axios.get(SEARCH_DOCUMENTS.fos_graph, {
      params: {
        size: queryParams.size
      }
    })
    return result.data
  } catch (e) {
    console.log(e)
    return null
  }
}

const venue_graph_data = async() => {
  try {
    let result = await axios.get(SEARCH_DOCUMENTS.venue_graph, {
      params: {
        size: 30
      }
    })
    return result.data
  } catch (e) {
    console.log(e)
    return null
  }
}
/************************************************* Homepage function **********************************************/

export {
  paper_by_abstract,
  paper_by_title,
  paper_by_topic,
  paper_detail,
  paper_citation,
  paper_references,
  paper_by_fos,
  paper_by_venue,
  citation_chart_data,

  all_topics,
  all_paper,
  all_author,
  all_field,

  most_cited_authors,
  most_cited_papers,
  fos_graph_data,
  venue_graph_data,

  home_papers,
  home_status_graph,
  home_status_count,

  author_by_id,

  wiki_summary,
  autocomplete
}
