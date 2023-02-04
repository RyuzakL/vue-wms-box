<script setup>
import { useStore } from 'vuex';
import { computed } from 'vue';

const store = useStore()
const order = computed(() => store.state.order)
const siteClient = computed(() => store.state.siteClient);
</script>

<template>
	<div class="container-register">
		<h2 class="margin-btm">Votre commande a bien été enregistré!</h2>
		<h3 class="margin-btm">Récapitulatif :</h3>
		<div class="container-details-command">
			<div>Référence : {{ order.reference }}</div>
			<div>
				Site client : {{ siteClient.siteName }}/{{ siteClient.siteCode }}
			</div>
			<div class="detail-command" v-for="(item, index) in order.items" :key="index">
				<div class="big margin-btm">N°{{ index + 1 }}</div>
				<div>Sku: {{ item.sku }}</div>
				<div>Quantité: {{ item.qty }}</div>
			</div>
		</div>
	</div>
</template>

<style>
.detail-command {
	margin: 1rem 0;
	padding: 0.7rem 1rem;
	background-color: rgb(237, 236, 236);
	border-radius: 10px;
	width: 350px;
}
</style>
