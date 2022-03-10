<template>
  <v-row justify="center">
    <v-dialog v-model="dialog" max-width="700">
      <v-card elevation="8" shaped>
        <v-row class="pt-5 pr-5 pl-5">
          <v-col cols="12" md="12">
            <h3>יצירת מוצר</h3>
          </v-col>
          <v-col cols="12" md="6">
            <v-text-field
                v-model="form.name"
                label="שם מוצר"
                clearable
                filled
                dense
                hide-details
            />
          </v-col>
          <v-col cols="12" md="6">
            <v-select
                v-model="form.category"
                :items="categoryList"
                label="שם קטגוריה"
                clearable
                filled
                dense
                hide-details
                chips
                multiple
            ></v-select>
          </v-col>
          <v-col cols="12" md="12">
            <v-combobox
                v-model="productTags"
                :filter="filter"
                :hide-no-data="!search"
                :items="$store.state.ProductTag.list"
                :search-input.sync="search"
                hide-selected
                filled
                dense
                hide-details
                label="חפש או צור תגית חדש"
                multiple
                small-chips
            >
              <template v-slot:no-data>
                <v-list-item>
                  <span class="subheading">חדש</span>
                  <v-chip label small>
                    {{ search }}
                  </v-chip>
                </v-list-item>
              </template>
              <template v-slot:selection="{ attrs, item, parent, selected }">
                <v-chip v-if="item === Object(item)" v-bind="attrs" :input-value="selected" label small>
                  <span class="pr-2">
                    {{ item.text }}
                  </span>
                  <v-icon small @click="parent.selectItem(item)">
                    $delete
                  </v-icon>
                </v-chip>
              </template>
              <template v-slot:item="{ index, item }">
                <v-text-field
                    v-if="editing.id === item.id" v-model="editing.text"
                    autofocus flat hide-details solo background-color="transparent"
                    @keyup.enter="edit(index, item)"
                ></v-text-field>
                <v-chip v-else dark label small>
                  {{ item.text }}
                </v-chip>
                <v-spacer></v-spacer>
                <v-list-item-action @click.stop>
                  <v-btn icon @click.stop.prevent="edit(index, item)">
                    <v-icon>{{ editing.id === item.id ? 'mdi-check' : 'mdi-pencil' }}</v-icon>
                  </v-btn>
                </v-list-item-action>
              </template>
            </v-combobox>
          </v-col>
          <v-col cols="12" md="6">
            <v-textarea
                v-model="form.productInfo"
                label="מפרט"
                filled
                dense
                hide-details
            ></v-textarea>
          </v-col>
          <v-col cols="12" md="6">
            <v-textarea
                v-model="form.prices"
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
              <v-spacer></v-spacer>
              <v-btn
                  outlined
                  large
                  color="red"
                  @click="dialog = false"
              >
                ביטול
              </v-btn>
              <v-btn
                  outlined
                  large
                  color="green"
                  @click="addProduct"
                  :disabled="formInvalid"
              >
                צור
              </v-btn>
            </v-card-actions>
          </v-col>
        </v-row>
      </v-card>
    </v-dialog>
  </v-row>
</template>

<script>
export default {
  name: 'DialogCreate',
  props: ['product', 'value'],
  data: () => ({
    categoryList: ['מיתוג ושיווק', 'משרדי ואירגוני', 'שילוט ותצוגה', 'מתקנים ומעמדים', 'מדבקות וטפטים', 'מוצרי קד״מ'],
    form: {},
    activator: null,
    attach: null,
    editing: {},
    editingIndex: -1,
    items: [
      {header: 'בחר או צור תגית חדשה'},
    ],
    menu: false,
    productTags: [],
    x: 0,
    search: null,
    y: 0,
  }),
  computed: {
    formInvalid() {
      return !this.form.name
    },
    dialog: {
      get() {
        return this.value
      },
      set() {
        this.$emit('close', false)
      }
    },
  },
  watch: {
    "productTags" (val, prev) {
      if (val.length === prev.length) return

      val.map(v => {
        if (typeof v === 'string') {
          v = {
            text: v,
          }
          this.$store.dispatch('ProductTag/upsert', v)
        }
      })
    },
  },
  methods: {
    edit(index, item) {
      if (!this.editing.id) {
        console.log('no', index, item)
        this.editing = item
        this.editingIndex = index
      } else {
        this.$store.dispatch('ProductTag/upsert', this.editing)
        this.editing = {}
        this.editingIndex = -1

      }
    },
    filter(item, queryText, itemText) {
      if (item.header) return false

      const hasValue = val => val != null ? val : ''

      const text = hasValue(itemText)
      const query = hasValue(queryText)

      return text.toString()
          .toLowerCase()
          .indexOf(query.toString().toLowerCase()) > -1
    },
    addProduct() {
      if (!this.formInvalid) {
        const payload = {
          ...this.form,
          tags: this.productTags,
        }

        this.$store.dispatch('Product/upsert', payload)
      }
      this.dialog = false
    }
  },
}
</script>