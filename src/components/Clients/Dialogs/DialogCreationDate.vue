<template>
  <v-row justify="center">
    <v-dialog
      ref="dialog"
      :value="true"
      :return-value.sync="clientDate"
      persistent
      width="290px"
    >
      <v-date-picker
        v-model="clientDate"
        scrollable
      >
        <v-spacer></v-spacer>
        <v-btn
          text
          color="primary"
          @click="$emit('close')"
        >
          Cancel
        </v-btn>
        <v-btn
          text
          color="primary"
          @click="saveClient"
        >
          OK
        </v-btn>
      </v-date-picker>
    </v-dialog>
  </v-row>
</template>

<script>
  export default {
    props: ['client'],
    data () {
      return {
        clientDate: null
      }
    },
    methods: {
      saveClient() {
          let payload = {
            id: this.client.id,
            creationDate: this.clientDate
          }
          this.$store.dispatch('updateClientCreationDate', payload)
          this.$emit('close')
        }        
    },
    mounted() {
      if (this.client.creationDate) {
        this.clientDate = this.client.creationDate
      }
    }
  }
</script>