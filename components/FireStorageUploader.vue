<template>
<div>
    <div class="text-xs-center">
    </div>
    <a @click='handleClickCloudUpload'> 
        <i class='iconSize material-icons dark' >cloud_upload</i>
    </a>
  </div>
</template>

<script>
import storageRef from '~/services/fire-storage'
import firebase from '~/services/fireinit'
const METADATA_AUDIO = 'audio/*'
export default {
  props: ['audioItem'],
  methods: {
    handleClickCloudUpload () {
      const store = this.$store
      store.commit('setLoadingProgress', {value: 10})
      const { blob, name } = this.audioItem
      const uploadRef = storageRef.child(`sound/${name}`)
      const uploadTask = uploadRef.put(blob, { contentType: METADATA_AUDIO })

      // Listen for state changes, errors, and completion of the upload.
      uploadTask.on(
        firebase.storage.TaskEvent.STATE_CHANGED, // or 'state_changed'
        function (snapshot) {
          // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
          var progress = snapshot.bytesTransferred / snapshot.totalBytes * 100
          store.commit('setLoadingProgress', {value: progress})
          switch (snapshot.state) {
            case firebase.storage.TaskState.PAUSED: // or 'paused'
              console.log('Upload is paused')
              break
            case firebase.storage.TaskState.RUNNING: // or 'running'
              console.log('Upload is running')
              break
          }
        },
        function (error) {
          switch (error.code) {
            case 'storage/unauthorized':
              console.log(' -=-=-=-= storage/unauthorized')
              break

            case 'storage/canceled':
              console.log(' -=-=-=-= storage/canceled')
              break

            case 'storage/unknown':
              console.log(' -=-=-=-= storage/unknown')
              break
          }
        },
        function () {
          // Upload completed successfully, now we can get the download URL
          uploadTask.snapshot.ref.getDownloadURL().then(function (downloadURL) {
            store.commit('setLoadingProgress', {value: null})
          })
        }
      )
    }
  }
}
</script>

<style lang='css'>
</style>
