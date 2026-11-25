import { WorkedExamQuestion } from '../types/cat';

export const WORKED_EXAM_QUESTIONS: WorkedExamQuestion[] = [
  // =========================================================================
  // 1. SYSTEM TECHNOLOGIES (Easy -> Medium -> Hard)
  // =========================================================================
  {
    id: 'we-sys-easy-1',
    topic: 'sys',
    difficulty: 'easy',
    cognitiveLevel: 'Lower Order · Recall',
    paperSection: 'Q1 / Q3',
    commandWord: 'Differentiate',
    marks: 4,
    title: 'RAM vs ROM: Volatility and Purpose',
    question: 'Differentiate between RAM and ROM in terms of volatility and primary function in a computer.',
    modelAnswer: [
      'RAM is volatile memory (loses its contents when power is switched off), whereas ROM is non-volatile memory (retains data without power).',
      'RAM holds the operating system, running applications, and active data currently being processed by the CPU, whereas ROM permanently stores startup firmware (BIOS/UEFI) needed to boot the computer.',
    ],
    markBreakdown: [
      { point: 'RAM is volatile (loses data on power loss)', marks: 1 },
      { point: 'ROM is non-volatile (retains data without power)', marks: 1 },
      { point: 'RAM stores active OS, running apps, and open data', marks: 1 },
      { point: 'ROM stores permanent startup/BIOS instructions', marks: 1 },
    ],
    workedReasoning:
      'In IEB Paper 2, "Differentiate" or "Distinguish" for 4 marks expects two paired contrasts (one pair on volatility, one pair on purpose). Writing only "RAM is temporary and ROM is read-only" usually earns at most 2/4.',
    commonMistake: 'Confusing ROM with secondary storage like an SSD/HDD, or omitting what each type actually stores.',
    checklist: [
      'Stated RAM is volatile vs ROM is non-volatile',
      'Stated RAM holds active OS/programs/data',
      'Stated ROM holds permanent startup/BIOS firmware',
    ],
  },
  {
    id: 'we-sys-easy-2',
    topic: 'sys',
    difficulty: 'easy',
    cognitiveLevel: 'Lower Order · Recall',
    paperSection: 'Q3',
    commandWord: 'State / Explain',
    marks: 3,
    title: 'BIOS, POST & CMOS Battery Roles',
    question: 'State the main purpose of the BIOS during startup and explain what happens to a computer if the CMOS battery goes flat.',
    modelAnswer: [
      'BIOS runs at startup, performs the Power-On Self-Test (POST) to verify hardware components, and loads the operating system into RAM.',
      'If the CMOS battery goes flat, the computer loses saved BIOS settings when mains power is disconnected: the system date and time reset, and custom boot order or hardware settings revert to defaults.',
    ],
    markBreakdown: [
      { point: 'BIOS runs POST (Power-On Self-Test) / checks hardware at startup', marks: 1 },
      { point: 'BIOS loads the OS into RAM', marks: 1 },
      { point: 'Flat CMOS battery causes system date/time and BIOS settings to reset', marks: 1 },
    ],
    workedReasoning:
      'Separating BIOS (the startup program on ROM) from CMOS (the battery-backed settings memory) shows clean conceptual recall.',
    commonMistake: 'Claiming the computer will never switch on at all or that all files on the SSD are erased if the CMOS battery dies.',
    checklist: [
      'Mentioned POST / hardware check',
      'Mentioned loading the OS into RAM',
      'Explained date/time & BIOS settings reset on flat CMOS battery',
    ],
  },
  {
    id: 'we-sys-med-1',
    topic: 'sys',
    difficulty: 'medium',
    cognitiveLevel: 'Middle Order · Comprehension & Application',
    paperSection: 'Q3',
    commandWord: 'Explain & Compare',
    marks: 5,
    title: 'Interpreting a Laptop Specification Advert',
    codeOrSpecBlock: 'Spec Sheet: Intel Core i5 3.2 GHz (Quad-Core) · 4 GB DDR4 RAM · 1 TB 5400 rpm HDD · Windows 11 · R7 999',
    question:
      'Study the advert above. (a) Explain what "3.2 GHz (Quad-Core)" indicates about the CPU. [2] (b) Explain why 4 GB RAM will bottleneck multitasking. [1] (c) Give one advantage and one disadvantage of the 1 TB HDD compared with a 512 GB SSD. [2]',
    modelAnswer: [
      '(a) 3.2 GHz is the clock speed (3.2 billion processing cycles per second), and Quad-Core means four independent processor cores on one chip able to handle tasks in parallel.',
      '(b) Windows 11 plus open browser tabs and apps quickly exceed 4 GB, forcing slow Virtual Memory paging to the HDD and causing lag.',
      '(c) Advantage: larger storage capacity (1 TB) at a lower cost per GB. Disadvantage: mechanical spinning platters make booting and file access much slower and more fragile if dropped.',
    ],
    markBreakdown: [
      { point: '3.2 GHz measures clock speed (cycles per second)', marks: 1 },
      { point: 'Quad-Core = 4 processing cores working in parallel', marks: 1 },
      { point: '4 GB fills up quickly, triggering slow virtual memory swapping / lag', marks: 1 },
      { point: 'HDD Advantage: higher capacity / lower cost per GB', marks: 1 },
      { point: 'HDD Disadvantage: slower speed / moving parts vulnerable to shock', marks: 1 },
    ],
    workedReasoning:
      'Sub-question marks map 1-to-1 to concrete technical claims. Notice how (b) connects RAM shortage directly to virtual memory paging on the slow HDD.',
    commonMistake: 'Saying "3.2 GHz is how fast the internet is" or only saying "HDD is worse" without giving one specific advantage AND one disadvantage.',
    checklist: [
      'Defined clock speed (GHz) and Quad-Core parallel execution',
      'Linked 4 GB RAM shortage to multitasking lag / virtual memory',
      'Gave one valid HDD advantage (capacity/price) and one disadvantage (speed/moving parts)',
    ],
  },
  {
    id: 'we-sys-med-2',
    topic: 'sys',
    difficulty: 'medium',
    cognitiveLevel: 'Middle Order · Comprehension & Application',
    paperSection: 'Q3',
    commandWord: 'Distinguish & Apply',
    marks: 4,
    title: 'Display Panels (LED vs OLED) and Port Selection',
    question:
      'A photography studio is choosing monitors. (a) Explain why an OLED monitor delivers better image contrast than a standard LED-backlit LCD monitor. [2] (b) Recommend a video connector for a modern 4K monitor with built-in speakers, and state why VGA is unsuitable. [2]',
    modelAnswer: [
      '(a) Standard LED monitors use a backlight behind liquid crystals so blacks still leak faint light, whereas each OLED pixel emits its own light and turns completely off for true blacks and superior contrast.',
      '(b) Recommend HDMI or DisplayPort (digital 4K video and audio in one cable). VGA is unsuitable because it is an older analog signal limited in high-resolution sharpness and carries no audio.',
    ],
    markBreakdown: [
      { point: 'LED uses a backlight; crystals cannot block 100% of light', marks: 1 },
      { point: 'OLED pixels are self-emissive / turn off individually for true blacks', marks: 1 },
      { point: 'Recommended HDMI or DisplayPort (digital video + audio)', marks: 1 },
      { point: 'VGA is analog and does not transmit sound', marks: 1 },
    ],
    workedReasoning:
      'Comparing hardware technologies requires explaining the physical mechanism (backlight vs self-emissive pixel), not merely saying "OLED looks nicer".',
    commonMistake: 'Writing that LED monitors are "self-lit pixels" (confusing LED backlighting with OLED).',
    checklist: [
      'Explained LED backlight vs OLED self-emissive pixels',
      'Named HDMI or DisplayPort',
      'Stated VGA is analog and carries no audio',
    ],
  },
  {
    id: 'we-sys-hard-1',
    topic: 'sys',
    difficulty: 'hard',
    cognitiveLevel: 'Higher Order · Analysis, Evaluation & Synthesis',
    paperSection: 'Q3 / Q8',
    commandWord: 'Evaluate & Recommend',
    marks: 6,
    title: 'Workstation Upgrade vs Replacement for Architecture Student',
    scenario:
      'Kagiso is a final-year architecture student running 3D CAD rendering and Adobe Photoshop. His 4-year-old desktop has: Core i7-10700 (8-core), 8 GB DDR4 RAM, Integrated Graphics, 1 TB HDD, and a 24" 60 Hz FHD monitor. His budget is strictly R8 000.',
    question:
      'Evaluate Kagiso’s current system against his workload and recommend three targeted hardware upgrades (with clear justifications) rather than buying a brand-new R25 000 PC.',
    modelAnswer: [
      'Evaluation: His 8-core Core i7 CPU is already capable for CAD, so replacing the whole PC wastes budget; the true bottlenecks are 8 GB RAM, integrated graphics (sharing system RAM), and the slow mechanical HDD.',
      '1) Upgrade RAM to 16 GB or 32 GB DDR4: prevents virtual-memory thrashing when running Photoshop and large 3D CAD models simultaneously.',
      '2) Add a Dedicated GPU with at least 6–8 GB VRAM: offloads 3D viewport rendering and Photoshop GPU acceleration from the CPU and frees system RAM.',
      '3) Install an NVMe/SATA SSD (e.g., 512 GB–1 TB) for the OS and active CAD projects (keeping the 1 TB HDD as archive): dramatically reduces boot, application launch, and huge file save/load times.',
    ],
    markBreakdown: [
      { point: 'Identified that the 8-core i7 CPU is still strong; RAM/GPU/HDD are the bottlenecks', marks: 1 },
      { point: 'Upgrade 1: Add RAM (16/32 GB) + multitasking justification', marks: 2 },
      { point: 'Upgrade 2: Add dedicated GPU with VRAM + CAD/3D rendering justification', marks: 2 },
      { point: 'Upgrade 3: Add SSD for OS/apps (keep HDD for bulk storage) + speed justification', marks: 1 },
    ],
    workedReasoning:
      'Higher-order hardware synthesis rewards identifying what does NOT need replacing (the i7 CPU) and targeting the exact bottlenecks within the stated R8 000 budget.',
    commonMistake: 'Recommending "buy an OLED 144 Hz gaming monitor" or "buy a new i9 PC" which ignores the R8 000 budget and leaves the HDD/8 GB bottlenecks intact.',
    checklist: [
      'Assessed existing CPU as sufficient vs identifying bottlenecks',
      'Recommended RAM expansion with CAD/multitasking reason',
      'Recommended dedicated GPU with VRAM reason',
      'Recommended SSD upgrade while repurposing HDD',
    ],
  },
  {
    id: 'we-sys-hard-2',
    topic: 'sys',
    difficulty: 'hard',
    cognitiveLevel: 'Higher Order · Analysis, Evaluation & Synthesis',
    paperSection: 'Q3 / Q8',
    commandWord: 'Diagnose & Propose',
    marks: 5,
    title: 'Software Licensing & OS Maintenance Strategy for a Non-Profit',
    scenario:
      'A community tutoring centre receives 25 donated Windows laptops. They run slowly at startup, have no Microsoft Office licences, and tutors keep accidentally saving files onto the desktop before power cuts corrupt them.',
    question:
      'Propose a comprehensive, zero-licence-cost software and maintenance plan covering: (a) bloated startup speed, (b) office productivity licensing, and (c) protection against power-cut data loss.',
    modelAnswer: [
      '(a) Uninstall pre-installed bloatware, run Disk Clean-up to purge temporary files, disable unnecessary startup apps in Task Manager, and keep OS security updates/drivers current.',
      '(b) Install Open-Source software (FOSS) such as LibreOffice (Writer/Calc) — zero licence cost across all 25 PCs, legal compliance (no softlifting/piracy), and export to .pdf/.docx when sharing externally.',
      '(c) Connect the main workstation/router to a UPS for safe shutdown during outages, enable autosave + cloud/NAS backups (3-2-1 strategy), and teach tutors structured folder storage instead of unbacked Desktop clutter.',
    ],
    markBreakdown: [
      { point: 'Startup cleanup: remove bloatware / disable startup items in Task Manager / Disk Clean-up', marks: 2 },
      { point: 'Licensing: Open-Source suite (e.g., LibreOffice) avoids piracy & costs R0 across 25 PCs', marks: 2 },
      { point: 'Power protection: UPS for safe shutdown + automated cloud/external backup', marks: 1 },
    ],
    workedReasoning:
      'Synthesises OS management, software licensing law, and power/backup continuity into an actionable zero-budget plan.',
    commonMistake: 'Recommending "install cracked MS Office" (illegal piracy) or "run defrag on everything" without addressing bloatware and power protection.',
    checklist: [
      'Addressed bloatware & Task Manager startup cleanup',
      'Recommended legal Open-Source (FOSS) software with R0 cost justification',
      'Proposed UPS + structured backup strategy',
    ],
  },

  // =========================================================================
  // 2. INTERNET & NETWORK TECHNOLOGIES (Easy -> Medium -> Hard)
  // =========================================================================
  {
    id: 'we-net-easy-1',
    topic: 'net',
    difficulty: 'easy',
    cognitiveLevel: 'Lower Order · Recall',
    paperSection: 'Q4',
    commandWord: 'Define / Distinguish',
    marks: 4,
    title: 'Throttling vs Traffic Shaping',
    question: 'Distinguish clearly between ISP throttling and traffic shaping.',
    modelAnswer: [
      'Throttling is when an ISP deliberately slows down your entire Internet connection speed, typically after you exceed a Fair Use Policy (FUP) usage threshold.',
      'Shaping is when an ISP prioritises certain types of Internet traffic (such as web browsing and email) while giving lower priority and slower speeds to other services (such as online gaming, streaming, or P2P downloads).',
    ],
    markBreakdown: [
      { point: 'Throttling slows overall connection speed intentionally', marks: 1 },
      { point: 'Triggered by excessive data / Fair Use Policy (FUP)', marks: 1 },
      { point: 'Shaping gives priority to specific protocols/services', marks: 1 },
      { point: 'Non-prioritised services (gaming/P2P) run slower', marks: 1 },
    ],
    workedReasoning:
      'A classic 4-mark IEB definition contrast: two marks per term (what it does + when/how it applies).',
    commonMistake: 'Mixing up throttling with attenuation (physical cable signal loss) or hard data caps (total disconnection).',
    checklist: [
      'Defined throttling as slowing total speed',
      'Mentioned FUP / high usage trigger',
      'Defined shaping as prioritising certain services over others',
    ],
  },
  {
    id: 'we-net-easy-2',
    topic: 'net',
    difficulty: 'easy',
    cognitiveLevel: 'Lower Order · Recall',
    paperSection: 'Q1 / Q4',
    commandWord: 'Explain',
    marks: 3,
    title: 'Email Privacy: Cc vs Bcc',
    question: 'Explain the functional difference between Cc and Bcc in an email, and state when Bcc must be used.',
    modelAnswer: [
      'Cc (Carbon Copy) sends a copy of the email where every recipient can see all other Cc and To email addresses.',
      'Bcc (Blind Carbon Copy) hides recipients’ email addresses from one another.',
      'Use Bcc when sending bulk notices to clients, parents, or subscribers who do not know each other to protect personal email privacy (POPIA).',
    ],
    markBreakdown: [
      { point: 'Cc shows recipients’ addresses to everyone', marks: 1 },
      { point: 'Bcc hides recipients’ addresses from each other', marks: 1 },
      { point: 'Use Bcc for bulk/group emails to protect privacy', marks: 1 },
    ],
    workedReasoning: 'Short, direct 3-mark answer—explicitly connect Bcc to privacy protection.',
    commonMistake: 'Saying "Bcc does not send attachments" or "Bcc encrypts the email body".',
    checklist: [
      'Explained Cc visibility',
      'Explained Bcc hidden addresses',
      'Gave privacy / bulk mailing scenario',
    ],
  },
  {
    id: 'we-net-med-1',
    topic: 'net',
    difficulty: 'medium',
    cognitiveLevel: 'Middle Order · Comprehension & Application',
    paperSection: 'Q4',
    commandWord: 'Explain & Compare',
    marks: 4,
    title: 'Star Topology Reliability vs Bus Topology',
    question: 'Explain why a school computer lab uses a Star topology rather than a Bus topology, referencing fault tolerance and cabling.',
    modelAnswer: [
      'In a Star topology, every workstation connects via its own dedicated cable to a central switch: if one cable breaks or is unplugged, only that single computer goes offline while the rest of the lab keeps working, making faults easy to isolate.',
      'In a Bus topology, all computers share a single backbone cable (half-duplex): any break on the backbone takes down the entire network, and adding many devices increases collisions and slows traffic.',
    ],
    markBreakdown: [
      { point: 'Star: dedicated cable per PC to central switch', marks: 1 },
      { point: 'Star: single cable failure affects only one device / easy fault isolation', marks: 1 },
      { point: 'Bus: shared single backbone cable', marks: 1 },
      { point: 'Bus: backbone break disconnects entire network / slower under heavy traffic', marks: 1 },
    ],
    workedReasoning:
      'Always anchor topology comparisons in concrete failure modes (single drop cable vs backbone cable) rather than vague statements like "Star is better".',
    commonMistake: 'Claiming Star topology has NO single point of failure (the central switch IS a single point of failure; Mesh has none).',
    checklist: [
      'Described Star dedicated cables & 1-device fault isolation',
      'Described Bus shared backbone & total failure risk',
    ],
  },
  {
    id: 'we-net-med-2',
    topic: 'net',
    difficulty: 'medium',
    cognitiveLevel: 'Middle Order · Comprehension & Application',
    paperSection: 'Q4',
    commandWord: 'Recommend & Explain',
    marks: 4,
    title: 'POP3 vs IMAP & Remote VPN Access',
    question:
      'A travelling auditor checks work email on both her smartphone and laptop and must access sensitive client spreadsheets on the head-office file server from hotel Wi-Fi. (a) Recommend POP3 or IMAP and justify. [2] (b) Recommend a technology to secure her server connection over hotel Wi-Fi and explain how it protects data. [2]',
    modelAnswer: [
      '(a) Recommend IMAP: it keeps emails on the server and synchronises folders and read/sent states across both her phone and laptop, unlike POP3 which downloads and often removes messages onto one device.',
      '(b) Recommend a VPN (Virtual Private Network): it establishes an encrypted tunnel over the public hotel Wi-Fi so eavesdroppers cannot read client spreadsheets or intercept login credentials.',
    ],
    markBreakdown: [
      { point: 'Named IMAP', marks: 1 },
      { point: 'Justification: syncs folders/messages across multiple devices on the server', marks: 1 },
      { point: 'Named VPN', marks: 1 },
      { point: 'Explanation: creates an encrypted tunnel over public Wi-Fi against eavesdropping', marks: 1 },
    ],
    workedReasoning:
      'Two realistic workplace problems paired cleanly with their exact SAGS protocol/network solutions.',
    commonMistake: 'Recommending HTTPS instead of VPN for accessing an internal company file server over hotel Wi-Fi.',
    checklist: [
      'Selected IMAP with multi-device sync reason',
      'Selected VPN with encrypted tunnel explanation',
    ],
  },
  {
    id: 'we-net-hard-1',
    topic: 'net',
    difficulty: 'hard',
    cognitiveLevel: 'Higher Order · Analysis, Evaluation & Synthesis',
    paperSection: 'Q4 / Q8',
    commandWord: 'Analyse & Recommend',
    marks: 6,
    title: 'Campus Inter-Building Link & Broadband Package Evaluation',
    scenario:
      'Oakwood High needs to link its Administration Block and Science Block (220 m apart, passing underground near high-voltage generator cables). They also must choose between two ISP packages for 450 learners doing cloud research and Teams lessons: Option A: 20 Mbps Uncapped Shaped ADSL (R599/m); Option B: 200 Mbps Symmetrical Unshaped Fibre with FUP at 4 TB (R1 499/m).',
    question:
      '(a) Recommend the physical cabling between the two buildings and give TWO technical reasons why UTP would fail here. [3] (b) Evaluate Option A vs Option B against the school’s needs and justify the better choice. [3]',
    modelAnswer: [
      '(a) Recommend Fibre Optic cabling. UTP fails because: (1) 220 m exceeds UTP’s ~100 m limit, causing severe attenuation/signal loss; and (2) nearby generator cables induce EMI in copper UTP, whereas glass fibre carries light and is immune to EMI.',
      '(b) Option A (20 Mbps Shaped ADSL) has insufficient bandwidth and very weak asymmetric upload speed for 450 users and live Teams video calls, and shaping will deprioritise video/real-time traffic.',
      'Recommend Option B (200 Mbps Symmetrical Unshaped Fibre): symmetrical 200 Mbps upload/download handles concurrent Teams lessons and cloud uploads, unshaped treats video fairly, and 4 TB FUP easily covers normal school academic traffic.',
    ],
    markBreakdown: [
      { point: 'Recommended Fibre Optic cable', marks: 1 },
      { point: 'UTP failure 1: Attenuation past ~100 m (distance is 220 m)', marks: 1 },
      { point: 'UTP failure 2: EMI from high-voltage generator cables (fibre is immune)', marks: 1 },
      { point: 'Critiqued Option A: low speed, weak ADSL upload, shaping hurts Teams video', marks: 1 },
      { point: 'Recommended Option B: 200 Mbps symmetrical upload/download + unshaped fits Teams/cloud', marks: 2 },
    ],
    workedReasoning:
      'Every clue in the scenario ("220 m", "high-voltage generator", "450 learners", "Teams lessons") maps directly to a technical mark. Always cite the scenario numbers!',
    commonMistake: 'Picking Option A solely because R599 is cheaper than R1 499 without checking bandwidth or upload requirements for 450 users.',
    checklist: [
      'Recommended Fibre Optic',
      'Cited both Attenuation (>100 m) and EMI immunity',
      'Evaluated ADSL upload/shaping limitations vs Symmetrical Unshaped Fibre',
    ],
  },
  {
    id: 'we-net-hard-2',
    topic: 'net',
    difficulty: 'hard',
    cognitiveLevel: 'Higher Order · Analysis, Evaluation & Synthesis',
    paperSection: 'Q4 / Q9',
    commandWord: 'Diagnose & Advise',
    marks: 5,
    title: 'Client-Server Migration, DNS/HTTPS & Switch Troubleshooting',
    scenario:
      'A growing 22-person design agency currently runs a Peer-to-Peer network using an old 8-port Hub and hosts an online client portal using plain `http://`. Staff complain about slow transfers, missing backups, and browser "Not Secure" warnings.',
    question:
      'Propose three targeted network/web upgrades addressing: (a) network architecture & central backups, (b) LAN traffic bottlenecks, and (c) browser security trust.',
    modelAnswer: [
      '(a) Migrate from P2P to a Client-Server architecture: a dedicated server centralises client project files, enforces per-user permissions, and automates daily off-site/cloud backups.',
      '(b) Replace the legacy Hub with a Gigabit Switch (or managed switches): switches send frames only to the intended MAC port rather than broadcasting to every device, eliminating unnecessary collisions and boosting LAN throughput.',
      '(c) Upgrade the portal from HTTP to HTTPS by installing a valid SSL/TLS digital certificate: encrypts client logins/uploads in transit and removes browser "Not Secure" warnings.',
    ],
    markBreakdown: [
      { point: 'Migrate to Client-Server for central permissions & automated backups', marks: 2 },
      { point: 'Replace Hub with Switch (unicast to MAC port stops broadcast collisions)', marks: 2 },
      { point: 'Enable HTTPS with SSL/TLS digital certificate to encrypt traffic & remove warning', marks: 1 },
    ],
    workedReasoning:
      'Diagnoses three interconnected symptoms (P2P chaos, Hub broadcasts, HTTP plaintext) with clean SAGS solutions.',
    commonMistake: 'Suggesting "buy a faster ISP" to fix internal LAN file transfer collisions caused by a Hub.',
    checklist: [
      'Proposed Client-Server for centralised permissions & backups',
      'Replaced Hub with Switch explaining MAC-targeted forwarding',
      'Upgraded HTTP to HTTPS with SSL/TLS digital certificate',
    ],
  },

  // =========================================================================
  // 3. INFORMATION MANAGEMENT (Easy -> Medium -> Hard)
  // =========================================================================
  {
    id: 'we-inf-easy-1',
    topic: 'inf',
    difficulty: 'easy',
    cognitiveLevel: 'Lower Order · Recall',
    paperSection: 'Q5',
    commandWord: 'Name / State',
    marks: 4,
    title: 'Criteria for Evaluating Website Reliability',
    question: 'Name and briefly describe four criteria used to evaluate whether a website is a reliable research source.',
    modelAnswer: [
      '1) Authority: check who authored/published the site and their qualifications or institutional affiliation (e.g. .ac.za, .gov.za).',
      '2) Accuracy: verify whether claims are supported by citations/evidence and match other reputable sources.',
      '3) Currency: check publication or "last updated" dates to ensure the information is not outdated.',
      '4) Objectivity: assess whether the content is balanced and free from bias or commercial sponsorship.',
    ],
    markBreakdown: [
      { point: 'Authority + brief explanation', marks: 1 },
      { point: 'Accuracy + brief explanation', marks: 1 },
      { point: 'Currency + brief explanation', marks: 1 },
      { point: 'Objectivity (or Coverage) + brief explanation', marks: 1 },
    ],
    workedReasoning:
      'Remember the 5 SAGS pillars (Authority, Accuracy, Currency, Objectivity, Coverage) — adding one concise clause per criterion secures all 4 marks.',
    commonMistake: 'Listing surface design traits ("nice colours", "lots of pictures") instead of academic credibility criteria.',
    checklist: [
      'Named 4 valid SAGS criteria (Authority, Accuracy, Currency, Objectivity/Coverage)',
      'Gave a brief meaning for each criterion',
    ],
  },
  {
    id: 'we-inf-easy-2',
    topic: 'inf',
    difficulty: 'easy',
    cognitiveLevel: 'Lower Order · Recall',
    paperSection: 'Q5',
    commandWord: 'Classify',
    marks: 3,
    title: 'Classifying Research Question Levels',
    question:
      'Classify each research question as Factual, Exploratory, Predictive, or Evaluative: (a) "How many learners in Grade 12 own a laptop?" (b) "What if the school switched all textbooks to e-books next year?" (c) "Would fibre or 5G be better for our rural library?"',
    modelAnswer: [
      '(a) Factual (asks for a specific countable fact).',
      '(b) Predictive (uses "What if" to forecast future consequences).',
      '(c) Evaluative (weighs options to recommend/judge the better solution).',
    ],
    markBreakdown: [
      { point: '(a) Factual', marks: 1 },
      { point: '(b) Predictive', marks: 1 },
      { point: '(c) Evaluative', marks: 1 },
    ],
    workedReasoning:
      'Look at the trigger phrasing: "How many" → Factual; "What if" → Predictive; "Would X or Y be better" → Evaluative.',
    commonMistake: 'Confusing Exploratory ("Why/How does X happen?") with Evaluative ("Which is better / Recommend").',
    checklist: [
      'Identified (a) Factual',
      'Identified (b) Predictive',
      'Identified (c) Evaluative',
    ],
  },
  {
    id: 'we-inf-med-1',
    topic: 'inf',
    difficulty: 'medium',
    cognitiveLevel: 'Middle Order · Comprehension & Application',
    paperSection: 'Q5',
    commandWord: 'Trace & Explain',
    marks: 5,
    title: 'Algorithm Trace Table & Purpose',
    codeOrSpecBlock: `total = 0\ncount = 0\nFOR EACH mark IN [40, 65, 50, 85]\n  IF mark >= 50 THEN\n    count = count + 1\n  ENDIF\n  total = total + mark\nNEXT\nOUTPUT total / 4\nOUTPUT count`,
    question:
      '(a) Trace the algorithm with the marks 40, 65, 50, 85 and state the two values output at the end. [3] (b) State the overall purpose of the algorithm in plain English. [2]',
    modelAnswer: [
      '(a) Iteration 1 (40): 40 >= 50 is False → count = 0, total = 40. Iteration 2 (65): True → count = 1, total = 105. Iteration 3 (50): 50 >= 50 is True → count = 2, total = 155. Iteration 4 (85): True → count = 3, total = 240. Final outputs: 60 (240 / 4) and 3.',
      '(b) Purpose: calculates the average of four marks and counts how many of those marks passed (scored 50 or more).',
    ],
    markBreakdown: [
      { point: 'Correct final total = 240 and average output = 60', marks: 1 },
      { point: 'Boundary 50 >= 50 counted accurately → count output = 3', marks: 1 },
      { point: 'Clear step-by-step trace / intermediate values shown', marks: 1 },
      { point: 'Purpose part 1: calculates the average of the 4 marks', marks: 1 },
      { point: 'Purpose part 2: counts how many marks are 50 or higher (passed)', marks: 1 },
    ],
    workedReasoning:
      'Watch the boundary condition `mark >= 50`: 50 IS included! Also notice `total = total + mark` sits OUTSIDE the `IF`, so ALL four marks (including 40) are added to `total`.',
    commonMistake: 'Only adding passing marks to `total`, or skipping `50` in `count` as if the operator were `>` instead of `>=`.',
    checklist: [
      'Output 1 = 60 (240 / 4)',
      'Output 2 = 3 (65, 50, 85)',
      'Stated both parts of the algorithm purpose',
    ],
  },
  {
    id: 'we-inf-med-2',
    topic: 'inf',
    difficulty: 'medium',
    cognitiveLevel: 'Middle Order · Comprehension & Application',
    paperSection: 'Q5',
    commandWord: 'Critique & Rewrite',
    marks: 4,
    title: 'Evaluating & Fixing a Flawed Questionnaire Item',
    codeOrSpecBlock: 'Survey Q3: "Enter your full SA ID number and tell us why you hate slow school laptops? (Age: 10–15 | 15–20 | 20+)"',
    question:
      'Identify three design flaws in Survey Q3 above, and rewrite it into a clean, unbiased closed question.',
    modelAnswer: [
      'Flaw 1 (Privacy): Requesting a full SA ID number is unnecessary personal data and violates POPIA privacy guidelines.',
      'Flaw 2 (Bias/Leading): "why you hate slow school laptops" leads the respondent toward a negative answer.',
      'Flaw 3 (Overlapping Ranges): Age 15 appears in both "10–15" and "15–20" (ambiguous).',
      'Clean Rewrite: "How satisfied are you with the speed of the school laptops? [1 = Very Dissatisfied … 5 = Very Satisfied] (Age: 10–14 | 15–19 | 20+)"',
    ],
    markBreakdown: [
      { point: 'Identified unnecessary personal ID request (privacy/POPIA)', marks: 1 },
      { point: 'Identified biased/leading wording ("why you hate slow...")', marks: 1 },
      { point: 'Identified overlapping age brackets (15 in both groups)', marks: 1 },
      { point: 'Provided neutral, non-overlapping rewrite', marks: 1 },
    ],
    workedReasoning:
      'Questionnaire audit questions almost always hide 3 classic SAGS defects: Privacy violation, Leading bias, and Overlapping/Missing options.',
    commonMistake: 'Only rewriting the question without explicitly naming the three flaws from the prompt.',
    checklist: [
      'Identified privacy/ID flaw',
      'Identified biased/leading phrasing',
      'Identified overlapping age bracket (15)',
      'Wrote an unbiased closed question with clean brackets',
    ],
  },
  {
    id: 'we-inf-hard-1',
    topic: 'inf',
    difficulty: 'hard',
    cognitiveLevel: 'Higher Order · Analysis, Evaluation & Synthesis',
    paperSection: 'Q5',
    commandWord: 'Debug & Modify',
    marks: 6,
    title: 'Debugging a Sentinel Loop Algorithm & Preventing Division by Zero',
    codeOrSpecBlock: `sum = 0\ncount = 0\nINPUT price\nWHILE price <> -1\n  sum = 0\n  sum = sum + price\n  count = count + 1\nENDWHILE\nOUTPUT sum / count`,
    question:
      'A learner wrote the pseudocode above to average item prices until `-1` is entered. Identify THREE logic/runtime bugs in this algorithm and explain how to fix each one.',
    modelAnswer: [
      'Bug 1 (Reset inside loop): `sum = 0` inside the WHILE loop resets the running total on every item instead of accumulating. Fix: remove `sum = 0` from inside the loop.',
      'Bug 2 (Infinite loop): `INPUT price` is missing at the bottom of the WHILE loop, so `price` never changes and the loop runs forever if the first price ≠ -1. Fix: add `INPUT price` just before `ENDWHILE`.',
      'Bug 3 (Division by zero): If `-1` is entered immediately as the first input, `count` remains `0` and `sum / count` crashes. Fix: wrap the output in `IF count > 0 THEN OUTPUT sum / count ELSE OUTPUT "No prices entered" ENDIF`.',
    ],
    markBreakdown: [
      { point: 'Bug 1: `sum = 0` inside loop wipes accumulator + fix', marks: 2 },
      { point: 'Bug 2: Missing `INPUT price` inside loop causes infinite loop + fix', marks: 2 },
      { point: 'Bug 3: `count = 0` division-by-zero risk + `IF count > 0` guard', marks: 2 },
    ],
    workedReasoning:
      'This is classic Higher-Order Q5 algorithmic debugging: tracing mental execution reveals accumulator wipe, non-terminating loop, and edge-case crash.',
    commonMistake: 'Saying "WHILE is wrong, use FOR" (a FOR loop cannot handle an unknown number of prices ending on a `-1` sentinel!).',
    checklist: [
      'Spotted `sum = 0` inside loop + fix',
      'Spotted missing `INPUT price` before ENDWHILE (infinite loop)',
      'Spotted `count = 0` division-by-zero edge case + IF guard',
    ],
  },
  {
    id: 'we-inf-hard-2',
    topic: 'inf',
    difficulty: 'hard',
    cognitiveLevel: 'Higher Order · Analysis, Evaluation & Synthesis',
    paperSection: 'Q5 / PAT Theory',
    commandWord: 'Synthesise & Justify',
    marks: 5,
    title: 'End-to-End Information Management Pipeline (Excel vs Access + Report)',
    scenario:
      'A provincial athletics association collected 8 500 race entries across 60 schools, including athlete IDs, school codes, events, and finishing times, plus a short post-race athlete feedback survey. They want to analyse club trends, print school-by-school result summaries, and deliver a formal report to sponsors.',
    question:
      'Justify how they should combine (a) a Database (Access) and (b) a Spreadsheet (Excel) during Step 3 (Process Information), and state three formal report sections they must include in Step 4 to ensure sponsor credibility.',
    modelAnswer: [
      '(a) Access (Database): ideal for storing the 8 500 structured entries across linked tables (Schools + Athletes + Results), enforcing validation rules/primary keys to avoid duplicate school details, running fast filtered queries, and printing grouped school-by-school Reports.',
      '(b) Excel (Spreadsheet): export query totals and closed survey tallies to Excel to compute summary statistics (AVERAGE, MIN/MAX fastest times, COUNTIF) and build visual comparison charts (column/line charts) for sponsors.',
      'Formal Report sections for credibility: Introduction (research purpose/scope), Body + Recommendations (data-backed findings & charts), Bibliography (credits sources/avoids plagiarism), plus Appendix (raw survey instrument/tables).',
    ],
    markBreakdown: [
      { point: 'Access justified for 8 500 relational records, reducing duplication, queries & grouped reports', marks: 2 },
      { point: 'Excel justified for numerical calculations, survey stats & visual charts', marks: 2 },
      { point: 'Named 3 formal report sections with credibility role (e.g., Intro, Body/Recommendations, Bibliography, Appendix)', marks: 1 },
    ],
    workedReasoning:
      'Top-tier Information Management synthesis knows how Access and Excel complement each other rather than treating them as mutually exclusive.',
    commonMistake: 'Saying "Use Excel for everything" for 8 500 multi-school relational records (causes massive data duplication and fragile lookups).',
    checklist: [
      'Justified Access for large relational dataset, queries & reports',
      'Justified Excel for calculations, stats & charting',
      'Listed formal report sections supporting sponsor credibility',
    ],
  },

  // =========================================================================
  // 4. SOCIAL IMPLICATIONS (Easy -> Medium -> Hard)
  // =========================================================================
  {
    id: 'we-soc-easy-1',
    topic: 'soc',
    difficulty: 'easy',
    cognitiveLevel: 'Lower Order · Recall',
    paperSection: 'Q6',
    commandWord: 'Define & Give Examples',
    marks: 3,
    title: 'Green Computing & E-Waste Management',
    question: 'Define e-waste, name one hazardous substance it contains, and state two ways a school can practise green computing.',
    modelAnswer: [
      'E-waste is discarded electrical and electronic equipment (old PCs, monitors, batteries, printers) containing toxic heavy metals such as lead, mercury, or cadmium.',
      'Green computing practices: enable power-saving sleep modes, print double-sided or distribute digital PDFs instead of paper, and upgrade/donate or recycle hardware through certified e-waste recyclers.',
    ],
    markBreakdown: [
      { point: 'Defined e-waste as discarded electronic devices', marks: 1 },
      { point: 'Named toxic substance (lead, mercury, or cadmium)', marks: 1 },
      { point: 'Two valid green computing actions (power saving, paperless/duplex, certified recycling)', marks: 1 },
    ],
    workedReasoning: 'Short, accurate SAGS definitions paired with concrete actions earn rapid full marks in Question 6.',
    commonMistake: 'Writing "put old PCs in the normal municipal dustbin" or omitting toxic heavy metals.',
    checklist: [
      'Defined e-waste',
      'Named lead / mercury / cadmium',
      'Gave two practical green computing actions',
    ],
  },
  {
    id: 'we-soc-easy-2',
    topic: 'soc',
    difficulty: 'easy',
    cognitiveLevel: 'Lower Order · Recall',
    paperSection: 'Q6',
    commandWord: 'Distinguish',
    marks: 4,
    title: 'Virtual Reality (VR) vs Augmented Reality (AR)',
    question: 'Distinguish between Virtual Reality (VR) and Augmented Reality (AR) and give one real-world application of each.',
    modelAnswer: [
      'VR places the user inside a completely computer-generated 3D environment using an immersive headset (e.g., flight or surgical simulation training).',
      'AR overlays digital objects or information onto the live real-world view via a smartphone or AR glasses (e.g., furniture placement apps or live navigation overlays).',
    ],
    markBreakdown: [
      { point: 'VR replaces surroundings with fully virtual environment (headset)', marks: 1 },
      { point: 'Valid VR example (flight simulator, medical training, VR gaming)', marks: 1 },
      { point: 'AR overlays digital items onto the real world', marks: 1 },
      { point: 'Valid AR example (navigation overlay, AR furniture/museum app)', marks: 1 },
    ],
    workedReasoning: 'Contrasting "replaces the real world" vs "enhances/overlays onto the real world" is the exact distinction markers look for.',
    commonMistake: 'Describing AR as "viewing a 3D video on YouTube" (no live real-world overlay).',
    checklist: [
      'Defined VR as fully synthetic/immersive + example',
      'Defined AR as digital overlay on real world + example',
    ],
  },
  {
    id: 'we-soc-med-1',
    topic: 'soc',
    difficulty: 'medium',
    cognitiveLevel: 'Middle Order · Comprehension & Application',
    paperSection: 'Q6',
    commandWord: 'Distinguish & Explain',
    marks: 4,
    title: 'Phishing vs Pharming & Validation vs Verification',
    question:
      '(a) Explain how pharming differs from phishing. [2] (b) A clerk types R1 950 instead of R1 590 into an invoice system that allows values from R1 to R50 000. Explain why data validation did not catch this error, and name the process that would. [2]',
    modelAnswer: [
      '(a) Phishing lures victims via fake emails/SMS to click a malicious link, whereas pharming hijacks DNS/hosts files so even typing the real website URL manually redirects the user to a counterfeit site.',
      '(b) Data validation only checks whether R1 950 is a valid number within the allowed R1–R50 000 range; it cannot tell if it matches the paper invoice. Data verification (proofreading or double-entry) checks accuracy against the source document.',
    ],
    markBreakdown: [
      { point: 'Phishing uses fake messages/links to trick users', marks: 1 },
      { point: 'Pharming redirects even correctly typed URLs via DNS/hosts tampering', marks: 1 },
      { point: 'Validation only checks acceptable format/range (1–50 000), not truth', marks: 1 },
      { point: 'Data verification (proofreading/double-entry) catches source mismatch', marks: 1 },
    ],
    workedReasoning:
      'Both pairs test deep comprehension of deceptive similarity vs functional difference—a favourite IEB Question 6 pattern.',
    commonMistake: 'Saying "use an Input Mask" to catch R1 950 vs R1 590 (both are 4-digit numbers so an input mask passes both!).',
    checklist: [
      'Contrasted phishing link trap vs pharming DNS redirect',
      'Explained why validation accepted R1 950',
      'Named Data Verification (proofreading/double-entry)',
    ],
  },
  {
    id: 'we-soc-med-2',
    topic: 'soc',
    difficulty: 'medium',
    cognitiveLevel: 'Middle Order · Comprehension & Application',
    paperSection: 'Q6',
    commandWord: 'Discuss',
    marks: 4,
    title: 'Ergonomics & Digital Divide Interventions',
    question:
      '(a) Describe two workstation adjustments to reduce RSI and eye strain for office staff. [2] (b) Suggest two practical ways a municipality can reduce the digital divide in rural communities. [2]',
    modelAnswer: [
      '(a) Position the top of the monitor at eye level 50–70 cm away with anti-glare lighting (20-20-20 breaks) for eye strain, and use an ergonomic keyboard/wrist rest with chair height keeping elbows/wrists neutral to prevent RSI.',
      '(b) Provide free public Wi-Fi hotspots/telecentres with computers and subsidised data/zero-rated educational portals, paired with community digital literacy training.',
    ],
    markBreakdown: [
      { point: 'Eye-strain fix (monitor height/distance, anti-glare, 20-20-20 breaks)', marks: 1 },
      { point: 'RSI fix (neutral wrists, ergonomic keyboard/mouse, adjustable chair)', marks: 1 },
      { point: 'Access/Infrastructure intervention (public Wi-Fi, telecentres, affordable/zero-rated data)', marks: 1 },
      { point: 'Skills/Education intervention (digital literacy workshops)', marks: 1 },
    ],
    workedReasoning: 'Pairing infrastructure + skills on Digital Divide, and posture + screen setup on Ergonomics, guarantees full marks.',
    commonMistake: 'Writing vague advice like "sit nicely" or "give everyone laptops" without connectivity or training.',
    checklist: [
      'Gave specific eye-strain adjustment',
      'Gave specific RSI wrist/chair adjustment',
      'Suggested both connectivity and digital literacy solutions',
    ],
  },
  {
    id: 'we-soc-hard-1',
    topic: 'soc',
    difficulty: 'hard',
    cognitiveLevel: 'Higher Order · Analysis, Evaluation & Synthesis',
    paperSection: 'Q6 / Q8',
    commandWord: 'Analyse & Propose',
    marks: 6,
    title: 'POPIA Breach, Ransomware & Human Engineering Incident Response',
    scenario:
      'At MediCare Clinic, a receptionist received an urgent phone call pretending to be IT support asking for her password, plus an email attachment `Patient_Bill.exe`. Hours later, all patient records on the server are encrypted with a Bitcoin ransom note, and the clinic discovers there is no backup.',
    question:
      '(a) Identify the two attack vectors used (social engineering + specific malware) and explain why `.exe` should have raised an immediate red flag. [3] (b) Explain two POPIA obligations MediCare breached and propose three technical/policy controls to prevent a repeat. [3]',
    modelAnswer: [
      '(a) Attack vectors: Social Engineering / Vishing (fake IT support phone call) and Ransomware disguised as a Trojan (`.exe` executable pretending to be a billing document). A genuine bill is `.pdf` or `.docx`, never an executable program (`.exe`).',
      '(b) POPIA breaches: failed to implement adequate technical security safeguards to protect sensitive medical data, and failed to prevent unauthorised access/loss of personal health information.',
      'Prevention controls: (1) Automated 3-2-1 offline/immutable backups to recover without paying Bitcoin; (2) Multi-Factor Authentication (2FA) + staff security training/AUP forbidding password disclosure; (3) Block `.exe` email attachments, keep antivirus/OS patched, and enforce least-privilege file permissions.',
    ],
    markBreakdown: [
      { point: 'Identified Social Engineering / Vishing call', marks: 1 },
      { point: 'Identified Ransomware (via Trojan attachment) + `.exe` is an executable, not a document', marks: 2 },
      { point: 'Identified POPIA security safeguard / unauthorised access failure', marks: 1 },
      { point: 'Proposed 3 distinct controls (offline backups, 2FA + training/AUP, .exe blocking/patching)', marks: 2 },
    ],
    workedReasoning:
      'Connects file extensions (`.exe` vs `.pdf`), human manipulation (Social Engineering), malware mechanics (Ransomware), SA law (POPIA), and defence-in-depth.',
    commonMistake: 'Advising "pay the Bitcoin ransom immediately" — cryptocurrency payments are irreversible and never guarantee decryption.',
    checklist: [
      'Named Social Engineering and Ransomware/Trojan',
      'Explained why `.exe` is dangerous for a billing attachment',
      'Linked breach to POPIA security safeguards',
      'Proposed offline backups, MFA/training, and technical blocking/patching',
    ],
  },
  {
    id: 'we-soc-hard-2',
    topic: 'soc',
    difficulty: 'hard',
    cognitiveLevel: 'Higher Order · Analysis, Evaluation & Synthesis',
    paperSection: 'Q6 / Q9',
    commandWord: 'Evaluate',
    marks: 5,
    title: 'AI, Automation & 5IR Ethics in Recruitment & News',
    scenario:
      'A national retail chain plans to deploy an AI screening tool to reject job applicants automatically based on video interviews, and to generate automated product reviews on social media.',
    question:
      'Critically evaluate this plan by discussing TWO productivity benefits (4IR/Automation) and THREE ethical/social risks (bias, transparency, fake content, job/trust impact).',
    modelAnswer: [
      'Benefits: (1) Processes thousands of applications rapidly and consistently 24/7, cutting HR screening costs; (2) Frees HR staff from repetitive initial filtering so they can focus on human-centric final interviews (5IR collaboration).',
      'Risks: (1) Algorithmic bias: if trained on biased historical hiring data, AI can unfairly discriminate against accents, demographics, or disabilities; (2) Transparency & POPIA: applicants deserve explainable decisions and consent over biometric video analysis; (3) Synthetic/fake reviews erode consumer trust and border on deceptive misinformation.',
    ],
    markBreakdown: [
      { point: 'Benefit 1: High-speed / 24-7 screening efficiency & cost reduction', marks: 1 },
      { point: 'Benefit 2: Automates routine work so humans focus on empathy/complex judgement (5IR)', marks: 1 },
      { point: 'Risk 1: Algorithmic bias / unfair discrimination from training data', marks: 1 },
      { point: 'Risk 2: Lack of transparency / POPIA biometric privacy consent concerns', marks: 1 },
      { point: 'Risk 3: AI-generated reviews mislead consumers (fake content / trust loss)', marks: 1 },
    ],
    workedReasoning:
      'Evaluative 4IR/5IR questions reward balanced weighing of genuine efficiency gains against concrete social, legal, and bias failures.',
    commonMistake: 'Writing "AI will take over the world and destroy humanity" instead of grounded SAGS risks (bias, privacy, misinformation).',
    checklist: [
      'Stated 2 concrete operational/5IR benefits',
      'Stated algorithmic bias risk',
      'Stated transparency / POPIA privacy risk',
      'Stated consumer misinformation / trust risk',
    ],
  },

  // =========================================================================
  // 5. SOLUTION DEVELOPMENT THEORY (Easy -> Medium -> Hard)
  // =========================================================================
  {
    id: 'we-dev-easy-1',
    topic: 'dev',
    difficulty: 'easy',
    cognitiveLevel: 'Lower Order · Recall',
    paperSection: 'Q7',
    commandWord: 'Explain',
    marks: 4,
    title: 'Mail Merge Purpose & Components',
    question: 'Explain what Mail Merge is in Word processing, name its two required input files, and give one practical use case.',
    modelAnswer: [
      'Mail Merge automatically combines a Main Document (standard letter/certificate template containing merge fields) with a Data Source (table/spreadsheet of recipient records) to produce personalised copies for every recipient.',
      'Example: generating 500 personalised school report letters, fee statements, or event certificates without retyping names.',
    ],
    markBreakdown: [
      { point: 'Combines template + recipient list automatically into personalised documents', marks: 1 },
      { point: 'Input 1: Main Document (with merge fields)', marks: 1 },
      { point: 'Input 2: Data Source (Excel/Access/Word table)', marks: 1 },
      { point: 'Valid practical use case (fee statements, certificates, invitations)', marks: 1 },
    ],
    workedReasoning: 'Naming BOTH "Main Document" and "Data Source" is the fastest way to secure full recall marks on Mail Merge.',
    commonMistake: 'Describing Mail Merge as "sending an email with Cc/Bcc" instead of merging a template with a data source.',
    checklist: [
      'Explained personalised bulk generation',
      'Named Main Document and Data Source',
      'Provided a clear use case',
    ],
  },
  {
    id: 'we-dev-easy-2',
    topic: 'dev',
    difficulty: 'easy',
    cognitiveLevel: 'Lower Order · Recall',
    paperSection: 'Q1 / Q7',
    commandWord: 'Identify & Explain',
    marks: 3,
    title: 'Access Data Types & Lookup Wizard',
    question: 'In an Access database for a school tuckshop, suggest the best Data Type for (a) ItemPrice (`R12.50`) and (b) ItemCode (`TK042`), and explain the benefit of using a Lookup Wizard for the `Category` field.',
    modelAnswer: [
      '(a) ItemPrice: Currency (formats Rand amounts cleanly and supports accurate financial calculations).',
      '(b) ItemCode: Short Text (contains letters and digits, and is never used in arithmetic).',
      'Lookup Wizard creates a fixed drop-down list of categories (e.g. Drinks, Snacks), speeding up entry and preventing spelling mistakes.',
    ],
    markBreakdown: [
      { point: '(a) Currency', marks: 1 },
      { point: '(b) Short Text', marks: 1 },
      { point: 'Lookup Wizard provides a drop-down list reducing typos / ensuring consistency', marks: 1 },
    ],
    workedReasoning: 'Simple SAGS recall applied to realistic fields.',
    commonMistake: 'Picking Number for `TK042` (cannot store letters `TK`) or Text for `ItemPrice` (breaks SUM/currency calculations).',
    checklist: [
      'Currency for ItemPrice',
      'Short Text for ItemCode',
      'Explained Lookup Wizard drop-down error reduction',
    ],
  },
  {
    id: 'we-dev-med-1',
    topic: 'dev',
    difficulty: 'medium',
    cognitiveLevel: 'Middle Order · Comprehension & Application',
    paperSection: 'Q7',
    commandWord: 'Write & Explain',
    marks: 5,
    title: 'Excel Nested IF, Absolute Referencing & Error Diagnosis',
    codeOrSpecBlock: 'Cell B2 = Learner Mark (0–100) · Cell F1 = Bonus VAT/Weighting (15%)\nFormula typed in D2: `=B2*F1` (copied down to D30)\nFormula in C2: `=IF(B2>=75,"Distinction",IF(B2>=50,"Pass","Fail"))`',
    question:
      '(a) Explain why `=B2*F1` produces `0` in row 3 when copied down, and rewrite it correctly. [2] (b) Explain how the Nested IF in C2 classifies a mark of `68` step by step. [3]',
    modelAnswer: [
      '(a) Because `F1` is a relative reference, copying down changes it to `F2`, `F3`, etc. (empty cells = 0). Fix with an absolute reference: `=B2*$F$1`.',
      '(b) First, Excel tests `68 >= 75` which is FALSE, so it moves to the false branch. Next, it tests the inner IF `68 >= 50` which is TRUE, so it outputs `"Pass"` and skips `"Fail"`.',
    ],
    markBreakdown: [
      { point: 'Relative `F1` shifts to empty `F2/F3` when copied down', marks: 1 },
      { point: 'Corrected formula `=B2*$F$1`', marks: 1 },
      { point: 'Tests outer condition `68>=75` → False', marks: 1 },
      { point: 'Evaluates inner condition `68>=50` → True', marks: 1 },
      { point: 'Returns `"Pass"`', marks: 1 },
    ],
    workedReasoning:
      'Tracing Nested IF logic step-by-step earns every mark. Always check whether the threshold order goes high-to-low (`>=75` then `>=50`).',
    commonMistake: 'Writing `=$B$2*$F$1` which locks the learner mark too, causing every row to multiply B2!',
    checklist: [
      'Explained relative shift of F1',
      'Wrote `=B2*$F$1` (only F1 locked)',
      'Traced both IF tests cleanly for 68 → Pass',
    ],
  },
  {
    id: 'we-dev-med-2',
    topic: 'dev',
    difficulty: 'medium',
    cognitiveLevel: 'Middle Order · Comprehension & Application',
    paperSection: 'Q7',
    commandWord: 'Debug',
    marks: 4,
    title: 'Debugging HTML Table & Image Code',
    codeOrSpecBlock: `<table border="1">\n  <tr>\n    <th>Product<th>\n    <th>Price</th>\n  </tr>\n  <tr>\n    <td>SSD 1TB</td>\n    <td><img scr=ssd.jpg></td>\n  </tr>\n</table>`,
    question: 'Identify FOUR HTML syntax or accessibility errors in the snippet above and write the corrected lines.',
    modelAnswer: [
      '1) `<th>Product<th>` is missing the slash on the closing tag → `<th>Product</th>`.',
      '2) `scr` is misspelled → must be `src`.',
      '3) `ssd.jpg` is missing quotation marks around the attribute value → `src="ssd.jpg"`.',
      '4) `<img>` is missing the `alt` attribute for screen readers/broken-image fallback → `<img src="ssd.jpg" alt="1TB SSD">`.',
    ],
    markBreakdown: [
      { point: 'Missing closing slash `</th>`', marks: 1 },
      { point: 'Misspelled attribute `scr` → `src`', marks: 1 },
      { point: 'Missing quotes around `"ssd.jpg"`', marks: 1 },
      { point: 'Missing `alt="..."` attribute on `<img>`', marks: 1 },
    ],
    workedReasoning: 'Scan tag-by-tag and attribute-by-attribute: closing slash, spelling, quotes, accessibility `alt`.',
    commonMistake: 'Claiming `<img>` needs a closing `</img>` tag (in HTML5 `<img>` is a void/self-closing element).',
    checklist: [
      'Fixed `</th>` closing tag',
      'Fixed `scr` → `src`',
      'Added quotes `"ssd.jpg"`',
      'Added `alt` attribute',
    ],
  },
  {
    id: 'we-dev-hard-1',
    topic: 'dev',
    difficulty: 'hard',
    cognitiveLevel: 'Higher Order · Analysis, Evaluation & Synthesis',
    paperSection: 'Q7 / Q8',
    commandWord: 'Design & Justify',
    marks: 6,
    title: 'Relational Access Architecture & Validation Design',
    scenario:
      'A charity library tracks Borrowers and Books. Currently they store everything in one Access table where a borrower’s phone number and address are retyped every time they borrow a book, staff type negative loan days like `-5`, and phone numbers like `0834451122` lose the leading `0`.',
    question:
      'Propose a two-table relational fix and field-level controls explaining: (a) how to split the table and link them with keys + Referential Integrity [3], and (b) three exact field properties/data type fixes for the data-entry bugs [3].',
    modelAnswer: [
      '(a) Split into `tblBorrowers` (with `BorrowerID` as Primary Key) and `tblLoans` (with `LoanID` PK and `BorrowerID` as Foreign Key). Link `tblBorrowers.BorrowerID` (1) → `tblLoans.BorrowerID` (Many) and enable Referential Integrity so a loan cannot reference a non-existent borrower and borrower details are stored only once.',
      '(b) 1) Change Phone field from Number to Short Text so the leading `0` is preserved; 2) Add an Input Mask (`000-000-0000`) to enforce consistent 10-digit phone formatting; 3) Set a Validation Rule (`>0` or `Between 1 And 30`) + helpful Validation Text on `LoanDays` to block negative entries like `-5`.',
    ],
    markBreakdown: [
      { point: 'Split into two tables (Borrowers + Loans) eliminating repeated contact info', marks: 1 },
      { point: 'Linked BorrowerID (PK) → BorrowerID (FK) in 1-to-Many relationship', marks: 1 },
      { point: 'Enabled Referential Integrity to block orphan loans / invalid deletes', marks: 1 },
      { point: 'Phone = Short Text (keeps leading zero)', marks: 1 },
      { point: 'Phone Input Mask (enforces pattern)', marks: 1 },
      { point: 'LoanDays Validation Rule `>0` (blocks `-5`) + Validation Text', marks: 1 },
    ],
    workedReasoning:
      'Notice this stays 100% inside IEB SAGS scope (PK/FK, 1-to-many, Referential Integrity, Field Properties) without drifting into non-examinable 1NF–3NF academic jargon or SQL.',
    commonMistake: 'Writing `CREATE TABLE` SQL syntax or talking about "3rd Normal Form Boyce-Codd" which are excluded from IEB CAT SAGS.',
    checklist: [
      'Split into two tables with PK and FK',
      'Enabled 1-to-Many + Referential Integrity',
      'Changed Phone to Short Text + Input Mask',
      'Added Validation Rule `>0` for LoanDays',
    ],
  },
  {
    id: 'we-dev-hard-2',
    topic: 'dev',
    difficulty: 'hard',
    cognitiveLevel: 'Higher Order · Analysis, Evaluation & Synthesis',
    paperSection: 'Q7 / Q9',
    commandWord: 'Analyse & Construct',
    marks: 5,
    title: 'Complex Excel Lookup, Conditional Aggregation & Chart Choice',
    codeOrSpecBlock: 'Sheet "Sales": A2:A200 = Region ("North","South"), B2:B200 = ProductCode, C2:C200 = Amount (R)\nSheet "Lookup": E2:F15 = ProductCode & UnitPrice',
    question:
      'A manager writes `=COUNT(A2:A200)` to count sales rows and gets `0`, and uses `=VLOOKUP(B2, Lookup!E2:F15, 2)` which fails on unsorted product codes when copied down. (a) Diagnose why both fail and write the corrected formulas [3]. (b) Recommend the best chart type to compare total Rand sales across regions, and state two essential chart labels [2].',
    modelAnswer: [
      '(a) `COUNT` counts numbers only while `A2:A200` holds text (`"North"`/`"South"`) — fix with `=COUNTA(A2:A200)`. To sum only `"North"` sales, use `=SUMIF(A2:A200,"North",C2:C200)`.',
      'For `VLOOKUP`, adding `FALSE` forces an exact match on unsorted codes AND locking the table range stops shifting: `=VLOOKUP(B2, Lookup!$E$2:$F$15, 2, FALSE)`.',
      '(b) Recommend a Column (or Bar) chart to compare regional totals side by side, including a clear descriptive Chart Title and Y-axis label with units (`Sales (R)`).',
    ],
    markBreakdown: [
      { point: 'Diagnosed COUNT ignores text → fixed with `=COUNTA(A2:A200)`', marks: 1 },
      { point: 'Fixed VLOOKUP exact match (`FALSE`)', marks: 1 },
      { point: 'Fixed VLOOKUP absolute table range (`Lookup!$E$2:$F$15`)', marks: 1 },
      { point: 'Recommended Column/Bar chart for category comparison', marks: 1 },
      { point: 'Stated descriptive Chart Title + Axis title with units (R)', marks: 1 },
    ],
    workedReasoning:
      'Combines two classic Excel bugs (`COUNT` on text + relative/approximate `VLOOKUP`) with visual presentation judgment.',
    commonMistake: 'Recommending a Line chart for unordered categorical regions ("North", "South")—Line charts are for trends over time.',
    checklist: [
      'Replaced COUNT with COUNTA',
      'Added `$E$2:$F$15` and `FALSE` to VLOOKUP',
      'Recommended Column/Bar chart + Title & Axis label with units',
    ],
  },

  // =========================================================================
  // 6. INTEGRATED SCENARIOS — Q8 & Q9 (Easy -> Medium -> Hard)
  // =========================================================================
  {
    id: 'we-scn-easy-1',
    topic: 'scn',
    difficulty: 'easy',
    cognitiveLevel: 'Lower Order · Recall',
    paperSection: 'Q8 (Scenario)',
    commandWord: 'Recommend & State',
    marks: 3,
    title: 'Lerato’s Catering: Shared File Storage Recommendation',
    scenario:
      'Lerato runs a growing catering business with 6 coordinators working from home and on site at venues. Everyone needs live access to the same updated price list and order schedule.',
    question: 'Recommend one storage solution for Lerato’s shared files and give two reasons why it suits her scenario.',
    modelAnswer: [
      'Recommend Cloud Storage (e.g., OneDrive or Google Drive).',
      'Reasons: (1) All 6 coordinators can access and edit the same live price list from any device or venue over the Internet; (2) Cloud providers automatically sync versions and provide off-site backup if a laptop is stolen.',
    ],
    markBreakdown: [
      { point: 'Recommended Cloud Storage', marks: 1 },
      { point: 'Reason 1: Anywhere/any-device access for remote/on-site staff', marks: 1 },
      { point: 'Reason 2: Live single version / automatic off-site backup', marks: 1 },
    ],
    workedReasoning: 'Even easy scenario questions require tying reasons back to the exact people and workflow in the story.',
    commonMistake: 'Recommending "a USB flash drive passed around" (creates conflicting file copies and easily lost).',
    checklist: [
      'Recommended Cloud Storage',
      'Tied access to remote/venue coordinators',
      'Mentioned single synced version or automatic backup',
    ],
  },
  {
    id: 'we-scn-easy-2',
    topic: 'scn',
    difficulty: 'easy',
    cognitiveLevel: 'Lower Order · Recall',
    paperSection: 'Q8 (Scenario)',
    commandWord: 'Identify & Suggest',
    marks: 4,
    title: 'Lerato’s Catering: Ransomware Attack Recovery',
    scenario:
      'A junior coordinator at Lerato’s office clicks an attachment claiming to be an overdue courier invoice. Immediately, every spreadsheet on the office PC is encrypted with `.locked` and demands R8 000 in Bitcoin.',
    question: 'Name this type of malware and suggest three preventative measures Lerato should put in place.',
    modelAnswer: [
      'Malware: Ransomware.',
      'Preventative measures: (1) Maintain regular, tested offline/cloud backups with version history so files can be restored free; (2) Train staff to verify suspicious senders/extensions and avoid clicking unexpected links/attachments; (3) Keep OS, browsers, and antivirus/firewall software automatically updated.',
    ],
    markBreakdown: [
      { point: 'Identified Ransomware', marks: 1 },
      { point: 'Measure 1: Regular offline/cloud backups', marks: 1 },
      { point: 'Measure 2: Staff security awareness / avoid suspicious attachments', marks: 1 },
      { point: 'Measure 3: Updated antivirus, firewall, and OS patches', marks: 1 },
    ],
    workedReasoning: 'Identify the malware accurately (1 mark) + 3 distinct preventative controls (3 marks).',
    commonMistake: 'Calling it a "worm" or "adware", or repeating "antivirus" three times in different words.',
    checklist: [
      'Named Ransomware',
      'Listed offline/cloud backups',
      'Listed staff training + patched antivirus/OS',
    ],
  },
  {
    id: 'we-scn-med-1',
    topic: 'scn',
    difficulty: 'medium',
    cognitiveLevel: 'Middle Order · Comprehension & Application',
    paperSection: 'Q8 (Scenario)',
    commandWord: 'Evaluate & Recommend',
    marks: 4,
    title: 'Printing Economics & Payment Security for Online Orders',
    scenario:
      'Lerato prints 200 black-and-white kitchen order slips every day, plus roughly two A4 full-colour promotional flyers per month. She is also launching an online order website that accepts bank card payments.',
    question:
      '(a) Recommend the most cost-effective printer setup for her daily vs monthly print jobs and justify. [2] (b) Explain two security measures her online payment site must use to protect customers. [2]',
    modelAnswer: [
      '(a) Buy a fast Mono Laser printer for the 200 daily B&W slips (low toner cost per page and high speed), and outsource the 2 monthly colour flyers to a print shop (cheaper than maintaining an expensive colour printer/ink drying out).',
      '(b) (1) HTTPS with an SSL/TLS digital certificate to encrypt card details in transit and prove site authenticity; (2) Multi-Factor Authentication (3D-Secure OTP/banking app approval) or a reputable PCI-compliant payment gateway rather than storing raw card numbers locally.',
    ],
    markBreakdown: [
      { point: 'Recommended Mono Laser for 200 daily slips (fast + low cost/page)', marks: 1 },
      { point: 'Outsource occasional colour flyers (avoids idle colour ink cost)', marks: 1 },
      { point: 'HTTPS + SSL/TLS encryption & digital certificate', marks: 1 },
      { point: '2FA/3D-Secure OTP or trusted payment gateway / POPIA protection', marks: 1 },
    ],
    workedReasoning: 'Look at the numbers in the scenario: 200 slips/day vs 2 flyers/month! Good CAT synthesis avoids buying an expensive colour laser just for 2 flyers.',
    commonMistake: 'Recommending a cheap Inkjet for 200 pages/day (cartridge costs would bankrupt the kitchen).',
    checklist: [
      'Recommended Mono Laser + outsourcing occasional colour',
      'Explained HTTPS/SSL encryption',
      'Explained 2FA / trusted payment gateway',
    ],
  },
  {
    id: 'we-scn-med-2',
    topic: 'scn',
    difficulty: 'medium',
    cognitiveLevel: 'Middle Order · Comprehension & Application',
    paperSection: 'Q9 (Scenario)',
    commandWord: 'Discuss',
    marks: 4,
    title: 'Social Media Marketing & Customer Feedback Survey',
    scenario:
      'To grow orders, Lerato wants to advertise on Instagram/WhatsApp Business and run an online customer satisfaction survey.',
    question:
      '(a) Discuss one business benefit and one risk of advertising on social media. [2] (b) State two advantages of using an online form (Google/MS Forms) instead of paper slips for her customer survey. [2]',
    modelAnswer: [
      '(a) Benefit: low-cost targeted reach to local customers with instant visual engagement and sharing. Risk: public negative comments/complaints can go viral rapidly, or account hijacking/impersonation damages brand trust.',
      '(b) Advantages: (1) Responses flow automatically into a spreadsheet/CSV, saving capture time and eliminating manual transcription errors; (2) Instant automatic summary charts and broader reach at zero printing cost.',
    ],
    markBreakdown: [
      { point: 'Social media benefit (targeted reach / low cost / direct engagement)', marks: 1 },
      { point: 'Social media risk (viral negative publicity / account hacking / time overhead)', marks: 1 },
      { point: 'Online survey advantage 1 (auto-export to spreadsheet, no capturing typos)', marks: 1 },
      { point: 'Online survey advantage 2 (auto charts / zero printing cost / wider reach)', marks: 1 },
    ],
    workedReasoning: 'Links Social Implications (social media) directly with Information Management (electronic survey processing).',
    commonMistake: 'Giving two benefits and zero risks when the prompt asks for "one benefit and one risk".',
    checklist: [
      'Gave 1 concrete social media benefit and 1 risk',
      'Gave 2 clear advantages of electronic forms over paper',
    ],
  },
  {
    id: 'we-scn-hard-1',
    topic: 'scn',
    difficulty: 'hard',
    cognitiveLevel: 'Higher Order · Analysis, Evaluation & Synthesis',
    paperSection: 'Q8–Q9 (Integrated Synthesis)',
    commandWord: 'Evaluate & Synthesise',
    marks: 8,
    title: 'Smart Eco-Hotel Digital Overhaul (Hardware + Network + POPIA + Green Tech)',
    scenario:
      'Karoo Eco-Lodge has 30 guest chalets spread over 400 m in a rural valley with frequent Eskom load-shedding and poor cellular coverage. They want: (1) fast reliable Wi-Fi in every chalet, (2) smart IoT solar/aircon monitors, (3) an Access guest booking database, and (4) digital guest check-in compliant with POPIA.',
    question:
      'Synthesise an integrated ICT solution addressing: (a) how to link the central reception to chalet Wi-Fi access points over 400 m + ISP choice [3], (b) power resilience & green computing [2], and (c) database validation + POPIA compliance on guest check-in tablets [3].',
    modelAnswer: [
      '(a) Run Fibre Optic backbone links from reception to weatherproof switches/WAPs serving chalet clusters (UTP fails past ~100 m due to attenuation and outdoor lightning/EMI risks). Because rural fibre may not reach the valley and cellular is weak, use high-speed Satellite broadband (e.g. Starlink/enterprise VSAT) or directional microwave wireless ISP with local failover.',
      '(b) Connect core router, fibre switches, and booking server to solar-backed UPS/inverter battery banks so Wi-Fi and bookings stay live through load-shedding; configure IoT sensors to auto-power-down chalet aircons when doors/windows open or guests check out (green energy saving).',
      '(c) In Access, enforce Input Masks/Validation Rules on phone, email, and check-out >= check-in dates; for POPIA, capture only essential guest data with explicit digital consent, encrypt the tablet/database with role-based logins + 2FA, and isolate guest Wi-Fi onto a separate VLAN from the lodge’s booking server and IoT devices.',
    ],
    markBreakdown: [
      { point: 'Fibre optic links to chalet WAPs (beats 100 m UTP attenuation & outdoor lightning/EMI)', marks: 2 },
      { point: 'Satellite/wireless ISP justified for rural valley without cellular/ADSL', marks: 1 },
      { point: 'Solar/inverter + UPS for core network uptime during load-shedding', marks: 1 },
      { point: 'IoT automation for green energy reduction (auto HVAC shutoff)', marks: 1 },
      { point: 'Access validation/input mask preventing invalid dates/phones', marks: 1 },
      { point: 'POPIA consent + minimal data + encryption/VLAN isolation of guest Wi-Fi', marks: 2 },
    ],
    workedReasoning:
      'This is the gold standard of an 8-mark IEB Paper 2 Question 9 synthesis: weaving cabling physics, rural ISP constraints, green IoT power management, Access validation, and POPIA security into one cohesive plan.',
    commonMistake: 'Suggesting "run 400 m UTP cables" or "use 5G" when the scenario explicitly states "400 m" and "poor cellular coverage".',
    checklist: [
      'Used Fibre (not UTP) for 400 m outdoor distance',
      'Addressed rural ISP constraint (Satellite / WISP)',
      'Combined UPS/solar resilience + green IoT automation',
      'Included Access validation + POPIA consent/encryption/VLAN isolation',
    ],
  },
  {
    id: 'we-scn-hard-2',
    topic: 'scn',
    difficulty: 'hard',
    cognitiveLevel: 'Higher Order · Analysis, Evaluation & Synthesis',
    paperSection: 'Q8–Q9 (Integrated Synthesis)',
    commandWord: 'Analyse & Justify',
    marks: 7,
    title: 'Hybrid School Exam Lab: BYOD vs Thin-Client/PC Lab + Excel/HTML Workflow',
    scenario:
      'Apex College wants to run Grade 12 CAT exams and daily coding/design lessons for 35 learners per class. They must choose between: (Option 1) Mandatory BYOD laptops, or (Option 2) 35 managed desktop PCs (i5, 16 GB RAM, 512 GB NVMe SSD, wired Gigabit Star LAN) with a Client-Server setup.',
    question:
      '(a) Evaluate Option 1 vs Option 2 for NSC CAT examinations and recommend the better option with three technical/security reasons. [4] (b) Explain how the server distributes exam files cleanly, and describe two Excel or HTML checks learners must remember when exporting/submitting work. [3]',
    modelAnswer: [
      '(a) Recommend Option 2 (Managed Desktop Lab on Wired Star Client-Server LAN). Reasons: (1) Uniform hardware & identical MS Office/browser versions guarantee exam fairness and eliminate BYOD compatibility issues; (2) Wired Gigabit Ethernet prevents Wi-Fi congestion/dropouts during timed exams; (3) Client-Server enables locked-down exam accounts (no Internet/AI access, no personal malware/bloatware) and automated central backup.',
      '(b) Server distribution: place read-only starter files in a shared network folder with user-specific write-only submission folders (or NTFS permissions) so learners cannot view peers’ answers.',
      'Submission checks: (1) In HTML, verify relative image `src` paths and closing tags before zipping the folder; (2) In Excel, lock fixed rate cells with `$A$1` and widen columns if `###` appears before saving/exporting.',
    ],
    markBreakdown: [
      { point: 'Recommended Option 2 (Managed Client-Server Desktop Lab)', marks: 1 },
      { point: 'Uniform specs & software compatibility for fair exams', marks: 1 },
      { point: 'Wired Star LAN avoids Wi-Fi drops/congestion', marks: 1 },
      { point: 'Client-Server exam accounts block unauthorised Internet/malware + central backup', marks: 1 },
      { point: 'Read-only shared distribution + isolated submission permissions', marks: 1 },
      { point: 'Two valid Solution Dev checks (HTML relative paths/tags, Excel `$A$1`/###, or zipping)', marks: 2 },
    ],
    workedReasoning:
      'Connects System Technologies (specs/compatibility), Networks (Star LAN vs Wi-Fi, Client-Server permissions), Social Implications (exam integrity/BYOD risk), and Solution Development (HTML/Excel checks).',
    commonMistake: 'Recommending BYOD for an official NSC Matric exam lab without addressing software version mismatches, cheating, and Wi-Fi failure.',
    checklist: [
      'Recommended Managed Lab with 3 distinct reasons',
      'Explained Client-Server read-only distribution & permissions',
      'Included 2 concrete Solution Development verification checks',
    ],
  },
];
