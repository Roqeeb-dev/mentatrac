import type { Metadata } from "next";
import {
  LegalLayout,
  Section,
  List,
  CONTACT_EMAIL,
} from "@/components/legal/LegalLayout";

export const metadata: Metadata = { title: "Privacy policy" };

export default function PrivacyPage() {
  return (
    <LegalLayout
      title="Privacy policy"
      subtitle="What we collect, why, and the control you have over it."
      updated="October 2026"
    >
      <Section title="What we collect">
        <List
          items={[
            "Account details: your email address and password. Your password is never stored in plain text.",
            "Profile details you choose to give: name, age, gender, wellness goals, reminder preferences and profile photo.",
            "Your entries: mood check-ins (mood, emotions, influencers, notes) and journal entries.",
            "Basic technical data needed to run the service, such as request logs.",
          ]}
        />
      </Section>

      <Section title="How we use it">
        <List
          items={[
            "To provide the app: save your entries, calculate your streak and reports, and send reminders you turn on.",
            "To keep the service secure and working.",
            "We do not sell your data, share it for advertising, or use it to profile you for third parties.",
          ]}
        />
      </Section>

      <Section title="Who else handles your data">
        <p>
          We use service providers to run Mentatrac, such as hosting and image
          storage for profile photos. They process data only to provide those
          services for us.
        </p>
      </Section>

      <Section title="Security">
        <p>
          Data is sent over encrypted connections (HTTPS) and access to your
          account requires you to sign in. No system is completely secure, so
          please use a strong, unique password.
        </p>
      </Section>

      <Section title="Your choices">
        <List
          items={[
            "Edit your name, photo and reminder settings in Profile at any time.",
            "Export your data from Profile > Data & Storage.",
            "Delete your account from Profile > Account. This signs you out and deactivates your account. To have any remaining data permanently erased, email us.",
          ]}
        />
      </Section>

      <Section title="Age">
        <p>Mentatrac isn&apos;t intended for children under 13.</p>
      </Section>

      <Section title="Changes">
        <p>
          If we change this policy in a meaningful way, we&apos;ll update the
          date above and tell you in the app.
        </p>
      </Section>

      <Section title="Contact">
        <p>
          Privacy questions or requests:{" "}
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
