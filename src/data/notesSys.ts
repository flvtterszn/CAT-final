import { StudyNote } from '../types/cat';

export const NOTES_SYS: StudyNote[] = [
  {
    id: 'sys-ipo-types',
    topic: 'sys',
    subtopic: 'Computing Fundamentals',
    title: 'IPO+S+C Cycle & Categories of Computers',
    sagsRef: 'SAGS · System Technologies · Grade 10–12 Core',
    summary:
      'Every computing device operates through Input, Processing, Output, Storage, and Communication, scaled from embedded microcontrollers to multi-user servers.',
    recallPoints: [
      'IPO+S+C Cycle: Input captures raw data, Processing transforms it into information in RAM/CPU, Output presents or triggers action, Storage retains it non-volatilely, and Communication transfers it between systems.',
      'Categories by power and role: Personal (desktop/laptop), SOHO (Small Office / Home Office), Mobile (smartphone, tablet, smartwatch/wearable), Power User (workstation for CAD/3D/video editing), Server (centralised network services), Thin Client (relies on server processing).',
      'Embedded Computers: Dedicated single-purpose computers built inside appliances or machines (ATM, washing machine, vehicle ECU, drone flight controller).',
      'Single-Board Computers (SBC): Complete low-cost computers on one circuit board used for prototyping and IoT (Raspberry Pi, Arduino microcontroller).',
    ],
    comprehensionPoints: [
      'Output is not only on-screen or printed: it can be written straight to storage, transmitted across a network, fed as input into another program, or used to control physical actuators.',
      'Mobile and wearable devices (smartwatches, tablets) trade raw thermal headroom, screen real estate, and easy hardware upgradability for portability, battery efficiency, and built-in sensors (GPS, accelerometer, heart-rate).',
      'Power-user workstations prioritise multi-core CPUs, large ECC/high-speed RAM, dedicated high-VRAM GPUs, and fast NVMe SSDs over portability or low price.',
    ],
    synthesisAndApplication: [
      'When an IEB scenario asks you to recommend a computer type, match the user profile (e.g., travelling sales rep → ultrabook/2-in-1 with LTE & long battery; architect doing 3D CAD → desktop power workstation with dedicated GPU and 32 GB+ RAM; cashier terminal → thin client or dedicated POS).',
      'Explain why an ATM or smart fridge cannot easily run general-purpose desktop software: its embedded OS and firmware are optimised exclusively for deterministic real-time tasks and reliability.',
    ],
    examTips: [
      'Never recommend a desktop to a user whose scenario states they travel between client sites, and never recommend an entry-level Chromebook for 4K video rendering.',
      'Always state two explicit reasons tied to the scenario (e.g., "portable for site visits" + "sufficient battery life") for a 2-mark recommendation.',
    ],
    comparison: {
      title: 'Computer Categories at a Glance',
      headers: ['Category', 'Primary Strength', 'Typical Hardware Priority', 'Ideal Scenario'],
      rows: [
        ['Entry / Home PC', 'Low cost, basic productivity', 'Dual/quad-core CPU, 8 GB RAM, 256 GB SSD', 'Word processing, browsing, email'],
        ['Mobile / Ultrabook', 'Portability & battery life', 'Low-power CPU, lightweight chassis, Wi-Fi/LTE', 'Students, travelling executives'],
        ['Power Workstation', 'Sustained heavy compute', 'High-core CPU, 32+ GB RAM, dedicated GPU, NVMe', 'CAD, 3D rendering, video editing'],
        ['Server', '24/7 reliability & multi-user access', 'ECC RAM, RAID storage, dual PSU, fast NIC', 'School/business file & print sharing'],
        ['Embedded / SBC', 'Dedicated control & low power', 'Integrated sensors, flash firmware', 'ATMs, drones, smart appliances'],
      ],
    },
    diagramId: 'ipo-cycle',
    flashcardFront: 'What distinguishes an embedded computer from a general-purpose PC?',
    flashcardBack:
      'An embedded computer is built into a larger device (such as an ATM, drone, or smart appliance) to perform one dedicated control task reliably using firmware, rather than running varied user-installed applications.',
  },
  {
    id: 'sys-cpu-motherboard',
    topic: 'sys',
    subtopic: 'Internal Hardware & Processing',
    title: 'Motherboard, CPU Architecture, Clock Speed, Cores & Cache',
    sagsRef: 'SAGS · System Technologies · Processing Hardware',
    summary:
      'The motherboard interconnects all internal components via buses and slots, while CPU throughput depends on clock speed, core count, architecture, and onboard cache.',
    recallPoints: [
      'Motherboard: Main printed circuit board (PCB) housing the CPU socket, DIMM RAM slots (typically 2–4), chipset, PCIe expansion slots, SATA/M.2 connectors, BIOS/UEFI chip, CMOS battery, and rear I/O ports.',
      'CPU (Central Processing Unit): Executes program instructions via the Control Unit (CU — fetches/decodes/directs), Arithmetic Logic Unit (ALU — maths and logic comparisons), and ultra-fast Registers.',
      'Clock Speed (GHz): Billions of machine cycles per second (e.g., 3.6 GHz). Higher clock speed improves single-threaded responsiveness.',
      'Multi-Core Processors: Dual-core (2), quad-core (4), hexa-core (6), octa-core (8+) integrate multiple independent processing units on one chip to execute tasks in parallel.',
      'CPU Cache (L1, L2, L3): Ultra-fast SRAM built directly onto or beside the CPU to hold frequently used instructions and data, avoiding slow trips to main RAM.',
    ],
    comprehensionPoints: [
      'Clock speed alone does not determine CPU speed: a newer 3.0 GHz quad-core processor with larger L3 cache outperforms an older 3.5 GHz dual-core chip because it handles more instructions per cycle and parallelises workloads.',
      'Buses carry data, addresses, and power across the motherboard; bottlenecking occurs if a fast CPU is paired with insufficient RAM, slow bus speeds, or a mechanical HDD.',
      'Dedicated GPU vs Integrated Graphics: Integrated graphics share system RAM and handle everyday office/video playback, whereas a dedicated GPU has its own processor and high-speed VRAM (e.g., 8 GB GDDR6) essential for 3D CAD, gaming, and AI/video rendering.',
    ],
    synthesisAndApplication: [
      'Interpreting an advert in Paper 2: "Intel Core i5, 3.2 GHz (up to 4.4 GHz), 6-core, 12 MB Cache" — explain each spec separately in plain English and evaluate whether it suits multitasking, video editing, or office admin.',
      'When diagnosing slow performance during multitasking (browser + Zoom + Excel), identify whether the bottleneck is core count, RAM capacity, or storage speed rather than blindly recommending "buy a faster GHz CPU".',
    ],
    examTips: [
      'Always define GHz as "billions of cycles per second" (processing speed) and explain multi-core as "multiple physical processors on one chip allowing parallel multitasking".',
      'VRAM belongs to the GPU/graphics card — never confuse VRAM with system RAM or storage capacity.',
    ],
    flashcardFront: 'Name the three main factors in a CPU spec that determine processing performance.',
    flashcardBack:
      '1) Clock speed (GHz — cycles per second), 2) Number of cores (parallel task execution), and 3) Cache memory size (fast SRAM holding frequent instructions close to the CPU).',
  },
  {
    id: 'sys-memory-firmware',
    topic: 'sys',
    subtopic: 'Memory, Startup & Firmware',
    title: 'RAM, ROM, Cache, Virtual Memory, BIOS/UEFI & CMOS',
    sagsRef: 'SAGS · System Technologies · Primary Memory & Booting',
    summary:
      'Primary memory separates volatile working space (RAM/SRAM) from non-volatile startup firmware (ROM/BIOS/UEFI) and battery-backed CMOS configuration.',
    recallPoints: [
      'RAM (Random Access Memory): Volatile main memory storing the active OS, running applications, and open data for the CPU. Identified by capacity (8/16/32 GB), speed (MHz/MT/s), type (DDR4, DDR5), and DIMM/SO-DIMM slots.',
      'DRAM vs SRAM: DRAM (Dynamic RAM, e.g. SDRAM/DDR4/DDR5) must be continuously refreshed, is cheaper, and forms main RAM. SRAM (Static RAM) does not need refreshing, is far faster and costlier, and is used for CPU cache.',
      'ROM (Read-Only Memory): Non-volatile chip on the motherboard storing permanent startup instructions (PROM, EPROM, EEPROM/flash).',
      'Firmware: Software permanently or semi-permanently embedded in hardware (e.g., motherboard BIOS/UEFI, router firmware, printer controller).',
      'BIOS / UEFI & POST: Firmware that runs immediately at power-on, executes POST (Power-On Self-Test) to verify RAM/keyboard/drives, initialises hardware communication, and loads the OS bootloader into RAM.',
      'CMOS & CMOS Battery: Small low-power memory powered by a coin-cell battery on the motherboard storing BIOS settings (system date/time, boot order, hardware configuration).',
      'Virtual Memory: OS technique that uses a reserved area on the HDD/SSD (pagefile/swap) as overflow when physical RAM is full.',
    ],
    comprehensionPoints: [
      'Why BIOS and CMOS are distinct: BIOS is the startup program (stored on non-volatile ROM/flash); CMOS stores the changeable settings (clock, boot order) that BIOS reads. If the CMOS battery dies, the PC still powers on, but date/time and custom boot settings reset to factory defaults.',
      'Virtual Memory prevents immediate "out of memory" crashes when RAM fills up, but because even an SSD is far slower than DDR RAM, heavy swapping ("thrashing") makes the system noticeably sluggish.',
      'RAM capacity directly limits multitasking: 4 GB RAM runs out quickly under modern OS + browser tabs, forcing heavy virtual memory use; upgrading to 16 GB yields immediate multitasking relief.',
    ],
    synthesisAndApplication: [
      'Exam troubleshooting scenario: A school PC loses the correct date/time every morning after being unplugged at the wall, and displays a "CMOS Checksum Error" before booting → diagnose a dead CMOS battery (not a dead PSU or HDD).',
      'Compare adding RAM vs upgrading from HDD to SSD: adding RAM helps when many apps are open simultaneously; upgrading HDD to SSD accelerates booting, app launch, and virtual memory paging.',
    ],
    examTips: [
      'State BOTH volatility and purpose when differentiating RAM (volatile, holds active OS/apps/data) and ROM (non-volatile, holds startup/BIOS instructions).',
      'Mention "POST (Power-On Self-Test)" explicitly whenever asked what BIOS does at startup.',
    ],
    comparison: {
      title: 'RAM vs ROM vs Cache vs Virtual Memory',
      headers: ['Memory Type', 'Volatility', 'Speed', 'Primary Role'],
      rows: [
        ['RAM (DDR4/DDR5 DRAM)', 'Volatile', 'Very fast', 'Holds running OS, open programs, and active data'],
        ['CPU Cache (SRAM)', 'Volatile', 'Fastest', 'Stores most-used instructions right next to CPU cores'],
        ['ROM (BIOS/UEFI)', 'Non-volatile', 'Moderate', 'Stores permanent boot/POST firmware'],
        ['Virtual Memory (Pagefile)', 'On SSD/HDD', 'Slowest', 'Overflow space when physical RAM is full'],
      ],
    },
    diagramId: 'boot-sequence',
    flashcardFront: 'What happens if the CMOS battery on a motherboard goes flat?',
    flashcardBack:
      'The computer loses saved BIOS settings whenever mains power is removed: the system date and time reset, and custom boot order or hardware settings revert to defaults.',
  },
  {
    id: 'sys-storage-units',
    topic: 'sys',
    subtopic: 'Storage & Units',
    title: 'Secondary Storage Media, Cloud/NAS & Storage Units (×1 024)',
    sagsRef: 'SAGS · System Technologies · Storage & Capacities',
    summary:
      'Secondary storage retains data permanently across HDD, SSD, flash, optical, and network/cloud tiers, measured in binary multiples of 1 024.',
    recallPoints: [
      'Storage Units (binary multiples of 1 024): 8 bits = 1 Byte; 1 024 B = 1 KB; 1 024 KB = 1 MB; 1 024 MB = 1 GB; 1 024 GB = 1 TB; 1 024 TB = 1 PB; 1 024 PB = 1 EB.',
      'HDD (Hard Disk Drive): Magnetic spinning platters and mechanical read/write heads. High capacity per Rand, slower read/write, noisy, generates heat, vulnerable to shock/drops.',
      'SSD (Solid State Drive): Flash memory chips with zero moving parts (SATA or faster NVMe M.2). Very fast boot/load times, silent, low power, shock-resistant, higher cost per GB.',
      'Portable & Optical Media: USB flash drives & SD cards (solid-state portability, easy to lose/infect), Optical discs (CD 700 MB, DVD 4.7–8.5 GB, Blu-ray 25–50 GB — largely legacy for archiving/media).',
      'NAS (Network Attached Storage) & Cloud Storage: NAS is dedicated local network storage for shared office backups; Cloud storage (OneDrive, Google Drive, iCloud) stores files on remote servers via the Internet.',
    ],
    comprehensionPoints: [
      'An SSD improves perceived everyday computer speed (booting, launching apps, opening large files) more than almost any other single upgrade compared to an HDD.',
      'Hybrid setups (small SSD for OS + apps paired with large HDD or NAS for archival video/photos) balance speed with budget.',
      'Cloud storage adds anywhere access, automatic syncing, and off-site disaster resilience, but introduces dependence on broadband bandwidth, ongoing subscription fees, and POPIA/privacy governance.',
    ],
    synthesisAndApplication: [
      'Capacity calculation / selection: Justify why a 128 GB SSD is insufficient for a graphic designer storing raw 4K videos (suggest 1 TB+ NVMe SSD + external/NAS backup) whereas a cloud-first student only needs 256 GB SSD.',
      'Recommend Cloud Storage vs External HDD for a travelling team: Cloud enables real-time collaboration and version history without physical loss risk, while External HDD works offline with zero monthly fees.',
    ],
    examTips: [
      'In IEB CAT, binary unit steps use 1 024 (e.g., 1 TB = 1 024 GB). Know the exact order: B → KB → MB → GB → TB → PB → EB.',
      'When asked why a laptop survived a fall without data loss, cite "SSD has no moving mechanical parts unlike an HDD".',
    ],
    comparison: {
      title: 'HDD vs SSD Comparison',
      headers: ['Criterion', 'HDD (Magnetic)', 'SSD (Flash / NVMe)'],
      rows: [
        ['Moving parts', 'Yes (spinning platters & arm)', 'No (solid-state chips)'],
        ['Speed (boot & load)', 'Slower', 'Significantly faster (5–30×)'],
        ['Shock resistance', 'Fragile if dropped while running', 'Highly shock-resistant'],
        ['Cost per GB', 'Cheaper for multi-TB storage', 'Higher cost per GB'],
        ['Maintenance', 'Needs defragmentation', 'Never defragment (uses TRIM)'],
      ],
    },
    diagramId: 'storage-units',
    flashcardFront: 'Why does upgrading from an HDD to an SSD speed up a computer more than most upgrades, and should you defragment an SSD?',
    flashcardBack:
      'SSDs use flash memory with near-zero seek time and no moving parts, accelerating OS boot and file loading. Never defragment an SSD—it causes unnecessary write wear; Windows uses TRIM instead.',
  },
  {
    id: 'sys-input-output-assistive',
    topic: 'sys',
    subtopic: 'Peripherals & Accessibility',
    title: 'Input, Output, Biometrics, Displays, Printers, Ports & Assistive Tech',
    sagsRef: 'SAGS · System Technologies · Peripherals, I/O & Accessibility',
    summary:
      'Choosing peripherals means matching input capture, display fidelity, print economics, port standards, and assistive hardware to specific users and environments.',
    recallPoints: [
      'Specialised Input: Biometrics (fingerprint, facial, iris — unique, cannot be forgotten, raises privacy concerns), QR codes (2D matrix storing URLs/payments/tickets scanned by camera), RFID/NFC (wireless tag reading without line-of-sight), OCR (Optical Character Recognition — converts scanned text image into editable text), OMR (marks on surveys/tests), Barcode (1D line-of-sight).',
      'Display Metrics: Size (diagonal inches), Resolution (HD 1280×720, FHD 1920×1080, 4K UHD 3840×2160), Refresh Rate (Hz — updates per second; 120/144 Hz for smooth motion/gaming), Response Time (ms — ghosting prevention), Contrast Ratio (darkest black vs brightest white), DPI/PPI (sharpness).',
      'Display Panels: LCD (liquid crystals + fluorescent backlight — older, cheaper), LED (LCD with LED backlighting — thinner, brighter, better colour), OLED (each pixel emits own light, no backlight — deepest blacks, best contrast, thin, more expensive).',
      'Printers & Projectors: Mono Laser (toner, fast PPM, low cost/page, crisp text for high-volume offices), Inkjet (liquid ink, cheap to buy, high cost/page, vivid photo printing), Multifunction/All-in-One (print/scan/copy), Plotter (large architectural blueprints), 3D Printer (additive manufacturing in plastic/resin), Data/DLP Projector (group display).',
      'Ports & Connectors: VGA (legacy analog video only, no audio), HDMI (digital HD video + audio), DisplayPort (high refresh/multi-monitor), USB-A (standard peripheral port), USB-C (reversible, high speed, Power Delivery charging, video output), RJ45 (wired Ethernet), Audio 3.5 mm.',
      'Assistive Technology: Visual (Braille display/keyboard, screen reader software, screen magnifier, large-print keyboard), Motor (trackball, eye-tracking, head-pointer, adaptive sip-and-puff switches, single-handed keyboard), Hearing (visual flashing alerts, speech-to-text captions).',
    ],
    comprehensionPoints: [
      'An inkjet printer is a false economy for a school printing 5 000 worksheets a month: despite a low purchase price, expensive ink cartridges and slow PPM make cost-per-page unsustainable compared to a mono laser printer.',
      'USB-C simplifies modern laptops by combining data transfer, 4K external monitor output, and laptop charging through one reversible port.',
      'QR codes hold far more data than 1D barcodes and can still scan when partially damaged due to built-in error correction.',
    ],
    synthesisAndApplication: [
      'Assistive scenario: Recommend two hardware and two software adaptations for a learner with severe low vision or limited hand mobility (e.g., refreshable Braille display + high-contrast large-print keyboard; screen reader + voice-to-text dictation).',
      'Evaluate a budget monitor vs OLED monitor for photo editing vs school lab: photo editor needs accurate colour/contrast & IPS/OLED + high resolution; school lab needs durable LED-backlit FHD monitors with HDMI/DisplayPort.',
    ],
    examTips: [
      'Remember VGA carries ANALOG video ONLY (no audio), whereas HDMI carries BOTH digital video and audio.',
      'When comparing biometrics vs passwords, mention BOTH security/convenience AND the privacy/false-rejection/cannot-reset-a-fingerprint risk.',
    ],
    comparison: {
      title: 'LCD vs LED vs OLED Displays',
      headers: ['Technology', 'Light Source', 'Strengths', 'Trade-offs'],
      rows: [
        ['LCD (CCFL)', 'Fluorescent backlight', 'Low cost', 'Thicker, lower contrast, higher power'],
        ['LED (LED-LCD)', 'LED backlight behind LCD', 'Bright, energy-efficient, thin', 'Blacks still slightly lit'],
        ['OLED', 'Self-emissive per pixel', 'True blacks, highest contrast, ultra-thin', 'Higher price, potential burn-in'],
      ],
    },
    flashcardFront: 'Why is a mono laser printer better than an inkjet for a busy school admin office?',
    flashcardBack:
      'Mono laser printers use toner for much faster page-per-minute (PPM) speeds, crisper text, higher duty cycles, and significantly lower cost per page for high-volume black-and-white printing.',
  },
  {
    id: 'sys-os-software',
    topic: 'sys',
    subtopic: 'Software & Operating Systems',
    title: 'Operating Systems, Drivers, Utilities, Virtual Machines & Software Lifecycle',
    sagsRef: 'SAGS · System Technologies · Software & OS Management',
    summary:
      'System software coordinates hardware and runs applications through OS resource managers, device drivers, utilities, firmware, and virtualisation.',
    recallPoints: [
      'System Software vs Application Software: System software (OS, device drivers, utilities) runs and maintains the computer; Application software performs user tasks (Word, Excel, browsers, specialised accounting/CAD).',
      'OS Core Functions: 1) Memory management (allocates RAM + virtual memory), 2) Process/CPU scheduling (multitasking), 3) File & disk management, 4) Device management (Plug and Play + print spooling), 5) User interface (GUI vs CLI), 6) Security & user accounts.',
      'Device Driver: Specialised software allowing the OS to communicate with a specific hardware device (printer, GPU, scanner). Plug and Play (PnP) auto-detects devices and loads drivers.',
      'Spooling: Temporarily queuing print jobs in memory/disk so the user can keep working while a slower printer outputs pages.',
      'GUI vs CLI: GUI (Graphical User Interface — windows, icons, menus, pointer; intuitive for general users) vs CLI (Command Line Interface — typed commands; fast, scriptable, low overhead for technicians).',
      'Software Lifecycle & Types: Alpha/Beta software (pre-release testing to find bugs), Service Pack / Updates / Patches (bundled bug fixes, security patches, feature updates), Bloatware (unwanted pre-installed apps wasting RAM/storage), Virtual Machine (VM — software emulating a full separate PC/OS inside a host OS).',
    ],
    comprehensionPoints: [
      'A Virtual Machine lets a developer or teacher safely test beta software, malware samples, or run Linux/older Windows software inside a sandboxed guest OS without risking the host system.',
      'Compatibility checks both OS architecture/version (e.g., Windows 11 64-bit vs macOS) AND hardware system requirements (minimum = barely runs; recommended = smooth performance).',
      'Task Manager (Ctrl+Shift+Esc) lets users identify frozen processes ("End Task") and diagnose whether CPU, RAM, or Disk is pegged at 100%.',
    ],
    synthesisAndApplication: [
      'Troubleshooting scenario: A brand-new printer plugs in via USB but prints garbled characters or fails to appear → diagnose missing/corrupt device driver or wrong default printer, not broken RAM.',
      'Scenario: A company buys 30 new laptops that feel sluggish out of the box → identify pre-installed bloatware consuming startup RAM/CPU and recommend clean uninstalling + checking Task Manager startup items.',
    ],
    examTips: [
      'Know the exact distinction: a patch fixes a specific bug/vulnerability quickly, whereas a service pack/feature update bundles many updates together.',
      'Always link "Plug and Play" to automatic detection AND driver configuration.',
    ],
    diagramId: 'software-layers',
    flashcardFront: 'What is spooling, and why does an operating system use it?',
    flashcardBack:
      'Spooling places output (such as print jobs) into a temporary queue/buffer on disk or RAM so the CPU and user can immediately continue working instead of waiting for a slow peripheral.',
  },
  {
    id: 'sys-licensing-files',
    topic: 'sys',
    subtopic: 'Licensing, Files & Maintenance',
    title: 'Software Licensing, File Extensions, Metadata, Compression & Disk Maintenance',
    sagsRef: 'SAGS · System Technologies · Licensing & Computer Management',
    summary:
      'Effective system management combines legal software licensing, structured file organisation, format awareness, and routine disk/backup maintenance.',
    recallPoints: [
      'Licensing Models: Proprietary/Commercial (paid, closed source, restricted by EULA), Single-user vs Site/Volume licence (install on many school/office PCs under one agreement), Subscription/SaaS (ongoing monthly/annual fee + cloud updates), Freeware (free to use, closed source), Shareware (free trial then pay), Open-Source / FOSS (free, source code publicly available to inspect/modify), Creative Commons (flexible copyright licences for media: BY, NC, ND, SA).',
      'Key File Extensions: Documents (.docx, .pdf read-only portable, .txt plain text, .rtf), Spreadsheets (.xlsx, .csv comma-separated plain data), Presentations (.pptx), Images (.jpg/.jpeg lossy photo, .png lossless + transparency, .gif animation, .bmp uncompressed huge), Audio (.mp3 compressed, .wav uncompressed high quality), Video (.mp4, .avi, .mov), Web (.html, .css, .js), Executables (.exe, .msi installer), Archives (.zip).',
      'File Operations & Wildcards: Download (Internet → local) vs Upload (local → Internet); Import (bring external format into app) vs Export (save into another format e.g. PDF/CSV); Metadata (data about a file: author, date, camera GPS, dimensions); Wildcards (* = zero or more characters, ? = exactly one character).',
      'Refresh vs Purge vs Cache: Refresh (F5 — reloads current display without deleting stored data), Purge (permanently deletes unwanted/temp/cache/old records), Cache (temporary fast data stored to speed up repeat loads), Temporary Files (scratch files safely removable via Disk Clean-up).',
      'Maintenance & Protection: Disk Clean-up (removes temp files/Recycle Bin), Defragmentation (reorganises fragmented file clusters on HDD only — NOT SSD), UPS (Uninterruptible Power Supply — battery backup + surge protection for safe shutdown), Backups (3-2-1 rule: 3 copies, 2 media types, 1 off-site/cloud).',
    ],
    comprehensionPoints: [
      'Open-source software (like Linux or LibreOffice) eliminates licence fees and allows customisation, but may lack dedicated vendor telephonic support and require staff retraining.',
      'Choosing between .bmp, .jpg, and .png: never email 20 MB .bmp photos when .jpg compresses photographs cleanly; use .png when sharp logos or transparent backgrounds are needed.',
      'A UPS does NOT let an office run for hours during load-shedding (that requires an inverter/generator); its job is short-term battery runtime + surge filtering so users can save open files and shut down cleanly without corrupting data.',
    ],
    synthesisAndApplication: [
      'Scenario: An organisation needs a spreadsheet tool for 200 PCs on zero budget → compare Open-Source (LibreOffice Calc — free site-wide, no per-seat fees, offline) vs Subscription SaaS (Microsoft 365 — ongoing fee, industry compatibility, cloud collaboration).',
      'Wildcard & File management question: Explain what `Report_202?.pdf` finds (Report_2020.pdf, Report_2025.pdf, etc. — single character) vs `Report_*.pdf` (any length after underscore).',
    ],
    examTips: [
      'When asked for two disadvantages of Open-Source software, give "limited official technical support" and "potential compatibility/training issues with proprietary formats".',
      'Never confuse Compression (shrinking files into .zip to save space/bandwidth) with Encryption (scrambling files for confidentiality).',
    ],
    comparison: {
      title: 'Refresh vs Purge vs Defragment vs Disk Clean-up',
      headers: ['Action', 'What It Does', 'Target', 'When Used'],
      rows: [
        ['Refresh (F5)', 'Reloads current view/webpage', 'Screen display / browser tab', 'Page not updating or new files missing'],
        ['Purge', 'Permanently removes old/unwanted data', 'Cache, temp files, trash, old DB rows', 'Reclaiming space or clearing stale cache'],
        ['Disk Clean-up', 'Safely deletes OS temp/recycle/log files', 'HDD or SSD free space', 'Routine storage & performance maintenance'],
        ['Defragmentation', 'Consolidates split file fragments', 'Mechanical HDD only (never SSD)', 'Slow file reads on heavily used HDD'],
      ],
    },
    diagramId: 'memory-hierarchy',
    flashcardFront: 'Distinguish between Freeware, Shareware, and Open-Source Software.',
    flashcardBack:
      'Freeware is free to use but closed-source; Shareware is free for a limited trial period/features before payment; Open-source provides public source code so users can inspect, modify, and redistribute it.',
  },
];
