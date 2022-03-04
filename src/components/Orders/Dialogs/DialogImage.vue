<template>
  <v-row justify="center">
    <v-dialog :value="true" persistent max-width="500">
      <v-card>
        <v-btn icon @click="closeDialog"><v-icon dark>mdi-close</v-icon></v-btn>
        <file-store v-model="order.file" @onUpload="handleUpload" @onDelete="handleDelete"/>
      </v-card>
    </v-dialog>
  </v-row>
</template>

<script>
import firebase from 'firebase/compat/app'
import { v4 as uuidv4 } from 'uuid';
import 'firebase/compat/firestore'
import 'firebase/compat/storage'
import { setTimeout } from 'timers'
export default {
  name:'DialogImage',
  props: ['order'],
  data: () => ({
    dialog: false,
  }),
  methods:{
    closeDialog() {
      this.$emit('close')
    },
    handleUpload(fileData) {
      const storageRef = firebase.storage().ref(`public/${uuidv4()}_${fileData.name}`).put(fileData);

      storageRef.on(
        firebase.storage.TaskEvent.STATE_CHANGED, {
          next: null,
          error: err => console.error(err),
          complete: () => {
            storageRef.snapshot.ref.getDownloadURL().then(url => {
              this.order.file = url
              this.$store.dispatch('Order/updateOrder', this.order)
            })
          }
        }
      )
      // setTimeout( () => this.$router.go({path: this.$router.path}), 3000)
    },
    handleDelete() {
      firebase.storage().refFromURL(this.order.file).delete()
        .then(() => {
          this.order.file = null
          this.$store.dispatch('Order/updateOrder', this.order)
        })
        .catch(error => console.error(error))
    }
  },
  components: {
    'file-store': require('@/components/Global/FileStore.vue').default
  }
}
</script>