import { createFileRoute } from "@tanstack/react-router";
import { TopBanner, SiteNav } from "@/components/site-nav";
import { FooterSection } from "@/components/landing/sections/FooterSection";

export const Route = createFileRoute("/privacy")({
  component: PrivacyPage,
  head: () => ({
    meta: [
      { title: "Privacy Policy — Khyra AI" },
      {
        name: "description",
        content:
          "Review the Khyra AI Privacy Policy for data collection, use, storage, AI processing, and your rights.",
      },
    ],
  }),
});

function PrivacyPage() {
  return (
    <main className="min-h-screen bg-background">
      <TopBanner />
      <SiteNav />
      <div className="mx-auto max-w-6xl px-6 py-20">
        <div className="overflow-hidden rounded-[2rem] border border-border bg-background/90 p-10 shadow-[0_40px_120px_-60px_rgba(31,74,63,0.35)]">
          <div className="mb-10 text-center">
            <p className="text-sm uppercase tracking-[0.35em] text-primary">Legal</p>
            <h1 className="mt-4 text-5xl font-display font-semibold tracking-tight text-foreground">
              Privacy Policy
            </h1>
            <p className="mt-3 text-base text-muted-foreground">
              Effective Date: June 23, 2026
            </p>
          </div>

          <div className="space-y-10 text-foreground">
            <section className="space-y-4">
              <p className="text-base leading-8 text-foreground/90">
                Khyra AI ("Khyra AI," "we," "our," or "us") is committed to protecting
                the privacy and security of the information entrusted to us. This Privacy
                Policy explains how we collect, use, store, process, disclose, and
                safeguard information when you access or use our website, applications,
                APIs, artificial intelligence services, voice agents, messaging systems,
                scheduling tools, automation features, and related services.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-semibold">1. Information We Collect</h2>
              <p className="text-base leading-8 text-foreground/90">
                The information we collect depends on how you interact with Khyra AI,
                the features you use, and the information you choose to provide. When
                creating an account, subscribing to the Services, requesting support,
                contacting us, or otherwise interacting with Khyra AI, we may collect
                personal information including your name, email address, phone number,
                company information, billing information, account credentials, and other
                information reasonably necessary to provide our Services.
              </p>
              <p className="text-base leading-8 text-foreground/90">
                Users may also submit customer information including names, phone
                numbers, email addresses, appointment details, communication records,
                notes, transcripts, recordings, scheduling information, and other
                business-related information required for automation and communication
                workflows.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-semibold">2. How We Use Information</h2>
              <p className="text-base leading-8 text-foreground/90">
                Khyra AI uses information to operate, maintain, improve, secure, and
                support the Services. Information may be used to manage accounts,
                process subscriptions, facilitate communications, schedule appointments,
                generate AI-powered responses, automate workflows, provide customer
                support, detect fraud, investigate security incidents, and comply with
                legal obligations.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-semibold">3. Artificial Intelligence Processing</h2>
              <p className="text-base leading-8 text-foreground/90">
                Khyra AI utilizes artificial intelligence technologies, machine learning
                systems, and natural language processing tools to provide automation,
                communication management, scheduling assistance, transcription,
                analytics, and workflow execution. Information submitted through the
                Services may be processed by AI systems and trusted service providers.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-semibold">4. Third-Party Services</h2>
              <p className="text-base leading-8 text-foreground/90">
                To provide the Services, Khyra AI works with third-party providers that
                support cloud infrastructure, calendar synchronization, telephony,
                messaging, analytics, payment processing, and AI functionality. These
                providers may include Google Calendar, WhatsApp Business integrations,
                hosting providers, telephony providers, and AI service providers.
              </p>
              <p className="text-base leading-8 text-foreground/90">
                Khyra AI does not sell personal information.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-semibold">5. Communications and Recordings</h2>
              <p className="text-base leading-8 text-foreground/90">
                Certain Services may involve call recording, transcription, voice
                processing, conversation analysis, AI-generated summaries, and related
                communication features. Users are responsible for obtaining any notices,
                permissions, or consents required under applicable laws before using
                such functionality.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-semibold">6. Data Retention</h2>
              <p className="text-base leading-8 text-foreground/90">
                We retain information only for as long as reasonably necessary to
                provide the Services, comply with legal obligations, resolve disputes,
                enforce agreements, maintain security, and support legitimate business
                operations. When information is no longer required, we take reasonable
                measures to securely delete or anonymize it.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-semibold">7. Data Security</h2>
              <p className="text-base leading-8 text-foreground/90">
                Khyra AI implements commercially reasonable administrative, technical,
                and organizational safeguards designed to protect information from
                unauthorized access, disclosure, alteration, misuse, or destruction.
                However, no method of transmission or storage can be guaranteed to be
                completely secure.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-semibold">8. User Rights</h2>
              <p className="text-base leading-8 text-foreground/90">
                Depending on applicable law, individuals may have rights relating to
                their personal information, including rights to access, correct,
                delete, restrict, or object to certain processing activities. Requests
                may be submitted using the contact information below.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-semibold">9. International Transfers</h2>
              <p className="text-base leading-8 text-foreground/90">
                Information may be processed or stored in jurisdictions outside your
                country of residence where our infrastructure providers and service
                providers operate. Appropriate safeguards are implemented where required.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-semibold">10. Children&apos;s Privacy</h2>
              <p className="text-base leading-8 text-foreground/90">
                The Services are not intended for children under the age of 13. We do
                not knowingly collect personal information from children.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-semibold">11. Changes to This Policy</h2>
              <p className="text-base leading-8 text-foreground/90">
                Khyra AI may update this Privacy Policy from time to time to reflect
                changes in our Services, business practices, legal requirements, or
                technology. Updated versions will be posted on our website together
                with a revised effective date.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-semibold">12. Contact Information</h2>
              <p className="text-base leading-8 text-foreground/90">
                Khyra AI<br />
                Bengaluru, Karnataka, India
              </p>
              <p className="text-base leading-8 text-foreground/90">
                Website: https://www.khyraai.com
              </p>
              <p className="text-base leading-8 text-foreground/90">
                Email: manoj@khyraai.com
              </p>
              <p className="text-base leading-8 text-foreground/90">
                Support: khyraai.core@gmail.com
              </p>
            </section>
          </div>
        </div>
      </div>
      <FooterSection />
    </main>
  );
}

