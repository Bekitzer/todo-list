<template>
	<v-card>
		<v-navigation-drawer v-model="drawer" :mobile-breakpoint="800" :right="$vuetify.rtl" permanent width="70" flat app>
			<v-list nav>
				<v-list-item class="spc-logo" :to="{ name: 'Home' }">
					<v-img :src="require('@/assets/logojp.png')" class="spc-img" />
				</v-list-item>
				<v-list-item v-if="loggedIn" :to="{ name: 'Orders' }">
					<v-list-item-content>
						<v-list-item-icon>
							<icon-orders width="26" />
						</v-list-item-icon>
						<v-list-item-subtitle style="z-index: 1; font-size: 12px">הזמנות</v-list-item-subtitle>
					</v-list-item-content>
				</v-list-item>
				<v-list-item v-if="loggedIn && user.isAdmin" :to="{ name: 'Clients' }">
					<v-list-item-content>
						<v-list-item-icon>
							<icon-clients width="26" />
						</v-list-item-icon>
						<v-list-item-subtitle style="z-index: 1; font-size: 12px">לקוחות</v-list-item-subtitle>
					</v-list-item-content>
				</v-list-item>
				<v-list-item v-if="loggedIn && user.isAdmin" :to="{ name: 'Suppliers' }">
					<v-list-item-content>
						<v-list-item-icon>
							<icon-suppliers width="26" />
						</v-list-item-icon>
						<v-list-item-subtitle style="z-index: 1; font-size: 12px">ספקים</v-list-item-subtitle>
					</v-list-item-content>
				</v-list-item>
				<v-list-item v-if="loggedIn && user.isAdmin" :to="{ name: 'Products' }">
					<v-list-item-content>
						<v-list-item-icon>
							<icon-products width="26" />
						</v-list-item-icon>
						<v-list-item-subtitle style="z-index: 1; font-size: 12px">מוצרים</v-list-item-subtitle>
					</v-list-item-content>
				</v-list-item>
				<v-list-item v-if="loggedIn && user.isAdmin">
					<v-list-item-content>
						<v-list-item-icon>
							<icon-services width="26" />
						</v-list-item-icon>
						<v-list-item-subtitle style="z-index: 1; font-size: 12px">שירותים</v-list-item-subtitle>
					</v-list-item-content>
				</v-list-item>
				<v-list-item v-if="loggedIn && user.isAdmin">
					<v-list-item-content>
						<v-list-item-icon>
							<icon-book-keeping width="26" />
						</v-list-item-icon>
						<v-list-item-subtitle style="z-index: 1; font-size: 12px">הנה״ח</v-list-item-subtitle>
					</v-list-item-content>
				</v-list-item>

				<v-list-item v-if="loggedIn && user.isAdmin" :to="{ name: 'Users' }">
					<v-list-item-content>
						<v-list-item-icon>
							<icon-clients width="26" />
						</v-list-item-icon>
						<v-list-item-subtitle style="z-index: 1; font-size: 12px">משתמשים</v-list-item-subtitle>
					</v-list-item-content>
				</v-list-item>
				<v-list-item v-if="loggedIn" :to="{ name: 'Dashboard' }">
					<v-list-item-content>
						<v-list-item-icon>
							<icon-dashboard width="26" />
						</v-list-item-icon>
						<v-list-item-subtitle style="z-index: 1; font-size: 12px">לוח בקרה</v-list-item-subtitle>
					</v-list-item-content>
				</v-list-item>
				<v-list-item v-if="!loggedIn" :to="{ name: 'Register' }">
					<v-list-item-content>
						<v-list-item-icon><v-icon>mdi-account-plus</v-icon></v-list-item-icon>
						<v-list-item-subtitle style="z-index: 1; font-size: 12px">הירשם</v-list-item-subtitle>
					</v-list-item-content>
				</v-list-item>
				<v-list-item v-if="!loggedIn" :to="{ name: 'Login' }">
					<v-list-item-content>
						<v-list-item-icon><v-icon>mdi-login</v-icon></v-list-item-icon>
						<v-list-item-subtitle style="z-index: 1; font-size: 12px">התחבר</v-list-item-subtitle>
					</v-list-item-content>
				</v-list-item>
				<v-list-item v-if="loggedIn" @click="dialogs.exit = true">
					<v-list-item-content>
						<v-list-item-icon>
							<v-icon>mdi-logout</v-icon>
						</v-list-item-icon>
						<v-list-item-subtitle style="z-index: 1; font-size: 12px">התנתק</v-list-item-subtitle>
					</v-list-item-content>
				</v-list-item>
			</v-list>
			<dialog-exit v-if="dialogs.exit" v-model="dialogs.exit" @close="dialogs.exit = false" />
		</v-navigation-drawer>
	</v-card>
</template>

<script>
import { getAuth } from 'firebase/auth'
export default {
	data: () => ({
		drawer: null,
		loggedIn: false,
		dialogs: {
			exit: false
		}
	}),
	components: {
		'dialog-exit': require('@/components/Global/Dialogs/DialogExit').default,
		'icon-suppliers': require('@/components/Icons/IconSupplier').default,
		'icon-clients': require('@/components/Icons/IconClient').default,
		'icon-book-keeping': require('@/components/Icons/IconBookeeping').default,
		'icon-dashboard': require('@/components/Icons/IconDashboard').default,
		'icon-orders': require('@/components/Icons/IconOrder').default,
		'icon-products': require('@/components/Icons/IconProduct').default,
		'icon-services': require('@/components/Icons/IconService').default
	},
	computed: {
		user() {
			return this.$store.getters.user || {}
		}
	},
	created() {
		if (getAuth().currentUser) {
			this.loggedIn = true
		}
	}
}
</script>

<style lang="sass">
.v-image.v-responsive.spc-img.theme--light .v-image__image, .v-image__placeholder
    background-size: 30px!important
.v-navigation-drawer__content .v-list-item
    padding: 0 !important
.v-sheet.v-card:not(.v-sheet--outlined)
    box-shadow: none !important
    border-radius: 0 !important
.v-image.v-responsive.spc-img.theme--light .v-responsive__sizer
    padding-bottom: 90px !important
.theme--light.v-navigation-drawer:not(.v-navigation-drawer--floating) .v-navigation-drawer__border
    background-color: rgba(0, 0, 0, 0) !important
.v-list--nav
    padding-left: 0px !important
    padding-right: 0px !important
.v-application--is-rtl .v-list-item__icon:first-child
    margin-right: 23px !important
    margin-left: auto !important
.v-navigation-drawer__content
    background: #f1f1f1 !important
.v-list--nav .v-list-item, .v-list--nav .v-list-item:before
    border-radius: 0px !important
.v-list--nav .v-list-item:not(:last-child):not(:only-child)
    margin-bottom: 0px !important
.v-navigation-drawer__content .v-list-item__icon
    margin: 0 0
.v-navigation-drawer__content .v-list-item__content
    padding: 24px 0 !important
</style>
