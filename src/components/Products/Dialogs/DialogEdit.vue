<template>
  <v-row justify="center">
    <v-dialog
      :value="true"
      @click:outside='closeDialog'
      max-width="700"
    >
      <v-card
        elevation="8"
        shaped
      >
        <v-row class="pt-5 pl-5 pr-5">
          <v-col cols="12">
            <h3>שינוי מוצר</h3>
          </v-col>
          <v-col cols="12" md="6">
            <v-text-field
              v-model="productName"
              label="שם מוצר"
              filled
              dense
              hide-details
            />
          </v-col>
          <v-col cols="12" md="6">
            <v-select
              v-model="productCategory"
              :items="productCategoryList"
              label="שם קטגוריה"
              filled
              dense
              hide-details
              small-chips
              multiple
            ></v-select>
          </v-col>
          <v-col cols="12" md="12">
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
              filled
              dense
              hide-details
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
          <v-col cols="12" md="6">
            <v-textarea
              v-model="productInfo"
              label="מפרט"
              filled
              dense
              hide-details
            ></v-textarea>
          </v-col>
          <v-col cols="12" md="6">
            <v-textarea
              v-model="supplierPrices"
              label="מחירון ספקים"
              filled
              dense
              hide-details
            ></v-textarea>
          </v-col>
          <v-col cols="12">
            <v-card-actions
              style="padding:0"
            >
              <v-btn
                icon
                color="red"
                class="black--text"
                @click="dialogs.delete = true"
              >
                <v-icon>
                  mdi-trash-can-outline
                </v-icon>
              </v-btn>
              <v-spacer></v-spacer>
              <v-btn
                outlined
                large
                color="red"
                @click="closeDialog"
                @keyup:esc="closeDialog"
              >
                ביטול
              </v-btn>
              <v-btn
                outlined
                large
                color="green"
                @click="saveProduct"
                :disabled="productFieldInvalid"
              >
                שמור
              </v-btn>
            </v-card-actions>
          </v-col>
        </v-row>
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
    document.addEventListener("keyup", (e) => {
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