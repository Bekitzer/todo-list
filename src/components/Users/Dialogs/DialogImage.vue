<template>
  <v-row justify="center">
    <v-dialog :value="true" persistent max-width="300">
      <v-card>
        <v-btn icon @click="closeDialog"><v-icon dark>mdi-close</v-icon></v-btn>
        <file-store v-model="user.avatar" @onUpload="handleUpload" @onDelete="handleDelete"/>
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
  props: ['user'],
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
              this.user.avatar = url
              this.$store.dispatch('User/updateUser', this.user)
            })
          }
        }
      )
      // setTimeout( () => this.$router.go({path: this.$router.path}), 3000)
    },
    handleDelete() {
      firebase.storage().refFromURL(this.user.avatar).delete()
        .then(() => {
          this.user.avatar = null
          this.$store.dispatch('User/updateUser', this.user)
        })
        .catch(error => console.error(error))
    }
  },
  components: {
    'file-store': require('@/components/Global/FileStore.vue').default
  }
}
</script>