<!-- <template>
  <v-container class="py-16">
    <h1 class="text-h3 font-weight-bold mb-4" data-aos="fade-up">Governance</h1>
    <p class="text-body-1" data-aos="fade-up" data-aos-delay="100">
      Define roles, responsibilities, and policies for data protection governance.
    </p>
  </v-container>
</template>

<script>
export default {
  name: 'Governance'
}
</script> -->


<!-- <template>
  <v-container fluid class="governance-page pa-0">
    <div class="hero-section" data-aos="fade-down">
      <h1 class="text-h2 text-primary mb-2">Governance</h1>
      <p class="text-subtitle-1">Establish a robust data protection governance structure across your organization.</p>
    </div>

    <v-container class="mt-10" data-aos="fade-up">
      <v-row>
        <v-col cols="12" md="6">
          <h2 class="text-h5 font-weight-bold">Overview</h2>
          <p>
            The Governance module helps define and manage roles, responsibilities, policies, and data stewardship practices across the organization. It ensures accountability and structured decision-making around data protection efforts.
          </p>
        </v-col>
        <v-col cols="12" md="6">
          <v-img
            src="https://via.placeholder.com/500x300"
            alt="Governance Dashboard"
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
  name: "Governance",
  data() {
    return {
      features: [
        {
          title: "Policy & Procedure Management",
          description: "Define and manage privacy policies and SOPs organization-wide."
        },
        {
          title: "Role-Based Access",
          description: "Assign responsibilities based on user roles for better control."
        },
        {
          title: "Audit Trails & History",
          description: "Track changes, responsibilities, and decisions in a transparent manner."
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
.governance-page {
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
  <v-container fluid class="governance-page pa-0">
    <!-- Hero Section -->
    <div class="hero-section" data-aos="fade-down">
      <h1 class="text-h2 text-primary mb-2">Governance</h1>
      <p class="text-subtitle-1">Establish a robust data protection governance structure across your organization.</p>
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
              Governance forms the backbone of a privacy compliance framework. In alignment with ISO/IEC 27701:2019 and ISO/IEC 27001:2022, this module supports structured audit and policy oversight. It includes submodules for Audit Management and Policy Management, enabling traceable, auditable governance operations.
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
import image1 from "@/assets/edited/Governance/audit dashbaord.png"
import image2 from "@/assets/edited/Governance/Log Audit Finding.png"
import image3 from "@/assets/edited/Governance/New Policy Form.png"
import image4 from "@/assets/edited/Governance/Past Policy Versions.png"
import image5 from "@/assets/edited/Governance/Policy Management Dashboard.png"
export default {
  name: "Governance",
  data() {
    return {
      activeIndex: 0,
      isCycling: true,
      images: [image1, image2, image3, image4, image5],
      features: [
        {
          title: "Audit Schedule Management",
          description: "Upload schedules, notify employees, and log events with PDF and Excel uploads. Export filtered logs and automate reminders via Celery.",
          icon: "mdi-calendar-clock"
        },
        {
          title: "Audit Report Submission",
          description: "Submit, view, and export final audit reports with metadata for regulatory traceability and Excel download support.",
          icon: "mdi-file-document-edit-outline"
        },
        {
          title: "Audit Findings Tracker",
          description: "Log, view, and close audit findings with structured fields and RBAC. Generate Excel reports with finding statistics.",
          icon: "mdi-alert-decagram-outline"
        },
        {
          title: "Board Meeting Management",
          description: "Schedule and record audit board meetings with agenda tracking, conclusion logs, and PDF export for compliance.",
          icon: "mdi-account-group-outline"
        },
        {
          title: "Policy Register & Drafting",
          description: "Maintain centralized compliance policy registers with detailed version control, multi-level approvals, and secure digital sign-offs.",
          icon: "mdi-book-open-outline"
        },
        {
          title: "Policy Distribution & Acknowledgement",
          description: "Assign policies, notify users, and track acknowledgment logs to enforce organization-wide awareness and compliance.",
          icon: "mdi-email-check-outline"
        },
        {
          title: "Policy Review & Expiry Alerts",
          description: "Configure automated review cycles, timely expiry reminders, and instant alerts to owners to maintain always up-to-date policies.",
          icon: "mdi-timer-sand"
        },
        {
          title: "Jurisdictional Compliance Mapping",
          description: "Map policies and audit logs to ISO, GDPR, DPDP, and other frameworks to ensure global compliance readiness.",
          icon: "mdi-map-marker-radius-outline"
        },
        {
          title: "Role-Based Access Control (RBAC)",
          description: "Granular access management for all features like findings, board meetings, and policy edits to support security.",
          icon: "mdi-shield-account-outline"
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
.governance-page {
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

