<template>
  <b-dropdown aria-role="list">
    <button class="button is-light" type="button" slot="trigger">
      <template>
        <span v-if="checked.length === 0">{{ $t(this.name) }}</span>
        <span v-else class="has-text-info">{{checked.length}} {{$t(this.name)}}</span>
      </template>
      <b-icon icon="menu-down"></b-icon>
    </button>

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
          :checked-rows.sync="checked_rows"
          :is-row-checkable="(row) => true"
          checkable
        >
          <template slot-scope="props">
            <template v-for="column in columns">
              <b-table-column :key="column.id" v-bind="column">
                <template
                  v-if="column.searchable "
                  slot="searchable"
                  slot-scope="props">
                  <b-input
                    v-model="props.filters[props.column.field]"
                    :placeholder="placeholder"
                    icon="magnify"
                    size="is-small" />
                </template>
                {{ props.row[column.field] }}
              </b-table-column>
            </template>
          </template>
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
export default {
  name: "FilterBoxMulti",
  props: ['type', 'whichpage', 'data', 'checked'],
  watch: {
    checked() {
      this.checked_rows = this.checked
    }
  },
  computed: {
    apply_path: function (){
      let params = {
        path: this.whichpage,
        query: {}
      }
      // console.log('selected ',this.checked_rows)
      params.query[this.type] = []
      for(let i=0; i<this.checked_rows.length; i++){
        let field_name = this.checked_rows[i][this.type].replace(/ /g, '-')
        if(Object.keys(this.checked_rows[i]).includes(this.type+'_id')){
          params.query[this.type].push(field_name+'-'+this.checked_rows[i][this.type+'_id'])
        }
        else{
          params.query[this.type].push(field_name)
        }
      }
      return params
    },
    clear_path: function (){
      let params = {path: ""}
      let re = new RegExp("[&|?]"+this.type+"=.+(?=&)", "g")
      let current = this.whichpage+"&"
      params['path'] = current.replace(re,"").slice(0, -1)
      return params
    }
  },
  data() {
    const name='general_attribute.'+this.type
    return {
      name,
      placeholder:this.$t('general_attribute.search_bar__filter.'+this.type),
      checked_rows: this.checked,
      columns: [
        {
          field: this.type,
          label: this.$t(name),
          searchable: true,
        },
        {
          field: 'count',
          label: this.$t('general_attribute.count'),
          numeric: true
        }
      ]
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
