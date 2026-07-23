<!-- <template>
  <v-container class="py-16">
    <h1 class="text-h3 font-weight-bold mb-4" data-aos="fade-up">Phishing Simulation</h1>
    <p class="text-body-1" data-aos="fade-up" data-aos-delay="100">
      Simulate phishing attacks to assess user awareness and improve security posture.
    </p>
  </v-container>
</template>

<script>
export default {
  name: 'PhishingApp'
}
</script> -->


<!-- <template>
  <v-container fluid class="phishing-page pa-0">
    <div class="hero-section" data-aos="fade-down">
      <h1 class="text-h2 text-primary mb-2">Phishing Simulation</h1>
      <p class="text-subtitle-1">
        Conduct realistic phishing simulations and measure employee awareness.
      </p>
    </div>

    <v-container class="mt-10" data-aos="fade-up">
      <v-row>
        <v-col cols="12" md="6">
          <h2 class="text-h5 font-weight-bold">Overview</h2>
          <p>
            Run controlled phishing tests across departments to assess how well employees identify and report suspicious emails. Analyze results to improve cybersecurity training and awareness.
          </p>
        </v-col>
        <v-col cols="12" md="6">
          <v-img
            src="https://via.placeholder.com/500x300"
            alt="Phishing App"
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
  name: "PhishingApp",
  data() {
    return {
      features: [
        {
          icon: "mdi-email-alert",
          title: "Custom Email Templates",
          description: "Craft realistic phishing emails tailored to mimic common threats."
        },
        {
          icon: "mdi-account-multiple-check",
          title: "Targeted Campaigns",
          description: "Simulate attacks on specific teams or departments to measure response."
        },
        {
          icon: "mdi-chart-bar",
          title: "Detailed Reports",
          description: "Track who clicked links, reported emails, or failed to recognize the threat."
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
.phishing-page {
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
  <v-container fluid class="pa-0 phishing-app-page">
    <!-- Hero Section -->
    <div class="hero-section" data-aos="fade-down">
      <h1 class="text-h2 text-primary mb-2">Phishing Awareness Application</h1>
      <p class="text-subtitle-1">Educate, Test & Empower Your Team Against Cyber Threats</p>
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
              The Phishing Awareness Application is a comprehensive cybersecurity tool designed to train users in identifying and avoiding phishing attacks. Through simulated phishing emails, educational materials, quizzes, and performance tracking, it enhances organizational resilience against phishing threats. Admins can monitor progress, send email campaigns, manage content, and generate reports and certificates – all from a centralized dashboard.
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

    <!-- Key Features -->
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

    <!-- Demo Section -->
    <!-- <v-container class="pb-12">
      <h2 class="text-h5 font-weight-bold text-center mb-8">Demo Highlights</h2>
      <v-row justify="center">
        <v-col cols="12" md="4" data-aos="fade-up">
          <v-card>
            <v-img src="/demo-login.jpg" height="200px"></v-img>
            <v-card-title>Login & Mail Sending</v-card-title>
          </v-card>
        </v-col>
        <v-col cols="12" md="4" data-aos="fade-up">
          <v-card>
            <v-img src="/demo-training.jpg" height="200px"></v-img>
            <v-card-title>Phishing Link & Training</v-card-title>
          </v-card>
        </v-col>
        <v-col cols="12" md="4" data-aos="fade-up">
          <v-card>
            <v-img src="/demo-reminder.jpg" height="200px"></v-img>
            <v-card-title>Reminder & Retake</v-card-title>
          </v-card>
        </v-col>
      </v-row>
    </v-container> -->

    <!-- CTA Section -->
    <!-- <v-container class="pb-16 text-center">
      <v-btn color="primary" large elevation="2" data-aos="zoom-in">Request a Live Demo</v-btn>
    </v-container> -->
  </v-container>
</template>

<script>
import image1 from "@/assets/edited/Phishing/Phishing Dashboard.png"
import image2 from "@/assets/edited/Phishing/Manage Question Page.png"
import image3 from "@/assets/edited/Phishing/Phishing Report.png"
export default {
  name: 'PhishingApp',
  data() {
    return {
      activeIndex: 0,
      isCycling: true,
      images: [image1, image2, image3],
      features: [
        {
          title: "User Authentication",
          description: "Secure login to access quizzes and training material.",
          icon: "mdi-lock-outline"
        },
        {
          title: "Phishing Simulation",
          description: "Send department-wise phishing emails with tracking.",
          icon: "mdi-fish"
        },
        {
          title: "Study Materials",
          description: "Warning screen followed by guides and videos.",
          icon: "mdi-book-open-page-variant-outline"
        },
        {
          title: "Interactive Quiz",
          description: "Dynamic phishing test with instant feedback.",
          icon: "mdi-clipboard-question-outline"
        },
        {
          title: "Retry Mechanism",
          description: "Users can reattempt quizzes to improve scores.",
          icon: "mdi-refresh-circle"
        },
        {
          title: "Admin Reports",
          description: "Track user progress and export reports.",
          icon: "mdi-chart-box-outline"
        },
        {
          title: "Certificates",
          description: "Issue completion certificates for 70%+ scores.",
          icon: "mdi-certificate-outline"
        },
        {
          title: "Email Notifications",
          description: "Automated reminders and result notifications.",
          icon: "mdi-email-alert-outline"
        },
        {
          title: "Manage Questions",
          description: "Admin can add or modify quiz content.",
          icon: "mdi-pencil-box-outline"
        }
      ]
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
.phishing-app-page {
  background: linear-gradient(to bottom right, #f4faff, #e3f0ff);
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

