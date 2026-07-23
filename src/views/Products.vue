<template>
  <v-container>
    <h2 class="text-h4 mb-4">Our Products</h2>
    <v-select
      label="Select a Product"
      :items="productPages"
      v-model="selected"
      @change="navigateToProduct"
    />
  </v-container>
</template>

<script>
export default {
  data() {
    return {
      selected: null,
      productPages: [
        'Data Mapping',
        'Consent Management',
        'DSAR Portal',
        'Risk Assessment',
        'Incident Management',
        'Vendor Management',
        'Audit Dashboard',
        'DPIA Generator',
        'Training Module',
        'Policy Analyzer'
      ],
    }
  },
  methods: {
    navigateToProduct(product) {
      // You can later route to /products/data-mapping etc.
      alert(`Navigate to product: ${product}`)
    },
  },
}
</script>
