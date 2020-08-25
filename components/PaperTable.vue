<template>
  <b-table
    :data="is_empty ? [] : paper_data"
    :hoverable="true"
    :mobile-cards="true"
    :default-sort-direction="'desc'"
  >

    <template slot-scope="props">
      <b-table-column field="title" label="Tiêu đề">
        <nuxt-link
          :to="'/paper/' + formatTitle(props.row.title) + '.p' + '-' + props.row.corpusID"
        >
          {{props.row.title}}
        </nuxt-link>
      </b-table-column>

      <b-table-column v-if="props.row.authors !== undefined" field="name" label="Tác giả" >
        <ul>
          <li v-for="author in props.row.authors">
            <a :href="'/author/' + formatTitle(author.name) + '-' + author.authorId ">
              {{author.name}}
            </a>
          </li>
        </ul>
      </b-table-column>

      <b-table-column field="year" label="Năm" numeric sortable>
        {{ props.row.year }}
      </b-table-column>

      <b-table-column field="venue" label="Hội nghị">
        <span v-if="props.row.venue !== ''">{{props.row.venue}}</span>
        <span v-else>
          Chưa có thông tin
        </span>
      </b-table-column>

      <!--              <b-table-column field="intent" label="Kiểu trích dẫn">-->
      <!--                <ul>-->
      <!--                  <li v-for="intention in props.row.intent">-->
      <!--                    {{intention}}-->
      <!--                  </li>-->
      <!--                </ul>-->
      <!--              </b-table-column>-->
    </template>

    <template slot="empty">
      <section class="section">
        <div class="content has-text-grey has-text-centered">
          <p>Không có dữ liệu :(</p>
        </div>
      </section>
    </template>
  </b-table>
</template>

<script>
import {formatTitle} from 'assets/utils';
export default {
  name: "PaperTable",
  props: ['paper_data', 'is_empty'],
  methods: {
    formatTitle(title) {
      return formatTitle(title)
    }
  }
}
</script>

<style scoped>

</style>
