import React from 'react';
import { DiagramId } from '../types/cat';

interface DiagramProps {
  id: DiagramId;
}

const DIAGRAM_TITLES: Record<DiagramId, string> = {
  'ipo-cycle': 'Information Processing Cycle (IPO+S+C)',
  'memory-hierarchy': 'CPU Cache, RAM, Virtual Memory & Storage Hierarchy',
  'storage-units': 'Binary Storage Multiples (× 1 024 per step)',
  'boot-sequence': 'Startup Sequence: Power → BIOS/POST → CMOS → OS in RAM',
  'software-layers': 'System Software vs Application Software Layers',
  topologies: 'Network Topologies: Star, Bus, Ring & Mesh',
  'lan-router-switch': 'LAN Switch (Internal) vs Router (Inter-Network & Internet)',
  'attenuation-emi': 'UTP Copper Attenuation & EMI vs Fibre Optic Light',
  'vpn-tunnel': 'VPN Encrypted Tunnel Over Public Internet',
  'https-ssl': 'HTTPS: SSL/TLS Encryption & Digital Certificate Verification',
  'client-server-p2p': 'Client-Server vs Peer-to-Peer Architecture',
  'dikw-pyramid': 'DIKW Hierarchy: Data → Information → Knowledge → Wisdom',
  'trace-table': 'Algorithm Trace Table Walkthrough',
  'phishing-pharming': 'Phishing (Fake Link) vs Pharming (DNS/Hosts Redirect)',
  'validation-verification': 'Data Validation (Format/Range) vs Verification (Source Truth)',
  'mail-merge': 'Mail Merge: Main Document + Data Source → Personalised Output',
  'excel-referencing': 'Excel Relative (A1) vs Absolute ($F$1) Referencing',
  'db-pk-fk': 'Access One-to-Many Relationship (PK → FK & Referential Integrity)',
  'html-structure': 'HTML5 Document Skeleton & Common Element Tags',
};

export const ConceptDiagram: React.FC<DiagramProps> = ({ id }) => {
  return (
    <figure className="my-4 rounded-xl border border-slate-200 bg-slate-50/70 p-4 dark:border-slate-800 dark:bg-slate-900/60">
      <div className="w-full overflow-x-auto">{renderSvg(id)}</div>
      <figcaption className="mt-2 text-center text-xs font-medium text-slate-600 dark:text-slate-400">
        {DIAGRAM_TITLES[id]}
      </figcaption>
    </figure>
  );
};

function renderSvg(id: DiagramId): React.ReactNode {
  const boxCls = 'fill-white stroke-blue-600 dark:fill-slate-800 dark:stroke-blue-400';
  const accentBoxCls = 'fill-blue-50 stroke-blue-700 dark:fill-blue-950/60 dark:stroke-blue-400';
  const warnBoxCls = 'fill-amber-50 stroke-amber-600 dark:fill-amber-950/50 dark:stroke-amber-400';
  const okBoxCls = 'fill-emerald-50 stroke-emerald-600 dark:fill-emerald-950/50 dark:stroke-emerald-400';
  const txtCls = 'fill-slate-900 dark:fill-slate-100 text-[11px] font-medium';
  const mutCls = 'fill-slate-500 dark:fill-slate-400 text-[10px]';
  const lineCls = 'stroke-slate-400 dark:stroke-slate-500';

  switch (id) {
    case 'ipo-cycle':
      return (
        <svg viewBox="0 0 640 120" className="mx-auto w-full max-w-2xl" role="img" aria-label={DIAGRAM_TITLES[id]}>
          {[
            { x: 10, label: 'Input', sub: 'Keyboard, QR, Sensor' },
            { x: 138, label: 'Processing', sub: 'CPU + RAM' },
            { x: 266, label: 'Output', sub: 'Display, Print, Control' },
            { x: 394, label: 'Storage', sub: 'SSD, HDD, Cloud' },
            { x: 522, label: 'Communicate', sub: 'LAN, Router, Internet' },
          ].map((b, i) => (
            <g key={b.label}>
              <rect x={b.x} y={24} width={108} height={64} rx={8} strokeWidth={1.5} className={i === 1 ? accentBoxCls : boxCls} />
              <text x={b.x + 54} y={50} textAnchor="middle" className={txtCls}>{b.label}</text>
              <text x={b.x + 54} y={68} textAnchor="middle" className={mutCls}>{b.sub}</text>
              {i < 4 && (
                <path d={`M ${b.x + 110} 56 L ${b.x + 126} 56`} strokeWidth={1.8} className={lineCls} markerEnd="url(#arr)" />
              )}
            </g>
          ))}
          <defs>
            <marker id="arr" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
              <path d="M 0 1 L 10 5 L 0 9 z" className="fill-slate-500" />
            </marker>
          </defs>
        </svg>
      );

    case 'storage-units':
      return (
        <svg viewBox="0 0 640 105" className="mx-auto w-full max-w-2xl" role="img" aria-label={DIAGRAM_TITLES[id]}>
          {['Byte (8 b)', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB'].map((u, i) => (
            <g key={u}>
              <rect x={12 + i * 90} y={26} width={72} height={44} rx={8} strokeWidth={1.5} className={i % 2 === 0 ? accentBoxCls : boxCls} />
              <text x={48 + i * 90} y={52} textAnchor="middle" className={txtCls}>{u}</text>
              {i < 6 && (
                <text x={93 + i * 90} y={20} textAnchor="middle" className={mutCls}>×1024</text>
              )}
            </g>
          ))}
          <text x={320} y={92} textAnchor="middle" className={mutCls}>Each binary step multiplies by 1 024 (2¹⁰)</text>
        </svg>
      );

    case 'boot-sequence':
      return (
        <svg viewBox="0 0 640 120" className="mx-auto w-full max-w-2xl" role="img" aria-label={DIAGRAM_TITLES[id]}>
          {[
            { x: 10, t: '1. Power On', s: 'PSU energises board' },
            { x: 136, t: '2. BIOS / UEFI', s: 'Reads ROM firmware' },
            { x: 262, t: '3. POST + CMOS', s: 'Checks RAM & clock' },
            { x: 388, t: '4. Bootloader', s: 'Finds OS on SSD/HDD' },
            { x: 514, t: '5. OS in RAM', s: 'Desktop ready' },
          ].map((s, i) => (
            <g key={s.t}>
              <rect x={s.x} y={22} width={114} height={66} rx={8} strokeWidth={1.5} className={i === 2 ? warnBoxCls : boxCls} />
              <text x={s.x + 57} y={48} textAnchor="middle" className={txtCls}>{s.t}</text>
              <text x={s.x + 57} y={66} textAnchor="middle" className={mutCls}>{s.s}</text>
              {i < 4 && <line x1={s.x + 115} y1={55} x2={s.x + 125} y2={55} strokeWidth={1.8} className={lineCls} />}
            </g>
          ))}
        </svg>
      );

    case 'memory-hierarchy':
      return (
        <svg viewBox="0 0 600 130" className="mx-auto w-full max-w-xl" role="img" aria-label={DIAGRAM_TITLES[id]}>
          {[
            { x: 180, y: 8, w: 240, t: 'CPU Cache (SRAM) — Fastest · Smallest', c: accentBoxCls },
            { x: 135, y: 38, w: 330, t: 'Main RAM (DDR4/DDR5) — Volatile Working Space', c: boxCls },
            { x: 90, y: 68, w: 420, t: 'SSD / Virtual Memory Pagefile — Non-Volatile Flash', c: okBoxCls },
            { x: 45, y: 98, w: 510, t: 'HDD / NAS / Cloud Archive — Largest Capacity · Slowest', c: warnBoxCls },
          ].map((row) => (
            <g key={row.t}>
              <rect x={row.x} y={row.y} width={row.w} height={24} rx={6} strokeWidth={1.4} className={row.c} />
              <text x={300} y={row.y + 16} textAnchor="middle" className={txtCls}>{row.t}</text>
            </g>
          ))}
        </svg>
      );

    case 'software-layers':
      return (
        <svg viewBox="0 0 540 132" className="mx-auto w-full max-w-lg" role="img" aria-label={DIAGRAM_TITLES[id]}>
          <rect x={40} y={10} width={460} height={32} rx={8} strokeWidth={1.5} className={accentBoxCls} />
          <text x={270} y={30} textAnchor="middle" className={txtCls}>Application Software (Word, Excel, Access, Browsers)</text>
          <rect x={40} y={50} width={460} height={32} rx={8} strokeWidth={1.5} className={okBoxCls} />
          <text x={270} y={70} textAnchor="middle" className={txtCls}>System Software (OS + Device Drivers + Utilities + VM)</text>
          <rect x={40} y={90} width={460} height={32} rx={8} strokeWidth={1.5} className={boxCls} />
          <text x={270} y={110} textAnchor="middle" className={txtCls}>Hardware (CPU, RAM, SSD, Printer, NIC, Motherboard)</text>
        </svg>
      );

    case 'topologies':
      return (
        <svg viewBox="0 0 640 140" className="mx-auto w-full max-w-2xl" role="img" aria-label={DIAGRAM_TITLES[id]}>
          {/* Star */}
          <g>
            <rect x={12} y={10} width={140} height={116} rx={8} strokeWidth={1.2} className={boxCls} />
            <circle cx={82} cy={62} r={12} strokeWidth={1.5} className={accentBoxCls} />
            <text x={82} y={66} textAnchor="middle" className={mutCls}>SW</text>
            {[[42, 32], [122, 32], [42, 92], [122, 92]].map(([nx, ny], i) => (
              <g key={i}>
                <line x1={82} y1={62} x2={nx} y2={ny} strokeWidth={1.4} className={lineCls} />
                <circle cx={nx} cy={ny} r={7} strokeWidth={1.4} className={okBoxCls} />
              </g>
            ))}
            <text x={82} y={118} textAnchor="middle" className={txtCls}>Star</text>
          </g>
          {/* Bus */}
          <g>
            <rect x={170} y={10} width={140} height={116} rx={8} strokeWidth={1.2} className={boxCls} />
            <line x1={186} y1={62} x2={294} y2={62} strokeWidth={2.5} className={lineCls} />
            {[200, 240, 280].map((nx, i) => (
              <g key={i}>
                <line x1={nx} y1={62} x2={nx} y2={i % 2 === 0 ? 34 : 88} strokeWidth={1.4} className={lineCls} />
                <circle cx={nx} cy={i % 2 === 0 ? 34 : 88} r={7} strokeWidth={1.4} className={warnBoxCls} />
              </g>
            ))}
            <text x={240} y={118} textAnchor="middle" className={txtCls}>Bus (Backbone)</text>
          </g>
          {/* Ring */}
          <g>
            <rect x={328} y={10} width={140} height={116} rx={8} strokeWidth={1.2} className={boxCls} />
            <circle cx={398} cy={62} r={28} fill="none" strokeWidth={1.8} className={lineCls} />
            {[[398, 34], [426, 62], [398, 90], [370, 62]].map(([nx, ny], i) => (
              <circle key={i} cx={nx} cy={ny} r={7} strokeWidth={1.4} className={accentBoxCls} />
            ))}
            <text x={398} y={118} textAnchor="middle" className={txtCls}>Ring</text>
          </g>
          {/* Mesh */}
          <g>
            <rect x={486} y={10} width={140} height={116} rx={8} strokeWidth={1.2} className={boxCls} />
            {[[526, 36], [586, 36], [526, 86], [586, 86]].map(([x1, y1], i, arr) =>
              arr.slice(i + 1).map(([x2, y2], j) => (
                <line key={`${i}-${j}`} x1={x1} y1={y1} x2={x2} y2={y2} strokeWidth={1.3} className={lineCls} />
              ))
            )}
            {[[526, 36], [586, 36], [526, 86], [586, 86]].map(([nx, ny], i) => (
              <circle key={i} cx={nx} cy={ny} r={7} strokeWidth={1.4} className={okBoxCls} />
            ))}
            <text x={556} y={118} textAnchor="middle" className={txtCls}>Mesh (Redundant)</text>
          </g>
        </svg>
      );

    case 'lan-router-switch':
    case 'client-server-p2p':
      return (
        <svg viewBox="0 0 640 124" className="mx-auto w-full max-w-2xl" role="img" aria-label={DIAGRAM_TITLES[id]}>
          <rect x={14} y={22} width={120} height={74} rx={8} strokeWidth={1.5} className={boxCls} />
          <text x={74} y={54} textAnchor="middle" className={txtCls}>Workstations</text>
          <text x={74} y={72} textAnchor="middle" className={mutCls}>PCs & Printers</text>
          <line x1={134} y1={59} x2={172} y2={59} strokeWidth={1.8} className={lineCls} />
          <rect x={172} y={22} width={128} height={74} rx={8} strokeWidth={1.5} className={accentBoxCls} />
          <text x={236} y={52} textAnchor="middle" className={txtCls}>LAN Switch</text>
          <text x={236} y={70} textAnchor="middle" className={mutCls}>Unicast by MAC</text>
          <line x1={300} y1={59} x2={338} y2={59} strokeWidth={1.8} className={lineCls} />
          <rect x={338} y={22} width={128} height={74} rx={8} strokeWidth={1.5} className={okBoxCls} />
          <text x={402} y={52} textAnchor="middle" className={txtCls}>Router + Firewall</text>
          <text x={402} y={70} textAnchor="middle" className={mutCls}>Routes IP / DHCP</text>
          <line x1={466} y1={59} x2={504} y2={59} strokeWidth={1.8} className={lineCls} />
          <rect x={504} y={22} width={120} height={74} rx={8} strokeWidth={1.5} className={warnBoxCls} />
          <text x={564} y={52} textAnchor="middle" className={txtCls}>ISP / Internet</text>
          <text x={564} y={70} textAnchor="middle" className={mutCls}>Fibre / 5G / Cloud</text>
        </svg>
      );

    case 'attenuation-emi':
      return (
        <svg viewBox="0 0 640 120" className="mx-auto w-full max-w-2xl" role="img" aria-label={DIAGRAM_TITLES[id]}>
          <rect x={12} y={12} width={296} height={96} rx={8} strokeWidth={1.4} className={warnBoxCls} />
          <text x={160} y={34} textAnchor="middle" className={txtCls}>UTP Copper (&gt;100 m): Attenuation + EMI</text>
          <path d="M 32 72 Q 52 44 72 72 T 112 72 T 152 72 Q 172 64 192 72 T 232 72 T 272 72" fill="none" strokeWidth={2} className="stroke-amber-600 dark:stroke-amber-400" />
          <text x={160} y={96} textAnchor="middle" className={mutCls}>Signal weakens with distance &amp; electrical noise</text>

          <rect x={332} y={12} width={296} height={96} rx={8} strokeWidth={1.4} className={okBoxCls} />
          <text x={480} y={34} textAnchor="middle" className={txtCls}>Fibre Optic (Light Pulses): EMI Immune</text>
          <line x1={356} y1={68} x2={604} y2={68} strokeWidth={3} className="stroke-emerald-600 dark:stroke-emerald-400" />
          <text x={480} y={96} textAnchor="middle" className={mutCls}>Kilometre range · immune to interference</text>
        </svg>
      );

    case 'vpn-tunnel':
    case 'https-ssl':
      return (
        <svg viewBox="0 0 640 116" className="mx-auto w-full max-w-2xl" role="img" aria-label={DIAGRAM_TITLES[id]}>
          <rect x={16} y={24} width={136} height={64} rx={8} strokeWidth={1.5} className={boxCls} />
          <text x={84} y={52} textAnchor="middle" className={txtCls}>Client Device</text>
          <text x={84} y={70} textAnchor="middle" className={mutCls}>Browser / VPN App</text>
          <rect x={182} y={30} width={276} height={52} rx={24} strokeWidth={1.8} strokeDasharray="5 3" className={okBoxCls} />
          <text x={320} y={53} textAnchor="middle" className={txtCls}>Encrypted Tunnel (SSL/TLS or VPN)</text>
          <text x={320} y={70} textAnchor="middle" className={mutCls}>Public Internet — Eavesdroppers see ciphertext</text>
          <line x1={152} y1={56} x2={182} y2={56} strokeWidth={1.6} className={lineCls} />
          <line x1={458} y1={56} x2={488} y2={56} strokeWidth={1.6} className={lineCls} />
          <rect x={488} y={24} width={136} height={64} rx={8} strokeWidth={1.5} className={accentBoxCls} />
          <text x={556} y={52} textAnchor="middle" className={txtCls}>Target Server</text>
          <text x={556} y={70} textAnchor="middle" className={mutCls}>Digital Cert / LAN</text>
        </svg>
      );

    case 'dikw-pyramid':
      return (
        <svg viewBox="0 0 600 132" className="mx-auto w-full max-w-xl" role="img" aria-label={DIAGRAM_TITLES[id]}>
          {[
            { x: 205, y: 8, w: 190, t: 'Wisdom · Ethical Judgement', c: okBoxCls },
            { x: 155, y: 38, w: 290, t: 'Knowledge · Experience & Patterns', c: accentBoxCls },
            { x: 105, y: 68, w: 390, t: 'Information · Processed & Organised Data', c: boxCls },
            { x: 55, y: 98, w: 490, t: 'Data · Raw Unprocessed Facts (e.g. 40, 65, 85)', c: warnBoxCls },
          ].map((r) => (
            <g key={r.t}>
              <rect x={r.x} y={r.y} width={r.w} height={24} rx={6} strokeWidth={1.4} className={r.c} />
              <text x={300} y={r.y + 16} textAnchor="middle" className={txtCls}>{r.t}</text>
            </g>
          ))}
        </svg>
      );

    case 'trace-table':
      return (
        <svg viewBox="0 0 600 132" className="mx-auto w-full max-w-xl" role="img" aria-label={DIAGRAM_TITLES[id]}>
          <rect x={20} y={10} width={560} height={112} rx={8} strokeWidth={1.4} className={boxCls} />
          <rect x={20} y={10} width={560} height={28} rx={8} strokeWidth={1.4} className={accentBoxCls} />
          {['Step', 'mark', 'mark >= 50', 'count', 'total'].map((col, i) => (
            <text key={col} x={75 + i * 112} y={28} textAnchor="middle" className={txtCls}>{col}</text>
          ))}
          {[
            ['Init', '—', '—', '0', '0'],
            ['Row 1', '40', 'False', '0', '40'],
            ['Row 2', '65', 'True', '1', '105'],
            ['Row 3', '50', 'True (>=)', '2', '155'],
          ].map((row, r) =>
            row.map((val, c) => (
              <text key={`${r}-${c}`} x={75 + c * 112} y={56 + r * 18} textAnchor="middle" className={mutCls}>{val}</text>
            ))
          )}
        </svg>
      );

    case 'phishing-pharming':
      return (
        <svg viewBox="0 0 640 120" className="mx-auto w-full max-w-2xl" role="img" aria-label={DIAGRAM_TITLES[id]}>
          <rect x={14} y={14} width={296} height={92} rx={8} strokeWidth={1.4} className={warnBoxCls} />
          <text x={162} y={36} textAnchor="middle" className={txtCls}>Phishing (Social Engineering Trap)</text>
          <text x={162} y={58} textAnchor="middle" className={mutCls}>Fake email/SMS → victim clicks bad link</text>
          <text x={162} y={78} textAnchor="middle" className={mutCls}>Lands on counterfeit login site</text>

          <rect x={330} y={14} width={296} height={92} rx={8} strokeWidth={1.4} className={accentBoxCls} />
          <text x={478} y={36} textAnchor="middle" className={txtCls}>Pharming (DNS / Hosts Hijack)</text>
          <text x={478} y={58} textAnchor="middle" className={mutCls}>User types REAL bank URL manually</text>
          <text x={478} y={78} textAnchor="middle" className={mutCls}>Poisoned DNS still redirects to fake IP</text>
        </svg>
      );

    case 'validation-verification':
      return (
        <svg viewBox="0 0 640 112" className="mx-auto w-full max-w-2xl" role="img" aria-label={DIAGRAM_TITLES[id]}>
          <rect x={14} y={14} width={296} height={84} rx={8} strokeWidth={1.4} className={accentBoxCls} />
          <text x={162} y={38} textAnchor="middle" className={txtCls}>Data Validation (Software Rule)</text>
          <text x={162} y={60} textAnchor="middle" className={mutCls}>Checks format, type, range (`0–100`)</text>
          <text x={162} y={78} textAnchor="middle" className={mutCls}>Passes plausible mistakes (e.g. 65 vs 56)</text>

          <rect x={330} y={14} width={296} height={84} rx={8} strokeWidth={1.4} className={okBoxCls} />
          <text x={478} y={38} textAnchor="middle" className={txtCls}>Data Verification (Source Truth)</text>
          <text x={478} y={60} textAnchor="middle" className={mutCls}>Double-entry or proofreading vs original</text>
          <text x={478} y={78} textAnchor="middle" className={mutCls}>Catches human typos (65 vs 56)</text>
        </svg>
      );

    case 'mail-merge':
      return (
        <svg viewBox="0 0 640 112" className="mx-auto w-full max-w-2xl" role="img" aria-label={DIAGRAM_TITLES[id]}>
          <rect x={14} y={18} width={170} height={74} rx={8} strokeWidth={1.5} className={boxCls} />
          <text x={99} y={48} textAnchor="middle" className={txtCls}>Main Document</text>
          <text x={99} y={66} textAnchor="middle" className={mutCls}>Template + &lt;&lt;Fields&gt;&gt;</text>
          <text x={208} y={60} textAnchor="middle" className={txtCls}>+</text>
          <rect x={232} y={18} width={170} height={74} rx={8} strokeWidth={1.5} className={accentBoxCls} />
          <text x={317} y={48} textAnchor="middle" className={txtCls}>Data Source</text>
          <text x={317} y={66} textAnchor="middle" className={mutCls}>Excel / Access Records</text>
          <text x={426} y={60} textAnchor="middle" className={txtCls}>→</text>
          <rect x={450} y={18} width={176} height={74} rx={8} strokeWidth={1.5} className={okBoxCls} />
          <text x={538} y={48} textAnchor="middle" className={txtCls}>Merged Output</text>
          <text x={538} y={66} textAnchor="middle" className={mutCls}>Personalised Copies</text>
        </svg>
      );

    case 'excel-referencing':
      return (
        <svg viewBox="0 0 640 112" className="mx-auto w-full max-w-2xl" role="img" aria-label={DIAGRAM_TITLES[id]}>
          <rect x={14} y={14} width={296} height={84} rx={8} strokeWidth={1.4} className={warnBoxCls} />
          <text x={162} y={38} textAnchor="middle" className={txtCls}>Relative: =B2*F1 copied down</text>
          <text x={162} y={60} textAnchor="middle" className={mutCls}>Row 3 becomes =B3*F2 (F2 is blank → 0!)</text>
          <text x={162} y={78} textAnchor="middle" className={mutCls}>Both references move down</text>

          <rect x={330} y={14} width={296} height={84} rx={8} strokeWidth={1.4} className={okBoxCls} />
          <text x={478} y={38} textAnchor="middle" className={txtCls}>Absolute: =B2*$F$1 (Press F4)</text>
          <text x={478} y={60} textAnchor="middle" className={mutCls}>Row 3 becomes =B3*$F$1</text>
          <text x={478} y={78} textAnchor="middle" className={mutCls}>$F$1 stays locked on VAT/rate cell</text>
        </svg>
      );

    case 'db-pk-fk':
      return (
        <svg viewBox="0 0 640 116" className="mx-auto w-full max-w-2xl" role="img" aria-label={DIAGRAM_TITLES[id]}>
          <rect x={24} y={16} width={220} height={82} rx={8} strokeWidth={1.5} className={accentBoxCls} />
          <text x={134} y={38} textAnchor="middle" className={txtCls}>tblOwners (One Side)</text>
          <text x={134} y={60} textAnchor="middle" className={mutCls}>PK: OwnerID (Unique)</text>
          <text x={134} y={78} textAnchor="middle" className={mutCls}>Surname · Phone (Short Text)</text>

          <line x1={244} y1={57} x2={396} y2={57} strokeWidth={2} className={lineCls} />
          <text x={258} y={48} className={txtCls}>1</text>
          <text x={378} y={48} className={txtCls}>∞</text>
          <text x={320} y={78} textAnchor="middle" className={mutCls}>Referential Integrity</text>

          <rect x={396} y={16} width={220} height={82} rx={8} strokeWidth={1.5} className={okBoxCls} />
          <text x={506} y={38} textAnchor="middle" className={txtCls}>tblPets (Many Side)</text>
          <text x={506} y={60} textAnchor="middle" className={mutCls}>PK: PetID · FK: OwnerID</text>
          <text x={506} y={78} textAnchor="middle" className={mutCls}>PetName · BirthDate</text>
        </svg>
      );

    case 'html-structure':
      return (
        <svg viewBox="0 0 640 120" className="mx-auto w-full max-w-2xl" role="img" aria-label={DIAGRAM_TITLES[id]}>
          <rect x={20} y={10} width={600} height={100} rx={8} strokeWidth={1.4} className={boxCls} />
          <text x={38} y={28} className={mutCls}>&lt;html&gt;</text>
          <rect x={40} y={34} width={250} height={64} rx={6} strokeWidth={1.4} className={accentBoxCls} />
          <text x={165} y={56} textAnchor="middle" className={txtCls}>&lt;head&gt;</text>
          <text x={165} y={76} textAnchor="middle" className={mutCls}>&lt;title&gt;Tab&lt;/title&gt; · &lt;style&gt;</text>
          <rect x={310} y={34} width={290} height={64} rx={6} strokeWidth={1.4} className={okBoxCls} />
          <text x={455} y={56} textAnchor="middle" className={txtCls}>&lt;body&gt;</text>
          <text x={455} y={76} textAnchor="middle" className={mutCls}>&lt;h1&gt;, &lt;p&gt;, &lt;a href&gt;, &lt;img src alt&gt;, &lt;table&gt;</text>
        </svg>
      );
  }
}
