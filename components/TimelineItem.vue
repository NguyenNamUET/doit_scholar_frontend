<template>
    <div class="timeline-item is-primary">
      <div class="timeline-marker"></div>
      <div class="timeline-content">
          <p class="title is-5">{{paper.year}}</p>
          <h1 class="title">{{paper.name}}</h1>
          <div v-for="author in paper.authors" class="author-timeline">
            <span>{{author}}    </span>
          </div>
          <p v-if="isExpanded">
            {{this.description}}<a @click="collapse()">...Rút gọn</a>
          </p>
          <p v-else>
            {{this.description}}<a @click="expand()">...Xem thêm</a>
          </p>
      </div>
    </div>
</template>

<script>
    export default {
        name: "TimelineItem",
        data(){
          return{
            isExpanded: false,
            description: this.paper.description.slice(0, this.paper.description.length*0.2)
          }
        },
        props: {
                paper: {
                    type: Object
                }
        },
        methods:{
          collapse(){
            this.description = this.paper.description.slice(0, this.paper.description.length*0.2);
            this.isExpanded = false
          },
          expand(){
            this.description = this.paper.description;
            this.isExpanded = true
          }
        }
    }
</script>

<style scoped>
.author-timeline{
  display:inline;
}
</style>
