// Legal index for HerRight.
//
// Each card has a "headline" source (sourceZh/En — what the small card UI
// already shows) plus an optional `sources` array containing every federal,
// provincial and territorial statute we've verified for that topic. The
// detail page at /rights/[id] renders the full array so users can audit our
// claims and click through to CanLII / laws-lois.justice.gc.ca.
//
// Citations were compiled in 2026-04 from CanLII and the federal Justice
// Laws site. They are point-in-time references — re-verify before relying
// on them in court. If you spot a stale citation, fix the entry here; the
// UI will pick it up automatically.

export type Jurisdiction =
  | 'federal'
  | 'AB' | 'BC' | 'MB' | 'NB' | 'NL' | 'NS'
  | 'NT' | 'NU' | 'ON' | 'PE' | 'QC' | 'SK' | 'YT';

export const JURISDICTION_LABELS: Record<Jurisdiction, { en: string; zh: string }> = {
  federal: { en: 'Federal (Canada)', zh: '联邦（加拿大）' },
  AB: { en: 'Alberta', zh: '艾伯塔省' },
  BC: { en: 'British Columbia', zh: '不列颠哥伦比亚省' },
  MB: { en: 'Manitoba', zh: '马尼托巴省' },
  NB: { en: 'New Brunswick', zh: '新不伦瑞克省' },
  NL: { en: 'Newfoundland and Labrador', zh: '纽芬兰与拉布拉多省' },
  NS: { en: 'Nova Scotia', zh: '新斯科舍省' },
  NT: { en: 'Northwest Territories', zh: '西北地区' },
  NU: { en: 'Nunavut', zh: '努纳武特地区' },
  ON: { en: 'Ontario', zh: '安大略省' },
  PE: { en: 'Prince Edward Island', zh: '爱德华王子岛省' },
  QC: { en: 'Quebec', zh: '魁北克省' },
  SK: { en: 'Saskatchewan', zh: '萨斯喀彻温省' },
  YT: { en: 'Yukon', zh: '育空地区' },
};

export interface LegalSource {
  jurisdiction: Jurisdiction;
  citation: string;
  url?: string;
}

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
  /** Full per-jurisdiction citation index. Rendered on /rights/[id]. */
  sources?: LegalSource[];
}

// ---------------------------------------------------------------------------
// Reusable per-jurisdiction source arrays.
// Pulled from CanLII / laws-lois.justice.gc.ca, verified 2026-04.
// ---------------------------------------------------------------------------

const SRC_PROPERTY_DIVISION: LegalSource[] = [
  { jurisdiction: 'ON', citation: 'Family Law Act, RSO 1990, c F.3, ss 4–5', url: 'https://www.canlii.org/en/on/laws/stat/rso-1990-c-f3/latest/rso-1990-c-f3.html' },
  { jurisdiction: 'QC', citation: 'Civil Code of Québec, CQLR c CCQ-1991, arts 414–426 (family patrimony); arts 448–484 (partnership of acquests)', url: 'https://www.canlii.org/en/qc/laws/stat/cqlr-c-ccq-1991/latest/cqlr-c-ccq-1991.html' },
  { jurisdiction: 'BC', citation: 'Family Law Act, SBC 2011, c 25, s 81', url: 'https://www.canlii.ca/en/bc/laws/stat/sbc-2011-c-25/latest/sbc-2011-c-25.html' },
  { jurisdiction: 'AB', citation: 'Family Property Act, RSA 2000, c F-4.7', url: 'https://www.canlii.ca/en/ab/laws/stat/rsa-2000-c-f-4.7/latest/rsa-2000-c-f-4.7.html' },
  { jurisdiction: 'MB', citation: 'The Family Property Act, CCSM c F25', url: 'https://www.canlii.org/en/mb/laws/stat/ccsm-c-f25/latest/ccsm-c-f25.html' },
  { jurisdiction: 'SK', citation: 'The Family Property Act, SS 1997, c F-6.3', url: 'https://www.canlii.org/en/sk/laws/stat/ss-1997-c-f-6.3/latest/ss-1997-c-f-6.3.html' },
  { jurisdiction: 'NS', citation: 'Matrimonial Property Act, RSNS 1989, c 275', url: 'https://canlii.ca/t/843c' },
  { jurisdiction: 'NB', citation: 'Marital Property Act, SNB 2012, c 107', url: 'https://canlii.ca/t/52kmd' },
  { jurisdiction: 'PE', citation: 'Family Law Act, RSPEI 1988, c F-2.1', url: 'https://canlii.ca/t/8c4r' },
  { jurisdiction: 'NL', citation: 'Family Law Act, RSNL 1990, c F-2', url: 'https://canlii.ca/t/89hr' },
  { jurisdiction: 'YT', citation: 'Family Property and Support Act, RSY 2002, c 83', url: 'https://canlii.ca/t/8568' },
  { jurisdiction: 'NT', citation: 'Family Law Act, SNWT 1997, c 18', url: 'https://canlii.ca/t/52h3j' },
  { jurisdiction: 'NU', citation: 'Family Law Act, SNWT (Nu) 1997, c 18', url: 'https://canlii.ca/t/52p1v' },
];

const SRC_MATRIMONIAL_HOME: LegalSource[] = [
  { jurisdiction: 'federal', citation: 'Family Homes on Reserves and Matrimonial Interests or Rights Act, SC 2013, c 20 (First Nations matrimonial real property)', url: 'https://laws-lois.justice.gc.ca/eng/acts/F-1.2/' },
  { jurisdiction: 'ON', citation: 'Family Law Act, RSO 1990, c F.3, ss 18–26 (Part II — Matrimonial Home)', url: 'https://www.canlii.org/en/on/laws/stat/rso-1990-c-f3/latest/rso-1990-c-f3.html' },
  { jurisdiction: 'QC', citation: 'Civil Code of Québec, arts 401–413 (family residence)', url: 'https://www.canlii.org/en/qc/laws/stat/cqlr-c-ccq-1991/latest/cqlr-c-ccq-1991.html' },
  { jurisdiction: 'BC', citation: 'Family Law Act, SBC 2011, c 25, s 90', url: 'https://www.canlii.ca/en/bc/laws/stat/sbc-2011-c-25/latest/sbc-2011-c-25.html' },
  { jurisdiction: 'AB', citation: 'Family Property Act, RSA 2000, c F-4.7, s 19', url: 'https://www.canlii.ca/en/ab/laws/stat/rsa-2000-c-f-4.7/latest/rsa-2000-c-f-4.7.html' },
  { jurisdiction: 'MB', citation: 'The Homesteads Act, CCSM c H80', url: 'https://www.canlii.org/en/mb/laws/stat/ccsm-c-h80/latest/ccsm-c-h80.html' },
  { jurisdiction: 'SK', citation: 'The Homesteads Act, 1989, SS 1989-90, c H-5.1', url: 'https://www.canlii.org/en/sk/laws/stat/ss-1989-90-c-h-5.1/latest/ss-1989-90-c-h-5.1.html' },
  { jurisdiction: 'NS', citation: 'Matrimonial Property Act, RSNS 1989, c 275, ss 6–11', url: 'https://canlii.ca/t/843c' },
  { jurisdiction: 'NB', citation: 'Marital Property Act, SNB 2012, c 107', url: 'https://canlii.ca/t/52kmd' },
  { jurisdiction: 'PE', citation: 'Family Law Act, RSPEI 1988, c F-2.1, Part III', url: 'https://canlii.ca/t/8c4r' },
  { jurisdiction: 'NL', citation: 'Family Law Act, RSNL 1990, c F-2, Part II', url: 'https://canlii.ca/t/89hr' },
  { jurisdiction: 'YT', citation: 'Family Property and Support Act, RSY 2002, c 83, Part 2', url: 'https://canlii.ca/t/8568' },
  { jurisdiction: 'NT', citation: 'Family Law Act, SNWT 1997, c 18, Part III', url: 'https://canlii.ca/t/52h3j' },
  { jurisdiction: 'NU', citation: 'Family Law Act, SNWT (Nu) 1997, c 18, Part III', url: 'https://canlii.ca/t/52p1v' },
];

const SRC_PROTECTION_ORDER: LegalSource[] = [
  { jurisdiction: 'ON', citation: 'Family Law Act, RSO 1990, c F.3, s 46 (restraining order)', url: 'https://www.canlii.org/en/on/laws/stat/rso-1990-c-f3/latest/rso-1990-c-f3.html' },
  { jurisdiction: 'BC', citation: 'Family Law Act, SBC 2011, c 25, s 183 (protection order)', url: 'https://www.canlii.ca/en/bc/laws/stat/sbc-2011-c-25/latest/sbc-2011-c-25.html' },
  { jurisdiction: 'AB', citation: 'Protection Against Family Violence Act, RSA 2000, c P-27, s 2 (emergency protection order)', url: 'https://www.canlii.ca/en/ab/laws/stat/rsa-2000-c-p-27/latest/rsa-2000-c-p-27.html' },
  { jurisdiction: 'MB', citation: 'The Domestic Violence and Stalking Act, CCSM c D93', url: 'https://www.canlii.org/en/mb/laws/stat/ccsm-c-d93/latest/ccsm-c-d93.html' },
  { jurisdiction: 'SK', citation: 'The Victims of Domestic Violence Act, SS 1994, c V-6.02', url: 'https://www.canlii.org/en/sk/laws/stat/ss-1994-c-v-6.02/latest/ss-1994-c-v-6.02.html' },
  { jurisdiction: 'NS', citation: 'Domestic Violence Intervention Act, SNS 2001, c 29', url: 'https://canlii.ca/t/8506' },
  { jurisdiction: 'NB', citation: 'Intimate Partner Violence Intervention Act, SNB 2017, c 5', url: 'https://canlii.ca/t/53203' },
  { jurisdiction: 'PE', citation: 'Victims of Family Violence Act, RSPEI 1988, c V-3.2', url: 'https://canlii.ca/t/8c7v' },
  { jurisdiction: 'NL', citation: 'Family Violence Protection Act, SNL 2005, c F-3.1', url: 'https://canlii.ca/t/89j0' },
  { jurisdiction: 'YT', citation: 'Family Violence Prevention Act, RSY 2002, c 84', url: 'https://canlii.ca/t/8569' },
  { jurisdiction: 'NT', citation: 'Protection Against Family Violence Act, SNWT 2003, c 24', url: 'https://canlii.ca/t/52hbl' },
  { jurisdiction: 'NU', citation: 'Family Abuse Intervention Act, SNu 2006, c 18', url: 'https://canlii.ca/t/52p2c' },
];

const SRC_DECISION_MAKING: LegalSource[] = [
  { jurisdiction: 'federal', citation: 'Divorce Act, RSC 1985, c 3 (2nd Supp), ss 16, 16.1, 16.2, 16.3, 16.96 (2021 reforms)', url: 'https://laws-lois.justice.gc.ca/eng/acts/d-3.4/' },
  { jurisdiction: 'ON', citation: "Children's Law Reform Act, RSO 1990, c C.12, ss 20–28", url: 'https://www.canlii.org/en/on/laws/stat/rso-1990-c-c12/latest/rso-1990-c-c12.html' },
  { jurisdiction: 'QC', citation: 'Civil Code of Québec, arts 597–612 (parental authority)', url: 'https://www.canlii.org/en/qc/laws/stat/cqlr-c-ccq-1991/latest/cqlr-c-ccq-1991.html' },
  { jurisdiction: 'BC', citation: 'Family Law Act, SBC 2011, c 25, ss 39–49', url: 'https://www.canlii.ca/en/bc/laws/stat/sbc-2011-c-25/latest/sbc-2011-c-25.html' },
  { jurisdiction: 'AB', citation: 'Family Law Act, SA 2003, c F-4.5, Part 2', url: 'https://www.canlii.ca/en/ab/laws/stat/sa-2003-c-f-4.5/latest/sa-2003-c-f-4.5.html' },
  { jurisdiction: 'MB', citation: 'The Family Law Act, CCSM c F20', url: 'https://www.canlii.org/en/mb/laws/stat/ccsm-c-f20/latest/ccsm-c-f20.html' },
  { jurisdiction: 'SK', citation: "The Children's Law Act, 2020, SS 2020, c 2", url: 'https://www.canlii.org/en/sk/laws/stat/ss-2020-c-2/latest/ss-2020-c-2.html' },
  { jurisdiction: 'NS', citation: 'Parenting and Support Act, RSNS 1989, c 160', url: 'https://canlii.ca/t/8490' },
  { jurisdiction: 'NB', citation: 'Family Law Act, SNB 2020, c 23', url: 'https://canlii.ca/t/54k7j' },
  { jurisdiction: 'PE', citation: 'Family Law Act, RSPEI 1988, c F-2.1', url: 'https://canlii.ca/t/8c4r' },
  { jurisdiction: 'NL', citation: "Children's Law Act, RSNL 1990, c C-13", url: 'https://canlii.ca/t/89gx' },
  { jurisdiction: 'YT', citation: "Children's Law Act, RSY 2002, c 31", url: 'https://canlii.ca/t/8555' },
  { jurisdiction: 'NT', citation: "Children's Law Act, SNWT 1997, c 14", url: 'https://canlii.ca/t/52h3f' },
  { jurisdiction: 'NU', citation: "Children's Law Act, SNWT (Nu) 1997, c 14", url: 'https://canlii.ca/t/52p1r' },
];

const SRC_CHILD_SUPPORT: LegalSource[] = [
  { jurisdiction: 'federal', citation: 'Federal Child Support Guidelines, SOR/97-175', url: 'https://laws-lois.justice.gc.ca/eng/regulations/sor-97-175/' },
  { jurisdiction: 'ON', citation: 'Family Law Act, RSO 1990, c F.3, s 33; O Reg 391/97', url: 'https://www.canlii.org/en/on/laws/regu/o-reg-391-97/latest/o-reg-391-97.html' },
  { jurisdiction: 'QC', citation: 'Code of Civil Procedure, CQLR c C-25.01, art 443; CQLR c C-25.01, r 0.4', url: 'https://www.canlii.org/en/qc/laws/regu/cqlr-c-c-25.01-r-0.4/latest/cqlr-c-c-25.01-r-0.4.html' },
  { jurisdiction: 'BC', citation: 'Family Law Act, SBC 2011, c 25, s 147', url: 'https://www.canlii.ca/en/bc/laws/stat/sbc-2011-c-25/latest/sbc-2011-c-25.html' },
  { jurisdiction: 'AB', citation: 'Family Law Act, SA 2003, c F-4.5, Part 3', url: 'https://www.canlii.ca/en/ab/laws/stat/sa-2003-c-f-4.5/latest/sa-2003-c-f-4.5.html' },
  { jurisdiction: 'MB', citation: 'The Family Law Act, CCSM c F20', url: 'https://www.canlii.org/en/mb/laws/stat/ccsm-c-f20/latest/ccsm-c-f20.html' },
  { jurisdiction: 'SK', citation: 'The Family Maintenance Act, 1997, SS 1997, c F-6.2', url: 'https://www.canlii.org/en/sk/laws/stat/ss-1997-c-f-6.2/latest/ss-1997-c-f-6.2.html' },
  { jurisdiction: 'NS', citation: 'Parenting and Support Act, RSNS 1989, c 160', url: 'https://canlii.ca/t/8490' },
  { jurisdiction: 'NB', citation: 'Family Law Act, SNB 2020, c 23', url: 'https://canlii.ca/t/54k7j' },
  { jurisdiction: 'PE', citation: 'Family Law Act, RSPEI 1988, c F-2.1', url: 'https://canlii.ca/t/8c4r' },
  { jurisdiction: 'NL', citation: 'Family Law Act, RSNL 1990, c F-2', url: 'https://canlii.ca/t/89hr' },
  { jurisdiction: 'YT', citation: 'Family Property and Support Act, RSY 2002, c 83, Part 3', url: 'https://canlii.ca/t/8568' },
  { jurisdiction: 'NT', citation: "Children's Law Act, SNWT 1997, c 14", url: 'https://canlii.ca/t/52h3f' },
  { jurisdiction: 'NU', citation: "Children's Law Act, SNWT (Nu) 1997, c 14", url: 'https://canlii.ca/t/52p1r' },
];

const SRC_SPOUSAL_SUPPORT: LegalSource[] = [
  { jurisdiction: 'federal', citation: 'Divorce Act, RSC 1985, c 3 (2nd Supp), s 15.2; Spousal Support Advisory Guidelines (Justice Canada, 2008)', url: 'https://laws-lois.justice.gc.ca/eng/acts/d-3.4/section-15.2.html' },
  { jurisdiction: 'ON', citation: 'Family Law Act, RSO 1990, c F.3, ss 29–34 (Part III)', url: 'https://www.canlii.org/en/on/laws/stat/rso-1990-c-f3/latest/rso-1990-c-f3.html' },
  { jurisdiction: 'QC', citation: 'Civil Code of Québec, arts 511, 585–596.1', url: 'https://www.canlii.org/en/qc/laws/stat/cqlr-c-ccq-1991/latest/cqlr-c-ccq-1991.html' },
  { jurisdiction: 'BC', citation: 'Family Law Act, SBC 2011, c 25, s 160', url: 'https://www.canlii.ca/en/bc/laws/stat/sbc-2011-c-25/latest/sbc-2011-c-25.html' },
  { jurisdiction: 'AB', citation: 'Family Law Act, SA 2003, c F-4.5, Part 3', url: 'https://www.canlii.ca/en/ab/laws/stat/sa-2003-c-f-4.5/latest/sa-2003-c-f-4.5.html' },
  { jurisdiction: 'MB', citation: 'The Family Law Act, CCSM c F20', url: 'https://www.canlii.org/en/mb/laws/stat/ccsm-c-f20/latest/ccsm-c-f20.html' },
  { jurisdiction: 'SK', citation: 'The Family Maintenance Act, 1997, SS 1997, c F-6.2', url: 'https://www.canlii.org/en/sk/laws/stat/ss-1997-c-f-6.2/latest/ss-1997-c-f-6.2.html' },
  { jurisdiction: 'NS', citation: 'Parenting and Support Act, RSNS 1989, c 160', url: 'https://canlii.ca/t/8490' },
  { jurisdiction: 'NB', citation: 'Family Law Act, SNB 2020, c 23', url: 'https://canlii.ca/t/54k7j' },
  { jurisdiction: 'PE', citation: 'Family Law Act, RSPEI 1988, c F-2.1', url: 'https://canlii.ca/t/8c4r' },
  { jurisdiction: 'NL', citation: 'Family Law Act, RSNL 1990, c F-2', url: 'https://canlii.ca/t/89hr' },
  { jurisdiction: 'YT', citation: 'Family Property and Support Act, RSY 2002, c 83, Part 3', url: 'https://canlii.ca/t/8568' },
  { jurisdiction: 'NT', citation: 'Family Law Act, SNWT 1997, c 18, Part IV', url: 'https://canlii.ca/t/52h3j' },
  { jurisdiction: 'NU', citation: 'Family Law Act, SNWT (Nu) 1997, c 18, Part IV', url: 'https://canlii.ca/t/52p1v' },
];

const SRC_LEGAL_AID: LegalSource[] = [
  { jurisdiction: 'ON', citation: 'Legal Aid Services Act, 2020, SO 2020, c 11, Sch 15', url: 'https://www.canlii.org/en/on/laws/stat/so-2020-c-11-sch-15/latest/so-2020-c-11-sch-15.html' },
  { jurisdiction: 'QC', citation: 'Act respecting legal aid and the provision of certain other legal services, CQLR c A-14', url: 'https://www.canlii.org/en/qc/laws/stat/cqlr-c-a-14/latest/cqlr-c-a-14.html' },
  { jurisdiction: 'BC', citation: 'Legal Services Society Act, SBC 2002, c 30', url: 'https://www.canlii.ca/en/bc/laws/stat/sbc-2002-c-30/latest/sbc-2002-c-30.html' },
  { jurisdiction: 'AB', citation: 'Legal Profession Act, RSA 2000, c L-8', url: 'https://www.canlii.ca/en/ab/laws/stat/rsa-2000-c-l-8/latest/rsa-2000-c-l-8.html' },
  { jurisdiction: 'MB', citation: 'The Legal Aid Manitoba Act, CCSM c L105', url: 'https://www.canlii.org/en/mb/laws/stat/ccsm-c-l105/latest/ccsm-c-l105.html' },
  { jurisdiction: 'SK', citation: 'The Legal Aid Act, SS 1983, c L-9.1', url: 'https://www.canlii.org/en/sk/laws/stat/ss-1983-c-l-9.1/latest/ss-1983-c-l-9.1.html' },
  { jurisdiction: 'NS', citation: 'Legal Aid Act, RSNS 1989, c 252', url: 'https://canlii.ca/t/8513' },
  { jurisdiction: 'NB', citation: 'Legal Aid Act, RSNB 2011, c 161', url: 'https://canlii.ca/t/52n9t' },
  { jurisdiction: 'PE', citation: 'Legal Aid Act, RSPEI 1988, c L-6.1', url: 'https://canlii.ca/t/8c65' },
  { jurisdiction: 'NL', citation: 'Legal Aid Act, SNL 2006, c L-10.1', url: 'https://canlii.ca/t/89jw' },
  { jurisdiction: 'YT', citation: 'Legal Services Society Act, RSY 2002, c 134', url: 'https://canlii.ca/t/85bg' },
  { jurisdiction: 'NT', citation: 'Legal Aid Act, RSNWT 1988, c L-1', url: 'https://canlii.ca/t/52hqb' },
  { jurisdiction: 'NU', citation: 'Legal Services Act, SNu 2013, c 11', url: 'https://canlii.ca/t/52pb9' },
];

const SRC_TENANT_DV: LegalSource[] = [
  { jurisdiction: 'ON', citation: 'Residential Tenancies Act, 2006, SO 2006, c 17, ss 47.1–47.4 (early termination — sexual/domestic violence)', url: 'https://www.canlii.org/en/on/laws/stat/so-2006-c-17/latest/so-2006-c-17.html' },
  { jurisdiction: 'QC', citation: 'Civil Code of Québec, art 1974.1 (resiliation — violence or sexual aggression)', url: 'https://www.canlii.org/en/qc/laws/stat/cqlr-c-ccq-1991/latest/cqlr-c-ccq-1991.html' },
  { jurisdiction: 'BC', citation: 'Residential Tenancy Act, SBC 2002, c 78, s 45.1', url: 'https://www.canlii.ca/en/bc/laws/stat/sbc-2002-c-78/latest/sbc-2002-c-78.html' },
  { jurisdiction: 'AB', citation: 'Residential Tenancies Act, SA 2004, c R-17.1, s 47.2', url: 'https://www.canlii.ca/en/ab/laws/stat/sa-2004-c-r-17.1/latest/sa-2004-c-r-17.1.html' },
  { jurisdiction: 'MB', citation: 'The Residential Tenancies Act, CCSM c R119, s 92.1', url: 'https://www.canlii.org/en/mb/laws/stat/ccsm-c-r119/latest/ccsm-c-r119.html' },
  { jurisdiction: 'SK', citation: 'The Residential Tenancies Act, 2006, SS 2006, c R-22.0001, s 69.1', url: 'https://www.canlii.org/en/sk/laws/stat/ss-2006-c-r-22.0001/latest/ss-2006-c-r-22.0001.html' },
  { jurisdiction: 'NS', citation: 'Residential Tenancies Act, RSNS 1989, c 401, s 10F', url: 'https://canlii.ca/t/84k4' },
  { jurisdiction: 'NB', citation: 'Residential Tenancies Act, SNB 1975, c R-10.2', url: 'https://canlii.ca/t/52nbn' },
  { jurisdiction: 'PE', citation: 'Residential Tenancy Act, SPEI 2022, c 20', url: 'https://canlii.ca/t/55n8s' },
  { jurisdiction: 'NL', citation: 'Residential Tenancies Act, 2018, SNL 2018, c R-14.2', url: 'https://canlii.ca/t/53kp6' },
];

const SRC_SOCIAL_ASSISTANCE: LegalSource[] = [
  { jurisdiction: 'ON', citation: 'Ontario Works Act, 1997, SO 1997, c 25, Sch A', url: 'https://www.canlii.org/en/on/laws/stat/so-1997-c-25-sch-a/latest/so-1997-c-25-sch-a.html' },
  { jurisdiction: 'QC', citation: 'Individual and Family Assistance Act, CQLR c A-13.1.1', url: 'https://www.canlii.org/en/qc/laws/stat/cqlr-c-a-13.1.1/latest/cqlr-c-a-13.1.1.html' },
  { jurisdiction: 'BC', citation: 'Employment and Assistance Act, SBC 2002, c 40', url: 'https://www.canlii.ca/en/bc/laws/stat/sbc-2002-c-40/latest/sbc-2002-c-40.html' },
  { jurisdiction: 'AB', citation: 'Income and Employment Supports Act, SA 2003, c I-0.5', url: 'https://www.canlii.ca/en/ab/laws/stat/sa-2003-c-i-0.5/latest/sa-2003-c-i-0.5.html' },
  { jurisdiction: 'MB', citation: 'The Manitoba Assistance Act, CCSM c A150', url: 'https://www.canlii.org/en/mb/laws/stat/ccsm-c-a150/latest/ccsm-c-a150.html' },
  { jurisdiction: 'SK', citation: 'The Saskatchewan Assistance Act, RSS 1978, c S-8', url: 'https://www.canlii.org/en/sk/laws/stat/rss-1978-c-s-8/latest/rss-1978-c-s-8.html' },
  { jurisdiction: 'NS', citation: 'Employment Support and Income Assistance Act, SNS 2000, c 27', url: 'https://canlii.ca/t/8520' },
  { jurisdiction: 'NB', citation: 'Family Income Security Act, SNB 1994, c F-2.01', url: 'https://canlii.ca/t/52n8m' },
  { jurisdiction: 'PE', citation: 'Social Assistance Act, RSPEI 1988, c S-4.3', url: 'https://canlii.ca/t/8c71' },
  { jurisdiction: 'NL', citation: 'Income and Employment Support Act, SNL 2002, c I-0.1', url: 'https://canlii.ca/t/89jf' },
  { jurisdiction: 'YT', citation: 'Social Assistance Act, RSY 2002, c 205', url: 'https://canlii.ca/t/85dp' },
  { jurisdiction: 'NT', citation: 'Social Assistance Act, RSNWT 1988, c S-16', url: 'https://canlii.ca/t/52k3z' },
  { jurisdiction: 'NU', citation: 'Social Assistance Act, RSNWT (Nu) 1988, c S-16', url: 'https://canlii.ca/t/52pgr' },
];

const SRC_HEALTH_COVERAGE: LegalSource[] = [
  { jurisdiction: 'federal', citation: 'Canada Health Act, RSC 1985, c C-6, ss 7, 11', url: 'https://laws-lois.justice.gc.ca/eng/acts/c-6/' },
  { jurisdiction: 'ON', citation: 'Health Insurance Act, RSO 1990, c H.6; RRO 1990, Reg 552', url: 'https://www.canlii.org/en/on/laws/stat/rso-1990-c-h6/latest/rso-1990-c-h6.html' },
  { jurisdiction: 'QC', citation: 'Health Insurance Act, CQLR c A-29', url: 'https://www.canlii.org/en/qc/laws/stat/cqlr-c-a-29/latest/cqlr-c-a-29.html' },
  { jurisdiction: 'BC', citation: 'Medicare Protection Act, RSBC 1996, c 286', url: 'https://www.canlii.ca/en/bc/laws/stat/rsbc-1996-c-286/latest/rsbc-1996-c-286.html' },
  { jurisdiction: 'AB', citation: 'Alberta Health Care Insurance Act, RSA 2000, c A-20', url: 'https://www.canlii.ca/en/ab/laws/stat/rsa-2000-c-a-20/latest/rsa-2000-c-a-20.html' },
  { jurisdiction: 'MB', citation: 'The Health Services Insurance Act, CCSM c H35', url: 'https://www.canlii.org/en/mb/laws/stat/ccsm-c-h35/latest/ccsm-c-h35.html' },
  { jurisdiction: 'SK', citation: 'The Saskatchewan Medical Care Insurance Act, RSS 1978, c S-29', url: 'https://www.canlii.org/en/sk/laws/stat/rss-1978-c-s-29/latest/rss-1978-c-s-29.html' },
  { jurisdiction: 'NS', citation: 'Health Services and Insurance Act, RSNS 1989, c 197', url: 'https://canlii.ca/t/84w1' },
  { jurisdiction: 'NB', citation: 'Medical Services Payment Act, RSNB 1973, c M-7', url: 'https://canlii.ca/t/52nbp' },
  { jurisdiction: 'PE', citation: 'Health Services Payment Act, RSPEI 1988, c H-2', url: 'https://canlii.ca/t/8c51' },
  { jurisdiction: 'NL', citation: 'Medical Care and Hospital Insurance Act, SNL 2016, c M-5.01', url: 'https://canlii.ca/t/52tnx' },
  { jurisdiction: 'YT', citation: 'Health Care Insurance Plan Act, RSY 2002, c 107', url: 'https://canlii.ca/t/8596' },
  { jurisdiction: 'NT', citation: 'Medical Care Act, RSNWT 1988, c M-8', url: 'https://canlii.ca/t/52hsl' },
  { jurisdiction: 'NU', citation: 'Medical Care Act, RSNWT (Nu) 1988, c M-8', url: 'https://canlii.ca/t/52pd1' },
];

const SRC_SCHOOL_ENROLLMENT: LegalSource[] = [
  { jurisdiction: 'ON', citation: 'Education Act, RSO 1990, c E.2, s 49.1 (admission regardless of immigration status)', url: 'https://www.canlii.org/en/on/laws/stat/rso-1990-c-e2/latest/rso-1990-c-e2.html' },
  { jurisdiction: 'QC', citation: 'Education Act, CQLR c I-13.3, s 1', url: 'https://www.canlii.org/en/qc/laws/stat/cqlr-c-i-13.3/latest/cqlr-c-i-13.3.html' },
  { jurisdiction: 'BC', citation: 'School Act, RSBC 1996, c 412, s 2', url: 'https://www.canlii.ca/en/bc/laws/stat/rsbc-1996-c-412/latest/rsbc-1996-c-412.html' },
  { jurisdiction: 'AB', citation: 'Education Act, SA 2012, c E-0.3, s 3', url: 'https://www.canlii.ca/en/ab/laws/stat/sa-2012-c-e-0.3/latest/sa-2012-c-e-0.3.html' },
  { jurisdiction: 'MB', citation: 'The Public Schools Act, CCSM c P250', url: 'https://www.canlii.org/en/mb/laws/stat/ccsm-c-p250/latest/ccsm-c-p250.html' },
  { jurisdiction: 'SK', citation: 'The Education Act, 1995, SS 1995, c E-0.2', url: 'https://www.canlii.org/en/sk/laws/stat/ss-1995-c-e-0.2/latest/ss-1995-c-e-0.2.html' },
  { jurisdiction: 'NS', citation: 'Education Act, SNS 2018, c 1', url: 'https://canlii.ca/t/53hwp' },
  { jurisdiction: 'NB', citation: 'Education Act, SNB 1997, c E-1.12', url: 'https://canlii.ca/t/52n88' },
  { jurisdiction: 'PE', citation: 'Education Act, RSPEI 1988, c E-.02', url: 'https://canlii.ca/t/8c4g' },
  { jurisdiction: 'NL', citation: 'Schools Act, 1997, SNL 1997, c S-12.2', url: 'https://canlii.ca/t/89l3' },
  { jurisdiction: 'YT', citation: 'Education Act, RSY 2002, c 61', url: 'https://canlii.ca/t/857r' },
  { jurisdiction: 'NT', citation: 'Education Act, SNWT 1995, c 28', url: 'https://canlii.ca/t/52h26' },
  { jurisdiction: 'NU', citation: 'Education Act, SNu 2008, c 15', url: 'https://canlii.ca/t/52p1f' },
];

const SRC_VICTIM_SERVICES: LegalSource[] = [
  { jurisdiction: 'ON', citation: "Victims' Bill of Rights, 1995, SO 1995, c 6", url: 'https://www.canlii.org/en/on/laws/stat/so-1995-c-6/latest/so-1995-c-6.html' },
  { jurisdiction: 'QC', citation: 'Act to assist persons who are victims of criminal offences, CQLR c P-9.2.1', url: 'https://www.canlii.org/en/qc/laws/stat/cqlr-c-p-9.2.1/latest/cqlr-c-p-9.2.1.html' },
  { jurisdiction: 'BC', citation: 'Victims of Crime Act, RSBC 1996, c 478', url: 'https://www.canlii.ca/en/bc/laws/stat/rsbc-1996-c-478/latest/rsbc-1996-c-478.html' },
  { jurisdiction: 'AB', citation: 'Victims of Crime and Public Safety Act, RSA 2000, c V-3', url: 'https://www.canlii.ca/en/ab/laws/stat/rsa-2000-c-v-3/latest/rsa-2000-c-v-3.html' },
  { jurisdiction: 'MB', citation: "The Victims' Bill of Rights, CCSM c V55", url: 'https://www.canlii.org/en/mb/laws/stat/ccsm-c-v55/latest/ccsm-c-v55.html' },
  { jurisdiction: 'SK', citation: 'The Victims of Crime Act, 1995, SS 1995, c V-6.011', url: 'https://www.canlii.org/en/sk/laws/stat/ss-1995-c-v-6.011/latest/ss-1995-c-v-6.011.html' },
  { jurisdiction: 'NS', citation: "Victims' Rights and Services Act, RSNS 1989, c 14", url: 'https://canlii.ca/t/8523' },
  { jurisdiction: 'NB', citation: 'Victims Services Act, SNB 1987, c V-2.1', url: 'https://canlii.ca/t/52n8b' },
  { jurisdiction: 'PE', citation: 'Victims of Crime Act, RSPEI 1988, c V-3.1', url: 'https://canlii.ca/t/8c7t' },
  { jurisdiction: 'NL', citation: 'Victims of Crime Services Act, RSNL 1990, c V-5', url: 'https://canlii.ca/t/89ms' },
  { jurisdiction: 'YT', citation: 'Victims of Crime Act, RSY 2002, c 223', url: 'https://canlii.ca/t/85f7' },
  { jurisdiction: 'NT', citation: 'Victims of Crime Act, RSNWT 1988, c 9 (Supp)', url: 'https://canlii.ca/t/52k89' },
  { jurisdiction: 'NU', citation: 'Victims of Crime Act, RSNWT (Nu) 1988, c 9 (Supp)', url: 'https://canlii.ca/t/52pk5' },
];

const SRC_WORKPLACE_HARASSMENT: LegalSource[] = [
  { jurisdiction: 'ON', citation: 'Occupational Health and Safety Act, RSO 1990, c O.1, ss 1, 32.0.1–32.0.7', url: 'https://www.canlii.org/en/on/laws/stat/rso-1990-c-o1/latest/rso-1990-c-o1.html' },
  { jurisdiction: 'QC', citation: 'Act respecting labour standards, CQLR c N-1.1, ss 81.18–81.20 (psychological/sexual harassment)', url: 'https://www.canlii.org/en/qc/laws/stat/cqlr-c-n-1.1/latest/cqlr-c-n-1.1.html' },
  { jurisdiction: 'BC', citation: 'Workers Compensation Act, RSBC 2019, c 1, s 115', url: 'https://www.canlii.ca/en/bc/laws/stat/rsbc-2019-c-1/latest/rsbc-2019-c-1.html' },
  { jurisdiction: 'AB', citation: 'Occupational Health and Safety Act, SA 2020, c O-2.2', url: 'https://www.canlii.ca/en/ab/laws/stat/sa-2020-c-o-2.2/latest/sa-2020-c-o-2.2.html' },
  { jurisdiction: 'MB', citation: 'The Workplace Safety and Health Act, CCSM c W210', url: 'https://www.canlii.org/en/mb/laws/stat/ccsm-c-w210/latest/ccsm-c-w210.html' },
  { jurisdiction: 'SK', citation: 'The Saskatchewan Employment Act, SS 2013, c S-15.1, Part III', url: 'https://www.canlii.org/en/sk/laws/stat/ss-2013-c-s-15.1/latest/ss-2013-c-s-15.1.html' },
  { jurisdiction: 'NS', citation: 'Occupational Health and Safety Act, SNS 1996, c 7', url: 'https://canlii.ca/t/851x' },
  { jurisdiction: 'NB', citation: 'Occupational Health and Safety Act, SNB 1983, c O-0.2', url: 'https://canlii.ca/t/52n9w' },
  { jurisdiction: 'PE', citation: 'Occupational Health and Safety Act, RSPEI 1988, c O-1.01', url: 'https://canlii.ca/t/8c69' },
  { jurisdiction: 'NL', citation: 'Occupational Health and Safety Act, RSNL 1990, c O-3', url: 'https://canlii.ca/t/89k8' },
  { jurisdiction: 'YT', citation: 'Occupational Health and Safety Act, RSY 2002, c 159', url: 'https://canlii.ca/t/85c5' },
  { jurisdiction: 'NT', citation: 'Safety Act, RSNWT 1988, c S-1', url: 'https://canlii.ca/t/52jzf' },
  { jurisdiction: 'NU', citation: 'Safety Act, RSNWT (Nu) 1988, c S-1', url: 'https://canlii.ca/t/52pg6' },
];

const SRC_HUMAN_RIGHTS: LegalSource[] = [
  { jurisdiction: 'federal', citation: 'Canadian Charter of Rights and Freedoms, s 15 (equality)', url: 'https://laws-lois.justice.gc.ca/eng/const/page-12.html' },
  { jurisdiction: 'ON', citation: 'Human Rights Code, RSO 1990, c H.19', url: 'https://www.canlii.org/en/on/laws/stat/rso-1990-c-h19/latest/rso-1990-c-h19.html' },
  { jurisdiction: 'QC', citation: 'Charter of human rights and freedoms, CQLR c C-12, ss 10, 10.1', url: 'https://www.canlii.org/en/qc/laws/stat/cqlr-c-c-12/latest/cqlr-c-c-12.html' },
  { jurisdiction: 'BC', citation: 'Human Rights Code, RSBC 1996, c 210', url: 'https://www.canlii.ca/en/bc/laws/stat/rsbc-1996-c-210/latest/rsbc-1996-c-210.html' },
  { jurisdiction: 'AB', citation: 'Alberta Human Rights Act, RSA 2000, c A-25.5', url: 'https://www.canlii.ca/en/ab/laws/stat/rsa-2000-c-a-25.5/latest/rsa-2000-c-a-25.5.html' },
  { jurisdiction: 'MB', citation: 'The Human Rights Code, CCSM c H175', url: 'https://www.canlii.org/en/mb/laws/stat/ccsm-c-h175/latest/ccsm-c-h175.html' },
  { jurisdiction: 'SK', citation: 'The Saskatchewan Human Rights Code, 2018, SS 2018, c S-24.2', url: 'https://www.canlii.org/en/sk/laws/stat/ss-2018-c-s-24.2/latest/ss-2018-c-s-24.2.html' },
  { jurisdiction: 'NS', citation: 'Human Rights Act, RSNS 1989, c 214', url: 'https://canlii.ca/t/8499' },
  { jurisdiction: 'NB', citation: 'Human Rights Act, RSNB 2011, c 171', url: 'https://canlii.ca/t/52n8q' },
  { jurisdiction: 'PE', citation: 'Human Rights Act, RSPEI 1988, c H-12', url: 'https://canlii.ca/t/8c5c' },
  { jurisdiction: 'NL', citation: 'Human Rights Act, 2010, SNL 2010, c H-13.1', url: 'https://canlii.ca/t/52kxn' },
  { jurisdiction: 'YT', citation: 'Human Rights Act, RSY 2002, c 116', url: 'https://canlii.ca/t/859f' },
  { jurisdiction: 'NT', citation: 'Human Rights Act, SNWT 2002, c 18', url: 'https://canlii.ca/t/52hh7' },
  { jurisdiction: 'NU', citation: 'Human Rights Act, SNu 2003, c 12', url: 'https://canlii.ca/t/52p5s' },
];

const SRC_DV_LEAVE: LegalSource[] = [
  { jurisdiction: 'ON', citation: 'Employment Standards Act, 2000, SO 2000, c 41, s 49.7 (domestic or sexual violence leave)', url: 'https://www.canlii.org/en/on/laws/stat/so-2000-c-41/latest/so-2000-c-41.html' },
  { jurisdiction: 'QC', citation: 'Act respecting labour standards, CQLR c N-1.1, s 79.1 et seq', url: 'https://www.canlii.org/en/qc/laws/stat/cqlr-c-n-1.1/latest/cqlr-c-n-1.1.html' },
  { jurisdiction: 'BC', citation: 'Employment Standards Act, RSBC 1996, c 113, s 52.5', url: 'https://www.canlii.ca/en/bc/laws/stat/rsbc-1996-c-113/latest/rsbc-1996-c-113.html' },
  { jurisdiction: 'AB', citation: 'Employment Standards Code, RSA 2000, c E-9, s 53.982', url: 'https://www.canlii.ca/en/ab/laws/stat/rsa-2000-c-e-9/latest/rsa-2000-c-e-9.html' },
  { jurisdiction: 'MB', citation: 'The Employment Standards Code, CCSM c E110', url: 'https://www.canlii.org/en/mb/laws/stat/ccsm-c-e110/latest/ccsm-c-e110.html' },
  { jurisdiction: 'SK', citation: 'The Saskatchewan Employment Act, SS 2013, c S-15.1, Part II Div 7', url: 'https://www.canlii.org/en/sk/laws/stat/ss-2013-c-s-15.1/latest/ss-2013-c-s-15.1.html' },
  { jurisdiction: 'NS', citation: 'Labour Standards Code, RSNS 1989, c 246', url: 'https://canlii.ca/t/84pf' },
  { jurisdiction: 'NB', citation: 'Employment Standards Act, SNB 1982, c E-7.2', url: 'https://canlii.ca/t/52n8r' },
  { jurisdiction: 'PE', citation: 'Employment Standards Act, RSPEI 1988, c E-6.2', url: 'https://canlii.ca/t/8c4k' },
  { jurisdiction: 'NL', citation: 'Labour Standards Act, RSNL 1990, c L-2', url: 'https://canlii.ca/t/89jq' },
];

const SRC_INTIMATE_IMAGES: LegalSource[] = [
  { jurisdiction: 'federal', citation: 'Criminal Code, RSC 1985, c C-46, s 162.1 (publication of intimate image without consent)', url: 'https://laws-lois.justice.gc.ca/eng/acts/c-46/section-162.1.html' },
  { jurisdiction: 'ON', citation: 'Intimate Images and Cyber-protection Act, 2024, SO 2024, c 3', url: 'https://www.canlii.org/en/on/laws/stat/so-2024-c-3/latest/so-2024-c-3.html' },
  { jurisdiction: 'AB', citation: 'Protecting Victims of Non-Consensual Distribution of Intimate Images Act, SA 2017, c P-26.9', url: 'https://www.canlii.ca/en/ab/laws/stat/sa-2017-c-p-26.9/latest/sa-2017-c-p-26.9.html' },
  { jurisdiction: 'BC', citation: 'Intimate Images Protection Act, SBC 2023, c 11', url: 'https://www.canlii.ca/en/bc/laws/stat/sbc-2023-c-11/latest/sbc-2023-c-11.html' },
  { jurisdiction: 'MB', citation: 'The Intimate Image Protection Act, CCSM c I87', url: 'https://www.canlii.org/en/mb/laws/stat/ccsm-c-i87/latest/ccsm-c-i87.html' },
  { jurisdiction: 'SK', citation: 'The Privacy Act, SS 1978, c P-24', url: 'https://www.canlii.org/en/sk/laws/stat/rss-1978-c-p-24/latest/rss-1978-c-p-24.html' },
  { jurisdiction: 'NS', citation: 'Intimate Images and Cyber-protection Act, SNS 2017, c 7', url: 'https://canlii.ca/t/53fnl' },
  { jurisdiction: 'NB', citation: 'Intimate Images and Cyber-protection Act, SNB 2017, c 63', url: 'https://canlii.ca/t/53zrj' },
];

const SRC_PAY_EQUITY: LegalSource[] = [
  { jurisdiction: 'federal', citation: 'Pay Equity Act, SC 2018, c 27, s 416', url: 'https://laws-lois.justice.gc.ca/eng/acts/p-4.2/' },
  { jurisdiction: 'ON', citation: 'Pay Equity Act, RSO 1990, c P.7', url: 'https://www.canlii.org/en/on/laws/stat/rso-1990-c-p7/latest/rso-1990-c-p7.html' },
  { jurisdiction: 'QC', citation: 'Pay Equity Act, CQLR c E-12.001', url: 'https://www.canlii.org/en/qc/laws/stat/cqlr-c-e-12.001/latest/cqlr-c-e-12.001.html' },
  { jurisdiction: 'PE', citation: 'Pay Equity Act, RSPEI 1988, c P-2', url: 'https://canlii.ca/t/8c6r' },
  { jurisdiction: 'NB', citation: 'Pay Equity Act, SNB 2009, c P-5.05', url: 'https://canlii.ca/t/52ndr' },
  { jurisdiction: 'NS', citation: 'Pay Equity Act, SNS 1989, c 16', url: 'https://canlii.ca/t/84nm' },
  { jurisdiction: 'MB', citation: 'The Pay Equity Act, CCSM c P13', url: 'https://www.canlii.org/en/mb/laws/stat/ccsm-c-p13/latest/ccsm-c-p13.html' },
];

// ---------------------------------------------------------------------------
// Cards
// ---------------------------------------------------------------------------

export const rightsCards: RightsCard[] = [
  {
    id: 'pr-status',
    titleZh: '离婚不会取消你的PR身份',
    titleEn: 'Divorce does not cancel your PR status',
    contentZh: '一旦你获得永久居民身份，离婚不会导致身份被撤销。你的PR身份属于你自己。',
    contentEn: 'Once you have permanent residency, divorce cannot revoke your status. Your PR status belongs to you.',
    sourceZh: '《移民和难民保护法》第28、46条',
    sourceEn: 'Immigration and Refugee Protection Act, ss 28, 46',
    sources: [
      { jurisdiction: 'federal', citation: 'Immigration and Refugee Protection Act, SC 2001, c 27, ss 28, 46', url: 'https://laws-lois.justice.gc.ca/eng/acts/i-2.5/' },
    ],
  },
  {
    id: 'sponsorship-breakdown',
    titleZh: '担保关系破裂不会取消你的PR',
    titleEn: 'A sponsorship breakdown does NOT cancel your PR',
    contentZh: '即使你的婚姻破裂或担保人撤回支持，你的永久居民身份依然有效。担保人的经济义务对加拿大政府继续存在，但这是政府和担保人之间的事，不影响你的身份。',
    contentEn: "Even if your marriage ends or your sponsor withdraws support, your permanent residency stays valid. The sponsor's financial obligation runs to the government, not you — that's their problem, not yours.",
    sourceZh: '《移民和难民保护条例》第132条',
    sourceEn: 'Immigration and Refugee Protection Regulations, s 132',
    sources: [
      { jurisdiction: 'federal', citation: 'Immigration and Refugee Protection Regulations, SOR/2002-227, s 132', url: 'https://laws-lois.justice.gc.ca/eng/regulations/sor-2002-227/section-132.html' },
    ],
  },
  {
    id: 'conditional-pr-removed',
    titleZh: '"有条件PR" 已于2017年取消',
    titleEn: 'Conditional PR was removed in 2017',
    contentZh: '过去被担保的配偶必须与担保人共同生活两年才能保留身份。这条规则已于2017年4月被永久取消。你现在不需要为了身份而留在不安全的关系中。',
    contentEn: 'Sponsored spouses used to have to live with their sponsor for two years to keep status. That rule was permanently removed in April 2017. You do not need to stay in an unsafe relationship to keep your status.',
    sourceZh: '《修订移民和难民保护条例的条例》SOR/2017-60（废除原第72.1条）',
    sourceEn: 'Regulations Amending the IRPR, SOR/2017-60 (repealing IRPR s 72.1)',
    sources: [
      { jurisdiction: 'federal', citation: 'Regulations Amending the Immigration and Refugee Protection Regulations, SOR/2017-60, in force 28 April 2017', url: 'https://canadagazette.gc.ca/rp-pr/p2/2017/2017-05-03/html/sor-dors60-eng.html' },
    ],
  },
  {
    id: 'family-violence-exception',
    titleZh: '家庭暴力受害者的特殊移民通道',
    titleEn: 'Special immigration pathway for family violence victims',
    contentZh: '如果你因家庭暴力离开担保人，加拿大移民部提供免费的临时居留许可（TRP），允许你合法留下、工作、就医，并申请永久居留。你不必为了身份回到施暴者身边。',
    contentEn: 'If you have left a sponsor because of family violence, IRCC offers a free temporary resident permit (TRP) that lets you stay, work, get healthcare, and apply for permanent residence. You do not have to return to an abuser to keep status.',
    sourceZh: '《移民和难民保护法》第24条；移民部公共政策',
    sourceEn: 'IRPA s 24; IRCC public policy — TRPs for family-violence victims',
    sources: [
      { jurisdiction: 'federal', citation: 'Immigration and Refugee Protection Act, SC 2001, c 27, s 24; IRCC public policy — TRPs for victims of family violence (fee-exempt)', url: 'https://www.canada.ca/en/immigration-refugees-citizenship/corporate/publications-manuals/operational-bulletins-manuals/temporary-residents/permits/family-violence.html' },
    ],
  },
  {
    id: 'divorce-grounds',
    titleZh: '分居一年后即可申请无过错离婚',
    titleEn: 'No-fault divorce after one year of separation',
    contentZh: '在加拿大，分居满一年是申请离婚最常见的理由。你不需要证明对方有过错，也不需要对方同意。',
    contentEn: 'In Canada, living separately for one year is the most common ground for divorce. You do not need to prove fault or get the other person\'s consent.',
    sourceZh: '《离婚法》第8条',
    sourceEn: 'Divorce Act, s 8',
    sources: [
      { jurisdiction: 'federal', citation: 'Divorce Act, RSC 1985, c 3 (2nd Supp), s 8', url: 'https://laws-lois.justice.gc.ca/eng/acts/d-3.4/section-8.html' },
    ],
  },
  {
    id: 'decision-making',
    titleZh: '"监护权" 已改为 "决策责任" 和 "亲子时间"',
    titleEn: '"Custody" is now "decision-making responsibility" and "parenting time"',
    contentZh: '2021年《离婚法》改革后，法院根据"孩子的最大利益"分配决策责任（教育、健康、宗教）和亲子时间。家庭暴力是法院必须考虑的因素之一。',
    contentEn: 'After the 2021 Divorce Act reforms, courts allocate decision-making responsibility (education, health, religion) and parenting time based on the "best interests of the child." Family violence is a factor courts must consider.',
    sourceZh: '《离婚法》第16条 (2021年修订) 及各省家庭法',
    sourceEn: 'Divorce Act, s 16 (2021 reforms) + provincial family laws',
    sources: SRC_DECISION_MAKING,
  },
  {
    id: 'children-canada',
    titleZh: '你的孩子不能被带出加拿大',
    titleEn: 'Your children cannot be taken out of Canada without permission',
    contentZh: '未经另一方父母同意或法院命令，任何人都不可以将孩子带出加拿大。你可以向法院申请阻止此行为。',
    contentEn: 'A parent cannot remove children from Canada without consent from the other parent or a court order. You can apply to the court to prevent this.',
    sourceZh: '《离婚法》第16.9–16.93条（搬迁条款）',
    sourceEn: 'Divorce Act, ss 16.9–16.93 (relocation provisions)',
    sources: [
      { jurisdiction: 'federal', citation: 'Divorce Act, RSC 1985, c 3 (2nd Supp), ss 16.9, 16.91, 16.92, 16.93', url: 'https://laws-lois.justice.gc.ca/eng/acts/d-3.4/' },
    ],
  },
  {
    id: 'protection-order',
    titleZh: '你可以申请人身保护令',
    titleEn: 'You can apply for a protection order',
    contentZh: '如果你面临暴力威胁，可以向法院申请人身保护令，禁止对方接近你或你的孩子。每个省和地区都有自己的家庭暴力保护法。',
    contentEn: 'If you face violence or threats, you can apply to the court for a protection order prohibiting the other person from approaching you or your children. Every province and territory has its own family-violence protection statute.',
    sourceZh: '各省/地区家庭暴力保护法',
    sourceEn: 'Provincial / territorial family-violence statutes',
    sources: SRC_PROTECTION_ORDER,
  },
  {
    id: 'peace-bond',
    titleZh: '即使没有刑事指控也可以申请《刑法》第810条治安令',
    titleEn: 'You can ask for a Criminal Code s 810 peace bond — no charge needed',
    contentZh: '如果你有合理理由害怕某人伤害你、你的孩子或你的财产，你可以向法院申请治安令。法庭可以命令对方一年内远离你、不接触你、不持有武器。这不需要先提出刑事指控。',
    contentEn: 'If you have reasonable fear that someone will hurt you, your children, or your property, you can ask the court for a peace bond. The court can order the person to stay away, not contact you, and surrender weapons for up to a year — no criminal charge required first.',
    sourceZh: '《刑法》第810条',
    sourceEn: 'Criminal Code, s 810',
    sources: [
      { jurisdiction: 'federal', citation: 'Criminal Code, RSC 1985, c C-46, s 810', url: 'https://laws-lois.justice.gc.ca/eng/acts/c-46/section-810.html' },
    ],
  },
  {
    id: 'criminal-harassment',
    titleZh: '骚扰、威胁和殴打都是刑事罪',
    titleEn: 'Harassment, threats, and assault are criminal offences',
    contentZh: '在加拿大，跟踪、反复骚扰、威胁伤害、推搡或殴打都是刑事罪行。即使对方是你的丈夫或家人，警察也必须处理。',
    contentEn: 'In Canada, stalking, repeated harassment, threats of harm, and any physical assault are criminal offences. Police must respond even when the offender is a spouse or family member.',
    sourceZh: '《刑法》第264, 264.1, 265–268, 271–273条',
    sourceEn: 'Criminal Code, ss 264, 264.1, 265–268, 271–273',
    sources: [
      { jurisdiction: 'federal', citation: 'Criminal Code, RSC 1985, c C-46, s 264 (criminal harassment / stalking)', url: 'https://laws-lois.justice.gc.ca/eng/acts/c-46/section-264.html' },
      { jurisdiction: 'federal', citation: 'Criminal Code, s 264.1 (uttering threats)', url: 'https://laws-lois.justice.gc.ca/eng/acts/c-46/section-264.1.html' },
      { jurisdiction: 'federal', citation: 'Criminal Code, ss 265, 266, 267, 268 (assault)', url: 'https://laws-lois.justice.gc.ca/eng/acts/c-46/' },
      { jurisdiction: 'federal', citation: 'Criminal Code, ss 271, 272, 273 (sexual assault)', url: 'https://laws-lois.justice.gc.ca/eng/acts/c-46/' },
    ],
  },
  {
    id: 'forced-marriage',
    titleZh: '在加拿大强迫婚姻是刑事罪',
    titleEn: 'Forced marriage is a crime in Canada',
    contentZh: '强迫他人结婚、或为强迫婚姻举行仪式或将受害人带出加拿大，都是刑事罪行。',
    contentEn: 'Forcing someone into marriage, performing a ceremony for a forced marriage, or removing a person from Canada for that purpose is a criminal offence.',
    sourceZh: '《刑法》第293.1、293.2条',
    sourceEn: 'Criminal Code, ss 293.1, 293.2',
    sources: [
      { jurisdiction: 'federal', citation: 'Criminal Code, RSC 1985, c C-46, ss 293.1, 293.2', url: 'https://laws-lois.justice.gc.ca/eng/acts/c-46/' },
    ],
  },
  {
    id: 'human-trafficking',
    titleZh: '人口贩运是严重刑事罪',
    titleEn: 'Human trafficking is a serious crime',
    contentZh: '通过武力、欺骗或控制证件而剥削他人劳动或性服务是刑事罪行。受害者可以获得免费的临时居留许可（TRP），不受身份影响。',
    contentEn: 'Exploiting another person for labour or sex through force, deception, or control of documents is a criminal offence. Victims can receive a free temporary resident permit (TRP) regardless of immigration status.',
    sourceZh: '《刑法》第279.01–279.04条；移民部贩运受害者TRP',
    sourceEn: 'Criminal Code, ss 279.01–279.04; IRCC trafficking-victim TRP',
    sources: [
      { jurisdiction: 'federal', citation: 'Criminal Code, RSC 1985, c C-46, ss 279.01–279.04', url: 'https://laws-lois.justice.gc.ca/eng/acts/c-46/' },
    ],
  },
  {
    id: 'property-division',
    titleZh: '婚姻财产通常平分',
    titleEn: 'Marital property is generally split equally',
    contentZh: '根据加拿大各省的家庭法，婚姻期间积累的房屋、储蓄和资产通常平均分配——即使都在对方名下。',
    contentEn: 'Under provincial family laws, the home, savings, and assets built during the marriage are usually divided 50/50 — even if everything is in his name.',
    sourceZh: '各省家庭财产法',
    sourceEn: 'Provincial family/matrimonial property statutes',
    sources: SRC_PROPERTY_DIVISION,
  },
  {
    id: 'matrimonial-home',
    titleZh: '家庭住所受到特殊保护',
    titleEn: 'The family home has special protection',
    contentZh: '即使房屋只在对方名下，未经你同意，对方通常不能出售、抵押或将你赶出家庭住所。这是加拿大家庭法对配偶最重要的保护之一。',
    contentEn: 'Even if the home is in only the other person\'s name, they generally cannot sell it, mortgage it, or lock you out without your consent. This is one of the strongest protections family law gives a spouse.',
    sourceZh: '各省家庭法 / 房屋法；联邦保留地家庭住所法',
    sourceEn: 'Provincial family/homestead laws; federal Family Homes on Reserves Act',
    sources: SRC_MATRIMONIAL_HOME,
  },
  {
    id: 'family-homes-on-reserves',
    titleZh: '原住民妇女在保留地享有家庭住所权利',
    titleEn: 'First Nations women have matrimonial home rights on reserves',
    contentZh: '《保留地家庭住所及婚姻利益与权利法》保护居住在保留地的配偶在分居或家庭暴力情况下的住房权利，包括紧急保护令。',
    contentEn: 'The Family Homes on Reserves and Matrimonial Interests or Rights Act protects spouses living on reserves — including the right to stay in the family home and to seek emergency protection orders in situations of family violence.',
    sourceZh: '《保留地家庭住所及婚姻利益与权利法》',
    sourceEn: 'Family Homes on Reserves and Matrimonial Interests or Rights Act',
    sources: [
      { jurisdiction: 'federal', citation: 'Family Homes on Reserves and Matrimonial Interests or Rights Act, SC 2013, c 20', url: 'https://laws-lois.justice.gc.ca/eng/acts/F-1.2/' },
    ],
  },
  {
    id: 'child-support',
    titleZh: '孩子的抚养费根据收入计算',
    titleEn: 'Child support is calculated from income',
    contentZh: '加拿大有联邦《儿童抚养指南》，根据支付方的收入和孩子的人数自动计算金额。这是孩子的权利——父母不能放弃。',
    contentEn: 'The Federal Child Support Guidelines set support amounts based on the payer\'s income and number of children. This is the child\'s right — parents cannot waive it.',
    sourceZh: '《联邦儿童抚养指南》及各省条例',
    sourceEn: 'Federal Child Support Guidelines + provincial regulations',
    sources: SRC_CHILD_SUPPORT,
  },
  {
    id: 'spousal-support',
    titleZh: '你可能有权获得配偶赡养费',
    titleEn: 'You may be entitled to spousal support',
    contentZh: '如果你为家庭付出（带孩子、做家务、放弃事业），即使没有收入，你也可能有权获得赡养费。法院会考虑婚姻长度、双方收入差距和你的需要。',
    contentEn: 'If you contributed to the household (raising children, homemaking, putting your career aside), you may be entitled to spousal support even with no income. Courts consider length of marriage, income gap, and your need.',
    sourceZh: '《离婚法》第15.2条；配偶赡养费指南；各省家庭法',
    sourceEn: 'Divorce Act s 15.2; Spousal Support Advisory Guidelines; provincial family laws',
    sources: SRC_SPOUSAL_SUPPORT,
  },
  {
    id: 'cpp-credit-split',
    titleZh: '离婚时可以平分CPP养老金积分',
    titleEn: 'You can split CPP pension credits on divorce',
    contentZh: '婚姻或同居期间双方的加拿大养老金计划（CPP）积分可以平均分配——即使你从未工作过。这是法律自动允许的，申请通常免费。',
    contentEn: 'Canada Pension Plan credits earned during your marriage or common-law relationship can be divided equally — even if you never worked. The split is allowed by law and applying is usually free.',
    sourceZh: '《加拿大养老金计划》第55, 55.1, 55.2条',
    sourceEn: 'Canada Pension Plan, ss 55, 55.1, 55.2',
    sources: [
      { jurisdiction: 'federal', citation: 'Canada Pension Plan, RSC 1985, c C-8, ss 55, 55.1, 55.2', url: 'https://laws-lois.justice.gc.ca/eng/acts/c-8/' },
    ],
  },
  {
    id: 'ei-benefits',
    titleZh: '你可能有权获得EI产假、育儿假和病假津贴',
    titleEn: 'You may qualify for EI maternity, parental, and sickness benefits',
    contentZh: '联邦《就业保险法》为符合工时要求的母亲提供产假、育儿假和病假津贴，无论婚姻状况如何。这笔钱直接付给你。',
    contentEn: 'The federal Employment Insurance Act provides maternity, parental, and sickness benefits for mothers who meet the hours requirement, regardless of marital status. The money is paid directly to you.',
    sourceZh: '《就业保险法》',
    sourceEn: 'Employment Insurance Act',
    sources: [
      { jurisdiction: 'federal', citation: 'Employment Insurance Act, SC 1996, c 23', url: 'https://laws-lois.justice.gc.ca/eng/acts/e-5.6/' },
    ],
  },
  {
    id: 'canada-child-benefit',
    titleZh: '加拿大儿童福利金（CCB）通常付给主要照顾者',
    titleEn: 'The Canada Child Benefit (CCB) is paid to the primary caregiver',
    contentZh: '加拿大儿童福利金是免税的月度补助，通常付给孩子的"主要照顾者"——多数情况下是母亲。即使你正在分居或与对方住在不同地方，你也可以独立申请。',
    contentEn: 'The Canada Child Benefit is a tax-free monthly payment that goes to the child\'s "primary caregiver" — most often the mother. You can apply on your own even while separating or living apart.',
    sourceZh: '《所得税法》第122.6、122.61条',
    sourceEn: 'Income Tax Act, ss 122.6, 122.61',
    sources: [
      { jurisdiction: 'federal', citation: 'Income Tax Act, RSC 1985, c 1 (5th Supp), ss 122.6, 122.61', url: 'https://laws-lois.justice.gc.ca/eng/acts/i-3.3/' },
    ],
  },
  {
    id: 'legal-aid',
    titleZh: '你可能符合法律援助资格',
    titleEn: 'You may qualify for legal aid',
    contentZh: '即使收入不高，你仍然可以获得免费的法律援助。家庭暴力案件通常优先处理。联系你所在省份/地区的法律援助机构了解详情。',
    contentEn: 'Even with low income, you can still get free legal aid. Family violence cases are usually prioritized. Contact your province or territory\'s legal aid office for details.',
    sourceZh: '各省/地区法律援助法',
    sourceEn: 'Provincial / territorial legal aid statutes',
    sources: SRC_LEGAL_AID,
  },
  {
    id: 'tenant-dv-protection',
    titleZh: '家暴受害者可以提前解除租约',
    titleEn: 'DV survivors can break a lease early',
    contentZh: '大多数省份允许家庭暴力受害者在不交违约金的情况下提前终止租约。通常需要法院文件或合资格专业人士的证明，提前一个月通知房东。',
    contentEn: 'Most provinces let family violence survivors end a tenancy early without penalty. Usually you need court documents or a statement from a qualified professional, plus one month\'s notice to the landlord.',
    sourceZh: '各省《住宅租赁法》',
    sourceEn: 'Provincial Residential Tenancy Acts',
    sources: SRC_TENANT_DV,
  },
  {
    id: 'bank-account-rights',
    titleZh: '你有权开设自己的银行账户',
    titleEn: 'You have the right to open your own bank account',
    contentZh: '在联邦监管的银行，只要你出示两份身份证件（其中一份带照片），就可以开户——即使你没有工作、不会英语、或对方不同意。',
    contentEn: 'At any federally regulated bank, you can open an account by showing two pieces of ID (one with a photo) — even with no job, no English, and no permission from anyone else.',
    sourceZh: '《获取银行基本服务条例》及《银行法》第627.7条',
    sourceEn: 'Access to Basic Banking Services Regulations; Bank Act, s 627.7',
    sources: [
      { jurisdiction: 'federal', citation: 'Access to Basic Banking Services Regulations, SOR/2003-184; Bank Act, SC 1991, c 46, s 627.7', url: 'https://laws-lois.justice.gc.ca/eng/regulations/sor-2003-184/' },
    ],
  },
  {
    id: 'social-assistance',
    titleZh: '你可以独立申请社会援助',
    titleEn: 'You can apply for social assistance on your own',
    contentZh: '永久居民和受保护的人有权申请省级社会援助（"福利"）和儿童福利金，无论婚姻状况如何。担保期内仍可以申请，担保人可能要还款，但你和孩子能拿到帮助。',
    contentEn: 'Permanent residents and protected persons can apply for provincial social assistance ("welfare") and child benefits regardless of marital status. You can apply during a sponsorship — the sponsor may have to repay, but you and your children get the help.',
    sourceZh: '各省/地区社会援助法',
    sourceEn: 'Provincial / territorial social assistance statutes',
    sources: SRC_SOCIAL_ASSISTANCE,
  },
  {
    id: 'court-interpreter',
    titleZh: '你有权在法庭上获得免费翻译',
    titleEn: 'You have the right to a free court interpreter',
    contentZh: '《加拿大权利与自由宪章》保证你在任何法庭程序中获得免费翻译——包括家事法庭、移民聆讯和刑事案件。提前向法院申请。',
    contentEn: 'The Canadian Charter of Rights and Freedoms guarantees a free interpreter in any court proceeding — family court, immigration hearings, and criminal cases. Request one from the court in advance.',
    sourceZh: '《宪章》第14条',
    sourceEn: 'Charter of Rights and Freedoms, s 14',
    sources: [
      { jurisdiction: 'federal', citation: 'Canadian Charter of Rights and Freedoms, s 14, Part I of the Constitution Act, 1982', url: 'https://laws-lois.justice.gc.ca/eng/const/page-12.html' },
    ],
  },
  {
    id: 'health-coverage',
    titleZh: '你的省级医疗卡属于你自己',
    titleEn: 'Your provincial health card belongs to you',
    contentZh: '你的医疗保险（OHIP, MSP, RAMQ等）不会因为离婚或离开配偶而失效。如果对方扣留你的卡，你可以申请补办。',
    contentEn: 'Your provincial health coverage (OHIP, MSP, RAMQ, etc.) does not end if you divorce or leave your spouse. If someone is withholding your card, you can request a replacement.',
    sourceZh: '《加拿大健康法》及各省医疗保险法',
    sourceEn: 'Canada Health Act + provincial health insurance statutes',
    sources: SRC_HEALTH_COVERAGE,
  },
  {
    id: 'school-enrollment',
    titleZh: '所有孩子都有权上学',
    titleEn: 'Every child has the right to go to school',
    contentZh: '加拿大所有儿童都有权免费上公立学校，无论父母的移民身份如何。学校不能因为身份问题拒收孩子。',
    contentEn: 'Every child in Canada has the right to attend public school for free, regardless of their parents\' immigration status. Schools cannot refuse a child because of status.',
    sourceZh: '各省/地区教育法',
    sourceEn: 'Provincial / territorial education statutes',
    sources: SRC_SCHOOL_ENROLLMENT,
  },
  {
    id: 'victim-services',
    titleZh: '每个省都有免费的受害者服务',
    titleEn: 'Every province has free victim services',
    contentZh: '受害者服务工作人员会陪你报警、出庭、申请保护令，并连接你到庇护所和心理咨询。这项服务对你完全免费和保密。',
    contentEn: 'Victim services workers will go with you to file a police report, attend court, apply for protection orders, and connect you with shelters and counselling. The service is free and confidential.',
    sourceZh: '各省/地区受害者服务法',
    sourceEn: 'Provincial / territorial victim services statutes',
    sources: SRC_VICTIM_SERVICES,
  },
  {
    id: 'workplace-harassment',
    titleZh: '工作场所骚扰是违法的',
    titleEn: 'Workplace harassment is illegal',
    contentZh: '每个省份和地区都规定雇主必须防止工作场所骚扰和性骚扰，并提供投诉机制。你可以匿名举报。',
    contentEn: 'Every province and territory requires employers to prevent workplace harassment and sexual harassment, and to provide a complaint process. You can usually report anonymously.',
    sourceZh: '各省职业健康与安全法',
    sourceEn: 'Provincial occupational health & safety statutes',
    sources: SRC_WORKPLACE_HARASSMENT,
  },
  {
    id: 'human-rights-discrimination',
    titleZh: '基于性别、种族或国籍的歧视是违法的',
    titleEn: 'Discrimination by sex, race, or national origin is illegal',
    contentZh: '《加拿大权利与自由宪章》以及每个省/地区的人权法都禁止在就业、住房和服务中基于性别、种族或国籍的歧视。投诉是免费的。',
    contentEn: 'The Canadian Charter and every province/territory\'s human rights code prohibit discrimination in employment, housing and services based on sex, race, or national origin. Filing a complaint is free.',
    sourceZh: '《宪章》第15条；各省人权法',
    sourceEn: 'Charter s 15; provincial / territorial human rights codes',
    sources: SRC_HUMAN_RIGHTS,
  },
  {
    id: 'sexual-violence-leave',
    titleZh: '你有权因家庭暴力或性暴力请假',
    titleEn: 'You have the right to leave work for domestic or sexual violence',
    contentZh: '大多数省份的劳工法规定，家庭或性暴力受害者可以休带薪或不带薪假期，去就医、出庭、搬家或寻求咨询，同时保留工作。',
    contentEn: 'Most provinces\' employment standards laws give survivors of domestic or sexual violence paid or unpaid leave to seek medical care, attend court, relocate, or get counselling — while keeping their job protected.',
    sourceZh: '各省劳工标准法',
    sourceEn: 'Provincial employment standards statutes',
    sources: SRC_DV_LEAVE,
  },
  {
    id: 'coercive-control',
    titleZh: '控制行为是刑事罪行',
    titleEn: 'Coercive and controlling behaviour is a criminal offence',
    contentZh: '2024年起，反复的控制行为——如监视你的行踪、控制你的金钱、限制你与家人联系——属于《刑法》中的犯罪行为，即使没有身体暴力。',
    contentEn: 'Since 2024, a pattern of coercive control — monitoring your movements, controlling your money, isolating you from family — is a criminal offence under the Criminal Code, even without physical violence.',
    sourceZh: '《刑法》第264.01条（2024年生效）',
    sourceEn: 'Criminal Code, s 264.01 (in force 2024)',
    sources: [
      { jurisdiction: 'federal', citation: 'Criminal Code, RSC 1985, c C-46, s 264.01 (controlling or coercive conduct)', url: 'https://laws-lois.justice.gc.ca/eng/acts/c-46/section-264.01.html' },
    ],
  },
  {
    id: 'intimate-images',
    titleZh: '未经同意传播私密图像是犯罪',
    titleEn: 'Sharing intimate images without consent is a crime',
    contentZh: '未经同意发布他人的私密图像（"报复色情"）是刑事罪行，可判入狱五年。多个省份还提供民事诉讼途径，可要求删除图像和赔偿损失。',
    contentEn: 'Publishing someone\'s intimate images without consent ("revenge porn") is a criminal offence punishable by up to five years. Several provinces also provide civil remedies — you can get a court order to remove images and claim damages.',
    sourceZh: '《刑法》第162.1条；各省私密图像保护法',
    sourceEn: 'Criminal Code, s 162.1; provincial intimate image protection statutes',
    sources: SRC_INTIMATE_IMAGES,
  },
  {
    id: 'open-work-permit',
    titleZh: '遭受虐待的外劳可申请开放式工签',
    titleEn: 'Abused temporary workers can get an open work permit',
    contentZh: '如果你持工作签证并遭受雇主虐待（身体暴力、性骚扰、财务剥削、没收证件），你可以申请开放式工签来换雇主，不会失去合法身份。',
    contentEn: 'If you are on a work permit and are being abused by your employer (physical violence, sexual harassment, financial exploitation, document seizure), you can apply for an open work permit to change employers without losing status.',
    sourceZh: '《移民和难民保护条例》第207.1条',
    sourceEn: 'IRPR, s 207.1 (vulnerable worker open work permit)',
    sources: [
      { jurisdiction: 'federal', citation: 'Immigration and Refugee Protection Regulations, SOR/2002-227, s 207.1; IRCC public policy on open work permits for vulnerable workers', url: 'https://www.canada.ca/en/immigration-refugees-citizenship/services/work-canada/permit/temporary/vulnerable-workers.html' },
    ],
  },
  {
    id: 'pay-equity',
    titleZh: '同工同酬是法律要求',
    titleEn: 'Equal pay for equal work is required by law',
    contentZh: '联邦《薪酬公平法》及多个省份的法律要求雇主确保从事同等价值工作的男女获得相同报酬。你可以匿名投诉薪资不公。',
    contentEn: 'The federal Pay Equity Act and several provincial laws require employers to ensure men and women doing work of equal value receive equal pay. You can file a complaint about pay inequity.',
    sourceZh: '联邦《薪酬公平法》及各省薪酬公平法',
    sourceEn: 'Federal Pay Equity Act + provincial pay equity statutes',
    sources: SRC_PAY_EQUITY,
  },
  {
    id: 'medical-consent',
    titleZh: '医疗决定只需你自己同意',
    titleEn: 'Only your own consent is needed for medical decisions',
    contentZh: '在加拿大，所有医疗决定——包括避孕、终止妊娠、精神健康治疗——只需要你自己的知情同意。你的丈夫、家人或担保人都没有否决权。',
    contentEn: 'In Canada, all medical decisions — including contraception, abortion, and mental health care — require only your own informed consent. Your husband, family, or sponsor has no veto.',
    sourceZh: '各省《医疗同意法》；《宪章》第7条（人身自由）',
    sourceEn: 'Provincial health care consent statutes; Charter s 7 (life, liberty and security)',
    sources: [
      { jurisdiction: 'federal', citation: 'Canadian Charter of Rights and Freedoms, s 7 (life, liberty and security of the person)', url: 'https://laws-lois.justice.gc.ca/eng/const/page-12.html' },
      { jurisdiction: 'ON', citation: 'Health Care Consent Act, 1996, SO 1996, c 2, Sch A', url: 'https://www.canlii.org/en/on/laws/stat/so-1996-c-2-sch-a/latest/so-1996-c-2-sch-a.html' },
      { jurisdiction: 'QC', citation: 'Civil Code of Québec, arts 10–25 (integrity of the person / consent to care)', url: 'https://www.canlii.org/en/qc/laws/stat/cqlr-c-ccq-1991/latest/cqlr-c-ccq-1991.html' },
      { jurisdiction: 'BC', citation: 'Health Care (Consent) and Care Facility (Admission) Act, RSBC 1996, c 181', url: 'https://www.canlii.ca/en/bc/laws/stat/rsbc-1996-c-181/latest/rsbc-1996-c-181.html' },
      { jurisdiction: 'AB', citation: 'Personal Directives Act, RSA 2000, c P-6', url: 'https://www.canlii.ca/en/ab/laws/stat/rsa-2000-c-p-6/latest/rsa-2000-c-p-6.html' },
      { jurisdiction: 'NS', citation: 'Personal Directives Act, SNS 2008, c 8', url: 'https://canlii.ca/t/52m5n' },
      { jurisdiction: 'MB', citation: 'The Health Care Directives Act, CCSM c H27', url: 'https://www.canlii.org/en/mb/laws/stat/ccsm-c-h27/latest/ccsm-c-h27.html' },
    ],
  },
  {
    id: 'fgm-illegal',
    titleZh: '女性割礼在加拿大是犯罪',
    titleEn: 'Female genital mutilation (FGM) is a crime in Canada',
    contentZh: '在加拿大，对女性实施任何形式的生殖器切割是严重刑事罪行（加重攻击），最高可判14年监禁。将女孩带出加拿大进行此手术同样违法。',
    contentEn: 'Performing any form of female genital cutting in Canada is a serious criminal offence (aggravated assault), punishable by up to 14 years. Taking a girl out of Canada for the procedure is also illegal.',
    sourceZh: '《刑法》第268条（加重攻击）；第273.3条（域外管辖）',
    sourceEn: 'Criminal Code, s 268 (aggravated assault); s 273.3 (removing child from Canada)',
    sources: [
      { jurisdiction: 'federal', citation: 'Criminal Code, RSC 1985, c C-46, s 268 (aggravated assault — includes FGM)', url: 'https://laws-lois.justice.gc.ca/eng/acts/c-46/section-268.html' },
      { jurisdiction: 'federal', citation: 'Criminal Code, s 273.3 (removal of child from Canada for sexual offence)', url: 'https://laws-lois.justice.gc.ca/eng/acts/c-46/section-273.3.html' },
    ],
  },
  {
    id: 'refugee-gender-persecution',
    titleZh: '基于性别的迫害可以申请难民保护',
    titleEn: 'Gender-based persecution can be grounds for refugee protection',
    contentZh: '如果你因为性别而在原籍国面临迫害（例如家庭暴力、强迫婚姻、"荣誉"暴力），你可以在加拿大申请难民保护。加拿大是世界上最早承认基于性别的难民申请的国家之一。',
    contentEn: 'If you face persecution in your home country because of your gender (e.g. domestic violence, forced marriage, "honour" violence), you can claim refugee protection in Canada. Canada was one of the first countries to recognize gender-based refugee claims.',
    sourceZh: '《移民和难民保护法》第96、97条；IRB性别指南',
    sourceEn: 'IRPA, ss 96, 97; IRB Chairperson\'s Guideline 4 (Gender)',
    sources: [
      { jurisdiction: 'federal', citation: 'Immigration and Refugee Protection Act, SC 2001, c 27, ss 96, 97', url: 'https://laws-lois.justice.gc.ca/eng/acts/i-2.5/' },
      { jurisdiction: 'federal', citation: 'IRB Chairperson\'s Guideline 4: Women Refugee Claimants Fearing Gender-Related Persecution (updated 2022)', url: 'https://irb.gc.ca/en/legal-policy/policies/Pages/GuideDir04.aspx' },
    ],
  },
  {
    id: 'maternity-protection',
    titleZh: '怀孕员工不能被解雇',
    titleEn: 'Pregnant employees cannot be fired',
    contentZh: '因为怀孕或产假而解雇、降职或歧视员工在加拿大是违法的。每个省的劳工法和人权法都保护怀孕员工的权利。',
    contentEn: 'Firing, demoting, or discriminating against an employee because of pregnancy or maternity leave is illegal in Canada. Every province\'s employment standards and human rights laws protect pregnant workers.',
    sourceZh: '《加拿大劳动法》第209.1-209.4条；各省人权法及劳工标准法',
    sourceEn: 'Canada Labour Code, ss 209.1–209.4; provincial human rights + employment standards',
    sources: [
      { jurisdiction: 'federal', citation: 'Canada Labour Code, RSC 1985, c L-2, ss 206–206.2 (maternity/parental leave)', url: 'https://laws-lois.justice.gc.ca/eng/acts/l-2/' },
      { jurisdiction: 'federal', citation: 'Canadian Human Rights Act, RSC 1985, c H-6, ss 3, 7 (sex/pregnancy discrimination)', url: 'https://laws-lois.justice.gc.ca/eng/acts/h-6/' },
    ],
  },
];
