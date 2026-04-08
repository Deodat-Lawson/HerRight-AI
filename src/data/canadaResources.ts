export interface CanadaResource {
  id: string;
  nameZh: string;
  nameEn: string;
  phone: string;
  address?: string;
  city: string;
  province: string;
  provinceCode: string;
  type: 'crisis' | 'shelter' | 'legal' | 'immigration' | 'mental' | 'multicultural' | 'police';
  languages: string[];
  descriptionZh: string;
  descriptionEn: string;
  website?: string;
  hours?: string;
  isNational?: boolean;
}

// Canadian cities with resources
export const canadaResources: CanadaResource[] = [
  // === NATIONAL RESOURCES ===
  {
    id: '211-national',
    nameZh: '211热线',
    nameEn: '211',
    phone: '211',
    city: 'All Cities',
    province: 'All Provinces',
    provinceCode: 'NAT',
    type: 'crisis',
    languages: ['English', 'French', 'Multiple'],
    descriptionZh: '24小时热线，提供当地社区服务信息，包括食物、住房、心理健康、法律援助等。',
    descriptionEn: '24/7 helpline connecting to local community services including food, housing, mental health, legal aid and more.',
    website: 'https://211.ca',
    hours: '24/7',
    isNational: true
  },
  {
    id: 'canada-crisis',
    nameZh: '加拿大危机热线',
    nameEn: 'Canada Suicide Prevention Service',
    phone: '1-833-456-4566',
    city: 'All Cities',
    province: 'All Provinces',
    provinceCode: 'NAT',
    type: 'crisis',
    languages: ['English', 'French'],
    descriptionZh: '预防自杀热线，提供危机支持和自杀预防信息。',
    descriptionEn: 'Suicide prevention helpline with crisis support and suicide prevention information.',
    hours: '24/7',
    isNational: true
  },
  {
    id: 'emergency',
    nameZh: '紧急求助',
    nameEn: 'Emergency Services',
    phone: '911',
    city: 'All Cities',
    province: 'All Provinces',
    provinceCode: 'NAT',
    type: 'crisis',
    languages: ['All Languages'],
    descriptionZh: '紧急情况拨打报警、火灾或急救。',
    descriptionEn: 'Call for police, fire or medical emergencies.',
    isNational: true
  },

  // === BRITISH COLUMBIA ===
  // Vancouver
  {
    id: 'legal-aid-bc',
    nameZh: 'BC省法律援助',
    nameEn: 'Legal Aid BC',
    phone: '1-866-577-2525',
    address: '400-5101 Politan Way, Vancouver, BC',
    city: 'Vancouver',
    province: 'British Columbia',
    provinceCode: 'BC',
    type: 'legal',
    languages: ['English', '中文', 'Punjabi'],
    descriptionZh: '为符合条件的低收入人士提供免费法律服务，包括家庭法、移民法和刑事法。',
    descriptionEn: 'Free legal services for eligible low-income individuals including family, immigration and criminal law.',
    website: 'https://legalaidbc.ca',
    hours: 'Mon-Fri 8am-4pm'
  },
  {
    id: 'bc-crisis-line',
    nameZh: 'BC省危机热线',
    nameEn: 'BC Crisis Line',
    phone: '310-6789',
    city: 'Vancouver',
    province: 'British Columbia',
    provinceCode: 'BC',
    type: 'crisis',
    languages: ['English', '中文'],
    descriptionZh: 'BC省24小时危机支持和自杀预防热线。',
    descriptionEn: 'BC 24-hour crisis support and suicide prevention line.',
    hours: '24/7'
  },
  {
    id: 'vancouver-shelter',
    nameZh: '温哥华妇女危机中心',
    nameEn: 'Vancouver Women\'s Crisis Centre',
    phone: '604-872-8212',
    address: '2555 Commercial Dr, Vancouver, BC',
    city: 'Vancouver',
    province: 'British Columbia',
    provinceCode: 'BC',
    type: 'shelter',
    languages: ['English', '中文'],
    descriptionZh: '24小时危机热线和安全庇护所，为家庭暴力受害者提供紧急住宿。',
    descriptionEn: '24-hour crisis line and safe shelter for domestic violence victims.',
    hours: '24/7'
  },
  {
    id: 'bwss-vancouver',
    nameZh: '受虐妇女支援服务',
    nameEn: 'Battered Women\'s Support Services',
    phone: '1-604-895-2188',
    address: '2405 False Creek, Vancouver, BC',
    city: 'Vancouver',
    province: 'British Columbia',
    provinceCode: 'BC',
    type: 'mental',
    languages: ['English', '中文'],
    descriptionZh: '为遭受暴力的妇女提供心理辅导、支持和法律信息。',
    descriptionEn: 'Counselling, support and legal information for women who have experienced violence.',
    website: 'https://bwss.ca',
    hours: 'Mon-Fri 9am-5pm'
  },
  {
    id: 'success-vancouver',
    nameZh: '中侨互助会',
    nameEn: 'S.U.C.C.E.S.S.',
    phone: '604-684-1628',
    address: '28 W Pender St, Vancouver, BC',
    city: 'Vancouver',
    province: 'British Columbia',
    provinceCode: 'BC',
    type: 'multicultural',
    languages: ['普通话', '粤语', 'English'],
    descriptionZh: '提供移民安置、家庭服务、社区支援和法律转介服务。',
    descriptionEn: 'Immigration settlement, family services, community support and legal referrals.',
    website: 'https://success.bc.ca',
    hours: 'Mon-Fri 9am-6pm'
  },
  {
    id: 'mosaic-vancouver',
    nameZh: 'MOSAIC多元文化服务中心',
    nameEn: 'MOSAIC',
    phone: '604-254-9626',
    address: '5575 Boundary Rd, Vancouver, BC',
    city: 'Vancouver',
    province: 'British Columbia',
    provinceCode: 'BC',
    type: 'multicultural',
    languages: ['普通话', '粤语', 'English', 'हिन्दी', 'Tagalog'],
    descriptionZh: '为移民和难民提供语言培训、就业服务和家庭支持。',
    descriptionEn: 'Language training, employment services and family support for immigrants and refugees.',
    website: 'https://mosaicbc.org',
    hours: 'Mon-Fri 9am-5pm'
  },
  {
    id: 'vancouver-rape-crisis',
    nameZh: '温哥华性强暴危机中心',
    nameEn: 'Vancouver Rape Crisis Centre',
    phone: '604-255-6344',
    address: '1979 W 4th Ave, Vancouver, BC',
    city: 'Vancouver',
    province: 'British Columbia',
    provinceCode: 'BC',
    type: 'mental',
    languages: ['English', '中文'],
    descriptionZh: '为性暴力受害者提供24小时危机支持和咨询服务。',
    descriptionEn: '24-hour crisis support and counselling for sexual violence survivors.',
    website: 'https://vrcc.ca',
    hours: '24/7'
  },
  {
    id: 'ywca-vancouver',
    nameZh: 'YWCA女青年会',
    nameEn: 'YWCA Vancouver',
    phone: '604-895-5770',
    address: '535 Hornby St, Vancouver, BC',
    city: 'Vancouver',
    province: 'British Columbia',
    provinceCode: 'BC',
    type: 'shelter',
    languages: ['English', '中文'],
    descriptionZh: '为妇女和儿童提供庇护所、儿童照护和社区服务。',
    descriptionEn: 'Shelter, childcare and community services for women and children.',
    website: 'https://ywcavan.org',
    hours: '24/7'
  },
  {
    id: 'family-law-hotline-bc',
    nameZh: '家庭法热线',
    nameEn: 'Family Law Hotline',
    phone: '1-800-663-7878',
    city: 'Vancouver',
    province: 'British Columbia',
    provinceCode: 'BC',
    type: 'legal',
    languages: ['English', '中文'],
    descriptionZh: '提供家庭法信息和转介服务。',
    descriptionEn: 'Family law information and referral service.',
    hours: 'Mon-Fri 9am-4pm'
  },
  {
    id: 'vancouver-police',
    nameZh: '温哥华警察局',
    nameEn: 'Vancouver Police Department',
    phone: '604-717-3321',
    address: '312 Main St, Vancouver, BC',
    city: 'Vancouver',
    province: 'British Columbia',
    provinceCode: 'BC',
    type: 'police',
    languages: ['English', '中文'],
    descriptionZh: '非紧急报警和家庭暴力报告。',
    descriptionEn: 'Non-emergency calls and domestic violence reporting.',
    hours: '24/7'
  },

  // Victoria
  {
    id: 'victoria-shelter',
    nameZh: '维多利亚妇女庇护所',
    nameEn: 'Victoria Women\'s Transition House',
    phone: '250-385-6611',
    address: '1035 Princess St, Victoria, BC',
    city: 'Victoria',
    province: 'British Columbia',
    provinceCode: 'BC',
    type: 'shelter',
    languages: ['English'],
    descriptionZh: '为家庭暴力受害妇女和儿童提供安全庇护。',
    descriptionEn: 'Safe shelter for women and children affected by family violence.',
    hours: '24/7'
  },
  {
    id: 'victoria-crisis',
    nameZh: '维多利亚危机热线',
    nameEn: 'Victoria Crisis Line',
    phone: '250-383-5544',
    city: 'Victoria',
    province: 'British Columbia',
    provinceCode: 'BC',
    type: 'crisis',
    languages: ['English'],
    descriptionZh: '维多利亚地区危机支持和自杀预防。',
    descriptionEn: 'Victoria region crisis support and suicide prevention.',
    hours: '24/7'
  },

  // Surrey
  {
    id: 'surrey-shelter',
    nameZh: '素里妇女之家',
    nameEn: 'Surrey Women\'s Centre',
    phone: '604-583-1295',
    address: '10675 138 St, Surrey, BC',
    city: 'Surrey',
    province: 'British Columbia',
    provinceCode: 'BC',
    type: 'shelter',
    languages: ['English', 'Punjabi', 'Hindi'],
    descriptionZh: '为 Surrey 地区家庭暴力受害者提供支持。',
    descriptionEn: 'Support for family violence victims in Surrey area.',
    hours: 'Mon-Fri 9am-5pm'
  },
  {
    id: 'surrey-crisis',
    nameZh: '素里危机热线',
    nameEn: 'Surrey Crisis Line',
    phone: '604-951-8855',
    city: 'Surrey',
    province: 'British Columbia',
    provinceCode: 'BC',
    type: 'crisis',
    languages: ['English', 'Punjabi'],
    descriptionZh: 'Surrey 地区危机支持服务。',
    descriptionEn: 'Crisis support services for Surrey area.',
    hours: '24/7'
  },

  // === ONTARIO ===
  // Toronto
  {
    id: 'legal-aid-ontario',
    nameZh: '安省法律援助',
    nameEn: 'Legal Aid Ontario',
    phone: '1-800-668-8258',
    city: 'Toronto',
    province: 'Ontario',
    provinceCode: 'ON',
    type: 'legal',
    languages: ['English', 'French', 'Multiple'],
    descriptionZh: '为符合条件的低收入人士提供免费法律服务。',
    descriptionEn: 'Free legal services for eligible low-income individuals.',
    website: 'https://legalaid.on.ca',
    hours: 'Mon-Fri 8am-5pm'
  },
  {
    id: 'ontario-crisis',
    nameZh: '安省危机热线',
    nameEn: 'Ontario Crisis Line',
    phone: '1-866-531-2600',
    city: 'Toronto',
    province: 'Ontario',
    provinceCode: 'ON',
    type: 'crisis',
    languages: ['English', 'French'],
    descriptionZh: '安省24小时危机支持和自杀预防热线。',
    descriptionEn: 'Ontario 24-hour crisis support and suicide prevention.',
    hours: '24/7'
  },
  {
    id: 'toronto-shelter',
    nameZh: '多伦多妇女庇护中心',
    nameEn: 'Toronto Women\'s Shelter',
    phone: '416-972-0336',
    city: 'Toronto',
    province: 'Ontario',
    provinceCode: 'ON',
    type: 'shelter',
    languages: ['English', '中文', 'Multiple'],
    descriptionZh: '为多伦多地区家庭暴力受害者提供紧急庇护。',
    descriptionEn: 'Emergency shelter for domestic violence victims in Toronto.',
    hours: '24/7'
  },
  {
    id: 'hamilton-shelter',
    nameZh: '哈密尔顿妇女服务',
    nameEn: 'Women\'s Services Hamilton',
    phone: '905-525-1542',
    city: 'Hamilton',
    province: 'Ontario',
    provinceCode: 'ON',
    type: 'shelter',
    languages: ['English'],
    descriptionZh: '为哈密尔顿地区妇女提供庇护和支持服务。',
    descriptionEn: 'Shelter and support services for women in Hamilton area.',
    hours: '24/7'
  },
  {
    id: 'ottawa-shelter',
    nameZh: '渥太华妇女危机中心',
    nameEn: 'Ottawa Women\'s Crisis Line',
    phone: '613-233-0658',
    city: 'Ottawa',
    province: 'Ontario',
    provinceCode: 'ON',
    type: 'shelter',
    languages: ['English', 'French'],
    descriptionZh: '渥太华地区家庭暴力受害妇女危机支持。',
    descriptionEn: 'Crisis support for domestic violence victims in Ottawa.',
    hours: '24/7'
  },
  {
    id: 'ottawa-legal',
    nameZh: '渥太华法律援助',
    nameEn: 'Ottawa Legal Aid',
    phone: '613-238-3602',
    address: '312-141 Laurier Ave W, Ottawa, ON',
    city: 'Ottawa',
    province: 'Ontario',
    provinceCode: 'ON',
    type: 'legal',
    languages: ['English', 'French'],
    descriptionZh: '渥太华地区法律援助服务。',
    descriptionEn: 'Legal aid services in Ottawa area.',
    hours: 'Mon-Fri 9am-4pm'
  },
  {
    id: 'peel-shelter',
    nameZh: '皮尔区妇女危机中心',
    nameEn: 'Peel Women\'s Crisis Centre',
    phone: '905-450-1199',
    city: 'Mississauga',
    province: 'Ontario',
    provinceCode: 'ON',
    type: 'shelter',
    languages: ['English', 'Punjabi', 'Hindi', ' Urdu'],
    descriptionZh: '皮尔区（密西沙加+宾顿）妇女危机支持。',
    descriptionEn: 'Women\'s crisis support for Peel region (Mississauga + Brampton).',
    hours: '24/7'
  },
  {
    id: 'london-on-shelter',
    nameZh: '伦敦市妇女庇护所',
    nameEn: 'London Women\'s Community House',
    phone: '519-432-1112',
    city: 'London',
    province: 'Ontario',
    provinceCode: 'ON',
    type: 'shelter',
    languages: ['English'],
    descriptionZh: '伦敦市妇女和儿童庇护服务。',
    descriptionEn: 'Shelter services for women and children in London.',
    hours: '24/7'
  },

  // === QUEBEC ===
  {
    id: 'quebec-legal',
    nameZh: '法律援助魁北克',
    nameEn: 'Aide juridique Quebec',
    phone: '1-800-842-2213',
    city: 'Montreal',
    province: 'Quebec',
    provinceCode: 'QC',
    type: 'legal',
    languages: ['French', 'English'],
    descriptionZh: '魁北克省法律援助服务。',
    descriptionEn: 'Quebec legal aid services.',
    website: 'https://juridique.qc.ca',
    hours: 'Mon-Fri 8am-5pm'
  },
  {
    id: 'quebec-crisis',
    nameZh: '魁北克危机热线',
    nameEn: 'Quebec Crisis Line',
    phone: '1-866-277-3553',
    city: 'Montreal',
    province: 'Quebec',
    provinceCode: 'QC',
    type: 'crisis',
    languages: ['French', 'English'],
    descriptionZh: '魁北克省危机支持和自杀预防。',
    descriptionEn: 'Quebec crisis support and suicide prevention.',
    hours: '24/7'
  },
  {
    id: 'montreal-shelter',
    nameZh: '蒙特利尔妇女庇护所',
    nameEn: 'Maison de la femme Montreal',
    phone: '514-872-0364',
    city: 'Montreal',
    province: 'Quebec',
    provinceCode: 'QC',
    type: 'shelter',
    languages: ['French', 'English', '中文'],
    descriptionZh: '蒙特利尔妇女紧急庇护服务。',
    descriptionEn: 'Emergency shelter for women in Montreal.',
    hours: '24/7'
  },
  {
    id: 'qc-relation-violence',
    nameZh: '魁北克家庭暴力热线',
    nameEn: 'Quebec Violence Against Women Line',
    phone: '1-800-363-9010',
    city: 'Montreal',
    province: 'Quebec',
    provinceCode: 'QC',
    type: 'crisis',
    languages: ['French', 'English'],
    descriptionZh: '针对妇女的家庭暴力支持热线。',
    descriptionEn: 'Violence against women support helpline.',
    hours: '24/7'
  },

  // === ALBERTA ===
  {
    id: 'legal-aid-alberta',
    nameZh: '亚省法律援助',
    nameEn: 'Legal Aid Alberta',
    phone: '1-866-845-3425',
    city: 'Calgary',
    province: 'Alberta',
    provinceCode: 'AB',
    type: 'legal',
    languages: ['English'],
    descriptionZh: '亚省法律援助服务。',
    descriptionEn: 'Alberta legal aid services.',
    website: 'https://legalaid.alberta.ca',
    hours: 'Mon-Fri 8:15am-4:30pm'
  },
  {
    id: 'alberta-crisis',
    nameZh: '亚省危机热线',
    nameEn: 'Alberta Crisis Line',
    phone: '1-800-784-2433',
    city: 'Calgary',
    province: 'Alberta',
    provinceCode: 'AB',
    type: 'crisis',
    languages: ['English', 'French'],
    descriptionZh: '亚省24小时危机支持和自杀预防。',
    descriptionEn: 'Alberta 24-hour crisis support and suicide prevention.',
    hours: '24/7'
  },
  {
    id: 'calgary-shelter',
    nameZh: '卡尔加里妇女庇护中心',
    nameEn: 'Calgary Women\'s Emergency Shelter',
    phone: '403-234-7233',
    city: 'Calgary',
    province: 'Alberta',
    provinceCode: 'AB',
    type: 'shelter',
    languages: ['English', '中文'],
    descriptionZh: '卡尔加里家庭暴力受害妇女紧急庇护。',
    descriptionEn: 'Emergency shelter for domestic violence victims in Calgary.',
    hours: '24/7'
  },
  {
    id: 'edmonton-shelter',
    nameZh: '埃德蒙顿妇女庇护所',
    nameEn: 'Edmonton Women\'s Shelter',
    phone: '780-477-5770',
    city: 'Edmonton',
    province: 'Alberta',
    provinceCode: 'AB',
    type: 'shelter',
    languages: ['English'],
    descriptionZh: '埃德蒙顿妇女和儿童紧急庇护。',
    descriptionEn: 'Emergency shelter for women and children in Edmonton.',
    hours: '24/7'
  },
  {
    id: 'calgary-crisis',
    nameZh: '卡尔加里危机热线',
    nameEn: 'Calgary Crisis Line',
    phone: '403-266-4357',
    city: 'Calgary',
    province: 'Alberta',
    provinceCode: 'AB',
    type: 'crisis',
    languages: ['English'],
    descriptionZh: '卡尔加里地区危机支持。',
    descriptionEn: 'Crisis support for Calgary area.',
    hours: '24/7'
  },

  // === MANITOBA ===
  {
    id: 'legal-aid-manitoba',
    nameZh: '曼省法律援助',
    nameEn: 'Legal Aid Manitoba',
    phone: '204-985-8500',
    city: 'Winnipeg',
    province: 'Manitoba',
    provinceCode: 'MB',
    type: 'legal',
    languages: ['English'],
    descriptionZh: '曼省法律援助服务。',
    descriptionEn: 'Manitoba legal aid services.',
    website: 'https://legalaid.mb.ca',
    hours: 'Mon-Fri 8:30am-4:30pm'
  },
  {
    id: 'manitoba-crisis',
    nameZh: '曼省危机热线',
    nameEn: 'Manitoba Crisis Line',
    phone: '1-877-435-2240',
    city: 'Winnipeg',
    province: 'Manitoba',
    provinceCode: 'MB',
    type: 'crisis',
    languages: ['English'],
    descriptionZh: '曼省危机支持和自杀预防。',
    descriptionEn: 'Manitoba crisis support and suicide prevention.',
    hours: '24/7'
  },
  {
    id: 'winnipeg-shelter',
    nameZh: '温尼伯妇女庇护所',
    nameEn: 'Winnipeg Women\'s Shelter',
    phone: '204-786-5556',
    city: 'Winnipeg',
    province: 'Manitoba',
    provinceCode: 'MB',
    type: 'shelter',
    languages: ['English'],
    descriptionZh: '温尼伯妇女紧急庇护。',
    descriptionEn: 'Emergency shelter for women in Winnipeg.',
    hours: '24/7'
  },

  // === SASKATCHEWAN ===
  {
    id: 'legal-aid-sask',
    nameZh: '萨省法律援助',
    nameEn: 'Legal Aid Saskatchewan',
    phone: '1-800-667-3764',
    city: 'Saskatoon',
    province: 'Saskatchewan',
    provinceCode: 'SK',
    type: 'legal',
    languages: ['English'],
    descriptionZh: '萨省法律援助服务。',
    descriptionEn: 'Saskatchewan legal aid services.',
    hours: 'Mon-Fri 8am-5pm'
  },
  {
    id: 'sask-crisis',
    nameZh: '萨省危机热线',
    nameEn: 'Saskatchewan Crisis Line',
    phone: '1-800-667-7530',
    city: 'Saskatoon',
    province: 'Saskatchewan',
    provinceCode: 'SK',
    type: 'crisis',
    languages: ['English'],
    descriptionZh: '萨省危机支持和自杀预防。',
    descriptionEn: 'Saskatchewan crisis support and suicide prevention.',
    hours: '24/7'
  },
  {
    id: 'saskatoon-shelter',
    nameZh: '萨斯卡通妇女庇护所',
    nameEn: 'Saskatoon Women\'s Shelter',
    phone: '306-244-1045',
    city: 'Saskatoon',
    province: 'Saskatchewan',
    provinceCode: 'SK',
    type: 'shelter',
    languages: ['English'],
    descriptionZh: '萨斯卡通妇女紧急庇护。',
    descriptionEn: 'Emergency shelter for women in Saskatoon.',
    hours: '24/7'
  },
  {
    id: 'regina-shelter',
    nameZh: '里贾纳妇女庇护所',
    nameEn: 'Regina Women\'s Shelter',
    phone: '306-545-0555',
    city: 'Regina',
    province: 'Saskatchewan',
    provinceCode: 'SK',
    type: 'shelter',
    languages: ['English'],
    descriptionZh: '里贾纳妇女紧急庇护。',
    descriptionEn: 'Emergency shelter for women in Regina.',
    hours: '24/7'
  },

  // === NOVA SCOTIA ===
  {
    id: 'legal-aid-ns',
    nameZh: '新省法律援助',
    nameEn: 'Legal Aid Nova Scotia',
    phone: '1-877-430-4607',
    city: 'Halifax',
    province: 'Nova Scotia',
    provinceCode: 'NS',
    type: 'legal',
    languages: ['English'],
    descriptionZh: '新斯科舍省法律援助。',
    descriptionEn: 'Nova Scotia legal aid services.',
    hours: 'Mon-Fri 8:30am-4:30pm'
  },
  {
    id: 'ns-crisis',
    nameZh: '新省危机热线',
    nameEn: 'Nova Scotia Crisis Line',
    phone: '1-888-429-8167',
    city: 'Halifax',
    province: 'Nova Scotia',
    provinceCode: 'NS',
    type: 'crisis',
    languages: ['English'],
    descriptionZh: '新斯科舍省危机支持。',
    descriptionEn: 'Nova Scotia crisis support.',
    hours: '24/7'
  },
  {
    id: 'halifax-shelter',
    nameZh: '哈利法克斯妇女庇护所',
    nameEn: 'Halifax Women\'s Shelter',
    phone: '902-423-9953',
    city: 'Halifax',
    province: 'Nova Scotia',
    provinceCode: 'NS',
    type: 'shelter',
    languages: ['English'],
    descriptionZh: '哈利法克斯妇女紧急庇护。',
    descriptionEn: 'Emergency shelter for women in Halifax.',
    hours: '24/7'
  },

  // === NEW BRUNSWICK ===
  {
    id: 'legal-aid-nb',
    nameZh: 'NB省法律援助',
    nameEn: 'Legal Aid New Brunswick',
    phone: '1-800-332-3600',
    city: 'Moncton',
    province: 'New Brunswick',
    provinceCode: 'NB',
    type: 'legal',
    languages: ['English', 'French'],
    descriptionZh: '新不伦瑞克省法律援助。',
    descriptionEn: 'New Brunswick legal aid services.',
    hours: 'Mon-Fri 8am-4:30pm'
  },
  {
    id: 'nb-crisis',
    nameZh: 'NB省危机热线',
    nameEn: 'New Brunswick Crisis Line',
    phone: '1-800-667-5000',
    city: 'Moncton',
    province: 'New Brunswick',
    provinceCode: 'NB',
    type: 'crisis',
    languages: ['English', 'French'],
    descriptionZh: '新不伦瑞克省危机支持。',
    descriptionEn: 'New Brunswick crisis support.',
    hours: '24/7'
  },
  {
    id: 'moncton-shelter',
    nameZh: '蒙克顿妇女庇护所',
    nameEn: 'Moncton Women\'s Shelter',
    phone: '506-853-9484',
    city: 'Moncton',
    province: 'New Brunswick',
    provinceCode: 'NB',
    type: 'shelter',
    languages: ['English', 'French'],
    descriptionZh: '蒙克顿妇女紧急庇护。',
    descriptionEn: 'Emergency shelter for women in Moncton.',
    hours: '24/7'
  },

  // === NEWFOUNDLAND ===
  {
    id: 'legal-aid-nl',
    nameZh: 'NL省法律援助',
    nameEn: 'Legal Aid Newfoundland',
    phone: '1-800-563-5808',
    city: "St. John's",
    province: 'Newfoundland and Labrador',
    provinceCode: 'NL',
    type: 'legal',
    languages: ['English'],
    descriptionZh: '纽芬兰省法律援助。',
    descriptionEn: 'Newfoundland legal aid services.',
    hours: 'Mon-Fri 9am-5pm'
  },
  {
    id: 'nl-crisis',
    nameZh: 'NL省危机热线',
    nameEn: 'Newfoundland Crisis Line',
    phone: '1-888-737-2000',
    city: "St. John's",
    province: 'Newfoundland and Labrador',
    provinceCode: 'NL',
    type: 'crisis',
    languages: ['English'],
    descriptionZh: '纽芬兰省危机支持。',
    descriptionEn: 'Newfoundland crisis support.',
    hours: '24/7'
  },
  {
    id: 'stjohns-shelter',
    nameZh: '圣约翰斯妇女庇护所',
    nameEn: "St. John's Women's Shelter",
    phone: '709-726-5087',
    city: "St. John's",
    province: 'Newfoundland and Labrador',
    provinceCode: 'NL',
    type: 'shelter',
    languages: ['English'],
    descriptionZh: '圣约翰斯妇女紧急庇护。',
    descriptionEn: "Emergency shelter for women in St. John's.",
    hours: '24/7'
  },
];

// Helper functions
export function getResourcesByCity(city: string): CanadaResource[] {
  return canadaResources.filter(
    r => r.city.toLowerCase() === city.toLowerCase() || r.isNational
  );
}

export function getResourcesByProvince(provinceCode: string): CanadaResource[] {
  return canadaResources.filter(
    r => r.provinceCode === provinceCode || r.isNational
  );
}

export function getProvinceFromCity(city: string): string | null {
  const cityMap: Record<string, string> = {
    vancouver: 'BC', victoria: 'BC', surrey: 'BC', burnaby: 'BC', richmond: 'BC',
    toronto: 'ON', ottawa: 'ON', mississauga: 'ON', brampton: 'ON', hamilton: 'ON', london: 'ON', kitchener: 'ON',
    montreal: 'QC', quebec: 'QC', laval: 'QC', gatineau: 'QC',
    calgary: 'AB', edmonton: 'AB', 'red deer': 'AB',
    winnipeg: 'MB',
    saskatoon: 'SK', regina: 'SK',
    halifax: 'NS',
    moncton: 'NB', 'saint john': 'NB',
    charlottetown: 'PE',
    'st. johns': 'NL',
  };
  return cityMap[city.toLowerCase()] || null;
}

export const majorCities = [
  { city: 'Vancouver', province: 'British Columbia', provinceCode: 'BC' },
  { city: 'Victoria', province: 'British Columbia', provinceCode: 'BC' },
  { city: 'Surrey', province: 'British Columbia', provinceCode: 'BC' },
  { city: 'Burnaby', province: 'British Columbia', provinceCode: 'BC' },
  { city: 'Richmond', province: 'British Columbia', provinceCode: 'BC' },
  { city: 'Toronto', province: 'Ontario', provinceCode: 'ON' },
  { city: 'Ottawa', province: 'Ontario', provinceCode: 'ON' },
  { city: 'Mississauga', province: 'Ontario', provinceCode: 'ON' },
  { city: 'Brampton', province: 'Ontario', provinceCode: 'ON' },
  { city: 'Hamilton', province: 'Ontario', provinceCode: 'ON' },
  { city: 'London', province: 'Ontario', provinceCode: 'ON' },
  { city: 'Kitchener', province: 'Ontario', provinceCode: 'ON' },
  { city: 'Montreal', province: 'Quebec', provinceCode: 'QC' },
  { city: 'Quebec City', province: 'Quebec', provinceCode: 'QC' },
  { city: 'Laval', province: 'Quebec', provinceCode: 'QC' },
  { city: 'Gatineau', province: 'Quebec', provinceCode: 'QC' },
  { city: 'Calgary', province: 'Alberta', provinceCode: 'AB' },
  { city: 'Edmonton', province: 'Alberta', provinceCode: 'AB' },
  { city: 'Red Deer', province: 'Alberta', provinceCode: 'AB' },
  { city: 'Winnipeg', province: 'Manitoba', provinceCode: 'MB' },
  { city: 'Saskatoon', province: 'Saskatchewan', provinceCode: 'SK' },
  { city: 'Regina', province: 'Saskatchewan', provinceCode: 'SK' },
  { city: 'Halifax', province: 'Nova Scotia', provinceCode: 'NS' },
  { city: 'Moncton', province: 'New Brunswick', provinceCode: 'NB' },
  { city: 'Saint John', province: 'New Brunswick', provinceCode: 'NB' },
  { city: 'Charlottetown', province: 'PEI', provinceCode: 'PE' },
  { city: "St. John's", province: 'Newfoundland', provinceCode: 'NL' },
];