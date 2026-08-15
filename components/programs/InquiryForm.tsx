"use client";

import { useState } from "react";

/**
 * InquiryForm — Honest Demo Mode
 *
 * Collects minimal contact info for program inquiries. Does NOT persist data
 * anywhere. On submit, shows an honest demo-mode notice.
 *
 * TODO (post-approval): Deliver inquiries to a masjid-controlled email address.
 * This component should never store data in any database or third-party service
 * without explicit masjid approval.
 */

interface InquiryFormProps {
  programTitle: string;
  /** If true, shows the "I am interested in" selector for dawah inquiries */
  showInterestSelect?: boolean;
}

export default function InquiryForm({
  programTitle,
  showInterestSelect = false,
}: InquiryFormProps) {
  const [name, setName] = useState("");
  const [contact, setContact] = useState("");
  const [message, setMessage] = useState("");
  const [interest, setInterest] = useState("");
  const [showDemo, setShowDemo] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validate = () => {
    const errs: Record<string, string> = {};
    if (!name.trim()) errs.name = "Please enter your name.";
    if (!contact.trim()) errs.contact = "Please enter a phone number or email.";
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setShowDemo(false);
    if (!validate()) return;
    // No data persistence — show demo-mode notice
    setShowDemo(true);
  };

  return (
    <form onSubmit={handleSubmit} noValidate className="space-y-4">
      {/* Name */}
      <div>
        <label
          htmlFor={`inquiry-name-${programTitle}`}
          className="block text-sm font-medium text-emerald-deep mb-1"
        >
          Name
        </label>
        <input
          id={`inquiry-name-${programTitle}`}
          type="text"
          autoComplete="name"
          value={name}
          onChange={(e) => { setName(e.target.value); setErrors(p => ({ ...p, name: '' })); setShowDemo(false); }}
          placeholder="Your name"
          className={`w-full px-4 py-3 rounded-xl bg-white border-2 text-emerald-deep text-base placeholder:text-charcoal-muted/30 focus:outline-none focus:ring-2 focus:ring-gold/30 focus:border-emerald-deep transition-all duration-200 ${
            errors.name ? 'border-red-400' : 'border-emerald-deep/15'
          }`}
        />
        {errors.name && <p className="mt-1 text-xs text-red-500">{errors.name}</p>}
      </div>

      {/* Phone or Email */}
      <div>
        <label
          htmlFor={`inquiry-contact-${programTitle}`}
          className="block text-sm font-medium text-emerald-deep mb-1"
        >
          Phone or Email
        </label>
        <input
          id={`inquiry-contact-${programTitle}`}
          type="text"
          autoComplete="email"
          value={contact}
          onChange={(e) => { setContact(e.target.value); setErrors(p => ({ ...p, contact: '' })); setShowDemo(false); }}
          placeholder="Phone number or email address"
          className={`w-full px-4 py-3 rounded-xl bg-white border-2 text-emerald-deep text-base placeholder:text-charcoal-muted/30 focus:outline-none focus:ring-2 focus:ring-gold/30 focus:border-emerald-deep transition-all duration-200 ${
            errors.contact ? 'border-red-400' : 'border-emerald-deep/15'
          }`}
        />
        {errors.contact && <p className="mt-1 text-xs text-red-500">{errors.contact}</p>}
      </div>

      {/* Interest selector (dawah only) */}
      {showInterestSelect && (
        <div>
          <label
            htmlFor={`inquiry-interest-${programTitle}`}
            className="block text-sm font-medium text-emerald-deep mb-1"
          >
            I am interested in <span className="text-charcoal-muted/70 font-normal">(optional)</span>
          </label>
          <select
            id={`inquiry-interest-${programTitle}`}
            value={interest}
            onChange={(e) => { setInterest(e.target.value); setShowDemo(false); }}
            className="w-full px-4 py-3 rounded-xl bg-white border-2 border-emerald-deep/15 text-emerald-deep text-base focus:outline-none focus:ring-2 focus:ring-gold/30 focus:border-emerald-deep transition-all duration-200 appearance-none"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%231B3D2F' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='M6 8l4 4 4-4'/%3e%3c/svg%3e")`,
              backgroundPosition: 'right 0.75rem center',
              backgroundRepeat: 'no-repeat',
              backgroundSize: '1.25em 1.25em',
            }}
          >
            <option value="">Select...</option>
            <option value="learning">Learning about Islam</option>
            <option value="shahada">Taking shahada</option>
            <option value="other">Other</option>
          </select>
        </div>
      )}

      {/* Optional message */}
      <div>
        <label
          htmlFor={`inquiry-message-${programTitle}`}
          className="block text-sm font-medium text-emerald-deep mb-1"
        >
          Message <span className="text-charcoal-muted/70 font-normal">(optional)</span>
        </label>
        <textarea
          id={`inquiry-message-${programTitle}`}
          value={message}
          onChange={(e) => { setMessage(e.target.value); setShowDemo(false); }}
          placeholder="Anything you'd like us to know"
          rows={3}
          className="w-full px-4 py-3 rounded-xl bg-white border-2 border-emerald-deep/15 text-emerald-deep text-base placeholder:text-charcoal-muted/30 focus:outline-none focus:ring-2 focus:ring-gold/30 focus:border-emerald-deep transition-all duration-200 resize-none"
        />
      </div>

      {/* Privacy line */}
      <p className="text-charcoal-muted/70 text-xs flex items-start gap-1.5">
        <svg className="w-3.5 h-3.5 text-gold shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
        </svg>
        Inquiries go directly to the masjid and are kept confidential.
      </p>

      {/* Submit */}
      <button
        type="submit"
        className="w-full py-3 rounded-xl bg-emerald-deep text-cream-light font-semibold text-sm hover:bg-emerald-deep/90 transition-colors duration-200 shadow-md shadow-emerald-deep/15"
      >
        Send Inquiry
      </button>

      {/* Demo-mode notice */}
      {showDemo && (
        <div className="p-4 rounded-xl bg-gold/10 border border-gold/25 text-center">
          <p className="text-emerald-deep text-sm font-semibold mb-1">
            Demo Mode
          </p>
          <p className="text-charcoal-muted text-sm leading-relaxed">
            Inquiries will be activated when the site goes live. For now, please
            call or text{" "}
            <a
              href="tel:3137698647"
              className="text-emerald-deep font-semibold hover:text-gold transition-colors duration-200"
            >
              313-769-8647
            </a>
            .
          </p>
        </div>
      )}
    </form>
  );
}
