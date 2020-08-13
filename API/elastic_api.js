import {SEARCH_DOCUMENTS} from "@/API_config/elastic_api_config";
import axios from "axios";

const paper_detail = async (paper_id) => {
  try {
    let result = await axios.get(SEARCH_DOCUMENTS.paper_detail + '/' + paper_id)
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
      search_content: query_params.query,
      start: query_params.start,
      size: query_params.size,
      return_top_author: true,
      top_author_size: 10,
      return_fos_aggs: true,
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
    console.log(result)
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
      topics: query_params.topics
    })
    console.log("paper_by_topic api: ", result)
    return result.data
  } catch(e) {
    console.log(e)
    return null
  }
}

const author_by_id = async (author_id) => {
  try {
    let result = await axios.get(SEARCH_DOCUMENTS.author_by_id + '/' + author_id)
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

export {
  paper_by_abstract,
  paper_by_title,
  paper_by_topic,
  paper_detail,
  all_topics,
  all_paper,
  all_author,
  all_field,
  author_by_id,
  author_by_name
}

