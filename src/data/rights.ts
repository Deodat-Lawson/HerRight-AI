export interface RightsCard {
  id: string;
  titleZh: string;
  titleHant?: string;
  titleEn: string;
  contentZh: string;
  contentHant?: string;
  contentEn: string;
  sourceZh: string;
  sourceHant?: string;
  sourceEn: string;
}

export const rightsCards: RightsCard[] = [
  {
    id: 'pr-status',
    titleZh: '离婚不会取消你的PR身份',
    titleEn: 'Divorce does not cancel your PR status',
    contentZh: '一旦你获得永久居民身份，离婚不会导致身份被撤销。你的PR身份属于你自己。',
    contentEn: 'Once you have permanent residency, divorce cannot revoke your status. Your PR status belongs to you.',
    sourceZh: '《移民和难民保护法》',
    sourceEn: 'Immigration and Refugee Protection Act'
  },
  {
    id: 'property-division',
    titleZh: '婚姻财产通常平分',
    titleEn: 'Marital property is generally split equally',
    contentZh: '根据加拿大婚姻财产法，婚姻期间积累的房屋、储蓄和资产通常平均分配——即使都在对方名下。',
    contentEn: 'Under Canadian family law, the home, savings, and assets built during the marriage are usually divided 50/50—even if everything is in his name.',
    sourceZh: '《家庭法》',
    sourceEn: 'Family Law Act'
  },
  {
    id: 'children-canada',
    titleZh: '你的孩子不能被带出加拿大',
    titleEn: 'Your children cannot be taken out of Canada without permission',
    contentZh: '未经另一方父母同意或法院命令，任何人都不可以将孩子带出加拿大。你可以向法院申请阻止此行为。',
    contentEn: 'A parent cannot remove children from Canada without consent from the other parent or a court order. You can apply to the court to prevent this.',
    sourceZh: '《家庭法》第97条',
    sourceEn: 'Family Law Act, Section 97'
  },
  {
    id: 'protection-order',
    titleZh: '你可以申请人身保护令',
    titleEn: 'You can apply for a protection order',
    contentZh: '如果你面临暴力威胁，可以向法院申请人身保护令，禁止对方接近你或你的孩子。',
    contentEn: 'If you face violence threats, you can apply to the court for a protection order prohibiting the other person from approaching you or your children.',
    sourceZh: '《家庭法》第46条',
    sourceEn: 'Family Law Act, Section 46'
  },
  {
    id: 'legal-aid',
    titleZh: '你可能符合法律援助资格',
    titleEn: 'You may qualify for legal aid',
    contentZh: '即使收入不高，你仍然可以获得免费的法律援助。联系你所在省份的法律援助机构了解详情。',
    contentEn: 'Even with low income, you can still get free legal aid. Contact your province\'s legal aid office for details.',
    sourceZh: '各省法律援助法规',
    sourceEn: 'Provincial Legal Aid Acts'
  }
];