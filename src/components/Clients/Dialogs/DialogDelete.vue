<template>
  <v-row justify="center">
    <v-dialog v-model="dialog" max-width="500">
      <v-card>
        <v-card-title>מחיקת לקוח</v-card-title>
        <v-card-text>אתה בטוח שאתה רוצה למחוק לקוח זה?</v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            fab
            icon
            outlined
            large
            color="red"
            @click="dialog = false"
          >
            <v-icon>
              mdi-close
            </v-icon>
          </v-btn>
          <v-btn
            fab
            icon
            outlined
            large
            color="green"
            @click="clientDelete"
          >
            <v-icon>
              mdi-check
            </v-icon>
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
        id: null,
      }
    },
    props: ['client', 'value'],
    computed: {
      dialog: {
        get() {
          return this.value
        },
        set() {
          this.$emit('close', false)
        }
      },
    },
    methods: {
      clientDelete() {
        this.dialog = false
        this.$store.dispatch('Client/deleteClient', this.$route.params.id)
        this.$router.push('/clients')
      }
    }
  }
</script>