<template>
  <div class="tile is-ancestor">
    <div class="tile is-parent is-8 is-vertical">
      <nav class="pagination is-centered" role="navigation" aria-label="pagination">
        <a class="pagination-previous pagi-button" @click="handlePreviousandNext(true)">Trang trước</a>
        <a class="pagination-next pagi-button" @click="handlePreviousandNext(false)">Trang sau</a>

        <!-- for example 1 2 3 4 ... 10 11 12 13-->
        <ul class="pagination-list" v-if="isPaginationReStyle === 0">
          <li v-for="page in Array.from(Array(this.page_num).keys()).slice(0,4)"
            @click="handlePageChange(page+1)">
            <a class="pagination-link pagi-button" :aria-label="'Goto page ' + (page+1)">
              {{page + 1}}
            </a>
          </li>
          <li v-if="(total_count/this.per_page)-5 > 0">
            <span class="pagination-ellipsis">&hellip;</span>
          </li>
          <li v-for="page in Array.from(Array(this.page_num).keys()).slice(Math.max(this.total_count - 4, 1))"
            @click="handlePageChange(page)">
            <a class="pagination-link pagi-button" :aria-label="'Goto page ' + (page+1)">
              {{page + 1}}
            </a>
          </li>
        </ul>

        <!-- for example 1 ... 4 5 6 7... 10 11 12 13-->
        <ul class="pagination-list" v-if="isPaginationReStyle === 1">
          <li>
            <a class="pagination-link pagi-button" aria-label="Goto page 1">
              1
            </a>
          </li>
          <li>
            <span class="pagination-ellipsis">&hellip;</span>
          </li>
          <li v-for="page in Array.from(Array(this.page_num).keys()).slice(this.current_page-1,Math.min(this.current_page+3, this.total_count-4))"
            @click="handlePageChange(page+1)">
            <a class="pagination-link pagi-button" :aria-label="'Goto page ' + (page+1)">
              {{page + 1}}
            </a>
          </li>
          <li>
            <span class="pagination-ellipsis">&hellip;</span>
          </li>
          <li v-for="page in Array.from(Array(this.page_num).keys()).slice(Math.max(this.total_count - 4, 1))"
            @click="handlePageChange(page)">
            <a class="pagination-link pagi-button" :aria-label="'Goto page ' + (page+1)">
              {{page + 1}}
            </a>
          </li>
        </ul>

        <!-- for example 1 ... 9 10 11 12 13-->
        <ul class="pagination-list" v-if="isPaginationReStyle === 2">
          <li>
            <a class="pagination-link pagi-button" aria-label="Goto page 1">
              1
            </a>
          </li>
          <li>
            <span class="pagination-ellipsis">&hellip;</span>
          </li>

          <li v-for="page in Array.from(Array(this.page_num).keys()).slice(this.current_page-1,this.current_page+4)"
            @click="handlePageChange(page)">
            <a class="pagination-link pagi-button" :aria-label="'Goto page ' + (page+1)">
              {{page + 1}}
            </a>
          </li>
        </ul>

      </nav>
    </div>
  </div>
</template>

<script>
export default {
  name: "Pagination",
  props: ["total_count"],
  data() {
    return {
      current_page: 1,
      per_page: 10,
      isPaginationReStyle: 0
    }
  },
  computed:{
    page_num: function () {
      return Math.ceil(this.total_count/this.per_page)
    }
  },
  methods:{
    async handlePageChange(current_page) {
      if ((this.total_count/this.per_page) > 5) {
        if (current_page >= 4 && current_page <= (this.total_count / this.per_page) - 5) {
          this.isPaginationReStyle = 1
          this.current_page = current_page
        } else if (current_page === (this.total_count / this.per_page) - 4) {
          this.isPaginationReStyle = 2
          this.current_page = current_page
        } else {
          this.isPaginationReStyle = 0
          this.current_page = current_page
        }
      }
      else{
        this.current_page = current_page
      }


      let start = (this.current_page - 1) * this.per_page;
      let size = this.per_page;
      let page = this.current_page;
      this.$emit("update_page", start, size, page)
    },
    handlePreviousandNext(isPrevious) {
      if (isPrevious) {
        this.current_page = Math.max(1, this.current_page - 1)
        this.handlePageChange(this.current_page)
      } else {
        this.current_page = Math.min(this.current_page + 1, this.page_num)
        this.handlePageChange(this.current_page)
      }
    }
  }
}
</script>

<style scoped>

</style>
