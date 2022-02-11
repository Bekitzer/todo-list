<template>
  <v-row justify="center">
    <v-dialog
      :value="true"
      max-width="600"
    >
      <v-card
        elevation="8"
        shaped
      >
        <v-card-title>שינוי מוצר</v-card-title>
          <v-row class="pa-4">
            <v-col cols="12" md="12" sm="12">
              <v-text-field
                v-model="productName"
                label="שם מוצר"
                outlined
              />
            </v-col>
            <v-col cols="12" md="12" sm="12">
              <v-select
                v-model="productCategory"
                :items="productCategoryList"
                label="שם קטגוריה"
                outlined
                chips
                multiple
              ></v-select>
            </v-col>
            <v-col cols="12" md="12" sm="12">
              <v-combobox
                v-model="productTags"
                :filter="filter"
                :hide-no-data="!search"
                :items="items"
                :search-input.sync="search"
                hide-selected
                label="חפש או צור חדש"
                multiple
                small-chips
                solo
              >
                <template v-slot:no-data>
                  <v-list-item>
                    <span class="subheading">חדש</span>
                    <v-chip
                      label
                      small
                    >
                      {{ search }}
                    </v-chip>
                  </v-list-item>
                </template>
                <template v-slot:selection="{ attrs, item, parent, selected }">
                  <v-chip
                    v-if="item === Object(item)"
                    v-bind="attrs"
                    :input-value="selected"
                    label
                    small
                  >
                    <span class="pr-2">
                      {{ item.text }}
                    </span>
                    <v-icon
                      small
                      @click="parent.selectItem(item)"
                    >
                      $delete
                    </v-icon>
                  </v-chip>
                </template>
                <template v-slot:item="{ index, item }">
                  <v-text-field
                    v-if="editing === item"
                    v-model="editing.text"
                    autofocus
                    flat
                    background-color="transparent"
                    hide-details
                    solo
                    @keyup.enter="edit(index, item)"
                  ></v-text-field>
                  <v-chip
                    v-else
                    dark
                    label
                    small
                  >
                    {{ item.text }}
                  </v-chip>
                  <v-spacer></v-spacer>
                  <v-list-item-action @click.stop>
                    <v-btn
                      icon
                      @click.stop.prevent="edit(index, item)"
                    >
                      <v-icon>{{ editing !== item ? 'mdi-pencil' : 'mdi-check' }}</v-icon>
                    </v-btn>
                  </v-list-item-action>
                </template>
              </v-combobox>
            </v-col>
            <v-col cols="12" md="12" sm="12">
              <v-textarea
                v-model="productInfo"
                label="מפרט"
                outlined
              ></v-textarea>
            </v-col>
            <v-col cols="12" md="12" sm="12">
              <v-textarea
                v-model="supplierPrices"
                label="מחירון ספקים"
                outlined
              ></v-textarea>
            </v-col>
          </v-row>
        <v-card-actions>
          <v-btn
            class="black--text"
            @click="dialogs.delete=true"
          >
            למחוק מוצר זה?
          </v-btn>
          <v-spacer></v-spacer>
          <v-btn
            fab
            icon
            outlined
            large
            color="red"
            @keyup:esc="closeDialog"
            @click="closeDialog"
          >
            <v-icon>
              mdi-close
            </v-icon>
          </v-btn>
          <v-btn
            fab
            icon
            outlined
            large
            color="green"
            @click="saveProduct"
            :disabled="productFieldInvalid"
          >
            <v-icon>
              mdi-check
            </v-icon>
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <dialog-delete
      v-if="dialogs.delete"
      @close = 'dialogs.delete = false'
      :product = 'product'
    />
  </v-row>
</template>

<script>
import { format, parseISO } from 'date-fns'
import { he } from 'date-fns/locale'
export default {
  name: 'DialogEdit',
  props: ['product'],
  data: () => ({
    dialog: false,
    dialogs: {
      delete: false
    },
    productName: '',
    productCategory: '',
    productCategoryList: ['מיתוג ושיווק','משרדי ואירגוני','שילוט ותצוגה','מתקנים ומעמדים','מדבקות וטפטים','מוצרי קד״מ'],
    productInfo: '',
    supplierPrices: '',
    activator: null,
    attach: null,
    editing: null,
    editingIndex: -1,
    items: [
      { header: 'בחר או שנה תגית' },
    ],
    nonce: 1,
    menu: false,
    productTags: [],
    x: 0,
    search: null,
    y: 0,
  }),
  computed: {
    productFieldInvalid() {
      return
      !this.productName || this.productName === this.product.name
    }
  },
  watch: {
    productTags (val, prev) {
      if (val.length === prev.length) return

      this.productTags = val.map(v => {
        if (typeof v === 'string') {
          v = {
            text: v,
          }
          this.items.push(v)
        }
        return v
      })
    },
  },
  methods: {
    edit (index, item) {
      if (!this.editing) {
        this.editing = item
        this.editingIndex = index
      } else {
        this.editing = null
        this.editingIndex = -1
      }
    },
    filter (item, queryText, itemText) {
      if (item.header) return false

      const hasValue = val => val != null ? val : ''

      const text = hasValue(itemText)
      const query = hasValue(queryText)

      return text.toString()
        .toLowerCase()
        .indexOf(query.toString().toLowerCase()) > -1
    },
    saveProduct() {
      if(!this.productFieldInvalid){
        let payload = {
          id: this.product.id,
          name: this.productName,
          category: this.productCategory,
          tags: this.productTags,
          productInfo: this.productInfo,
          prices: this.supplierPrices,
          productUpdated: format(new Date(Date.now()), 'EEEEE, dd/MM/yy HH:mm', {locale: he})
        }
        this.$store.dispatch('updateProduct', payload)
        this.closeDialog()
      }
    },
    closeDialog() {
      this.$emit('close')
    }
  },
  mounted() {
    this.productName = this.product.name
    this.productCategory = this.product.category
    this.productTags = this.product.tags
    this.productInfo = this.product.productInfo
    this.supplierPrices = this.product.prices
    document.addEventListener("keydown", (e) => {
      if (e.keyCode == 27) {
          this.$emit('close')
      }
    })
  },
  components: {
      'dialog-delete': require('@/components/Products/Dialogs/DialogDelete.vue').default
  }
}
</script>