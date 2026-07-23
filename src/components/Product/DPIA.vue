<!-- <template>
  <v-container class="py-16">
    <h1 class="text-h3 font-weight-bold mb-4" data-aos="fade-up">Risk Assessment</h1>
    <p class="text-body-1" data-aos="fade-up" data-aos-delay="100">
      Assess and monitor risks associated with data processing activities.
    </p>
  </v-container>
</template>

<script>
export default {
  name: 'RiskAssessment'
}
</script> -->


<!-- <template>
  <v-container fluid class="risk-assessment-page pa-0">
    <div class="hero-section" data-aos="fade-down">
      <h1 class="text-h2 text-primary mb-2">Risk Assessment (DPIA)</h1>
      <p class="text-subtitle-1">Conduct DPIAs to assess and mitigate privacy risks proactively.</p>
    </div>

    <v-container class="mt-10" data-aos="fade-up">
      <v-row>
        <v-col cols="12" md="6">
          <h2 class="text-h5 font-weight-bold">Overview</h2>
          <p>
            The Risk Assessment module enables organizations to evaluate privacy risks through detailed DPIAs (Data Protection Impact Assessments), ensuring better compliance and data handling practices.
          </p>
        </v-col>
        <v-col cols="12" md="6">
          <v-img
            src="https://via.placeholder.com/500x300"
            alt="DPIA Assessment Dashboard"
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
  name: "RiskAssessment",
  data() {
    return {
      features: [
        {
          title: "Automated DPIA Templates",
          description: "Quickly create and manage DPIAs using pre-configured templates."
        },
        {
          title: "Risk Scoring",
          description: "Calculate privacy impact scores to prioritize mitigation actions."
        },
        {
          title: "Review and Approval Workflow",
          description: "Enable cross-department collaboration with built-in approval flows."
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
.risk-assessment-page {
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
  <v-container fluid class="risk-assessment-page pa-0">
    <!-- Hero Section -->
    <div class="hero-section" data-aos="fade-down">
      <h1 class="text-h2 text-primary mb-2">Risk Assessment (DPIA)</h1>
      <p class="text-subtitle-1">Conduct DPIAs to assess and mitigate privacy risks proactively.</p>
    </div>

    <!-- Overview Section -->
    <div class="overview-section">
      <v-container 
        class="mt-10 text-center" 
        data-aos="fade-up"
      >
        <h2 class="text-h5 font-weight-bold mb-4">Overview</h2>
        
        <v-row justify="center">
          <v-col cols="12" md="10">
            <p class="text-body-1 overview-text">
              The DPIA Tool is a web-based solution designed to help organizations identify, assess, and mitigate
              privacy risks associated with data processing activities. The tool ensures compliance with GDPR (Article 35),
              ISO 27701, CCPA, and other data protection regulations.
            </p>
          </v-col>
        </v-row>

        <v-row justify="center" class="mt-6">
          <v-col cols="12" md="6">
            <v-img
              src="https://via.placeholder.com/500x300"
              alt="DPIA Assessment Dashboard"
              class="rounded"
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
              <v-icon color="primary" size="32" class="mb-2">{{ feature.icon }}</v-icon>
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
import image1 from "@/assets/edited/DPIA/DPIA Dashboard.png"
import image2 from "@/assets/edited/DPIA/DPIA Data Entry.png"
import image3 from "@/assets/edited/DPIA/DPIA Final Report.png"
import image4 from "@/assets/edited/DPIA/General Risk Dashboard.png"
import image5 from "@/assets/edited/DPIA/Risk edit.png"


export default {
  name: "RiskAssessment",
  data() {
    return {
      activeIndex: 0,
      isCycling: true,
      images: [image1, image2, image3, image4, image5],
      features: [
        {
          title: "Automated DPIA Templates",
          description: "Quickly create and manage DPIAs using predefined regulatory templates.",
          icon: "mdi-file-document-outline"
        },
        {
          title: "Data Categorization",
          description: "Classify PII and sensitive data for accurate privacy analysis.",
          icon: "mdi-database-search"
        },
        {
          title: "Risk Scoring Engine",
          description: "Score privacy risks based on likelihood and impact using built-in logic.",
          icon: "mdi-chart-donut"
        },
        {
          title: "Compliance Cross-Check",
          description: "Evaluate DPIAs against GDPR, CCPA, ISO 27701 and more.",
          icon: "mdi-shield-check"
        },
        {
          title: "Mitigation Suggestions",
          description: "Recommended actions to reduce identified risk severity.",
          icon: "mdi-lightbulb-on-outline"
        },
        {
          title: "Multi-Stage Approvals",
          description: "Route DPIAs through customizable approval workflows (DPO, Legal, IT).",
          icon: "mdi-account-check"
        },
        {
          title: "Audit Trail",
          description: "Track changes and decision history for full transparency.",
          icon: "mdi-history"
        },
        {
          title: "Report Exporting",
          description: "Download DPIA reports in PDF, JSON, XML, and CSV formats.",
          icon: "mdi-download-box"
        },
        {
          title: "Role-Based Access",
          description: "Enforce secure access with RBAC (Admin, Submitter, Reviewer).",
          icon: "mdi-account-group"
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
.risk-assessment-page {
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
  border: 2px solid transparent;
  border-radius: 12px;
} */

/* .individual-feature-card:hover {
  transform: scale(1.05) translateX(-8px) translateY(-8px);
  box-shadow: 0 12px 24px rgba(0, 0, 0, 0.2); */
  /* z-index: 10; */
  /* z-index: 9999;
  background-color: #e3f0ff;
  color: #1f3557;
  border: 2px solid #1f3557;
} */

/* .individual-feature-card:hover h3,
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
