export interface Program {
  id: string;
  slug: string;
  title: string;
  arabicTitle: string;
  description: string;
  whatToExpect: string[];
  icon: 'dawah' | 'newmuslim' | 'marriage' | 'youth';
  isSampleData: true;
  /** If set, this program links to another page instead of having its own inquiry form */
  linkTo?: string;
  linkLabel?: string;
}

export const PROGRAMS: Program[] = [
  {
    id: 'dawah',
    slug: 'dawah',
    title: 'Dawah & Learn About Islam',
    arabicTitle: 'الدعوة',
    description: 'Curious about Islam? You are welcome here. This program is for anyone interested in learning about Islam in a friendly, no-pressure setting — whether you are exploring for the first time or considering taking your shahada.',
    whatToExpect: [
      'A private, welcoming conversation at your pace',
      'No pressure — come with your questions',
      'All inquiries are confidential',
    ],
    icon: 'dawah',
    isSampleData: true,
  },
  {
    id: 'new-muslim',
    slug: 'new-muslim-support',
    title: 'New Muslim Support',
    arabicTitle: 'دعم المسلمين الجدد',
    description: 'For those who have recently embraced Islam or are in the process. This program offers mentorship, foundational guidance, and a supportive community to help you on your journey.',
    whatToExpect: [
      'One-on-one mentorship with a community member',
      'Guidance on the foundations of faith and practice',
      'A welcoming, confidential environment',
    ],
    icon: 'newmuslim',
    isSampleData: true,
  },
  {
    id: 'marriage',
    slug: 'marriage-services',
    title: 'Marriage Services',
    arabicTitle: 'خدمات الزواج',
    description: 'The masjid assists community members with nikah (Islamic marriage) ceremonies and can provide guidance for those seeking matrimonial assistance.',
    whatToExpect: [
      'An initial conversation to understand your needs',
      'Guidance on the Islamic marriage process',
      'All discussions are kept strictly confidential',
    ],
    icon: 'marriage',
    isSampleData: true,
  },
  {
    id: 'youth',
    slug: 'youth-education',
    title: 'Youth & Education',
    arabicTitle: 'الشباب والتعليم',
    description: 'Weekly programs for young Muslims including Quran study circles, Islamic education, and community activities. See our Events page for the current schedule.',
    whatToExpect: [
      'Age-appropriate Islamic education',
      'Quran study and memorization support',
      'Community activities and mentorship',
    ],
    icon: 'youth',
    isSampleData: true,
    linkTo: '/events',
    linkLabel: 'View Weekly Schedule',
  },
];
