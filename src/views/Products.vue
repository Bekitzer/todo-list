<template>
  <div>
    <nav-appbar :pname="pageName">
      <template v-slot:add-btn>
        <v-tooltip
          left
          content-class="normal tooltip-left"
        >
          <template v-slot:activator="{ on, attrs }">
          <v-btn
            fab
            small
            elevation="0"
            filled
            v-bind="attrs"
            v-on="on"
            class="spc-btn"
            @click="dialogs.create = true"
          >
            <v-icon>mdi-plus</v-icon>
          </v-btn>
          </template>
          <span>מוצר חדש</span>
        </v-tooltip>
      </template>
    </nav-appbar>
    <v-row no-gutters>
      <list-products
        v-for="product in products"
        :key="product.id"
        :product="product"
      />
    </v-row>
    <dialog-create
      v-if="dialogs.create"
      @close = 'dialogs.create = false'
    />
    <v-row class="spc-ul">
      <v-col cols="12" md="2" sm="2">
        <h5 >מיתוג ושיווק</h5>
        <ul>
          <li><a href="https://nanoprint.co.il/product/business-cards/">כרטיסי ביקור</a></li>
          <li><a href="https://nanoprint.co.il/product/postcards/">גלויות והזמנות</a></li>
          <li><a href="https://nanoprint.co.il/product/flyers/">פליירים וברושורים</a></li>
          <li><a href="https://nanoprint.co.il/product/pocket-folders/">פולדרים</a></li>
          <li><a href="https://nanoprint.co.il/product/door-hangers/">תלי דלת</a></li>
          <li><a href="https://nanoprint.co.il/product/magnets/">מגנטים</a></li>
          <li><a href="https://nanoprint.co.il/product/booklets/">חוברות וקטלוגים</a></li>
          <li><a href="https://nanoprint.co.il/product/posters/">פוסטרים</a></li>
          <li><a href="https://nanoprint.co.il/product/notebooks/">מחברות ממותגות</a></li>
          <li><a href="https://nanoprint.co.il/product/calendars/">לוחות שנה</a></li>
          <li><a href="https://nanoprint.co.il/product/tickets/">כרטיסים ושוברים</a></li>
          <li><a href="https://nanoprint.co.il/product/plastic-cards/">כרטיסי פלסטיק</a></li>
          <li><a href="https://nanoprint.co.il/product/envelopes/">מעטפות</a></li>
          <li><a href="https://nanoprint.co.il/product/letterhead/">נייר מכתבים / דף לוגו</a></li>
          <li><a href="https://nanoprint.co.il/product/memo/">דפי ממו / מזכר</a></li>
        </ul>
      </v-col>
      <v-col cols="12" md="2" sm="2">
        <h5>משרדי ואירגוני</h5>
        <ul>
          <li><a href="https://nanoprint.co.il/product/envelopes/">מעטפות</a></li>
          <li><a href="https://nanoprint.co.il/product/letterhead/">נייר מכתבים / דף לוגו</a></li>
          <li><a href="https://nanoprint.co.il/product/memo/">דפי ממו / מזכר</a></li>
          <li><a href="https://nanoprint.co.il/product/carbonless-forms/">פנקסים / חשבוניות</a></li>
          <li><a href="https://nanoprint.co.il/product/stamps/">חותמות</a></li>
          <li><a href="https://nanoprint.co.il/product/business-cards/">כרטיסי ביקור</a></li>
          <li><a href="https://nanoprint.co.il/product/calendars/">לוחות שנה</a></li>
          <li><a href="https://nanoprint.co.il/product/event-tags/">תגי הפקה</a></li>
        </ul>
      </v-col>
      <v-col cols="12" md="2" sm="2">
        <h5>שילוט ותצוגה</h5>
        <ul>
          <li><a href="https://nanoprint.co.il/product/kapa/">הדפסה על קאפה</a></li>
          <li><a href="https://nanoprint.co.il/product/canvas/">הדפסה על קנבס</a></li>
          <li><a href="https://nanoprint.co.il/product/vinyl-banner/">הדפסה על שמשונית</a></li>
          <li><a href="https://nanoprint.co.il/product/polygal/">הדפסה על פוליגל</a></li>
          <li><a href="https://nanoprint.co.il/product/perspex/">הדפסה על פרספקס</a></li>
          <li><a href="https://nanoprint.co.il/product/vinyl-stickers/">מדבקות ויניל פס רחב</a></li>
          <li><a href="https://nanoprint.co.il/product/posters/">פוסטרים</a></li>
          <li><a href="https://nanoprint.co.il/product/flags/">דגלים</a></li>
          <li><a href="https://nanoprint.co.il/product/flag-garland/">שרשרת דגלים</a></li>
          <li><a href="https://nanoprint.co.il/product/roll-up/">רול אפ</a></li>
        </ul>
      </v-col>
      <v-col cols="12" md="2" sm="2">
        <h5>מתקנים ומעמדים</h5>
        <ul>
          <li><a href="https://nanoprint.co.il/product/roll-up/">רול אפ</a></li>
          <li><a href="https://nanoprint.co.il/product/promoter-counter/">דלפק מכירות / פרומוטר</a></li>
          <li><a href="https://nanoprint.co.il/product/a-frame-sign/">שלט A / שלט חמור</a></li>
          <li><a href="https://nanoprint.co.il/product/snap-frame/">מסגרת קליפס / סנייפ פריים</a></li>
          <li><a href="https://nanoprint.co.il/product/presswall/">קיר עיתונאים / צילום</a></li>
        </ul>
      </v-col>
      <v-col cols="12" md="2" sm="2">
        <h5>מדבקות וטפטים</h5>
        <ul>
          <li><a href="https://nanoprint.co.il/product/paper-stickers/">מדבקות ותוויות</a></li>
          <li><a href="https://nanoprint.co.il/product/sticker-rolls/">מדבקות בגלילים</a></li>
          <li><a href="https://nanoprint.co.il/product/vinyl-lettering/">מדבקת חיתוך אותיות</a></li>
          <li><a href="https://nanoprint.co.il/product/vinyl-stickers/">מדבקות ויניל פס רחב</a></li>
        </ul>
      </v-col>
      <v-col cols="12" md="2" sm="2">
        <h5>מוצרי קד״מ</h5>
        <ul>
          <li><a href="https://nanoprint.co.il/product/pin-buttons/">סיכות דש / כפתור</a></li>
          <li><a href="https://nanoprint.co.il/product/flag-garland/">שרשרת דגלים</a></li>
          <li><a href="https://nanoprint.co.il/product/notebooks/">מחברות ממותגות</a></li>
          <li><a href="https://nanoprint.co.il/product/plastic-cards/">כרטיסי פלסטיק</a></li>
          <li><a href="https://nanoprint.co.il/product/calendars/">לוחות שנה</a></li>
          <li><a href="https://nanoprint.co.il/product/event-tags/">תגי הפקה</a></li>
          <li><a href="https://nanoprint.co.il/product/memo/">דפי ממו / מזכר</a></li>
        </ul>
      </v-col>
    </v-row>
  </div>
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