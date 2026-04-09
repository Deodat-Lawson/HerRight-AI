export interface Resource {
  id: string;
  nameZh: string;
  nameEn: string;
  phone: string;
  address: string;
  city: string;
  type: 'legal' | 'shelter' | 'lawyer' | 'mental' | 'settlement' | 'crisis';
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
  },

  // ===== Toronto ===== (sources: assaultedwomenshelpline.ca, intervalhouse.ca, csalc.ca, ernestines.ca)
  {
    id: 'assaulted-womens-helpline',
    nameZh: '受虐妇女求助热线',
    nameEn: 'Assaulted Women\'s Helpline',
    phone: '1-866-863-7868',
    address: 'PO Box 40569, Six Points Plaza, Toronto, ON M9B 6K8',
    city: 'Toronto',
    type: 'shelter',
    languages: ['English', '中文', '200+ languages'],
    descriptionZh: '24小时多语言危机热线，为遭受虐待的妇女提供咨询、转介及庇护所安排。',
    descriptionEn: '24/7 multilingual crisis line offering counselling, referrals and shelter intake for abused women.'
  },
  {
    id: 'interval-house-toronto',
    nameZh: '多伦多Interval House',
    nameEn: 'Interval House',
    phone: '416-924-1491',
    address: '电话服务，无实体地址',
    city: 'Toronto',
    type: 'shelter',
    languages: ['English'],
    descriptionZh: '加拿大首间妇女庇护所之一，24小时危机热线及紧急住宿。',
    descriptionEn: 'One of Canada\'s first shelters for abused women; 24/7 crisis line and emergency housing.'
  },
  {
    id: 'ernestines-shelter',
    nameZh: 'Ernestine妇女庇护所',
    nameEn: 'Ernestine\'s Women\'s Shelter',
    phone: '416-746-3701',
    address: '电话服务，无实体地址',
    city: 'Toronto',
    type: 'shelter',
    languages: ['English'],
    descriptionZh: '由女性运营的庇护所，为逃离暴力的妇女和儿童提供支援。',
    descriptionEn: 'Women-run shelter providing support and refuge for women and children fleeing violence.'
  },
  {
    id: 'csalc',
    nameZh: '华人和东南亚法律援助处',
    nameEn: 'Chinese and Southeast Asian Legal Clinic (CSALC)',
    phone: '1-844-971-9674',
    address: '180 Dundas St W, Toronto, ON',
    city: 'Toronto',
    type: 'legal',
    languages: ['普通话', '粤语', 'Vietnamese', 'Khmer', 'Lao', 'English'],
    descriptionZh: '由安省法律援助资助，为华人及东南亚低收入人士提供移民、雇佣及福利法律服务。',
    descriptionEn: 'Legal Aid Ontario-funded clinic offering immigration, employment and benefits law for low-income Chinese and Southeast Asian communities.'
  },
  {
    id: 'legal-aid-ontario',
    nameZh: '安大略法律援助',
    nameEn: 'Legal Aid Ontario',
    phone: '1-800-668-8258',
    address: '40 Dundas St W, Toronto, ON',
    city: 'Toronto',
    type: 'legal',
    languages: ['English', '中文', 'Français'],
    descriptionZh: '为低收入人士提供免费法律援助，包括家庭法、移民法和刑事法。',
    descriptionEn: 'Free legal aid for low-income individuals in family, immigration, and criminal law.'
  },

  // ===== Montreal ===== (sources: sosviolenceconjugale.ca, 211qc.ca)
  {
    id: 'sos-violence-conjugale',
    nameZh: 'SOS家庭暴力',
    nameEn: 'SOS Violence Conjugale',
    phone: '1-800-363-9010',
    address: 'PO Box 55, Station C, Montreal, QC H2L 4J7',
    city: 'Montreal',
    type: 'shelter',
    languages: ['Français', 'English'],
    descriptionZh: '魁北克24小时家庭暴力危机热线，提供保密、双语的支援和庇护转介；短讯：438-601-1211。',
    descriptionEn: 'Quebec 24/7 bilingual, confidential domestic violence helpline with shelter referrals; text 438-601-1211.'
  },

  // ===== Calgary ===== (sources: calgarywomensshelter.com, calgarylegalguidance.ca, ciwa-online.com)
  {
    id: 'calgary-womens-emergency-shelter',
    nameZh: '卡尔加里妇女紧急庇护所',
    nameEn: 'Calgary Women\'s Emergency Shelter (FearIsNotLove)',
    phone: '403-234-7233',
    address: '电话服务，无实体地址',
    city: 'Calgary',
    type: 'shelter',
    languages: ['English'],
    descriptionZh: '24小时家庭暴力危机热线及紧急庇护，免费提供给妇女及其家庭。',
    descriptionEn: '24-hour family violence crisis line and emergency shelter, free to women and their families.'
  },
  {
    id: 'calgary-legal-guidance',
    nameZh: '卡尔加里法律指导中心',
    nameEn: 'Calgary Legal Guidance',
    phone: '403-234-9266',
    address: 'Calgary, AB',
    city: 'Calgary',
    type: 'legal',
    languages: ['English'],
    descriptionZh: '为低收入卡尔加里居民提供免费法律咨询、信息及倡导服务。',
    descriptionEn: 'Free legal information, advice, and advocacy for low-income Calgarians.'
  },
  {
    id: 'ciwa',
    nameZh: '卡尔加里移民妇女协会',
    nameEn: 'Calgary Immigrant Women\'s Association (CIWA)',
    phone: '403-263-4414',
    address: '750-999 8 St SW, Calgary, AB',
    city: 'Calgary',
    type: 'settlement',
    languages: ['English', '普通话', '粤语', 'Hindi', 'Arabic', '+more'],
    descriptionZh: '为移民妇女及其家庭提供安置、就业、辅导和家庭暴力支持服务。',
    descriptionEn: 'Settlement, employment, counselling and family violence support for immigrant women and their families.'
  },

  // ===== Edmonton ===== (sources: winhouse.org)
  {
    id: 'win-house-edmonton',
    nameZh: 'WIN House埃德蒙顿妇女庇护所',
    nameEn: 'WIN House (Edmonton Women\'s Shelter)',
    phone: '780-479-0058',
    address: 'PO Box 20088 RPO Beverly, Edmonton, AB T5W 5E6',
    city: 'Edmonton',
    type: 'shelter',
    languages: ['English'],
    descriptionZh: '24小时求助热线，为逃离暴力的妇女、儿童和非二元性别人士提供三间庇护所共71张床位。',
    descriptionEn: '24-hour helpline; three shelters with 71 beds for women, children and non-binary people fleeing violence.'
  },

  // ===== Ottawa ===== (sources: intervalhouseottawa.org, harmonyhousews.com, nelsonhouse.on.ca)
  {
    id: 'interval-house-ottawa',
    nameZh: '渥太华Interval House',
    nameEn: 'Interval House of Ottawa',
    phone: '613-234-5181',
    address: '电话服务，无实体地址',
    city: 'Ottawa',
    type: 'shelter',
    languages: ['English', 'Français'],
    descriptionZh: '渥太华首间妇女庇护所，24小时危机热线，为妇女、儿童及宠物提供安全空间。',
    descriptionEn: 'Ottawa\'s first women\'s shelter; 24/7 crisis line offering safety for women, children, and pets.'
  },
  {
    id: 'nelson-house-ottawa',
    nameZh: '渥太华Nelson House',
    nameEn: 'Nelson House of Ottawa Carleton',
    phone: '613-695-5980',
    address: '电话服务，无实体地址',
    city: 'Ottawa',
    type: 'shelter',
    languages: ['English', 'Français'],
    descriptionZh: '为受家庭暴力影响的妇女和儿童提供紧急庇护和支援。',
    descriptionEn: 'Emergency shelter and support for women and children affected by family violence.'
  },
  {
    id: 'harmony-house-ottawa',
    nameZh: '渥太华Harmony House',
    nameEn: 'Harmony House Shelter',
    phone: '613-233-3386',
    address: '电话服务，无实体地址',
    city: 'Ottawa',
    type: 'shelter',
    languages: ['English', 'Français'],
    descriptionZh: '渥太华唯一的二级庇护所，为暴力幸存者提供过渡性住房并协助寻找律师及法律援助。',
    descriptionEn: 'Ottawa\'s only second-stage shelter; transitional housing plus help finding lawyers and legal aid.'
  },

  // ===== Winnipeg ===== (sources: willowplaceshelter.ca, legalaid.mb.ca)
  {
    id: 'willow-place-winnipeg',
    nameZh: '温尼伯Willow Place',
    nameEn: 'Willow Place (Winnipeg)',
    phone: '204-615-0311',
    address: '电话服务，无实体地址',
    city: 'Winnipeg',
    type: 'shelter',
    languages: ['English'],
    descriptionZh: '马尼托巴最大的妇女庇护所（45床），24小时支援家庭暴力受害者；短讯：204-792-5302。',
    descriptionEn: 'Manitoba\'s largest women\'s shelter (45 beds); 24-hour support for domestic violence victims; text 204-792-5302.'
  },
  {
    id: 'manitoba-domestic-abuse-line',
    nameZh: '马尼托巴家庭暴力危机热线',
    nameEn: 'Manitoba Domestic Abuse Crisis Line',
    phone: '1-877-977-0007',
    address: '电话服务，无实体地址',
    city: 'Winnipeg',
    type: 'shelter',
    languages: ['English', 'Français'],
    descriptionZh: '马尼托巴省24小时免费家庭暴力危机热线。',
    descriptionEn: 'Province-wide 24-hour toll-free domestic abuse crisis line for Manitoba.'
  },
  {
    id: 'legal-aid-manitoba',
    nameZh: '马尼托巴法律援助',
    nameEn: 'Legal Aid Manitoba',
    phone: '204-985-8500',
    address: '402-294 Portage Ave, Winnipeg, MB',
    city: 'Winnipeg',
    type: 'legal',
    languages: ['English', 'Français'],
    descriptionZh: '为符合资格的低收入居民提供法律服务，并到庇护所、医院和危机中心受理申请。',
    descriptionEn: 'Legal services for eligible low-income residents; intake available at shelters, hospitals and crisis centres.'
  },

  // ===== Halifax ===== (sources: avaloncentre.ca, bryonyhouse.ca, adsumforwomen.org)
  {
    id: 'bryony-house',
    nameZh: 'Bryony House妇女庇护所',
    nameEn: 'Bryony House',
    phone: '902-422-7650',
    address: 'Halifax, NS',
    city: 'Halifax',
    type: 'shelter',
    languages: ['English'],
    descriptionZh: '哈利法克斯过渡之家，为逃离家庭暴力的妇女及其子女提供紧急庇护。',
    descriptionEn: 'Halifax transition house providing emergency shelter for women and children leaving abuse.'
  },
  {
    id: 'adsum-house',
    nameZh: 'Adsum妇女儿童中心',
    nameEn: 'Adsum for Women & Children',
    phone: '902-423-4443',
    address: 'Halifax, NS',
    city: 'Halifax',
    type: 'shelter',
    languages: ['English'],
    descriptionZh: '为无家可归或面临住房危机的妇女、儿童和跨性别人士提供庇护和住房支援。',
    descriptionEn: 'Shelter and housing support for women, children, and trans people experiencing homelessness.'
  },
  {
    id: 'avalon-sexual-assault',
    nameZh: 'Avalon性暴力中心',
    nameEn: 'Avalon Sexual Assault Centre',
    phone: '902-425-0122',
    address: '1526 Dresden Row, Suite 401, Halifax, NS B3J 3K3',
    city: 'Halifax',
    type: 'mental',
    languages: ['English'],
    descriptionZh: '为15岁以上性暴力幸存者提供免费危机热线、创伤治疗和法律支援。',
    descriptionEn: 'Free crisis line, trauma therapy and legal support for sexual assault survivors aged 15+.'
  },
  {
    id: 'ns-legal-aid',
    nameZh: '新斯科舍法律援助',
    nameEn: 'Nova Scotia Legal Aid',
    phone: '902-420-6583',
    address: '5475 Spring Garden Rd, Halifax, NS',
    city: 'Halifax',
    type: 'legal',
    languages: ['English'],
    descriptionZh: '为低收入新斯科舍居民提供家庭法和刑事法律援助。',
    descriptionEn: 'Family and criminal legal aid for low-income Nova Scotia residents.'
  },

  // ===== Victoria ===== (sources: cridge.org, transitionhouse.net, vsac.ca)
  {
    id: 'cridge-transition-house',
    nameZh: 'Cridge妇女过渡之家',
    nameEn: 'Cridge Transition House for Women',
    phone: '250-479-3963',
    address: 'Victoria, BC',
    city: 'Victoria',
    type: 'shelter',
    languages: ['English'],
    descriptionZh: '为带或不带子女、逃离家庭暴力的妇女提供24小时安全庇护。',
    descriptionEn: '24-hour safe shelter for women, with or without children, fleeing violence at home.'
  },
  {
    id: 'victoria-womens-transition-house',
    nameZh: '维多利亚妇女过渡之家',
    nameEn: 'Victoria Women\'s Transition House',
    phone: '250-385-6611',
    address: 'PO Box 8084, Victoria, BC V8W 3R7',
    city: 'Victoria',
    type: 'shelter',
    languages: ['English'],
    descriptionZh: '24小时危机及信息热线，并为遭受虐待的妇女及子女提供庇护和辅导。',
    descriptionEn: '24/7 crisis and information line, shelter and counselling for abused women and their children.'
  },
  {
    id: 'victoria-sexual-assault-centre',
    nameZh: '维多利亚性侵犯中心',
    nameEn: 'Victoria Sexual Assault Centre',
    phone: '250-383-3232',
    address: '#201 - 3060 Cedar Hill Rd, Victoria, BC',
    city: 'Victoria',
    type: 'mental',
    languages: ['English'],
    descriptionZh: '为性暴力幸存者提供危机干预、辅导及司法陪伴服务。',
    descriptionEn: 'Crisis intervention, counselling and justice support for survivors of sexual violence.'
  },
  {
    id: 'victimlink-bc',
    nameZh: 'VictimLink BC受害者求助热线',
    nameEn: 'VictimLink BC',
    phone: '1-800-563-0808',
    address: '电话服务，无实体地址',
    city: 'Victoria',
    type: 'mental',
    languages: ['English', 'Français', '中文', '+多种语言'],
    descriptionZh: '卑诗省与育空24小时免费多语言受害者求助热线，可电话或短讯求助。',
    descriptionEn: 'BC and Yukon 24/7 toll-free multilingual victim helpline; call or text.'
  },

  // ===== Hamilton ===== (sources: intervalhousehamilton.org, mission-services.com, sacha.ca, hamiltonjustice.ca)
  {
    id: 'interval-house-hamilton',
    nameZh: '汉密尔顿Interval House',
    nameEn: 'Interval House of Hamilton',
    phone: '905-387-8881',
    address: '630 Sanatorium Rd, Hamilton, ON',
    city: 'Hamilton',
    type: 'shelter',
    languages: ['English'],
    descriptionZh: '24小时危机热线及紧急庇护，并通过Jared\'s Place提供法律支援服务。',
    descriptionEn: '24/7 crisis line and emergency shelter; legal support via Jared\'s Place.'
  },
  {
    id: 'inasmuch-house',
    nameZh: 'Inasmuch House妇女庇护所',
    nameEn: 'Inasmuch House (Mission Services of Hamilton)',
    phone: '1-833-654-4217',
    address: '81 Stuart St, Hamilton, ON L8L 1B5',
    city: 'Hamilton',
    type: 'shelter',
    languages: ['English'],
    descriptionZh: '为遭受暴力的妇女和儿童提供紧急庇护，24小时危机收容热线。',
    descriptionEn: 'Emergency shelter for women and children fleeing violence; 24-hour crisis intake line.'
  },
  {
    id: 'sacha-hamilton',
    nameZh: '汉密尔顿性侵犯中心',
    nameEn: 'Sexual Assault Centre Hamilton and Area (SACHA)',
    phone: '905-525-4162',
    address: '75 MacNab St S, 3rd Floor, Hamilton, ON L8P 3C1',
    city: 'Hamilton',
    type: 'mental',
    languages: ['English'],
    descriptionZh: '24小时性暴力危机热线、辅导及司法陪伴服务。',
    descriptionEn: '24-hour sexual violence crisis line, counselling, and court support.'
  },
  {
    id: 'hamilton-community-legal-clinic',
    nameZh: '汉密尔顿社区法律诊所',
    nameEn: 'Hamilton Community Legal Clinic',
    phone: '905-527-4572',
    address: '100 Main St E, Suite 203, Hamilton, ON L8N 3W4',
    city: 'Hamilton',
    type: 'legal',
    languages: ['English'],
    descriptionZh: '为低收入居民提供住房、福利、雇佣及移民法律服务。',
    descriptionEn: 'Free legal services in housing, benefits, employment and immigration for low-income residents.'
  },

  // ===== Saskatoon ===== (sources: saskatooncrisis.ca, legalaid.sk.ca)
  {
    id: 'saskatoon-crisis-shelter',
    nameZh: '萨斯卡通危机干预服务',
    nameEn: 'Saskatoon Crisis Intervention Service',
    phone: '306-933-6200',
    address: 'Saskatoon, SK',
    city: 'Saskatoon',
    type: 'shelter',
    languages: ['English'],
    descriptionZh: '为萨斯卡通地区家庭暴力受害妇女提供24小时危机热线和庇护服务。',
    descriptionEn: '24-hour crisis line and shelter for women affected by domestic violence in Saskatoon.'
  },
  {
    id: 'legal-aid-sask',
    nameZh: '萨省法律援助',
    nameEn: 'Legal Aid Saskatchewan',
    phone: '1-800-667-3764',
    address: '502-201 21st St E, Saskatoon, SK',
    city: 'Saskatoon',
    type: 'legal',
    languages: ['English'],
    descriptionZh: '为低收入居民提供家庭法、刑事法和移民法法律援助。',
    descriptionEn: 'Legal aid in family, criminal and immigration law for low-income residents.'
  },

  // ===== Regina ===== (sources: reginawomensshelter.ca, ywcaregina.com)
  {
    id: 'sofia-house-regina',
    nameZh: 'Sofia House妇女庇护所',
    nameEn: 'Sofia House (Regina Transition House)',
    phone: '306-525-2141',
    address: 'Regina, SK',
    city: 'Regina',
    type: 'shelter',
    languages: ['English'],
    descriptionZh: '为遭受家庭暴力的妇女和儿童提供24小时紧急庇护和支援。',
    descriptionEn: '24-hour emergency shelter and support for women and children fleeing domestic violence.'
  },
  {
    id: 'ywca-regina',
    nameZh: 'YWCA里贾纳',
    nameEn: 'YWCA Regina',
    phone: '306-525-2141',
    address: '1940 McIntyre St, Regina, SK',
    city: 'Regina',
    type: 'shelter',
    languages: ['English'],
    descriptionZh: '为妇女和家庭提供庇护服务、过渡性住房和暴力预防项目。',
    descriptionEn: 'Shelter services, transitional housing and violence prevention for women and families.'
  },

  // ===== Mississauga / Brampton ===== (sources: safecenterofpeel.ca, assaultedwomenshelpline.ca)
  {
    id: 'peel-family-shelter',
    nameZh: '皮尔区家庭庇护所',
    nameEn: 'Family Transition Place (Peel Region)',
    phone: '905-450-4650',
    address: 'Mississauga, ON',
    city: 'Mississauga',
    type: 'shelter',
    languages: ['English', 'Punjabi', 'Hindi', 'Urdu'],
    descriptionZh: '为皮尔区家庭暴力受害妇女和儿童提供紧急庇护和支持服务。',
    descriptionEn: 'Emergency shelter and support for women and children fleeing domestic violence in Peel Region.'
  },

  // ===== London ON ===== (sources: legalaid.on.ca, womenscommunityhouse.com)
  {
    id: 'womens-community-house-london',
    nameZh: '伦敦市妇女社区之家',
    nameEn: 'Women\'s Community House (London)',
    phone: '519-642-3000',
    address: 'London, ON',
    city: 'London',
    type: 'shelter',
    languages: ['English'],
    descriptionZh: '为伦敦市及周边地区遭受暴力的妇女和儿童提供庇护和支援。',
    descriptionEn: 'Shelter and support for women and children affected by violence in London and area.'
  },

  // ===== Kitchener-Waterloo ===== (sources: wcswr.org)
  {
    id: 'womens-crisis-services-kw',
    nameZh: '滑铁卢地区妇女危机服务',
    nameEn: 'Women\'s Crisis Services of Waterloo Region',
    phone: '519-742-5894',
    address: 'Kitchener, ON',
    city: 'Kitchener',
    type: 'shelter',
    languages: ['English'],
    descriptionZh: '为滑铁卢地区家庭暴力受害妇女和儿童提供两间庇护所和24小时危机支持。',
    descriptionEn: 'Two shelters and 24-hour crisis support for women and children fleeing domestic violence in Waterloo Region.'
  },

  // ===== Quebec City ===== (sources: maisonfemmes.qc.ca)
  {
    id: 'maison-femmes-quebec',
    nameZh: '魁北克市妇女之家',
    nameEn: 'Maison des femmes de Québec',
    phone: '418-522-0042',
    address: 'Quebec City, QC',
    city: 'Quebec City',
    type: 'shelter',
    languages: ['Français', 'English'],
    descriptionZh: '为魁北克市家庭暴力受害妇女和儿童提供庇护和辅导。',
    descriptionEn: 'Shelter and counselling for women and children fleeing domestic violence in Quebec City.'
  },

  // ===== Saint John NB ===== (sources: thehavenhouse.ca)
  {
    id: 'hestia-house-saint-john',
    nameZh: 'Hestia House妇女庇护所',
    nameEn: 'Hestia House',
    phone: '506-634-7571',
    address: 'Saint John, NB',
    city: 'Saint John',
    type: 'shelter',
    languages: ['English', 'Français'],
    descriptionZh: '为圣约翰地区受家庭暴力影响的妇女和儿童提供紧急庇护。',
    descriptionEn: 'Emergency shelter for women and children affected by family violence in Saint John area.'
  },

  // ===== St. John's NL ===== (sources: iriskirby.com)
  {
    id: 'iris-kirby-house',
    nameZh: 'Iris Kirby House妇女庇护所',
    nameEn: 'Iris Kirby House',
    phone: '709-753-1492',
    address: "St. John's, NL",
    city: "St. John's",
    type: 'shelter',
    languages: ['English'],
    descriptionZh: '纽芬兰最大的妇女庇护所，24小时危机热线和紧急住宿。',
    descriptionEn: "Newfoundland's largest women's shelter; 24-hour crisis line and emergency accommodation."
  },

  // ===== Charlottetown PEI ===== (sources: andersonhouse.ca)
  {
    id: 'anderson-house-pei',
    nameZh: 'Anderson House妇女庇护所',
    nameEn: 'Anderson House',
    phone: '902-892-0960',
    address: 'Charlottetown, PE',
    city: 'Charlottetown',
    type: 'shelter',
    languages: ['English', 'Français'],
    descriptionZh: '为爱德华王子岛受家庭暴力影响的妇女和儿童提供24小时庇护服务。',
    descriptionEn: '24-hour shelter for women and children fleeing domestic violence in PEI.'
  },

  // ===== Whitehorse YT ===== (sources: yukontransitionhome.ca)
  {
    id: 'kaushees-place-whitehorse',
    nameZh: "Kaushee's Place妇女庇护所",
    nameEn: "Kaushee's Place (Yukon Women's Transition Home)",
    phone: '867-668-5733',
    address: 'Whitehorse, YT',
    city: 'Whitehorse',
    type: 'shelter',
    languages: ['English', 'Français'],
    descriptionZh: '育空地区唯一的妇女庇护所，为家庭暴力受害者提供24小时安全住所和支援。',
    descriptionEn: "Yukon's only women's shelter; 24-hour safe housing and support for domestic violence survivors."
  },

  // ===== Yellowknife NT ===== (sources: ywcanwt.ca)
  {
    id: 'ywca-yellowknife',
    nameZh: 'YWCA黄刀镇妇女庇护所',
    nameEn: 'YWCA Yellowknife (Alison McAteer House)',
    phone: '867-873-8257',
    address: 'Yellowknife, NT',
    city: 'Yellowknife',
    type: 'shelter',
    languages: ['English'],
    descriptionZh: '为西北地区家庭暴力受害妇女和儿童提供紧急庇护和危机支援。',
    descriptionEn: 'Emergency shelter and crisis support for women and children fleeing domestic violence in NWT.'
  }
];