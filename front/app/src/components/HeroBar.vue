<template>
  <div class="myhero">
    <section class="hero is-medium" v-bind:class="myclass"  v-bind:style="{ backgroundImage: 'url(' + background + ')' }">
      <div class="hero-body">
        <div class="container" >
          <div class="box">
            <h1 class="title is-uppercase is-size-6-mobile">
              <span>{{title}}</span>
            </h1>
            <h2 class="subtitle is-size-6-mobile">
              <span>{{subtitle}}</span>
            </h2>
          </div>
        </div>
      </div>
    </section> 
  </div>
</template>

<script>
export default {
  name: 'HeroBar',
  props: {
    title: String,
    subtitle: String,
    background: String,
    myclass: Object,
  }
}
</script>