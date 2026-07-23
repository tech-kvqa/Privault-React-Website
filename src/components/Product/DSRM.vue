<!-- <template>
  <v-container class="py-16">
    <h1 class="text-h3 font-weight-bold mb-4" data-aos="fade-up">Data Subject Rights (DSR) Management</h1>
    <p class="text-body-1" data-aos="fade-up" data-aos-delay="100">
      Handle data subject access, rectification, erasure, and portability requests.
    </p>
  </v-container>
</template>

<script>
export default {
  name: 'DSRManagement'
}
</script> -->


<!-- <template>
  <v-container fluid class="dsir-page pa-0">

    <div class="hero-section" data-aos="fade-down">
      <h1 class="text-h2 text-primary mb-2">Data Subject Rights Management (DSIR)</h1>
      <p class="text-subtitle-1">Empower individuals by enabling efficient handling of their data rights requests.</p>
    </div>

    <v-container class="mt-10" data-aos="fade-up">
      <v-row>
        <v-col cols="12" md="6">
          <h2 class="text-h5 font-weight-bold">Overview</h2>
          <p>
            DSIR helps organizations respond to requests from individuals regarding their personal data – including access, rectification, deletion, restriction, and portability – in a compliant and timely manner.
          </p>
        </v-col>
        <v-col cols="12" md="6">
          <v-img
            src="https://via.placeholder.com/500x300"
            alt="DSIR Module"
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
  name: "DSIR",
  data() {
    return {
      features: [
        {
          icon: "mdi-account-search",
          title: "Request Tracking",
          description: "Track, verify, and respond to DSARs across various channels."
        },
        {
          icon: "mdi-file-lock-outline",
          title: "Secure Access & Redaction",
          description: "Provide access while protecting sensitive or redacted data."
        },
        {
          icon: "mdi-timer-outline",
          title: "SLA Monitoring",
          description: "Automatically monitor deadlines and notify stakeholders on request timelines."
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
.dsir-page {
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
  <v-container fluid class="dsr-page pa-0">
    <!-- Hero Section -->
    <div class="hero-section" data-aos="fade-down">
      <h1 class="text-h2 text-primary mb-2">DSR Management</h1>
      <p class="text-subtitle-1">
        Empower data subjects to exercise their rights under GDPR, CCPA, and more.
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
              The Data Subject Rights (DSR) Management module provides a seamless way for individuals to submit, track, and manage their personal data requests as mandated by privacy regulations. With role-based access, multilingual support, and complete audit logs, organizations can ensure compliance and transparency while enhancing trust.
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
              <v-icon size="32" color="primary" class="mb-2">{{ feature.icon }}</v-icon>
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
import image1 from "@/assets/edited/DSRM/DSRM Dashboard.png"
import image2 from "@/assets/edited/DSRM/Client Data.png"
import image3 from "@/assets/edited/DSRM/DSR Form.png"
export default {
  name: "DSRManagement",
  data() {
    return {
      activeIndex: 0,
      isCycling: true,
      images: [image1, image2, image3],
      features: [
        {
          title: "Submit & Track Requests",
          description: "Submit data access, erasure, correction, and objection requests with real-time tracking.",
          icon: "mdi-file-document-multiple-outline"
        },
        {
          title: "Role-Based Access",
          description: "Secure portals for both Admin and Data Subjects with 2FA for sensitive access.",
          icon: "mdi-account-lock-outline"
        },
        {
          title: "Audit Logs & SLA Alerts",
          description: "Every action is logged, and alerts are sent if requests near SLA breach.",
          icon: "mdi-bell-alert-outline"
        },
        {
          title: "Document Handling",
          description: "Upload identity proof, download data, and attach supporting files securely.",
          icon: "mdi-file-upload-outline"
        },
        {
          title: "Multilingual & WCAG Compliant",
          description: "Supports multiple languages and accessibility standards like screen readers.",
          icon: "mdi-translate"
        },
        {
          title: "Integrated Consent Linking",
          description: "View and manage consent associated with data being requested.",
          icon: "mdi-link-variant"
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
.dsr-page {
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

/* @media (max-width: 430px) {
  .peek-carousel {
    overflow: hidden !important;
  }

  .peek-slide,
  .peek-slide.active,
  .peek-slide.prev,
  .peek-slide.next {
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

  .peek-slide.active:hover .screenshot-img {
    width: 100% !important;
    height: auto !important;
  }
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
