<script setup lang="ts">
import {computed} from "vue";
import type {ArchiveDoc} from '../types/ArchiveDoc'
import {useDocumentStore} from "../stores/documents";

const props = defineProps<{
  doc: ArchiveDoc,
  tsMin: number,
  tsMax: number,
  tlHeight: number,
  tlOffset: number
}>()


const {docSelected, shortDesc} = useDocumentStore()

const inputId = computed(() => `tlEntry-${props.doc.id}`)

const visible = docSelected(props.doc)

function scale(n: number) {
  let ln = Math.log(n);
  return Math.pow(ln, 10)
}

const flexBasis = computed(() => {
  const tsRange = props.tsMax - props.tsMin
  const ts = props.doc.date.valueOf();
  const tsDiff = ts - props.tsMin;
  const scaleFactor = scale(tsDiff) / scale(tsRange)
  return `${(100 * scaleFactor)}%`
})

const entryStyle = computed(() => {
  return `flex-basis: ${flexBasis.value};`;
})

</script>

<template>
  <div class="vc-tl-entry" :style="entryStyle">
    <p>
      <input :id="inputId" type="checkbox" v-model="visible">
      <label :for="inputId">{{ shortDesc(doc).value }}</label>
    </p>
  </div>
</template>

<style lang="scss">
div.vc-tl-entry {
  display: flex;
  p {
    align-self: flex-end;
    margin-top: auto;
    margin-bottom: 1em;
    margin-left: -0.25rem;

    white-space: nowrap;
    font-family: Chivo, sans-serif;
    font-size: 1rem;
    line-height: 1.2em;

    input[type=checkbox] {
      display: none;

      &:checked ~ label {
        font-weight: bold;
      }
    }

    label {
      &::before {
        content: '—';
        margin-right: 0.5rem;
        font-weight: bold;
      }
    }
  }
}
</style>
