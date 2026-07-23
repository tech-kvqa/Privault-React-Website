<!-- <template>
  <v-container>
    <h2>Privalut Website</h2>
  </v-container>
</template>

<script>
</script> -->


<!-- <template>
  <v-container class="fill-height text-center">
    <v-row align="center" justify="center">
      <v-col>
        <h1 class="text-h2 mb-4" data-aos="fade-up">Cybersecurity Redefined</h1>
        <p data-aos="fade-in" data-aos-delay="200">Your digital shield against modern threats.</p>
        <v-btn color="primary" large data-aos="zoom-in" data-aos-delay="400">Explore Now</v-btn>
      </v-col>
    </v-row>
  </v-container>
</template>
 -->


<!-- <template>
  <v-container fluid class="pa-0">
    <v-container class="fill-height text-center hero-section" id="hero">
      <v-row align="center" justify="center">
        <v-col>
          <h1 class="text-h2 mb-4 text-white" data-aos="fade-up">Cybersecurity Redefined</h1>
          <p class="text-white" data-aos="fade-in" data-aos-delay="200">Your digital shield against modern threats.</p>
          <v-btn
            color="primary"
            size="large"
            class="mt-4"
            data-aos="zoom-in"
            data-aos-delay="400"
            @click="scrollToProducts"
          >
            Explore Now
          </v-btn>
        </v-col>
      </v-row>
    </v-container>

    <v-container id="products" class="mt-12 mb-16">
      <h2 class="text-center mb-10" data-aos="fade-up">Our Product Suite</h2>
      <v-row dense>
        <v-col
          v-for="product in products"
          :key="product.title"
          cols="12"
          md="4"
          class="mb-6"
          data-aos="fade-up"
          data-aos-delay="200"
        >
          <v-card class="pa-4 text-center" color="#1f3557" dark>
            <v-icon size="40" class="mb-3">{{ product.icon }}</v-icon>
            <h3 class="text-h6 mb-2">{{ product.title }}</h3>
            <p class="text-body-2 mb-3">{{ product.description }}</p>
            <v-btn color="primary" :to="product.route" variant="outlined">Learn More</v-btn>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </v-container>
</template>

<script>
export default {
  data() {
    return {
      products: [
        {
          title: 'Compliance Metrics',
          route: '/product/compliance-metrics',
          description: 'Track privacy KPIs, audits, data health, and regulatory status.',
          icon: 'mdi-chart-bar'
        },
        {
          title: 'Breach Management',
          route: '/product/breach-management',
          description: 'Detect, document, and act swiftly on data breaches.',
          icon: 'mdi-shield-alert'
        },
        {
          title: 'DPIA (Risk Assessment)',
          route: '/product/dpia',
          description: 'Assess and mitigate privacy risks across systems and vendors.',
          icon: 'mdi-clipboard-alert'
        },
        {
          title: 'Governance',
          route: '/product/governance',
          description: 'Centralize your privacy framework and organizational controls.',
          icon: 'mdi-account-group'
        },
        {
          title: 'DSR Management',
          route: '/product/dsr-management',
          description: 'Automate and fulfill Data Subject Requests efficiently.',
          icon: 'mdi-account-key'
        },
        {
          title: 'Vendor Management',
          route: '/product/vendor-management',
          description: 'Track and assess third-party compliance and contracts.',
          icon: 'mdi-truck'
        },
        {
          title: 'Phishing App',
          route: '/product/phishing-app',
          description: 'Simulate phishing and train users on threat recognition.',
          icon: 'mdi-email-alert'
        }
      ]
    }
  },
  methods: {
    scrollToProducts() {
      const el = document.getElementById('products')
      if (el) el.scrollIntoView({ behavior: 'smooth' })
    }
  }
}
</script>

<style scoped>
.hero-section {
  background: linear-gradient(145deg, #1f3557, #2b4162);
  height: 100vh;
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style> -->

<!-- <template>
  <v-container fluid class="pa-0">
    <section class="hero-section d-flex align-center justify-center">
      <v-container class="text-center">
        <h1 class="text-h2 mb-4 text-white" data-aos="fade-up">Cybersecurity Redefined</h1>
        <p class="text-white mb-6" data-aos="fade-in" data-aos-delay="200">Your digital shield against modern threats.</p>
        <v-btn
          color="primary"
          size="large"
          class="explore-btn"
          data-aos="zoom-in"
          data-aos-delay="400"
          @click="revealProduct"
        >
          Explore Now
        </v-btn>
      </v-container>
    </section>

    <transition name="slide-up">
      <section v-if="showProducts" class="product-section py-12">
        <v-container>
          <h2 class="text-center mb-10">Our Product Suite</h2>
          <v-row dense>
            <v-col
              v-for="product in products"
              :key="product.title"
              cols="12"
              md="4"
              class="mb-6"
            >
              <v-card class="pa-4 text-center" color="#1f3557" dark>
                <v-icon size="40" class="mb-3">{{ product.icon }}</v-icon>
                <h3 class="text-h6 mb-2">{{ product.title }}</h3>
                <p class="text-body-2 mb-3">{{ product.description }}</p>
                <v-btn color="primary" :to="product.route" variant="outlined">Learn More</v-btn>
              </v-card>
            </v-col>
          </v-row>
        </v-container>
      </section>
    </transition>
  </v-container>
</template>

<script>
export default {
  data() {
    return {
      showProducts: false,
      products: [
        {
          title: 'Compliance Metrics',
          route: '/product/compliance-metrics',
          description: 'Track privacy KPIs, audits, data health, and regulatory status.',
          icon: 'mdi-chart-bar'
        },
        {
          title: 'Breach Management',
          route: '/product/breach-management',
          description: 'Detect, document, and act swiftly on data breaches.',
          icon: 'mdi-shield-alert'
        },
        {
          title: 'DPIA (Risk Assessment)',
          route: '/product/dpia',
          description: 'Assess and mitigate privacy risks across systems and vendors.',
          icon: 'mdi-clipboard-alert'
        },
        {
          title: 'Governance',
          route: '/product/governance',
          description: 'Centralize your privacy framework and organizational controls.',
          icon: 'mdi-account-group'
        },
        {
          title: 'DSR Management',
          route: '/product/dsr-management',
          description: 'Automate and fulfill Data Subject Requests efficiently.',
          icon: 'mdi-account-key'
        },
        {
          title: 'Vendor Management',
          route: '/product/vendor-management',
          description: 'Track and assess third-party compliance and contracts.',
          icon: 'mdi-truck'
        },
        {
          title: 'Phishing App',
          route: '/product/phishing-app',
          description: 'Simulate phishing and train users on threat recognition.',
          icon: 'mdi-email-alert'
        }
      ]
    };
  },
  methods: {
    revealProduct() {
      this.showProducts = true;
      // Optional: scroll to product section smoothly
      this.$nextTick(() => {
        const productEl = document.querySelector('.product-section');
        if (productEl) {
          productEl.scrollIntoView({ behavior: 'smooth' });
        }
      });
    }
  }
};
</script>

<style scoped>
.hero-section {
  height: 100vh;
  background: linear-gradient(145deg, #1f3557, #2b4162);
  color: white;
  position: relative;
  z-index: 1;
}

.product-section {
  background-color: #f4f7fa;
  position: relative;
  z-index: 2;
}

/* Slide-up animation */
.slide-up-enter-active {
  transition: all 0.6s ease;
}
.slide-up-leave-active {
  transition: all 0.4s ease;
}
.slide-up-enter-from {
  opacity: 0;
  transform: translateY(100%);
}
.slide-up-leave-to {
  opacity: 0;
  transform: translateY(100%);
}
</style> -->

<template>
  <v-container fluid class="pa-0">
    <!-- Hero Section -->
    <!-- <section class="hero-section d-flex align-center justify-center text-center">
      <div> -->
        <!-- <h1 class="text-h2 font-weight-bold mb-4" data-aos="fade-up">Cybersecurity Redefined</h1> -->
        <!-- <h1 class="hero-title mb-4" data-aos="fade-up">Cybersecurity Redefined</h1> -->
        <!-- <p class="text-subtitle-1 mb-6" data-aos="fade-in" data-aos-delay="200"> -->
        <!-- <p class="hero-subtitle mb-6" data-aos="fade-in" data-aos-delay="200">
          Your digital shield against modern threats.
        </p>
        <v-btn
          color="primary"
          large
          data-aos="zoom-in"
          data-aos-delay="400"
          rounded="xl"
          @click="scrollToProducts"
        >
          Explore Now
        </v-btn>
      </div>
    </section> -->

    <section class="hero-section d-flex align-center justify-center text-center">
      <div class="hero-content">
        <h1 class="hero-title mb-3">Privacy Redefined</h1>
        <p class="hero-subtitle mb-6">
          Your digital shield against modern threats.
        </p>
        <v-btn color="#C5C6C7" large rounded="xl" @click="scrollToProducts">
          Explore Now
        </v-btn>
      </div>

      <!-- Floating images -->
      <div class="hero-images">
        <img :src="image1" class="float-img img1" />
        <img :src="image2" class="float-img img2" />
        <img :src="image3" class="float-img img3" />
      </div>
    </section>

    <!-- Product Overview Section -->
    <section
      v-if="showProducts"
      ref="productSection"
      class="product-section py-8 scroll-target"
    >
      <v-container>
        <!-- <h2 class="text-h4 text-center mb-8 font-weight-bold" data-aos="fade-up"> -->
        <h2 class="section-title text-center mb-8" data-aos="fade-up">
          Our Compliance Solutions
        </h2>
        <v-row dense>
          <v-col
            v-for="product in products"
            :key="product.title"
            cols="12"
            sm="6"
            md="6"
            class="mb-5"
            data-aos="zoom-in-up"
          >
            <v-card class="pa-4 text-center" color="#1f3557" dark>
              <v-icon size="40" class="mb-3">{{ product.icon }}</v-icon>
              <!-- <h3 class="text-h6 mb-2">{{ product.title }}</h3> -->
              <h3 class="card-title mb-2">{{ product.title }}</h3>
              <!-- <p class="text-body-2 mb-3">{{ product.description }}</p> -->
              <p class="text-description mb-3">{{ product.description }}</p>
              <v-btn color="primary" :to="product.route" variant="outlined">
                Learn More
              </v-btn>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </section>
  </v-container>
</template>

<script>
import image1 from "@/assets/edited/dashboard.png";
import image2 from "@/assets/edited/Data Minimization Dashboard.png";
import image3 from "@/assets/edited/width_550.png";
export default {
  data() {
    return {
      showProducts: false,
      image1,
      image2,
      image3,
      products: [
        {
          title: "Compliance Metrics",
          description: "Visualize KPIs, audit stats, consent records, and security performance.",
          route: "/product/compliance-metrics",
          icon: "mdi-chart-bar",
        },
        {
          title: "Breach Management",
          description: "Track, contain, and report incidents with real-time dashboards.",
          route: "/product/breach-management",
          icon: "mdi-shield-alert",
        },
        {
          title: "DPIA (Risk Assessment)",
          description: "Identify and mitigate risks through structured privacy assessments.",
          route: "/product/dpia",
          icon: "mdi-file-document-alert",
        },
        {
          title: "Governance",
          description: "Set rules and policies for better data handling and audit readiness.",
          route: "/product/governance",
          icon: "mdi-scale-balance",
        },
        {
          title: "DSR Management",
          description: "Handle data subject access and erasure requests seamlessly.",
          route: "/product/dsr-management",
          icon: "mdi-account-key",
        },
        {
          title: "Vendor Management",
          description: "Evaluate, onboard, and monitor vendors for compliance alignment.",
          route: "/product/vendor-management",
          icon: "mdi-briefcase-check",
        },
        {
          title: "Phishing App",
          description: "Run email simulations to train and track employee awareness.",
          route: "/product/phishing-app",
          icon: "mdi-email-alert",
        },
      ],
    };
  },
  methods: {
    scrollToProducts() {
      this.showProducts = true;
      this.$nextTick(() => {
        const el = this.$refs.productSection;
        if (el) {
          el.scrollIntoView({ behavior: "smooth" });
        }
      });
    },
  },
};
</script>

<style scoped>
/* .hero-section {
  min-height: 100vh;
  background: linear-gradient(to right, #0f2027, #203a43, #2c5364);
  color: white;
  padding: 0 20px;
} */

.hero-section {
  min-height: 100vh;
  background: linear-gradient(to right, #0f2027, #203a43, #2c5364);
  color: white;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 40px;
  position: relative;
  overflow: hidden;
}

/* .product-section {
  background-color: #f5f5f5;
}

.scroll-target {
  scroll-margin-top: 80px;
} */
.hero-content {
  max-width: 500px;
  z-index: 2;
}

.hero-images {
  position: relative;
  width: 500px;
  height: 500px;
}
/* 🔹 Fonts */
.hero-title {
  font-family: 'Poppins', sans-serif;
  font-size: 2.5rem;
  font-weight: 600;
  color: #5DADE2
}

.hero-subtitle {
  font-family: 'Inter', sans-serif;
  font-size: 1.1rem;
  font-weight: 400;
  color: #F4D03F
}

.section-title {
  font-family: 'Poppins', sans-serif;
  font-weight: 600;
  font-size: 2rem;
}

.card-title {
  font-family: 'Poppins', sans-serif;
  font-weight: 500;
  font-size: 1.25rem;
}

.card-description {
  font-family: 'Inter', sans-serif;
  font-size: 0.95rem;
  line-height: 1.5;
}

/* Layout */
.product-section {
  background-color: #f5f5f5;
}

.scroll-target {
  scroll-margin-top: 80px;
}

/* .float-img {
  position: absolute;
  width: 400px;
  height: auto;
  border-radius: 12px;
  box-shadow: 0 8px 25px rgba(0,0,0,0.25);
  animation: float 6s ease-in-out infinite;
} */

.float-img {
  position: absolute;
  width: 400px;
  height: auto;
  border-radius: 12px;
  box-shadow: 0 8px 25px rgba(0,0,0,0.25);
  animation: float 6s ease-in-out infinite;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  --angle: 0deg; /* default rotation */
}

.img1 { top: 20px; left: 40px; transform: rotate(-5deg); }
.img2 { bottom: 40px; right: 20px; transform: rotate(8deg); }
.img3 { top: 100px; right: 120px; transform: rotate(-3deg); }

/* .img1 { top: 20px; left: 40px; --angle: -5deg; }
.img2 { bottom: 40px; right: 20px; --angle: 8deg; }
.img3 { top: 100px; right: 120px; --angle: -3deg; } */

@keyframes float {
  0%, 100% { transform: translateY(0) rotate(var(--angle, 0deg)); }
  50% { transform: translateY(-12px) rotate(var(--angle, 0deg)); }
}

/* @keyframes float {
  0%, 100% { transform: translateY(0) rotate(var(--angle)); }
  50% { transform: translateY(-12px) rotate(var(--angle)); }
} */

/* .float-img:hover {
  transform: scale(2);
  z-index: 10;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.25);
} */

.float-img:hover {
  width: 600px;
  height: auto; /* keeps aspect ratio */
  transform: rotate(var(--angle));
  z-index: 10;
  box-shadow: 0 12px 30px rgba(0,0,0,0.35);
}

/* @media (max-width: 768px) {
  .float-img {
    width: 260px !important;
  }

  .float-img:hover {
    width: 260px !important;
  }
} */

 @media (max-width: 768px) {

  /* Hero layout stays stacked */
  .hero-section {
    flex-direction: column;
    justify-content: center;
    text-align: center;
    padding: 60px 20px;
    min-height: auto;
  }

  .hero-content {
    max-width: 100%;
    margin-bottom: 32px;
    z-index: 3;
  }

  /* Screenshot container */
  .hero-images {
    width: 100%;
    height: 420px;
    position: relative;
  }

  /* Base image style */
  .float-img {
    width: 220px;
    max-width: 80vw;
    position: absolute;
    box-shadow: 0 8px 25px rgba(0,0,0,0.25);
    transform: rotate(var(--angle, 0deg));
  }

  /* ⬅️➡️ Zig-zag positioning */
  .img1 {
    top: 0;
    left: 0;
  }

  .img2 {
    top: 140px;
    right: 0;
  }

  .img3 {
    top: 280px;
    left: 0;
  }

  /* Disable hover zoom on mobile */
  .float-img:hover {
    width: 220px;
  }
}

</style>
