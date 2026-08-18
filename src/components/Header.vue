<script setup lang="ts">
import logo from '@/assets/logo.svg'
</script>

<template>
<header>
    <img :src="logo" alt="Logo" />
</header>
</template>

<style scoped>
header{
    display: flex;
    margin-bottom: 20px;
    justify-content: center;
}
img{
    width: 100px;
}
</style>