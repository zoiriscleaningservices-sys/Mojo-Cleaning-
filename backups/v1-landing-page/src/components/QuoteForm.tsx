import React, { useEffect, useMemo, useState } from 'react';
import { BUSINESS_INFO, SERVICES, type ServiceItem } from '../config/business';
import type { ActivePageView } from '../config/routes';
import {
  ArrowRightIcon,
  CheckCircleIcon,
  ClockCheckIcon,
  MailIcon,
  MojoSparkle,
  PhoneIcon,
  ShieldCheckIcon,
} from './Icons';

interface QuoteFormProps {
  selectedServiceId: ServiceItem['id'];
  onSelectServiceId: (id: ServiceItem['id']) => void;
  onOpenLegalView: (view: ActivePageView) => void;
}

interface FormValues {
  fullName: string;
  phone: string;
  email: string;
  service: string;
  homeSize: string;
  frequency: string;
  zipCode: string;
  preferredDate: string;
  details: string;
  smsConsent: boolean;
  companyWebsite: string; // Honeypot
}

interface FormErrors {
  fullName?: string;
  phone?: string;
  email?: string;
  service?: string;
  details?: string;
}

interface SubmissionSuccess {
  referenceId: string;
  receivedAt: string;
  message: string;
  leadSummary: {
    fullName: string;
    phone: string;
    email: string;
    service: string;
    homeSize: string;
    frequency: string;
    zipCode: string;
  };
}

export const QuoteForm: React.FC<QuoteFormProps> = ({
  selectedServiceId,
  onSelectServiceId,
  onOpenLegalView,
}) => {
  const selectedServiceObj = useMemo(
    () => SERVICES.find((s) => s.id === selectedServiceId) || SERVICES[0],
    [selectedServiceId]
  );

  const [formMode, setFormMode] = useState<'native' | 'ghl'>('native');
  const [values, setValues] = useState<FormValues>({
    fullName: '',
    phone: '',
    email: '',
    service: selectedServiceObj.name,
    homeSize: '',
    frequency: 'Bi-Weekly (Most Popular)',
    zipCode: '',
    preferredDate: '',
    details: '',
    smsConsent: false,
    companyWebsite: '',
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [touched, setTouched] = useState<Record<string, boolean>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [submitSuccess, setSubmitSuccess] = useState<SubmissionSuccess | null>(null);

  // Sync service dropdown when user clicks a Service Card CTA
  useEffect(() => {
    const matched = SERVICES.find((s) => s.id === selectedServiceId);
    if (matched) {
      setValues((prev) => ({
        ...prev,
        service: matched.name,
        frequency:
          matched.id === 'recurring'
            ? prev.frequency || 'Bi-Weekly (Most Popular)'
            : 'One-Time Service',
      }));
      setErrors((prev) => ({ ...prev, service: undefined }));
    }
  }, [selectedServiceId]);

  const validate = (draft: FormValues): FormErrors => {
    const next: FormErrors = {};
    if (!draft.fullName.trim() || draft.fullName.trim().length < 2) {
      next.fullName = 'Please enter your full name (at least 2 characters).';
    }

    const phoneDigits = draft.phone.replace(/\D/g, '');
    if (!phoneDigits || phoneDigits.length < 10 || phoneDigits.length > 15) {
      next.phone = 'Please enter a valid 10-digit telephone number (e.g., 256-418-8199).';
    }

    const emailTrimmed = draft.email.trim();
    if (!emailTrimmed || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailTrimmed)) {
      next.email = 'Please enter a valid email address (e.g., name@example.com).';
    }

    if (!draft.service.trim()) {
      next.service = 'Please select the cleaning service you are requesting.';
    }

    if (!draft.details.trim() || draft.details.trim().length < 5) {
      next.details =
        'Please share a brief note about your home (e.g., bedrooms/baths, pets, or focus areas).';
    }

    return next;
  };

  const handleFieldChange = (
    field: keyof FormValues,
    value: string | boolean
  ) => {
    const updated = { ...values, [field]: value };
    setValues(updated);
    if (submitError) setSubmitError(null);

    if (field === 'service' && typeof value === 'string') {
      const matched = SERVICES.find((s) => s.name === value);
      if (matched) {
        onSelectServiceId(matched.id);
      }
    }

    if (touched[field]) {
      const nextErrors = validate(updated);
      setErrors((prev) => ({
        ...prev,
        [field]: nextErrors[field as keyof FormErrors],
      }));
    }
  };

  const handleBlur = (field: keyof FormErrors) => {
    setTouched((prev) => ({ ...prev, [field]: true }));
    const nextErrors = validate(values);
    setErrors((prev) => ({ ...prev, [field]: nextErrors[field] }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (isSubmitting) return;

    const validationErrors = validate(values);
    setErrors(validationErrors);
    setTouched({
      fullName: true,
      phone: true,
      email: true,
      service: true,
      details: true,
    });

    if (Object.keys(validationErrors).length > 0) {
      return;
    }

    setIsSubmitting(true);
    setSubmitError(null);

    try {
      const response = await fetch('/api/quote', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(values),
      });

      const data = await response.json();

      if (!response.ok || !data?.ok) {
        throw new Error(
          data?.error ||
            'Our quote server could not confirm receipt right now. Your entered details have been saved below.'
        );
      }

      setSubmitSuccess({
        referenceId: data.referenceId || 'MOJO-REQ',
        receivedAt: data.receivedAt || new Date().toISOString(),
        message:
          data.message ||
          'Thanks for reaching out to Mojo Cleaning. Your quote request has been received. Our team will follow up using the contact information you provided.',
        leadSummary: {
          fullName: values.fullName,
          phone: values.phone,
          email: values.email,
          service: values.service,
          homeSize: values.homeSize || 'Not specified',
          frequency: values.frequency || 'Not specified',
          zipCode: values.zipCode || 'Huntsville / Madison area',
        },
      });
    } catch (err) {
      const message =
        err instanceof Error
          ? err.message
          : 'Unable to reach the quote endpoint right now. Your information is preserved—please use the Direct CRM tab or contact us directly below.';
      setSubmitError(message);
    } finally {
      setIsSubmitting(false);
    }
  };

  // Construct pre-populated GoHighLevel widget URL so service & contact fields sync seamlessly
  const ghlPrefilledUrl = useMemo(() => {
    const params = new URLSearchParams();
    const matchedService =
      SERVICES.find((s) => s.name === values.service) || selectedServiceObj;
    params.set('type_of_cleaning_(meta)', matchedService.ghlOptionValue);
    if (values.fullName.trim()) {
      const parts = values.fullName.trim().split(/\s+/);
      params.set('name', parts[0] || '');
      if (parts.length > 1) {
        params.set('last_name', parts.slice(1).join(' '));
      }
    }
    if (values.phone.trim()) params.set('phone', values.phone.trim());
    if (values.email.trim()) params.set('email', values.email.trim());
    return `${BUSINESS_INFO.ghlIntegration.widgetUrl}?${params.toString()}`;
  }, [values.service, values.fullName, values.phone, values.email, selectedServiceObj]);

  const fallbackMailtoHref = useMemo(() => {
    const subject = encodeURIComponent(
      `Mojo Cleaning Quote Request — ${values.service} (${values.fullName || 'New Inquiry'})`
    );
    const body = encodeURIComponent(
      `Name: ${values.fullName}\nPhone: ${values.phone}\nEmail: ${values.email}\nRequested Service: ${values.service}\nHome Size: ${values.homeSize || 'Not specified'}\nPreferred Frequency: ${values.frequency || 'Not specified'}\nZIP Code: ${values.zipCode || 'Not specified'}\nPreferred Date: ${values.preferredDate || 'Flexible'}\n\nProperty & Cleaning Details:\n${values.details}`
    );
    return `mailto:${BUSINESS_INFO.email}?subject=${subject}&body=${body}`;
  }, [values]);

  return (
    <section id="quote" className="quote-section" aria-labelledby="quote-heading">
      <div className="quote-glow quote-glow-left" aria-hidden="true" />
      <div className="quote-glow quote-glow-right" aria-hidden="true" />

      <div className="container">
        <div className="quote-grid">
          {/* Left Column: Reassurance, Promo Offer & Direct Contact */}
          <div className="quote-info-col">
            <div className="quote-eyebrow">
              <MojoSparkle className="text-coral" size={14} />
              <span>Request Your Custom Quote</span>
            </div>

            <h2 id="quote-heading" className="quote-title">
              Ready for a home that feels like a deep breath?
            </h2>

            <p className="quote-lead">
              Tell us a little about your home and the type of clean you are looking for. Our
              Huntsville team reviews every request and follows up promptly with a transparent,
              customized quote.
            </p>

            {/* Verified First Clean Offer Box */}
            <div className="quote-promo-card">
              <div className="quote-promo-header">
                <MojoSparkle className="text-coral" size={18} />
                <span>First-Visit Welcome Offer</span>
              </div>
              <strong className="quote-promo-headline">
                {BUSINESS_INFO.firstCleanPromo.headline}
              </strong>
              <p className="quote-promo-desc">
                {BUSINESS_INFO.firstCleanPromo.description}
              </p>
              <button
                type="button"
                className="quote-promo-apply-btn"
                onClick={() => {
                  const promoNote = 'Promo code: MOJO50 ($50 OFF First Clean). ';
                  if (!values.details.includes('MOJO50')) {
                    handleFieldChange('details', `${promoNote}${values.details}`.trim());
                  }
                }}
              >
                <span>+ Click to add code MOJO50 to your request</span>
              </button>
            </div>

            {/* Direct Contact Channels */}
            <div className="quote-direct-channels">
              <h3 className="quote-direct-heading">Prefer to reach out directly?</h3>

              <a href={BUSINESS_INFO.phoneHref} className="quote-channel-item">
                <span className="quote-channel-icon">
                  <PhoneIcon size={18} />
                </span>
                <div>
                  <strong>Call or Text {BUSINESS_INFO.phoneDisplay}</strong>
                  <span>{BUSINESS_INFO.officeHours.weekdays}</span>
                </div>
              </a>

              <a href={BUSINESS_INFO.emailHref} className="quote-channel-item">
                <span className="quote-channel-icon">
                  <MailIcon size={18} />
                </span>
                <div>
                  <strong>{BUSINESS_INFO.email}</strong>
                  <span>Prompt responses from our Huntsville office</span>
                </div>
              </a>
            </div>

            <ul className="quote-reassurance-list">
              <li>
                <ShieldCheckIcon size={17} className="text-coral" />
                <span>100% Insured, bonded &amp; background-checked team</span>
              </li>
              <li>
                <ClockCheckIcon size={17} className="text-coral" />
                <span>Backed by our 48-Hour Happiness Guarantee</span>
              </li>
              <li>
                <CheckCircleIcon size={17} className="text-coral" />
                <span>No obligation—appointment is booked only after you confirm</span>
              </li>
            </ul>
          </div>

          {/* Right Column: Interactive Quote Form Card */}
          <div className="quote-form-col">
            <div className="quote-card">
              <div className="quote-card-header">
                <div>
                  <span className="quote-card-kicker">Huntsville &amp; Madison County, AL</span>
                  <h3 className="quote-card-title">Custom Cleaning Quote Request</h3>
                </div>

                <div
                  className="quote-mode-switcher"
                  role="tablist"
                  aria-label="Choose quote form view"
                >
                  <button
                    type="button"
                    role="tab"
                    aria-selected={formMode === 'native'}
                    className={`quote-mode-btn ${formMode === 'native' ? 'is-active' : ''}`}
                    onClick={() => setFormMode('native')}
                  >
                    Detailed Form
                  </button>
                  <button
                    type="button"
                    role="tab"
                    aria-selected={formMode === 'ghl'}
                    className={`quote-mode-btn ${formMode === 'ghl' ? 'is-active' : ''}`}
                    onClick={() => setFormMode('ghl')}
                  >
                    Quick CRM Widget
                  </button>
                </div>
              </div>

              {formMode === 'ghl' ? (
                <div className="ghl-embed-container">
                  <p className="ghl-embed-intro">
                    Submitting directly via Mojo Cleaning’s LeadConnector CRM form (pre-selected for{' '}
                    <strong>{values.service}</strong>):
                  </p>
                  <iframe
                    src={ghlPrefilledUrl}
                    title={BUSINESS_INFO.ghlIntegration.formName}
                    className="ghl-iframe"
                    id={`inline-${BUSINESS_INFO.ghlIntegration.formId}`}
                  />
                </div>
              ) : submitSuccess ? (
                <div
                  className="quote-success-panel"
                  role="status"
                  aria-live="polite"
                >
                  <div className="quote-success-badge">
                    <CheckCircleIcon size={28} />
                  </div>
                  <span className="quote-success-ref">
                    Confirmation Reference: {submitSuccess.referenceId}
                  </span>
                  <h4 className="quote-success-title">
                    Your Quote Request Has Been Received
                  </h4>
                  <p className="quote-success-message">{submitSuccess.message}</p>

                  <dl className="quote-summary-box">
                    <div>
                      <dt>Name</dt>
                      <dd>{submitSuccess.leadSummary.fullName}</dd>
                    </div>
                    <div>
                      <dt>Contact</dt>
                      <dd>
                        {submitSuccess.leadSummary.phone} • {submitSuccess.leadSummary.email}
                      </dd>
                    </div>
                    <div>
                      <dt>Requested Service</dt>
                      <dd>{submitSuccess.leadSummary.service}</dd>
                    </div>
                    <div>
                      <dt>Home Size &amp; Schedule</dt>
                      <dd>
                        {submitSuccess.leadSummary.homeSize} •{' '}
                        {submitSuccess.leadSummary.frequency}
                      </dd>
                    </div>
                  </dl>

                  <div className="quote-success-actions">
                    <button
                      type="button"
                      className="btn btn-outline-dark"
                      onClick={() => setSubmitSuccess(null)}
                    >
                      Submit Another Request
                    </button>
                    <a href={BUSINESS_INFO.phoneHref} className="btn btn-primary">
                      <PhoneIcon size={15} />
                      <span>Call {BUSINESS_INFO.phoneDisplay}</span>
                    </a>
                  </div>
                </div>
              ) : (
                <form
                  className="quote-native-form"
                  onSubmit={handleSubmit}
                  noValidate
                >
                  {/* Honeypot field for spam protection */}
                  <div className="sr-honeypot" aria-hidden="true">
                    <label htmlFor="companyWebsite">Company Website (leave blank)</label>
                    <input
                      id="companyWebsite"
                      name="companyWebsite"
                      type="text"
                      tabIndex={-1}
                      autoComplete="off"
                      value={values.companyWebsite}
                      onChange={(e) => handleFieldChange('companyWebsite', e.target.value)}
                    />
                  </div>

                  {/* Quick Service Selector Pills */}
                  <fieldset className="form-service-pills-fieldset">
                    <legend className="form-label">
                      Requested Cleaning Service <span className="required-star">*</span>
                    </legend>
                    <div className="form-service-pills">
                      {SERVICES.map((svc) => {
                        const isSelected = values.service === svc.name;
                        return (
                          <button
                            key={svc.id}
                            type="button"
                            className={`service-select-pill ${isSelected ? 'is-selected' : ''}`}
                            aria-pressed={isSelected}
                            onClick={() => {
                              onSelectServiceId(svc.id);
                              handleFieldChange('service', svc.name);
                            }}
                          >
                            <span className="pill-num">{svc.number}</span>
                            <span>{svc.shortName}</span>
                          </button>
                        );
                      })}
                    </div>
                    <input type="hidden" name="service" value={values.service} />
                    {errors.service ? (
                      <p id="err-service" className="field-error-msg" role="alert">
                        ⚠ {errors.service}
                      </p>
                    ) : null}
                  </fieldset>

                  <div className="form-row-2col">
                    <div className="form-field">
                      <label htmlFor="quote-fullName" className="form-label">
                        Full Name <span className="required-star">*</span>
                      </label>
                      <input
                        id="quote-fullName"
                        name="fullName"
                        type="text"
                        required
                        autoComplete="name"
                        placeholder="e.g., Sarah Mitchell"
                        className={`form-input ${errors.fullName ? 'has-error' : ''}`}
                        value={values.fullName}
                        onChange={(e) => handleFieldChange('fullName', e.target.value)}
                        onBlur={() => handleBlur('fullName')}
                        aria-invalid={Boolean(errors.fullName)}
                        aria-describedby={errors.fullName ? 'err-fullName' : undefined}
                      />
                      {errors.fullName ? (
                        <p id="err-fullName" className="field-error-msg" role="alert">
                          ⚠ {errors.fullName}
                        </p>
                      ) : null}
                    </div>

                    <div className="form-field">
                      <label htmlFor="quote-phone" className="form-label">
                        Phone Number <span className="required-star">*</span>
                      </label>
                      <input
                        id="quote-phone"
                        name="phone"
                        type="tel"
                        required
                        autoComplete="tel"
                        placeholder="(256) 555-0199"
                        className={`form-input ${errors.phone ? 'has-error' : ''}`}
                        value={values.phone}
                        onChange={(e) => handleFieldChange('phone', e.target.value)}
                        onBlur={() => handleBlur('phone')}
                        aria-invalid={Boolean(errors.phone)}
                        aria-describedby={errors.phone ? 'err-phone' : undefined}
                      />
                      {errors.phone ? (
                        <p id="err-phone" className="field-error-msg" role="alert">
                          ⚠ {errors.phone}
                        </p>
                      ) : null}
                    </div>
                  </div>

                  <div className="form-row-2col">
                    <div className="form-field">
                      <label htmlFor="quote-email" className="form-label">
                        Email Address <span className="required-star">*</span>
                      </label>
                      <input
                        id="quote-email"
                        name="email"
                        type="email"
                        required
                        autoComplete="email"
                        placeholder="you@example.com"
                        className={`form-input ${errors.email ? 'has-error' : ''}`}
                        value={values.email}
                        onChange={(e) => handleFieldChange('email', e.target.value)}
                        onBlur={() => handleBlur('email')}
                        aria-invalid={Boolean(errors.email)}
                        aria-describedby={errors.email ? 'err-email' : undefined}
                      />
                      {errors.email ? (
                        <p id="err-email" className="field-error-msg" role="alert">
                          ⚠ {errors.email}
                        </p>
                      ) : null}
                    </div>

                    <div className="form-field">
                      <label htmlFor="quote-zipCode" className="form-label">
                        ZIP Code or Community <span className="optional-tag">(Optional)</span>
                      </label>
                      <input
                        id="quote-zipCode"
                        name="zipCode"
                        type="text"
                        autoComplete="postal-code"
                        placeholder="e.g., 35801, Madison, Hampton Cove"
                        className="form-input"
                        value={values.zipCode}
                        onChange={(e) => handleFieldChange('zipCode', e.target.value)}
                      />
                    </div>
                  </div>

                  <div className="form-row-3col">
                    <div className="form-field">
                      <label htmlFor="quote-homeSize" className="form-label">
                        Approximate Home Size <span className="optional-tag">(Optional)</span>
                      </label>
                      <select
                        id="quote-homeSize"
                        name="homeSize"
                        className="form-select"
                        value={values.homeSize}
                        onChange={(e) => handleFieldChange('homeSize', e.target.value)}
                      >
                        <option value="">Select size...</option>
                        <option value="1–2 Bed / 1–2 Bath (< 1,500 sq ft)">
                          1–2 Bed / 1–2 Bath (&lt; 1,500 sq ft)
                        </option>
                        <option value="3 Bed / 2–2.5 Bath (1,500–2,400 sq ft)">
                          3 Bed / 2–2.5 Bath (1,500–2,400 sq ft)
                        </option>
                        <option value="4 Bed / 2.5–3.5 Bath (2,400–3,500 sq ft)">
                          4 Bed / 2.5–3.5 Bath (2,400–3,500 sq ft)
                        </option>
                        <option value="5+ Bed / Large Estate (3,500+ sq ft)">
                          5+ Bed / Large Estate (3,500+ sq ft)
                        </option>
                      </select>
                    </div>

                    <div className="form-field">
                      <label htmlFor="quote-frequency" className="form-label">
                        Preferred Frequency <span className="optional-tag">(Optional)</span>
                      </label>
                      <select
                        id="quote-frequency"
                        name="frequency"
                        className="form-select"
                        value={values.frequency}
                        onChange={(e) => handleFieldChange('frequency', e.target.value)}
                      >
                        <option value="Weekly">Weekly</option>
                        <option value="Bi-Weekly (Most Popular)">Bi-Weekly (Most Popular)</option>
                        <option value="Monthly">Monthly</option>
                        <option value="One-Time Service">One-Time Service</option>
                      </select>
                    </div>

                    <div className="form-field">
                      <label htmlFor="quote-preferredDate" className="form-label">
                        Ideal Target Date <span className="optional-tag">(Optional)</span>
                      </label>
                      <input
                        id="quote-preferredDate"
                        name="preferredDate"
                        type="date"
                        className="form-input"
                        value={values.preferredDate}
                        onChange={(e) => handleFieldChange('preferredDate', e.target.value)}
                      />
                    </div>
                  </div>

                  <div className="form-field">
                    <label htmlFor="quote-details" className="form-label">
                      Property or Cleaning Details <span className="required-star">*</span>
                    </label>
                    <textarea
                      id="quote-details"
                      name="details"
                      rows={3}
                      required
                      placeholder="Tell us about bedrooms/bathrooms, pets, eco-friendly product requests, add-ons (like inside oven/fridge), or mention code MOJO50..."
                      className={`form-textarea ${errors.details ? 'has-error' : ''}`}
                      value={values.details}
                      onChange={(e) => handleFieldChange('details', e.target.value)}
                      onBlur={() => handleBlur('details')}
                      aria-invalid={Boolean(errors.details)}
                      aria-describedby={errors.details ? 'err-details' : undefined}
                    />
                    {errors.details ? (
                      <p id="err-details" className="field-error-msg" role="alert">
                        ⚠ {errors.details}
                      </p>
                    ) : null}
                  </div>

                  {/* Optional explicit SMS consent checkbox — never pre-checked */}
                  <div className="form-consent-box">
                    <label className="form-checkbox-label">
                      <input
                        type="checkbox"
                        name="smsConsent"
                        checked={values.smsConsent}
                        onChange={(e) => handleFieldChange('smsConsent', e.target.checked)}
                        className="form-checkbox"
                      />
                      <span>
                        <strong>Optional SMS Updates:</strong> I agree to receive quote follow-ups
                        and appointment reminders via text message from {BUSINESS_INFO.legalName} at
                        the number provided. Message &amp; data rates may apply. Reply STOP to
                        unsubscribe or HELP for help. View our{' '}
                        <a
                          href="#privacy-policy"
                          onClick={(e) => {
                            e.preventDefault();
                            onOpenLegalView('privacy-policy');
                          }}
                        >
                          Privacy Policy
                        </a>{' '}
                        and{' '}
                        <a
                          href="#terms-and-conditions"
                          onClick={(e) => {
                            e.preventDefault();
                            onOpenLegalView('terms-and-conditions');
                          }}
                        >
                          Terms &amp; Conditions
                        </a>
                        .
                      </span>
                    </label>
                  </div>

                  {submitError ? (
                    <div className="quote-error-banner" role="alert">
                      <strong>We preserved your information:</strong> {submitError}
                      <div className="quote-error-fallback-links">
                        <button
                          type="button"
                          className="btn btn-sm btn-outline-dark"
                          onClick={() => setFormMode('ghl')}
                        >
                          Open Pre-Filled CRM Widget
                        </button>
                        <a href={fallbackMailtoHref} className="btn btn-sm btn-outline-dark">
                          Send via Email App
                        </a>
                        <a href={BUSINESS_INFO.phoneHref} className="btn btn-sm btn-primary">
                          Call {BUSINESS_INFO.phoneDisplay}
                        </a>
                      </div>
                    </div>
                  ) : null}

                  <button
                    type="submit"
                    className="btn btn-primary btn-lg btn-full quote-submit-btn"
                    disabled={isSubmitting}
                  >
                    <span>
                      {isSubmitting ? 'Sending Your Quote Request...' : 'Request My Custom Quote'}
                    </span>
                    <ArrowRightIcon size={18} />
                  </button>

                  <p className="quote-privacy-footnote">
                    We respect your privacy and never sell or share your personal contact
                    information with third parties for marketing.
                  </p>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
