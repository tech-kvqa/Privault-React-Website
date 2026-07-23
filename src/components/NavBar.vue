<!-- <template>
  <v-app-bar app color="background" flat>
    <v-toolbar-title class="text-primary">CyberShield</v-toolbar-title>
    <v-spacer />
    <v-btn text to="/">Home</v-btn>
    <v-btn text to="/about">About</v-btn> -->
    <!-- <v-btn text to="/products">Products</v-btn> -->
    <!-- <v-menu offset-y>
        <template #activator="{ on, attrs }">
            <v-btn text v-bind="attrs" v-on="on">Product</v-btn>
        </template>
        <v-list>
            <v-list-item v-for="item in products" :key="item.title" @click="goTo(item.route)">
            <v-list-item-title>{{ item.title }}</v-list-item-title>
            </v-list-item>
        </v-list>
    </v-menu>
    <v-btn text to="/contact">Contact</v-btn>
  </v-app-bar>
</template>

<script>
export default {
  data() {
    return {
      products: [
        { title: 'Consent Management', route: '/product/consent-management' },
        { title: 'Compliance Metrics', route: '/product/compliance-metrics' },
        { title: 'Incident Management', route: '/product/incident-management' },
        { title: 'Risk Assessment', route: '/product/risk-assessment' },
        { title: 'Governance', route: '/product/governance' },
        { title: 'DSR Management', route: '/product/dsr-management' },
        { title: 'Vendor Management', route: '/product/vendor-management' },
        { title: 'Data Minimization', route: '/product/data-minimization' },
        { title: 'Phishing App', route: '/product/phishing-app' }
      ]
    }
  },
  methods: {
    goTo(route) {
      this.$router.push(route)
    }
  }
}
</script>
 -->


<template>
  <v-app-bar app flat class="navbar-background">
    <v-container class="pa-0" fluid>
      <v-row align="center" no-gutters>
        <!-- Logo -->
        <v-col cols="auto">
          <router-link to="/">
            <v-img
              src="@/assets/PRIVAULT_BG.png"
              class="logo"
              height="200"
              width="200"
              contain
            ></v-img>
          </router-link>
        </v-col>

        <v-spacer />

        <!-- Nav Buttons -->
        <v-col cols="auto">
          <v-btn variant="plain" color="#1f3557" class="custom-btn no-ripple" rounded="xl" to="/">Home</v-btn>

          <v-btn variant="plain" color="#1f3557" class="custom-btn no-ripple" rounded="xl" to="/about">About</v-btn>

          <!-- <v-menu
            v-model="productMenu"
            open-on-hover
            offset-y
            transition="slide-x-transition"
            content-class="dropdown-content"
          > -->
          <!-- <v-menu
            v-model="productMenu"
            :open-on-hover="!isMobile"
            offset-y
            transition="slide-x-transition"
            content-class="dropdown-content"
          >

            <template v-slot:activator="{ props }"> -->
              <!-- <v-btn 
                variant="plain" 
                color="#1f3557" 
                class="custom-btn no-ripple" 
                rounded="xl" 
                v-bind="props"
                :class="{ 'active-btn': isProductActive }"
              >
              Product</v-btn> -->
              <!-- <v-btn
                variant="plain"
                class="custom-btn no-ripple"
                rounded="xl"
                v-bind="props"
                :class="{ 'router-link-active': isProductActive }"
              >
                Product
              </v-btn> -->
              <!-- <v-btn
                variant="plain"
                class="custom-btn no-ripple"
                rounded="xl"
                v-bind="props"
                @click="isMobile && (productMenu = !productMenu)"
              >
                Product
              </v-btn>
            </template>

            <v-list
              class="dropdown-list"
              @mouseleave="productMenu = false"
            >
              <v-list-item
                v-for="item in products"
                :key="item.title"
                :to="item.route"
                link
                rounded="xl"
                @click="productMenu = false"
              >
                <v-list-item-title>{{ item.title }}</v-list-item-title>
              </v-list-item>
            </v-list>
          </v-menu> -->

          <v-menu
            v-model="productMenu"
            :open-on-hover="!isMobile"
            location="bottom"
            transition="slide-y-transition"
            content-class="dropdown-content"
          >
            <template #activator="{ props }">
              <v-btn
                v-bind="props"
                variant="plain"
                class="custom-btn no-ripple"
                rounded="xl"
              >
                Product
              </v-btn>
            </template>

            <v-list class="dropdown-list">
              <v-list-item
                v-for="item in products"
                :key="item.title"
                :to="item.route"
                @click="productMenu = false"
              >
                <v-list-item-title>{{ item.title }}</v-list-item-title>
              </v-list-item>
            </v-list>
          </v-menu>

          <v-btn variant="plain" color="#1f3557" class="custom-btn no-ripple" rounded="xl" to="/contact">Contact</v-btn>
        </v-col>
      </v-row>
    </v-container>
  </v-app-bar>
</template>

<!-- <script>
import PagePreview from './PagePreview.vue';

export default {
  components: {
    PagePreview
  },
  data() {
    return {
      productMenu: false, // Controls Product menu state
      // isMobile: false,
      products: [
        { title: 'Compliance Metrics', route: '/product/compliance-metrics' },
        { title: 'Breach Management', route: '/product/breach-management' },
        { title: 'Data Protection Impact Assessment', route: '/product/dpia' },
        { title: 'Governance', route: '/product/governance' },
        { title: 'DSR Management', route: '/product/dsr-management' },
        { title: 'Vendor Management', route: '/product/vendor-management' },
        { title: 'Phishing App', route: '/product/phishing-app' }
      ]
    }
  },

  // mounted() {
  //   this.isMobile = window.matchMedia('(max-width: 768px)').matches
  // },

  computed: {
    isProductActive() {
      return this.$route.path.startsWith('/product')
    },

    isMobile() {
      return this.$vuetify.display.smAndDown
    }
  }
}
</script> -->
<script>
import { useDisplay } from 'vuetify'

export default {
  data() {
    return {
      productMenu: false,
      products: [
        { title: 'Compliance Metrics', route: '/product/compliance-metrics' },
        { title: 'Breach Management', route: '/product/breach-management' },
        { title: 'Data Protection Impact Assessment', route: '/product/dpia' },
        { title: 'Governance', route: '/product/governance' },
        { title: 'DSR Management', route: '/product/dsr-management' },
        { title: 'Vendor Management', route: '/product/vendor-management' },
        { title: 'Phishing App', route: '/product/phishing-app' }
      ]
    }
  },

  setup() {
    const { smAndDown } = useDisplay()
    return { smAndDown }
  },

  computed: {
    isMobile() {
      return this.smAndDown
    }
  }
}

</script>

<style scoped>
.navbar-background {
  background-color: rgb(242, 244, 252)
}
.logo {
  margin-left: 0px;
}

::v-deep(.dropdown-content.v-overlay__content) {
  background-color: #1f3557 !important;
  border-radius: 8px;
  padding: 0;
  overflow: hidden;
}

::v-deep(.dropdown-content .v-list) {
  background-color: transparent !important;
}

::v-deep(.dropdown-content .v-list-item) {
  background-color: transparent !important;
  color: white !important;
  transition: background-color 0.3s ease;
}

::v-deep(.dropdown-content .v-list-item:hover) {
  background-color: #2c4d7a !important;
  color: white !important;
}

::v-deep(.preview-overlay.v-overlay__content) {
  margin-top: 12px;
  border-radius: 10px;
  overflow: hidden;
  max-width: 320px;
  pointer-events: none;
}

.custom-btn {
  transition: transform 0.2s ease, background-color 0.2s ease;
  background-color: transparent !important;
  box-shadow: none !important;
  font-weight: 500;
}

.custom-btn:hover {
  transform: translateY(-2px);
  background-color: transparent !important;
  font-weight: 700;
}

.custom-btn:focus,
.custom-btn:active {
  background-color: transparent !important;
  box-shadow: none !important;
}

.no-ripple .v-ripple__container {
  display: none !important;
}

.no-ripple:focus-visible {
  outline: none !important;
}

/* Active state for Product */
::v-deep(.active-btn .v-btn__content) {
  color: #1f3557 !important;  /* ✅ matches Home/About highlight */
}

::v-deep(.active-btn) {
  color: #1f3557 !important;   /* apply to button */
}

.router-link-active .v-btn__content {
  color: #1f3557 !important;
}

@media (max-width: 768px) {
  .logo {
    width: 120px !important;
    height: auto !important;
  }
}

</style>

