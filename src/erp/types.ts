/**
 * PHASE 15 & PHASE 16 — ERP-READY DOMAIN MODELS & INTEGRATION BOUNDARIES
 * Defines clean domain contracts for future ERP expansion without coupling
 * public website rendering to internal back-office database schemas.
 */

import type { LocationId, PageType, ServiceId } from '../data/entities';

export interface ErpCustomer {
  customerId: string;
  fullName: string;
  email: string;
  phoneE164: string;
  primaryLocationId: LocationId;
  zipCode: string;
  propertyProfile: {
    approximateSizeLabel: string;
    hasPets: boolean;
    ecoFriendlyPreferred: boolean;
    accessInstructions?: string;
  };
  createdAtIso: string;
}

export interface ErpLead {
  leadId: string;
  referenceCode: string;
  customerId?: string;
  fullName: string;
  phone: string;
  email: string;
  requestedServiceId?: ServiceId;
  requestedServiceLabel: string;
  locationOrZip: string;
  homeSize?: string;
  preferredFrequency?: string;
  preferredDate?: string;
  details: string;
  promoCode?: string;
  smsConsent: boolean;
  attribution: {
    landingPagePath: string;
    submissionPagePath: string;
    pageType: PageType;
    utmSource?: string;
    utmMedium?: string;
    utmCampaign?: string;
    referrer?: string;
  };
  crmSyncStatus: 'synced_ghl' | 'queued' | 'local_logged';
  createdAtIso: string;
}

export interface ErpServiceAvailability {
  serviceId: ServiceId;
  locationId: LocationId;
  isAvailable: boolean;
  supportedZipCodes: string[];
  weekdayWindow: string;
  saturdayByAppointment: boolean;
}

export interface ErpQuote {
  quoteId: string;
  leadId: string;
  customerId: string;
  serviceId: ServiceId;
  locationId: LocationId;
  status: 'draft' | 'sent' | 'accepted' | 'expired';
  customChecklistNotes: string[];
  discountCodeApplied?: string;
  issuedAtIso: string;
}

export interface ErpAppointment {
  appointmentId: string;
  quoteId: string;
  customerId: string;
  serviceId: ServiceId;
  locationId: LocationId;
  scheduledStartIso: string;
  scheduledWindowLabel: string;
  recurrenceRule?: 'weekly' | 'biweekly' | 'monthly' | 'one_time';
  assignedTeamIds: string[];
  status: 'scheduled' | 'in_progress' | 'completed' | 'rescheduled' | 'cancelled';
}

export interface ErpEmployee {
  employeeId: string;
  displayName: string;
  role: 'specialist' | 'team_lead' | 'quality_inspector' | 'office_coordinator';
  backgroundCheckVerified: boolean;
  insuredAndBondedCovered: boolean;
  activeLocationIds: LocationId[];
}

export interface ErpCleaningJob {
  jobId: string;
  appointmentId: string;
  checklistPointCount: 37 | 47 | 56;
  completedRooms: string[];
  happinessGuaranteeWindowEndsIso: string;
  qualityCheckPassed: boolean;
}

export interface ErpPaymentSummary {
  paymentId: string;
  appointmentId: string;
  customerId: string;
  status: 'pending_completion' | 'authorized' | 'captured' | 'refunded';
  receiptIssuedAtIso?: string;
}

export interface ErpCommunicationLog {
  communicationId: string;
  customerId?: string;
  leadId?: string;
  channel: 'sms' | 'email' | 'phone';
  direction: 'inbound' | 'outbound';
  templateKey: string;
  sentAtIso: string;
}

export interface SeoOrganicAttributionSession {
  firstLandingPath: string;
  firstLandingPageType: PageType;
  enteredAtIso: string;
  utmSource?: string;
  utmMedium?: string;
  utmCampaign?: string;
  referrer?: string;
}
