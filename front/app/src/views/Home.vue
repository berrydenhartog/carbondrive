<template>
  <div class="myhome">
    <HeroBar title="Online tegen eerlijke kosten" subtitle="Web design en hosting voor iedereen toegankelijk" :background="require('@/assets/Home-JP.jpg')" />
    <section>
      <div class="container mainpadding">
        <div class="content">
          <span class="is-size-6-mobile">
          Unique buying reason
          </span>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
// @ is an alias to /src
import HeroBar from '@/components/HeroBar.vue'

export default {
  name: 'Home',
  components: {
    HeroBar,
  }
}
</script>
