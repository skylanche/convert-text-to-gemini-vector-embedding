<script setup lang="ts">
import { ref } from 'vue'
import Header from '@/components/Header.vue'
import DOMPurify from 'dompurify'

const header1Txt = ref("Gemini Vector Embedding Generator")
const buttonTxt = ref("Get Embedding")
const textAreaInput = ref("")
const statusMessage = ref("")
let isLoading = ref(false)
const baseUrl = ref(import.meta.env.VITE_API_URL || "http://localhost:8000")

const embeddingOutput = ref("")

// Function to generate embedding
async function generateEmbedding(){

isLoading.value = true
  
const rawTextInput = textAreaInput.value.trim().replace(/\s+/g, ' ')

if(!rawTextInput){
  isLoading.value = false
  statusMessage.value = "Please enter some text to generate an embedding."
  clearStatus()
  return
}

const sanitizedInput = DOMPurify.sanitize(rawTextInput)
const requestEmbedding = {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({ text: sanitizedInput })
}

try{
const response = await fetch(`${baseUrl.value}/api/embed`, requestEmbedding)

if (response.status === 429) {
  const error = await response.json();

  statusMessage.value = error.error || "Too many requests. Please try again later.";

  clearStatus()

  return;
}

if (!response.ok) {
  statusMessage.value = "Request failed";
  isLoading.value = false

  clearStatus()

}else{
isLoading.value = false
}

const data = await response.json()

embeddingOutput.value = JSON.stringify(data.embedding)


}catch(err){
  console.error("Error generating embedding:", err)
}
}

function clearStatus(){

setTimeout(() => {
  statusMessage.value = ""
  }, 3000)

  }

</script>

<template>
<Header/>
<h1>{{header1Txt}}</h1>

  <textarea id="textInput" v-model="textAreaInput" rows="3" placeholder="Enter text..."></textarea>
  <button @click="generateEmbedding" :disabled="isLoading">
    {{ isLoading ? 'Loading...' : 'Generate Embedding' }}
  </button>

  <div id="status" v-if="statusMessage">{{statusMessage}}</div>

  <pre id="output">{{ embeddingOutput }}</pre>
</template>

<style scoped>
</style>
