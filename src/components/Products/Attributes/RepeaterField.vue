<template>
  <v-card >
    <v-card-text>
      <v-row v-for="(field, i) in fields" :key="i">
        <v-col cols="5">
          <v-text-field v-model="fields[i].name" label="שם מאפיין"/>
        </v-col>
        <v-col cols="5">
          <v-combobox
            :disabled="!fields[i].name"
            v-model="fields[i].values"
            @change="handleChange(i)"
            :filter="filter"
            :hide-no-data="!fields[i].search"
            :items="fields[i].items"
            :search-input.sync="fields[i].search"
            hide-selected
            label="חפש או צור תגית חדש"
            multiple
          >
            <template v-slot:no-data>
              <v-list-item>
                <span class="subheading">חדש</span>
                <v-chip label small>
                  {{ fields[i].search }}
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
                <v-icon small @click="parent.selectItem(item)">
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
              <v-chip v-else dark label small>
                {{ item.text }}
              </v-chip>
              <v-spacer></v-spacer>
              <v-list-item-action @click.stop>
                <v-btn icon @click.stop.prevent="edit(index, item)">
                  <v-icon>{{ editing !== item ? 'mdi-pencil' : 'mdi-check' }}</v-icon>
                </v-btn>
              </v-list-item-action>
            </template>
          </v-combobox>
        </v-col>
        <v-spacer></v-spacer>
        <v-col cols="1">
          <v-btn color="error" @click="removeField(i)">
            <v-icon>
                mdi-minus
              </v-icon>
          </v-btn>
        </v-col>
      </v-row>

      <v-btn color="primary" @click="addField">
        <v-icon>
          mdi-plus
        </v-icon>
      </v-btn>
    </v-card-text>
  </v-card>
</template>

<script>
const defaultField = () => ({
  name: '',
  values: [],
  items: [],
  search: null
})

export default {
  name: 'RepeaterField',
  props: {
    value: {
      default: () => ([defaultField()])
    }
  },
  data: () => ({
    editing: null,
    editingIndex: -1
  }),
  methods: {
    addField() {
      this.fields.push(defaultField());
    },
    removeField(index) {
      this.fields.splice(index, 1);
      this.fields = [...this.fields]
    },
    edit (index, item) {
      if (!this.editing) {
        this.editing = item
        this.editingIndex = index
      } else {
        this.editing = null
        this.editingIndex = -1
        this.fields = [...this.fields]
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
    handleChange(index){
      this.fields[index].values = this.fields[index].values.map(v => {
        if (typeof v === 'string') {
          v = {
            text: v
          }

          this.fields[index].items.push(v)
        }

        return v
      });

      this.fields = [...this.fields]
    }
  },
  computed: {
    fields: {
      get() {
        return this.value
      },
      set(val) {
        this.$emit('change', val.filter(({name}) => name))
        this.$emit('input', val)
      }
    }
  }
}
</script>