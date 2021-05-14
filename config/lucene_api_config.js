const SEARCH_API =  'http://localhost:4567'
// http://localhost:4567
// http://51.210.251.250:8000

const SEARCH_DOCUMENTS = {
  get_doc_by_id: SEARCH_API + '/api/docs',
  get_inbound_citations: 'inbound-citations',
  get_outbound_citations: 'outbound-citations',

  search_by_title: SEARCH_API + '/api/search/docs-by-title',
  search_by_doi: SEARCH_API + '/api/search/docs-by-doi',
  search_by_field_of_study: SEARCH_API + '/api/search/docs-by-field-of-study',
  search_by_author_name: SEARCH_API + '/api/search/docs-by-author-name',
}

export {
  SEARCH_API,
  SEARCH_DOCUMENTS
}
