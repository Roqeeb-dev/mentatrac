import type { Metadata } from "next";
import {
  LegalLayout,
  Section,
  List,
  CONTACT_EMAIL,
} from "@/components/legal/LegalLayout";

export const metadata: Metadata = { title: "About" };

export default function AboutPage() {
  return (
    <LegalLayout
      title="About Mentatrac"
      subtitle="A calm, private space to understand how you feel, one check-in at a time."
    >
      <Section title="What Mentatrac is">
        <p>
          Mentatrac helps you build emotional awareness. You log your mood in
          under a minute, note what you were feeling and what influenced it, and
          over time the app shows you the patterns behind your days.
        </p>
      </Section>

      <Section title="What you can do">
        <List
          items={[
            "Check in daily with your mood, emotions and the things shaping your day.",
            "Write private journal entries, with an optional mood attached.",
            "See reports: mood trends, distribution, most-felt emotions and top triggers.",
            "Keep a streak going, and set a gentle reminder at a time that suits you.",
            "Export or delete your data whenever you choose.",
          ]}
        />
      </Section>

      <Section title="What we believe">
        <List
          items={[
            "Your data is yours. We don't sell it and we don't show ads.",
            "Simple beats clever. No clutter, no clinical jargon.",
            "Small, consistent habits matter more than perfect ones.",
          ]}
        />
      </Section>

      <Section title="Important">
        <p>
          Mentatrac is a self-reflection tool. It is not a medical service and
          doesn&apos;t provide diagnosis or treatment. If you are in crisis or
          think you may harm yourself, please contact your local emergency
          number or a qualified professional right away.
        </p>
      </Section>

      <Section title="Get in touch">
        <p>
          Questions or feedback? Email us at{" "}
          <a
            href={`mailto:${CONTACT_EMAIL}`}
            className="font-semibold text-[#5B4DFB] hover:underline"
          >
            {CONTACT_EMAIL}
          </a>
          .
        </p>
        <p className="text-xs text-slate-400">Version 1.0.0</p>
      </Section>
    </LegalLayout>
  );
}
