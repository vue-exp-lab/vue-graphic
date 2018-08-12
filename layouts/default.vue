<template>
  <v-app dark>
    <v-navigation-drawer
      :mini-variant.sync="miniVariant"
      :clipped="clipped"
      v-model="drawer"
      fixed
      app
    >
      <v-list>
        <v-list-tile
          router
          :to="item.to"
          :key="i"
          v-for="(item, i) in items"
          exact
        >
          <v-list-tile-action>
            <v-icon v-html="item.icon"></v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title v-text="item.title"></v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
      </v-list>
    </v-navigation-drawer>
    <v-toolbar fixed app :clipped-left="clipped" v-bind:height="TOOLBAR_HEIGHT">
      <v-toolbar-side-icon @click="drawer = !drawer"></v-toolbar-side-icon>
      <v-toolbar-title v-text="title"></v-toolbar-title>
      <v-spacer></v-spacer>
      <v-toolbar-items>
        <div v-if="userImg" class="userImg">
          <img v-bind:src="userImg"/>
        </div>
      </v-toolbar-items>
    </v-toolbar>
    <v-content>
      <v-container>
        <nuxt />
      </v-container>
    </v-content>
  </v-app>
</template>

<script>
import {TOOLBAR_HEIGHT} from '~/config/ui'
export default {
  computed: {
    userImg: function () {
      console.log('this.$store.getters.activeUser.photoURL: ', this.$store.getters.activeUser.photoURL)
      const {activeUser = {}} = this.$store.getters
      const {photoURL} = activeUser || null
      return photoURL
    }
  },
  data () {
    return {
      TOOLBAR_HEIGHT: `${TOOLBAR_HEIGHT}px`,
      clipped: false,
      drawer: false,
      fixed: false,
      items: [
        { icon: 'apps', title: 'Welcome', to: '/' },
        { icon: 'bubble_chart', title: 'Inspire', to: '/inspire' }
      ],
      miniVariant: false,
      right: true,
      rightDrawer: false,
      title: 'Voice Man'
    }
  }
}
</script>

<style>
.container {
  padding: 0;
}
.userImg img{
  border-radius: 50%;
  width: 45px;
  margin-top: 3px;
}
</style>
