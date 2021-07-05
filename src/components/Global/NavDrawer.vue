<template>
    <v-card>
    <v-img
      height="140"
      gradient="to top right, rgba(19,84,122,.5), rgba(128,208,199,.8)"
      src="images/mountains.jpg"
      class="pa-6"
    >
      <v-row
      >
        <v-col
          align-self="start"
          class="pa-0"
          cols="12"
        >
          <v-avatar
            class="profile"
            color="grey"
            size="70"        
          >
            <v-img 
                src="https://cdn.vuetifyjs.com/images/profiles/marcus.jpg"
                rounded
            ></v-img>
          </v-avatar>
        </v-col>
        <v-col 
            class="pa-0 ma-0"
        >
          <v-list-item
            class="pa-0 ma-0"
            dark
          >
            <v-list-item-content
                class="pa-0 ma-0"
            >
              <v-list-item-title class="text-h6">
                Marcus Obrien
              </v-list-item-title>
              <v-list-item-subtitle>Network Engineer</v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>
        </v-col>
      </v-row>
    </v-img>
  </v-card>
</template>

<script>
export default {

}
</script>

<style>

</style>
