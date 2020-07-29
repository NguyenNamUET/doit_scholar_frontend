<template>
  <div class="container">
    <div class="tile is-ancestor is-vertical">

      <div class="tile is-parent is-8">
        <div class="tile is-child ">
          <article class="box">
            <b>{{this.name}}</b>
          </article>
        </div>

        <div class="tile is-child ">
          <article class="box">Topic</article>
        </div>
      </div>

      <div class="tile is-parent is-vertical">
        <div class="timeline">

          <div  v-for="item in this.papers">
            <TimelineItem v-bind:paper="item"></TimelineItem>
          </div>
        </div>
      </div>
    </div>
  </div>

</template>

<script>
    import TimelineItem from "../../components/TimelineItem";
    export default {
        name: "_topic_detail",
        components: {TimelineItem},
        data(){
          return{
            name: "Transformers",
            papers:[{"name": "HuggingFace's Transformers: State-of-the-art Natural Language Processing",
                    "description": "Transformers have a potential of learning longer-term dependency, " +
                      "but are limited by a fixed-length context in the setting of language modeling. " +
                      "We propose a novel neural architecture Transformer-XL that enables learning dependency beyond a fixed length without " +
                      "disrupting temporal coherence. It consists of a segment-level recurrence mechanism and a novel positional encoding scheme. " +
                      "Our method not only enables capturing longer-term dependency, but also resolves the context fragmentation problem.",
                     "authors": ["author_1","author_2","author_3"],
                     "year": 2019},
                    {"name":"BERT: Pre-training of Deep Bidirectional Transformers for Language Understanding",
                    "description": "Transformers have a potential of learning longer-term dependency, " +
                      "but are limited by a fixed-length context in the setting of language modeling. " +
                      "We propose a novel neural architecture Transformer-XL that enables learning dependency beyond a fixed length without " +
                      "disrupting temporal coherence. It consists of a segment-level recurrence mechanism and a novel positional encoding scheme. " +
                      "Our method not only enables capturing longer-term dependency, but also resolves the context fragmentation problem.",
                     "authors":["author_1","author_2"],
                     "year":2019},
                    {"name":"Transformer-XL: Attentive Language Models Beyond a Fixed-Length Context",
                    "description": "Transformers have a potential of learning longer-term dependency, " +
                      "but are limited by a fixed-length context in the setting of language modeling. " +
                      "We propose a novel neural architecture Transformer-XL that enables learning dependency beyond a fixed length without " +
                      "disrupting temporal coherence. It consists of a segment-level recurrence mechanism and a novel positional encoding scheme. " +
                      "Our method not only enables capturing longer-term dependency, but also resolves the context fragmentation problem.",
                     "authors":["author_1","author_2","author_3","author_4"],
                     "year":2015},
                    {"name":"Spatial Transformer Networks",
                    "description": "Transformers have a potential of learning longer-term dependency, " +
                      "but are limited by a fixed-length context in the setting of language modeling. ",
                     "authors":["author_1","author_2","author_3","author_4","author_5"],
                     "year":2010}]
          }
        }
    }
</script>

<style scoped>

</style>
