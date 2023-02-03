<script setup>
import { ref, onMounted, computed } from "vue";
import { useStore } from "vuex";
import { useRouter } from "vue-router";
import fetchHelper from "@/helper/fetchHelper.js";

const router = useRouter();
const store = useStore();
const user = computed(() => store.state.userModule.user);

onMounted(() => {
  if (user.value.isLogged) router.push({ name: "new-order" });
});

const errorMessage = ref("");

const userInput = ref({
  username: "benjamin",
  password: "benjamin",
  domain: "wms.parcelontime.es",
});

const boxsInput = ref(`REF BOX	REF COMPO	QTE COMPO
JBX-2302-104	            BLI-SHIPPERBLISSIM-JBX2202	1
JBX-2302-104	            INH-HUILEDESOINFORT-JBX2301	1
JBX-2302-104	            HEL-ALOESIGHTHYDRAT-JBX2212	1
JBX-2302-104	            BLI-SACHETSDETHEPAN-JBX2301	1
JBX-2302-104	            PAE-BLUSHARGANOIL-JBX2301	1
JBX-2302-104	            HUY-CREMEVISAGEHYAL-JBX2301	1
JBX-2302-104	            LAR-STICKALEVRESNOU-JBX2301	1
JBX-2302-104	            BLI-BOITEVIDE2-JBX2301	1
JBX-2302-104	            ULZ-FLYERPANDATEA-JBX2301	1
JBX-2302-104	            MENU-JBX-2301-03	1
JBX-2302-103	            BLI-SHIPPERBLISSIM-JBX2202	1
JBX-2302-103	            LAR-BAUMESOSREPARAT-JBX2301	1
JBX-2302-103	            LAR-CREMEHYDRATANTV-JBX2301	1
JBX-2302-103	            BLI-SACHETSDETHEPAN-JBX2301	1
JBX-2302-103	            LAR-GOMMAGEDOUXVISA-JBX2301	1
JBX-2302-103	            LAR-STICKALEVRESNOU-JBX2301	1
JBX-2302-103	            BLI-BOITEVIDE1-JBX2301	1
JBX-2302-103	            LAR-MASQUEENSTICKRE-JBX2301	1
JBX-2302-103	            ULZ-FLYERPANDATEA-JBX2301	1
JBX-2302-103	            MENU-JBX-2301-02	1`);

async function onSubmit() {
  try {
    const res = await fetchHelper.getSiteClients(
      "",
      userInput.value.domain,
      userInput.value.username,
      userInput.value.password
    );

    if (res.status !== 200) return;
    store.dispatch("userModule/setUser", {
      ...userInput.value,
      isLogged: true,
    });
    setBoxs();
    router.push({ name: "new-order" });
  } catch (err) {
    console.log(err);
    errorMessage.value = err.message;
  }
}

function setBoxs() {
  console.log(transformInputBoxs())
  store.dispatch("setBoxs", transformInputBoxs());
}
function transformInputBoxs() {
  if (!boxsInput.value) throw new Error("Veuillez insérer des boxs");

  const lines = boxsInput.value.split("\n");
  const obj = {};
  try {
    lines.forEach((line) => {
      const [parentSku, childSku, qty] = line.split("\t");
      if (!obj[parentSku]) {
        obj[parentSku] = { sku: parentSku, childs: [] };
      }
      obj[parentSku].childs.push({ sku: childSku.trim(), qty: parseInt(qty) });
    });
    delete obj["REF BOX"];
    return Object.values(obj);
  } catch (err) {
    throw new Error("Veuillez insérer des box valides");
  }
}
</script>

<template>
  <div class="container-loggin margin-btm">
    <h2 class="margin-btm">Login</h2>
    <p class="margin-btm">
      Veuillez vous connectez et rentrer l'URL de l'entrepot avant d'ajouter une
      commande.
    </p>
    <form class="container-input" @submit.prevent="onSubmit">
      <input v-model.trim="userInput.username" type="text" placeholder="identifiant" />
      <input v-model.trim="userInput.password" type="password" placeholder="mot de passe" />
      <input v-model.trim="userInput.domain" type="text" placeholder="domain" />
      <textarea v-model.trim="boxsInput" cols="30" rows="10" placeholder="Ajoutez box ici" />
      <button submit>Se connecter</button>
      <div class="error-msg">{{ errorMessage }}</div>
    </form>
  </div>
</template>

<style scoped>
.container-input {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  width: 50%;
  margin-bottom: 2rem;
}

.user {
  font-size: 0.9rem;
  font-style: italic;
}
</style>
