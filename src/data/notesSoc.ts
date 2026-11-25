import { StudyNote } from '../types/cat';

export const NOTES_SOC: StudyNote[] = [
  {
    id: 'soc-environment-ergonomics',
    topic: 'soc',
    subtopic: 'Environment, Health & Society',
    title: 'Green Computing, E-Waste, Ergonomics & Digital Divide',
    sagsRef: 'SAGS · Social Implications · Environment, Health & Access',
    summary:
      'Responsible ICT balances hardware longevity and e-waste reduction with ergonomic workplace health and strategies to bridge the digital divide.',
    recallPoints: [
      'Green Computing: Designing, using, and disposing of ICT responsibly to save energy, paper, and raw materials (sleep/hibernate modes, duplex/double-sided printing, print-to-PDF, LED/OLED low-power displays, upgrading RAM/SSD rather than scrapping whole PCs).',
      'E-Waste (Electronic Waste): Discarded electronics containing toxic heavy metals (lead, mercury, cadmium, beryllium) that poison soil and groundwater if dumped in landfills; must be refurbished, donated, or sent to certified e-waste recyclers.',
      'Ergonomics & Health Risks: Ergonomics designs workspaces to fit the human body—top of monitor at/just below eye level (50–70 cm away), adjustable chair with lumbar support, feet flat, wrists straight/neutral, glare-free lighting. Poor ergonomics causes RSI (Repetitive Strain Injury), CTS (Carpal Tunnel Syndrome), eye strain (mitigated by 20-20-20 rule), and back/neck pain.',
      'Digital Divide: The socio-economic gap between people who have reliable ICT/Internet access and digital skills and those who do not. Causes: poverty, high data costs, rural infrastructure gaps, low digital literacy. Solutions: community Wi-Fi/telecentres, zero-rated educational portals, subsidised devices, digital skills training.',
      'Information Overload & Digital Footprint: Too much conflicting info impairs decision-making (manage with filters, RSS, sifting). Digital footprint is the permanent trail left actively (posts, photos) and passively (cookies, location logs), affecting university/job screening.',
    ],
    comprehensionPoints: [
      'Repairing or upgrading a 5-year-old office PC with an SSD and extra RAM is greener than buying a brand-new machine because manufacturing a single computer consumes huge energy and rare-earth minerals.',
      'Bridging the digital divide requires BOTH infrastructure (affordable fibre/5G/free hotspots) AND digital literacy training—handing out tablets without connectivity or training fails.',
    ],
    synthesisAndApplication: [
      'Scenario: Staff in a call centre report wrist numbness and headaches after 8-hour shifts → recommend ergonomic split keyboards/wrist rests, height-adjustable chairs, anti-glare monitor positioning at eye level, and mandatory micro-breaks (20-20-20 rule).',
      'Scenario: A school replaces 40 old desktops → recommend data-wiping drives securely, donating working units to an under-resourced primary school, and sending broken monitors/batteries to a certified e-waste recycler.',
    ],
    examTips: [
      'Always name at least two specific health conditions (RSI / Carpal Tunnel Syndrome, eye strain, backache) AND two physical workstation fixes for full marks on ergonomics.',
      'Mention toxic substances (lead, mercury, cadmium) when explaining WHY e-waste must not go to general landfills.',
    ],
    flashcardFront: 'What is e-waste, why is it hazardous in landfills, and give two responsible ways to manage it.',
    flashcardBack:
      'E-waste is discarded electronic equipment containing toxic metals like lead, mercury, and cadmium that leach into soil and water. Manage it by upgrading/refurbishing usable hardware, donating working devices, or using certified e-waste recyclers.',
  },
  {
    id: 'soc-legal-ethics-popia',
    topic: 'soc',
    subtopic: 'Law, Ethics, Privacy & Workplace',
    title: 'POPIA, Copyright, Piracy, AUP, BYOD, Telecommuting & ICT in Society',
    sagsRef: 'SAGS · Social Implications · Legal, Ethical & Economic Impact',
    summary:
      'South African ICT governance enforces data protection under POPIA, intellectual property rights, organisational AUP/BYOD policies, and shifting remote-work economics.',
    recallPoints: [
      'POPIA (Protection of Personal Information Act): South African law governing how organisations collect, store, process, and share personal data—requires user consent, collecting only necessary data for a stated purpose, securing databases against breaches, allowing users to view/correct/delete data, and balancing Right to Privacy with Right of Access to Information (PAIA).',
      'Copyright, IP & Software Piracy: Intellectual Property protects original creations; plagiarism copies work without credit; software piracy includes counterfeiting, softlifting (installing one licence onto extra PCs), hard-disk loading, and illegal downloads.',
      'AUP (Acceptable Use Policy): Written rules defining ethical, safe computer/network use in schools and businesses (banning password sharing, pirated software, cyberbullying, inappropriate sites) to prevent misuse and legal liability.',
      'BYOD (Bring Your Own Device): Staff/learners use personal laptops/phones on the organisation’s network. Pros: lower hardware spend, user familiarity/mobility. Cons: malware entry, unpatched OS, inconsistent support, data leakage if a personal phone is lost.',
      'Virtual Offices / Telecommuting & Crowdfunding: Remote working cuts office rent, commuting time, and carbon emissions, and decentralises labour, but risks worker isolation, blurred work-life boundaries, and reliance on home power/Internet. Crowdfunding (BackaBuddy, Kickstarter) raises small amounts from many online backers, carrying scam/non-delivery risks.',
      'Deep Web vs Dark Web & Fake News: Deep web = unindexed legitimate pages behind logins (online banking, school portals); Dark web = encrypted anonymous networks (Tor) requiring special software, often misused for illicit trade. Fake news / deepfakes spread misinformation quickly—verify via cross-checking reputable sources.',
      'ICT in Sport / Athletics: Photo-finish cameras, GPS vests, heart-rate/biometric telemetry, Hawk-Eye/VAR improve athlete analysis, injury prevention, and accurate officiating, though costly and vulnerable to technical failure.',
    ],
    comprehensionPoints: [
      'Even if a school allows BYOD to save budget, IT must still enforce network segmentation (guest VLAN), mandatory antivirus, strong Wi-Fi authentication, and an AUP—otherwise one infected personal laptop compromises the whole LAN.',
      'Do not confuse Deep Web with Dark Web: your Gmail inbox and university portal are in the Deep Web simply because Google Search cannot index password-protected pages.',
    ],
    synthesisAndApplication: [
      'POPIA audit scenario: A clinic leaves an Excel sheet of patient HIV/medical statuses unencrypted on a reception USB stick and emails newsletters using `Cc` → cite 3 POPIA violations (excessive exposure, inadequate security safeguards/encryption, sharing emails without consent via Cc) and propose encrypted storage + Bcc + role-based logins.',
      'Evaluate BYOD for a Grade 12 computer classroom: weigh cost savings and convenience against incompatible software versions, exam cheating risks, and malware spread.',
    ],
    examTips: [
      'Whenever a scenario mentions collecting customer names, IDs, cell numbers, or emails, think immediately of POPIA (consent, purpose limitation, security safeguards, Bcc).',
      'Always give BOTH a benefit AND a risk when asked to "Discuss" telecommuting, BYOD, or social media marketing.',
    ],
    comparison: {
      title: 'Deep Web vs Dark Web',
      headers: ['Aspect', 'Deep Web', 'Dark Web'],
      rows: [
        ['Access', 'Standard browser + login/paywall', 'Special software (e.g. Tor browser)'],
        ['Why hidden', 'Not indexed by search engines', 'Intentionally anonymised & encrypted'],
        ['Typical examples', 'Online banking, medical records, intranets', 'Whistleblower dropboxes, illicit marketplaces'],
      ],
    },
    flashcardFront: 'State three key requirements that POPIA places on a business storing customer details.',
    flashcardBack:
      '1) Obtain informed consent and collect data only for a stated, lawful purpose; 2) Protect stored data with technical/physical security safeguards against breaches; 3) Allow customers to access, correct, or request deletion of their personal data.',
  },
  {
    id: 'soc-malware-cybercrime',
    topic: 'soc',
    subtopic: 'Cybersecurity & Malware',
    title: 'Malware Types, Social Engineering, Phishing vs Pharming & DDoS/Botnets',
    sagsRef: 'SAGS · Social Implications · Cybersecurity Threats',
    summary:
      'Understanding how each threat spreads and deceives users—from self-replicating worms and ransomware to DNS-hijacking pharming and zombie botnets—is critical for Paper 2.',
    recallPoints: [
      'Malware Types: Virus (attaches to a host file/program; spreads when user opens/shares file), Worm (self-replicates across networks automatically WITHOUT needing a host file or user action; clogs bandwidth), Trojan Horse (disguised as useful/safe software; tricks user into installing it to open a backdoor), Spyware (secretly monitors activity & steals data), Keylogger (records every keystroke to steal passwords/PINs), Adware (forces unwanted pop-ups/browser redirects), Ransomware (encrypts victim’s files/system and demands payment to unlock).',
      'Hacker vs Cracker: Hacker explores systems for security testing/curiosity (ethical/white-hat vs malicious); Cracker breaks into systems specifically with malicious/criminal intent.',
      'Phishing vs Pharming vs Spoofing: Phishing sends deceptive emails/SMS (smishing)/calls (vishing) luring victims to click fake links and type credentials. Pharming hijacks DNS or local hosts files so typing the REAL, correct URL still silently redirects to a counterfeit site. Spoofing forges an email sender, IP address, or caller ID.',
      'Social Engineering & Scams: Manipulating human psychology rather than software flaws (pretexting, urgent bank alerts, clickjacking, hoaxes, spam, advance-fee fraud, identity theft).',
      'DoS & DDoS / Botnet: DoS (Denial of Service) floods a server with traffic until legitimate users cannot connect. DDoS (Distributed DoS) launches the flood simultaneously from a Botnet—thousands of malware-infected "zombie" computers controlled remotely by an attacker.',
    ],
    comprehensionPoints: [
      'Virus vs Worm vs Trojan: A Virus needs a host file and human action; a Worm spreads automatically over the network; a Trojan relies on deception ("free game crack") rather than self-replication.',
      'Why antivirus alone fails against Ransomware or Phishing: if an employee clicks a phishing link and voluntarily types their password, or opens a zero-day ransomware attachment, no signature scanner can stop human error—offline backups and 2FA are essential.',
    ],
    synthesisAndApplication: [
      'Scenario: Every staff member who types `www.mybank.co.za` directly into their browser address bar—without clicking any email link—still lands on a credential-stealing lookalike page → diagnose Pharming (compromised DNS/router/hosts file), NOT Phishing.',
      'Scenario: A business’s e-commerce checkout goes down at 10:00 due to millions of simultaneous requests from overseas home routers and smart cameras → identify a DDoS attack driven by an IoT Zombie Botnet.',
    ],
    examTips: [
      'In Phishing vs Pharming questions, the deciding clue is: "clicked a link in an email/SMS" = Phishing; "typed the correct URL manually and still got redirected" = Pharming.',
      'The #1 recovery defence against Ransomware is ALWAYS "regular, tested, offline/off-site backups" (so you restore without paying the ransom).',
    ],
    comparison: {
      title: 'Virus vs Worm vs Trojan vs Ransomware',
      headers: ['Malware', 'Needs Host File?', 'Spreads Automatically?', 'Primary Payload'],
      rows: [
        ['Virus', 'Yes', 'No (needs user action)', 'Corrupts/deletes files, spreads via files/USB'],
        ['Worm', 'No', 'Yes (self-replicates over network)', 'Consumes bandwidth, drops payloads across LAN'],
        ['Trojan Horse', 'Disguised as app', 'No (tricks user to run)', 'Opens backdoor, steals data, installs keyloggers'],
        ['Ransomware', 'Via attachment/exploit', 'Sometimes (worm-like)', 'Encrypts files and extorts money for decryption key'],
      ],
    },
    diagramId: 'phishing-pharming',
    flashcardFront: 'How do Phishing and Pharming differ in how they trap a victim?',
    flashcardBack:
      'Phishing tricks the victim into clicking a fake link in an email/SMS/message. Pharming poisons DNS or hosts files so that even when the victim types the genuine website address manually, they are silently redirected to a fake site.',
  },
  {
    id: 'soc-safeguards-data-quality',
    topic: 'soc',
    subtopic: 'Safeguards & Data Integrity',
    title: 'Authentication (MFA/Biometrics), Firewalls, Backups & Validation vs Verification',
    sagsRef: 'SAGS · Social Implications · Security Controls & Data Quality',
    summary:
      'Layered security combines technical controls (MFA, firewalls, updates, encryption, backups) with data-quality controls (validation and verification) to beat GIGO.',
    recallPoints: [
      'Multi-Factor Authentication (MFA / 2FA): Combines two or more independent factors—Something you KNOW (strong password/passphrase), Something you HAVE (OTP sent to phone/authenticator app/hardware token), Something you ARE (biometrics: fingerprint, facial/iris scan).',
      'Technical Safeguards: Firewalls (hardware/software inspecting and blocking unauthorised incoming/outgoing network traffic), Antivirus (signature definitions + heuristic behaviour scanning + quarantine), Automatic OS/app patching, Encryption (HTTPS/BitLocker), Regular offline/cloud Backups.',
      'Data Validation: Automated computer rules checking that entered data is reasonable/acceptable in type, format, or range BEFORE storing (e.g., Access Validation Rule `>=0 And <=100`, Input Mask, Presence Check, Lookup list, Check digit on ID/barcodes).',
      'Data Verification: Human or procedural checking that entered data accurately matches the original source document (e.g., double-entry of new passwords/emails, proofreading captured forms against paper originals).',
      'GIGO (Garbage In, Garbage Out): If invalid or inaccurate data enters a system, all resulting outputs, reports, and decisions will be flawed.',
    ],
    comprehensionPoints: [
      'Crucial exam distinction: Validation checks if data is POSSIBLE/ACCEPTABLE, NOT if it is TRUE. Typing `"01/02/2008"` instead of `"02/01/2008"` passes a Date Validation Rule easily, yet only Verification against the birth certificate catches the mistake!',
      'Passphrases (e.g., `Blue!Train#Walks79`) beat complex short passwords (`P@55w0rd`) because length exponentially increases brute-force resistance while staying memorable.',
    ],
    synthesisAndApplication: [
      'Scenario: A registration form prevents leaving the Email field blank and ensures it contains `@`, yet a student still mistypes `gmail.con` → explain that automated Validation caught empty/missing-@ errors, whereas Verification (entering email twice / confirmation link) is needed to catch typos.',
      'Design a 4-layer defence for an online school fee portal: (1) HTTPS/SSL encryption in transit, (2) 2FA/MFA for bursars, (3) Hardware firewall + regular patched server, (4) Encrypted daily off-site backups.',
    ],
    examTips: [
      'Never mix up Validation (automated format/range/type check by software) and Verification (confirming data matches the original source, e.g., typing a password twice).',
      'Always give specific examples when asked for strong password/authentication practices (length 12+, mix of character classes, unique per site, 2FA).',
    ],
    diagramId: 'validation-verification',
    flashcardFront: 'Why can a valid date of birth still fail data verification?',
    flashcardBack:
      'Validation only checks whether the input is a sensible/allowed format (e.g. a real date in the past). Verification checks whether it matches the original source document—if 14/05/2008 was mistyped as 15/04/2008, it passes validation but fails verification.',
  },
  {
    id: 'soc-emerging-4ir',
    topic: 'soc',
    subtopic: 'Emerging Technologies (4IR & 5IR)',
    title: 'AI, Automation, 4IR/5IR, Big Data, VR/AR, Drones, 3D Printing & Blockchain/Crypto',
    sagsRef: 'SAGS · Social Implications · New & Emerging Technologies',
    summary:
      'Grade 12 IEB Paper 2 regularly tests how 4IR/5IR technologies—AI, VR/AR, Big Data, robotics, drones, and blockchain—transform work, ethics, and society.',
    recallPoints: [
      'AI & Machine Learning: Systems simulating human intelligence—learning patterns from huge datasets, recognising speech/images, powering chatbots/LLMs, facial recognition, recommendation feeds (Netflix/TikTok), and autonomous vehicles. Raises bias, deepfake, academic integrity, and privacy concerns.',
      'Automation & 4IR / 5IR: Automation executes repetitive tasks with minimal human intervention (factory robotics, self-checkouts, smart homes). 4IR (Fourth Industrial Revolution) fuses physical, digital, and biological systems (AI + IoT + robotics + cloud). 5IR emphasises human-centric collaboration with AI, ethics, and sustainability.',
      'Big Data: Massive, complex datasets characterised by Volume (sheer size), Velocity (real-time speed), and Variety (structured + unstructured video/social/sensor streams) analysed for trends.',
      'VR vs AR: Virtual Reality (VR) uses a headset to place the user inside a completely synthetic 3D world (flight/medical simulators, gaming, virtual tourism; pros: safe training; cons: costly hardware, motion sickness). Augmented Reality (AR) overlays digital graphics/info onto the real world via phone/smart glasses (navigation overlays, furniture preview, filters).',
      'Drones (UAVs) & 3D Printing: Drones are remotely or GPS-autonomously flown aircraft for filming, precision agriculture, and medical delivery (privacy/airspace/battery limits). 3D printing builds physical objects layer-by-layer (prototyping, custom prosthetics).',
      'Blockchain & Cryptocurrencies: Blockchain is a decentralised, distributed, immutable digital ledger recording chained cryptographic transactions without a central bank. Cryptocurrencies (Bitcoin) offer borderless fast transfers, but suffer severe price volatility, irreversible payments, scams, and high energy consumption.',
    ],
    comprehensionPoints: [
      'VR replaces your surroundings; AR enhances your real surroundings—a surgeon viewing live patient vitals floating beside the operating table is using AR, whereas a trainee pilot inside a dark headset cockpit is using VR.',
      'Automation and AI rarely eliminate all work; instead they displace routine manual/clerical jobs while creating demand for higher-skilled data, maintenance, and human-empathy roles—making continuous upskilling vital.',
    ],
    synthesisAndApplication: [
      'Scenario: A rural clinic considers drone delivery of blood samples vs regular courier vans → weigh drone speed over poor roads and traffic avoidance against payload limits, bad weather grounding, battery range, and aviation regulations.',
      'Scenario: A museum wants visitors to point smartphones at fossil skeletons to see muscles and movement animated live → recommend AR (overlays digital models onto the real exhibit without isolating visitors in costly headsets).',
    ],
    examTips: [
      'In VR vs AR questions, use the anchor phrases: VR = "completely computer-generated/immersive environment replacing reality"; AR = "overlays digital objects onto the live real-world view".',
      'When discussing AI or Big Data in a scenario, always provide BOTH a clear operational benefit AND an ethical/privacy/accuracy risk (e.g., algorithmic bias or POPIA).',
    ],
    comparison: {
      title: 'Virtual Reality (VR) vs Augmented Reality (AR)',
      headers: ['Feature', 'Virtual Reality (VR)', 'Augmented Reality (AR)'],
      rows: [
        ['Environment', '100% synthetic virtual world', 'Real world + digital overlays'],
        ['Hardware', 'Dedicated immersive headset + sensors', 'Smartphone, tablet, or lightweight AR glasses'],
        ['Typical use', 'Flight/surgical simulators, immersive gaming', 'Furniture placement, live translation, navigation'],
        ['Key limitation', 'Costly GPU/headset, motion sickness, isolation', 'Smaller screen/overlay view, battery drain'],
      ],
    },
    flashcardFront: 'Distinguish between 4IR and 5IR, and give two risks of cryptocurrencies.',
    flashcardBack:
      '4IR integrates cyber-physical automation, AI, IoT, and robotics; 5IR focuses on human-centred collaboration with AI, ethics, and sustainability. Cryptocurrency risks include extreme price volatility, irreversible transactions/scams, and lack of central regulation.',
  },
];
