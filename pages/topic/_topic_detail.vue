<template>
  <div class="container">
    <div class="tile is-ancestor is-vertical">
      <div class="tile is-parent is-7" >
        <div class="tile is-child">
          <h1 class="title">
            <b>{{topic_name}}</b>
          </h1>
        </div>
      </div>
    </div>
    <div>
      <div class="tile is-parent is-vertical">
        <div>
          <div  v-for="item in papers">
            {{item}}
<!--            <SearchResult :search_result="item"></SearchResult>-->
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
    import TimelineItem from "../../components/function_components/TimelineItem";
    import {paper_by_topic} from "@/API/elastic_api";
    import SearchResult from "@/components/search_page/SearchResult";
    //import {wiki_summary} from "@/API/elastic_api";
    export default {
      name: "_topic_detail",
      components: {SearchResult, TimelineItem},
      head() {
        return {
          title: this.topic_name + ' | DoIT Scholar'
        }
      },
      async asyncData({route}) {
        let id_pattern = /[0-9]+$/g
        let topic_id = id_pattern.exec(route.params.topic_detail)
        let name_pattern = /.+(?=\-[0-9]+$)/g
        let topic_name = name_pattern.exec(route.params.topic_detail)
        let query_params = {topics: Array(topic_id[0]),
          source: ["title","abstract","year","authors","paperId"]
        }
        let data = await paper_by_topic(query_params)
        //let wiki_topic_summary = await wiki_summary({name: topic_name})
        if(Object.keys(data).length !== 0 ){
          return {
            topic_name: topic_name[0].replace(/-/g, ' '),
            papers: data.hits.hits,
            //wiki_topic_summary: wiki_topic_summary
          }
        }
        else{
          return {
            topic_name: topic_name[0].replace(/-/g, ' '),
            papers: null
          }
        }
      }
    }
</script>

<style scoped>
  .container {
    padding: 40px 20px;
  }
  .title {
    color: #2e414f;
  }
  .paper_section {
    background-color: white;
  }
</style>
