"use client";
export type ConsentState = "granted" | "denied" | null;

const CONSENT_KEY = "gtm-consent";

export function setStoredConsent(value: "granted" | "denied") {
  document.cookie = `${CONSENT_KEY}=${value}; path=/; max-age=31536000; SameSite=Lax`;
}
