<template>
  <div class="myworkinprogress">
    <HeroBar title="Work in progress" :background="require('@/assets/under-construction.jpg')" />
    <section>
      <div class="container mainpadding">

      </div>
    </section>
  </div>
</template>

<script>
import HeroBar from '@/components/HeroBar.vue'

export default {
  name: 'WorkInProgress',
  data() {
    return {
    }
  },

  components: {
    HeroBar,
  },
}
</script>