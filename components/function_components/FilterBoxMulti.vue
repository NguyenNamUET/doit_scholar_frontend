<template>
  <b-dropdown aria-role="list">
    <button class="button is-light" type="button" slot="trigger">
      <template>
        <span>{{ $t(this.name) }}</span>
      </template>
      <b-icon icon="menu-down"></b-icon>
    </button>

    <!------------------------------------- VENUE DROPDOWN ------------------------------------------>
    <b-dropdown-item
      :focusable="false"
      custom
    >
      <div>
        <b-field>
          <b-input placeholder="Search..."
                   type="search"
                   icon-pack="fas"
                   icon="search">
          </b-input>
        </b-field>
      </div>
      <div class="option_container">
        <b-table
          :data="data"
          :columns="columns"
          :checked-rows.sync="checkedRows"
          :is-row-checkable="(row) => true"
          checkable
        >
        </b-table>
      </div>
      <nav class="level">
        <div class="level-left">
          <nuxt-link class="level-item button is-danger" :to="this.clear_path" tag="button">
              {{ $t('general_attribute.clear') }}
          </nuxt-link>
        </div>
        <div class="level-right">
          <nuxt-link class="level-item button is-success" :to="this.apply_path" tag="button">
              {{ $t('general_attribute.apply') }}
          </nuxt-link>
        </div>
      </nav>
    </b-dropdown-item>
    <!------------------------------------- VENUE DROPDOWN ------------------------------------------>
  </b-dropdown>
</template>

<script>
import {filteredKeys_v2} from "assets/utils";

export default {
  name: "FilterBoxMulti",
  props: ['type', 'whichpage'],
  computed: {
    apply_path: function (){
      let params = {
        path: this.whichpage,
        query: {}
      }
      console.log(this.checkedRows)
      params.query[this.type] = []
      for(let i=0; i<this.checkedRows.length; i++){
        params.query[this.type].push(this.checkedRows[i][this.type])
      }
      // console.log(params)
      return params
    },
    clear_path: function (){
      let params = {path: ""}
      let re = new RegExp("[&|?]"+this.type+"\\d+=.+(?=&)", "g")
      let current = this.whichpage+"&"
      params['path'] = current.replace(re,"").slice(0, -1)
      return params
    }
  },
  data() {
    const name='general_attribute.'+this.type
    return {
      name,
      data: [],
      checkedRows: [],
      columns:[
        {
          field: this.type,
          label: this.$t(name)
        },
        {
          field: 'count',
          label: this.$t('general_attribute.count'),
          numeric: true
        }
      ]
    }
  },
  // created() {
  //   this.makeChecked()
  // },
  methods: {
    // makeChecked() {
    //   this.data.forEach(item => {
    //     if (item.checked){
    //       this.checkedRows.push(item)
    //     }
    //   })
    //   console.log("makeChecked", this.checkedRows)
    // },
    fos_list: function () {
      let fos_res = []
      this.$store.state.search_result.aggregation.fos_count.buckets.forEach(item => {
        fos_res.push({fos:item.key.trim()!=="" ? item.key.trim() : "Unknown",
          count:item.doc_count, checked:false})
      })
      return fos_res
    },
    authors_list: function () {
      let author_res = []
      this.$store.state.search_result.aggregation.author_count.name.buckets.forEach(item => {
        author_res.push({author:item.name.buckets[0].key.trim()!=="" ? item.name.buckets[0].key.trim() : "John Doe",
          count:item.doc_count, checked:false})
      })
      return author_res
    },
    venue_list: function () {
      let venue_res = []
      this.$store.state.search_result.aggregation.venue_count.buckets.forEach(item => {
        venue_res.push({venue:item.key.trim()!=="" ? item.key.trim() : "Anonymous",
          count:item.doc_count, checked:false})
      })
      return venue_res
    },
    checked_fos_list() {
      let fos_res = []
      console.log(this.$store.state.search_result.filters.fos_checked)
      this.$store.state.search_result.filters.fos_checked.forEach(item => {
        fos_res.push({fos:item.key.trim()!=="" ? item.key.trim() : "Unknown",
          count:item.doc_count, checked:false})
      })
      return fos_res
    },
    checked_authors_list() {
      let author_res = []
      this.$store.state.search_result.filters.authors_checked.forEach(item => {
        author_res.push({author:item.name.buckets[0].key.trim()!=="" ? item.name.buckets[0].key.trim() : "John Doe",
          count:item.doc_count, checked:false})
      })
      return author_res
    },
    checked_venue_list() {
      let venue_res = []
      this.$store.state.search_result.filters.venue_checked.forEach(item => {
        venue_res.push({venue:item.key.trim()!=="" ? item.key.trim() : "Anonymous",
          count:item.doc_count, checked:false})
      })
      return venue_res
    }
  },
  mounted() {
    this.checked_fos_list()
    if (this.type === 'author') {
      this.data = this.authors_list()
    }
    else if (this.type === 'venue') {
      this.data = this.venue_list()
    }
    else if (this.type === 'fos') {
      this.data = this.fos_list()
    }
  }
}
</script>

<style lang="scss" scoped>
.option_container {
  overflow-y: auto;
  min-width: 500px;
  max-height: 300px;
  margin: 10px 0 10px 0;
}
.time_option_container {
  margin: 10px 0 10px 0;
  min-width: 250px;
  .button {
    display: block;
    margin: 5px;
  }
}
</style>
