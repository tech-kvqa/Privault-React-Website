<!-- <template>
  <v-container>
    <h2>Contact Us</h2>
    <v-form>
      <v-text-field label="Name" required></v-text-field>
      <v-text-field label="Email" required></v-text-field>
      <v-textarea label="Message" required></v-textarea>
      <v-btn color="primary" type="submit">Send</v-btn>
    </v-form>
  </v-container>
</template> -->


<!-- <template>
  <v-container class="py-12">
    <v-row justify="center">
      <v-col cols="12" md="8" lg="6">
        <h2 class="text-h4 font-weight-bold mb-6 text-center">Contact Us</h2>

        <v-card elevation="4" class="pa-6 rounded-xl">
          <v-form @submit.prevent="submitForm" ref="contactForm" v-model="formValid">
            <v-text-field
              label="Name"
              v-model="form.name"
              :rules="[v => !!v || 'Name is required']"
              required
              outlined
              dense
              class="mb-4"
            />

            <v-text-field
              label="Email"
              v-model="form.email"
              :rules="[v => !!v || 'Email is required', v => /.+@.+\..+/.test(v) || 'Enter a valid email']"
              required
              outlined
              dense
              class="mb-4"
            />

            <v-textarea
              label="Message"
              v-model="form.message"
              :rules="[v => !!v || 'Message is required']"
              required
              outlined
              rows="4"
              class="mb-6"
            />

            <v-btn color="primary" type="submit" :disabled="!formValid" block>
              Send Message
            </v-btn>
          </v-form>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  data() {
    return {
      form: {
        name: '',
        email: '',
        message: '',
      },
      formValid: false,
    };
  },
  methods: {
    submitForm() {
      if (this.$refs.contactForm.validate()) {
        // You can replace this with actual API call
        console.log('Form submitted:', this.form);

        // Reset form
        this.form = { name: '', email: '', message: '' };
        this.$refs.contactForm.resetValidation();
      }
    },
  },
};
</script>

<style scoped>
h2 {
  color: #e3f0ff;
}
</style> -->


<!-- <template>
  <v-container fluid class="contact-section py-12">
    <v-row justify="center" align="center">
      <v-col cols="12" md="10">
        <v-card class="pa-8 rounded-xl" elevation="8">
          <v-row>
            <v-col cols="12" md="5" class="pe-md-8 mb-6 mb-md-0 border-md-e">
              <h2 class="text-h5 font-weight-bold mb-4">Get in Touch</h2>
              <p class="text-body-2 mb-6">
                We'd love to hear from you! Whether you have a question about features, pricing, or anything else, our team is ready to answer.
              </p>
              <div class="mb-4">
                <v-icon color="primary" class="me-3">mdi-email</v-icon>
                <span>www.privault.ai</span>
              </div>
              <div class="mb-4">
                <v-icon color="primary" class="me-3">mdi-phone</v-icon>
                <span></span>
              </div>
              <div class="mb-4">
                <v-icon color="primary" class="me-3">mdi-map-marker</v-icon>
                <span>202, DLF GALLERIA MALL, MAYUR VIHAR, PHASE-1, DELHI-110091, INDIA</span>
              </div>
            </v-col>

            <v-col cols="12" md="7">
              <h2 class="text-h5 font-weight-bold mb-4">Contact Form</h2>
              <v-form @submit.prevent="submitForm" ref="contactForm" v-model="formValid">
                <v-text-field
                  v-model="form.name"
                  label="Name"
                  :rules="[v => !!v || 'Name is required']"
                  outlined
                  dense
                  class="mb-4"
                />
                <v-text-field
                  v-model="form.email"
                  label="Email"
                  :rules="[
                    v => !!v || 'Email is required',
                    v => /.+@.+\..+/.test(v) || 'Enter a valid email'
                  ]"
                  outlined
                  dense
                  class="mb-4"
                />
                <v-textarea
                  v-model="form.message"
                  label="Message"
                  :rules="[v => !!v || 'Message is required']"
                  outlined
                  rows="4"
                  class="mb-6"
                />
                <v-btn color="primary" type="submit" :disabled="!formValid" block>
                  Send Message
                </v-btn>
              </v-form>
            </v-col>
          </v-row>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  data() {
    return {
      form: {
        name: '',
        email: '',
        message: '',
      },
      formValid: false,
    };
  },
  methods: {
    submitForm() {
      if (this.$refs.contactForm.validate()) {
        console.log('Form submitted:', this.form);
        this.form = { name: '', email: '', message: '' };
        this.$refs.contactForm.resetValidation();
      }
    },
  },
};
</script>

<style scoped>
.contact-section {
  background: linear-gradient(to right, #f4f8ff, #e6f0ff);
}

.v-card {
  background-color: white;
  border-radius: 16px;
}

.border-md-e {
  border-right: 1px solid #eee;
}
</style> -->

<template>
  <v-container class="py-16">
    <!-- Header -->
    <v-row justify="center" class="mb-12">
      <v-col cols="12" md="8" class="text-center">
        <h1 class="text-h4 font-weight-bold mb-4">
          Contact Us
        </h1>
        <p class="text-body-1 text-grey-darken-1">
          Questions about privacy compliance, DPIA, or our platform?
          Send us a message and our team will respond shortly.
        </p>
      </v-col>
    </v-row>

    <!-- Main Content -->
    <v-row justify="center">
      <v-col cols="12" md="10">
        <v-card class="contact-card pa-8 pa-md-10" elevation="2">
          <v-row>
            <!-- Form -->
            <v-col cols="12" md="7" class="pe-md-10">
              <h2 class="text-h6 font-weight-semibold mb-6">
                Send a message
              </h2>

              <v-form
                ref="contactForm"
                v-model="formValid"
                @submit.prevent="submitForm"
              >
                <v-text-field
                  v-model="form.name"
                  label="Full name"
                  variant="outlined"
                  density="comfortable"
                  :rules="[v => !!v || 'Name is required']"
                  class="mb-5"
                />

                <v-text-field
                  v-model="form.email"
                  label="Work email"
                  variant="outlined"
                  density="comfortable"
                  :rules="emailRules"
                  class="mb-5"
                />

                <v-textarea
                  v-model="form.message"
                  label="How can we help?"
                  variant="outlined"
                  rows="4"
                  :rules="[v => !!v || 'Message is required']"
                  class="mb-8"
                />

                <v-btn
                  color="primary"
                  size="large"
                  type="submit"
                  :loading="loading"
                  :disabled="!formValid || loading"
                >
                  Send message
                </v-btn>
              </v-form>
            </v-col>

            <!-- Info -->
            <v-col cols="12" md="5" class="pt-8 pt-md-0 border-start">
              <div class="ps-md-8">
                <h3 class="text-subtitle-1 font-weight-medium mb-6">
                  Contact information
                </h3>

                <!-- <div class="info-row">
                  <span class="label">Website</span>
                  <span class="value">www.privault.ai</span>
                </div> -->

                <div class="info-row">
                  <span class="label">Email</span>
                  <span class="value">info@privault.ai</span>
                </div>

                <div class="info-row">
                  <span class="label">Office</span>
                  <span class="value">
                    202, DLF Galleria Mall<br />
                    Mayur Vihar Phase-1<br />
                    Delhi-110091, India
                  </span>
                </div>

                <v-divider class="my-6" />

                <p class="text-caption text-grey-darken-1">
                  We only use your information to respond to your enquiry.
                  No marketing. No spam.
                </p>
              </div>
            </v-col>
          </v-row>
        </v-card>
      </v-col>
    </v-row>

    <!-- Success -->
    <v-snackbar v-model="snackbar" color="success" timeout="3000">
      Message sent successfully.
    </v-snackbar>
  </v-container>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      form: {
        name: "",
        email: "",
        message: "",
      },
      formValid: false,
      loading: false,
      snackbar: false,
      emailRules: [
        v => !!v || "Email is required",
        v => /.+@.+\..+/.test(v) || "Enter a valid email",
      ],
    };
  },
  methods: {
    async submitForm() {
      if (!this.$refs.contactForm.validate()) return;

      this.loading = true;

      try {
        // Replace with Formspree / Web3Forms endpoint
        // await axios.post("https://formspree.io/f/xxxxxx", this.form);
        await axios.post("https://formspree.io/f/xbdadjar", {
          name: this.form.name,
          email: this.form.email,
          message: this.form.message,
        });

        this.snackbar = true;
        // this.form = { name: "", email: "", message: "" };
        // this.$refs.contactForm.resetValidation();

        this.$refs.contactForm.reset();

        // Optional: reset formValid
        this.formValid = false;
      } catch (e) {
        alert("Unable to send message. Please try again later.");
      } finally {
        this.loading = false;
      }
    },
  },
};
</script>

<style scoped>
.contact-card {
  border-radius: 14px;
  background: #ffffff;
}

.border-start {
  border-left: 1px solid #eaeaea;
}

.info-row {
  display: flex;
  flex-direction: column;
  margin-bottom: 18px;
}

.label {
  font-size: 12px;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  color: #6b7280;
}

.value {
  font-size: 14px;
  color: #111827;
  margin-top: 4px;
}
</style>