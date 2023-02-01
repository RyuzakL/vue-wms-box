<script setup>
import { ref, computed } from "vue";
import { useStore } from "vuex";
import fetchHelper from "../helper/fetchHelper";

const store = useStore();
const addedBoxs = computed(() => store.state.addedBoxs);
const order = computed(() => store.state.order);
const isCommandRegistered = computed(() => store.state.isCommandRegistered);
const siteClient = computed(() => store.state.siteClient);
const user = computed(() => store.state.userModule.user);

const errorMessage = ref("");
const isValid = ref(false);
const mergedChilds = ref([]);

const validateNewOrder = () => {
  mergedChilds.value = mergedDuplication();
  store.dispatch("updatesOrderItems", mergedChilds.value);

  try {
    const res = fetchHelper.postNewOrder(
      user.value.domain,
      user.value.username,
      user.value.password,
      order.value,
      siteClient.value.siteId
    );
    if (res.status !== 200) return;
    store.dispatch("setCommandRegisterd", true);
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
  <div v-if="!isCommandRegistered">
    <button
      class="btn-validate margin-btm"
      @click="isValid = true"
      v-if="
        addedBoxs.length > 0 && order.reference !== '' && siteClient.siteCode
      "
    >
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
  </div>
  <div v-else class="container-register">
    <h2 class="margin-btm">Votre commande a bien été enregistrer !</h2>
    <h3 class="margin-btm">Récapitulatif :</h3>
    <div class="container-details-command">
      <div>Référence : {{ order.reference }}</div>
      <div>
        Site client : {{ siteClient.siteName }}/{{ siteClient.siteCode }}
      </div>
      <div
        class="detail-command"
        v-for="(child, index) in mergedChilds"
        :key="index"
      >
        <div class="big margin-btm">N°{{ index + 1 }}</div>
        <div>Sku: {{ child.sku }}</div>
        <div>Quantité: {{ child.qty }}</div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.detail-command {
  margin: 1rem 0;
  padding: 0.7rem 1rem;
  background-color: rgb(237, 236, 236);
  border-radius: 10px;
  width: 350px;
}
</style>
