import { ref, computed } from "vue"; 
import { defineStore } from "pinia";

export const useMultiplicationStore = defineStore("multiplication",() =>{
    const number = ref(1);
    const doubleNumber = computed(() => number.value * 2);
    function duplicate ():void {
    number.value = number.value * 2;
    }
    function dividition():void {
        number.value = number.value / 2
    }
      
    return { number, doubleNumber, duplicate, dividition };

})