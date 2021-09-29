<template>
  <v-row justify="center">
    <v-dialog
      :value="true"
      persistent
      max-width="290"
    >
      <v-card>
        <v-card-title class="text-h5">Edit Client</v-card-title>
        <v-card-text>
          Edit the title of this client
          <v-text-field 
            v-model="clientName"
            @keyup.enter="saveClient"
          />
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            text
            @click="$emit('close')"
          >
            Cancel
          </v-btn>
          <v-btn
            color="red darken-1"
            text
            @click="saveClient"
            :disabled="clientFieldInvalid"
          >
            Save
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-row>
</template>

<script>
  export default {
    data () {
      return {
        dialog: false,
      }
    },
    props: ['client'],
    data() {
      return {
        clientName: null
      }
    },
    computed: {
      clientFieldInvalid() {
        return 
        !this.clientName || this.clientName === this.client.name
      }
    },
    methods: {
      saveClient() {
        if(!this.clientFieldInvalid){
          let payload = {
            id: this.client.id,
            name: this.clientName
          }
          this.$store.dispatch('updateClient', payload)
          this.$emit('close')
          this.$vuetify.goTo(0, ({ duration:0 }))
        }        
      }
    },
    mounted() {
      this.clientName = this.client.name
    }
  }
</script>