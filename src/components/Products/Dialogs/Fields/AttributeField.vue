<template>
  <v-row>
    <v-col cols="5">
      <v-text-field v-model="attribute.name" label="שם מאפיין"/>
    </v-col>
    <v-col cols="5">
      <v-combobox
          :disabled="!attribute.name"
          v-model="attribute.inputs"
          :filter="filter"
          :hide-no-data="!search"
          :items="attribute.items"
          :search-input.sync="search"
          hide-selected
          label="וראציות"
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
          <v-chip v-else dark label small>{{ item.text }}</v-chip>
          <v-spacer></v-spacer>
          <v-list-item-action @click.stop>
            <v-btn icon @click.stop.prevent="edit(index, item)">
              <v-icon>{{ editing === item ? 'mdi-check' : 'mdi-pencil' }}</v-icon>
            </v-btn>
          </v-list-item-action>
        </template>
      </v-combobox>
    </v-col>
    <v-spacer></v-spacer>
    <v-col cols="1">
      <v-btn small color="error" @click="removeField">
        <v-icon>mdi-minus</v-icon>
      </v-btn>
    </v-col>
  </v-row>
</template>

<script>
export default {
  name: 'AttributeField',
  props: ['value'],
  data: () => ({
    editing: null,
    editingIndex: -1,
    search: null
  }),
  computed: {
    attribute: {
      get() {
        return this.value
      },
      set(val) {
        this.$emit('input', val)
      }
    }
  },
  methods: {
    removeField() {
      this.$emit('remove', this.attribute)
    },
    edit(index, item) {
      if (!this.editing) {
        this.editing = item
        this.editingIndex = index
      } else {
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
    }
  },
  watch: {
    'attribute.inputs': function (val, prev) {
      if (val.length === prev.length) return

      this.attribute.inputs = val.map(v => {
        if (typeof v === 'string') {
          v = {text: v}
          this.attribute.items.push(v)
        }

        return v
      })
    }
  }
}
</script>