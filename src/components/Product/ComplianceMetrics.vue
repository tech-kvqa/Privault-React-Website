<!-- <template>
  <v-container class="py-16">
    <h1 class="text-h3 font-weight-bold mb-4" data-aos="fade-up">Compliance Metrics</h1>
    <p class="text-body-1" data-aos="fade-up" data-aos-delay="100">
      View real-time metrics for your compliance readiness and data privacy efforts.
    </p>
  </v-container>
</template>

<script>
export default {
  name: 'ComplianceMetrics'
}
</script> -->


<!-- <template>
  <v-container fluid class="compliance-metrics-page pa-0">
    <div class="hero-section" data-aos="fade-down">
      <h1 class="text-h2 text-primary mb-2">Compliance Metrics</h1>
      <p class="text-subtitle-1">Track and visualize your organization's compliance health in real-time.</p>
    </div>

    <v-container class="mt-10" data-aos="fade-up">
      <v-row>
        <v-col cols="12" md="6">
          <h2 class="text-h5 font-weight-bold">Overview</h2>
          <p>
            The Compliance Metrics module provides real-time dashboards, alerts, and insights to ensure adherence to data protection regulations.
          </p>
        </v-col>
        <v-col cols="12" md="6">
          <v-img
            src="https://via.placeholder.com/500x300"
            alt="Compliance Metrics Dashboard"
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
  name: "ComplianceMetrics",
  data() {
    return {
      features: [
        {
          title: "Real-Time Dashboard",
          description: "Visualize compliance scores and regulatory KPIs in real time."
        },
        {
          title: "Automated Alerts",
          description: "Receive alerts for non-compliance incidents or threshold breaches."
        },
        {
          title: "Historical Reports",
          description: "Generate and export compliance trend reports across time periods."
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
.compliance-metrics-page {
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
  <v-container fluid class="compliance-metrics-page pa-0">
    <!-- Hero Section -->
    <div class="hero-section" data-aos="fade-down">
      <h1 class="text-h2 text-primary mb-2">Compliance Metrics</h1>
      <p class="text-subtitle-1">
        Track and visualize your organization's compliance health in real-time.
      </p>
    </div>

    <div class="overview-section">
      <v-container
        class="mt-10 text-center"
        data-aos="fade-up"
      >
        <h2 class="text-h5 font-weight-bold mb-4">Overview</h2>

        <v-row justify="center">
          <v-col cols="12" md="10">
            <p class="text-body-1 overview-text">
              Our Compliance Metrics suite centralizes your privacy governance capabilities. Monitor and manage privacy policy generation, cross-border data transfers, and jurisdictional compliance from one intelligent interface.
              Automate document creation, assess international transfer risks, and stay aligned with evolving global laws like GDPR, PDPA, CCPA, and more.
              The platform enables real-time visibility into data flow, generates audit-ready documentation, and integrates with other modules such as Consent and Vendor Management — offering a comprehensive, always-current compliance picture.
            </p>
          </v-col>
        </v-row>

        <v-row justify="center" class="mt-6">
          <v-col cols="12" md="8">
            <v-img
              src="https://via.placeholder.com/700x400"
              alt="Compliance Metrics Dashboard"
              class="rounded mx-auto"
              max-width="100%"
            ></v-img>
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

    <!-- Features Section -->
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
import AOS from "aos";
import "aos/dist/aos.css";
import image1 from "@/assets/edited/Complinace/compliance report.png"
import image2 from "@/assets/edited/Complinace/cross border dashboard.png"
import image3 from "@/assets/edited/Complinace/privacy policy report.png"
import image4 from "@/assets/edited/Complinace/privacy policy questionnaire.png"
export default {
  name: "ComplianceMetrics",
  data() {
    return {
      // image1,
      // image2,
      // image3,
      // image4,
      activeIndex: 0,
      isCycling: true,
      images: [
        require("@/assets/edited/Complinace/compliance report 1.png"),
        require("@/assets/edited/Complinace/cross border dashboard 1.png"),
        require("@/assets/edited/Complinace/privacy policy report 2.png"),
        require("@/assets/edited/Complinace/privacy policy questionnaire.png")
      ],
      features: [
        {
          title: "Cross-Border Mapping",
          icon: "mdi-earth",
          description: "Identify source and destination countries, legal mechanisms, and transfer volume trends.",
        },
        {
          title: "SCC & BCR Management",
          icon: "mdi-file-lock",
          description: "Upload SCCs/BCRs, set expiry alerts, and maintain immutable audit trails for transfers.",
        },
        {
          title: "Transfer Risk Analysis",
          icon: "mdi-shield-alert",
          description: "Assess risk levels based on predefined criteria and highlight non-compliant jurisdictions.",
        },
        {
          title: "Privacy Policy Generator",
          icon: "mdi-file-document-edit",
          description: "Generate, edit, and version privacy policies based on jurisdiction-specific checklists.",
        },
        {
          title: "Policy Compliance Checker",
          icon: "mdi-check-decagram",
          description: "Compare existing policies against legal frameworks and generate gap analysis reports.",
        },
        {
          title: "Multi-Jurisdiction Support",
          icon: "mdi-gavel",
          description: "Ensure compliance across GDPR, PDPA, LGPD, CCPA and more from one unified interface.",
        },
      ],
    };
  },
  mounted() {
    import("aos/dist/aos.css");
    import("aos").then((AOS) => AOS.init({ duration: 1000, once: true }));

    // Auto-slide every 3s
    // this.slideInterval = setInterval(() => {
    //   this.activeIndex = (this.activeIndex + 1) % this.images.length;
    // }, 3000);
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
.compliance-metrics-page {
  background: linear-gradient(to bottom right, #f0f4f8, #e3f0ff);
  padding-bottom: 100px;
}

.hero-section {
  text-align: center;
  padding: 80px 20px;
  background-color: #1f3557;
  color: #e3f0ff;
}

.individual-feature-card {
  transition: all 0.3s ease;
  transform: scale(1);
  z-index: 1;
  position: relative;
  border: 2px solid transparent;
  border-radius: 12px;
}

.individual-feature-card:hover {
  transform: scale(1.05) translateX(-8px) translateY(-8px);
  box-shadow: 0 12px 24px rgba(0, 0, 0, 0.2);
  /* z-index: 10; */
  z-index: 9999;
  background-color: #e3f0ff;
  color: #1f3557;
  border: 2px solid #1f3557;
}

.individual-feature-card:hover h3,
.individual-feature-card:hover p,
.individual-feature-card:hover .v-icon {
  color: #1f3557 !important;
}

.features-section .v-row {
  overflow: visible !important;
}

.features-section .v-col {
  overflow: visible !important;
  position: static !important;
}

.peek-carousel {
  overflow: visible !important;
  position: relative;
}

.peek-slide {
  display: block !important;
  position: absolute !important;
  top: 0;
  left: 50%;
  transition: all 0.6s ease;
  opacity: 0;
  transform: translateX(-50%) scale(0.8);
  z-index: 1;
  pointer-events: none;
  /* background: #1f3557; */
  background: transparent;
}

.peek-slide.active {
  opacity: 1;
  transform: translateX(-50%) scale(1);
  z-index: 3;
  pointer-events: auto;
}

.peek-slide.prev {
  opacity: 0.7;
  transform: translateX(-170%) scale(0.9);
  z-index: 2;
  pointer-events: auto;
  cursor: pointer;
}

.peek-slide.next {
  opacity: 0.7;
  transform: translateX(70%) scale(0.9);
  z-index: 2;
  pointer-events: auto;
  cursor: pointer;
}

.screenshot-img {
  width: 600px;
  height: 350px;
  object-fit: contain;
  border-radius: 16px;
  /* box-shadow: 0 8px 25px rgba(0,0,0,0.25); */
  /* transition: transform 0.4s ease, box-shadow 0.4s ease; */
  transition: width 0.4s ease, height 0.4s ease;
}

.peek-slide.active:hover .screenshot-img {
  width: 700px;
  height: 500px;
  /* box-shadow: 0 12px 35px rgba(0, 0, 0, 0.35); */
  z-index: 10;
}

.screenshots-section {
  background-color: #195d79;
  padding: 60px 20px;
  border-radius: 0px;
}


.overview-section {
  position: relative;
  width: 100%;
  /* background: url('@/assets/back_wallpaper.jpg') center/cover no-repeat; */
  background: linear-gradient(135deg, #f9fcff, #e8f2ff);
  background-color: #f9fcff;
  padding: 60px 20px;
}

.overview-section::before {
  content: "";
  position: absolute;
  inset: 0;
  background: rgba(255, 255, 255, 0.7);
  z-index: 0;
}

.overview-section > * {
  position: relative;
  z-index: 1; /* keep text above overlay */
}

.features-section {
  position: relative;
  width: 100%;
  padding: 80px 20px;
  /* background: url('@/assets/feature_background.jpg') center/cover no-repeat; */
  background: linear-gradient(160deg, #1f3557, #0d223b);
  background-color: #0a0a0a;
  /* background: linear-gradient(135deg, #f9fcff, #e8f2ff);
  background-color: #f9fcff; */
  overflow: hidden;
}

/* Overlay haze for readability */
.features-section::before {
  content: "";
  position: absolute;
  inset: 0;
  /* background: rgba(255, 255, 255, 0.75); */
  /* background: rgba(0, 0, 0, 0.55); */
  backdrop-filter: blur(3px); /* adds blur for haze */
  z-index: 0;
}

.features-section .v-container {
  position: relative;
  z-index: 1; /* bring text above haze */
}

.feature-icon {
  background: #e3f0ff;
  border-radius: 50%;
  padding: 12px;
  margin-bottom: 12px;
  display: inline-flex;
  justify-content: center;
  align-items: center;
}


.features-title {
  color: #a5ae23;
}

.overview-text {
  color: #1f3557;
}

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
  .individual-feature-card {
    transform: scale(1.05) translateX(-8px) translateY(-8px) !important;
    box-shadow: 0 12px 24px rgba(0, 0, 0, 0.2) !important;
    background-color: #e3f0ff !important;
    color: #1f3557 !important;
    border: 2px solid #1f3557 !important;
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
