<!-- <template>
  <v-app>
    <v-main>
      <router-view/>
    </v-main>
  </v-app>
</template>

<script>

export default {
  name: 'App',

  data: () => ({
    //
  }),
}
</script> -->


<template>
  <v-app>
    <NavBar />
    <v-main>
      <transition name="fade" mode="out-in">
        <router-view />
      </transition>
    </v-main>
    <BookDemoButton />
     <!-- Book Demo Button -->
    <!-- <BookDemoButton @open-meeting="showMeetingDialog = true" /> -->

    <!-- Scheduler Popup Modal -->
    <!-- <v-dialog v-model="showMeetingDialog" max-width="900">
      <v-card>
        <v-card-title>Book a Demo</v-card-title>
        <v-card-text style="height: 600px;">
          <iframe
            src="https://calendar.app.google/81BuaveR2dU9RX3a6"
            width="100%"
            height="100%"
            frameborder="0"
            scrolling="no"
          ></iframe> -->
          <!-- <iframe
            src="https://calendly.com/privault-info/privault-demo"
            width="100%"
            height="100%"
            frameborder="0"
            scrolling="no"
          ></iframe> -->
        <!-- </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn text @click="showMeetingDialog = false">Close</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog> -->

    <Footer />
  </v-app>
</template>

<script>
import NavBar from './components/NavBar.vue'
import Footer from './components/Footer.vue'
import BookDemoButton from './components/BookDemoButton.vue'

export default {
  components: { NavBar, Footer, BookDemoButton },
  data() {
    return {
      showMeetingDialog: false,
    };
  },
}
</script>

<style>
.fade-enter-active, .fade-leave-active {
  transition: opacity 0.5s ease;
}
.fade-enter-from, .fade-leave-to {
  opacity: 0;
}

</style>