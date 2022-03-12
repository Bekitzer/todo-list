<template>
  <v-row justify="center">
    <v-dialog v-model="dialog" max-width="500">
      <v-card>
        <v-btn icon @click="dialog = false"><v-icon dark>mdi-close</v-icon></v-btn>
        <file-store v-model="order.file" @onUpload="handleUpload" @onDelete="handleDelete"/>
      </v-card>
    </v-dialog>
  </v-row>
</template>

<script>
import {storage} from '@/firebase';
import {ref, uploadBytes, getDownloadURL, deleteObject} from "firebase/storage";

import { v4 as uuidv4 } from 'uuid';

export default {
  name:'DialogImage',
  props: ['order', 'value'],
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
            this.order.file = url
            return this.$store.dispatch('Order/upsert', this.order)
          })
          .catch(err => console.error(err))
    },
    handleDelete() {
      const storageRef = ref(storage, this.order.file);

      deleteObject(storageRef)
          .then(() => {
            this.order.file = null
            return this.$store.dispatch('Order/upsert', this.order)
          })
          .catch(error => console.error(error))
    }
  },
  components: {
    'file-store': require('@/components/Global/FileStore').default
  }
}
</script>