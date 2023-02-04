<script setup>
import { ref, computed } from "vue";
import { useStore } from "vuex";
import router from "../router";
import fetchHelper from "../helper/fetchHelper";

const store = useStore();
const addedBoxs = computed(() => store.state.addedBoxs);
const order = computed(() => store.state.order);
const siteClient = computed(() => store.state.siteClient);

const errorMessage = ref("");
const isValid = ref(false);
const mergedChilds = ref([]);

const validateNewOrder = () => {
  mergedChilds.value = mergedDuplication();
  store.dispatch("updatesOrderItems", mergedChilds.value);
  try {
    const res = fetchHelper.postNewOrder({ newOrder: order.value });
    if (res.status !== 200) return;
    store.dispatch("setCommandRegisterd", true);
    router.push({ name: "registered" })
  } catch (err) {
    console.error(
      `il y a eu une erreur ${err.message} : [${err.response.status}]`
    );
    errorMessage.value = "Impossible d'envoyer la commande.";
  }
};

function mergedDuplication() {
  const childs = addedBoxs.value
    .map((box) => box.childs)
    .reduce((acc, value) => {
      return [...acc, ...value];
    }, [])
    .map((child) => ({ ...child, price: 0 }));

  // Utiliser un objet pour stocker les éléments uniques
  const uniqueElements = {};
  childs.forEach((item) => {
    // Si l'élément existe déjà, ajouter la quantité à cet élément
    if (uniqueElements[item.sku]) {
      uniqueElements[item.sku].qty += item.qty;
    } else {
      // Sinon, ajouter l'élément au tableau unique
      uniqueElements[item.sku] = item;
    }
  });
  // transformer l'objet en tableau
  return Object.values(uniqueElements);
}
</script>

<template>
  <button class="btn-validate margin-btm" @click="isValid = true" v-if="
    addedBoxs.length > 0 && order.reference !== '' && siteClient.siteCode
  ">
    Valider la commande
  </button>
  <div v-show="isValid" class="send-message margin-btm">
    <p class="margin-btm">
      Êtes-vous sure de vouloir envoyer votre commande ?
    </p>
    <button @click="validateNewOrder">OUI</button>
    .
    <button @click="isValid = false">NON</button>
  </div>
  <span class="error-msg">{{ errorMessage }}</span>

</template>
