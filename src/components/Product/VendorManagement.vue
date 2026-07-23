<!-- <template>
  <v-container class="py-16">
    <h1 class="text-h3 font-weight-bold mb-4" data-aos="fade-up">Vendor Management</h1>
    <p class="text-body-1" data-aos="fade-up" data-aos-delay="100">
      Evaluate and monitor vendors’ data handling practices for compliance.
    </p>
  </v-container>
</template>

<script>
export default {
  name: 'VendorManagement'
}
</script> -->


<!-- <template>
  <v-container fluid class="vendor-page pa-0">
    <div class="hero-section" data-aos="fade-down">
      <h1 class="text-h2 text-primary mb-2">Vendor Management</h1>
      <p class="text-subtitle-1">Monitor, assess, and manage third-party vendors handling sensitive data.</p>
    </div>

    <v-container class="mt-10" data-aos="fade-up">
      <v-row>
        <v-col cols="12" md="6">
          <h2 class="text-h5 font-weight-bold">Overview</h2>
          <p>
            Ensure your vendors comply with privacy and data protection standards by maintaining comprehensive records, performing risk assessments, and tracking data processing agreements (DPAs).
          </p>
        </v-col>
        <v-col cols="12" md="6">
          <v-img
            src="https://via.placeholder.com/500x300"
            alt="Vendor Management"
            class="rounded"
          ></v-img>
        </v-col>
      </v-row>
    </v-container>

    <v-container class="mt-12" data-aos="fade-up">
      <h2 class="text-h5 font-weight-bold mb-6">Key Features</h2>
      <v-row dense>
        <v-col cols="12" md="4" v-for="(feature, i) in features" :key="i" data-aos="zoom-in">
          <v-card class="pa-4" elevation="2">
            <v-icon class="mb-2" size="32">{{ feature.icon }}</v-icon>
            <h3 class="text-subtitle-1 font-weight-medium">{{ feature.title }}</h3>
            <p class="text-body-2">{{ feature.description }}</p>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </v-container>
</template>

<script>
export default {
  name: "VendorManagement",
  data() {
    return {
      features: [
        {
          icon: "mdi-briefcase-account",
          title: "Vendor Registry",
          description: "Maintain an up-to-date inventory of all vendors and third parties."
        },
        {
          icon: "mdi-shield-check",
          title: "Compliance Checks",
          description: "Perform periodic compliance assessments and track certifications."
        },
        {
          icon: "mdi-file-document-multiple",
          title: "DPA Repository",
          description: "Store and manage Data Processing Agreements securely and accessibly."
        }
      ]
    };
  },
  mounted() {
    import("aos/dist/aos.css");
    import("aos").then(AOS => AOS.init({ duration: 1000 }));
  }
};
</script>

<style scoped>
.vendor-page {
  background: linear-gradient(to bottom right, #f0f4f8, #e3f0ff);
  padding-bottom: 100px;
}

.hero-section {
  text-align: center;
  padding: 80px 20px;
  background-color: #1f3557;
  color: #e3f0ff;
}
</style> -->


<template>
  <v-container fluid class="vendor-page pa-0">
    <!-- Hero Section -->
    <div class="hero-section" data-aos="fade-down">
      <h1 class="text-h2 text-primary mb-2">Vendor Management</h1>
      <p class="text-subtitle-1">
        Monitor, assess, and manage third-party vendors to ensure data protection and regulatory compliance.
      </p>
    </div>

    <!-- Overview Section -->
    <div class="overview-section">
      <v-container
        class="mt-10 text-center"
        data-aos="fade-up"
      >
        <h2 class="text-h5 font-weight-bold text-center mb-4">Overview</h2>
        
        <v-row justify="center">
          <v-col cols="12" md="10">
            <p class="text-body-1 overview-text">
              The Vendor Management module ensures that third-party vendors or partners who process or access personal and sensitive data are held to the same data protection standards as your organization. It offers visibility into vendor risk, contract compliance, and data processing operations through audits, assessments, dashboards, and automated alerts.
            </p>
          </v-col>
        </v-row>
      </v-container>
    </div>

    <!-- Screenshots Section -->
    <div class="screenshots-section">
      <v-container class="mt-12 text-center" data-aos="fade-up">
        <h2 class="text-h5 font-weight-bold mb-6 features-title">Product Screenshots</h2>
        <!-- <v-carousel
          v-model="activeIndex"
          cycle
          hide-delimiters
          height="380"
          max-width="800"
          interval="4000"
          class="peek-carousel"
          show-arrows="hover"
          @mouseenter="pauseCarousel"
          @mouseleave="resumeCarousel"
        > -->
        <v-carousel
          v-model="activeIndex"
          cycle
          hide-delimiters
          :height="isMobile ? 'auto' : 380"
          max-width="800"
          interval="4000"
          class="peek-carousel"
          :show-arrows="isMobile ? 'always' : 'hover'"
          @mouseenter="!isMobile && pauseCarousel()"
          @mouseleave="!isMobile && resumeCarousel()"
        >
          <v-carousel-item
            v-for="(img, index) in images"
            :key="index"
            class="peek-slide"
            :class="{
              active: index === activeIndex,
              prev: index === (activeIndex - 1 + images.length) % images.length,
              next: index === (activeIndex + 1) % images.length
            }"
            @click="goToSlide(index)"
          >
            <v-img
              :src="img"
              class="screenshot-img"
              contain
            />
          </v-carousel-item>
        </v-carousel>
      </v-container>
    </div>

    <!-- Key Features Section -->
    <div class="features-section">
      <v-container class="mt-12" data-aos="fade-up">
        <h2 class="text-h5 font-weight-bold mb-6 features-title">Key Features</h2>
        <v-row dense>
          <v-col 
            cols="12" 
            md="4" 
            v-for="(feature, i) in features" 
            :key="i" 
            data-aos="zoom-in"
          >
            <v-card class="pa-4 individual-feature-card" elevation="2">
              <v-icon size="32" class="mb-3" color="primary">{{ feature.icon }}</v-icon>
              <h3 class="text-subtitle-1 font-weight-medium">{{ feature.title }}</h3>
              <p class="text-body-2">{{ feature.description }}</p>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </div>
  </v-container>
</template>

<script>
import image1 from "@/assets/edited/Vendor Management/Add Vendor Form.png"
import image2 from "@/assets/edited/Vendor Management/Total Vendor Dashboards.png"
import image3 from "@/assets/edited/Vendor Management/Vendor Evaluations.png"
import image4 from "@/assets/edited/Vendor Management/Vendor Management Dashboard.png"
export default {
  name: "VendorManagement",
  data() {
    return {
      activeIndex: 0,
      isCycling: true,
      images: [image1, image2, image3, image4],
      features: [
        {
          title: "Vendor Register",
          description: "Maintain a registry of all third-party vendors with data access or processing roles.",
          icon: "mdi-clipboard-list-outline"
        },
        {
          title: "Risk Assessments",
          description: "Conduct and track periodic risk evaluations for each third-party vendor.",
          icon: "mdi-shield-search"
        },
        {
          title: "Contract Compliance",
          description: "Monitor data protection clauses and validity of contracts with vendors.",
          icon: "mdi-file-certificate-outline"
        },
        {
          title: "Visual Data Flow Mapping",
          description: "Map vendor data flows, data types handled, and processing locations.",
          icon: "mdi-vector-polyline"
        },
        {
          title: "Alerts & Notifications",
          description: "Get alerts on expiring contracts or overdue assessments automatically.",
          icon: "mdi-bell-ring-outline"
        },
        {
          title: "Audit Trail & Reports",
          description: "Log all vendor compliance activities and generate historical reports.",
          icon: "mdi-history"
        }
      ]
    };
  },
  mounted() {
    import("aos/dist/aos.css");
    import("aos").then(AOS => AOS.init({ duration: 1000 }));
  },

  methods: {
    goToSlide(index) {
      this.activeIndex = index;
    },
    pauseCarousel() {
      this.isCycling = false;
    },
    resumeCarousel() {
      this.isCycling = true;
    }
  }
};
</script>

<style scoped>
.vendor-page {
  background: linear-gradient(to bottom right, #f0f4f8, #e3f0ff);
  padding-bottom: 100px;
}

.hero-section {
  text-align: center;
  padding: 80px 20px;
  background-color: #1f3557;
  color: #e3f0ff;
}

/* .individual-feature-card {
  transition: all 0.3s ease;
  transform: scale(1);
  z-index: 1;
  position: relative;
}

.individual-feature-card:hover {
  transform: scale(1.05);
  box-shadow: 0 12px 24px rgba(0, 0, 0, 0.2);
  z-index: 10;
  background-color: #e3f0ff;
  color: #1f3557;
}

.individual-feature-card:hover h3,
.individual-feature-card:hover p,
.individual-feature-card:hover .v-icon {
  color: #1f3557 !important;
} */

@media (max-width: 430px) {
  .peek-carousel {
    overflow: hidden !important;
  }

  .peek-slide,
  .peek-slide.active {
    position: relative !important;
    top: 0 !important;
    left: 0 !important;
    transform: none !important;
    opacity: 1 !important;
    pointer-events: auto !important;
    display: block !important;
  }

  .peek-slide.prev,
  .peek-slide.next {
    display: none !important;
  }

  .screenshot-img {
    width: 100% !important;
    height: auto !important;
    max-width: 100%;
    border-radius: 12px;
  }
  /* Disable hover zoom effect */
  .peek-slide.active:hover .screenshot-img {
    width: 100% !important;
    height: auto !important;
  }

  .individual-feature-card {
    transform: scale(1.05) translateX(-8px) translateY(-8px);
    box-shadow: 0 12px 24px rgba(0, 0, 0, 0.2);
    background-color: #e3f0ff;
    color: #1f3557;
    border: 2px solid #1f3557;
  }

  .individual-feature-card h3,
  .individual-feature-card p,
  .individual-feature-card .v-icon {
    color: #1f3557 !important;
  }
}

@media (max-width: 768px) {
  .peek-carousel {
    overflow: hidden !important;
  }

  .peek-slide,
  .peek-slide.active {
    position: relative !important;
    top: 0 !important;
    left: 0 !important;
    transform: none !important;
    opacity: 1 !important;
    pointer-events: auto !important;
    display: block !important;
  }

  .peek-slide.prev,
  .peek-slide.next {
    display: none !important;
  }

  .screenshot-img {
    width: 100% !important;
    height: auto !important;
    max-width: 100%;
    border-radius: 12px;
  }
  /* Disable hover zoom effect */
  .peek-slide.active:hover .screenshot-img {
    width: 100% !important;
    height: auto !important;
  }

  .individual-feature-card {
    transform: scale(1.05) translateX(-8px) translateY(-8px);
    box-shadow: 0 12px 24px rgba(0, 0, 0, 0.2);
    background-color: #e3f0ff;
    color: #1f3557;
    border: 2px solid #1f3557;
  }

  .individual-feature-card h3,
  .individual-feature-card p,
  .individual-feature-card .v-icon {
    color: #1f3557 !important;
  }
}
</style>
