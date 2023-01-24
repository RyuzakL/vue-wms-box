<script setup>
import { ref, reactive, onMounted } from "vue";
import RefCommand from "@/components/RefCommand.vue";
import fetchHelper from "@/helper/fetchHelper";
import SkuBox from "@/components/SkuBox.vue";

const orders = ref([]);
const boxs = reactive({
  sku: "",
  quantity: 1,
});

onMounted(() => {
  // à modifer (promise.all) \\
  fetchHelper
    .getOrders()
    .then((res) => (orders.value = res.data))
    .catch((err) => console.error(err.message));

  fetchHelper
    .getBoxs()
    .then((res) => (boxs.value = res.data))
    .catch((err) => console.error(err.message));
});

function updateRefOrders(newRef) {
  orders.value[0].reference = newRef;
}
</script>

<template>
  <div class="container">
    <h1>Commande box</h1>

    <RefCommand :orders="orders" @add-new-ref="updateRefOrders"></RefCommand>

    <div>
      <SkuBox :boxs="boxs"></SkuBox>
    </div>

    <div>
      <span>Ajoutez quantité box => </span>
      <input v-model.number="boxs.quantity" type="number" />
      {{ boxs.quantity }}
    </div>

    <button v-show="boxs.sku">Ajouter box</button>
  </div>
</template>

<style>
.container {
  margin: 0 auto;
  width: 80%;
  max-width: 1200px;
}
</style>
