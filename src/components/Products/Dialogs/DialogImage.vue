<template>
  <v-row justify="center">
    <v-dialog v-model="dialog" max-width="300">
      <v-card>
        <v-btn icon @click="dialog = false"><v-icon dark>mdi-close</v-icon></v-btn>
        <file-store v-model="product.file" @onUpload="handleUpload" @onDelete="handleDelete"/>
      </v-card>
    </v-dialog>
  </v-row>
</template>

<script>
import firebase from 'firebase/compat/app'
import { v4 as uuidv4 } from 'uuid';
import 'firebase/compat/firestore'
import 'firebase/compat/storage'

export default {
  name:'DialogImage',
  props: ['product', 'value'],
  data: () => ({
  }),
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
  methods:{
    handleUpload(fileData) {
      const storageRef = firebase.storage().ref(`public/${uuidv4()}_${fileData.name}`).put(fileData);

      storageRef.on(
        firebase.storage.TaskEvent.STATE_CHANGED, {
          next: null,
          error: err => console.error(err),
          complete: () => {
            storageRef.snapshot.ref.getDownloadURL().then(url => {
              this.product.file = url
              this.$store.dispatch('Product/updateProduct', this.product)
            })
          }
        }
      )
      // setTimeout( () => this.$router.go({path: this.$router.path}), 3000)
    },
    handleDelete() {
      firebase.storage().refFromURL(this.product.file).delete()
        .then(() => {
          this.product.file = null
          this.$store.dispatch('Product/updateProduct', this.product)
        })
        .catch(error => console.error(error))
    }
  },
  components: {
    'file-store': require('@/components/Global/FileStore.vue').default
  }
}
</script>