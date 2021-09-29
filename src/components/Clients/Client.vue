<template>
  <div>        
    <v-list-item
      @click="$store.dispatch('taskDone', client.id)"
      :class="{ 'blue lighten-5' : client.done }"
      class="white"
      :ripple="false"
    >
      <template v-slot:default>
        <v-list-item-action>
          <v-checkbox :input-value="client.done"></v-checkbox>
        </v-list-item-action>
          <v-list-item-content
            :class="{ 'text-decoration-line-through' : client.done }"
          >
          <v-list-item-title>{{client.name}}</v-list-item-title>
        <v-list-item-subtitle>{{client.phone}}</v-list-item-subtitle>
        <v-list-item-subtitle>{{client.contactPerson}}</v-list-item-subtitle>
        <v-list-item-subtitle>{{client.contactPersonPhone}}</v-list-item-subtitle>
        <v-list-item-subtitle>{{client.type}}</v-list-item-subtitle>
        <v-list-item-subtitle>{{client.number}}</v-list-item-subtitle>
        <v-list-item-subtitle>{{client.address}}</v-list-item-subtitle>
        </v-list-item-content>
        <v-list-item-action v-if="client.creationDate">
          <v-list-item-action-text>
            <v-icon small>
              mdi-calendar
            </v-icon>
            {{ client.creationDate | niceDate}}
          </v-list-item-action-text>
        </v-list-item-action>
        <v-list-item-action>
          <client-menu :client='client' />
        </v-list-item-action>
        <v-list-item-action
          v-if="$store.state.sorting"
        >
          <v-btn
            icon
          >
            <v-icon                
              color="primary"
              class="handle"
            >
              mdi-drag-horizontal-variant
            </v-icon>
          </v-btn>
        </v-list-item-action>
      </template>
    </v-list-item>
    <v-divider></v-divider>    
  </div>
</template>

<script>
import { format } from 'date-fns'
export default {
  name: 'Client',
  filters: {
    niceDate(value) {
      return format(new Date(value), 'MMM d')
    }
  },
  props: ['client'],
  components: {        
    'client-menu': require('@/components/Clients/ClientMenu.vue').default
  }
}
</script>
<style lang="sass">
  .sortable-ghost
    opacity: 0
  .sortable-drag
    box-shadow: 0 0 10px rgba(0,0,0,.3)
</style>
