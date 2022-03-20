<template>
	<v-app id="inspire">
		<nav-drawer />
		<v-main>
			<v-progress-linear v-if="loading" color="#03616f" indeterminate></v-progress-linear>
			<router-view v-else style="padding: 4px 4%"></router-view>
			<snackbar />
		</v-main>
		<nav-footer style="padding: 4px 4%" />
	</v-app>
</template>

<script>
export default {
	data: () => ({
		isLoggedIn: false,
		loading: true
	}),
	created() {
		this.fetchAppData()
	},
	methods: {
		fetchAppData() {
			return this.$store
				.dispatch('User/fetchCurrent')
				.then(() =>
					Promise.all([
						this.$store.dispatch('ProductTag/fetch'),
						this.$store.dispatch('Supplier/fetch'),
						this.$store.dispatch('Client/fetch'),
						this.$store.dispatch('Order/fetch'),
						this.$store.dispatch('Product/fetch'),
						this.$store.dispatch('User/fetch'),
						this.$store.dispatch('Variation/fetch'),
						this.$store.dispatch('Rate/fetch')
					])
				)
				.catch((err) => (err === 'UNAUTHENTICATED' ? console.debug('no user authenticated') : console.error(err)))
				.finally(() => (this.loading = false))
		}
	},
	components: {
		'nav-drawer': require('@/components/Global/NavDrawer').default,
		'nav-footer': require('@/components/Global/FooterBar').default,
		snackbar: require('@/components/Global/Snackbar').default
	}
}
</script>
<style lang="sass">
@font-face
  font-family: 'Ploni-Regular'
  src: url('~@/assets/fonts/Ploni-Regular-AAA.eot')
  src: local('☺'), url('~@/assets/fonts/Ploni-Regular-AAA.woff') format('woff'), url('~@/assets/fonts/Ploni-Regular-AAA.ttf') format('truetype'), url('~@/assets/fonts/Ploni-Regular-AAA.svg') format('svg')
  font-weight: normal
  font-style: normal

.v-application
  font-family: 'Ploni-Regular', sans-serif !important

.v-list-item__content
  justify-content: center !important
  padding: 20px 0 !important
  flex-direction: column !important

.v-input--switch--inset .v-input--selection-controls__input
  transform: rotate(180deg) !important

.spc-logo
  background: #006D7B !important

.v-list.v-sheet.theme--light.v-list--nav
  padding-top: 0 !important

.theme--light.v-app-bar.v-toolbar.v-sheet
  background-color: #ffffff !important

.v-application--is-rtl .v-data-table > .v-data-table__wrapper > table > thead > tr > th
  border-bottom: 0 solid black !important
  box-shadow: inset 0 0 0 rgb(0 0 0 / 12%) !important
  cursor: pointer !important

.ngs-button .v-btn__content
  text-transform: capitalize !important

.theme--light.v-data-table > .v-data-table__wrapper > table > tbody > tr:hover:not(.v-data-table__expanded__content):not(.v-data-table__empty-wrapper)
  background: #f5f5f5 !important
  cursor: pointer !important

th.text-start, td.text-start
  padding: 0 5px !important

.tooltip-top::before
  border-right: solid 8px transparent
  border-left: solid 8px transparent
  transform: translateX(-50%)
  position: absolute
  z-index: -21
  content: ''
  top: 100%
  left: 50%
  height: 0
  width: 0

.tooltip-top.error::before
  border-top: solid 8px #ff6060

.tooltip-top.success::before
  border-top: solid 8px #1B5E20

.tooltip-top.secondary::before
  border-top: solid 8px #3f3f3f

.tooltip-top.primary::before
  border-top: solid 8px #246fb3

.tooltip-top.normal::before
  border-top: solid 8px #616161e6

.tooltip-top.info::before
  border-top: solid 8px #2196f3

.tooltip-bottom::before
  border-right: solid 8px transparent
  border-left: solid 8px transparent
  transform: translateX(-50%)
  position: absolute
  z-index: -21
  content: ''
  bottom: 100%
  left: 50%
  height: 0
  width: 0

.tooltip-bottom.error::before
  border-bottom: solid 8px #ff6060

.tooltip-bottom.success::before
  border-bottom: solid 8px #1B5E20

.tooltip-bottom.secondary::before
  border-bottom: solid 8px #3f3f3f

.tooltip-bottom.primary::before
  border-bottom: solid 8px #246fb3

.tooltip-bottom.normal::before
  border-bottom: solid 8px #616161e6

.tooltip-bottom.info::before
  border-bottom: solid 8px #2196f3

.tooltip-right::before
  content: " "
  position: absolute
  top: 50%
  right: 100%
  margin-top: -8px
  border-width: 8px
  border-style: solid
  border-top: solid 8px transparent
  border-bottom: solid 8px transparent
  border-left: solid 8px transparent

.tooltip-right.error::before
  border-right: solid 8px #ff6060 !important

.tooltip-right.success::before
  border-right: solid 8px #1B5E20 !important

.tooltip-right.secondary::before
  border-right: solid 8px #3f3f3f !important

.tooltip-right.primary::before
  border-right: solid 8px #246fb3 !important

.tooltip-right.normal::before
  border-right: solid 8px #616161e6 !important

.tooltip-right.info::before
  border-right: solid 8px #2196f3 !important

.tooltip-left::before
  content: " "
  position: absolute
  top: 50%
  left: 100%
  margin-top: -8px
  border-width: 8px
  border-style: solid
  border-top: solid 8px transparent
  border-bottom: solid 8px transparent
  border-right: solid 8px transparent

.tooltip-left.error::before
  border-left: solid 8px #ff6060 !important

.tooltip-left.success::before
  border-left: solid 8px #1B5E20 !important

.tooltip-left.secondary::before
  border-left: solid 8px #3f3f3f !important

.tooltip-left.primary::before
  border-left: solid 8px #246fb3 !important

.tooltip-left.normal::before
  border-left: solid 8px #616161e6 !important

.tooltip-left.info::before
  border-left: solid 8px #2196f3 !important

.v-input--switch__thumb.theme--light.primary--text,
.v-input--switch__track.theme--light.primary--text,
.v-input--selection-controls__ripple.primary--text
  color: #03616f !important
  caret-color: #03616f !important

.v-data-table__wrapper tbody tr
  height: 56px !important
  position: relative !important
  border-bottom: 1px solid #f1efef !important

.col
  padding: 6px !important

.spc-status-dot
  width: 12px !important
  margin-left: 6px !important
  line-height: 0.1 !important

th.spc-status-dot
  border-bottom: none !important

.spc-btn
  color: #03616f !important
  margin-right: 10px !important
  transform: rotate(0deg) !important

.spc-btn:hover
  background: #03616f !important
  color: white !important
  transform: rotate(90deg) !important

.spc-create
  color: #03616f !important
  margin-right: 10px !important

.spc-create:hover
  background: #03616f !important
  color: white !important

.spc-titles
  margin-bottom: 0 !important
  color: #797979 !important
  font-size: 14px !important

.user-info
  white-space: pre-line !important

.v-data-table > .v-data-table__wrapper > table > thead > tr > th
  font-size: 0.875rem !important

.no-data
  position: absolute !important
  left: 50% !important
  top: 50% !important
  transform: translate(-50%, -50%) !important
  opacity: 0.7 !important

.row
  margin: 0 !important

.spc-file
  width: 100% !important
  border-radius: 100px

.theme--light.v-data-table .v-data-table-header th.sortable .v-data-table-header__icon
  display: contents

.v-icon.notranslate.v-data-table-header__icon.mdi-arrow-up::before
  content: "\F0143"

.theme--dark.v-btn--has-bg:hover
  background-color: #006D7B !important

.theme--dark.v-btn--has-bg:hover .v-icon
  transform: scale(1.2)

.theme--dark.v-btn--has-bg:hover .v-icon
  transform: rotate(90deg)

.v-text-field__details
  display: none !important

.v-btn--plain:not(.v-btn--active):not(.v-btn--loading):not(:focus):not(:hover) .v-btn__content
  opacity: 1 !important

.v-btn--plain:focus .v-btn__content, .v-btn--plain:hover .v-btn__content
  opacity: .62 !important

.ngs-button
  letter-spacing: 0 !important
  color: #006d7b !important
  height: auto !important
  min-width: auto !important
  padding: 0 !important

.ngs-button:focus:hover
  opacity: .62 !important

.v-list-item__content
  padding: 12px 0 !important

.v-application .elevation-1, .theme--light.v-data-table.v-data-table--fixed-header thead th
  box-shadow: none !important

.theme--light.v-data-table .v-data-footer
  border-top: none !important

.orderWorkInfo
  padding: 20px !important
  white-space: pre-line !important
  border-radius: 20px !important

.v-data-table > .v-data-table__wrapper tbody tr.v-data-table__expanded__content
  box-shadow: none !important
  background: #fbfbfb !important

.v-data-table > .v-data-table__wrapper > table > thead > tr > th
  font-size: 0.875rem !important

.v-list-item__title
  align-self: flex-start
</style>
