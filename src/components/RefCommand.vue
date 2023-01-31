<script setup>
import { computed } from "vue";
import { useStore } from "vuex";

const store = useStore();
const order = computed({
  get: () => store.state.order,
  set: (newRef) => {
    store.dispatch("updateOrderRef", newRef);
  },
});

function isValidInput(e) {
  if (!e.key.match(/^[A-Za-z0-9\-_]+$/)) e.preventDefault();
}
</script>

<template>
  <div v-if="order" class="margin-btm">
    <div class="margin-btm">Ajouter référence commande :</div>
    <input
      v-model="order.reference"
      @keypress="isValidInput"
      type="text"
      placeholder="référence commande"
    />
  </div>
</template>
