<script setup>
import { ref, computed, onMounted, watch } from "vue";

import { useStore } from "vuex";
import BaseCombobox from "./BaseCombobox.vue";
import DisplayAddedBoxs from "./DisplayAddedBoxs.vue";

const store = useStore();
const boxs = computed(() => store.state.boxs);
const inputQuery = ref("");

onMounted(() => {
  store.dispatch("fetchOrder");
});

const selectedBox = ref({});

function addNewBox() {
  // ajoute la quantité de la box à tous ces childs
  selectedBox.value.childs.forEach((child) => (child.qty = selectedBox.value.qty));

  store.dispatch("addBox", selectedBox.value);

  selectedBox.value = {};
}
const updateInput = (newInput) => (inputQuery.value = newInput);
</script>

<template>
  <div class="margin-btm">Ajouter box :</div>
  <BaseCombobox v-model="selectedBox" :options="boxs" placeholder="référence box"
    :emptyPlaceholder="'Aucune box trouver'" :propertyToDisplay="'sku'" :query="inputQuery"
    @update:queryValue="updateInput" />
  .
  <input min="1" v-model.number="selectedBox.qty" v-show="selectedBox.sku" placeholder="Ajouter quantité"
    type="number" />
  <button @click="addNewBox" v-show="selectedBox.qty && selectedBox.sku">
    Ajoutez Box
  </button>
  <DisplayAddedBoxs></DisplayAddedBoxs>
</template>

<style scoped>
.h3-box {
  margin-top: 1rem;
}
</style>
