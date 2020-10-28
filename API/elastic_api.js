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
const paper_detail = async (paper_id) => {
  try {
    let result = await axios.get(SEARCH_DOCUMENTS.paper_detail + '/' + paper_id)
    return result.data
  } catch(e) {
    console.log(e)
    return null
  }
}

const paper_by_title = async (query_params) => {
  try {
    const result = await axios.post(SEARCH_DOCUMENTS.paper_by_title, {
      search_content:query_params.query,
      venues:query_params.venue, venues_is_should: true,
      authors:query_params.author, author_is_should: true,
      fields_of_study:query_params.fos, fos_is_should: true,
      start:query_params.start, size:query_params.size,
      return_fos_aggs: true,
      return_venue_aggs: true,
      return_year_aggs: true,
      return_top_author: true,
      from_year:query_params.from_year, end_year:query_params.end_year,
      top_author_size: 10
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
    // console.log(query_params)
    const result = await axios.post(SEARCH_DOCUMENTS.paper_by_topic, {
      topics: query_params.topics,
      source: query_params.source
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
    // console.log("paper_by_venue query: ", query_params)
    const result = await axios.post(SEARCH_DOCUMENTS.paper_by_venue, {
      venues: query_params.venues,
      start: query_params.start,
      size: query_params.size,
      sort_by: query_params.sort_by
    })
    return result.data
  } catch(e) {
    console.log(e)
    return null
  }
}

const paper_by_fos_and_title = async(query_params) => {
  try {
    const result = await axios.post(SEARCH_DOCUMENTS.paper_by_title_and_fos, {
      search_content: query_params.query,
      fields_of_study: query_params.fields_of_study,
      fos_is_should: query_params.fos_is_should,
      return_fos_aggs: query_params.return_fos_aggs,
      return_top_author: query_params.return_top_author,
      top_author_size: query_params.top_author_size,
      start: query_params.start,
      size: query_params.size
    })
    return result.data
  } catch(e) {
    console.log(e)
    return null
  }
}
/***************************************** Search paper function ******************************************/


/***************************************** Search author function ******************************************/

const author_by_id = async (author_id, params) => {
  try {
    let result = await axios.get(SEARCH_DOCUMENTS.author_by_id + '/' + author_id, {
      params: params
    })
    return result.data
  } catch(e) {
    console.log(e)
    return null
  }
}

const author_by_name = async(query_params) => {
  try {
    let result = await axios.get(SEARCH_DOCUMENTS.author_by_name, {
      author_name: query_params.author_name
    })
    return result.data
  } catch(e) {
    console.log(e)
    return null
  }
}

const author_papers = async (query_params) => {
  try {
    let result = await axios.get(SEARCH_DOCUMENTS.paper_detail + '/' + query_params.author_id + '/papers', {
      params: {
        start: query_params.start,
        size: query_params.size
      }
    })
    // console.log('api', result.data)
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
      search_content: query_params.search_content,
      authors: query_params.authors,
      venues: query_params.venues,
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
    let result = await axios.get(SEARCH_DOCUMENTS.venue_graph)
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
  paper_by_fos_and_title,
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

  author_by_id,
  author_by_name,
  author_papers,

  wiki_summary,
  autocomplete
}
