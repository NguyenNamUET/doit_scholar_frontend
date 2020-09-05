<template>
  <div v-if="this.search_results.length !== 0"
       class="container"
       id="page_container">
    <div class="tile is-ancestor">
      <div class="tile is-parent">
        <div class="tile is-child">
          <h1 class="text-class-1">
            <strong>Tìm được {{this.total_count | formatNumber}} kết quả</strong>
          </h1>
          <!------------------------      DROPDOWN HERE   --------------------------->
          <div id="sort_section">
            <DropDown :dd_data="{msg:'Lĩnh vực', fields: this.fos_list}" @update-fos-checked="updateFOSChecked"/>
            <DropDown :dd_data="{msg:'Tác giả', fields: this.authors_list}" @update-authors-checked="updateAuthorsChecked"/>
            <DropDown :dd_data="{msg:'Hội nghị', fields: this.venue_list}" @update-venues-checked="updateVenuesChecked"/>
          </div>
          <!-------------------------------------------------------------------------->
        </div>
      </div>
    </div>

    <!------------------------      AUTHORS CARD HERE   --------------------------->
    <div class="tile is-ancestor">
      <div class="tile is-parent is-8 is-vertical">
        <div class="tile is-child columns is-multiline" v-if="author_hidden">
            <AuthorInfo
              v-for="author in author_info.slice(0,3)" :key="author.key"
              v-bind:author_info="author"
            >
            </AuthorInfo>
            <a class="column is-full text-class-3" v-on:click="author_hidden = false">Xem thêm tác giả</a>
        </div>

        <div class="tile is-child columns is-multiline" v-else>
          <AuthorInfo
            v-for="author in this.author_info" :key="author.key"
            v-bind:author_info="author"
          >
          </AuthorInfo>
          <a class="column is-full text-class-3" v-on:click="author_hidden = true">Ẩn bớt tác giả</a>
        </div>

        <div class="tile is-child">
          <SearchResult v-for="result in this.search_results" :key="result._id"
                        v-bind:search_result="result"></SearchResult>
        </div>
      </div>
    </div>
    <!-------------------------------------------------------------------------->


    <!-------------------------   PAGINATION HERE   ---------------------------->
    <!--HOW TO USE-->
    <!--page-count: number of pages-->
    <!--click-handler: what happen when click on a page button-->
    <!--page-range: number of page display at middle (ex:1 ... 4 5 6 ... 24)-->
    <!--margin-pages: number of page at 2 end (ex above margin-pages=1)-->
    <!--v-model="current_page" to track selected page (must have)-->

    <!--Took inspiration from this project
    https://github.com/lokyoung/vuejs-paginate/blob/master/src/components/Paginate.vue-->
    <Pagination :page-count="(Math.ceil(this.total_count/this.per_page))"
                v-model="current_page"
                :click-handler="updatePage"
                :page-range="3"
                :margin-pages="2">
    </Pagination>
    <!-------------------------------------------------------------------------->
  </div>

  <div v-else>
    <NuxtError v-bind:error="{statusCode:404, message:'Không tìm thấy từ khóa'}"></NuxtError>
  </div>

</template>

<script>
    import {fields_type, formatNumber} from "../assets/utils";
    import {filteredKeys, filteredKeys_v2} from "../assets/utils";
    import DropDown from "../components/function_components/DropDown";
    import {publication_type} from "../assets/utils";
    import AuthorInfo from "../components/search_page/AuthorInfo";
    import SearchResult from "../components/search_page/SearchResult";
    import NuxtError from "@/components/static_components/ErrorPage";
    import Pagination from "@/components/function_components/Pagination";

    export default {
      name: "search",
      watchQuery: true,
      components: {SearchResult, AuthorInfo, DropDown, Pagination, NuxtError},
      head() {
        return {
          title: 'DoIT Scholar - Tìm kiếm văn bản học thuật'
        }
      },
      data() {
        return {
          search_results: null,
          publication_sort: publication_type,
          query_params: null,
          author_info: null,
          venue_info: null,
          fos_info: null,

          author_hidden: true,
          msg_hidden: false,

          //24/08/2020: Nam added this for dropdown
          authors_checked: this.$store.state.dropdown_search.authors_checked,
          fos_checked: this.$store.state.dropdown_search.fos_checked,
          venues_checked: this.$store.state.dropdown_search.venues_checked,
          //24/08/2020: Nam changed this for pagination
          total_count: 0,
          current_page: 1,
          per_page: 10,

          local_query: null
        }
      },
      filters: {
        formatNumber(number) {
          return formatNumber(number)
        }
      },
      //static_<>_aggs dùng để lưu trữ giá trị mặc định trong dropdown
      //là khi route sẽ không có các tham số fos<int>, author<int>, venue<int>
      //hay gọi cách khác static_<>_aggs là kết quả search đầu tiên chưa có filers

      //current_<>_aggs dùng để theo dõi kết quả mỗi lần filters

      //Ta sẽ kiểm tra trong static_<>_aggs chứa những giá trị nào có trong current_<>_aggs
      //thì ta sẽ diable các giá trị đó trong dropdown
      //VD: static_<>_aggs = [A, B, C, D, E, F, G]
      //sau khi filter ta có current_<>_aggs = [A, C, D, G] tức là các papers filtered ra chỉ có field A,C,D,G
      //thì ta không thể filter theo các fields B,E,F (!!!Các dropdown hiện sử dụng MUST trong và giữa dropdowns)

      // key: tên giá trị,
      // doc_count: số lượng văn bản có,
      // checked: lưu trữ checkbox đã được check,
      // disabled: đánh dấu checkbox không tồn tại (B,E,F như trên)
      computed: {
        fos_list: function (){
          let result = []
          if(this.$store.state.search_result.aggregation){
            let static_fos_aggs = this.$store.state.search_result.aggregation.fos_count.buckets
            let current_fos_aggs = (this.$store.state.search_result.current_aggregation!==null) ?
                                    _.map(this.$store.state.search_result.current_aggregation.fos_count.buckets, (item)=>{return item.key})
                                    : _.map(static_fos_aggs, (item)=>{return item.key})

            let fos_checked = filteredKeys_v2(Object.assign({},this.$route.query), /fos\d/)

            static_fos_aggs.forEach(item => {
              if (fos_checked.includes(item.key) && current_fos_aggs.includes(item.key)){
                result.push({key:item.key, doc_count:0, checked:true, disabled:false})
              }
              else if (fos_checked.includes(item) && !current_fos_aggs.includes(item.key)){
                result.push({key:item.key, doc_count:0, checked:true, disabled:true})
              }
              else if (!fos_checked.includes(item.key) && current_fos_aggs.includes(item.key)){
                result.push({key:item.key, doc_count:0, checked:false, disabled:false})
              }
              else if (!fos_checked.includes(item.key) && !current_fos_aggs.includes(item.key)){
                result.push({key:item.key, doc_count:0, checked:false, disabled:true})
              }
            })
            return result
          }
          else{
            return null
          }
        },
        authors_list: function (){
          let result = []
          if(this.$store.state.search_result.aggregation){
            let static_authors_aggs = this.$store.state.search_result.aggregation.author_count.name.buckets
            let current_authors_aggs = (this.$store.state.search_result.current_aggregation!==null) ?
                                        _.map(this.$store.state.search_result.current_aggregation.author_count.name.buckets, (item)=>{return item.name.buckets[0].key})
                                        :_.map(static_authors_aggs, (item)=>{return item.name.buckets[0].key})

            let authors_checked = filteredKeys_v2(Object.assign({},this.$route.query), /author\d/)

            static_authors_aggs.forEach(item => {
              let name = item.name.buckets[0].key
              if (authors_checked.includes(name) && current_authors_aggs.includes(name)){
                result.push({key:name, doc_count:item.doc_count, checked:true, disabled:false})
              }
              else if (authors_checked.includes(name) && !current_authors_aggs.includes(name)){
                result.push({key:name, doc_count:item.doc_count, checked:true, disabled:true})
              }
              else if (!authors_checked.includes(name) && current_authors_aggs.includes(name)){
                result.push({key:name, doc_count:item.doc_count, checked:false, disabled:false})
              }
              else if (!authors_checked.includes(name) && !current_authors_aggs.includes(name)){
                result.push({key:name, doc_count:item.doc_count, checked:false, disabled:true})
              }
            })
            return result
          }
          else{
            return null
          }
        },
        venue_list: function (){
          let result = []
          if(this.$store.state.search_result.aggregation){
            let static_venues_aggs = this.$store.state.search_result.aggregation.venue_count.buckets
            let current_venues_aggs = (this.$store.state.search_result.current_aggregation!==null) ?
                                      _.map(this.$store.state.search_result.current_aggregation.venue_count.buckets, (item)=>{return item.key})
                                      : _.map(static_venues_aggs, (item)=>{return item.key})

            let venues_checked = filteredKeys_v2(Object.assign({},this.$route.query), /venue\d/)

            static_venues_aggs.forEach(item => {
              if (venues_checked.includes(item.key) && current_venues_aggs.includes(item.key)){
                result.push({key:item.key, doc_count:item.doc_count, checked:true, disabled:false})
              }
              else if (venues_checked.includes(item.key) && !current_venues_aggs.includes(item.key)){
                result.push({key:item.key, doc_count:item.doc_count, checked:true, disabled:true})
              }
              else if (!venues_checked.includes(item.key) && current_venues_aggs.includes(item.key)){
                result.push({key:item.key, doc_count:item.doc_count, checked:false, disabled:false})
              }
              else if (!venues_checked.includes(item.key) && !current_venues_aggs.includes(item.key)){
                result.push({key:item.key, doc_count:item.doc_count, checked:false, disabled:true})
              }
            })
            return result
          }
          else{
            return null
          }
        }
      },
      async asyncData({query, store, route}) {
        let query_params = query

        //Added for authors agg
        if("top_author_size" in query) {
          query_params["return_top_author"] = true
        }
        //Gather all fos<digit> to form Array of checked fields of study
        if("fos0" in query) {
          let fos_keys = filteredKeys(Object.assign({},query), /fos\d/)
          query_params["fields_of_study"] = []
          for(let i=0; i<fos_keys.length; i++){
            let key = fos_keys[i]
            query_params["fields_of_study"].push(query[key])
          }
          query_params["fos_is_should"]=false
        }
        //Gather all author<digit> to form Array of checked authors
        if("author0" in query) {
          let author_keys = filteredKeys(Object.assign({},query), /author\d/)
          query_params["authors"] = []
          for(let i=0; i<author_keys.length; i++){
            let key = author_keys[i]
            query_params["authors"].push(query[key])
          }
          query_params["author_is_should"]=false
        }
        //Gather venue param
        if("venue0" in query) {
          let venues_keys = filteredKeys(Object.assign({},query), /venue\d/)
          query_params["venues"] = []
          for(let i=0; i<venues_keys.length; i++){
            let key = venues_keys[i]
            query_params["venues"].push(query[key])
          }
          query_params["venues_is_should"]=false
        }
        //Added for fos agg
        query_params["return_fos_aggs"]= true
        //Added for venue agg
        query_params["return_venue_aggs"]= true

        //Default query to save static_<>_aggs in store
        let static_query_params = { query: query['query'],
          start: query['start'], size: query['size'],
          top_author_size: query['top_author_size'], page: query['page'],
          return_top_author: query['return_top_author'], return_fos_aggs: query['return_fos_aggs'],
          return_venue_aggs: query['return_venue_aggs'] }
        await store.dispatch('search_result/set_static_aggregation', static_query_params)

        //Perform search here
        await store.dispatch('search_result/paper_by_title', query_params)
        if(store.state.search_result.search_results.length > 0) {
          return {
             query_params: query,
             current_page: parseInt(query['page']),
             search_results: store.state.search_result.search_results,
             keyword: query['searchContent'],
             total_count: store.state.search_result.total,
             //maybe I will delete these three since computed for these are not necessary/////
             author_info: store.state.search_result.aggregation.author_count.name.buckets,
             fos_info: store.state.search_result.aggregation.fos_count.buckets,
             venue_info: store.state.search_result.aggregation.venue_count.buckets,
             ////////////////////////////////////////////////////////////////////////////////
             last_paper_id: store.state.search_result.last_paper_id,
          }
        }
        else{
           return {
             query_params: query,
             current_page: parseInt(query['page']),
             search_results: store.state.search_result.search_results,
             keyword: query['searchContent'],
             total_count: 0,
             author_info: [],
             venue_info: [],
             fos_info: [],
          }
        }
      },
      methods: {
        //20/08/2020: Nam added this for pagination (view Pagination.vue for details)
        updatePage(pageNum){
          let router_query = Object.assign({},this.$route.query)
          router_query["start"]=(pageNum - 1) * this.per_page
          router_query["size"]=this.per_page
          router_query["page"]=pageNum;
          //Delete these to have consitent router
          delete router_query["fields_of_study"]
          delete router_query["fos_is_should"]
          delete router_query["author_is_should"]
          delete router_query["return_top_author"]
          delete router_query["return_fos_aggs"]

          this.$router.push({name: 'search', query: router_query})
        },
        //28/08/2020: Nam fixed this for dropdown search
        updateFOSChecked(checkedCategories) {
          let fos_checked = checkedCategories
          // console.log("updateFOSChecked: ", fos_checked)
          let router_query = {query: this.$route.query.query,
                              start: 0,
                              size: this.$route.query.size,
                              top_author_size: 10,
                              page: 1
          }
          //Create fields of study params for example ?fos0=Medicine&fos1=Engineering
          for(let i=0; i<fos_checked.length; i++){
            router_query[`fos${i}`]=fos_checked[i]
          }
          //Add author params to query
          if("author0" in this.$route.query){
            let author_keys = filteredKeys(Object.assign({},this.$route.query), /author\d/)
            for(let i=0; i<author_keys.length; i++){
              router_query[[author_keys[i]]]=this.$route.query[author_keys[i]]
            }
          }
          //Add venue param to query
          if("venue0" in this.$route.query){
            let venues_keys = filteredKeys(Object.assign({},this.$route.query), /venue\d/)
            for(let i=0; i<venues_keys.length; i++){
              router_query[[venues_keys[i]]]=this.$route.query[venues_keys[i]]
            }
          }
          this.$router.push({name: 'search', query: router_query})
        },
        updateAuthorsChecked(checkedCategories) {
          let authors_checked = checkedCategories
          // console.log("updateAuthorsChecked: ", authors_checked)
          let router_query = {query: this.$route.query.query,
                              start: 0,
                              size: this.$route.query.size,
                              top_author_size: 10,
                              page: this.current_page
          }
          //Create authors params for example ?author0=Medicine&author1=Engineering
          for(let i=0; i<authors_checked.length; i++){
            router_query[`author${i}`]=authors_checked[i]
          }
          //Add fos params to query
          if("fos0" in this.$route.query){
            let fos_keys = filteredKeys(Object.assign({},this.$route.query), /fos\d/)
            for(let i=0; i<fos_keys.length; i++){
              router_query[[fos_keys[i]]]=this.$route.query[fos_keys[i]]
            }
          }
          //Add venue param to query
          if("venue0" in this.$route.query){
            let venues_keys = filteredKeys(Object.assign({},this.$route.query), /venue\d/)
            for(let i=0; i<venues_keys.length; i++){
              router_query[[venues_keys[i]]]=this.$route.query[venues_keys[i]]
            }
          }
          this.$router.push({name: 'search', query: router_query})
        },
        updateVenuesChecked(checkedCategories){
          let venues_checked = checkedCategories
          console.log("updateVenuesChecked: ", venues_checked)
          let router_query = {query: this.$route.query.query,
                              start: 0,
                              size: this.$route.query.size,
                              top_author_size: 10,
                              page: 1
          }
          //Create venue params for example ?venue=VinAI
          for(let i=0; i<venues_checked.length; i++){
            router_query[`venue${i}`]=venues_checked[i]
          }
          //Add fos params to query
          if("fos0" in this.$route.query){
            let fos_keys = filteredKeys(Object.assign({},this.$route.query), /fos\d/)
            for(let i=0; i<fos_keys.length; i++){
              router_query[[fos_keys[i]]]=this.$route.query[fos_keys[i]]
            }
          }
          //Add author params to query
          if("author0" in this.$route.query){
            let author_keys = filteredKeys(Object.assign({},this.$route.query), /author\d/)
            for(let i=0; i<author_keys.length; i++){
              router_query[[author_keys[i]]]=this.$route.query[author_keys[i]]
            }
          }
          this.$router.push({name: 'search', query: router_query})
        }
      }
    }
</script>

<style scoped>
  @import "assets/general_styling.scss";
  .container {
    padding: 40px 20px;
  }
  #sort_section {
    border-top: 1px solid #d9dadb;
    padding: 10px;
    border-bottom: 1px solid #d9dadb;
  }
  p {
    color: black;
  }
  button:hover {
    cursor: pointer;
  }
  a:hover {
    text-decoration: none;
  }
</style>
