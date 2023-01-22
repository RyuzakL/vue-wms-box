<script setup>
  import { ref, reactive, onMounted } from 'vue';

  const order = ref([])
  const inputRef = ref('')
  const isRefAdd = ref(false)

  const box = reactive({
    sku : "",
    quantity : 1
  })

  onMounted(async () => {
    const res = await fetch('http://localhost:3000/orders')
    const data = await res.json()
    order.value = data
  })

  onMounted(async () => {
    const res = await fetch('http://localhost:4000/box')
    const data = await res.json()
    console.log(data)
    // order.value = data
  })

  function addRefOrder() {
    console.log(order.value[0].reference)
    order.value[0].reference = inputRef.value
    isRefAdd.value = true

    console.log(order.value)
  }

  function isValidInput(e) {
    if(!e.key.match((/^[A-Za-z0-9\-\_]+$/))) e.preventDefault()
  }



</script>

<template>
  <div class="container">
    <h2>Ref commande :</h2>
    <form @submit.prevent="addRefOrder">
      <input v-model="inputRef" @keypress="isValidInput" type="text">
    </form>
    <div >
      <button v-show="inputRef" @click="addRefOrder">
        Ajouter order
      </button >
    </div>
  <div v-if="isRefAdd" class="ref-message">
      ref bien ajouter !
    </div>
    <hr>

    <h2>Ajouter box</h2>
        <div>
          <span>Ajoutez sku BOX => </span>
          <input v-model="box.sku" type="text">
          {{ box.sku }}
        </div>

        <div>
          <span>Ajoutez quantité box => </span>
          <input v-model.number="box.quantity" type="number">
          {{ box.quantity }}
        </div>

        <button v-show="box.sku" >Ajouter box</button>
  </div>
</template>

<style scoped>
.container {
  margin: 0 auto;
  width: 80%;
  max-width: 1200px;
}
</style>
