import type { Metadata } from "next";
import {
  LegalLayout,
  Section,
  List,
  CONTACT_EMAIL,
} from "@/components/legal/LegalLayout";

export const metadata: Metadata = { title: "Terms of service" };

export default function TermsPage() {
  return (
    <LegalLayout
      title="Terms of service"
      subtitle="The ground rules for using Mentatrac."
      updated="October 2026"
    >
      <Section title="Using Mentatrac">
        <p>
          By creating an account or using Mentatrac you agree to these terms. If
          you don&apos;t agree, please don&apos;t use the app.
        </p>
      </Section>

      <Section title="Not medical advice">
        <p>
          Mentatrac is a self-reflection and tracking tool. It does not provide
          medical advice, diagnosis or treatment, and it is not a substitute for
          a qualified professional. In an emergency, contact your local
          emergency services.
        </p>
      </Section>

      <Section title="Your account">
        <List
          items={[
            "You must be at least 13 years old.",
            "Give accurate information and keep your password secure.",
            "You are responsible for activity on your account.",
          ]}
        />
      </Section>

      <Section title="Acceptable use">
        <List
          items={[
            "Don't attempt to access other people's accounts or data.",
            "Don't disrupt, overload or reverse-engineer the service.",
            "Don't use Mentatrac for anything unlawful.",
          ]}
        />
      </Section>

      <Section title="Your content">
        <p>
          Your check-ins and journal entries belong to you. You give us
          permission to store and process them only to run the app for you, as
          described in our privacy policy.
        </p>
      </Section>

      <Section title="Availability and changes">
        <p>
          We work to keep Mentatrac available, but we can&apos;t guarantee it
          will always be uninterrupted or error-free. We may improve, change or
          remove features over time.
        </p>
      </Section>

      <Section title="Ending your account">
        <p>
          You can delete your account at any time from Profile. We may suspend
          accounts that break these terms.
        </p>
      </Section>

      <Section title="Liability">
        <p>
          Mentatrac is provided &quot;as is&quot;. To the extent the law allows,
          we are not liable for losses resulting from your use of the app.
        </p>
      </Section>

      <Section title="Contact">
        <p>
          Questions about these terms:{" "}
          <a
            href={`mailto:${CONTACT_EMAIL}`}
            className="font-semibold text-[#5B4DFB] hover:underline"
          >
            {CONTACT_EMAIL}
          </a>
          .
        </p>
      </Section>
    </LegalLayout>
  );
}
