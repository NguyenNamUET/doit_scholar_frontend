<template>
  <div class="container">
    <div class="tile is-ancestor is-vertical">
      <div class="tile is-parent">
        <div class="tile is-child is-8">
          <h1 class="title" style="color: #4E4B4B">
            <b>{{ topic_name }}</b>
          </h1>
        </div>
        <div class="tile is-child is-4">
        </div>
      </div>
      <div class="tile is-parent">
        <div class="tile is-child is-8">
          <div>
            <p class="content_title">
              {{ $t('general_attribute.publication') }}
            </p>
            <p class="text-class-3">
              <i18n
                tag="span"
                path="general_attribute.list_label"
              >
                <template v-slot:start>
                  <span>
                      {{ (current_page-1)*per_page + 1}}
                  </span>
                </template>
                <template
                  v-slot:end
                >
                  <span v-if="(current_page-1)*per_page + per_page < total_paper">
                      {{ (current_page-1)*per_page + per_page}}
                  </span>
                  <span v-else>
                      {{total_paper}}
                  </span>
                </template>
                <template v-slot:total>
                  <span>
                      {{total_paper | formatNumber}}
                  </span>
                </template>
              </i18n>
            </p>
            <br>
          </div>
          <!-----------------------      DROPDOWN HERE   --------------------------->
          <div class="content_box filter_section">
            <div style="display: inline-block">
              <div class="field has-addons">
                <div class="control is-expanded">
                  <input
                    v-on:keyup.enter="submitQuery"
                    v-model="search_query"
                    class="input"
                    type="text"
                    :placeholder="$t('general_attribute.search_bar_placeholder')"
                  >
                </div>
                <div class="control">
                  <p class="button is-warning" v-on:click="submitQuery">
                    <i class="fas fa-search"></i>{{ $t('general_attribute.search') }}
                  </p>
                </div>
              </div>
            </div>
            <DropDown :dd_data="{msg: $t('general_attribute.fos'), fields: this.fos_list}" @update-fos-checked="updateFOSChecked"/>
            <DropDown :dd_data="{msg: $t('general_attribute.author'), fields: this.authors_list}" @update-authors-checked="updateAuthorsChecked"/>
            <DropDown :dd_data="{msg: $t('general_attribute.venue'), fields: this.venue_list}" @update-venues-checked="updateVenuesChecked"/>
          </div>
          <!-------------------------------------------------------------------------->
          <SearchResult
            v-for="result in papers"
            v-bind:search_result="result._source"/>
<!--          {{papers}}-->
          <Pagination
            v-model="current_page"
            :page-count="Math.ceil(total_paper / per_page)"
            :click-handler="updatePaper"
            :page-range="3"
            :margin-pages="1"
            :is-small="true"
          >
          </Pagination>
        </div>
        <div class="tile is-child is-4">
          <LineGraph
            :dataset="datacollection"
            :title="$t('journal_detail_page.publication_chart.title')"
          ></LineGraph>
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
      name: "topic_detail",
      components: {SearchResult, TimelineItem},
      head() {
        return {
          title: this.topic_name + ' | DoIT Scholar'
        }
      },
      data() {
        return {
          papers: null,
          topic_name: null,
          current_page: 1,
          per_page: 10,
          total_paper: 10
        }
      },
      async asyncData({route}) {
        let id_pattern = /[0-9]+$/g
        let topic_id = id_pattern.exec(route.params.topic_detail)
        let query_params = {topics: Array(topic_id[0])}
        let data = await paper_by_topic(query_params)
        //let wiki_topic_summary = await wiki_summary({name: topic_name})
        let name_pattern = /.+(?=\-[0-9]+$)/g
        let topic_name = name_pattern.exec(route.params.topic_detail)
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
