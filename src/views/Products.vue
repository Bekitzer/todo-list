<template>
  <v-container>
    <nav-appbar :pname="pageName"/>
    <v-row>
      <list-products
        v-for="product in products"
        :key="product.id"
        :product="product"
      />
    </v-row>
    <v-fab-transition>
      <v-btn
        fab
        large
        fixed
        dark
        bottom
        left
        class="v-btn--example"
        @click="dialogs.create = true"
      >
        <v-icon>mdi-plus</v-icon>
      </v-btn>
    </v-fab-transition>
    <dialog-create
      v-if="dialogs.create"
      @close = 'dialogs.create = false'
    />
    <footer>
      <a href="https://nanoprint.co.il/product/business-cards/">כרטיסי ביקור</a> |
      <a href="https://nanoprint.co.il/product/postcards/">גלויות והזמנות</a> |
      <a href="https://nanoprint.co.il/product/flyers/">פליירים וברושורים</a> |
      <a href="https://nanoprint.co.il/product/pocket-folders/">פולדרים</a> |
      <a href="https://nanoprint.co.il/product/door-hangers/">תלי דלת</a> |
      <a href="https://nanoprint.co.il/product/magnets/">מגנטים</a> |
      <a href="https://nanoprint.co.il/product/booklets/">חוברות וקטלוגים</a> |
      <a href="https://nanoprint.co.il/product/posters/">פוסטרים</a> |
      <a href="https://nanoprint.co.il/product/tickets/">כרטיסים ושוברים</a> |
      <a href="https://nanoprint.co.il/product/envelopes/">מעטפות</a> |
      <a href="https://nanoprint.co.il/product/letterhead/">נייר מכתבים / דף לוגו</a> |
      <a href="https://nanoprint.co.il/product/carbonless-forms/">פנקסים / חשבוניות</a> |
      <a href="https://nanoprint.co.il/product/stamps/">חותמות</a> |
      <a href="https://nanoprint.co.il/product/kapa/">הדפסה על קאפה</a> |
      <a href="https://nanoprint.co.il/product/canvas/">הדפסה על קנבס</a> |
      <a href="https://nanoprint.co.il/product/vinyl-banner/">הדפסה על שמשונית</a> |
      <a href="https://nanoprint.co.il/product/polygal/">הדפסה על פוליגל</a> |
      <a href="https://nanoprint.co.il/product/perspex/">הדפסה על פרספקס</a> |
      <a href="https://nanoprint.co.il/product/vinyl-stickers/">מדבקות ויניל פס רחב</a> |
      <a href="https://nanoprint.co.il/product/flags/">דגלים</a> |
      <a href="https://nanoprint.co.il/product/roll-up/">רול אפ</a> |
      <a href="https://nanoprint.co.il/product/promoter-counter/">דלפק מכירות / פרומוטר</a> |
      <a href="https://nanoprint.co.il/product/a-frame-sign/">שלט A / שלט חמור</a> |
      <a href="https://nanoprint.co.il/product/snap-frame/">מסגרת קליפס / סנייפ פריים</a> |
      <a href="https://nanoprint.co.il/product/presswall/">קיר עיתונאים / צילום</a> |
      <a href="https://nanoprint.co.il/product/paper-stickers/">מדבקות ותוויות</a> |
      <a href="https://nanoprint.co.il/product/sticker-rolls/">מדבקות בגלילים</a> |
      <a href="https://nanoprint.co.il/product/vinyl-lettering/">מדבקת חיתוך אותיות</a> |
      <a href="https://nanoprint.co.il/product/coasters/">תחתיות לכוס / קוסטרים</a> |
      <a href="https://nanoprint.co.il/product/pin-buttons/">סיכות דש / כפתור</a> |
      <a href="https://nanoprint.co.il/product/flag-garland/">שרשרת דגלים</a> |
      <a href="https://nanoprint.co.il/product/notebooks/">מחברות ממותגות</a> |
      <a href="https://nanoprint.co.il/product/plastic-cards/">כרטיסי פלסטיק</a> |
      <a href="https://nanoprint.co.il/product/calendars/">לוחות שנה</a> |
      <a href="https://nanoprint.co.il/product/event-tags/">תגי הפקה</a> |
      <a href="https://nanoprint.co.il/product/memo/">דפי ממו / מזכר</a> |
    </footer>
  </v-container>
</template>

<script>
export default {
  name: 'Products',
  hidden: false,
  data: () => ({
    pageName: 'מוצרים',
    dialogs: {
      create: false
    },
  }),
  components: {
    'list-products': require('@/components/Products/ListProducts.vue').default,
    'dialog-create': require('@/components/Products/Dialogs/DialogCreate.vue').default,
    'nav-appbar'          : require('@/components/Global/AppBar.vue').default
  },
  computed: {
    products: {
      get() {
        return this.$store.getters.productsFiltered
      },
      set(value) {
        this.$store.dispatch('setProducts', value)
      }
    }
  }
}
</script>
<style lang="sass">
@media (max-width: 800px)
  .v-application .pl-16
    padding-left: 20px !important
  .v-application .pr-16
    padding-right: 20px !important
  .v-application .pt-10
    padding-top: 0px !important
</style>

