import { ref, computed } from "vue"; 
// 👉 `ref` sirve para crear variables reactivas
// 👉 `computed` sirve para crear valores derivados de otras reactividades

// 📌 Importamos la función principal de Pinia
import { defineStore } from "pinia"; 
// 👉 `defineStore` es lo que usamos para definir un store global

// 📌 Definimos un store llamado "counter"
export const useCounterStore = defineStore("counter", () => {
  // 🟢 Estado (state global)
  const count = ref(0); 
  // 👉 `count` empieza en 0
  // 👉 Es global, lo podrás usar en cualquier componente que importe este store

  // 🟣 Getter (valor calculado)
  const doubleCount = computed(() => count.value * 2);
  // 👉 `doubleCount` depende de `count`
  // 👉 Cada vez que `count` cambie, este valor también se recalcula
  // 👉 No lo usamos en este archivo, sino que se usará en los componentes
  //    para mostrar el doble del contador automáticamente

  // 🔵 Acción para incrementar
  function increment():void {
    count.value++;
    console.log("Incrementado en 1");
  }
  // 👉 Se usará en los componentes para aumentar el contador en +1

  // 🔵 Acción para decrementar
  function decrement():void {
    count.value--;
    console.log("Decrementado en 1");
  }
  // 👉 Se usará en los componentes para reducir el contador en -1

  // 📌 Retornamos lo que queremos exponer fuera del store
  return { count, doubleCount, increment, decrement };
  // 👉 Todo lo que retornes aquí estará disponible en los componentes
  //    Ejemplo: `counter.count`, `counter.increment()`, etc.
});
