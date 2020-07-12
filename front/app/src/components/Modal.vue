<template>
  <div class="mymodal">     
        <div v-bind:class="{'is-active':isactive}" class="modal">
          <div class="modal-background"></div>
          <div class="modal-card">
            <header class="modal-card-head">
              <p class="modal-card-title">{{title}}</p>
              <button  @click="close" class="delete" aria-label="close"></button>
            </header>
            <section class="modal-card-body">
              <span v-html="rawHtml"></span>
            </section>
            <footer class="modal-card-foot">
              <button @click="close" class="button">Sluiten</button>
            </footer>
          </div>
        </div> 
  </div>
</template>

<script>
export default {
  name: 'Modal',
  props: {
    title: {
      type: String,
      default: "title",
    },
    isactive: {
      type: Boolean,
      default: false,
    },
    rawHtml: {
      type: String,
      default: "content", 
    }
  },
  methods: {
    close() {
      this.$emit('clicked', false)
    },
  }
}
</script>