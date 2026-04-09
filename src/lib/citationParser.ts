import { rightsCards } from '@/data/rights';
import { canadaResources } from '@/data/canadaResources';

export interface Citation {
  index: number;
  cardId: string;
  type: 'right' | 'resource';
}

export interface ParseResult {
  displayText: string;
  citations: Citation[];
  rightIds: string[];
  resourceIds: string[];
  hasTrailingPartial: boolean;
}

// [N:card-id] inline format
const INLINE_RE = /\[(\d+):([a-z0-9-]+)\]/g;
// Trailing partial marker during streaming
const TRAILING_PARTIAL_RE = /\[\d*:?[a-z0-9-]*$/;
// <<CARDS:id1,id2>> legacy format
const LEGACY_TRAILER_RE = /<<CARDS:([^>]*)>>\s*$/;
// CARDS: [id1], [id2] or CARDS: id1, id2 — the format the model sometimes uses
const CARDS_LINE_RE = /\n?\s*CARDS:\s*(.+)$/i;

function classifyId(id: string): 'right' | 'resource' | null {
  if (rightsCards.some((r) => r.id === id)) return 'right';
  if (canadaResources.some((r) => r.id === id)) return 'resource';
  return null;
}

function extractIds(raw: string): string[] {
  // Handle [id], id, or any mix — strip brackets, split on commas/spaces
  return raw
    .replace(/[\[\]]/g, '')
    .split(/[,;]\s*/)
    .map(s => s.trim())
    .filter(Boolean);
}

function buildResult(ids: string[], displayText: string): ParseResult | null {
  const citations: Citation[] = [];
  const rightIds: string[] = [];
  const resourceIds: string[] = [];
  let index = 1;
  for (const id of ids) {
    const type = classifyId(id);
    if (type) {
      citations.push({ index, cardId: id, type });
      if (type === 'right') rightIds.push(id);
      else resourceIds.push(id);
      index++;
    }
  }
  if (citations.length === 0) return null;
  return { displayText, citations, rightIds, resourceIds, hasTrailingPartial: false };
}

function parseInline(raw: string, streaming: boolean): ParseResult | null {
  const citations: Citation[] = [];
  const rightIds: string[] = [];
  const resourceIds: string[] = [];

  let match: RegExpExecArray | null;
  const re = new RegExp(INLINE_RE.source, 'g');
  while ((match = re.exec(raw)) !== null) {
    const index = parseInt(match[1], 10);
    const cardId = match[2];
    const type = classifyId(cardId);
    if (type) {
      citations.push({ index, cardId, type });
      if (type === 'right') rightIds.push(cardId);
      else resourceIds.push(cardId);
    }
  }

  if (citations.length === 0 && !streaming) return null;

  let displayText = raw.replace(INLINE_RE, (_, n) => `[${n}]`);
  displayText = displayText.replace(LEGACY_TRAILER_RE, '').replace(CARDS_LINE_RE, '').trim();

  let hasTrailingPartial = false;
  if (streaming) {
    const partialMatch = displayText.match(TRAILING_PARTIAL_RE);
    if (partialMatch) {
      hasTrailingPartial = true;
      displayText = displayText.slice(0, partialMatch.index).trimEnd();
    }
  }

  return { displayText, citations, rightIds, resourceIds, hasTrailingPartial };
}

function parseCardsLine(raw: string): ParseResult | null {
  const match = raw.match(CARDS_LINE_RE);
  if (!match) return null;
  const ids = extractIds(match[1]);
  const displayText = raw.replace(CARDS_LINE_RE, '').trim();
  return buildResult(ids, displayText);
}

function parseLegacyTrailer(raw: string): ParseResult | null {
  const match = raw.match(LEGACY_TRAILER_RE);
  if (!match) return null;
  const ids = match[1].split(',').map(s => s.trim()).filter(Boolean);
  const displayText = raw.replace(LEGACY_TRAILER_RE, '').trim();
  return buildResult(ids, displayText);
}

const EMPTY: ParseResult = {
  displayText: '',
  citations: [],
  rightIds: [],
  resourceIds: [],
  hasTrailingPartial: false,
};

export function parseChatMessage(
  raw: string,
  opts?: { streaming?: boolean }
): ParseResult {
  if (!raw) return { ...EMPTY, displayText: raw };

  const streaming = opts?.streaming ?? false;

  // Try [N:card-id] inline format first
  const inline = parseInline(raw, streaming);
  if (inline && inline.citations.length > 0) return inline;

  // During streaming, don't try trailer formats (they appear at the end)
  if (streaming) {
    let displayText = raw;
    let hasTrailingPartial = false;
    const partialMatch = displayText.match(TRAILING_PARTIAL_RE);
    if (partialMatch) {
      hasTrailingPartial = true;
      displayText = displayText.slice(0, partialMatch.index).trimEnd();
    }
    return { displayText, citations: [], rightIds: [], resourceIds: [], hasTrailingPartial };
  }

  // Try CARDS: [id1], [id2] format
  const cards = parseCardsLine(raw);
  if (cards) return cards;

  // Try <<CARDS:id1,id2>> legacy format
  const legacy = parseLegacyTrailer(raw);
  if (legacy) return legacy;

  return { ...EMPTY, displayText: raw };
}
