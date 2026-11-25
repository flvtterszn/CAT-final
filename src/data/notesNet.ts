import { StudyNote } from '../types/cat';

export const NOTES_NET: StudyNote[] = [
  {
    id: 'net-types-arch',
    topic: 'net',
    subtopic: 'Network Scopes & Architectures',
    title: 'Network Types (PAN to GAN), Intranet/Extranet & Client-Server vs P2P',
    sagsRef: 'SAGS · Internet & Network Technologies · Network Fundamentals',
    summary:
      'Networks scale from personal Bluetooth links (PAN) up to the global Internet (GAN) and are structured around either centralised servers or equal peers.',
    recallPoints: [
      'Network Types by Geographical Scope: PAN (Personal Area Network — 1–10 m, e.g. phone + smartwatch/earbuds via Bluetooth), HAN (Home Area Network), LAN (Local Area Network — single room/building/school), WLAN (Wireless LAN using Wi-Fi), CAN (Campus Area Network — multiple nearby buildings), MAN (Metropolitan Area Network — city-wide), WAN (Wide Area Network — cities/countries via leased/ISP lines), GAN (Global Area Network — worldwide, e.g. the Internet).',
      'Intranet vs Extranet vs Internet: Intranet is a private internal network using web tools for staff only; Extranet extends controlled intranet access to trusted external partners/suppliers; Internet is the public global network.',
      'Client-Server Network: Dedicated server(s) manage authentication, file storage, backups, printers, and security policies; workstations (clients) request services.',
      'Peer-to-Peer (P2P) Network: Computers share files/printers directly with each other as equals without a central server (common in small home setups or torrent file sharing).',
      'VPN (Virtual Private Network): Creates an encrypted tunnel over a public network (the Internet) so remote workers can access a private company LAN securely.',
    ],
    comprehensionPoints: [
      'Client-Server costs more upfront (server hardware, server OS, administrator) but is essential once an organisation grows beyond ~10 users because security permissions, central backups, and login accounts live in one place.',
      'P2P is cheap and quick to set up for 2–5 machines, but becomes chaotic at scale: backups are scattered, security is weak, and a shared machine slows down when peers download from it.',
      'A VPN protects data in transit on untrusted public Wi-Fi (airports, cafés) by encrypting packets and masking the user’s real IP address.',
    ],
    synthesisAndApplication: [
      'Scenario: A law firm with 35 staff asks whether to use P2P or Client-Server + VPN → recommend Client-Server (centralised POPIA access control, daily server backups) plus VPN for attorneys working remotely.',
      'Distinguish clearly between a LAN and a WLAN in a school scenario: both cover the local campus, but WLAN uses radio waves via Wireless Access Points (mobility, easy guest access, lower security/interference) instead of Ethernet cables.',
    ],
    examTips: [
      'Never describe the Internet as a LAN — the Internet is a WAN/GAN connecting millions of networks globally.',
      'In Client-Server vs P2P questions, explicitly mention "centralised security & backups" as the decisive server advantage.',
    ],
    comparison: {
      title: 'Client-Server vs Peer-to-Peer (P2P)',
      headers: ['Feature', 'Client-Server', 'Peer-to-Peer (P2P)'],
      rows: [
        ['Central control', 'Dedicated server manages users & rules', 'No central server; each PC manages itself'],
        ['Security & Backups', 'Strong, centralised permissions & backups', 'Weak, decentralised, easy to miss backups'],
        ['Cost & Setup', 'Higher hardware & admin cost', 'Low cost, simple for <10 devices'],
        ['Scalability', 'High (schools, enterprises)', 'Low (performance degrades quickly)'],
      ],
    },
    diagramId: 'client-server-p2p',
    flashcardFront: 'Why does a 40-computer school lab use a Client-Server network rather than Peer-to-Peer?',
    flashcardBack:
      'Client-Server provides centralised learner logins, permission control, shared software/printer management, and automated central backups—which P2P cannot manage reliably at scale.',
  },
  {
    id: 'net-hardware-topologies',
    topic: 'net',
    subtopic: 'Hardware & Topologies',
    title: 'NIC, Switch vs Hub, Router, WAP & All Six Network Topologies',
    sagsRef: 'SAGS · Internet & Network Technologies · Devices & Topologies',
    summary:
      'Physical connectivity relies on NICs, switches, routers, and access points arranged in Star, Bus, Ring, Tree, Mesh, or Hybrid topologies.',
    recallPoints: [
      'NIC (Network Interface Card): Hardware interface (wired Ethernet RJ45 or wireless Wi-Fi) enabling a device to join a network; carries a unique permanent physical MAC address.',
      'Switch vs Hub: A Switch inspects MAC addresses and forwards data frames ONLY to the intended destination port (reducing traffic and collisions). A legacy Hub blindly broadcasts every frame to all ports.',
      'Router: Connects different networks (e.g., home/school LAN to the ISP/Internet), routes IP packets between networks, often includes a built-in DHCP server (assigning local IP addresses) and firewall.',
      'WAP (Wireless Access Point) & Repeater: A WAP bridges wireless Wi-Fi devices onto a wired LAN; a Repeater boosts weakened signals over longer distances.',
      'Topologies: Star (all nodes connect to central switch), Bus (single backbone cable, half-duplex, terminators at ends), Ring (nodes linked in a closed loop; single vs dual ring; token passing), Tree (hierarchical parent-child star-bus), Mesh (full mesh = every node linked to every other; partial mesh = key nodes redundant), Hybrid (combines two or more topologies).',
    ],
    comprehensionPoints: [
      'Star topology dominates modern LANs: if one drop cable fails, only that single workstation disconnects and faults are easy to isolate; however, if the central switch fails, the entire star segment goes down.',
      'Bus topology is cheap for tiny temporary setups, but a break anywhere on the backbone cable brings down the entire network, and half-duplex sharing slows traffic as nodes increase.',
      'Mesh topology offers the highest fault tolerance/redundancy (no single point of failure), making it ideal for critical backbones and wireless mesh Wi-Fi, though full wired mesh cabling is prohibitively expensive.',
    ],
    synthesisAndApplication: [
      'Troubleshooting scenario: All 25 computers in Room B suddenly lose network access at once while Room A still works → suspect the Room B central switch or its uplink cable to the core router, NOT 25 individual NICs.',
      'Explain Router vs Switch in one sentence for Paper 2: a Switch connects devices INSIDE the same LAN, whereas a Router connects DIFFERENT networks together and provides Internet routing.',
    ],
    examTips: [
      'Know the exact wording for Switch advantage over Hub: "Sends data only to the intended recipient device instead of broadcasting to all devices, reducing collisions and improving security/speed."',
      'Always distinguish Physical MAC address (burned into NIC) from Logical IP address (assigned per network/DHCP).',
    ],
    comparison: {
      title: 'Network Topologies Trade-offs',
      headers: ['Topology', 'Key Advantage', 'Single Point of Failure', 'Best Use Case'],
      rows: [
        ['Star', 'Easy fault isolation; 1 cable break affects 1 PC', 'Central switch/hub', 'Modern offices & school labs'],
        ['Bus', 'Low cable cost, simple layout', 'Main backbone cable', 'Legacy small networks'],
        ['Ring', 'Low collisions (token passing)', 'Single cable/node (unless dual ring)', 'Token-ring / resilient fibre rings'],
        ['Tree', 'Scalable hierarchical expansion', 'Root node disconnects branches', 'Multi-building WAN/campus'],
        ['Mesh', 'Maximum redundancy & fault tolerance', 'None in full mesh', 'Critical servers, ISP cores, Wi-Fi mesh'],
      ],
    },
    diagramId: 'topologies',
    flashcardFront: 'Explain the functional difference between a Switch and a Router.',
    flashcardBack:
      'A switch connects devices within the same LAN and forwards frames directly to the target MAC port. A router connects different networks together (e.g., LAN to Internet) and forwards packets using IP addresses.',
  },
  {
    id: 'net-media-impairments',
    topic: 'net',
    subtopic: 'Media & Signal Quality',
    title: 'Cabling (UTP/STP, Coaxial, Fibre), Wireless & Signal Impairments',
    sagsRef: 'SAGS · Internet & Network Technologies · Transmission Media',
    summary:
      'Transmission media balance cost, distance, bandwidth, and interference resistance against attenuation, EMI, crosstalk, and eavesdropping.',
    recallPoints: [
      'UTP / STP (Unshielded / Shielded Twisted Pair): Twisted copper wire pairs using RJ45 connectors; UTP is affordable, flexible, and standard for indoor Ethernet LANs (~100 m max run). STP adds foil shielding against interference.',
      'Coaxial Cable: Single copper core with braided shielding; resists interference better than UTP, used in older networks and TV/satellite feeds.',
      'Fibre Optic Cable: Hair-thin glass/plastic strands carrying pulses of light. Highest bandwidth/speed, longest distances (kilometres without repeaters), completely immune to EMI, hardest to tap; expensive installation and delicate bends.',
      'Wireless Media: Wi-Fi (WLAN, 2.4/5/6 GHz), Bluetooth (short-range PAN), NFC (tap-to-pay <10 cm), Cellular (4G/LTE, 5G mobile broadband), Satellite (rural/remote coverage, higher latency).',
      'Signal Impairments: Attenuation (signal weakens as distance increases), EMI (Electromagnetic Interference from motors, fluorescent lights, power lines distorting copper signals), Crosstalk (signal bleeding between adjacent copper wires), Eavesdropping (unauthorised interception of unencrypted traffic).',
    ],
    comprehensionPoints: [
      'Twisting the copper pairs in UTP cancels out external EMI and internal crosstalk between pairs, which is why untwisting cables excessively at an RJ45 plug degrades speed.',
      'Because fibre transmits light photons rather than electrical currents, high-voltage factory machinery or lightning nearby cannot induce EMI, nor can signals leak electromagnetically for eavesdropping.',
      'Choosing Wi-Fi vs Wired Ethernet for an exam server or e-sports lab: wired UTP/fibre gives consistent low latency and higher security, whereas Wi-Fi provides mobility across classrooms at the cost of shared spectrum and wall attenuation.',
    ],
    synthesisAndApplication: [
      'Scenario: A school must link two buildings 250 m apart past heavy electrical transformers → recommend Fibre Optic (exceeds UTP’s 100 m attenuation limit and is immune to EMI from the transformers).',
      'Scenario: A student’s home Wi-Fi drops behind thick brick walls → diagnose signal attenuation and recommend relocating the router centrally, adding a wired WAP, or using a mesh Wi-Fi system.',
    ],
    examTips: [
      'Note the exact SAGS spelling/meaning: UTP = Unshielded Twisted Pair (never "Untwisted"!).',
      'When justifying Fibre over UTP for a campus backbone, cite BOTH distance/attenuation AND EMI immunity/bandwidth.',
    ],
    diagramId: 'attenuation-emi',
    flashcardFront: 'Define attenuation, EMI, and crosstalk, and state which cable resists all three best.',
    flashcardBack:
      'Attenuation is signal weakening over distance; EMI is external electrical interference; crosstalk is signal bleed between adjacent copper pairs. Fibre optic cable carries light and resists all three best.',
  },
  {
    id: 'net-isp-broadband',
    topic: 'net',
    subtopic: 'Internet Access & ISPs',
    title: 'ISP Broadband Packages, Caps, FUP, Throttling vs Shaping & ADSL/Fibre/5G',
    sagsRef: 'SAGS · Internet & Network Technologies · Connectivity & Policies',
    summary:
      'Selecting an Internet package requires evaluating connection technology (Fibre, ADSL, LTE/5G), bandwidth, cap rules, FUP, throttling, and traffic shaping.',
    recallPoints: [
      'ISP (Internet Service Provider): Organisation with permanent high-speed Internet backbone access that sells connectivity and services (email, hosting) to users for a fee.',
      'Bandwidth vs Broadband: Bandwidth is the maximum data transfer capacity per second (Kbps/Mbps/Gbps). Broadband is an always-on, high-speed connection.',
      'Connection Types: Fibre (FTTH/FTTB — light signals, fastest speeds, symmetrical/high upload, weather-resistant), ADSL (legacy copper telephone line, asymmetric — slower upload than download, distance-sensitive), Cellular 4G/LTE/5G (mobile/fixed wireless, quick setup, affected by tower congestion/signal), Satellite (remote areas, weather/latency affected).',
      'Data Caps: Monthly data limit (GB/TB). Hard cap disconnects access at limit; Soft cap allows continued access at reduced speed or extra pay-per-GB cost; Uncapped has no fixed monthly limit.',
      'FUP (Fair Use Policy): ISP rule on uncapped packages preventing excessive usage (e.g., 24/7 torrenting) from degrading bandwidth for other customers.',
      'Throttling vs Shaping: Throttling intentionally slows down a user’s total connection speed once a FUP threshold is crossed. Shaping prioritises certain traffic types (e.g., browsing/email/Zoom) over others (gaming, P2P, large downloads). Unshaped gives all services equal priority.',
    ],
    comprehensionPoints: [
      'Asymmetric vs Symmetrical: Traditional ADSL offers slow upload speeds (e.g., 10 Mbps down / 1 Mbps up), making cloud backups, video conferencing, and large file uploads sluggish; Fibre often supports high or symmetrical upload speeds.',
      'Choosing a package requires checking 4 criteria: Mobility needed, Line Speed (Mbps), Cap/FUP rules, and Shaping vs Unshaped (e.g., a video editor or gamer needs unshaped; an admin office using email/web needs shaped or standard business fibre).',
    ],
    synthesisAndApplication: [
      'Scenario: A media studio complains that downloading/uploading 20 GB client videos slows to a crawl after the 20th of each month on their "Uncapped" line → diagnose ISP Fair Use Policy (FUP) throttling rather than a broken NIC.',
      'Compare 10 Mbps ADSL (R399) vs 50 Mbps Fibre (R699) for a 15-person cloud-based business: 10 Mbps ADSL lacks the upload speed and stability for 15 concurrent cloud/VoIP users; 50 Mbps Fibre is worth the extra R300 for throughput and uptime.',
    ],
    examTips: [
      'Examiners test the exact contrast between Throttling (slowing ALL speed due to high data usage) and Shaping (prioritising specific protocols/services over others).',
      'Never confuse "Uncapped" with "Unthrottled" — uncapped lines almost always carry a FUP.',
    ],
    diagramId: 'lan-router-switch',
    flashcardFront: 'Distinguish clearly between ISP throttling and traffic shaping.',
    flashcardBack:
      'Throttling deliberately slows down a user’s overall connection speed (usually after exceeding an FUP threshold). Shaping selectively prioritises certain internet services (e.g., email/browsing) while deprioritising others (e.g., gaming/P2P).',
  },
  {
    id: 'net-protocols-web-cloud',
    topic: 'net',
    subtopic: 'Protocols, Web & Cloud',
    title: 'IP, DNS, HTTPS/SSL, Mail Protocols, Search/SEO, Cloud & IoT',
    sagsRef: 'SAGS · Internet & Network Technologies · Web & Cloud Services',
    summary:
      'Protocols govern addressing (IP/DNS), secure browsing (HTTPS/SSL), email delivery (SMTP/POP3/IMAP), real-time media (VoIP/Streaming), cloud models, and IoT.',
    recallPoints: [
      'Addressing & Resolution: IP Address (unique numerical network identifier: IPv4 e.g. 192.168.1.1 vs IPv6 128-bit hex for huge address space; Static vs Dynamic via DHCP). DNS (Domain Name System — translates human domain names like ieb.co.za into IP addresses).',
      'Web Security Protocols: HTTP (unencrypted web transfer) vs HTTPS (HTTP encrypted via SSL/TLS + verified by a digital certificate issued by a Certificate Authority — protects logins and payments). FTP/SFTP transfers files.',
      'Email Protocols: SMTP sends outgoing mail; POP3 downloads mail to one device (often deleting from server); IMAP synchronises mail folders across multiple devices (phone + laptop).',
      'Browsers & Web Tools: URL (protocol + domain + path), Cache (local temporary files speeding up revisits), History, Bookmarks, Pop-up blocker, Private/Incognito mode (does not save local history/cookies after closing — does NOT hide traffic from ISP/school), Cookies (small text files remembering logins/carts; third-party tracking cookies).',
      'Search & SEO: Boolean operators (AND, OR, NOT / `-`), exact phrase `"..."`, `site:` filtering. SEO (Search Engine Optimisation) improves a site’s organic search ranking via keywords, metadata, speed, and quality links.',
      'Streaming vs Downloading & Cloud/IoT: Streaming plays audio/video live via a buffer without saving the full file; Cloud Computing delivers storage/apps online (SaaS e.g. Google Docs, PaaS, IaaS) vs Grid Computing (combining idle PCs to solve one massive scientific problem); IoT (Internet of Things — everyday objects with sensors/IP connectivity like smart locks, thermostats, fitness trackers).',
    ],
    comprehensionPoints: [
      'Why IMAP replaced POP3 for modern users: with POP3, an email read on a phone might vanish from the server before the user opens their laptop; IMAP keeps the server as the master copy.',
      'Private/Incognito browsing only stops local browser history and cookies from persisting on that shared device — your school network firewall, employer, and ISP can still log visited domains.',
      'IoT convenience introduces serious cybersecurity risk: poorly patched smart cameras or fridges with default passwords are prime targets for Mirai-style DDoS botnets.',
    ],
    synthesisAndApplication: [
      'Scenario: A learner checks their online bank balance on a school lab PC → advise using Private Browsing (no saved cookies/history on shared PC), verifying `https://` + padlock digital certificate, and logging out completely.',
      'Compare Cloud Computing vs Grid Computing: Cloud provides on-demand hosted services/storage over the Internet for businesses and users; Grid pools distributed computing power across many machines for heavy research/simulation.',
    ],
    examTips: [
      'Always state BOTH SSL/TLS encryption AND digital certificate identity verification when explaining HTTPS.',
      'Know the three email protocols cold: SMTP = Send, POP3 = Download (single device), IMAP = Sync across devices.',
    ],
    comparison: {
      title: 'POP3 vs IMAP Email Protocols',
      headers: ['Aspect', 'POP3', 'IMAP'],
      rows: [
        ['Where mail lives', 'Downloaded locally; often deleted from server', 'Stored & synced on mail server'],
        ['Multi-device use', 'Poor (devices become out of sync)', 'Seamless across phone, tablet, PC'],
        ['Offline reading', 'Yes (downloaded copy)', 'Cached copies available offline'],
        ['Server storage quota', 'Uses very little server space', 'Requires more server mailbox space'],
      ],
    },
    diagramId: 'https-ssl',
    flashcardFront: 'What is the function of DNS, and what does HTTPS add over HTTP?',
    flashcardBack:
      'DNS translates human-readable domain names into numerical IP addresses. HTTPS adds SSL/TLS encryption and digital certificate verification so data (passwords, card details) cannot be read or tampered with in transit.',
  },
  {
    id: 'net-ecomm-netiquette',
    topic: 'net',
    subtopic: 'E-Communication',
    title: 'E-mail Management (Cc/Bcc/Rules), VoIP, Video Conferencing, RSS & Netiquette',
    sagsRef: 'SAGS · Internet & Network Technologies · Electronic Communication',
    summary:
      'Digital communication tools speed up collaboration while demanding privacy discipline (Bcc), bandwidth planning (VoIP/video), and professional netiquette.',
    recallPoints: [
      'Email Fields & Tools: To (primary recipient), Cc (Carbon Copy — visible to all), Bcc (Blind Carbon Copy — hides recipients’ email addresses to protect privacy and comply with POPIA), Subject line, Attachments, Signature, Rules/Filters (auto-sort incoming mail into folders), Distribution/Mailing list (group alias), Auto-responder.',
      'VoIP & Video Conferencing: VoIP (Voice over IP — internet calls e.g. WhatsApp, Teams, Discord) cuts international/long-distance costs; Video conferencing adds live video/screen sharing for remote work/learning, requiring stable low-latency broadband and privacy awareness.',
      'Web Publishing & Feeds: RSS (Really Simple Syndication — auto-delivers headline/blog updates to a feed reader), Blogs/Vlogs, Podcasts (episodic audio), Wikis (collaboratively edited knowledge bases).',
      'Social Networking & Netiquette: Platforms (WhatsApp, Instagram, X/Twitter) enable instant sharing; Netiquette requires concise, respectful messages, clear subject lines, avoiding ALL CAPS (shouting), checking "Reply" vs "Reply All", and protecting others’ privacy before tagging/forwarding.',
    ],
    comprehensionPoints: [
      'Using Cc instead of Bcc when emailing 200 clients exposes every client’s personal email address to strangers—violating POPIA privacy rules and enabling spam harvesting.',
      'VoIP and video conferencing suffer immediately from high latency, jitter, and packet loss (choppy audio/frozen video), unlike email which tolerates brief delays.',
    ],
    synthesisAndApplication: [
      'Scenario: A teacher emails exam results or parent notices to 120 parents → must use Bcc (not Cc) so parents cannot see each other’s private email addresses, and attach a password-protected PDF rather than an unencrypted spreadsheet.',
      'Recommend two etiquette and two technical practices for an effective online team meeting: mute microphone when not speaking + professional background/lighting; use wired/stable broadband + headset to eliminate echo.',
    ],
    examTips: [
      'Whenever a scenario involves emailing a large external group, "Use Bcc to protect recipients’ email privacy" is almost always a guaranteed mark.',
      'VoIP/Video conferencing disadvantage is always "dependent on stable, sufficient-bandwidth Internet and electricity; potential privacy/eavesdropping risks".',
    ],
    diagramId: 'vpn-tunnel',
    flashcardFront: 'Why should an organisation use Bcc rather than Cc when emailing a newsletter to 300 subscribers?',
    flashcardBack:
      'Bcc (Blind Carbon Copy) hides recipients’ email addresses from each other, protecting personal privacy (POPIA compliance), preventing spam harvesting, and stopping accidental "Reply All" storms.',
  },
];
