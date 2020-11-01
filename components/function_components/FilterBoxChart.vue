<template>
  <b-dropdown aria-role="list">
    <button class="button is-light" type="button" slot="trigger">
      <template>
        <span  v-if="checked[0] === init_year && checked[1] === current_year">{{ $t(this.name) }}</span>
        <span class="has-text-info" v-else>{{checked[0]}} - {{checked[1]}}</span>
      </template>
      <b-icon icon="menu-down"></b-icon>
    </button>

    <!------------------------------------- YEAR DROPDOWN ------------------------------------------>
    <b-dropdown-item
      :focusable="false"
      custom
    >
      <div class="time_option_container">
        <nuxt-link class="button is-light is-fullwidth"
                   :to="{path:this.whichpage, query:{from_year:this.current_year, end_year:this.current_year}}"
                   tag="button">
          {{ $t('recent_year') }}
        </nuxt-link>
        <nuxt-link class="button is-light is-fullwidth"
                   :to="{path:this.whichpage, query:{from_year:this.current_year-3, end_year:this.current_year}}"
                   tag="button">
          {{ $t('3_year') }}
        </nuxt-link>
        <nuxt-link class="button is-light is-fullwidth"
                   :to="{path:this.whichpage, query:{from_year:this.current_year-5, end_year:this.current_year}}"
                   tag="button">
          {{ $t('5_year') }}
        </nuxt-link>
        <br>
        <section>
          <b-field>
            <b-slider
              v-model="year_range"
              :min="init_year"
              :max="current_year"
              :step="2"
              ticks
            >
            </b-slider>
          </b-field>
        </section>
        <br>
        <nav class="level">
          <div class="level-left">
            <div class="level-item">
              <b-field :label="$t('from')" :label-position="'on-border'">
                <b-input v-model="year_range[0]" size="is-small" style="width: 100px"></b-input>
              </b-field>
            </div>
          </div>
          <div class="level-right">
            <div class="level-item">
              <b-field :label="$t('to')" :label-position="'on-border'">
                <b-input v-model="year_range[1]" size="is-small" style="width: 100px"></b-input>
              </b-field>
            </div>
          </div>
        </nav>
        <CitationBar
          :dataset="chart_data_values"
          :labels="chart_data_labels"
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
                       :to="{path:this.whichpage, query:{from_year:this.year_range[0], end_year:this.year_range[1]}}"
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
  props: ['checked', 'type','chart_data', 'whichpage'],
  computed: {
    clear_path: function () {
      let params = {path: ""}
      let re = new RegExp("[&|?](from|end)year=\\d+(?=&)", "g")
      let current = this.whichpage+"&"
      params['path'] = current.replace(re,"").slice(0, -1)
      return params
    },
  },
  data() {
    const name='general_attribute.'+ this.type

    return {
      name,
      init_year: 1930,
      current_year: new Date().getFullYear(),

      year_range: this.checked,
      chart_data_labels: this.chart_data.label,
      chart_data_values: this.chart_data.data,
    }
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
