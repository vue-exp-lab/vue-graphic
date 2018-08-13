<template>
  <div class="fullDarkBackground" v-if="value"> 
    <div class="text-xs-center">
      <span class="caption teal--text"> {{value}} % </span>
      <v-progress-linear
        :value="value"
        color="teal"
      >
      </v-progress-linear>
    </div>
  </div>
</template>

<script>
export default {
  mounted () {
  },
  computed: {
    value: function () {
      return this.$store.getters.loadingProgress
    }
  }
}
</script>

<style lang='css'>
.fullDarkBackground{
  position: fixed;
  background: black;
  width: 100vw;
  height: 100vh;
  z-index: 100;
  padding: 20px;
}
.fullDarkBackground .text-xs-center{
  margin-top: 50%;
}
</style>
