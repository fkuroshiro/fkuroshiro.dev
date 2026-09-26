// components/GoogleTagManagerGate.tsx
"use client";

import { useState } from "react";
import { ChevronDown, Check, X } from "lucide-react";
import { GoogleTagManager } from "@next/third-parties/google";
import { Wrapper } from "../Wrapper";
import { setStoredConsent, type ConsentState } from "@/lib/consent";
import { useTranslations } from "next-intl";

export function GoogleTagManagerGate({
  initialConsent,
}: {
  initialConsent: ConsentState;
}) {
  const t = useTranslations("CookieConsent");
  const [consent, setConsent] = useState<ConsentState>(initialConsent);
  const [leaving, setLeaving] = useState(false);
  const [analyticsEnabled, setAnalyticsEnabled] = useState(true);
  const [expandedNecessary, setExpandedNecessary] = useState(false);
  const [expandedAnalytics, setExpandedAnalytics] = useState(false);

  function handleSave() {
    setLeaving(true);
    setTimeout(() => {
      const value = analyticsEnabled ? "granted" : "denied";
      setStoredConsent(value);
      setConsent(value);
    }, 300);
  }

  function handleAcceptAll() {
    setAnalyticsEnabled(true);
    setLeaving(true);
    setTimeout(() => {
      setStoredConsent("granted");
      setConsent("granted");
    }, 300);
  }

  return (
    <>
      {consent === null && (
        <div
          className={`fixed inset-x-0 bottom-0 z-50 flex justify-center px-2 pb-2 transition-all duration-300 ease-in-out lg:px-4 lg:pb-4 drop-shadow-2xl drop-shadow-accent ${
            leaving ? "translate-y-4 opacity-0" : "translate-y-0 opacity-100"
          }`}
          style={{
            paddingBottom: "max(0.5rem, env(safe-area-inset-bottom, 0px))",
          }}
        >
          <Wrapper className="bg-background border-2 border-border w-full max-w-2xl rounded-xl lg:rounded-2xl">
            <div className="max-h-[85vh] overflow-y-auto py-3 lg:py-4">
              <h2 className="text-base font-bold lg:text-lg">{t("title")}</h2>
              <p className="mt-1 text-xs text-neutral-400 lg:text-sm">
                {t("description")}
              </p>

              <div className="mt-3 space-y-2 lg:mt-4 lg:space-y-3">
                {/* Necessary — locked on */}
                <div className="border-border overflow-hidden rounded-lg border lg:rounded-xl">
                  <button
                    onClick={() => setExpandedNecessary((v) => !v)}
                    className="flex w-full items-center justify-between gap-2 px-3 py-2.5 text-left cursor-pointer lg:px-4 lg:py-3"
                  >
                    <span className="flex min-w-0 items-center gap-2 text-sm font-semibold lg:text-base">
                      <ChevronDown
                        size={16}
                        className={`shrink-0 transition-transform ${expandedNecessary ? "rotate-180" : ""}`}
                      />
                      <span className="truncate">{t("necessary.title")}</span>
                    </span>
                    <span className="flex h-6 w-11 shrink-0 items-center rounded-full bg-neutral-600 px-1">
                      <span className="flex h-4 w-4 translate-x-5 items-center justify-center rounded-full bg-white">
                        <Check size={10} className="text-neutral-800" />
                      </span>
                    </span>
                  </button>
                  {expandedNecessary && (
                    <p className="px-3 pb-3 text-xs text-neutral-400 lg:px-4 lg:text-sm">
                      {t("necessary.description")}
                    </p>
                  )}
                </div>

                {/* Analytics — toggleable */}
                <div className="border-border overflow-hidden rounded-lg border lg:rounded-xl">
                  <button
                    onClick={() => setExpandedAnalytics((v) => !v)}
                    className="flex w-full items-center justify-between gap-2 px-3 py-2.5 text-left cursor-pointer lg:px-4 lg:py-3"
                  >
                    <span className="flex min-w-0 items-center gap-2 text-sm font-semibold lg:text-base">
                      <ChevronDown
                        size={16}
                        className={`shrink-0 transition-transform ${expandedAnalytics ? "rotate-180" : ""}`}
                      />
                      <span className="truncate">{t("analytics.title")}</span>
                    </span>
                    <span
                      role="switch"
                      aria-checked={analyticsEnabled}
                      tabIndex={0}
                      onClick={(e) => {
                        e.stopPropagation();
                        setAnalyticsEnabled((v) => !v);
                      }}
                      onKeyDown={(e) => {
                        if (e.key === "Enter" || e.key === " ") {
                          e.preventDefault();
                          setAnalyticsEnabled((v) => !v);
                        }
                      }}
                      className={`flex h-6 w-11 shrink-0 cursor-pointer items-center rounded-full px-1 transition-colors ${
                        analyticsEnabled ? "bg-accent" : "bg-neutral-600"
                      }`}
                    >
                      <span
                        className={`flex h-4 w-4 items-center justify-center rounded-full bg-white transition-transform ${
                          analyticsEnabled ? "translate-x-5" : "translate-x-0"
                        }`}
                      >
                        {analyticsEnabled ? (
                          <Check size={10} className="text-neutral-800" />
                        ) : (
                          <X size={10} className="text-neutral-800" />
                        )}
                      </span>
                    </span>
                  </button>
                  {expandedAnalytics && (
                    <p className="px-3 pb-3 text-xs text-neutral-400 lg:px-4 lg:text-sm">
                      {t("analytics.description")}
                    </p>
                  )}
                </div>
              </div>

              <div className="mt-3 flex flex-col-reverse gap-2 lg:mt-4 lg:flex-row lg:justify-end lg:gap-3">
                <button
                  onClick={handleSave}
                  className="cursor-pointer rounded-md border-2 border-border px-4 py-2.5 text-sm duration-300 hover:bg-border lg:py-2"
                >
                  {t("save")}
                </button>
                <button
                  onClick={handleAcceptAll}
                  className="cursor-pointer rounded-md bg-accent px-4 py-2.5 text-sm duration-300 hover:drop-shadow-lg hover:drop-shadow-accent/50 lg:py-2"
                >
                  {t("acceptAll")}
                </button>
              </div>
            </div>
          </Wrapper>
        </div>
      )}
      {consent === "granted" && (
        <GoogleTagManager gtmId={process.env.NEXT_PUBLIC_GTM_ID!} />
      )}
    </>
  );
}
