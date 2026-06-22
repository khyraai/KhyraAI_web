import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/terms")({
  component: TermsPage,
  head: () => ({
    meta: [
      { title: "Terms of Service — Khyra AI" },
      {
        name: "description",
        content:
          "Read the Khyra AI Terms of Service governing the use of our website, applications, AI services, and business automation platform.",
      },
    ],
  }),
});

function TermsPage() {
  return (
    <main className="min-h-screen bg-background">
      <div className="mx-auto max-w-6xl px-6 py-20">
        <div className="overflow-hidden rounded-[2rem] border border-border bg-background/90 p-10 shadow-[0_40px_120px_-60px_rgba(31,74,63,0.35)]">
          <div className="mb-10 text-center">
            <p className="text-sm uppercase tracking-[0.35em] text-primary">
              Legal
            </p>
            <h1 className="mt-4 text-5xl font-display font-semibold tracking-tight text-foreground">
              Terms of Service
            </h1>
            <p className="mt-3 text-base text-muted-foreground">
              Effective Date: June 23, 2026
            </p>
          </div>

          <div className="space-y-10 text-foreground">
            <section className="space-y-4">
              <p className="text-base leading-8 text-foreground/90">
                Welcome to Khyra AI. These Terms of Service govern your
                access to and use of the Khyra AI website, applications,
                APIs, software, artificial intelligence services, voice
                agents, scheduling tools, communication platforms,
                automation features, and related services.
              </p>
              <p className="text-base leading-8 text-foreground/90">
                By accessing, registering for, subscribing to, or using
                any part of the Services, you acknowledge that you have
                read, understood, and agreed to be bound by these Terms.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-semibold">1. Eligibility and Authority</h2>
              <p className="text-base leading-8 text-foreground/90">
                The Services are intended for individuals who are at least
                eighteen years of age and capable of entering into legally
                binding agreements. If you are using the Services on behalf
                of an organization, you represent that you have authority
                to bind that organization to these Terms.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-semibold">2. Description of Services</h2>
              <p className="text-base leading-8 text-foreground/90">
                Khyra AI provides technology solutions designed to automate
                communications, appointment scheduling, customer engagement,
                workflow automation, AI-powered interactions, analytics,
                reporting, and related business operations.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-semibold">3. Account Registration and Security</h2>
              <p className="text-base leading-8 text-foreground/90">
                Certain portions of the Services require account registration.
                You agree to provide accurate information and maintain the
                confidentiality of your account credentials. You are
                responsible for activities occurring under your account.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-semibold">4. Subscription Services and Payments</h2>
              <p className="text-base leading-8 text-foreground/90">
                Certain Services may require a paid subscription. By
                subscribing, you agree to pay all applicable fees and taxes.
                Failure to make payments may result in suspension or
                termination of access to the Services.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-semibold">5. Customer Data and Ownership</h2>
              <p className="text-base leading-8 text-foreground/90">
                You retain ownership of Customer Data submitted through the
                Services. By using the Services, you grant Khyra AI a limited
                license to process, store, analyze, and transmit such data
                solely for the purpose of providing and improving the Services.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-semibold">6. Artificial Intelligence Services</h2>
              <p className="text-base leading-8 text-foreground/90">
                Khyra AI uses artificial intelligence technologies,
                machine learning systems, and automation tools. AI-generated
                outputs may not always be accurate, complete, or suitable for
                every situation. Users remain responsible for reviewing and
                validating outputs before relying upon them.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-semibold">
                7. Communications, Call Recording, and Consent
              </h2>
              <p className="text-base leading-8 text-foreground/90">
                Certain Services may involve call recording, transcription,
                voice analysis, automated communications, and AI-generated
                summaries. You are solely responsible for obtaining any
                legally required notices, permissions, and consents.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-semibold">
                8. Third-Party Services and Integrations
              </h2>
              <p className="text-base leading-8 text-foreground/90">
                The Services may integrate with third-party providers
                including calendar services, messaging platforms, telephony
                providers, cloud infrastructure providers, payment processors,
                and AI service providers. Your use of such services remains
                subject to their respective terms and policies.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-semibold">9. Acceptable Use</h2>
              <p className="text-base leading-8 text-foreground/90">
                You agree not to use the Services for unlawful activities,
                fraud, spam, intellectual property infringement, security
                violations, malware distribution, or any activity that could
                disrupt the operation of the Services.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-semibold">10. Intellectual Property</h2>
              <p className="text-base leading-8 text-foreground/90">
                All rights, title, and interest in the Services, including
                software, branding, documentation, designs, and underlying
                technology, remain the property of Khyra AI or its licensors.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-semibold">11. Service Availability</h2>
              <p className="text-base leading-8 text-foreground/90">
                The Services are provided on an "as available" basis. We do
                not guarantee uninterrupted operation, continuous
                availability, or error-free performance.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-semibold">12. Disclaimer of Warranties</h2>
              <p className="text-base leading-8 text-foreground/90">
                To the fullest extent permitted by law, Khyra AI disclaims
                all warranties, whether express, implied, statutory, or
                otherwise, including warranties of merchantability, fitness
                for a particular purpose, and non-infringement.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-semibold">13. Limitation of Liability</h2>
              <p className="text-base leading-8 text-foreground/90">
                Khyra AI shall not be liable for indirect, incidental,
                consequential, special, or punitive damages, including lost
                profits, missed appointments, data loss, or AI-generated
                inaccuracies. Liability shall not exceed amounts paid by you
                during the preceding twelve months.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-semibold">14. Indemnification</h2>
              <p className="text-base leading-8 text-foreground/90">
                You agree to indemnify and hold harmless Khyra AI from any
                claims, damages, liabilities, losses, costs, and expenses
                arising from your use of the Services or violation of these
                Terms.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-semibold">15. Termination</h2>
              <p className="text-base leading-8 text-foreground/90">
                Khyra AI may suspend or terminate access to the Services if
                these Terms are violated or if continued use presents legal,
                security, or operational risks.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-semibold">16. Governing Law and Jurisdiction</h2>
              <p className="text-base leading-8 text-foreground/90">
                These Terms shall be governed by the laws of India. Any
                disputes shall be subject to the exclusive jurisdiction of
                the courts located in Bengaluru, Karnataka.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-semibold">17. Changes to These Terms</h2>
              <p className="text-base leading-8 text-foreground/90">
                Khyra AI may update these Terms from time to time. Updated
                versions will be posted on our website together with a
                revised effective date.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-semibold">18. Contact Information</h2>
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
    </main>
  );
}
