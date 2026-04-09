import { rightsCards, type RightsCard } from '@/data/rights';
import { canadaResources, type CanadaResource } from '@/data/canadaResources';

export type ChatLanguage = 'zh' | 'zh-Hant' | 'en';

export function getRelevantSourceUrl(card: RightsCard, provinceCode?: string | null): string | undefined {
  if (!card.sources) return undefined;
  const provincial = provinceCode
    ? card.sources.find(s => s.jurisdiction === provinceCode)
    : undefined;
  if (provincial?.url) return provincial.url;
  const federal = card.sources.find(s => s.jurisdiction === 'federal');
  return federal?.url;
}

export function lookupRights(ids: string[]): RightsCard[] {
  return ids
    .map((id) => rightsCards.find((r) => r.id === id))
    .filter((r): r is RightsCard => Boolean(r));
}

export function lookupResources(ids: string[]): CanadaResource[] {
  return ids
    .map((id) => canadaResources.find((r) => r.id === id))
    .filter((r): r is CanadaResource => Boolean(r));
}

interface KnowledgeContextArgs {
  city?: string | null;
  provinceCode?: string | null;
  language: ChatLanguage;
}

// Build a knowledge blob for the system prompt.
// Strategy: full rights set (only ~10 cards) + ALL resources but with
// compact fields. Resources nearest the user are listed first and get a
// 1-line description; far ones are listed as tiny stubs (id/name/city/
// type/phone) so the model can still recommend them by id.
export function buildKnowledgeContext({ city, provinceCode, language }: KnowledgeContextArgs): string {
  const useEn = language === 'en';

  const rights = rightsCards.map((r) => ({
    id: r.id,
    title: useEn ? r.titleEn : (language === 'zh-Hant' && r.titleHant) || r.titleZh,
    content: useEn ? r.contentEn : (language === 'zh-Hant' && r.contentHant) || r.contentZh,
    source: useEn ? r.sourceEn : (language === 'zh-Hant' && r.sourceHant) || r.sourceZh,
    // Federal sources always included; provincial only for user's province
    legalSources: (r.sources ?? [])
      .filter(s => s.jurisdiction === 'federal' || s.jurisdiction === provinceCode)
      .map(s => ({ jurisdiction: s.jurisdiction, citation: s.citation, url: s.url })),
  }));

  const isNear = (r: typeof canadaResources[number]) => {
    if (r.isNational) return true;
    if (provinceCode && r.provinceCode === provinceCode) return true;
    if (city && r.city.toLowerCase() === city.toLowerCase()) return true;
    return false;
  };

  const near = canadaResources.filter(isNear);
  const far = canadaResources.filter((r) => !isNear(r));

  const nearResources = near.map((r) => ({
    id: r.id,
    name: useEn ? r.nameEn : r.nameZh,
    phone: r.phone,
    type: r.type,
    city: r.city,
    province: r.provinceCode,
    languages: r.languages,
    desc: (useEn ? r.descriptionEn : r.descriptionZh).slice(0, 140),
  }));

  // Compact stubs — keep id discoverable for any Canadian city
  const farResources = far.map((r) => ({
    id: r.id,
    name: useEn ? r.nameEn : r.nameZh,
    phone: r.phone,
    type: r.type,
    city: r.city,
    province: r.provinceCode,
  }));

  return JSON.stringify({ rights, nearResources, farResources });
}

export function buildSystemPrompt(args: KnowledgeContextArgs): string {
  const { language, city, provinceCode } = args;
  const knowledge = buildKnowledgeContext(args);

  const langInstruction =
    language === 'zh'
      ? 'Reply ONLY in Simplified Chinese (简体中文).'
      : language === 'zh-Hant'
      ? 'Reply ONLY in Traditional Chinese (繁體中文).'
      : 'Reply ONLY in English.';

  const locLine = city || provinceCode ? `User location: ${city ?? '?'} / ${provinceCode ?? '?'}.` : 'User location: unknown.';

  return `You are HerRight, an empathetic AI companion for women in Canada — many of them Chinese immigrants — facing family violence, immigration fear, legal questions, or isolation. They are often scared, ashamed, exhausted, or don't know who to trust. You may be the first person they've told.

HOW TO REPLY (in this order, every time):

1. FEELINGS FIRST. Open with one short, human sentence that names what they might be feeling and tells them they are not alone. Examples: "I hear you — being hurt is terrifying, and I'm so glad you reached out." / "That sounds exhausting. You don't have to carry this by yourself." Never skip this step. Never start with "Call 911" unless step 2 applies.

2. SAFETY OVERRIDE. If the user signals IMMEDIATE physical danger (being hit, attacked right now, "he is here", "not safe", "he has a weapon", "I am hurt"), then AFTER the one feelings sentence, the very next line must tell them to call 911. Then continue with grounded next steps.

3. CONCRETE NEXT STEPS. Give 1–3 small, doable actions grounded ONLY in the KNOWLEDGE below. Never invent phone numbers, laws, organizations, or addresses. If you don't have a fact, say so plainly.

4. POINT TO INDEXED HELP. The KNOWLEDGE contains a full index of Canadian resources (nearResources = user's province + national; farResources = every other city, listed as stubs). You may recommend a farResource by id if it's the right fit (e.g. user mentions a city we have coverage for). Always end with the CARDS line so the UI can render the cards as tappable.

5. TONE. Warm, brief, plain language. Short paragraphs (2–4 sentences max each). No markdown headers. No bullet symbols other than "•". Never lecture. Never moralize. Never ask the user to justify their situation. ${langInstruction}

${locLine}

INLINE CITATIONS (REQUIRED when any rights/resources are relevant — max 4 total):
Place [N:card-id] markers INLINE in your prose, right after the sentence they support. N starts at 1 and increments.
Example: "你可以申请保护令 [1:protection-order]。也可以联系庇护所 [2:vancouver-shelter]。"
Never fabricate ids. If nothing in KNOWLEDGE is relevant, omit citations entirely.

LEGAL SOURCES: Each rights card includes legalSources — federal statutes always apply; provincial statutes are pre-filtered to the user's province. When citing a right, briefly mention the specific law name (e.g. "under the Family Law Act") to build trust. Do not cite laws from other provinces.

KNOWLEDGE (JSON):
${knowledge}`;
}
