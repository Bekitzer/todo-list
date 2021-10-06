<template>
  <v-row justify="center">
    <v-dialog
      :value="true"
      persistent
      max-width="400"
    >
      <v-card>
        <v-card-title class="text-h5">Edit Client</v-card-title>
        <v-card-text>
          Edit the title of this client
          <v-text-field
            v-model="clientName"
          />
          <v-text-field
            v-model="clientPhone"
          />
          <v-text-field
            v-model="clientEmail"
          />
          <v-text-field
            v-model="clientNumber"
          />
          <v-text-field
            v-model="clientType"
          />
          <v-text-field
            v-model="clientAddress"
          />
          <v-text-field
            v-model="clientContactPerson"
          />
          <v-text-field
            v-model="clientContactPersonPhone"
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
            @keyup.enter="saveClient"
          >
            Save
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-row>
</template>

<script>
import { format } from 'date-fns'
  export default {
    data () {
      return {
        dialog: false,
      }
    },
    props: ['client'],
    data() {
      return {
        clientName: '',
        clientPhone: '',
        clientEmail: '',
        clientNumber: '',
        clientType: '',
        clientAddress: '',
        clientContactPerson: '',
        clientContactPersonPhone: ''
      }
    },
    computed: {
      clientFieldInvalid() {
        return
        !this.clientName || this.clientName === this.client.name
        !this.clientPhone || this.clientPhone === this.client.phone
        !this.clientEmail || this.clientEmail === this.client.email
        !this.clientNumber || this.clientNumber === this.client.number
        !this.clientType || this.clientType === this.client.type
        !this.clientAddress || this.clientAddress === this.client.address
        !this.clientContactPerson || this.clientContactPerson === this.client.contactPerson
        !this.clientContactPersonPhone || this.clientContactPersonPhone === this.client.contactPersonPhone
      }
    },
    methods: {
      saveClient() {
        if(!this.clientFieldInvalid){
          let payload = {
            id: this.client.id,
            phone: this.clientPhone,
            email: this.clientEmail,
            name: this.clientName,
            number: this.clientNumber,
            type: this.clientType,
            address: this.clientAddress,
            contactPerson: this.clientContactPerson,
            contactPersonPhone: this.clientContactPersonPhone,
            clientUpdated: format(new Date(Date.now()), 'dd/MM/yyyy HH:mm:ss' )
          }
          this.$store.dispatch('updateClient', payload)
          this.$emit('close')
        }
      }
    },
    mounted() {
      this.clientName = this.client.name
      this.clientPhone = this.client.phone
      this.clientEmail = this.client.email
      this.clientNumber = this.client.number
      this.clientType = this.client.type
      this.clientAddress = this.client.address
      this.clientContactPerson = this.client.contactPerson
      this.clientContactPersonPhone = this.client.contactPersonPhone
    }
  }
</script>