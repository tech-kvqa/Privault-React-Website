<!-- <template>
  <v-container class="py-16">
    <h1 class="text-h3 font-weight-bold mb-4" data-aos="fade-up">Incident Management</h1>
    <p class="text-body-1" data-aos="fade-up" data-aos-delay="100">
      Detect, track, and respond to privacy and security incidents.
    </p>
  </v-container>
</template>

<script>
export default {
  name: 'IncidentManagement'
}
</script> -->


<!-- <template>
  <v-container fluid class="py-12 px-4" style="background: linear-gradient(to bottom, #e3f0ff, #d0e0f5);">
    <v-row class="mb-12" align="center" justify="center">
      <v-col cols="12" md="8" class="text-center">
        <h1 class="display-1 font-weight-bold text-blue-darken-4" data-aos="fade-down">Breach Management</h1>
        <p class="subtitle-1 text-blue-grey-darken-1" data-aos="fade-up" data-aos-delay="200">
          Detect, contain, and respond to data breaches efficiently to minimize damage and ensure legal compliance.
        </p>
      </v-col>
    </v-row>

    <v-row class="mb-10" data-aos="fade-right">
      <v-col cols="12" md="10" class="mx-auto">
        <v-card flat class="pa-6" color="#ffffffaa" elevation="2" rounded="xl">
          <h2 class="text-h5 font-weight-medium mb-3">Overview</h2>
          <p>
            Our Breach Management module ensures swift incident response with built-in investigation tools, breach logging, containment support,
            and regulatory notification tracking. Centralize your breach handling process and reduce potential risks.
          </p>
        </v-card>
      </v-col>
    </v-row>

    <v-row data-aos="fade-up">
      <v-col cols="12">
        <h2 class="text-h5 text-center font-weight-bold mb-6 text-blue-grey-darken-2">Key Features</h2>
      </v-col>

      <v-col cols="12" md="4" v-for="(feature, index) in features" :key="index" data-aos="zoom-in" :data-aos-delay="index * 100">
        <v-card color="white" class="pa-5 text-center" rounded="lg" elevation="4">
          <v-icon color="primary" size="40">{{ feature.icon }}</v-icon>
          <h3 class="text-h6 font-weight-medium mt-3">{{ feature.title }}</h3>
          <p class="text-body-2 mt-2">{{ feature.description }}</p>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import AOS from 'aos'

export default {
  name: 'BreachManagement',
  data() {
    return {
      features: [
        {
          icon: 'mdi-alert-octagram',
          title: 'Breach Detection',
          description: 'Detect unusual activity and raise immediate alerts for potential breaches.'
        },
        {
          icon: 'mdi-security',
          title: 'Impact Assessment',
          description: 'Analyze the severity and scope of the breach to assess organizational impact.'
        },
        {
          icon: 'mdi-bell-alert',
          title: 'Regulatory Notification',
          description: 'Track deadlines and dispatch reports to relevant authorities like the DPA.'
        },
        {
          icon: 'mdi-timeline-check-outline',
          title: 'Incident Timeline',
          description: 'Maintain a timeline of breach events from detection to resolution.'
        },
        {
          icon: 'mdi-file-lock-outline',
          title: 'Containment Measures',
          description: 'Tools to help contain breaches and secure compromised data.'
        },
        {
          icon: 'mdi-chart-bar',
          title: 'Post-Breach Analysis',
          description: 'Learn from each incident with visual dashboards and root cause analytics.'
        }
      ]
    }
  },
  mounted() {
    AOS.init({ duration: 1000, once: true })
  }
}
</script>

<style scoped>
.text-blue-darken-4 {
  color: #0d47a1;
}
</style> -->


<!-- <template>
  <v-container fluid class="breach-management-page pa-0">
    <div class="hero-section" data-aos="fade-down">
      <h1 class="text-h2 text-primary mb-2">Breach Management</h1>
      <p class="text-subtitle-1">Track and respond to data breaches with speed and accuracy.</p>
    </div>

    <v-container class="mt-10" data-aos="fade-up">
      <v-row>
        <v-col cols="12" md="6">
          <h2 class="text-h5 font-weight-bold">Overview</h2>
          <p>
            The Breach Management module provides tools to detect, manage, and report security breaches with audit trails and regulatory compliance.
          </p>
        </v-col>
        <v-col cols="12" md="6">
          <v-img
            src="https://via.placeholder.com/500x300"
            alt="Breach Management Dashboard"
            class="rounded"
          ></v-img>
        </v-col>
      </v-row>
    </v-container>

    <v-container class="mt-12" data-aos="fade-up">
      <h2 class="text-h5 font-weight-bold mb-6">Key Features</h2>
      <v-row dense>
        <v-col cols="12" md="4" v-for="(feature, index) in features" :key="index" data-aos="zoom-in" :data-aos-delay="index * 100">
          <v-card color="white" class="pa-5 text-center" rounded="lg" elevation="4">
            <v-icon color="primary" size="40">{{ feature.icon }}</v-icon>
            <h3 class="text-h6 font-weight-medium mt-3">{{ feature.title }}</h3>
            <p class="text-body-2 mt-2">{{ feature.description }}</p>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </v-container>
</template>

<script>
export default {
  name: "BreachManagement",
  data() {
    return {
      features: [
        {
          icon: 'mdi-alert-octagram',
          title: 'Breach Detection',
          description: 'Detect unusual activity and raise immediate alerts for potential breaches.'
        },
        {
          icon: 'mdi-security',
          title: 'Impact Assessment',
          description: 'Analyze the severity and scope of the breach to assess organizational impact.'
        },
        {
          icon: 'mdi-bell-alert',
          title: 'Regulatory Notification',
          description: 'Track deadlines and dispatch reports to relevant authorities like the DPA.'
        },
        {
          icon: 'mdi-timeline-check-outline',
          title: 'Incident Timeline',
          description: 'Maintain a timeline of breach events from detection to resolution.'
        },
        {
          icon: 'mdi-file-lock-outline',
          title: 'Containment Measures',
          description: 'Tools to help contain breaches and secure compromised data.'
        },
        {
          icon: 'mdi-chart-bar',
          title: 'Post-Breach Analysis',
          description: 'Learn from each incident with visual dashboards and root cause analytics.'
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
.breach-management-page {
  background: linear-gradient(to bottom right, #f0f4f8, #e3f0ff);
  padding-bottom: 100px;
}

.hero-section {
  text-align: center;
  padding: 80px 20px;
  background-color: #1f3557;
  color: #e3f0ff;
}
</style>
 -->


<template>
  <v-container fluid class="breach-management-page pa-0">
    <!-- Hero Section -->
    <div class="hero-section" data-aos="fade-down">
      <h1 class="text-h2 text-primary mb-2">Breach Management</h1>
      <p class="text-subtitle-1">Track and respond to data breaches with speed and accuracy.</p>
    </div>

    <!-- Overview Section -->
    <div class="overview-section">
      <!-- <v-container 
        class="overview-section mt-10 text-center"
        data-aos="fade-up"
      > -->
      <v-container 
        class="mt-10 text-center"
        data-aos="fade-up"
      >
        <h2 class="text-h5 font-weight-bold mb-4">Overview</h2>

        <v-row justify="center">
          <v-col cols="12" md="10">
            <p class="text-body-1 overview-text">
              The Breach Management module is designed to streamline the entire lifecycle of a data breach — from detection to resolution. With a multi-step reporting wizard, automated severity classification, and SLA-based escalation, the system ensures rapid containment and compliance with global regulations like GDPR and DPDP.
              <br><br>
              Whether you’re reporting, investigating, or auditing, every step is logged with precision. Role-based access allows admins, handlers, compliance officers, and auditors to collaborate in real-time. Incident handlers can upload evidence, document RCA, and notify stakeholders, while templates help comply with regulatory disclosure timelines. The dashboard also provides live metrics on open breaches, SLA compliance, trends, and resolution timelines — all stored securely and retained for 5 years.
            </p>
          </v-col>
        </v-row>

        <!-- Image centered -->
        <v-row justify="center" class="mt-6">
          <v-col cols="12" md="8">
            <v-img
              src="https://via.placeholder.com/700x400"
              alt="Breach Management Dashboard"
              class="rounded mx-auto"
              max-width="100%"
            ></v-img>
          </v-col>
        </v-row>
      </v-container>
    </div>

    <!-- Screenshot Section -->
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

        <!-- <div class="screenshot-gallery">
          <div class="screenshot-item img1">
            <img :src="image1" alt="Image 1" />
          </div>
          <div class="screenshot-item img2">
            <img :src="image2" alt="Image 2" />
          </div>
          <div class="screenshot-item img3">
            <img :src="image3" alt="Image 3" />
          </div>
        </div> -->
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
            v-for="(feature, index) in features"
            :key="index"
            data-aos="zoom-in"
          >
            <v-card color="white" class="pa-4 individual-feature-card" elevation="2">
              <v-icon color="primary" size="40" class="mb-2">{{ feature.icon }}</v-icon>
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
import image1 from "@/assets/edited/Breach Management/Breach Incident Dashboard.png";
import image2 from "@/assets/edited/Breach Management/Breach Incident Report.png";
import image3 from "@/assets/edited/Breach Management/Incident Log.png";
import image4 from "@/assets/edited/Breach Management/General Incident Dashboard.png";
export default {
  name: "BreachManagement",
  data() {
    return {
      // image1,
      // image2,
      // image3,
      activeIndex: 0,
      // sideInterval: null,
      isCycling: true,
      images: [image1, image2, image3, image4],
      features: [
        {
          icon: 'mdi-form-select',
          title: 'Multi-Step Reporting',
          description: 'Submit breaches using a structured wizard: Incident, Systems, Impact, Evidence — with draft saving.'
        },
        {
          icon: 'mdi-auto-fix',
          title: 'Severity Classification',
          description: 'Automatically classify breaches by data type, individual count, and severity level.'
        },
        {
          icon: 'mdi-bell-alert-outline',
          title: 'Instant Alerts',
          description: 'Notify legal, compliance, and incident response teams immediately upon breach report.'
        },
        {
          icon: 'mdi-account-group',
          title: 'Role-Based Collaboration',
          description: 'Admins, Handlers, Compliance, and Auditors have tailored views and access privileges.'
        },
        {
          icon: 'mdi-message-text',
          title: 'Live Collaboration',
          description: 'Comment, upload files, and update logs simultaneously — all in real time.'
        },
        {
          icon: 'mdi-file-document-edit-outline',
          title: 'Pre-Filled Authority Notices',
          description: 'Auto-generate DPA notification templates per jurisdiction (GDPR, DPDP, etc.).'
        },
        {
          icon: 'mdi-chart-box-outline',
          title: 'Breach Metrics Dashboard',
          description: 'Real-time stats for active breaches, SLA compliance, and root cause breakdowns.'
        },
        {
          icon: 'mdi-folder-key-outline',
          title: 'Secure Archiving',
          description: 'Retain breaches for 5 years and then archive securely with integrity validation.'
        },
        {
          icon: 'mdi-history',
          title: 'Full Audit Trails',
          description: 'Track every user action with timestamps, justification, and digital signatures.'
        }
      ]
    };
  },
  mounted() {
    import("aos/dist/aos.css");
    import("aos").then(AOS => AOS.init({ duration: 1000 }));
  },

  // methods: {
  //   goToSlide(index) {
  //     this.activeIndex = index;
  //   },

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
.breach-management-page {
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
  border-radius: 12px;;
}

.individual-feature-card:hover {
  transform: scale(1.05) translateX(-8px) translateY(-8px);
  box-shadow: 0 12px 24px rgba(0, 0, 0, 0.2);
  /* z-index: 10; */
  z-index: 9999;
  background-color: #e3f0ff; /* Light blue-gray */
  color: #1f3557; /* Text color */
  border: 2px solid #1f3557;
}

.individual-feature-card:hover h3,
.individual-feature-card:hover p,
.individual-feature-card:hover .v-icon {
  color: #1f3557 !important;
}

/* .screenshot-gallery {
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: auto auto;
  gap: 20px;
  justify-items: center;
  align-items: start;
  margin: 0 auto;
  max-width: 1000px;
}

.screenshot-item {
  position: relative;
}

.screenshot-item img {
  width: 100%;
  max-width: 400px;
  border-radius: 12px;
  box-shadow: 0 8px 25px rgba(0,0,0,0.25);
  transition: all 0.3s ease;
  animation: float 4s ease-in-out infinite;
  position: relative;
  z-index: 1;
}

.img1 { grid-column: 1; grid-row: 1; --angle: -5deg; }
.img2 { grid-column: 1; grid-row: 2; --angle: 5deg; }
.img3 { grid-column: 2; grid-row: 1 / span 2; --angle: -2deg; }

.screenshot-item img:hover {
  width: 600px;
  height: auto;
  transform: rotate(var(--angle));
  z-index: 20;
  box-shadow: 0 12px 30px rgba(0,0,0,0.35);
}

@keyframes float {
  0% { transform: translateY(0px) rotate(var(--angle)); }
  50% { transform: translateY(-10px) rotate(var(--angle)); }
  100% { transform: translateY(0px) rotate(var(--angle)); }
} */

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
