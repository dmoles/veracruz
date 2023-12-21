<script setup lang="ts">

// ------------------------------------------------------------
// Imports

import {computed} from "vue";
import Markdown from 'vue3-markdown-it';

import archiveIcon from '../assets/images/archive.svg'
import closeIcon from '../assets/images/times-circle.svg'

import type {ArchiveDoc} from '../types/ArchiveDoc'

import {useDocumentStore} from "../stores/documents";

// ------------------------------------------------------------
// Properties

const props = defineProps<{
  doc: ArchiveDoc,
  xScale: number,
  yScale: number
}>()

// ------------------------------------------------------------
// Layout & CSS

const x = computed(() => props.doc.location.x)
const y = computed(() => props.doc.location.y)

const topPx = computed(() => {
  const yActual = y.value * props.yScale
  // console.log('topPx: %o * %o => %o', y.value, props.yScale, yActual)
  return `${yActual}px`
})

const leftPx = computed(() => {
  const xActual = x.value * props.xScale
  // console.log('leftPx: %o * %o => %o', x.value, props.xScale, xActual)
  return `${xActual}px`
})

const style = computed(() => `top: ${topPx.value}; left: ${leftPx.value};`)

const inputId = computed(() => `docView-${props.doc.id}`)

// ------------------------------------------------------------
// Navigation

const {docSelected, shortDesc, nextDocAfter, prevDocBefore} = useDocumentStore()

const visible = docSelected(props.doc)
const nextDoc = nextDocAfter(props.doc)
const prevDoc = prevDocBefore(props.doc)

function selectNext() {
  visible.value = false
  let nd = nextDoc.value;
  if (nd) {
    const nextSelected = docSelected(nd);
    nextSelected.value = true
  }
}

function selectPrev() {
  visible.value = false
  let pd = prevDoc.value;
  if (pd) {
    const prevSelected = docSelected(pd);
    prevSelected.value = true
  }
}
</script>

<template>
  <div class="vc-document" :style="style">
    <input :id="inputId" type="checkbox" v-model="visible">
    <label class="vc-document-icon" :for="inputId"><img class="vc-icon" :src="archiveIcon" alt="document"/></label>
    <div class="vc-document-details">
      <input :id="`details-${inputId}`" type="checkbox" v-model="visible">
      <div class="vc-document-header">
        <h3>{{ shortDesc(doc).value }}</h3>
        <label class="vc-document-close" :for="`details-${inputId}`">
          <img class="vc-icon" :src="closeIcon" alt="document"/>
        </label>
      </div>
      <img class="vc-document-img" :src="doc.src" alt="doc.id"/>
      <div class="vc-document-details-text">
        <Markdown :source="doc.description" class="vc-document-details-description"/>
        <nav class="vc-prevnext">
          <button class="vc-prev" v-if="prevDoc" @click="selectPrev">« {{ shortDesc(prevDoc).value }}</button>
          <button class="vc-next" v-if="nextDoc" @click="selectNext">{{ shortDesc(nextDoc).value }} »</button>
        </nav>
        <section class="vc-citation">
          <h4>Source</h4>
          <Markdown :source="doc.citation"/>
          <p class="source-url"><a target="_blank" :href="doc.srcUrl">{{ doc.srcUrl }}</a></p>
          <p class="view-orig"><a target="_blank" :href="doc.viewUrl">View original ↗️</a></p>
        </section>
      </div>
    </div>
  </div>
</template>

<style lang="scss">
div.vc-document {
  @import url('https://fonts.googleapis.com/css2?family=Chivo:ital,wght@0,300;0,500;0,700;0,900;1,300;1,500;1,700;1,900&display=swap');
  @import url('https://fonts.googleapis.com/css2?family=EB Garamond:ital,wght@0,400;0,700;1,400;1,700&display=swap');

  position: absolute;
  display: grid;
  grid-template-columns: min-content minmax(0, 1fr);
  justify-content: start;
  gap: 0.5rem;

  input[type=checkbox] {
    display: none;

    &:not(:checked) ~ div.vc-document-details {
      display: none;
    }

    // TODO: share styles w/label hover
    &:checked ~ label.vc-document-icon {
      img {
        filter: invert(1);
        transition: filter 0.25s;
      }

      background: black;
      box-shadow: 0 0 3px 1px black;
      transition: background 0.25s, box-shadow 0.25s;
    }
  }

  img.vc-icon {
    display: block;
    height: 1rem;
    width: 1rem;
  }

  label.vc-document-icon {
    grid-column: 1;
    grid-row: 1;

    z-index: 1;

    display: block;
    width: min-content;
    height: min-content;

    // TODO: share styles w/checked checkbox
    &:hover {
      img {
        filter: invert(1);
        transition: filter 0.25s;
      }

      background: black;
      box-shadow: 0 0 3px 1px black;
      transition: background 0.25s, box-shadow 0.25s;
    }
  }

  div.vc-document-details {
    position: relative;

    z-index: 2;

    grid-row: 1;
    grid-column: 2;

    background-color: white;
    box-shadow: 0 0 3px 1px black;

    @media only screen and (min-width: 700px) {
      display: grid;
      grid-template-columns: min-content minmax(0, 1fr);
      grid-template-rows: min-content minmax(0, 1fr);

      img.vc-document-img {
        grid-row: 1 / 3;
        grid-column: 1;
      }
      div.vc-document-header {
        grid-row: 1;
        grid-column: 2;
      }
      div.vc-document-details-text {
        grid-row: 2;
        grid-column: 2;
      }
    }

    @media only screen and (max-width: 700px) {
      display: flex;
      flex-direction: column;
    }

    img.vc-document-img {

      display: block;
      max-width: 300px;
      max-height: 300px;
    }

    div.vc-document-header {
      display: flex;

      h3 {
        font-family: Chivo, sans-serif;
        font-weight: bold;
        font-size: 1.2rem;
        padding: 0.5rem;
      }

      label.vc-document-close {
        margin-left: auto;
        padding: 0.3rem;
      }
    }


    div.vc-document-details-text {
      max-width: 300px;
      padding: 0.5rem;
      font-family: EB Garamond, serif;
      font-size: 1rem;
      line-height: 1.2em;

      display: flex;
      flex-direction: column;
      justify-content: flex-start;

      section.vc-citation {
        justify-self: flex-end;
        margin-top: auto;
        font-size: 0.6rem;
        line-height: 1.2em;
        font-family: Chivo, sans-serif;

        h4 {
          font-family: Chivo, sans-serif;
          font-weight: bold;
          font-size: 0.7rem;
          line-height: 1.2em;
          margin-bottom: 0.2em;
        }

        p {
          margin-top: 0.4em;

          &.view-orig {
            font-size: 0.8rem;
            line-height: 1.2em;
            text-align: right;
            margin-top: 0.4rem;
          }
        }
      }
    }

    em {
      font-style: italic;
    }

  }

  nav.vc-prevnext {
    display: grid;
    grid-template-columns: 50% 50%;

    margin-top: 0.4rem;
    margin-bottom: 1rem;

    button {
      display: block;
      appearance: none;
      background: white;
      border: none;
      font-size: 0.8rem;
      font-family: Chivo, sans-serif;
      white-space: nowrap;
      padding: 0;
      margin: 0;
      text-decoration: underline;

      &.vc-prev {
        grid-column: 1;
        justify-self: start;
        padding-right: 0.25rem;
      }

      &.vc-next {
        grid-column: 2;
        justify-self: end;
        padding-left: 0.25rem;
      }
    }
  }
}
</style>
