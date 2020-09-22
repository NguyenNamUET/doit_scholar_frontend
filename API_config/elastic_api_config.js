const SEARCH_API =  "http://localhost:8000"
// 'http://112.137.142.8:8080'

const SEARCH_DOCUMENTS = {
  paper_detail: SEARCH_API + '/s2api/papers',

  all_author: SEARCH_API + '/s2api/authors/countAuthors',
  all_paper: SEARCH_API + '/s2api/papers/countPapers',
  all_field: SEARCH_API + '/s2api/papers/countFOS',

  paper_by_title: SEARCH_API + '/s2api/papers/searchPaperTitle',
  paper_by_abstract: SEARCH_API + '/s2api/papers/searchPaperAbstract',
  paper_by_topic: SEARCH_API + '/s2api/papers/searchPaperByTopics',
  paper_by_title_and_fos: SEARCH_API + '/s2api/papers/searchPaperByTitleAndFOS',

  all_topics: SEARCH_API + '/s2api/papers/countTopics',

  author_by_id: SEARCH_API + '/s2api/authors',
  author_by_name: SEARCH_API + '/s2api/authors/getAuthorByName',

  wiki_summary: SEARCH_API + '/s2api/wiki/getTermSummary',
  autocomplete: SEARCH_API + '/s2api/papers/searchOnTyping',
}

export {
  SEARCH_API,
  SEARCH_DOCUMENTS
}
