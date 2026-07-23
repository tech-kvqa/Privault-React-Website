<!-- <template>
  <v-container>
    <v-row>
      <v-col cols="12" md="6">
        <v-img
          src="https://via.placeholder.com/400x300"
          data-aos="fade-right"
        />
      </v-col>
      <v-col cols="12" md="6">
        <h2 data-aos="fade-left">About Us</h2>
        <p data-aos="fade-left" data-aos-delay="200">
          We are a cybersecurity startup focused on safeguarding enterprise data.
        </p>
      </v-col>
    </v-row>
  </v-container>
</template>
 -->


 <template>
  <v-container fluid class="about-page pa-0">
    <!-- Hero Section -->
    <div class="hero-section" data-aos="fade-down">
      <h1 class="text-h2 text-primary mb-2">About Us</h1>
      <p class="text-subtitle-1 hero-text">
        At Privault, we believe privacy is not just compliance — it’s a right and necessity.
      </p>
    </div>

    <!-- Who We Are -->
    <v-container class="mt-10 text-center section-light" data-aos="fade-up">
      <h2 class="text-h5 font-weight-bold mb-4">Who We Are</h2>
      <v-row justify="center">
        <v-col cols="12" md="10">
          <p class="text-body-1">
            As data becomes the new currency of the digital age, individuals and businesses alike
            deserve secure, ethical, and transparent systems to manage it. That’s where we come in.
            Founded with the mission to simplify data protection, Privault is a next-generation
            platform built to help organizations navigate complex regulatory landscapes like
            India’s Digital Personal Data Protection Act (DPDPA) and other global standards
            including GDPR, PDPL, and more — empowering compliance without slowing innovation.
          </p>
          <p class="text-body-1 mt-4">
            Our flagship product offers Data Subject Consent Management, Automated Data Mapping
            & Classification, Data Breach Reporting & Response, HRMS, Compliance Dashboards, 
            Auto-phishing campaigns, PII violation detection, Vendor Risk Management, DPIA Tools, 
            Cross-border Transfer Safeguards, Privacy Policy Generators, and much more — all built 
            with legal intelligence and privacy engineering at the core.
          </p>
        </v-col>
      </v-row>
    </v-container>

    <!-- Vision & Mission -->
    <v-container class="mt-12 section-blue" data-aos="fade-up">
      <h2 class="text-h5 font-weight-bold mb-6">Our Vision & Mission</h2>
      <v-row dense>
        <v-col cols="12" md="6">
          <v-card class="pa-6 individual-feature-card" elevation="2">
            <v-icon size="32" color="primary" class="mb-2">mdi-eye</v-icon>
            <h3 class="text-subtitle-1 font-weight-medium">Vision</h3>
            <p class="text-body-2">
              To become India’s leading data privacy enabler, fostering a digital ecosystem where 
              innovation and compliance co-exist seamlessly.
            </p>
          </v-card>
        </v-col>
        <v-col cols="12" md="6">
          <v-card class="pa-6 individual-feature-card" elevation="2">
            <v-icon size="32" color="primary" class="mb-2">mdi-target</v-icon>
            <h3 class="text-subtitle-1 font-weight-medium">Mission</h3>
            <p class="text-body-2">
              To provide intuitive, regulation-ready solutions that make data protection simple, 
              scalable, and strategic for every organization.
            </p>
          </v-card>
        </v-col>
      </v-row>
    </v-container>

    <!-- Founder’s Note -->
    <v-container class="mt-12 text-center section-gradient" data-aos="fade-up">
      <h2 class="text-h5 font-weight-bold mb-6">A Note from the Founder</h2>
      <blockquote class="founder-note">
        "Privault was created with one core belief: privacy should empower, not hinder. Most
        businesses want to do the right thing but get lost in legal complexity. We bridge the gap
        between regulation and execution—offering solutions that are clear, practical, and built to scale."
      </blockquote>
    </v-container>

    <!-- Who We Work With -->
    <v-container class="mt-12 section-light" data-aos="fade-up">
      <h2 class="text-h5 font-weight-bold mb-6">Who We Work With</h2>
      <v-row dense>
        <v-col cols="12" md="4" v-for="(sector, i) in sectors" :key="i">
          <v-card class="pa-4 individual-feature-card" elevation="2">
            <v-icon size="32" color="primary" class="mb-2">{{ sector.icon }}</v-icon>
            <h3 class="text-subtitle-1 font-weight-medium">{{ sector.name }}</h3>
          </v-card>
        </v-col>
      </v-row>
    </v-container>

    <!-- Why Choose Us -->
    <v-container class="mt-12 section-blue" data-aos="fade-up">
      <h2 class="text-h5 font-weight-bold mb-6">Why Choose Privault?</h2>
      <v-row dense>
        <v-col cols="12" md="4" v-for="(reason, i) in reasons" :key="i">
          <v-card class="pa-4 individual-feature-card" elevation="2">
            <v-icon size="32" color="primary" class="mb-2">{{ reason.icon }}</v-icon>
            <p class="text-body-2">{{ reason.text }}</p>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </v-container>
</template>

<script>
export default {
  name: "AboutUs",
  data() {
    return {
      sectors: [
        { name: "SaaS & Cloud Platforms", icon: "mdi-cloud" },
        { name: "IT & Consultancy Firms", icon: "mdi-laptop" },
        { name: "FinTech & Insurance", icon: "mdi-bank" },
        { name: "Healthcare & Pharma", icon: "mdi-hospital" },
        { name: "Education & Research", icon: "mdi-school" },
        { name: "Legal & Audit Firms", icon: "mdi-scale-balance" },
        { name: "Government & NGOs", icon: "mdi-domain" },
      ],
      reasons: [
        { text: "Built for Indian compliance, aligned with global frameworks", icon: "mdi-shield-check" },
        { text: "Plug-and-play modules designed for scale", icon: "mdi-puzzle" },
        { text: "End-to-end visibility for DPOs and leadership", icon: "mdi-view-dashboard" },
        { text: "Legal-grade automation without legal confusion", icon: "mdi-gavel" },
        { text: "Backed by experts in law, tech, and policy", icon: "mdi-account-group" },
        { text: "Helping you lead with trust, not just comply", icon: "mdi-handshake" },
      ],
    };
  },
  mounted() {
    import("aos/dist/aos.css");
    import("aos").then((AOS) => AOS.init({ duration: 1000, once: true }));
  },
};
</script>

<style scoped>
/* .about-page {
  background: linear-gradient(to bottom right, #f0f4f8, #e3f0ff);
  padding-bottom: 100px;
}

.hero-section {
  text-align: center;
  padding: 80px 20px;
  background-color: #1f3557;
  color: #e3f0ff;
}

.founder-note {
  font-style: italic;
  font-size: 1.2rem;
  max-width: 800px;
  margin: auto;
  color: #1f3557;
}

.individual-feature-card {
  transition: all 0.3s ease;
  transform: scale(1);
  z-index: 1;
  position: relative;
}

.individual-feature-card:hover {
  transform: scale(1.05);
  box-shadow: 0 12px 24px rgba(0, 0, 0, 0.2);
  background-color: #e3f0ff;
  color: #1f3557;
}

.individual-feature-card:hover h3,
.individual-feature-card:hover p,
.individual-feature-card:hover .v-icon {
  color: #1f3557 !important;
} */

 .about-page {
  background: linear-gradient(to bottom right, #f9fbfd, #e6f2ff);
  padding-bottom: 120px;
}

/* Hero Section */
.hero-section {
  text-align: center;
  padding: 100px 20px;
  background: linear-gradient(135deg, #1f3557, #2a4d7d);
  color: #e3f0ff;
  /* border-bottom-left-radius: 40px;
  border-bottom-right-radius: 40px; */
}

.hero-section h1 {
  font-size: 2.8rem;
  font-weight: 700;
}

.hero-section p {
  font-size: 1.2rem;
  max-width: 800px;
  margin: 0 auto;
  opacity: 0.9;
}

/* Section Headings */
.about-page h2 {
  position: relative;
  display: inline-block;
  font-size: 1.6rem;
  font-weight: 700;
  color: #1f3557;
  margin-bottom: 1.5rem;
}

.about-page h2::after {
  content: "";
  display: block;
  width: 60px;
  height: 3px;
  background: #1f3557;
  margin: 8px auto 0;
  border-radius: 2px;
}

/* Body text */
.about-page p {
  line-height: 1.7;
  color: #2d2d2d;
  font-size: 1.05rem;
}

/* Feature Cards */
.individual-feature-card {
  transition: all 0.35s ease;
  transform: translateY(0);
  border-radius: 16px;
  background: #fff;
  border: 1px solid rgba(31, 53, 87, 0.1);
}

.individual-feature-card:hover {
  transform: translateY(-6px) scale(1.02);
  box-shadow: 0 14px 30px rgba(0, 0, 0, 0.15);
  background: linear-gradient(to bottom right, #e9f3ff, #ffffff);
}

.individual-feature-card h3 {
  font-weight: 600;
  margin-top: 8px;
  margin-bottom: 6px;
  color: #1f3557;
}

.individual-feature-card p {
  font-size: 0.95rem;
  color: #444;
}

.individual-feature-card .v-icon {
  transition: transform 0.3s ease, color 0.3s ease;
}

.individual-feature-card:hover .v-icon {
  transform: scale(1.2);
  color: #1f3557 !important;
}

/* Founder’s Note */
.founder-note {
  font-style: italic;
  font-size: 1.2rem;
  line-height: 1.8;
  max-width: 750px;
  margin: 0 auto;
  padding: 30px 40px;
  background: #ffffff;
  border-left: 5px solid #1f3557;
  border-radius: 12px;
  box-shadow: 0 8px 18px rgba(0, 0, 0, 0.08);
  color: #1f3557;
}

.section-blue {
  background-color: #c6d2e0;
  padding: 60px 20px;
  border-radius: 16px;
  margin-bottom: 40px;
}

.section-light {
  background-color: #ffffff;
  padding: 60px 20px;
  border-radius: 16px;
  margin-bottom: 40px;
  box-shadow: 0 6px 12px rgba(0,0,0,0.05);
}

.section-gradient {
  background: linear-gradient(135deg, #f0f7ff, #dceeff);
  padding: 60px 20px;
  border-radius: 16px;
  margin-bottom: 40px;
}

/* Responsive tweaks */
@media (max-width: 768px) {
  .hero-section h1 {
    font-size: 2rem;
  }
  .hero-section p {
    font-size: 1rem;
  }
}

.hero-text {
  color: #e3f0ff !important;
}

@media (max-width: 430px) {

  /* Who We Work With & Why Choose Privault cards */
  .individual-feature-card {
    transform: translateY(-6px) scale(1.00) !important;
    box-shadow: 0 14px 30px rgba(0, 0, 0, 0.15) !important;
    background: linear-gradient(to bottom right, #e9f3ff, #ffffff) !important;
  }

  .individual-feature-card h3,
  .individual-feature-card p,
  .individual-feature-card .v-icon {
    color: #1f3557 !important;
  }

  .individual-feature-card .v-icon {
    transform: scale(1.2) !important;
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

</style>
