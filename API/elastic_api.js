import {SEARCH_DOCUMENTS, SEMANTIC_DOCUMENTS} from "@/API_config/elastic_api_config";
import axios from "axios";
import {isDictEmpty} from "assets/utils";

const paper_detail = async (paper_id) => {
  try {
    let result = await axios.get(SEARCH_DOCUMENTS.paper_detail + '/' + paper_id)
    if (isDictEmpty(result.data)) {
      result = await axios.get(SEMANTIC_DOCUMENTS.paper_detail + '/' + paper_id)
    }
    return result.data
  } catch(e) {
    console.log(e)
    return null
  }
}

const all_author = async (query_params) => {
  try {
    const result = await axios.post(SEARCH_DOCUMENTS.all_author, {
        start: query_params.start,
        size: query_params.size,
      }
    )
    return result.data
  } catch(e) {
    console.log(e)
    return null
  }
}


const all_paper = async (query_params) => {
  try {
    const result = await axios.post(SEARCH_DOCUMENTS.all_paper, {
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
    const result = await axios.post(SEARCH_DOCUMENTS.all_field, {
      size: query_params.size
    })
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
      venues:query_params.venues, venues_is_should:query_params.venues_is_should,
      authors:query_params.authors, author_is_should:query_params.author_is_should,
      fields_of_study:query_params.fields_of_study, fos_is_should:query_params.fos_is_should,
      start:query_params.start, size:query_params.size, source:query_params.source, sort_by:query_params.sort_by,
      return_fos_aggs:query_params.return_fos_aggs,
      return_venue_aggs:query_params.return_venue_aggs,
      deep_pagination:query_params.deep_pagination, last_paper_id:query_params.last_paper_id,
      return_top_author:query_params.return_top_author, top_author_size:query_params.top_author_size
    })
    // console.log("paper_by_title query: ", query_params)
    console.log("paper_by_title result: ", result.data)
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

const all_topics = async() => {
  try {
    let result = await axios.get(SEARCH_DOCUMENTS.all_topics)
    return result.data
  } catch(e) {
    console.log(e)
    return null
  }
}

const paper_by_topic = async(query_params) => {
  try {
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

/////////////////AUTHOR/////////////////////////////////
const author_by_id = async (author_id) => {
  try {
    let result = await axios.get(SEARCH_DOCUMENTS.author_by_id + '/' + author_id)
    if (isDictEmpty(result.data)) {
      result = await axios.get(SEMANTIC_DOCUMENTS.author + '/' + author_id)
    }
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
    let result = await axios.get(SEARCH_DOCUMENTS.author_by_id + '/' + query_params.author_id + '/papers', {
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

const paper_citation = async (query_params) => {
  try {
    let result = await axios.get(SEARCH_DOCUMENTS.paper_detail + '/' + query_params.paper_id + '/citations', {
      params: {
        start: query_params.start,
        size: 10
      }
    })
    console.log("paper_citation query_params: ", query_params)
    console.log("paper_citation result: ", result)
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


/////////////////WIKI/////////////////////////////////
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

const autocomplete = async(query_params) => {
  try {
    const result = await axios.post(SEARCH_DOCUMENTS.autocomplete, {
      search_content: query_params.search_content,
      size: query_params.size
    })
    console.log(result.data)
    return result.data
  } catch(e) {
      console.log(e)
    return null
  }
}

export {
  paper_by_abstract,
  paper_by_title,
  paper_by_topic,
  paper_by_fos_and_title,
  paper_detail,
  paper_citation,
  paper_references,

  all_topics,
  all_paper,
  all_author,
  all_field,

  author_by_id,
  author_by_name,
  author_papers,

  wiki_summary,
  autocomplete
}

