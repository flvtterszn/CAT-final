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
  const accentBoxCls = 'fill-blue-50 stroke-blue-700 dark:fill-[#172554] dark:stroke-blue-400';
  const warnBoxCls = 'fill-amber-50 stroke-amber-600 dark:fill-[#2b1d08] dark:stroke-amber-400';
  const okBoxCls = 'fill-emerald-50 stroke-emerald-600 dark:fill-[#082c22] dark:stroke-emerald-400';
  const badBoxCls = 'fill-rose-50 stroke-rose-600 dark:fill-[#2f111b] dark:stroke-rose-400';
  const txtCls = 'fill-slate-900 dark:fill-slate-100 text-[11px] font-medium';
  const mutCls = 'fill-slate-500 dark:fill-slate-400 text-[10px]';
  const lineCls = 'stroke-slate-400 dark:stroke-slate-500';
  const flowBlueCls = 'stroke-blue-500 dark:stroke-blue-400 cat-flow-line';
  const flowGreenCls = 'stroke-emerald-500 dark:stroke-emerald-400 cat-flow-line';
  const stepClasses = ['cat-step-1', 'cat-step-2', 'cat-step-3', 'cat-step-4', 'cat-step-5'];

  switch (id) {
    case 'ipo-cycle':
      return (
        <svg viewBox="0 0 640 124" className="mx-auto w-full max-w-2xl" role="img" aria-label={DIAGRAM_TITLES[id]}>
          <defs>
            <marker id="arr-ipo" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
              <path d="M 0 1 L 10 5 L 0 9 z" className="fill-blue-500 dark:fill-blue-400" />
            </marker>
          </defs>
          {[
            { x: 10, label: 'Input', sub: 'Keyboard, QR, Sensor' },
            { x: 138, label: 'Processing', sub: 'CPU + RAM' },
            { x: 266, label: 'Output', sub: 'Display, Print, Control' },
            { x: 394, label: 'Storage', sub: 'SSD, HDD, Cloud' },
            { x: 522, label: 'Communicate', sub: 'LAN, Router, Internet' },
          ].map((b, i) => (
            <g key={b.label} className={stepClasses[i]}>
              <rect x={b.x} y={24} width={108} height={64} rx={8} strokeWidth={1.6} className={i === 1 ? accentBoxCls : boxCls} />
              <text x={b.x + 54} y={50} textAnchor="middle" className={txtCls}>{b.label}</text>
              <text x={b.x + 54} y={68} textAnchor="middle" className={mutCls}>{b.sub}</text>
              {i < 4 && (
                <path d={`M ${b.x + 110} 56 L ${b.x + 126} 56`} strokeWidth={2} className={flowBlueCls} markerEnd="url(#arr-ipo)" />
              )}
            </g>
          ))}
          {/* Travelling data packet along full IPO+S+C loop */}
          <path id="ipo-track" d="M 64 98 L 576 98" fill="none" strokeWidth={1.2} strokeDasharray="3 3" className={lineCls} />
          <circle r={4.5} className="fill-pink-500 dark:fill-pink-400">
            <animateMotion dur="4s" repeatCount="indefinite" path="M 64 98 L 576 98" />
          </circle>
          <text x={320} y={114} textAnchor="middle" className={mutCls}>Data packet flows across all five stages</text>
        </svg>
      );

    case 'storage-units':
      return (
        <svg viewBox="0 0 640 112" className="mx-auto w-full max-w-2xl" role="img" aria-label={DIAGRAM_TITLES[id]}>
          {['Byte (8 b)', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB'].map((u, i) => (
            <g key={u} className={stepClasses[i % 5]}>
              <rect x={12 + i * 90} y={28} width={72} height={44} rx={8} strokeWidth={1.5} className={i % 2 === 0 ? accentBoxCls : boxCls} />
              <text x={48 + i * 90} y={54} textAnchor="middle" className={txtCls}>{u}</text>
              {i < 6 && (
                <>
                  <path d={`M ${84 + i * 90} 50 L ${102 + i * 90} 50`} strokeWidth={1.8} className={flowBlueCls} />
                  <text x={93 + i * 90} y={20} textAnchor="middle" className={`${mutCls} cat-bob`}>×1024</text>
                </>
              )}
            </g>
          ))}
          <circle r={3.5} className="fill-blue-600 dark:fill-blue-400">
            <animateMotion dur="3.6s" repeatCount="indefinite" path="M 48 80 L 588 80" />
          </circle>
          <text x={320} y={98} textAnchor="middle" className={mutCls}>Each binary step multiplies by 1 024 (2¹⁰)</text>
        </svg>
      );

    case 'boot-sequence':
      return (
        <svg viewBox="0 0 640 122" className="mx-auto w-full max-w-2xl" role="img" aria-label={DIAGRAM_TITLES[id]}>
          {[
            { x: 10, t: '1. Power On', s: 'PSU energises board' },
            { x: 136, t: '2. BIOS / UEFI', s: 'Reads ROM firmware' },
            { x: 262, t: '3. POST + CMOS', s: 'Checks RAM & clock' },
            { x: 388, t: '4. Bootloader', s: 'Finds OS on SSD/HDD' },
            { x: 514, t: '5. OS in RAM', s: 'Desktop ready' },
          ].map((s, i) => (
            <g key={s.t} className={stepClasses[i]}>
              <rect x={s.x} y={22} width={114} height={66} rx={8} strokeWidth={1.5} className={i === 2 ? warnBoxCls : i === 4 ? okBoxCls : boxCls} />
              <text x={s.x + 57} y={48} textAnchor="middle" className={txtCls}>{s.t}</text>
              <text x={s.x + 57} y={66} textAnchor="middle" className={mutCls}>{s.s}</text>
              {i < 4 && <line x1={s.x + 115} y1={55} x2={s.x + 125} y2={55} strokeWidth={2} className={flowBlueCls} />}
            </g>
          ))}
          <circle r={4} className="fill-emerald-500">
            <animateMotion dur="4s" repeatCount="indefinite" path="M 67 100 L 571 100" />
          </circle>
          <line x1={67} y1={100} x2={571} y2={100} strokeWidth={1} strokeDasharray="3 3" className={lineCls} />
        </svg>
      );

    case 'memory-hierarchy':
      return (
        <svg viewBox="0 0 600 134" className="mx-auto w-full max-w-xl" role="img" aria-label={DIAGRAM_TITLES[id]}>
          {[
            { x: 180, y: 8, w: 240, t: 'CPU Cache (SRAM) — Fastest · Smallest', c: accentBoxCls, cls: 'cat-step-1' },
            { x: 135, y: 38, w: 330, t: 'Main RAM (DDR4/DDR5) — Volatile Working Space', c: boxCls, cls: 'cat-step-2' },
            { x: 90, y: 68, w: 420, t: 'SSD / Virtual Memory Pagefile — Non-Volatile Flash', c: okBoxCls, cls: 'cat-step-3' },
            { x: 45, y: 98, w: 510, t: 'HDD / NAS / Cloud Archive — Largest Capacity · Slowest', c: warnBoxCls, cls: 'cat-step-4' },
          ].map((row) => (
            <g key={row.t} className={row.cls}>
              <rect x={row.x} y={row.y} width={row.w} height={24} rx={6} strokeWidth={1.5} className={row.c} />
              <text x={300} y={row.y + 16} textAnchor="middle" className={txtCls}>{row.t}</text>
            </g>
          ))}
          {/* Bidirectional paging/fetch dots */}
          <line x1={26} y1={16} x2={26} y2={116} strokeWidth={1.6} className={flowBlueCls} />
          <circle r={4} className="fill-blue-600 dark:fill-blue-400">
            <animateMotion dur="2.6s" repeatCount="indefinite" path="M 26 114 L 26 18 L 26 114" />
          </circle>
          <text x={14} y={69} textAnchor="middle" transform="rotate(-90 14 69)" className={mutCls}>Speed ↑</text>
        </svg>
      );

    case 'software-layers':
      return (
        <svg viewBox="0 0 540 136" className="mx-auto w-full max-w-lg" role="img" aria-label={DIAGRAM_TITLES[id]}>
          <g className="cat-step-1">
            <rect x={40} y={10} width={460} height={32} rx={8} strokeWidth={1.5} className={accentBoxCls} />
            <text x={270} y={30} textAnchor="middle" className={txtCls}>Application Software (Word, Excel, Access, Browsers)</text>
          </g>
          <g className="cat-step-2">
            <rect x={40} y={52} width={460} height={32} rx={8} strokeWidth={1.5} className={okBoxCls} />
            <text x={270} y={72} textAnchor="middle" className={txtCls}>System Software (OS + Device Drivers + Utilities + VM)</text>
          </g>
          <g className="cat-step-3">
            <rect x={40} y={94} width={460} height={32} rx={8} strokeWidth={1.5} className={boxCls} />
            <text x={270} y={114} textAnchor="middle" className={txtCls}>Hardware (CPU, RAM, SSD, Printer, NIC, Motherboard)</text>
          </g>
          {/* Animated call & response pulses between layers */}
          <line x1={74} y1={42} x2={74} y2={94} strokeWidth={1.6} className={flowBlueCls} />
          <circle r={3.5} className="fill-blue-600 dark:fill-blue-400">
            <animateMotion dur="2.2s" repeatCount="indefinite" path="M 74 26 L 74 110" />
          </circle>
          <line x1={466} y1={94} x2={466} y2={42} strokeWidth={1.6} className={flowGreenCls} />
          <circle r={3.5} className="fill-emerald-500">
            <animateMotion dur="2.2s" repeatCount="indefinite" path="M 466 110 L 466 26" />
          </circle>
        </svg>
      );

    case 'topologies':
      return (
        <svg viewBox="0 0 640 140" className="mx-auto w-full max-w-2xl" role="img" aria-label={DIAGRAM_TITLES[id]}>
          {/* Star */}
          <g>
            <rect x={12} y={10} width={140} height={116} rx={8} strokeWidth={1.2} className={boxCls} />
            {[[42, 32], [122, 32], [42, 92], [122, 92]].map(([nx, ny], i) => (
              <line key={`sl-${i}`} x1={82} y1={62} x2={nx} y2={ny} strokeWidth={1.5} className={flowBlueCls} />
            ))}
            <circle r={3} className="fill-blue-600 dark:fill-blue-400">
              <animateMotion dur="2s" repeatCount="indefinite" path="M 42 32 L 82 62 L 122 92 L 82 62 Z" />
            </circle>
            <circle cx={82} cy={62} r={12} strokeWidth={1.5} className={`${accentBoxCls} cat-pulse-node`} />
            <text x={82} y={66} textAnchor="middle" className={mutCls}>SW</text>
            {[[42, 32], [122, 32], [42, 92], [122, 92]].map(([nx, ny], i) => (
              <circle key={`sn-${i}`} cx={nx} cy={ny} r={7} strokeWidth={1.4} className={okBoxCls} />
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
            <circle r={3.5} className="fill-amber-500">
              <animateMotion dur="2.2s" repeatCount="indefinite" path="M 188 62 L 292 62 L 188 62" />
            </circle>
            <text x={240} y={118} textAnchor="middle" className={txtCls}>Bus (Backbone)</text>
          </g>
          {/* Ring */}
          <g>
            <rect x={328} y={10} width={140} height={116} rx={8} strokeWidth={1.2} className={boxCls} />
            <circle cx={398} cy={62} r={28} fill="none" strokeWidth={1.8} className={flowBlueCls} />
            {[[398, 34], [426, 62], [398, 90], [370, 62]].map(([nx, ny], i) => (
              <circle key={i} cx={nx} cy={ny} r={7} strokeWidth={1.4} className={accentBoxCls} />
            ))}
            <circle r={4} className="fill-pink-500">
              <animateMotion dur="2.8s" repeatCount="indefinite" path="M 398 34 A 28 28 0 1 1 397.9 34 Z" />
            </circle>
            <text x={398} y={118} textAnchor="middle" className={txtCls}>Ring (Token)</text>
          </g>
          {/* Mesh */}
          <g>
            <rect x={486} y={10} width={140} height={116} rx={8} strokeWidth={1.2} className={boxCls} />
            {[[526, 36], [586, 36], [526, 86], [586, 86]].map(([x1, y1], i, arr) =>
              arr.slice(i + 1).map(([x2, y2], j) => (
                <line key={`${i}-${j}`} x1={x1} y1={y1} x2={x2} y2={y2} strokeWidth={1.3} className={flowGreenCls} />
              ))
            )}
            {[[526, 36], [586, 36], [526, 86], [586, 86]].map(([nx, ny], i) => (
              <circle key={i} cx={nx} cy={ny} r={7} strokeWidth={1.4} className={okBoxCls} />
            ))}
            <circle r={3.5} className="fill-emerald-500">
              <animateMotion dur="2.4s" repeatCount="indefinite" path="M 526 36 L 586 86 L 586 36 L 526 86 Z" />
            </circle>
            <text x={556} y={118} textAnchor="middle" className={txtCls}>Mesh (Redundant)</text>
          </g>
        </svg>
      );

    case 'lan-router-switch':
      return (
        <svg viewBox="0 0 640 124" className="mx-auto w-full max-w-2xl" role="img" aria-label={DIAGRAM_TITLES[id]}>
          <g className="cat-step-1">
            <rect x={14} y={22} width={120} height={74} rx={8} strokeWidth={1.5} className={boxCls} />
            <text x={74} y={54} textAnchor="middle" className={txtCls}>Workstations</text>
            <text x={74} y={72} textAnchor="middle" className={mutCls}>PCs &amp; Printers</text>
          </g>
          <line x1={134} y1={59} x2={172} y2={59} strokeWidth={2} className={flowBlueCls} />
          <g className="cat-step-2">
            <rect x={172} y={22} width={128} height={74} rx={8} strokeWidth={1.5} className={accentBoxCls} />
            <text x={236} y={52} textAnchor="middle" className={txtCls}>LAN Switch</text>
            <text x={236} y={70} textAnchor="middle" className={mutCls}>Unicast by MAC</text>
          </g>
          <line x1={300} y1={59} x2={338} y2={59} strokeWidth={2} className={flowGreenCls} />
          <g className="cat-step-3">
            <rect x={338} y={22} width={128} height={74} rx={8} strokeWidth={1.5} className={okBoxCls} />
            <text x={402} y={52} textAnchor="middle" className={txtCls}>Router + Firewall</text>
            <text x={402} y={70} textAnchor="middle" className={mutCls}>Routes IP / DHCP</text>
          </g>
          <line x1={466} y1={59} x2={504} y2={59} strokeWidth={2} className={flowBlueCls} />
          <g className="cat-step-4">
            <rect x={504} y={22} width={120} height={74} rx={8} strokeWidth={1.5} className={warnBoxCls} />
            <text x={564} y={52} textAnchor="middle" className={txtCls}>ISP / Internet</text>
            <text x={564} y={70} textAnchor="middle" className={mutCls}>Fibre / 5G / Cloud</text>
          </g>
          {/* Bi-directional packet between LAN and Internet */}
          <circle r={4.5} className="fill-blue-600 dark:fill-blue-400">
            <animateMotion dur="3.4s" repeatCount="indefinite" path="M 74 106 L 564 106 L 74 106" />
          </circle>
          <line x1={74} y1={106} x2={564} y2={106} strokeWidth={1} strokeDasharray="3 3" className={lineCls} />
        </svg>
      );

    case 'client-server-p2p':
      return (
        <svg viewBox="0 0 640 132" className="mx-auto w-full max-w-2xl" role="img" aria-label={DIAGRAM_TITLES[id]}>
          {/* Client-Server */}
          <rect x={12} y={10} width={296} height={112} rx={8} strokeWidth={1.4} className={boxCls} />
          <text x={160} y={28} textAnchor="middle" className={txtCls}>Client–Server (Centralised)</text>
          {[62, 160, 258].map((cx, i) => (
            <line key={`cs-l-${i}`} x1={160} y1={68} x2={cx} y2={92} strokeWidth={1.5} className={flowBlueCls} />
          ))}
          <circle r={3.5} className="fill-blue-600 dark:fill-blue-400">
            <animateMotion dur="2.2s" repeatCount="indefinite" path="M 62 92 L 160 68 L 258 92 L 160 68 Z" />
          </circle>
          <rect x={122} y={40} width={76} height={28} rx={6} strokeWidth={1.5} className={`${accentBoxCls} cat-pulse-node`} />
          <text x={160} y={58} textAnchor="middle" className={mutCls}>Server</text>
          {[62, 160, 258].map((cx, i) => (
            <g key={`cs-n-${i}`}>
              <rect x={cx - 26} y={92} width={52} height={20} rx={5} strokeWidth={1.3} className={okBoxCls} />
              <text x={cx} y={106} textAnchor="middle" className={mutCls}>Client</text>
            </g>
          ))}

          {/* P2P */}
          <rect x={332} y={10} width={296} height={112} rx={8} strokeWidth={1.4} className={boxCls} />
          <text x={480} y={28} textAnchor="middle" className={txtCls}>Peer-to-Peer (Equal Peers)</text>
          {[[400, 62], [560, 62], [480, 100]].map(([x1, y1], i, arr) =>
            arr.slice(i + 1).map(([x2, y2], j) => (
              <line key={`${i}-${j}`} x1={x1} y1={y1} x2={x2} y2={y2} strokeWidth={1.6} className={flowGreenCls} />
            ))
          )}
          <circle r={3.5} className="fill-emerald-500">
            <animateMotion dur="2.6s" repeatCount="indefinite" path="M 400 62 L 560 62 L 480 100 Z" />
          </circle>
          {[[400, 62], [560, 62], [480, 100]].map(([px, py], i) => (
            <g key={`p2p-${i}`}>
              <rect x={px - 26} y={py - 12} width={52} height={22} rx={5} strokeWidth={1.4} className={warnBoxCls} />
              <text x={px} y={py + 3} textAnchor="middle" className={mutCls}>Peer {i + 1}</text>
            </g>
          ))}
        </svg>
      );

    case 'attenuation-emi':
      return (
        <svg viewBox="0 0 640 124" className="mx-auto w-full max-w-2xl" role="img" aria-label={DIAGRAM_TITLES[id]}>
          <rect x={12} y={12} width={296} height={100} rx={8} strokeWidth={1.4} className={warnBoxCls} />
          <text x={160} y={32} textAnchor="middle" className={txtCls}>UTP Copper (&gt;100 m): Attenuation + EMI</text>
          {/* Attenuating + noisy signal wave */}
          <path
            d="M 32 70 Q 52 40 72 70 T 112 70 T 152 70 Q 172 58 192 70 T 232 70 T 272 70"
            fill="none"
            strokeWidth={2.2}
            className="stroke-amber-600 dark:stroke-amber-400 cat-wave-noisy"
          />
          {/* EMI interference lightning bolts */}
          <path d="M 118 40 L 110 52 L 118 52 L 111 63" fill="none" strokeWidth={2} className="stroke-rose-500 cat-emi-spark" />
          <path d="M 206 42 L 198 54 L 206 54 L 199 65" fill="none" strokeWidth={2} className="stroke-rose-500 cat-emi-spark-2" />
          <text x={160} y={98} textAnchor="middle" className={mutCls}>Signal fades with distance &amp; electrical noise</text>

          <rect x={332} y={12} width={296} height={100} rx={8} strokeWidth={1.4} className={okBoxCls} />
          <text x={480} y={32} textAnchor="middle" className={txtCls}>Fibre Optic (Light Pulses): EMI Immune</text>
          <line x1={356} y1={68} x2={604} y2={68} strokeWidth={4} className="stroke-emerald-200 dark:stroke-emerald-900" />
          <line x1={356} y1={68} x2={604} y2={68} strokeWidth={2} className={flowGreenCls} />
          {/* Fast steady light pulses */}
          <circle r={4.5} className="fill-emerald-500 dark:fill-emerald-300">
            <animateMotion dur="1.5s" repeatCount="indefinite" path="M 356 68 L 604 68" />
          </circle>
          <circle r={4.5} className="fill-cyan-500 dark:fill-cyan-300">
            <animateMotion dur="1.5s" begin="0.75s" repeatCount="indefinite" path="M 356 68 L 604 68" />
          </circle>
          <text x={480} y={98} textAnchor="middle" className={mutCls}>Kilometre range · immune to interference</text>
        </svg>
      );

    case 'vpn-tunnel':
    case 'https-ssl': {
      const isHttps = id === 'https-ssl';
      return (
        <svg viewBox="0 0 640 120" className="mx-auto w-full max-w-2xl" role="img" aria-label={DIAGRAM_TITLES[id]}>
          <g className="cat-step-1">
            <rect x={16} y={24} width={136} height={68} rx={8} strokeWidth={1.5} className={boxCls} />
            <text x={84} y={52} textAnchor="middle" className={txtCls}>{isHttps ? 'Web Browser' : 'Remote Device'}</text>
            <text x={84} y={70} textAnchor="middle" className={mutCls}>{isHttps ? 'Verifies SSL Cert' : 'VPN Client App'}</text>
          </g>
          <rect x={182} y={28} width={276} height={60} rx={28} strokeWidth={2} className={`${okBoxCls} cat-flow-slow`} />
          <text x={320} y={51} textAnchor="middle" className={txtCls}>
            {isHttps ? 'TLS / SSL Encrypted Session' : 'Encrypted VPN Tunnel'}
          </text>
          <text x={320} y={68} textAnchor="middle" className={mutCls}>
            Public Internet — interceptors see ciphertext
          </text>
          <line x1={152} y1={58} x2={182} y2={58} strokeWidth={1.8} className={flowBlueCls} />
          <line x1={458} y1={58} x2={488} y2={58} strokeWidth={1.8} className={flowBlueCls} />
          <g className="cat-step-3">
            <rect x={488} y={24} width={136} height={68} rx={8} strokeWidth={1.5} className={accentBoxCls} />
            <text x={556} y={52} textAnchor="middle" className={txtCls}>{isHttps ? 'HTTPS Server' : 'Office / School LAN'}</text>
            <text x={556} y={70} textAnchor="middle" className={mutCls}>{isHttps ? 'Digital Certificate' : 'Private Resources'}</text>
          </g>
          {/* Encrypted packet gliding safely inside tunnel */}
          <rect width={16} height={10} x={-8} y={-5} rx={3} className="fill-emerald-600 dark:fill-emerald-400">
            <animateMotion dur="2.6s" repeatCount="indefinite" path="M 160 80 L 480 80" />
          </rect>
          <text x={320} y={108} textAnchor="middle" className={mutCls}>🔒 Encrypted data packets travel privately across untrusted networks</text>
        </svg>
      );
    }

    case 'dikw-pyramid':
      return (
        <svg viewBox="0 0 600 136" className="mx-auto w-full max-w-xl" role="img" aria-label={DIAGRAM_TITLES[id]}>
          {[
            { x: 205, y: 8, w: 190, t: 'Wisdom · Ethical Judgement', c: okBoxCls, cls: 'cat-step-4' },
            { x: 155, y: 38, w: 290, t: 'Knowledge · Experience & Patterns', c: accentBoxCls, cls: 'cat-step-3' },
            { x: 105, y: 68, w: 390, t: 'Information · Processed & Organised Data', c: boxCls, cls: 'cat-step-2' },
            { x: 55, y: 98, w: 490, t: 'Data · Raw Unprocessed Facts (e.g. 40, 65, 85)', c: warnBoxCls, cls: 'cat-step-1' },
          ].map((r) => (
            <g key={r.t} className={r.cls}>
              <rect x={r.x} y={r.y} width={r.w} height={24} rx={6} strokeWidth={1.5} className={r.c} />
              <text x={300} y={r.y + 16} textAnchor="middle" className={txtCls}>{r.t}</text>
            </g>
          ))}
          <line x1={28} y1={116} x2={28} y2={16} strokeWidth={1.8} className={flowGreenCls} />
          <circle r={4} className="fill-emerald-500">
            <animateMotion dur="3.2s" repeatCount="indefinite" path="M 28 116 L 28 16" />
          </circle>
          <text x={14} y={70} textAnchor="middle" transform="rotate(-90 14 70)" className={mutCls}>Meaning ↑</text>
        </svg>
      );

    case 'trace-table':
      return (
        <svg viewBox="0 0 600 134" className="mx-auto w-full max-w-xl" role="img" aria-label={DIAGRAM_TITLES[id]}>
          <rect x={20} y={10} width={560} height={114} rx={8} strokeWidth={1.4} className={boxCls} />
          <rect x={20} y={10} width={560} height={28} rx={8} strokeWidth={1.4} className={accentBoxCls} />
          {/* Active row scanner highlight */}
          <rect x={24} y={42} width={552} height={17} rx={4} className="fill-blue-500/15 dark:fill-blue-400/20 cat-trace-bar" />
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
              <text key={`${r}-${c}`} x={75 + c * 112} y={54 + r * 18} textAnchor="middle" className={c === 2 && val.startsWith('True') ? 'fill-emerald-600 dark:fill-emerald-400 text-[10px] font-semibold' : mutCls}>
                {val}
              </text>
            ))
          )}
        </svg>
      );

    case 'phishing-pharming':
      return (
        <svg viewBox="0 0 640 124" className="mx-auto w-full max-w-2xl" role="img" aria-label={DIAGRAM_TITLES[id]}>
          <g className="cat-step-1">
            <rect x={14} y={14} width={296} height={96} rx={8} strokeWidth={1.5} className={warnBoxCls} />
            <text x={162} y={36} textAnchor="middle" className={txtCls}>Phishing (Social Engineering Trap)</text>
            <text x={162} y={56} textAnchor="middle" className={mutCls}>Fake email/SMS → victim clicks bad link</text>
            <line x1={48} y1={72} x2={276} y2={72} strokeWidth={1.6} className="stroke-amber-500 cat-flow-line" />
            <circle r={4} className="fill-rose-500">
              <animateMotion dur="2.2s" repeatCount="indefinite" path="M 48 72 L 276 72" />
            </circle>
            <text x={162} y={94} textAnchor="middle" className={mutCls}>Lands on counterfeit login site</text>
          </g>

          <g className="cat-step-3">
            <rect x={330} y={14} width={296} height={96} rx={8} strokeWidth={1.5} className={badBoxCls} />
            <text x={478} y={36} textAnchor="middle" className={txtCls}>Pharming (DNS / Hosts Hijack)</text>
            <text x={478} y={56} textAnchor="middle" className={mutCls}>User types REAL bank URL manually</text>
            <path d="M 364 72 L 456 72 L 478 82 L 592 72" fill="none" strokeWidth={1.6} className="stroke-rose-500 cat-flow-line" />
            <circle cx={467} cy={77} r={5} className="fill-rose-500 cat-emi-spark" />
            <text x={478} y={96} textAnchor="middle" className={mutCls}>Poisoned DNS redirects silently to fake IP</text>
          </g>
        </svg>
      );

    case 'validation-verification':
      return (
        <svg viewBox="0 0 640 116" className="mx-auto w-full max-w-2xl" role="img" aria-label={DIAGRAM_TITLES[id]}>
          <g className="cat-step-1">
            <rect x={14} y={14} width={296} height={88} rx={8} strokeWidth={1.5} className={accentBoxCls} />
            <text x={162} y={36} textAnchor="middle" className={txtCls}>Data Validation (Software Rule)</text>
            <text x={162} y={56} textAnchor="middle" className={mutCls}>Checks format, type, range (0–100)</text>
            <line x1={52} y1={72} x2={272} y2={72} strokeWidth={1.5} className={flowBlueCls} />
            <circle r={4} className="fill-blue-600 dark:fill-blue-400">
              <animateMotion dur="2s" repeatCount="indefinite" path="M 52 72 L 272 72" />
            </circle>
            <text x={162} y={90} textAnchor="middle" className={mutCls}>Passes plausible mistakes (e.g. 65 vs 56)</text>
          </g>

          <g className="cat-step-3">
            <rect x={330} y={14} width={296} height={88} rx={8} strokeWidth={1.5} className={okBoxCls} />
            <text x={478} y={36} textAnchor="middle" className={txtCls}>Data Verification (Source Truth)</text>
            <text x={478} y={56} textAnchor="middle" className={mutCls}>Double-entry or proofreading vs original</text>
            <line x1={368} y1={72} x2={588} y2={72} strokeWidth={1.5} className={flowGreenCls} />
            <circle r={4} className="fill-emerald-500">
              <animateMotion dur="2s" repeatCount="indefinite" path="M 368 72 L 478 72 L 368 72" />
            </circle>
            <text x={478} y={90} textAnchor="middle" className={mutCls}>Catches human typos (65 vs 56)</text>
          </g>
        </svg>
      );

    case 'mail-merge':
      return (
        <svg viewBox="0 0 640 118" className="mx-auto w-full max-w-2xl" role="img" aria-label={DIAGRAM_TITLES[id]}>
          <g className="cat-step-1">
            <rect x={14} y={18} width={170} height={74} rx={8} strokeWidth={1.5} className={boxCls} />
            <text x={99} y={48} textAnchor="middle" className={txtCls}>Main Document</text>
            <text x={99} y={66} textAnchor="middle" className={mutCls}>Template + &lt;&lt;Fields&gt;&gt;</text>
          </g>
          <text x={208} y={60} textAnchor="middle" className={txtCls}>+</text>
          <g className="cat-step-2">
            <rect x={232} y={18} width={170} height={74} rx={8} strokeWidth={1.5} className={accentBoxCls} />
            <text x={317} y={48} textAnchor="middle" className={txtCls}>Data Source</text>
            <text x={317} y={66} textAnchor="middle" className={mutCls}>Excel / Access Records</text>
          </g>
          <line x1={402} y1={55} x2={450} y2={55} strokeWidth={2} className={flowGreenCls} />
          <g className="cat-step-3">
            <rect x={456} y={24} width={174} height={72} rx={8} strokeWidth={1.2} className={boxCls} />
            <rect x={450} y={18} width={174} height={72} rx={8} strokeWidth={1.5} className={okBoxCls} />
            <text x={537} y={48} textAnchor="middle" className={txtCls}>Merged Output</text>
            <text x={537} y={66} textAnchor="middle" className={mutCls}>1 Personalised Doc / Row</text>
          </g>
          <circle r={4} className="fill-emerald-500">
            <animateMotion dur="2.6s" repeatCount="indefinite" path="M 99 102 L 317 102 L 537 102" />
          </circle>
          <line x1={99} y1={102} x2={537} y2={102} strokeWidth={1} strokeDasharray="3 3" className={lineCls} />
        </svg>
      );

    case 'excel-referencing':
      return (
        <svg viewBox="0 0 640 116" className="mx-auto w-full max-w-2xl" role="img" aria-label={DIAGRAM_TITLES[id]}>
          <g className="cat-step-1">
            <rect x={14} y={14} width={296} height={88} rx={8} strokeWidth={1.5} className={warnBoxCls} />
            <text x={162} y={36} textAnchor="middle" className={txtCls}>Relative: =B2*F1 copied down</text>
            <text x={162} y={56} textAnchor="middle" className={mutCls}>Row 3 becomes =B3*F2 (F2 blank → 0!)</text>
            <circle r={3.5} className="fill-amber-600">
              <animateMotion dur="2.2s" repeatCount="indefinite" path="M 80 68 L 80 86" />
            </circle>
            <text x={162} y={84} textAnchor="middle" className={mutCls}>Reference slides down with each row ↓</text>
          </g>

          <g className="cat-step-3">
            <rect x={330} y={14} width={296} height={88} rx={8} strokeWidth={1.5} className={okBoxCls} />
            <text x={478} y={36} textAnchor="middle" className={txtCls}>Absolute: =B2*$F$1 (Press F4)</text>
            <text x={478} y={56} textAnchor="middle" className={mutCls}>Row 3 becomes =B3*$F$1</text>
            <circle cx={386} cy={78} r={5} className="fill-emerald-500 cat-pulse-node" />
            <text x={478} y={84} textAnchor="middle" className={mutCls}>🔒 $F$1 stays pinned to rate cell</text>
          </g>
        </svg>
      );

    case 'db-pk-fk':
      return (
        <svg viewBox="0 0 640 120" className="mx-auto w-full max-w-2xl" role="img" aria-label={DIAGRAM_TITLES[id]}>
          <g className="cat-step-1">
            <rect x={24} y={16} width={220} height={84} rx={8} strokeWidth={1.5} className={accentBoxCls} />
            <text x={134} y={38} textAnchor="middle" className={txtCls}>tblOwners (One Side)</text>
            <text x={134} y={58} textAnchor="middle" className={mutCls}>🔑 PK: OwnerID (Unique)</text>
            <text x={134} y={78} textAnchor="middle" className={mutCls}>Surname · Phone (Short Text)</text>
          </g>

          <line x1={244} y1={58} x2={396} y2={58} strokeWidth={2.2} className={flowBlueCls} />
          <circle r={4} className="fill-blue-600 dark:fill-blue-400">
            <animateMotion dur="2s" repeatCount="indefinite" path="M 244 58 L 396 58" />
          </circle>
          <text x={258} y={48} className={txtCls}>1</text>
          <text x={378} y={48} className={txtCls}>∞</text>
          <text x={320} y={80} textAnchor="middle" className={mutCls}>Referential Integrity</text>

          <g className="cat-step-3">
            <rect x={396} y={16} width={220} height={84} rx={8} strokeWidth={1.5} className={okBoxCls} />
            <text x={506} y={38} textAnchor="middle" className={txtCls}>tblPets (Many Side)</text>
            <text x={506} y={58} textAnchor="middle" className={mutCls}>PK: PetID · FK: OwnerID</text>
            <text x={506} y={78} textAnchor="middle" className={mutCls}>PetName · BirthDate</text>
          </g>
        </svg>
      );

    case 'html-structure':
      return (
        <svg viewBox="0 0 640 122" className="mx-auto w-full max-w-2xl" role="img" aria-label={DIAGRAM_TITLES[id]}>
          <rect x={20} y={10} width={600} height={102} rx={8} strokeWidth={1.5} className={`${boxCls} cat-step-1`} />
          <text x={38} y={28} className={mutCls}>
            &lt;html&gt; <tspan className="fill-blue-600 dark:fill-blue-400 cat-caret">_</tspan>
          </text>
          <g className="cat-step-2">
            <rect x={40} y={34} width={250} height={64} rx={6} strokeWidth={1.5} className={accentBoxCls} />
            <text x={165} y={56} textAnchor="middle" className={txtCls}>&lt;head&gt; (Metadata)</text>
            <text x={165} y={76} textAnchor="middle" className={mutCls}>&lt;title&gt;Tab&lt;/title&gt; · &lt;style&gt;</text>
          </g>
          <line x1={290} y1={66} x2={310} y2={66} strokeWidth={1.8} className={flowGreenCls} />
          <g className="cat-step-3">
            <rect x={310} y={34} width={290} height={64} rx={6} strokeWidth={1.5} className={okBoxCls} />
            <text x={455} y={56} textAnchor="middle" className={txtCls}>&lt;body&gt; (Visible Page)</text>
            <text x={455} y={76} textAnchor="middle" className={mutCls}>&lt;h1&gt;, &lt;p&gt;, &lt;a href&gt;, &lt;img src alt&gt;, &lt;table&gt;</text>
          </g>
        </svg>
      );
  }
}
