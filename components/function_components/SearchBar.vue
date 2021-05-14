<template>
  <div class="field has-addons">
    <div class="control is-expanded">
      <b-autocomplete
        v-model="search_query"
        @keyup.enter.native="submitQuery"
        class="autocomplete"
        :data="autocomplete_data"
        @typing="getAutocomplete"
        :loading="is_loading"
        :placeholder="placeholder"
        @select="option => this.selected = option"
      >
        <template slot="empty">{{ $t('default_layout.header.search_bar_not_found') }} {{search_query}}</template>
        <template slot-scope="props">

          <a
            :href="'/paper/' + formatTitle(props.option.title) + '.p-' + props.option.paper_id"
            :title="props.option.title"
          >
            <span>
                <i class="far fa-newspaper"></i> {{props.option.title}}
            </span>

<!--            <div class="text-class-3 color-class-3">-->
<!--              {{props.option.year[0]}} {{ $t('general_attribute.citation') }}-->
<!--            </div>-->
          </a>
        </template>
      </b-autocomplete>
    </div>
    <div class="control">
      <span class="button is-warning" v-on:click="submitQuery"><i class="fas fa-search"></i> {{ $t('general_attribute.search') }}</span>
    </div>
  </div>
</template>

<script>
import {searchByTitle} from "@/API/lucene_api";
import {formatTitle} from "assets/utils";

export default {
      name: "SearchBar",
      props: ['placeholder', 'current_page', 'authors', 'venues', 'topics'],
      data() {
        return {
          search_query: '',
          query_params: {},
          autocomplete_data: [],
          selected: null,
          is_loading: false,
          raw_data: [],
        }
      },
      methods: {
        formatTitle(title) {
          return formatTitle(title)
        },
        getAutocomplete: _.debounce(async function(name) {
          if (name !== "") {
            this.is_loading = true
            this.raw_data = await searchByTitle({
              query: name,
              size: 10,
              start: 0,
            })
            this.autocomplete_data = this.raw_data.data
            this.is_loading = false
          }
        }),
        submitQuery() {
          this.query_params = {
            query: this.search_query,
            start: 0,
            size: 10,
            page: 1,
            sort: 'score'
          }
          // console.log("this.current_page", this.current_page)
          if (this.search_query !== ""){
            this.$router.push({path: this.current_page, query: this.query_params})
          }
          else{
            this.$buefy.toast.open({
              duration: 3000,
              message: this.$t('default_layout.warning'),
              position: 'is-bottom',
              type: 'is-danger'
            })
          }
        }
      }
    }
</script>

<style scoped>
  .autocomplete {
    position: relative;
    z-index: 3;
  }
</style>
