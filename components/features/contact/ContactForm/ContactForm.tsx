"use client";

import { useState, type FormEvent } from "react";

interface ContactFormProps {
  className?: string;
}

type SubmitStatus = "idle" | "submitting" | "success" | "error";

const FORMSPREE_ENDPOINT = process.env.NEXT_PUBLIC_FORMSPREE_ENDPOINT;
const IS_DEV = process.env.NODE_ENV === "development";

const INPUT_CLASS =
  "w-full rounded-md border border-[var(--color-border)] bg-white px-4 py-3 text-base text-[var(--color-text-primary)] placeholder:text-[var(--color-text-secondary)] transition-colors duration-150 focus:border-[var(--color-text-primary)] focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-text-primary)] focus-visible:ring-offset-2";

const LABEL_CLASS =
  "mb-2 block text-xs font-medium uppercase tracking-[0.18em] text-[var(--color-text-secondary)]";

/**
 * Brand-aligned contact form. POSTs to Formspree via native fetch with
 * HTML5-native validation. Renders one of four states (idle, submitting,
 * success, error) per design skill §6.9.
 */
export default function ContactForm({ className }: ContactFormProps) {
  const [status, setStatus] = useState<SubmitStatus>("idle");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const endpointMissing = !FORMSPREE_ENDPOINT;

  async function handleSubmit(event: FormEvent<HTMLFormElement>): Promise<void> {
    event.preventDefault();

    if (!FORMSPREE_ENDPOINT) {
      setStatus("error");
      setErrorMessage(
        "Contact form endpoint is not configured. Please email me directly.",
      );
      return;
    }

    const form = event.currentTarget;
    const formData = new FormData(form);

    setStatus("submitting");
    setErrorMessage(null);

    try {
      const response = await fetch(FORMSPREE_ENDPOINT, {
        method: "POST",
        headers: { Accept: "application/json" },
        body: formData,
      });

      if (response.ok) {
        setStatus("success");
        form.reset();
        return;
      }

      let detail = "Something went wrong. Please try again or email me directly.";
      try {
        const data: unknown = await response.json();
        if (
          data &&
          typeof data === "object" &&
          "errors" in data &&
          Array.isArray((data as { errors: unknown }).errors)
        ) {
          const errs = (data as { errors: { message?: string }[] }).errors;
          const first = errs.find((e) => typeof e?.message === "string");
          if (first?.message) detail = first.message;
        }
      } catch {
        /* swallow — keep default detail */
      }
      setStatus("error");
      setErrorMessage(detail);
    } catch {
      setStatus("error");
      setErrorMessage(
        "Network error — please try again or email me directly.",
      );
    }
  }

  if (status === "success") {
    return (
      <div
        className={`rounded-md border border-[var(--color-border)] bg-[var(--color-bg-soft)] p-8 text-center ${className ?? ""}`}
        role="status"
        aria-live="polite"
      >
        <p className="text-xs font-medium uppercase tracking-[0.3em] text-[var(--color-accent-blue)]">
          Message sent
        </p>
        <h2 className="mt-4 text-2xl font-semibold tracking-tight text-[var(--color-text-primary)]">
          Thanks for reaching out.
        </h2>
        <p className="mt-3 text-base text-[var(--color-text-secondary)]">
          I will reply within 1-2 business days.
        </p>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      noValidate={false}
      className={`flex flex-col gap-6 ${className ?? ""}`}
      aria-label="Contact form"
    >
      {endpointMissing && IS_DEV ? (
        <p
          role="alert"
          className="rounded-md border border-[var(--color-accent-crimson)] bg-white p-3 text-sm text-[var(--color-accent-crimson)]"
        >
          Dev notice: <code>NEXT_PUBLIC_FORMSPREE_ENDPOINT</code> is not set.
          Form submissions will fail until it is configured.
        </p>
      ) : null}

      <div className="grid gap-6 md:grid-cols-2">
        <div>
          <label htmlFor="contact-name" className={LABEL_CLASS}>
            Name
          </label>
          <input
            id="contact-name"
            name="name"
            type="text"
            required
            autoComplete="name"
            placeholder="Your name"
            className={INPUT_CLASS}
            disabled={status === "submitting"}
          />
        </div>
        <div>
          <label htmlFor="contact-email" className={LABEL_CLASS}>
            Email
          </label>
          <input
            id="contact-email"
            name="email"
            type="email"
            required
            autoComplete="email"
            placeholder="you@example.com"
            className={INPUT_CLASS}
            disabled={status === "submitting"}
          />
        </div>
      </div>

      <div>
        <label htmlFor="contact-subject" className={LABEL_CLASS}>
          Subject
        </label>
        <input
          id="contact-subject"
          name="subject"
          type="text"
          required
          placeholder="What is this about?"
          className={INPUT_CLASS}
          disabled={status === "submitting"}
        />
      </div>

      <div>
        <label htmlFor="contact-message" className={LABEL_CLASS}>
          Message
        </label>
        <textarea
          id="contact-message"
          name="message"
          required
          rows={6}
          placeholder="Tell me a bit about your project, role, or question."
          className={`${INPUT_CLASS} resize-y`}
          disabled={status === "submitting"}
        />
      </div>

      {status === "error" && errorMessage ? (
        <p
          role="alert"
          className="rounded-md border border-[var(--color-accent-crimson)] bg-white p-3 text-sm text-[var(--color-accent-crimson)]"
        >
          {errorMessage}
        </p>
      ) : null}

      <button
        type="submit"
        disabled={status === "submitting"}
        className="inline-flex w-full items-center justify-center gap-2 rounded-md bg-[var(--color-text-primary)] px-6 py-4 text-sm font-semibold uppercase tracking-[0.18em] text-white transition-opacity duration-150 hover:opacity-90 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-text-primary)] disabled:cursor-not-allowed disabled:opacity-60"
      >
        {status === "submitting" ? (
          <>
            <span
              aria-hidden="true"
              className="inline-block h-4 w-4 animate-spin rounded-full border-2 border-white/40 border-t-white"
            />
            <span>Sending</span>
          </>
        ) : (
          <span>Submit</span>
        )}
      </button>
    </form>
  );
}
