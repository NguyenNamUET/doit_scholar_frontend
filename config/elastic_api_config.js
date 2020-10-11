const SEARCH_API =  'http://51.210.251.250:8000'
// http://localhost:8000
// http://51.210.251.250:8000

const SEARCH_DOCUMENTS = {
  count_authors: SEARCH_API + '/s2api/authors/countAuthors',
  count_paper: SEARCH_API + '/s2api/papers/countPapers',
  count_field: SEARCH_API + '/s2api/papers/countFOS',
  count_topics: SEARCH_API + '/s2api/papers/countTopics',


  paper_detail: SEARCH_API + '/s2api/papers',
  paper_by_title: SEARCH_API + '/s2api/papers/searchPaperTitle',
  paper_by_abstract: SEARCH_API + '/s2api/papers/searchPaperAbstract',
  paper_by_topic: SEARCH_API + '/s2api/papers/searchPaperByTopics',
  paper_by_title_and_fos: SEARCH_API + '/s2api/papers/searchPaperByTitleAndFOS',
  paper_by_fos: SEARCH_API + '/s2api/papers/searchPaperFOS',
  paper_by_venue: SEARCH_API + 's2api/papers/searchPaperByVenue',

  author_by_id: SEARCH_API + '/s2api/authors',
  author_by_name: SEARCH_API + '/s2api/authors/getAuthorByName',
  wiki_summary: SEARCH_API + '/s2api/wiki/getTermSummary',
  autocomplete: SEARCH_API + '/s2api/papers/searchOnTyping',
  most_cited_authors: SEARCH_API + '/s2api/authors/homepageAuthors',
  most_cited_papers: SEARCH_API + '/s2api/papers/homepagePapers',

  fos_graph: SEARCH_API + '/s2api/papers/fosGraph',
  venue_graph: SEARCH_API + '/s2api/papers/venuesGraph'
}

export {
  SEARCH_API,
  SEARCH_DOCUMENTS
}
