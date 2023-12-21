<script setup lang="ts">
import Map from './Map.vue'
import Timeline from "./Timeline.vue"
</script>

<template>
  <article class="veracruz">
    <Timeline/>
    <Map/>
  </article>
</template>

<style lang="scss">
@use '../_colors';

article.veracruz {
  position: relative;
  background-color: black;
  width: 100%;

  display: grid;

  @media only screen and (min-width: 700px) {
    grid-template-columns: min-content minmax(0, 1fr);
  }

  @media only screen and (max-width: 700px) {
    grid-template-rows: min-content minmax(0, 1fr);

    .vc-map {
      grid-row: 1;
    }

    .vc-timeline {
      grid-row: 2;
    }
  }
}
</style>
