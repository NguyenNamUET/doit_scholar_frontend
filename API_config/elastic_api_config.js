const SEARCH_API = 'http://112.137.142.8:8080'

const SEARCH_DOCUMENTS = {
  paper_detail: SEARCH_API + '/s2api/papers',
  all_author: SEARCH_API + '/s2api/authors/getAllAuthor',
  all_paper: SEARCH_API + '/s2api/papers/getAllpapers',
  all_field: SEARCH_API + '/s2api/papers/getAllFieldOfStudy',
  paper_by_title: SEARCH_API + '/s2api/papers/searchPaperTitle',
  paper_by_abstract: SEARCH_API + '/s2api/papers/searchPaperAbstract',
  all_topics: SEARCH_API + '/s2api/papers/getAllTopics',
  paper_by_topic: SEARCH_API + '/s2api/papers/getPaperByTopic',
  author_by_id: SEARCH_API + '/s2api/authors',
  author_by_name: SEARCH_API + '/s2api/authors/getAuthorByName'
}

export {
  SEARCH_API,
  SEARCH_DOCUMENTS
}