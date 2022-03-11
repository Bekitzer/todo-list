<template>
  <v-combobox
      v-model="tags"
      :filter="filter"
      :hide-no-data="!search"
      :items="productsTags"
      :search-input.sync="search"
      hide-selected
      label="תגיות"
      placeholder="חפש או צור חדש"
      multiple
      small-chips
      filled
      dense
      hide-details
  >
    <template v-slot:no-data>
      <v-list-item>
        <span class="subheading">חדש</span>
        <v-chip label small>{{ search }}</v-chip>
      </v-list-item>
    </template>
    <template v-slot:selection="{ attrs, item, parent, selected }">
      <v-chip v-if="item === Object(item)" v-bind="attrs" :input-value="selected" label small>
        <span class="pr-2">{{ item.text }}</span>
        <v-icon small @click="parent.selectItem(item)">$delete</v-icon>
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
      />
      <v-chip v-else dark label small>
        {{ item.text }}
      </v-chip>
      <v-spacer></v-spacer>
      <v-list-item-action @click.stop>
        <v-btn icon @click.stop.prevent="edit(index, item)">
          <v-icon>{{ editing === item ? 'mdi-check' : 'mdi-pencil' }}</v-icon>
        </v-btn>
      </v-list-item-action>
    </template>
  </v-combobox>
</template>

<script>
export default {
  name: 'Tags',
  props: {
    value: {
      default: () => ([])
    }
  },
  data: () => ({
    editing: null,
    editingIndex: -1,
    search: null
  }),
  computed: {
    productsTags() {
      return this.$store.state.ProductTag.list
    },
    tags: {
      get() {
        return this.value
      },
      set(val) {
        const selectedItems = val.map(v => {
          if (typeof v === 'string') {
            v = {text: v}
            this.$store.dispatch('ProductTag/upsert', v)
          }
          return v
        })
        this.$emit('input', selectedItems)
      }
    }
  },
  methods: {
    edit(index, item) {
      if (!this.editing) {
        this.editing = item
        this.editingIndex = index
      } else {
        this.$store.dispatch('ProductTag/upsert', item)
        this.editing = null
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
  }
}
</script>