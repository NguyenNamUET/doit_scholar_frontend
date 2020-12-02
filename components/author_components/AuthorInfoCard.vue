<template>
  <div class="card_wrapper">
    <div class="content_box">
      <p class="author_name">
        <b>{{name}}</b>
      </p>
      <table style="width: 100%">
        <tr v-if="paper_length > 0">
          <td style="width: 90%">
            <span class="text-class-3 color-class-3">{{ $t('author_detail_page.author_info.publication') }} </span>
          </td>
          <td>
            <span class="author_stat">
              {{paper_length | formatNumber}}
            </span>
          </td>
        </tr>
        <tr>
          <td>
            <span class="text-class-3 color-class-3">{{ $t('author_detail_page.author_info.highlighted_citation') }}</span>
          </td>
          <td>
            <span class="author_stat">{{influentialCitationCount | formatNumber}}</span>
          </td>
        </tr>
        <tr>
          <td>
            <span class="text-class-3 color-class-3">H-index</span>
          </td>
          <td>
            <span class="author_stat">{{hIndex | formatNumber}}</span>
          </td>
        </tr>
      </table>
    </div>
  </div>
</template>

<script>
import {formatNumber} from "assets/utils";

export default {
  name: "AuthorInfoCard",
  props: {
    name: {
      type: String,
      required: true
    },
    paper_length: {
      type: Number,
      required: true
    },
    influentialCitationCount: {
      type: Number,
      required: true
    },
    hIndex: {
      type: Number,
      required: true
    },
  },
  filters: {
    formatNumber(value) {
      return formatNumber(value)
    }
  }
}
</script>

<style scoped>
  .author_name {
    font-size: 24px;
    font-weight: 600;
  }
  .author_stat {
    font-weight: 700;
    color: #dc710f;
    font-size: 14px;
  }
</style>
