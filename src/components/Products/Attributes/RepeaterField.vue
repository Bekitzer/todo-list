<template>
  <v-card >
    <v-card-text>
      <v-row v-for="(field, i) in fields" :key="i">
        <v-col cols="5">
          <v-text-field v-model="fields[i].name" label="שם מאפיין"/>
        </v-col>
        <v-col cols="5">
          <v-combobox
            v-model="fields[i].values"
            @change="handleChange(i)"
            :filter="filter"
            :hide-no-data="!search"
            :items="fields[i].items"
            :search-input.sync="search"
            hide-selected
            label="חפש או צור תגית חדש"
            multiple
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

    <v-card-actions>
      <v-btn color="success" @click="saveChanges" block>
        Save changes
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
export default {
  name: 'RepeaterField',
  data: () => ({
    fields: [],
    editing: null,
    editingIndex: -1,
    search: null,
  }),
  created() {
    this.addField()
  },
  methods: {
    addField() {
      this.fields.push({name: '', values: [], items: []});
    },
    removeField(index) {
      this.fields.splice(index, 1);
    },
    saveChanges() {
      console.log('TODO: save those values to DB', this.fields)
      // TODO: the collection should look like this:
      // attributes: {
          // id: ABC
          // name: color
          // values: ['black', 'white']
          // product_id: xyz
      // }

      // variations: {
        // attribute_id: ABC
        // attribute_value: 'black'
        // product_id: xyz
        // supplier_id: 123
        // price_per_unit: $12
        // price_amount_buckets: [
        //  {min: 1, max: 5, price_per_unit: $7}
        //  {min: 6, max: 20, price_per_unit: $5}
        //  {min: 6, price_per_unit: $5}
        // ]
      // }
    },
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
    }
  },
}
</script>