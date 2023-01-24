<script setup>
import { ref } from "vue";
const inputRef = ref("");
const isRefAdd = ref(false);

const emit = defineEmits(["add-new-ref"]);

function addRefOrder(e) {
  inputRef.value = e.target.value;
  emit("add-new-ref", inputRef.value);
  isRefAdd.value = true;
}
function isValidInput(e) {
  if (!e.key.match(/^[A-Za-z0-9\-_]+$/)) e.preventDefault();
}
</script>

<template>
  <div>
    <span>Ajouter Ref Box => </span>
    <input
      :value="inputref"
      @input="addRefOrder"
      @keypress="isValidInput"
      type="text"
    />
  </div>
</template>
