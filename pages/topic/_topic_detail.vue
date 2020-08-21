<template>
  <div>
    <div style="background-color: #e6e6e6">
      <div class="container">
        <div class="tile is-ancestor is-vertical">

          <div class="tile is-parent is-8" >
            <div class="tile is-child">
              <h1 class="is-size-2">
                <b style="color: #2e414f">{{topic_name}}</b>
              </h1>
              <h1 class="is-size-6">
                <p>{{wiki_topic_summary}}</p>
              </h1>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="container">
      <div class="tile is-parent is-vertical">
        <div class="timeline">
          <div  v-for="item in papers">
            <TimelineItem v-bind:paper="item._source"></TimelineItem>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
    import TimelineItem from "../../components/TimelineItem";
    import {paper_by_topic} from "@/API/elastic_api";
    //import {wiki_summary} from "@/API/elastic_api";
    export default {
      name: "_topic_detail",
      components: {TimelineItem},
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
          source: ["title","abstract","year","authors","corpusID"]
        }
        let data = await paper_by_topic(query_params)
        //let wiki_topic_summary = await wiki_summary({name: topic_name})
        return {
          topic_name: topic_name[0],
          papers: data.hits.hits,
          //wiki_topic_summary: wiki_topic_summary
        }
      }
    }
</script>

<style scoped>
  @import "assets/general_styling.scss";
  .container {
    padding: 40px 20px;
  }
</style>
