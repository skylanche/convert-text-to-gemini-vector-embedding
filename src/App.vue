<script setup lang="ts">
import { ref } from 'vue'
import Header from '@/components/Header.vue'
import DOMPurify from 'dompurify'

const header1Txt = ref("Gemini Vector Embedding Generator")
const buttonTxt = ref("Get Embedding")
const textAreaInput = ref("")


// Function to generate embedding
async function generateEmbedding(){

  const rawTextInput = textAreaInput.value.trim()

if(!rawTextInput){
  alert("Please enter some text to generate an embedding.")
  return
}  

const sanitizedInput = DOMPurify.sanitize(rawTextInput)

}



</script>

<template>
<Header/>
<h1>{{header1Txt}}</h1>

  <textarea id="textInput" v-model="textAreaInput" rows="3" placeholder="Enter text..."></textarea>
  <button @click="generateEmbedding">{{buttonTxt}}</button>

  <pre id="output"></pre>
</template>

<style scoped>
</style>
