/**
 * @file index.ts
 * @description Static configuration datasets representing products, sectors, and compliance highlights.
 */

import { Product } from "@/types";

export const products: Product[] = [
  {
    slug: 'compliance-metrics',
    title: 'Compliance Metrics',
    description: 'Visualize KPIs, audit stats, consent records, and security performance.',
    icon: 'BarChart3',
    mockupType: 'compliance',
    overview: 'Our Compliance Metrics suite centralizes your privacy governance capabilities. Monitor and manage privacy policy generation, cross-border data transfers, and jurisdictional compliance from one intelligent interface. Automate document creation, assess international transfer risks, and stay aligned with evolving global laws like GDPR, PDPA, CCPA, and more. The platform enables real-time visibility into data flow, generates audit-ready documentation, and integrates with other modules such as Consent and Vendor Management — offering a comprehensive, always-current compliance picture.',
    features: [
      {
        title: 'Cross-Border Mapping',
        description: 'Identify source and destination countries, legal mechanisms, and transfer volume trends.',
        icon: 'Globe'
      },
      {
        title: 'SCC & BCR Management',
        description: 'Upload SCCs/BCRs, set expiry alerts, and maintain immutable audit trails for transfers.',
        icon: 'FileLock'
      },
      {
        title: 'Transfer Risk Analysis',
        description: 'Assess risk levels based on predefined criteria and highlight non-compliant jurisdictions.',
        icon: 'ShieldAlert'
      },
      {
        title: 'Privacy Policy Generator',
        description: 'Generate, edit, and version privacy policies based on jurisdiction-specific checklists.',
        icon: 'FileSpreadsheet'
      },
      {
        title: 'Policy Compliance Checker',
        description: 'Compare existing policies against legal frameworks and generate gap analysis reports.',
        icon: 'CheckSquare'
      },
      {
        title: 'Multi-Jurisdiction Support',
        description: 'Ensure compliance across GDPR, DPDP, LGPD, CCPA and more from one unified interface.',
        icon: 'Scale'
      }
    ]
  },
  {
    slug: 'breach-management',
    title: 'Breach Management',
    description: 'Track, contain, and report incidents with real-time dashboards.',
    icon: 'ShieldAlert',
    mockupType: 'breach',
    overview: 'The Breach Management module is designed to streamline the entire lifecycle of a data breach — from detection to resolution. With a multi-step reporting wizard, automated severity classification, and SLA-based escalation, the system ensures rapid containment and compliance with global regulations like GDPR and DPDP. Whether reporting, investigating, or auditing, every step is logged with precision. Role-based access allows admins, handlers, compliance officers, and auditors to collaborate in real-time. Incident handlers can upload evidence, document RCA (Root Cause Analysis), and notify stakeholders, while templates help comply with regulatory disclosure timelines. The dashboard also provides live metrics on open breaches, SLA compliance, trends, and resolution timelines — all stored securely and retained for 5 years.',
    features: [
      {
        title: 'Multi-Step Reporting',
        description: 'Submit breaches using a structured wizard (Incident, Systems, Impact, Evidence) with draft saving.',
        icon: 'FileText'
      },
      {
        title: 'Severity Classification',
        description: 'Automatically classify breaches by data type, individual count, and overall severity level.',
        icon: 'Cpu'
      },
      {
        title: 'Instant Alerts',
        description: 'Notify legal, compliance, and incident response teams immediately upon breach report.',
        icon: 'BellRing'
      },
      {
        title: 'Role-Based Collaboration',
        description: 'Admins, Handlers, Compliance officers, and Auditors have tailored views and access privileges.',
        icon: 'Users'
      },
      {
        title: 'Live Case Feeds',
        description: 'Comment, upload evidence, and update logs simultaneously in real time.',
        icon: 'MessageSquare'
      },
      {
        title: 'Pre-Filled Authority Notices',
        description: 'Auto-generate DPA notification templates per jurisdiction (GDPR, DPDP, etc.).',
        icon: 'Download'
      },
      {
        title: 'Breach Metrics Dashboard',
        description: 'Real-time stats for active breaches, SLA compliance, and root cause breakdowns.',
        icon: 'PieChart'
      },
      {
        title: 'Secure Archiving',
        description: 'Retain breaches for 5 years and then archive securely with integrity validation.',
        icon: 'Archive'
      },
      {
        title: 'Full Audit Trails',
        description: 'Track every user action with timestamps, justification, and digital signatures.',
        icon: 'History'
      }
    ]
  },
  {
    slug: 'dpia',
    title: 'DPIA (Risk Assessment)',
    description: 'Identify and mitigate risks through structured privacy assessments.',
    icon: 'FileWarning',
    mockupType: 'dpia',
    overview: 'The DPIA Tool is a web-based solution designed to help organizations identify, assess, and mitigate privacy risks associated with data processing activities. The tool ensures compliance with GDPR (Article 35), ISO 27701, CCPA, and other data protection regulations by guiding risk assessment assessors through structured questionnaires and suggesting legal mitigations.',
    features: [
      {
        title: 'Automated DPIA Templates',
        description: 'Quickly create and manage DPIAs using predefined regulatory templates.',
        icon: 'FolderKanban'
      },
      {
        title: 'Data Categorization',
        description: 'Classify PII and sensitive data for accurate privacy analysis.',
        icon: 'Database'
      },
      {
        title: 'Risk Scoring Engine',
        description: 'Score privacy risks based on likelihood and impact using built-in logic.',
        icon: 'Activity'
      },
      {
        title: 'Compliance Cross-Check',
        description: 'Evaluate DPIAs against GDPR, CCPA, ISO 27701 and more.',
        icon: 'FileCheck'
      },
      {
        title: 'Mitigation Suggestions',
        description: 'Recommended actions to reduce identified risk severity.',
        icon: 'Lightbulb'
      },
      {
        title: 'Multi-Stage Approvals',
        description: 'Route DPIAs through customizable approval workflows (DPO, Legal, IT).',
        icon: 'CheckCircle2'
      },
      {
        title: 'Audit Trail',
        description: 'Track changes and decision history for full transparency.',
        icon: 'Clock'
      },
      {
        title: 'Report Exporting',
        description: 'Download DPIA reports in PDF, JSON, XML, and CSV formats.',
        icon: 'FileUp'
      }
    ]
  },
  {
    slug: 'governance',
    title: 'Governance',
    description: 'Set rules and policies for better data handling and audit readiness.',
    icon: 'Scale',
    mockupType: 'governance',
    overview: 'Establish data governance baselines, organize corporate policies, schedule internal audits, track board meeting records, and maintain continuous audit-readiness. The Governance suite helps bridge the gap between regulatory requirements and active compliance processes.',
    features: [
      {
        title: 'Audit Schedule Management',
        description: 'Upload schedules, notify employees, and log events. Export filtered logs and automate reminders.',
        icon: 'Calendar'
      },
      {
        title: 'Audit Report Submission',
        description: 'Submit, view, and export final audit reports with metadata for regulatory traceability.',
        icon: 'FileSignature'
      },
      {
        title: 'Audit Findings Tracker',
        description: 'Log, view, and close audit findings with structured fields and RBAC.',
        icon: 'AlertTriangle'
      },
      {
        title: 'Board Meeting Management',
        description: 'Schedule and record audit board meetings with agenda tracking and PDF minutes.',
        icon: 'Presentation'
      },
      {
        title: 'Policy Register & Drafting',
        description: 'Maintain centralized compliance policy registers with detailed version control and approvals.',
        icon: 'BookOpen'
      },
      {
        title: 'Distribution Tracking',
        description: 'Assign policies to departments and collect employee acknowledgements dynamically.',
        icon: 'BadgeCheck'
      }
    ]
  },
  {
    slug: 'dsr-management',
    title: 'DSR Management',
    description: 'Handle data subject access and erasure requests seamlessly.',
    icon: 'UserCheck',
    mockupType: 'dsr',
    overview: 'Our DSR (Data Subject Request) Management portal streamlines requests for user access, erasure, correction, and objection. Verify user identity, track request progress under strict SLAs, and securely deliver files to data subjects in full compliance with GDPR, CCPA, and India\'s DPDP Act.',
    features: [
      {
        title: 'Submit & Track Requests',
        description: 'Data subjects submit data access or erasure requests and monitor status in real-time.',
        icon: 'ListFilter'
      },
      {
        title: 'Role-Based Portals',
        description: 'Tailored login portals for Data Subjects and Administrators with 2FA support.',
        icon: 'UserLock'
      },
      {
        title: 'Audit Logs & SLA Alerts',
        description: 'Logs every administrative action and issues alerts as regulatory timelines near.',
        icon: 'AlarmClock'
      },
      {
        title: 'Secure Document Handling',
        description: 'Allows secure upload of identity verification and delivery of encrypted data files.',
        icon: 'FolderUp'
      },
      {
        title: 'WCAG Compliant Access',
        description: 'Designed under accessibility standards to ensure ease of request for all individuals.',
        icon: 'Eye'
      },
      {
        title: 'Integrated Consent Linking',
        description: 'Links requests with active consent parameters to auto-confirm user details.',
        icon: 'Link'
      }
    ]
  },
  {
    slug: 'vendor-management',
    title: 'Vendor Management',
    description: 'Evaluate, onboard, and monitor vendors for compliance alignment.',
    icon: 'Briefcase',
    mockupType: 'vendor',
    overview: 'Monitor the compliance status of third-party vendors and subprocessors. Maintain a vendor register, evaluate third-party risk profiles, monitor contract obligations, and map secure data transmission links.',
    features: [
      {
        title: 'Vendor Registry',
        description: 'Keep a centralized index of third-party vendors that process, transfer, or store company data.',
        icon: 'ClipboardList'
      },
      {
        title: 'Risk Questionnaires',
        description: 'Deploy, trace, and score vendor compliance assessments dynamically.',
        icon: 'FileQuestion'
      },
      {
        title: 'DPA & SCC Compliance',
        description: 'Link Data Processing Addendums (DPAs) and monitor clauses for third-party integrity.',
        icon: 'FileLock'
      },
      {
        title: 'Visual Flow Mapping',
        description: 'Render details of vendor connections, transmission mechanisms, and geographic paths.',
        icon: 'Network'
      },
      {
        title: 'Onboarding & Alerting',
        description: 'Automate vendor onboarding workflows and issue alerts for overdue evaluations.',
        icon: 'FileWarning'
      },
      {
        title: 'Integrated Audit Trail',
        description: 'Maintain detailed history logs of vendor approvals, edits, and contract renewals.',
        icon: 'History'
      }
    ]
  },
  {
    slug: 'phishing-app',
    title: 'Phishing App',
    description: 'Run email simulations to train and track employee awareness.',
    icon: 'MailWarning',
    mockupType: 'phishing',
    overview: 'Train employees and mitigate social engineering risks. Run simulated phishing campaigns, trace open rates, display warnings and study guides upon link clicks, test knowledge with quizzes, and generate completion certificates.',
    features: [
      {
        title: 'User Authentication',
        description: 'Employees securely log in to access security training and quizzes.',
        icon: 'Fingerprint'
      },
      {
        title: 'Simulation Campaigns',
        description: 'Set up and send realistic phishing email campaigns to target departments.',
        icon: 'Anchor'
      },
      {
        title: 'Warning Screens',
        description: 'Immediately show a constructive alert guide if an employee clicks a mock phishing link.',
        icon: 'AlertOctagon'
      },
      {
        title: 'Interactive Quizzes',
        description: 'Provide dynamic scenario questions to reinforce phishing identifiers.',
        icon: 'GraduationCap'
      },
      {
        title: 'Retry Workflows',
        description: 'Allow employees to review study materials and retake tests to meet baseline requirements.',
        icon: 'RefreshCw'
      },
      {
        title: 'Progress Reports',
        description: 'Admins trace quiz scores, click-through rates, and export CSV/Excel report logs.',
        icon: 'TrendingUp'
      },
      {
        title: 'Auto-Certificates',
        description: 'Automatically issue compliance certificates to employees scoring 70% or more.',
        icon: 'Award'
      },
      {
        title: 'Alert Notifications',
        description: 'Send automated email updates for mandatory trainings and campaign findings.',
        icon: 'Mail'
      },
      {
        title: 'Simulation Management',
        description: 'Admins add, update, and manage the simulated email templates database.',
        icon: 'FileEdit'
      }
    ]
  }
];

export const sectors = [
  { name: "SaaS & Cloud Platforms", icon: "Cloud", image: "https://images.unsplash.com/photo-1597852074816-d933c4d2b988?auto=format&fit=crop&w=600&q=80" },
  { name: "IT & Consultancy Firms", icon: "Laptop", image: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=600&q=80" },
  { name: "FinTech & Insurance", icon: "TrendingUp", image: "https://images.unsplash.com/photo-1559526324-4b87b5e36e44?auto=format&fit=crop&w=600&q=80" },
  { name: "Healthcare & Pharma", icon: "Activity", image: "https://images.unsplash.com/photo-1530026405186-ed1ea0ac7a63?auto=format&fit=crop&w=600&q=80" },
  { name: "Education & Research", icon: "GraduationCap", image: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&w=600&q=80" },
  { name: "Legal & Audit Firms", icon: "Scale", image: "https://images.unsplash.com/photo-1589829545856-d10d557cf95f?auto=format&fit=crop&w=600&q=80" },
  { name: "Government & NGOs", icon: "Home", image: "https://images.unsplash.com/photo-1541872703-74c5e44368f9?auto=format&fit=crop&w=600&q=80" }
];

export const reasons = [
  { text: "Built for Indian compliance, aligned with global frameworks (GDPR, CCPA)", icon: "ShieldCheck" },
  { text: "Plug-and-play modules designed for rapid corporate scaling", icon: "Puzzle" },
  { text: "End-to-end visibility for DPOs and executive leadership", icon: "LayoutGrid" },
  { text: "Legal-grade automation without technical complexity", icon: "Gavel" },
  { text: "Backed by experts in data privacy, law, and engineering", icon: "Users" },
  { text: "Helping you lead with digital trust, not just checklist compliance", icon: "HeartHandshake" }
];
