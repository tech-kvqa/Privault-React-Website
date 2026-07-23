<!-- <template>
  <div class="fab-container">
    <v-tooltip text="Book Demo" location="left">
      <template v-slot:activator="{ props }">
        <v-btn
          v-bind="props"
          color="primary"
          class="fab"
          size="large"
          icon="mdi-calendar-check"
          @click="goToCalendly"
        />
      </template>
    </v-tooltip>
  </div>
</template> -->

<!-- <template>
  <div class="fab-container">
    <v-tooltip text="Book Demo" location="left">
      <template v-slot:activator="{ props }">
        <v-btn
          v-bind="props"
          color="primary"
          class="fab"
          size="large"
          @click="goToCalendly"
        >
          <img :src="bookDemoGif" alt="Book Demo" class="fab-gif" />
        </v-btn>
      </template>
    </v-tooltip>
  </div>
</template>

<script>
import bookDemoGif from "../assets/book_demo.gif";
export default {
    data() {
        return {
            bookDemoGif, // available in template
        };
    },
  methods: {
    goToCalendly() {
      // Replace with your actual Calendly link
      window.open("https://calendly.com/your-org/demo", "_blank");
    },
  },
};
</script>

<style scoped>
/* .fab-container {
  position: fixed;
  bottom: 30px;
  right: 30px;
  z-index: 9999;
} */

.fab-container {
  position: fixed;
  top: 50%;
  right: 30px;
  transform: translateY(-50%);
  z-index: 9999;
}

.fab {
  border-radius: 50%;
  box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.2);
  transition: transform 0.2s ease-in-out;
}

.fab:hover {
  transform: scale(1.1);
}

.fab-gif {
  width: 28px;
  height: 28px;
  object-fit: contain;
}
</style> -->


<!-- <template>
  <div class="fab-container">
    <v-tooltip text="Book Demo" location="left">
      <template v-slot:activator="{ props }">
        <v-btn
          v-bind="props"
          color="#1f3557"
          class="fab"
          elevation="6"
          @click="goToCalendly"
        >
          <img :src="bookDemoGif" alt="Book Demo" class="fab-gif" />
        </v-btn>
      </template>
    </v-tooltip>
  </div>
</template>

<script>
import bookDemoGif from "@/assets/book_demo.gif"; // ✅ import from assets

export default {
  data() {
    return {
      bookDemoGif,
    };
  },
  methods: {
    goToCalendly() {
      window.open("https://calendly.com/your-org/demo", "_blank");
    },
  },
};
</script>

<style scoped>
.fab-container {
  position: fixed;
  top: 50%;
  right: 30px;
  transform: translateY(-50%);
  z-index: 9999;
}

/* Square button instead of round */
.fab {
  width: 70px;   /* adjust as needed */
  height: 70px;  /* square */
  min-width: 70px;
  min-height: 70px;
  border-radius: 12px; /* rounded square, change to 0 for perfect square */
  padding: 0;
  display: flex;
  align-items: center;
  justify-content: center;
}

.fab:hover {
  transform: scale(1.08);
}

.fab-gif {
  width: 60px;   /* make gif large */
  height: 60px;
  object-fit: contain;
}
</style> -->

<template>
  <div class="fab-container" @click="openBooking">
  <!-- <div class="fab-container" @click="$emit('open-meeting')"> -->
    <img :src="bookDemoGif" alt="Book Demo" class="fab-gif" />
    <span class="fab-ribbon">Book a Demo</span>
  </div>
</template>

<script>
import bookDemoGif from "@/assets/book_demo.gif";

export default {
  data() {
    return { bookDemoGif };
  },
  // methods: {
  //   goToCalendly() {
  //     window.open("https://calendly.com/your-org/demo", "_blank");
  //   },
  // },

  methods: {
    openBooking() {
      window.open(
        "https://calendar.app.google/81BuaveR2dU9RX3a6",
        "_blank",
        "noopener,noreferrer"
      );
    },
  }
};
</script>

<style scoped>
.fab-container {
  position: fixed;
  top: 50%;
  right: 30px;
  transform: translateY(-50%);
  z-index: 9999;
  cursor: pointer;
  height: 64px;
  width: 64px;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  overflow: hidden;
  transition: width 0.5s ease;
}

.fab-container:hover {
  width: 200px;
}

.fab-gif {
  width: 64px;
  height: 64px;
  object-fit: contain;
  flex-shrink: 0;
  transition: opacity 0.4s ease;
  z-index: 2;
}

.fab-ribbon {
  margin-left: 10px;
  background: #1f3557;
  color: #fff;
  font-size: 14px;
  padding: 8px 14px;
  border-radius: 6px;
  white-space: nowrap;
  opacity: 0;
  transform: translateX(30px);
  transition: all 0.5s ease;
  z-index: 1;
}

.fab-container:hover .fab-gif {
  opacity: 0;
}

.fab-container:hover .fab-ribbon {
  opacity: 1;
  transform: translateX(0);
}
</style>