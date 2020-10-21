<template>
  <b-dropdown aria-role="list">
    <button class="button is-light" type="button" slot="trigger">
      <template>
        <span>{{ $t(this.name) }}</span>
      </template>
      <b-icon icon="menu-down"></b-icon>
    </button>

    <!------------------------------------- YEAR DROPDOWN ------------------------------------------>
    <b-dropdown-item
      :focusable="false"
      custom
    >
      <div class="time_option_container">
        <p class="button is-light">{{ $t('recent_year')}}</p>
        <p class="button is-light">{{ $t('3_year')}}</p>
        <p class="button is-light">{{ $t('5_year')}}</p>
        <br>
        <nav class="level">
          <div class="level-left">
            <div class="level-item">
              <b-field :label="$t('from')" :label-position="'on-border'">
                <b-input v-model="fromyear" size="is-small" style="width: 100px"></b-input>
              </b-field>
            </div>
          </div>
          <div class="level-right">
            <div class="level-item">
              <b-field :label="$t('to')" :label-position="'on-border'">
                <b-input v-model="endyear" size="is-small" style="width: 100px"></b-input>
              </b-field>
            </div>
          </div>
        </nav>
        <CitationBar
          :dataset="this.chartdata.data"
          :labels="this.chartdata.label"
          :title="$t('general_attribute.publication')"
        >
        </CitationBar>
        <nav class="level">
          <div class="level-left">
            <nuxt-link class="level-item button is-danger"
                       :to="this.clear_path"
                       tag="button">
              {{ $t('general_attribute.clear') }}
            </nuxt-link>
          </div>
          <div class="level-right">
            <nuxt-link class="level-item button is-success"
                       :to="{path:this.whichpage, query:{fromyear:this.fromyear, endyear:this.endyear}}"
                       tag="button">
              {{ $t('general_attribute.apply') }}
            </nuxt-link>
          </div>
        </nav>
      </div>
    </b-dropdown-item>
        <!------------------------------------- YEAR DROPDOWN ------------------------------------------>

  </b-dropdown>
</template>

<script>
import CitationBar from "@/components/search_page/CitationBar";
export default {
  name: "FilterBoxChart",
  components: {CitationBar},
  props: ['type','data', 'whichpage'],
  computed: {
    clear_path: function (){
      let params = {path: ""}
      let re = new RegExp("[&|?](from|end)year=\\d+(?=&)", "g")
      let current = this.whichpage+"&"
      console.log("clear_path", re)
      params['path'] = current.replace(re,"").slice(0, -1)
      console.log("params", params['path'])
      return params
    },
  },
  data() {
    const name='general_attribute.'+this.type
    return {
      name,
      chartdata: [],
      fromyear: 0,
      endyear: 2020
    }
  },
  beforeUpdate() {
    this.chartdata = this.data
  },
  i18n: {
    messages: {
      en: {
        "recent_year": "This Year",
        "3_year": "Recent 3 Years",
        "5_year": "Recent 5 Years",
        "from": "From year",
        "to": 'To year'
      },
      vi: {
        "recent_year": "Năm nay",
        "3_year": "3 năm gần đây",
        "5_year": "5 năm gần đây",
        "from": "Từ năm",
        "to": 'Đến năm'
      }
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
