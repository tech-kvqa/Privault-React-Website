<!-- src/components/PagePreview.vue -->
<template>
  <v-card class="preview-card" elevation="8" width="300">
    <v-img
      :src="imageSrc"
      :alt="`Preview of ${pageKey}`"
      height="180"
      cover
    />
    <v-card-text class="text-caption px-2">
      Preview of {{ pageKey.charAt(0).toUpperCase() + pageKey.slice(1) }} Page
    </v-card-text>
  </v-card>
</template>

<script>
export default {
  props: {
    pageKey: {
      type: String,
      required: true,
    },
  },
  computed: {
    imageSrc() {
      return `/images/previews/${this.pageKey}.jpg`; // e.g., /images/previews/about.jpg
    },
  },
};
</script>

<style scoped>
.preview-card {
  position: absolute;
  top: 100%;
  left: 0;
  z-index: 9999;
  margin-top: 8px;
  overflow: hidden;
  box-shadow: 0 6px 18px rgba(0, 0, 0, 0.15);
}
</style>
