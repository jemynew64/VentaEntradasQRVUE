<script setup>
import { useCounterStore } from "@/store/counter"; // importamos el store

const counter = useCounterStore(); // conectamos el store
</script>

<template>
  <div>
    <p>Contador: {{ counter.count }}</p>
    <p>El doble: {{ counter.doubleCount }}</p>
<div class="bg-white p-6">
  <button class="btn btn-neutral btn-outline" @click="counter.increment"> + 1 </button>
  <button class="btn btn-neutral btn-dash" @click="counter.decrement"> - 1 </button>
</div>
    </div>
</template>