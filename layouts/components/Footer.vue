<template>
  <v-footer
    dark
    height="auto"
  >
    <v-card
      class="flex grey darken-4 "
      flat
      tile
    >
      <v-card-title>
        <strong class="subheading justify-center">Get connected with us on social networks!</strong>

        <v-spacer></v-spacer>

        <v-btn
          v-for="icon in []"
          :key="icon"
          class="mx-3"
          dark
          icon
        >
          <v-icon size="24px">{{ icon }}</v-icon>
        </v-btn>
      </v-card-title>

      <v-card-actions class="grey darken-4 justify-center">
        &copy;2018 — <strong> Maths Artist</strong>
      </v-card-actions>
    </v-card>
  </v-footer>
</template>