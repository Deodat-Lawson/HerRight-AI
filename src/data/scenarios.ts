export interface Scenario {
  id: string;
  titleZh: string;
  titleEn: string;
  icon: string;
  steps: {
    zh: string;
    en: string;
  }[];
}

export const scenarios: Scenario[] = [
  {
    id: 'money-control',
    titleZh: '…我的丈夫控制所有钱',
    titleEn: '…my husband controls all the money',
    icon: '💰',
    steps: [
      {
        zh: '确保当前安全。如果需要立即帮助，请拨打911或联系当地妇女庇护所。',
        en: 'Make sure you are safe right now. If you need immediate help, call 911 or contact your local women\'s shelter.'
      },
      {
        zh: '保存证据：拍照或记录对方控制财务的证据，包括银行账户、房产、车辆等。',
        en: 'Save evidence: Take photos or document evidence of financial control, including bank accounts, property, vehicles, etc.'
      },
      {
        zh: '联系法律援助：BC省法律援助中心电话 1-866-577-2525，提供低收入法律帮助。',
        en: 'Contact legal aid: BC Legal Aid phone 1-866-577-2525, provides low-income legal help.'
      },
      {
        zh: '开设自己的银行账户：皇家银行、帝国商业银行等都有会说中文的工作人员。',
        en: 'Open your own bank account: RBC, CIBC and other banks have Chinese-speaking staff.'
      },
      {
        zh: '联系华人妇女组织：中侨互助会、S.U.C.C.E.S.S.等提供中文支持服务。',
        en: 'Contact Chinese women\'s organizations: S.U.C.C.E.S.S., MOSAIC and other organizations provide Chinese-language support.'
      }
    ]
  },
  {
    id: 'take-children',
    titleZh: '…我担心丈夫会把孩子带回中国',
    titleEn: '…I\'m afraid my husband will take the children back to China',
    icon: '👶',
    steps: [
      {
        zh: '确保当前安全。如果感到紧迫危险，请立即拨打911。',
        en: 'Make sure you are safe right now. If you feel in imminent danger, call 911 immediately.'
      },
      {
        zh: '保存证据：保留孩子的护照、出生证明、旅行文件，并记录任何出行计划或威胁。',
        en: 'Save evidence: Keep children\'s passports, birth certificates, travel documents, and document any travel plans or threats.'
      },
      {
        zh: '向法院申请旅行禁令：向BC省最高法院申请禁止令，防止孩子被带出加拿大。',
        en: 'Apply for a travel ban: Apply to BC Supreme Court for an injunction to prevent children from being taken out of Canada.'
      },
      {
        zh: '联系法律援助：紧急情况下，法律援助可以提供快速帮助。',
        en: 'Contact legal aid: In emergency situations, legal aid can provide quick assistance.'
      },
      {
        zh: '通知孩子的学校和日托：告知他们未经你的书面许可，孩子不能被接走。',
        en: 'Notify your children\'s school and daycare: Inform them that children cannot be picked up without your written permission.'
      },
      {
        zh: '联系中侨互助会：他们可以提供中文心理支持和法律资源转介。',
        en: 'Contact S.U.C.C.E.S.S.: They can provide Chinese-language psychological support and legal resource referrals.'
      }
    ]
  },
  {
    id: 'violence',
    titleZh: '…我的伴侣在殴打我',
    titleEn: '…my partner is hitting me',
    icon: '🏥',
    steps: [
      {
        zh: '确保当前安全首要任务。如果可能受伤，立即拨打911。',
        en: 'Make sure you are safe right now. Your first priority. If you may be injured, call 911 immediately.'
      },
      {
        zh: '就医并保存证据：去医院或诊所就诊，告诉医生受伤原因，要求记录伤情。',
        en: 'Seek medical help and save evidence: Go to a hospital or clinic, tell the doctor how you were injured, and ask them to document your injuries.'
      },
      {
        zh: '申请人身保护令：向BC省法院申请禁止令，禁止对方接近你和孩子。',
        en: 'Apply for a protection order: Apply to BC Court for a restraining order prohibiting the other person from approaching you and your children.'
      },
      {
        zh: '联系妇女庇护所：BC省有多家安全庇护所，提供保密住宿和帮助。',
        en: 'Contact women\'s shelters: BC has several safe shelters that provide confidential accommodation and help.'
      },
      {
        zh: '联系法律援助：家庭暴力受害者可以获得免费法律帮助。',
        en: 'Contact legal aid: Family violence victims can get free legal help.'
      },
      {
        zh: '联系中侨家庭服务中心：提供中文家庭暴力支持服务。',
        en: 'Contact S.U.C.C.E.S.S. Family Services: Provides Chinese-language family violence support services.'
      }
    ]
  }
];