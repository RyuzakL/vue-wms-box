<script setup>
import { ref, computed, onMounted } from "vue";

import { useStore } from "vuex";
import BaseCombobox from "./BaseCombobox.vue";
import DisplayAddedBoxs from "./DisplayAddedBoxs.vue";

const store = useStore();
const boxs = computed(() => store.state.boxs);
const inputQuery = ref("");

onMounted(() => {
  store.dispatch("fetchOrder");
});

const selectedBox = ref({
  sku: "",
  boxQty: 1,
});

function addNewBox() {
  const currentBox = boxs.value
    .filter((box) => box.sku === selectedBox.value.sku)
    .pop();

  currentBox.childs.forEach((child) => (child.qty = selectedBox.value.boxQty));

  store.dispatch("addBox", {
    sku: selectedBox.value.sku,
    qty: selectedBox.value.boxQty,
    childs: currentBox.childs,
  });
  selectedBox.value.sku = "";
  selectedBox.value.boxQty = 1;
}
const updateInput = (newInput) => (inputQuery.value = newInput);
</script>

<template>
  <div class="margin-btm">Ajouter box :</div>
  <BaseCombobox
    v-model="selectedBox.sku"
    :options="boxs"
    placeholder="référence box"
    :emptyPlaceholder="'Aucune box trouver'"
    :propertyToDisplay="'sku'"
    :query="inputQuery"
    @update:queryValue="updateInput"
  />
  .
  <input
    min="1"
    v-model.number="selectedBox.boxQty"
    v-show="selectedBox.sku"
    placeholder="Ajouter quantité"
    type="number"
  />
  <button @click="addNewBox" v-show="selectedBox.boxQty && selectedBox.sku">
    Ajoutez Box
  </button>
  <DisplayAddedBoxs></DisplayAddedBoxs>
</template>

<style scoped>
.h3-box {
  margin-top: 1rem;
}
</style>
