export interface TermSplit {
  term: string | null;
  body: string;
}

export type RichSegment =
  | { kind: 'text'; value: string }
  | { kind: 'number'; value: string }
  | { kind: 'term'; value: string };

export type MasteryTone = 'low' | 'mid' | 'high';
export type PaceTone = 'ok' | 'warn' | 'over';

/**
 * Splits a study point or summary into a lead-in Term and its Definition/Explanation
 * when formatted like "BIOS / UEFI & POST: Firmware that runs...".
 * Avoids false splits on URLs (https://), time (0:00), or Excel cell ranges (B2:B10).
 */
export function splitTermAndExplanation(input: string): TermSplit {
  const colonIdx = input.indexOf(':');
  if (colonIdx < 2 || colonIdx > 72) {
    return { term: null, body: input };
  }

  const prefix = input.slice(0, colonIdx).trim();
  const after = input.slice(colonIdx + 1);

  if (/^https?$/i.test(prefix)) {
    return { term: null, body: input };
  }

  // Must be followed by whitespace (not B2:B10 or 0:00 or 1:M)
  if (!/^\s/.test(after)) {
    return { term: null, body: input };
  }

  // Avoid splitting full sentences before a list colon if very long or ending with period
  if (prefix.includes('. ')) {
    return { term: null, body: input };
  }

  return {
    term: prefix,
    body: after.trimStart(),
  };
}

const TOKEN_REGEX =
  /(?<formula>=[A-Z][A-Z0-9_]*\([^)]*\))|(?<html><\/?[a-z][a-z0-9]*(?:\s+[^>]*)?>)|(?<num>(?:\bR\s?\d+(?:[.,]\d+)?(?:\s\d{3})*)|(?:[+-]?\d+(?:[.,]\d+)?(?:\s\d{3})*(?:\s?(?:%|marks?|mark|GB|MB|KB|TB|PB|EB|GHz|MHz|MT\/s|Mbps|Gbps|bps|ms|min|hours?|hrs?|rpm|nm|px|°C)\b|%))|(?:\b\d{3,4}\s?[×x]\s?\d{3,4}\b)|(?:\b\d+\s?[–-]\s?\d+(?:\s?(?:%|GB|MB|marks?|bits?)\b)?)|(?<![A-Za-z0-9_\/-])\b\d+(?:[.,]\d+)?(?:\s\d{3})*\b(?![A-Za-z0-9_]))|(?<acr>\b(?:IPO\+S\+C|RAM|ROM|DRAM|SRAM|BIOS|UEFI|CMOS|POST|CPU|ALU|CU|GPU|VRAM|SSD|HDD|NVMe|DIMM|SO-DIMM|PCIe|SATA|M\.2|USB-C|USB|HDMI|VGA|RJ-45|UPS|UTP|STP|LAN|WAN|PAN|MAN|GAN|ISP|URL|DNS|HTTPS|HTTP|SSL|TLS|VPN|VoIP|FTP|NFC|IoT|RFID|POPIA|BYOD|AUP|DDoS|2FA|MFA|EULA|OCR|OMR|MICR|DIKW|PK|FK|QBE|HTML5|HTML|CSS|EFT|4IR|5IR|GDPR|WPA2|WPA3|IPv4|IPv6|DDR4|DDR5|NAS|RAID|ECC|SaaS|PaaS|IaaS|OS|GUI|CLI|CSV|PDF|ZIP|AI|VR|AR|QR|GPS|LTE|5G|4G|Wi-Fi|VLOOKUP|COUNTIF|SUMIF|AVERAGEIF)\b)/g;

/**
 * Tokenises explanation text into plain text, highlighted numeric quantities/marks,
 * and key technical terms/acronyms/formulas/HTML tags.
 */
export function tokenizeRichSegments(text: string): RichSegment[] {
  if (!text) return [];
  const segments: RichSegment[] = [];
  let lastIndex = 0;

  TOKEN_REGEX.lastIndex = 0;
  let match: RegExpExecArray | null;

  while ((match = TOKEN_REGEX.exec(text)) !== null) {
    if (match.index > lastIndex) {
      segments.push({ kind: 'text', value: text.slice(lastIndex, match.index) });
    }

    const groups = match.groups ?? {};
    if (groups.num) {
      segments.push({ kind: 'number', value: groups.num });
    } else {
      segments.push({ kind: 'term', value: match[0] });
    }

    lastIndex = TOKEN_REGEX.lastIndex;
  }

  if (lastIndex < text.length) {
    segments.push({ kind: 'text', value: text.slice(lastIndex) });
  }

  return segments;
}

export function getMasteryTone(percent: number): MasteryTone {
  if (percent >= 75) return 'high';
  if (percent >= 35) return 'mid';
  return 'low';
}

export function getGoalTone(count: number, target: number = 10): MasteryTone {
  if (count >= target) return 'high';
  if (count > 0) return 'mid';
  return 'low';
}

export function getExamPaceTone(elapsedSec: number, marks: number): PaceTone {
  const budgetSec = Math.max(60, Math.round(marks * 72));
  if (elapsedSec <= budgetSec) return 'ok';
  if (elapsedSec <= Math.round(budgetSec * 1.3)) return 'warn';
  return 'over';
}

export function getChecklistTone(checked: number, total: number): MasteryTone {
  if (total <= 0 || checked === 0) return 'low';
  const ratio = checked / total;
  if (ratio >= 0.8) return 'high';
  if (ratio >= 0.4) return 'mid';
  return 'low';
}
