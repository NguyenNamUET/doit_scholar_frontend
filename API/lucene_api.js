import axios from "axios";
import {SEARCH_DOCUMENTS} from "~/config/lucene_api_config";

// params = {
//   docId,
//   docTitle,
//
// }

/***************************************** Getting function ******************************************/

const getDocById = async (params) => {
  try {
    let result = await axios.get(SEARCH_DOCUMENTS.get_doc_by_id + '/' + params.docId)

    return result.data
  }
  catch (e) {
    console.log(e)
  }
}

const getInboundCitations = async (params) => {
  try {
    let result = await axios.get( SEARCH_DOCUMENTS.get_doc_by_id + '/' + params.docId + '/' + SEARCH_DOCUMENTS.get_inbound_citations)

    return result.data
  }
  catch (e) {
    console.log(e)
  }
}

const getOutboundCitations = async (params) => {
  try {
    let result = await axios.get(SEARCH_DOCUMENTS.get_doc_by_id + '/' + params.docId + '/' + SEARCH_DOCUMENTS.get_outbound_citations)

    return result.data
  }
  catch (e) {
    console.log(e)
  }
}

/***************************************** Searching function ******************************************/
const searchByTitle = async (params) => {
  try {
    let result = await axios.get(SEARCH_DOCUMENTS.search_by_title, {
      params: {
        title: params.query,
        size: params.size,
        offset: params.start,
        sortBy: params.sortBy
      }
    })
    console.log(result.data)
    return result.data
  }
  catch (e) {
    console.log(e)
  }
}

const drillDown = async(params) => {
  try {
    let queryParams = {
      title: params.query,
      size: params.size,
      offset: params.start,
      drillYear: params.year,
      sortBy: params.sortBy
    }
    if (params.hasOwnProperty('venue')) queryParams['drillVenue'] = params.venue
    if (params.hasOwnProperty('fos')) queryParams['drillFos'] = params.fos
    let result = await axios.get(SEARCH_DOCUMENTS.drill_down, {
      params: queryParams
    })

    console.log(result.data)
    return result.data
  }
  catch (e) {
    console.log(e)
  }
}

export {
  getOutboundCitations,
  getDocById,
  getInboundCitations,

  searchByTitle,
  drillDown
}
