<template>
  <v-list two-line>
    <template v-for="(attribute, i) in attributes">
      <v-list-item :key="'item_' + i">
        <v-list-item-content>
          <v-list-item-title v-html="attribute.name"></v-list-item-title>
          <v-list-item-subtitle>
            <v-chip class="ma-1" v-for="value in attribute.values" :key="value.text">
              {{ value.text }}
            </v-chip>
          </v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>

      <v-divider :key="'divider_' +i"></v-divider>
    </template>
  </v-list>
</template>

<script>
export default {
  name: 'ListAttributes',
  props: ['attributes'],
}
</script>