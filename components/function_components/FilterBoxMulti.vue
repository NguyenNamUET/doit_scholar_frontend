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
          <template slot="bottom-left">
              <div><p><b>Total checked</b>: {{ checkedRows.length }}</p></div>

              <div><p><b>Query</b>: {{ this.query_params }}</p></div>
          </template>
        </b-table>
      </div>
      <nav class="level">
        <div class="level-left">
          <button class="level-item button is-danger" @click="clear">
            {{ $t('general_attribute.clear') }}
          </button>
        </div>
        <div class="level-right">
          <nuxt-link class="level-item button is-success" :to="this.query_params" tag="button" @click.native="doFilter">
              {{ $t('general_attribute.apply') }}
          </nuxt-link>
        </div>
      </nav>
    </b-dropdown-item>
    <!------------------------------------- VENUE DROPDOWN ------------------------------------------>
  </b-dropdown>
</template>

<script>
export default {
  name: "FilterBoxMulti",
  props: ['type','data', 'whichpage'],
  computed: {
    query_params: function (){
      let params = {path: this.whichpage,
                    query: {}}

      for(let i=0; i<this.checkedRows.length; i++){
        params.query[`${this.type}${i}`]=this.checkedRows[i][this.type]
      }

      return params
    }
  },
  mounted() {
    this.makeChecked()
  },
  data() {
    const name='general_attribute.'+this.type
    return {
      name,
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
  methods: {
    doFilter(){
      if(this.type==="fos"){
        let checked = _.map(this.checkedRows, 'fos')
        console.log("doFilter fos", checked)
        this.$store.dispatch("dropdown_search/submit_fos_states", checked)
      }
      if(this.type==="venue"){
        let checked = _.map(this.checkedRows, 'venue')
        console.log("doFilter venue", checked)
        this.$store.dispatch("dropdown_search/submit_venue_states", checked)
      }
      if(this.type==="author"){
        let checked = _.map(this.checkedRows, 'author')
        console.log("doFilter author", checked)
        this.$store.dispatch("dropdown_search/submit_authors_states", checked)
      }
    },
    clear(){
      this.checkedRows=[]
    },
    makeChecked(){
      this.data.forEach(item => {
        if (item.checked){
          this.checkedRows.push(item)
        }
      })
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
