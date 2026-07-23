/**
 * @file index.ts
 * @description Centralized TypeScript interface definitions for the Privault platform.
 */

/**
 * Represents a key product feature or operational capability.
 */
export interface Feature {
  /** The display name of the feature */
  title: string;
  /** Detailed description of the feature's capability */
  description: string;
  /** Name of the Lucide icon associated with the feature */
  icon: string;
}

/**
 * Represents a functional product module within the Privault security and compliance platform.
 */
export interface Product {
  /** Unique URL-friendly identifier for the product */
  slug: string;
  /** The name of the product module */
  title: string;
  /** A short summary of the product's value proposition */
  description: string;
  /** Name of the Lucide icon representing the product */
  icon: string;
  /** Detailed paragraph detailing the module's capabilities */
  overview: string;
  /** Checklist of technical features/specifications */
  features: Feature[];
  /** Type identifier mapping the product to its corresponding interactive mockup sandbox */
  mockupType: 'consent' | 'compliance' | 'breach' | 'dpia' | 'governance' | 'dsr' | 'vendor' | 'phishing';
}
