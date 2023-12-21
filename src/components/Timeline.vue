<script setup lang="ts">

// ------------------------------------------------------------
// Imports

import { storeToRefs } from "pinia"
import { computed } from "vue"

import { useDocumentStore } from "../stores/documents"
import { useGeometryStore } from '../stores/geometry'

import TimelineEntry from "./TimelineEntry.vue"

// ------------------------------------------------------------
// Stores

const { documents } = storeToRefs(useDocumentStore())
const { tsMin, tsMax } = useDocumentStore()

const geom = useGeometryStore()
const { mapHeight } = storeToRefs(geom)

// ------------------------------------------------------------
// Misc. constants

const tlOffset = 48 // TODO: something more accurate

const tlHeight = computed(() => {
  return mapHeight.value - (2 * tlOffset)
})

</script>

<template>
  <div class="vc-timeline">
    <h2>Timeline</h2>
    <div class="vc-timeline-entries">
      <TimelineEntry
        v-for="doc in documents"
        :doc="doc"
        :ts-min="tsMin"
        :ts-max="tsMax"
        :tlHeight="tlHeight"
        :tlOffset="tlOffset"
      />
    </div>
  </div>
</template>

<style lang="scss">
div.vc-timeline {
  background: #d4be90;
  border-right: 1px solid black;
  border-bottom: 3px solid black;
  padding: 1rem;
  display: block;
  height: 100%;
  box-sizing: border-box;

  h2 {
    text-transform: uppercase;
    font-family: Chivo, sans-serif;
    font-size: 1.2rem;
    font-weight: bold;
  }

  .vc-timeline-entries {
    display: flex;
    flex-direction: column;
    justify-content: space-between;

    margin-top: 1rem;
    border-left: 4px solid black;
    margin-left: 1rem;

    height: 50%;
    box-sizing: border-box;
    //li {
    //  display: block;
    //  //margin: 1rem;
    //  padding: 0;
    //
    //  button {
    //    display: block;
    //    appearance: none;
    //    background: none;
    //    border: none;
    //    font-family: EB Garamond, serif;
    //    font-size: 0.8rem;
    //    line-height: 1.2em;
    //    white-space: nowrap;
    //    padding: 0;
    //    margin: 0;
    //    text-decoration: underline;
    //  }
    //}
  }

}
</style>
