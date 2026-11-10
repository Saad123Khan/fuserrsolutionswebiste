import { company } from '@/data/company';

export interface LegalSection {
  title: string;
  paragraphs?: string[];
  list?: string[];
}

export interface LegalDoc {
  title: string;
  highlight: string;
  intro: string;
  /** ISO date. */
  updated: string;
  sections: LegalSection[];
}

// TODO(legal): this is a plain-language draft based on how the site works today.
// Have it reviewed by a lawyer before relying on it, and update `updated` on every change.

export const privacyPolicy: LegalDoc = {
  title: 'Privacy',
  highlight: 'Policy',
  intro: `This policy explains what information ${company.name} collects when you visit our website or contact us, how we use it and the choices you have.`,
  updated: '2026-11-10',
  sections: [
    {
      title: 'Who we are',
      paragraphs: [
        `${company.name} is a software development company based at ${company.address}. In this policy, "we", "us" and "our" refer to ${company.name}.`,
      ],
    },
    {
      title: 'Information we collect',
      paragraphs: ['We only collect information that helps us run this website and respond to you:'],
      list: [
        'Contact form details you choose to send: your name, email address, company, the service you are interested in, budget range, timeline and your message.',
        'Emails or calls you send us directly, and the information you include in them.',
        'Usage data collected automatically by analytics tools, such as pages visited, approximate location (country/city), device and browser type, and how you interact with pages.',
      ],
    },
    {
      title: 'How we use your information',
      list: [
        'To reply to your enquiry and prepare proposals you ask for.',
        'To understand how visitors use the site so we can improve its content and performance.',
        'To keep the website secure and prevent abuse.',
        'To meet legal or regulatory obligations where they apply.',
      ],
    },
    {
      title: 'We do not sell your data',
      paragraphs: ['We do not sell your personal information, and we do not add contact form details to marketing lists without your consent.'],
    },
    {
      title: 'Analytics and cookies',
      paragraphs: [
        'We use Google Analytics and Microsoft Clarity to understand how the website is used. These services may set cookies or use similar technologies to collect usage data, including session recordings and heatmaps in the case of Clarity. The data is processed by Google and Microsoft under their own privacy policies.',
        'You can block or delete cookies in your browser settings, and you can opt out of Google Analytics with the official Google Analytics opt-out browser add-on. The website will continue to work if you do.',
      ],
    },
    {
      title: 'Service providers',
      paragraphs: [
        'Messages sent through our contact form are delivered to our inbox by an email delivery provider (Resend). Our website is hosted by a third-party hosting provider. These providers only process your information to deliver their service to us.',
      ],
    },
    {
      title: 'How long we keep information',
      paragraphs: [
        'We keep enquiry emails for as long as needed to respond and to manage any resulting project, and for a reasonable period afterwards for our records. Analytics data is retained according to the settings of the analytics providers.',
      ],
    },
    {
      title: 'Your rights',
      paragraphs: [
        `You can ask us to access, correct or delete the personal information we hold about you, or to stop contacting you. Email ${company.email} and we will respond within a reasonable time.`,
      ],
    },
    {
      title: 'Security',
      paragraphs: [
        'We take reasonable technical and organisational measures to protect your information. No method of transmission over the internet is completely secure, so we cannot guarantee absolute security.',
      ],
    },
    {
      title: 'Children',
      paragraphs: ['This website is intended for businesses and is not directed at children. We do not knowingly collect information from children.'],
    },
    {
      title: 'Changes to this policy',
      paragraphs: ['We may update this policy from time to time. The "last updated" date at the top shows when it was last changed.'],
    },
    {
      title: 'Contact us',
      paragraphs: [`Questions about this policy? Email ${company.email} or call ${company.phone}.`],
    },
  ],
};

export const terms: LegalDoc = {
  title: 'Terms of',
  highlight: 'Service',
  intro: `These terms govern your use of the ${company.name} website. By using the site you agree to them. Work we do for clients is covered by a separate written agreement.`,
  updated: '2026-11-10',
  sections: [
    {
      title: 'Using this website',
      paragraphs: [
        'You may browse and use this website for lawful purposes and to learn about our services. You agree not to misuse it, for example by attempting to gain unauthorised access, disrupting it, or sending spam through our forms.',
      ],
    },
    {
      title: 'Information on this site',
      paragraphs: [
        'We work to keep the content accurate and up to date, but it is provided for general information only. Descriptions of services, timelines and examples do not form an offer or a contract.',
      ],
    },
    {
      title: 'Projects and client agreements',
      paragraphs: [
        'Any project we take on is governed by a separate proposal, statement of work or contract agreed with the client. Those documents set out scope, fees, payment terms, ownership of deliverables, confidentiality and warranties, and take precedence over these terms.',
      ],
    },
    {
      title: 'Intellectual property',
      paragraphs: [
        `The design, text, graphics, logos and code of this website belong to ${company.name} or are used with permission. You may not copy or reuse them without our written consent. Client names and trademarks shown on the site belong to their respective owners.`,
      ],
    },
    {
      title: 'Enquiries and proposals',
      paragraphs: [
        'Sending an enquiry does not create any obligation on you or us. Proposals we send are valid for the period stated in them. We may decline any project at our discretion.',
      ],
    },
    {
      title: 'Third-party links',
      paragraphs: ['The site may link to third-party websites. We are not responsible for their content, policies or practices.'],
    },
    {
      title: 'Limitation of liability',
      paragraphs: [
        'To the extent permitted by law, we are not liable for any indirect or consequential loss arising from your use of this website. Nothing in these terms limits liability that cannot be limited by law.',
      ],
    },
    {
      title: 'Governing law',
      paragraphs: ['These terms are governed by the laws of Pakistan, and the courts of Karachi have jurisdiction over any dispute relating to this website.'],
    },
    {
      title: 'Changes',
      paragraphs: ['We may update these terms from time to time. Continued use of the site after changes means you accept the updated terms.'],
    },
    {
      title: 'Contact',
      paragraphs: [`Questions about these terms? Email ${company.email}.`],
    },
  ],
};
