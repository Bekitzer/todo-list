<template>
  <v-row justify="center">
    <v-dialog v-model="dialog" max-width="300">
      <v-card>
        <v-btn icon @click="closeDialog">
          <v-icon dark>mdi-close</v-icon>
        </v-btn>
        <file-store v-model="client.avatar" @onUpload="handleUpload" @onDelete="handleDelete"/>
      </v-card>
    </v-dialog>
  </v-row>
</template>

<script>
import {v4 as uuidv4} from 'uuid';
import {storage} from '@/firebase';
import {ref, uploadBytes, getDownloadURL, deleteObject} from "firebase/storage";

export default {
  name: 'DialogImage',
  props: ['client', 'value'],
  data: () => ({}),
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
    handleUpload(fileData) {
      const storageRef = ref(storage, `public/${uuidv4()}_${fileData.name}`)

      uploadBytes(storageRef, fileData)
          .then((snapshot) => getDownloadURL(snapshot.ref))
          .then((url) => {
            this.client.avatar = url
            return this.$store.dispatch('Client/upsert', this.client)
          })
          .catch(err => console.error(err))
    },
    handleDelete() {
      const storageRef = ref(storage, this.client.avatar);

      deleteObject(storageRef)
          .then(() => {
            this.client.avatar = null
            return this.$store.dispatch('Client/upsert', this.client)
          })
          .catch(error => console.error(error))
    }
  },
  components: {
    'file-store': require('@/components/Global/FileStore').default
  }
}
</script>