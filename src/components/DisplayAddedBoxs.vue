<script setup>
import { useStore } from "vuex";
import { computed } from "vue";
const store = useStore();
const addedBoxs = computed(() => store.state.addedBoxs);
</script>

<template>
  <h3 class="h3-box" v-show="addedBoxs.length > 0">Box ajoutée(s) :</h3>
  <div v-for="(addedBox, index) in addedBoxs" :key="index" class="display-current-box">
    <details>
      <summary class="container-current-box">
        N°{{ index + 1 }} | SKU: {{ addedBox.sku }} - QTY: {{ addedBox.qty }}
      </summary>
      <div class="container-child-current-box">
        Composants de la box :
        <div v-for="(child, index) in addedBox.childs" :key="index">
          - {{ child.sku }}
        </div>
      </div>
    </details>
  </div>
</template>

<style scoped>
.container-current-box {
  background-color: white;
  padding: 1rem 1.3rem;
  width: fit-content;
  border-radius: 20px;
}

.container-current-box {
  margin-top: 1rem;
}

.container-child-current-box {
  padding: 1rem 1.3rem;
}

.container-child-current-box>* {
  margin-top: 0.5rem;
}
</style>
