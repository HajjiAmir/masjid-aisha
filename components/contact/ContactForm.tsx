"use client";

import { useState, useCallback } from "react";

/**
 * ContactForm — Honest Demo Mode
 *
 * This form collects name, email, and message but has NO backend wired.
 * On submit it displays a demo-mode notice instead of faking a success.
 *
 * TODO (post-approval): Wire to a backend email service (e.g. SendGrid,
 * Resend, or a server action) once the site goes live. Replace the
 * demo-mode notice with actual send logic and a real confirmation.
 */
export default function ContactForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [showDemo, setShowDemo] = useState(false);
  const [errors, setErrors] = useState<{
    name?: string;
    email?: string;
    message?: string;
  }>({});

  const validate = useCallback(() => {
    const errs: typeof errors = {};
    if (!name.trim()) errs.name = "Please enter your name.";
    if (!email.trim()) {
      errs.email = "Please enter your email address.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      errs.email = "Please enter a valid email address.";
    }
    if (!message.trim()) errs.message = "Please enter a message.";
    return errs;
  }, [name, email, message]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setShowDemo(false);
    const errs = validate();
    setErrors(errs);
    if (Object.keys(errs).length === 0) {
      // No backend — show demo-mode notice
      setShowDemo(true);
    }
  };

  const inputBase =
    "w-full px-4 py-3 rounded-lg bg-white/90 border text-charcoal text-base placeholder:text-charcoal-muted/40 focus:outline-none focus:ring-2 focus:ring-gold/40 focus:border-gold transition-all duration-200";

  return (
    <form onSubmit={handleSubmit} noValidate className="space-y-5">
      {/* Name */}
      <div>
        <label
          htmlFor="contact-name"
          className="block text-sm font-medium text-emerald-deep mb-1.5"
        >
          Name
        </label>
        <input
          id="contact-name"
          type="text"
          autoComplete="name"
          value={name}
          onChange={(e) => {
            setName(e.target.value);
            if (errors.name) setErrors((p) => ({ ...p, name: undefined }));
          }}
          placeholder="Your name"
          className={`${inputBase} ${errors.name ? "border-red-400" : "border-emerald-deep/15"}`}
        />
        {errors.name && (
          <p className="mt-1 text-xs text-red-500">{errors.name}</p>
        )}
      </div>

      {/* Email */}
      <div>
        <label
          htmlFor="contact-email"
          className="block text-sm font-medium text-emerald-deep mb-1.5"
        >
          Email
        </label>
        <input
          id="contact-email"
          type="email"
          autoComplete="email"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
            if (errors.email) setErrors((p) => ({ ...p, email: undefined }));
          }}
          placeholder="your@email.com"
          className={`${inputBase} ${errors.email ? "border-red-400" : "border-emerald-deep/15"}`}
        />
        {errors.email && (
          <p className="mt-1 text-xs text-red-500">{errors.email}</p>
        )}
      </div>

      {/* Message */}
      <div>
        <label
          htmlFor="contact-message"
          className="block text-sm font-medium text-emerald-deep mb-1.5"
        >
          Message
        </label>
        <textarea
          id="contact-message"
          rows={5}
          value={message}
          onChange={(e) => {
            setMessage(e.target.value);
            if (errors.message)
              setErrors((p) => ({ ...p, message: undefined }));
          }}
          placeholder="How can we help you?"
          className={`${inputBase} resize-none ${errors.message ? "border-red-400" : "border-emerald-deep/15"}`}
        />
        {errors.message && (
          <p className="mt-1 text-xs text-red-500">{errors.message}</p>
        )}
      </div>

      {/* Submit */}
      <button
        type="submit"
        className="w-full py-3 rounded-lg bg-emerald-deep text-cream-light font-semibold text-sm hover:bg-emerald-deep/90 transition-colors duration-200 shadow-md shadow-emerald-deep/15"
      >
        Send Message
      </button>

      {/* Demo-mode notice — never a fake success */}
      {showDemo && (
        <div className="mt-4 p-4 rounded-xl bg-gold/10 border border-gold/25 text-center">
          <p className="text-emerald-deep text-sm font-medium mb-1">
            Demo mode
          </p>
          <p className="text-charcoal-muted text-sm leading-relaxed">
            Message sending will be activated when the site goes live. For now,
            please call or text{" "}
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
