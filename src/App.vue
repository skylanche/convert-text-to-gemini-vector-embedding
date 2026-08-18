<script setup lang="ts">
import { ref } from 'vue'
import Header from '@/components/Header.vue'

const header1Txt = ref("Gemini Vector Embedding Generator")
const buttonTxt = ref("Get Embedding")
</script>

<template>
<Header/>
<h1>{{header1Txt}}</h1>

  <textarea id="textInput" rows="3" placeholder="Enter text..."></textarea>
  <button onclick="generateEmbedding()">{{buttonTxt}}</button>

  <pre id="output"></pre>
</template>

<style scoped>
</style>
