import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue';
import About from '../views/About.vue';
import Products from '../views/Products.vue';
import Contact from '../views/Contact.vue';
import ConsentManagement from '../components/Product/ConsentManagement.vue';
import ComplianceMetrics from '../components/Product/ComplianceMetrics.vue';
import BreachManagement from '../components/Product/BreachManagement.vue';
import DPIA from '../components/Product/DPIA.vue';
import Governance from '../components/Product/Governance.vue';
import DSRManagement from '../components/Product/DSRM.vue';
import VendorManagement from '../components/Product/VendorManagement.vue';
import PhishingApp from '../components/Product/Phishing.vue';

const routes = [
  { path: '/', name: 'home', component: Home },
  { path: '/about', name: 'About', component: About },
  { path: '/products', name: 'Products', component: Products },
  { path: '/contact', name: 'Contact', component: Contact },
  { path: '/product/consent-management', name: 'ConsentManagement', component: ConsentManagement },
  { path: '/product/compliance-metrics', name: 'ComplianceMetrics', component: ComplianceMetrics },
  { path: '/product/breach-management', name: 'BreachManagement', component: BreachManagement },
  { path: '/product/dpia', name: 'DPIA', component: DPIA },
  { path: '/product/governance', name: 'Governance', component: Governance },
  { path: '/product/dsr-management', name: 'DSRManagement', component: DSRManagement },
  { path: '/product/vendor-management', name: 'VendorManagement', component: VendorManagement },
  // { path: '/product/data-minimization', name: 'DataMinimization', component: DataMinimization },
  { path: '/product/phishing-app', name: 'PhishingApp', component: PhishingApp },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
