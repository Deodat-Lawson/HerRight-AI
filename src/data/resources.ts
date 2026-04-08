export interface Resource {
  id: string;
  nameZh: string;
  nameEn: string;
  phone: string;
  address: string;
  city: string;
  type: 'legal' | 'shelter' | 'lawyer' | 'mental' | 'settlement';
  languages: string[];
  descriptionZh: string;
  descriptionEn: string;
}

export const resources: Resource[] = [
  {
    id: 'legal-aid-bc',
    nameZh: 'BC省法律援助',
    nameEn: 'Legal Aid BC',
    phone: '1-866-577-2525',
    address: '400-5101politan Way, Vancouver, BC',
    city: 'Vancouver',
    type: 'legal',
    languages: ['English', '中文'],
    descriptionZh: '为符合条件的低收入人士提供免费法律服务，包括家庭法和移民法。',
    descriptionEn: 'Free legal services for eligible low-income individuals, including family and immigration law.'
  },
  {
    id: 'success',
    nameZh: '中侨互助会',
    nameEn: 'S.U.C.C.E.S.S.',
    phone: '604-684-1628',
    address: '28 W Pender St, Vancouver, BC',
    city: 'Vancouver',
    type: 'settlement',
    languages: ['普通话', '粤语', 'English'],
    descriptionZh: '提供移民安置、家庭服务、社区支援和法律转介服务。',
    descriptionEn: 'Immigration settlement, family services, community support and legal referrals.'
  },
  {
    id: 'mosaic',
    nameZh: 'MOSAIC多元文化服务中心',
    nameEn: 'MOSAIC',
    phone: '604-254-9626',
    address: '5575 Boundary Rd, Vancouver, BC',
    city: 'Vancouver',
    type: 'settlement',
    languages: ['普通话', '粤语', 'English', 'हिन्दी', 'Tagalog'],
    descriptionZh: '为移民和难民提供语言培训、就业服务和家庭支持。',
    descriptionEn: 'Language training, employment services and family support for immigrants and refugees.'
  },
  {
    id: 'womens-shelter-vancouver',
    nameZh: '温哥华妇女庇护中心',
    nameEn: 'Vancouver Women\'s Crisis Centre',
    phone: '604-872-8212',
    address: '2555 Commercial Dr, Vancouver, BC',
    city: 'Vancouver',
    type: 'shelter',
    languages: ['English', '中文'],
    descriptionZh: '24小时危机热线和安全庇护所，为家庭暴力受害者提供紧急住宿。',
    descriptionEn: '24-hour crisis line and safe shelter for domestic violence victims.'
  },
  {
    id: 'battered-women-support',
    nameZh: '受虐妇女支援服务',
    nameEn: 'Battered Women\'s Support Services',
    phone: '604-895-2188',
    address: '2405 False Creek, Vancouver, BC',
    city: 'Vancouver',
    type: 'mental',
    languages: ['English', '中文'],
    descriptionZh: '为遭受暴力的妇女提供心理辅导、支持和法律信息。',
    descriptionEn: 'Counselling, support and legal information for women who have experienced violence.'
  },
  {
    id: 'access-pro-bono',
    nameZh: 'Access Pro Bono',
    nameEn: 'Access Pro Bono',
    phone: '604-878-7400',
    address: '300-845 Cambie St, Vancouver, BC',
    city: 'Vancouver',
    type: 'legal',
    languages: ['English'],
    descriptionZh: '为无力负担律师费用的人士提供免费法律服务，包括家庭法。',
    descriptionEn: 'Free legal services for those who cannot afford lawyers, including family law.'
  },
  {
    id: 'vancouver-rape-crisis',
    nameZh: '温哥华性强暴危机中心',
    nameEn: 'Vancouver Rape Crisis Centre',
    phone: '604-255-6344',
    address: '1979 W 4th Ave, Vancouver, BC',
    city: 'Vancouver',
    type: 'mental',
    languages: ['English', '中文'],
    descriptionZh: '为性暴力受害者提供24小时危机支持和咨询服务。',
    descriptionEn: '24-hour crisis support and counselling for sexual violence survivors.'
  },
  {
    id: 'immigration-advice',
    nameZh: '移民和难民法律诊所',
    nameEn: 'Immigration and Refugee Legal Clinic',
    phone: '604-822-5181',
    address: '206-1822 E Mall, Vancouver, BC',
    city: 'Vancouver',
    type: 'legal',
    languages: ['English', '中文'],
    descriptionZh: '由UBC学生运营的法律诊所，为移民和难民提供免费法律帮助。',
    descriptionEn: 'Student-run legal clinic providing free legal help to immigrants and refugees.'
  },
  {
    id: 'YWCA',
    nameZh: 'YWCA女青年会',
    nameEn: 'YWCA Vancouver',
    phone: '604-895-5770',
    address: '535 Hornby St, Vancouver, BC',
    city: 'Vancouver',
    type: 'shelter',
    languages: ['English', '中文'],
    descriptionZh: '为妇女和儿童提供庇护所、儿童照护和社区服务。',
    descriptionEn: 'Shelter, childcare and community services for women and children.'
  },
  {
    id: 'family-law-hotline',
    nameZh: '家庭法热线',
    nameEn: 'Family Law Hotline',
    phone: '1-800-663-7878',
    address: '电话服务，无实体地址',
    city: 'Vancouver',
    type: 'legal',
    languages: ['English', '中文'],
    descriptionZh: '提供家庭法信息和转介服务，帮助你找到合适的法律资源。',
    descriptionEn: 'Family law information and referral service to help you find the right legal resources.'
  }
];