<script setup>
import { ref, computed, onMounted, reactive } from "vue";

import { useStore } from "vuex";
import BaseCombobox from "./BaseCombobox.vue";
import DisplayAddedBoxs from "./DisplayAddedBoxs.vue";

const store = useStore();
const boxs = computed(() => store.state.boxs);
const inputQuery = ref("");

onMounted(() => {
  store.dispatch("fetchBoxs");
  store.dispatch("fetchOrder");
});

const selectedBox = reactive({
  refBox: "",
  boxQty: 1,
});

function addNewBox() {
  const currentBox = boxs.value
    .filter((box) => box.sku === selectedBox.refBox)
    .pop();

  currentBox.childs.forEach((child) => (child.qty = selectedBox.boxQty));

  store.dispatch("addBox", {
    sku: selectedBox.refBox,
    qty: selectedBox.boxQty,
    childs: currentBox.childs,
  });

  selectedBox.refBox = "";
  selectedBox.boxQty = 1;
}
const updateInput = (newInput) => (inputQuery.value = newInput);
</script>

<template>
  <div class="margin-btm">Ajouter box :</div>
  <BaseCombobox
    v-model="selectedBox.refBox"
    :options="boxs"
    placeholder="référence box"
    :propertyToDisplay="'sku'"
    :query="inputQuery"
    @update:queryValue="updateInput"
  />
  .
  <input
    min="1"
    v-model.number="selectedBox.boxQty"
    v-show="selectedBox.refBox"
    placeholder="Ajouter quantité"
    type="number"
  />
  <button @click="addNewBox" v-show="selectedBox.boxQty && selectedBox.refBox">
    Ajoutez Box
  </button>
  <DisplayAddedBoxs></DisplayAddedBoxs>
</template>

<style scoped>
.h3-box {
  margin-top: 1rem;
}
</style>
