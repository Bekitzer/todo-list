<template>
	<div>
		<img class="spc-file" @click="chooseFile" :src="fileUrl || require('@/assets/upload.png')" alt="upload"/>

		<input type="file" ref="inputFile" v-show="false" @change="uploadFile" accept="image/*" />

		<div v-if="fileData && !fileUrl">Loading...</div>

		<v-btn :disabled="!fileUrl" @click="deleteFile">הסר תמונה</v-btn>
	</div>
</template>
<script>
export default {
	props: ['value'],
	data: () => ({
		fileData: null
	}),
	methods: {
		chooseFile() {
			this.$refs.inputFile.click()
		},
		uploadFile(event) {
			this.fileData = event.target.files[0]
			this.$emit('onUpload', this.fileData)
		},
		deleteFile() {
			this.$emit('onDelete')
			this.$refs.inputFile.value = null
			this.fileData = null
		}
	},
	computed: {
		fileUrl: {
			get() {
				return this.value
			},
			set(val) {
				this.$emit('input', val)
			}
		}
	}
}
</script>
