<template>
  <div>
    <div>
      <v-btn v-if="!fileData" @click="chooseFile">Choose Avatar</v-btn>
      <input type="file" ref="inputFile" v-show="false" @change="uploadFile" accept="image/*" >
    </div>

    <div v-if="fileData && !fileUrl">Loading...</div>

    <div v-if="fileUrl">
      <v-btn icon @click="deleteFile">
        <v-icon>mdi-close</v-icon>
      </v-btn>
      <img class="preview" height="50" width="50" :src="fileUrl">
    </div>
  </div>
</template>
<script>
import  firebase from 'firebase/compat/app'
import 'firebase/compat/firestore'
import 'firebase/compat/storage'
import database from '@/firebase'
export default {
    props: {
      folder: {
        type: String,
        required: false,
        default: 'public'
      }
    },
    data: () => ({
      fileUrl: '',
      fileData: null,
    }),
    methods: {
      onChange() {},
      chooseFile() {
        this.$refs.inputFile.click()
      },
      uploadFile(event) {
        this.fileData = event.target.files[0];
        this.handleUpload()
      },
      handleUpload() {
        const storageRef = firebase.storage().ref(`${this.folder}/${this.fileData.name}`).put(this.fileData);

        storageRef.on(
          firebase.storage.TaskEvent.STATE_CHANGED, {
            next: null,
            error: err => console.error(err),
            complete: () => {
              storageRef.snapshot.ref.getDownloadURL().then(url => {
                this.fileUrl = url;
                this.$emit('change', this.fileUrl)
              })
            }
          }
        )
      },
      deleteFile() {
        const fileRef = firebase.storage().refFromURL(this.fileUrl);
        this.fileUrl = null;
        fileRef.delete()
          .then(() => {
            this.$refs.inputFile.value = null;
            this.fileData = null
            this.$emit('change', this.fileUrl)
          })
          .catch(error => console.error(error))
      }
    },
  }
</script>

