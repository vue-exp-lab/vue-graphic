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
      <div class='nav-bar'>
        <Button class="menuIconWrapper" @click="drawer = !drawer">
          <i class="menuIcon material-icons" >more_vert</i>
        </Button>
      </div>
      <v-content>
        <v-container column fill-height fluid>
          <nuxt />
        </v-container>
      </v-content>
      <Footer />
  </v-app>
</template>

<script>
import Footer from './components/Footer.vue'
export default {
  components: {Footer},
  computed: {
  },
  mounted () {
  },
  data () {
    return {
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
.nav-bar{
  position: fixed;
  z-index: 100;
}
.menuIconWrapper{
  width: 40px;
  height: 40px;
  border: rgba(255, 255, 255, 0.3) 1px solid;
  margin: 5px;
  color: rgba(255, 255, 255, 0.7);
}
.menuIconWrapper .menuIcon{
  line-height: 40px;
}
.container {
  padding: 0;
}
</style>
