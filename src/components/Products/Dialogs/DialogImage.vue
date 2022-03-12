<template>
  <v-row justify="center">
    <v-dialog v-model="dialog" max-width="300">
      <v-card>
        <v-btn icon @click="dialog = false">
          <v-icon dark>mdi-close</v-icon>
        </v-btn>
        <file-store v-model="product.file" @onUpload="handleUpload" @onDelete="handleDelete"/>
      </v-card>
    </v-dialog>
  </v-row>
</template>

<script>
import { v4 as uuidv4 } from 'uuid';
import {deleteObject, getDownloadURL, ref, uploadBytes} from 'firebase/storage';
import {storage} from '@/firebase';

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
      const storageRef = ref(storage, `public/${uuidv4()}_${fileData.name}`)

      uploadBytes(storageRef, fileData)
          .then((snapshot) => getDownloadURL(snapshot.ref))
          .then((url) => {
            this.product.file = url
            return this.$store.dispatch('Product/upsert', this.product)
          })
          .catch(err => console.error(err))
    },
    handleDelete() {
      const storageRef = ref(storage, this.product.file);

      deleteObject(storageRef)
          .then(() => {
            this.product.file = null
            return this.$store.dispatch('Product/upsert', this.product)
          })
          .catch(error => console.error(error))
    }
  },
  components: {
    'file-store': require('@/components/Global/FileStore.vue').default
  }
}
</script>