<template>
	<div>
		<nav-appbar :pname="'הזמנות - ' + this.order.number">
			<template v-slot:add-btn>
				<v-tooltip left content-class="normal tooltip-left">
					<template v-slot:activator="{ on, attrs }">
						<v-btn
							fab
							small
							elevation="0"
							filled
							v-bind="attrs"
							v-on="on"
							class="spc-create"
							@click="dialogs.edit = true"
						>
							<v-icon>mdi-pencil</v-icon>
						</v-btn>
					</template>
					<span>עריכת הזמנה</span>
				</v-tooltip>
			</template>
		</nav-appbar>
		<v-row no-gutters>
			<v-col cols="12" md="3" sm="3">
				<v-row class="pa-3 pos-rel mb-2 grey lighten-4">
					<v-col cols="6">
						<div>
							<small class="margin-bottom:0 !important;">שם לקוח</small>
							<h2 v-if="clientsMap">
								{{ clientsMap[order.orderClientRef.id] }}
							</h2>
							<h2 v-else>empty</h2>
						</div>
					</v-col>
					<v-col cols="6">
						<div>
							<small class="margin-bottom:0 !important;">שם ספק</small>
							<h2 v-if="suppliersMap">
								{{ suppliersMap[order.orderSupplierRef.id] }}
							</h2>
						</div>
					</v-col>
				</v-row>
				<v-row class="pa-3 pos-rel mb-2 grey lighten-4">
					<v-col cols="12">
						<h4>פרטי הזמנה</h4>
					</v-col>
					<v-col cols="6">
						<div class="user-information">
							<p class="spc-titles">מ.הזמנה</p>
							{{ order.number }}
						</div>
						<div class="user-information">
							<p class="spc-titles">מכירה</p>
							{{ order.sellPrice }}
						</div>
						<div class="user-information">
							<p class="spc-titles">קנייה</p>
							{{ order.buyPrice }}
						</div>
						<div class="user-information">
							<p class="spc-titles">רווח</p>
							{{ order.margin }}
						</div>
					</v-col>
					<v-col cols="6">
						<div class="user-information">
							<p class="spc-titles">סוג משלוח</p>
							{{ order.deliveryType }}
						</div>
						<div class="user-information">
							<p class="spc-titles">אחראי</p>
							{{ order.deliveryAgent }}
						</div>
					</v-col>
				</v-row>
				<v-row class="pa-3 pos-rel mb-2 grey lighten-4">
					<v-col cols="12">
						<h4>ההזמנה</h4>
					</v-col>
					<v-col cols="6">
						<div class="user-info">
							<p class="spc-titles">אודות ההזמנה</p>
							{{ order.orderWork }}
						</div>
					</v-col>
					<v-col cols="6">
						<div class="user-information">
							<p class="spc-titles">תאריך אספקה</p>
							{{ order.deliveredAt | formatDate }}
						</div>
					</v-col>
				</v-row>
				<v-row class="pa-3 pos-rel mb-2 grey lighten-4">
					<v-col cols="12">
						<h4>הגדרות הזמנה</h4>
					</v-col>
					<v-col cols="6">
						<div class="user-information">
							<p class="spc-titles">ת.רישום</p>
							{{ order.createdAt | formatDate }}
						</div>
					</v-col>
					<v-col cols="6">
						<div class="user-information">
							<p class="spc-titles">ת.עידכון</p>
							{{ order.updatedAt | formatDate }}
						</div>
					</v-col>
				</v-row>
			</v-col>
			<v-spacer></v-spacer>
			<v-col cols="9">
				<v-hover v-slot="{ hover }">
					<v-card>
						<v-fade-transition>
							<v-overlay v-if="hover" absolute color="#000">
								<v-btn @click="openFile(order)">הוספה/שינוי תמונה</v-btn>
							</v-overlay>
						</v-fade-transition>
						<v-img height="400px" :src="order.file" :lazy-src="require('@/assets/upload.png')" rounded />
					</v-card>
				</v-hover>
			</v-col>
		</v-row>
		<dialog-edit v-if="order.id && dialogs.edit" v-model="dialogs.edit" @close="dialogs.edit = false" :order="order" />
		<dialog-image v-if="dialogs.image" v-model="dialogs.image" @close="dialogs.image = false" :order="order" />
	</div>
</template>

<script>
export default {
	name: 'Order',
	data: () => ({
		pageName: '',
		fab: false,
		dialogs: {
			edit: false,
			image: false
		}
	}),
	computed: {
		order() {
			return (
				this.$store.state.Order.list.find(order => order.id === this.$route.params.id) || {
					number: '',
					orderSupplierRef: {},
					orderClientRef: {}
				}
			)
		},
		clientsMap() {
			const clientsMap = {}
			this.$store.state.Client.list.forEach(client => {
				clientsMap[client.id] = client.name
			})

			return clientsMap
		},
		suppliersMap() {
			const suppliersMap = {}
			this.$store.state.Supplier.list.forEach(supplier => {
				suppliersMap[supplier.id] = supplier.name
			})

			return suppliersMap
		}
	},
	components: {
		'dialog-edit': require('@/components/Orders/Dialogs/DialogEdit').default,
		'nav-appbar': require('@/components/Global/AppBar').default,
		'dialog-image': require('@/components/Orders/Dialogs/DialogImage').default
	}
}
</script>
