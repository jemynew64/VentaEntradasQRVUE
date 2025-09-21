<script setup>
import { useMultiplicationStore } from "@/store/multiplication"; // importamos el store

const counter = useMultiplicationStore(); // conectamos el store
</script>

<template>
  <div>
    <p>Contador: {{ counter.number }}</p>
    <p>El doble: {{ counter.doubleNumber}}</p>
<div class="bg-white p-6">
  <button class="btn btn-neutral btn-outline" @click="counter.duplicate"> * 2 </button>
  <button class="btn btn-neutral btn-dash" @click="counter.dividition"> / 2 </button>
</div>
    </div>
</template>