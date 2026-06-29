# MS Cybersecurity Interactive Learning Platform

A free static website for a zero-to-advanced MS-level cybersecurity course.

## Current release

This starter release includes:

- Complete static-site architecture
- Sidebar navigation
- Search page and mini search
- Dark mode
- Reading progress bar
- Table of contents
- Previous/next navigation
- Copy code buttons
- Mermaid diagrams
- Browser print-to-PDF
- Bookmarks through Local Storage
- Recently viewed lessons
- Glossary search
- Progress tracker
- Quiz mode
- Responsive design
- Print-friendly CSS
- Accessibility-oriented structure
- Week 0 overview
- Full Lesson 0.1: Lab Readiness and Learning Path

## Hosting on GitHub Pages

1. Create a new GitHub repository.
2. Upload all files in this folder to the repository root.
3. Open repository Settings → Pages.
4. Choose deployment from a branch.
5. Select the main branch and root folder.
6. Save and open the generated GitHub Pages URL.

## Adding a new lesson

1. Copy `content/templates/lesson-template.html` into the correct `weeks/week-XX/` folder.
2. Rename the file with a readable slug.
3. Fill all 19 required lesson sections.
4. Add the lesson to `assets/js/nav-data.js`.
5. Add searchable metadata to `assets/js/search-index.js`.
6. Add new terms to `assets/js/glossary-data.js`.
7. Test the page locally by opening `index.html` in a browser.

## Safety rule

All labs must be isolated, authorized, and educational. Do not include instructions for unauthorized testing against real systems.

## Licenses

- Code: MIT License, see `LICENSE-CODE.md`.
- Course content: Creative Commons Attribution 4.0, see `LICENSE-CONTENT.md`.


## Current content status

- Lesson 0.1: Lab Readiness and Learning Path — ready
- Lesson 0.2: Linux from Zero for Cybersecurity — ready
- Lesson 0.3: Networking from Zero — next planned lesson


## Latest content update

- Added Lesson 0.3: Networking from Zero for Cybersecurity.

- Lesson 0.4: Python for Security Learners is now included.


## Current generated lesson

- Week 2, Lesson 2.1: Operating Systems from First Principles


## Important URL Structure

Lesson files live under `weeks/week-XX/`. For example:

`weeks/week-02/users-groups-and-identity.html`

Root-level lesson slugs such as `users-groups-and-identity.html` are included only as redirect aliases. They exist to prevent broken styling if a lesson is opened from the repository root.

If a page appears as plain unstyled text, it usually means CSS/JavaScript assets were referenced from the wrong folder. This build includes resilient asset fallbacks and root-level redirects to prevent that issue on GitHub Pages project sites.


## Current build note

This build includes Week 4 — Secure Software and Supply Chain, Lesson 4.1.

## Latest content update
- Week 5: Memory Safety and Binary Foundations — Lesson 5.1 added.


## Current build status

Generated through Week 6 Lesson 6.1: Web Applications from First Principles.


## Latest content added

- Lesson 6.2 — Sessions, Cookies, and Browser Security.

- Lesson 6.3 — Injection, XSS, and Secure Output.


Latest generated lesson: Lesson 6.4 — API Security and Object-Level Authorization.

- Week 7 Lesson 7.2 added: TCP/IP, DNS, and Routing Security.


Latest update: Added Lesson 7.3 — Firewalls, Segmentation, and Zero Trust.


## Latest content update

- Added Lesson 10.3: Containers, Images, and Kubernetes Security.


Latest update: added Lesson 10.4 — DevSecOps Pipelines and Infrastructure as Code.

## Latest content update

- Added Week 11 overview: Security Operations, Monitoring, and Detection Engineering.
- Expanded Week 11 overview into a full course-week landing page with SOC mental model, lesson map, workflow diagram, failure points, practical deliverables, safety boundary, and readiness checklist.
- Added Lesson 11.1: Security Operations from First Principles.
- Updated navigation, search index, glossary terms, root redirects, and Lesson 10.5 next-link progression.

## Current build status

Generated through Week 16 Lesson 16.3. Weeks 11–15 are complete; Week 16 is in progress.


## Latest content update

- Added Lesson 11.2: SIEM, Log Sources, and Telemetry Pipelines.
- Updated Week 11 overview, navigation, search index, glossary terms, root redirect, and Lesson 11.1 next-link progression.


## Latest content update

- Added Lesson 11.3: Detection Engineering and Rule Lifecycle.
- Updated Week 11 overview, navigation, search index, glossary terms, root redirect, and Lesson 11.2 next-link progression.


## Latest content update

- Added Lesson 11.4: Alert Triage, Investigation, and Threat Hunting.
- Grounded the lesson in current NIST SP 800-61 Rev. 3, CISA response playbooks, NIST SP 800-92 log-management guidance, MITRE ATT&CK, and common structured hunting workflow patterns.
- Updated Week 11 overview, navigation, search index, glossary terms, root redirect, and Lesson 11.3 next-link progression.


## Latest content update

- Added Lesson 11.5: Metrics, Automation, and SOC Maturity.
- Grounded the lesson in current measurement and operations references including NIST SP 800-55 Volume 1, NIST CSF 2.0, CISA Cybersecurity Performance Goals 2.0, CISA Zero Trust Maturity Model 2.0, NIST SP 800-137, and MITRE ATT&CK data-source guidance.
- Updated Week 11 overview, navigation, search index, glossary terms, root redirect, and Lesson 11.4 next-link progression.
- Week 11 is complete; Week 12 Incident Response & Forensics has begun with the overview and Lesson 12.1.


## Latest content update

- Added Week 12 Overview: Incident Response & Forensics.
- Grounded the overview in current NIST SP 800-61 Rev. 3, NIST CSF 2.0, CISA incident/vulnerability response playbooks, NIST SP 800-86 forensic guidance, NIST SP 800-184 recovery planning, and NIST SP 800-84 exercise guidance.
- Replaced the generic Week 12 placeholder with a Week 12 lesson map covering incident response fundamentals, evidence preservation, host/memory/network/cloud evidence, containment/recovery runbooks, and reporting/tabletop exercises.
- Updated navigation, search index, glossary terms, root redirect, home page status, README status, and Lesson 11.5 next-link progression.


## Week 12 Lesson 12.1 update

- Added Lesson 12.1: Incident Response from First Principles.
- Grounded the lesson in NIST SP 800-61 Rev. 3, NIST CSF 2.0, CISA response playbooks, NIST SP 800-86, NIST SP 800-184, and NIST SP 800-84.
- Added a safe fictional JSONL/Python incident declaration decision-aid lab.
- Updated navigation, search, glossary, root redirects, and Week 12 overview links.


## Week 12 Lesson 12.2 update

- Added Lesson 12.2: Evidence Preservation and Digital Forensics Fundamentals.
- Integrated evidence preservation, chain of custody, forensic process, hashing, volatility, documentation discipline, and scoped defensive collection.
- Added a safe fictional local Python lab for validating evidence manifests and chain-of-custody metadata.


## Week 12 Lesson 12.3 update

- Added Lesson 12.3: Host, Memory, Network, and Cloud Evidence.
- Grounded the lesson in NIST SP 800-86, NIST IR 8354, NIST IR 8006, NIST SP 800-92, NIST SP 800-61 Rev. 3, AWS cloud incident response/log-source guidance, Microsoft Azure/Entra logging documentation, and Google Cloud audit/flow-log documentation.
- Integrated host, memory, network, cloud, SaaS, identity, and container evidence selection with volatility, retention, authorization, privacy, and interpretation limits.
- Added a safe fictional local Python lab for evidence-source prioritization.
- Updated navigation, search, glossary, root redirect, Week 12 overview, and Lesson 12.2 next-link progression.


## Week 12 Lesson 12.4 update

- Added Lesson 12.4: Containment, Eradication, and Recovery Runbooks.
- Grounded the lesson in NIST SP 800-61 Rev. 3, NIST CSF 2.0 Respond/Recover outcomes, CISA incident/vulnerability response playbooks, NIST SP 800-184 recovery planning, NIST SP 800-86 forensic integration, NIST SP 800-84 testing guidance, and the CISA/MS-ISAC Ransomware Guide.
- Integrated containment tradeoffs, evidence preservation, identity/host/cloud/SaaS containment, eradication by root-cause hypothesis, recovery validation, decision records, and response metrics.
- Added a safe fictional local Python lab for ranking containment options and producing runbook decision records.
- Updated navigation, search, glossary, root redirect, Week 12 overview, and Lesson 12.3 next-link progression.


## Week 12 Lesson 12.5 update

- Added Lesson 12.5: Reporting, Lessons Learned, and Tabletop Exercises.
- Grounded the lesson in NIST SP 800-61 Rev. 3, NIST CSF 2.0, CISA incident/vulnerability response playbooks, NIST SP 800-84 TT&E guidance, NIST SP 800-184 recovery planning, CISA Tabletop Exercise Packages, and current CISA reporting context.
- Integrated incident reporting, fact/inference/unknown separation, audience-specific reporting, evidence-to-claim mapping, closure criteria, lessons learned, corrective-action registers, tabletop design, exercise injects, and after-action reporting.
- Added a safe fictional local Python lab for building an after-action package and tabletop plan.
- Updated navigation, search, glossary, root redirect, Week 12 overview, and Lesson 12.4 next-link progression.
- Week 12 is complete; Week 13 Offensive Security Methodology is the next planned module.


## Week 13 Overview update

- Added Week 13 Overview: Offensive Security Methodology.
- Replaced the generic Week 13 placeholder with a researched lesson map covering authorized offensive security, scoping/rules of engagement, reconnaissance and attack-surface mapping, vulnerability validation and exploit-safety boundaries, and reporting/remediation/purple-team handoff.
- Grounded the overview in NIST SP 800-115, NIST SP 800-53 Rev. 5, NIST SP 800-53A Rev. 5, OWASP WSTG, MITRE ATT&CK, CISA Cyber Hygiene Services, CREST penetration-testing guidance, and PTES.
- Updated navigation, search, glossary, root redirect, home page status, and Lesson 12.5 next-link progression.
- Week 13 has begun; Lesson 13.1 is now complete and Lesson 13.2 is the next planned item.


## Week 13 Lesson 13.1 update

- Added Lesson 13.1: Authorized Offensive Security from First Principles.
- Grounded the lesson in NIST SP 800-115, NIST SP 800-53 Rev. 5, NIST SP 800-53A Rev. 5, OWASP WSTG, MITRE ATT&CK, CISA Cyber Hygiene Services, and PTES.
- Integrated authorization, scope, rules of engagement, testing-type distinctions, evidence quality, privacy/data handling, risk validation, and defensive handoff.
- Added a safe fictional local Python lab for assessment authorization readiness. The lab performs no scanning, exploitation, credential collection, or network activity.
- Updated navigation, search, glossary, root redirect, Week 13 overview, and next-link progression.


## Week 13 Lesson 13.2 update

- Added Lesson 13.2: Scoping, Rules of Engagement, and Test Planning.
- Grounded the lesson in NIST SP 800-115, NIST SP 800-53A Rev. 5, NIST SP 800-53 Rev. 5, OWASP WSTG, MITRE ATT&CK, and CISA Cyber Hygiene Services.
- Integrated scope statements, rules of engagement, allowed and prohibited methods, test windows, emergency contacts, stop conditions, communication/deconfliction, evidence/data handling, production/cloud/SaaS/third-party traps, and readiness review.
- Added a safe fictional local Python lab for validating rules-of-engagement and test-plan completeness. The lab performs no scanning, exploitation, credential collection, or network activity.
- Updated navigation, search, glossary, root redirect, Week 13 overview, and Lesson 13.1 next-link progression.


## Week 13 Lesson 13.3 update

- Added Lesson 13.3: Reconnaissance, Enumeration, and Attack Surface Mapping.
- Grounded the lesson in NIST SP 800-115, OWASP WSTG Information Gathering, MITRE ATT&CK Reconnaissance TA0043, NCSC External Attack Surface Management guidance, CISA Cyber Hygiene Services, and NIST SP 800-53 Rev. 5.
- Focused on authorized passive reconnaissance, active enumeration boundaries, owner validation, inventory reconciliation, web/API surface, cloud/SaaS surface, identity surface, third-party dependencies, exposure prioritization, and evidence quality.
- Added a safe fictional local Python lab that triages attack-surface observations without scanning, crawling, DNS lookups, web requests, authentication, exploitation, credential use, or network activity.
- Updated navigation, search, glossary, root redirect, Week 13 overview, and Lesson 13.2 next-link progression.


## Week 13 Lesson 13.4 update

- Added Lesson 13.4: Vulnerability Validation, Exploit Safety, and Evidence.
- Grounded the lesson in NIST SP 800-115, FIRST CVSS v4.0, FIRST EPSS, CISA Known Exploited Vulnerabilities guidance, SSVC, NIST SP 800-40 Rev. 4, and OWASP WSTG.
- Focused on least-invasive proof, scanner triage, exploit-safety boundaries, CVSS/EPSS/KEV/SSVC prioritization inputs, evidence package standards, impact wording, data handling, remediation, and retest criteria.
- Added a safe fictional local Python lab that classifies validation decisions without scanning, crawling, DNS lookups, web requests, authentication, exploitation, credential use, or network activity.
- Updated navigation, search, glossary, root redirect, Week 13 overview, home page status, and Lesson 13.3 next-link progression.


## Latest content update

- Added Lesson 13.5: Reporting, Remediation, Retesting, and Purple-Team Handoff.
- Completed Week 13 — Offensive Security Methodology.
- Updated navigation, search index, glossary terms, root redirect, Week 13 overview, Lesson 13.4 next-link progression, and home/status text.
- Included a safe fictional local Python lab for reporting artifacts, remediation tickets, retest cases, and purple-team handoff notes.


## Week 14 Overview update

- Added Week 14 Overview: Governance, Risk, Privacy, Law.
- Replaced the generic Week 14 placeholder with a researched lesson map covering cybersecurity governance, risk management/controls/assurance, privacy engineering/data protection, cyber law/regulation/incident reporting, and third-party risk/audit evidence/governance reporting.
- Grounded the overview in NIST CSF 2.0, NIST SP 800-37 Rev. 2, NIST SP 800-53 Rev. 5, the NIST Privacy Framework, CISA Cybersecurity Performance Goals 2.0, EU GDPR/data-protection guidance, NIS2, CIRCIA, SEC cybersecurity disclosure rules, DORA, and the EU Cyber Resilience Act.
- Added a legal/educational boundary: this content is not legal advice and jurisdiction-specific duties must be escalated to counsel/compliance/privacy owners.
- Updated navigation, search index, glossary terms, root redirect, home page status, and Lesson 13.5 next-link progression.
- Week 14 has begun with the overview and governance/risk lessons now in progress.


## Week 14 Lesson 14.1 update

- Added Lesson 14.1: Cybersecurity Governance from First Principles.
- Grounded the lesson in NIST CSF 2.0, NIST SP 800-37 Rev. 2, NIST SP 800-53 Rev. 5, NIST SP 800-55 Vol. 1, the NIST Privacy Framework, CISA Cybersecurity Performance Goals 2.0, and ISO/IEC 27001:2022.
- Focused on accountability, decision rights, risk appetite/tolerance, risk owners, control owners, policy owners, governance committees, exceptions, residual risk, metrics, assurance, privacy/legal escalation, and board-ready reporting.
- Added a safe fictional local Python lab for governance-readiness review. The lab performs no network, scanning, authentication, exploitation, cloud, legal, or real organizational assessment activity.
- Updated navigation, search index, glossary terms, root redirect, Week 14 overview, and home/status text.
- Lesson 14.3 has now been added; the next planned item is Lesson 14.4 — Cyber Law, Regulation, and Incident Reporting.


## Week 14 Lesson 14.2 update

- Added Lesson 14.2: Risk Management, Controls, and Assurance.
- Grounded the lesson in NIST SP 800-30, NIST SP 800-37, NIST SP 800-53/53A, NISTIR 8286 Rev. 1, NIST SP 800-137, NIST SP 800-55 Vol. 1, and CISA Cybersecurity Performance Goals 2.0.
- Added a safe fictional JSON/Python lab for risk statement review, control evidence checks, ownership gaps, residual-risk decision readiness, and assurance warnings.
- Updated Week 14 overview, navigation, search index, glossary, root redirect, home page status, and Lesson 14.1 next-link progression.

- Next planned item: Lesson 14.5 — Third-Party Risk, Audit Evidence, and Governance Reporting.


## Week 14 Lesson 14.3 update

- Added Lesson 14.3: Privacy Engineering and Data Protection.
- Grounded the lesson in the NIST Privacy Framework, NISTIR 8062, NIST PRAM, NIST SP 800-53 Rev. 5, NIST SP 800-122, OECD privacy principles, GDPR Articles 5/6/25, EDPB Article 25 guidance, European Commission rights guidance, and California CCPA public guidance.
- Focused on privacy engineering, data lifecycle mapping, personal-data taxonomy, minimization, purpose limitation, retention, data protection by design/default, privacy risk, PIA/DPIA thinking, vendor sharing, rights workflows, and privacy in security logging.
- Added a safe fictional local Python lab for privacy-activity review. The lab performs no network activity, scanning, data discovery, legal analysis, or real privacy assessment.
- Updated Week 14 overview, navigation, search index, glossary, root redirect, home page status, and Lesson 14.2 next-link progression.

- Next planned item: Lesson 14.5 — Third-Party Risk, Audit Evidence, and Governance Reporting.


## Week 14 Lesson 14.4 update

- Added Lesson 14.4: Cyber Law, Regulation, and Incident Reporting.
- Grounded the lesson in NIST CSF 2.0, NIST SP 800-61 Rev. 3, GDPR Articles 33/34, SEC cybersecurity incident disclosure guidance, CIRCIA rulemaking materials, NIS2 Article 23, DORA incident-reporting materials, the FTC Safeguards Rule notification requirement, and EU Cyber Resilience Act reporting guidance.
- Focused on legal boundaries, incident reporting vs breach notification vs securities disclosure, materiality support, reporting clocks, communications governance, contractual notifications, third-party notices, evidence preservation, and decision records.
- Added a safe fictional local Python lab for incident-reporting triage and reporting-matrix generation. The lab performs no network activity, scanning, evidence collection, legal analysis, or real incident assessment.
- Updated Week 14 overview, navigation, search index, glossary, root redirect, home page status, and Lesson 14.3 next-link progression.

- Next planned item: Lesson 14.5 — Third-Party Risk, Audit Evidence, and Governance Reporting.




## Week 14 Lesson 14.5 update

- Added Lesson 14.5: Third-Party Risk, Audit Evidence, and Governance Reporting.
- Grounded the lesson in NIST SP 800-161 Rev. 1 Update 1, NIST CSF 2.0, NIST SP 1305, NIST SP 800-53/53A, NIST SP 800-218, CISA Secure Software Development Attestation materials, AICPA SOC reporting references, and ISO/IEC 27036 supplier-relationship concepts.
- Focused on third-party/supplier risk, vendor tiering, contracts, subprocessors/fourth parties, cloud shared responsibility, software supply-chain assurance, evidence quality, SOC/ISO evidence limits, complementary controls, remediation, exit planning, and governance reporting.
- Added a safe fictional local Python lab for vendor-risk and audit-evidence triage. The lab performs no network activity, scanning, vendor access, legal analysis, or real assurance decision.
- Updated Week 14 overview, navigation, search index, glossary, root redirect, home page status, and Lesson 14.4 next-link progression.

- Week 14 is now complete. Next planned module: Week 15 — Advanced and Emerging Topics.


## Week 15 Overview update

- Added Week 15 Overview: Advanced and Emerging Topics.
- Replaced the generic Week 15 placeholder with a researched lesson map covering AI/LLM security and model governance, post-quantum cryptography and crypto-agility, zero trust at scale and identity-centric architecture, OT/IoT/cyber-physical security, and secure-by-design/cyber-resilience programs.
- Grounded the overview in NIST AI RMF, NIST AI 600-1 Generative AI Profile, OWASP LLM Top 10, NIST PQC FIPS 203/204/205 materials, NIST SP 1800-38, NIST SP 800-207, CISA Zero Trust Maturity Model 2.0, NIST SP 800-82 Rev. 3, NIST IR 8425, CISA Secure by Design, and NIST SP 800-160 Vol. 2 Rev. 1.
- Updated navigation, search index, glossary, root redirect, home page status, and Lesson 14.5 next-link progression.

- Week 15 has begun. Next planned item: Lesson 15.1 — AI Security, LLM Risk, and Model Governance.


## Week 15 Lesson 15.1 update

- Added Lesson 15.1: AI Security, LLM Risk, and Model Governance.
- Grounded the lesson in NIST AI RMF 1.0, NIST AI 600-1 Generative AI Profile, OWASP Top 10 for Large Language Model Applications, OWASP AI Exchange, NIST AI 100-2 Adversarial Machine Learning taxonomy, MITRE ATLAS, ISO/IEC 42001:2023, and EU AI Act governance context.
- Focused on AI system inventory, LLM application risk, prompt injection as a control-boundary issue, retrieval-augmented generation, tool use, agentic AI, model/data supply chain, TEVV, monitoring, human oversight, and governance evidence.
- Added a safe fictional local Python lab for AI governance triage. The lab performs no network activity, model calls, prompt testing against real services, exploitation, vendor access, or legal analysis.
- Updated Week 15 overview, navigation, search index, glossary, root redirect, home page status, and Week 15 progression.

- Next planned item: Lesson 15.2 — Post-Quantum Cryptography and Crypto-Agility.


## Week 15 Lesson 15.2 update

- Added Lesson 15.2: Post-Quantum Cryptography and Crypto-Agility.
- Grounded the lesson in NIST FIPS 203, FIPS 204, and FIPS 205; NIST/NCCoE Migration to Post-Quantum Cryptography guidance; NIST SP 1800-38; NIST IR 8547 draft transition guidance; and NSA CNSA Suite 2.0 context for high-assurance environments.
- Focused on cryptographic inventory, CBOMs, CRQC risk, harvest-now-decrypt-later, ML-KEM, ML-DSA, SLH-DSA, crypto-agility, PKI, certificates, firmware/code signing, vendor dependencies, hybrid transition, interoperability testing, rollback, and governance.
- Added a safe fictional local Python lab for PQC readiness triage. The lab performs no scanning, DNS lookup, web request, cryptographic operation, certificate collection, authentication, vendor access, or system inspection.
- Updated Week 15 overview, navigation, search index, glossary, root redirect, home page status, and Week 15 progression.

- Next planned item: Lesson 15.3 — Zero Trust at Scale, SASE, and Identity-Centric Architecture.


## Week 15 Lesson 15.3 update

- Added Lesson 15.3: Zero Trust at Scale, SASE, and Identity-Centric Architecture.
- Grounded the lesson in NIST SP 800-207, NIST NCCoE SP 1800-35, OMB M-22-09, CISA Zero Trust maturity concepts, NIST SP 800-53, and NIST SP 800-137.
- Focused on Zero Trust as architecture rather than product, identity-centric security, policy decision/enforcement points, device and workload posture, application/resource-specific access, network segmentation, data controls, SASE/SSE/ZTNA distinctions, telemetry, automation, legacy exceptions, and maturity metrics.
- Added a safe fictional local Python lab for Zero Trust readiness triage. The lab performs no network activity, scanning, authentication, exploitation, bypass testing, vendor access, or real security assessment.
- Updated Week 15 overview, navigation, search index, glossary, root redirect, home page status, and Lesson 15.2 next-link progression.



## Week 15 Lesson 15.4 update

- Added Lesson 15.4: OT, IoT, and Cyber-Physical Security.
- Grounded the lesson in NIST SP 800-82 Rev. 3, NIST SP 800-213, NISTIR 8259, NISTIR 8425, CISA ICS resources, CISA Cross-Sector Cybersecurity Performance Goals, and ISA/IEC 62443.
- Focused on safety, availability, engineering ownership, cyber-physical impact, passive discovery, segmentation, remote-access governance, firmware/support lifecycle, IoT procurement, monitoring, privacy, and incident-response coordination.
- Added a safe fictional local Python lab for OT/IoT/cyber-physical risk triage. The lab performs no network activity, scanning, protocol interaction, authentication, vendor access, device interaction, configuration change, or real safety/security assessment.
- Updated Week 15 overview, navigation, search index, glossary, root redirect, home page status, and Lesson 15.3 next-link progression.



## Week 15 Lesson 15.5 update

- Added Lesson 15.5: Secure by Design, Cyber Resilience, and Future-Ready Programs.
- Grounded the lesson in CISA Secure by Design/Secure by Demand, NIST SP 800-218 SSDF, NIST SP 800-160 Vol. 2 Rev. 1, NIST SP 800-184, NIST CSF 2.0, NIST SP 800-34, and CISA Cross-Sector Cybersecurity Performance Goals.
- Focused on secure defaults, design evidence, threat-informed design, recovery testing, cyber resilience, procurement pressure, dependency transparency, future technology review, metrics, and continuous improvement.
- Added a safe fictional local Python lab for secure-by-design and resilience triage. The lab performs no network activity, model calls, scanning, exploitation, authentication, vendor access, or real security assessment.
- Updated Week 15 overview, navigation, search index, glossary, root redirect, home page status, and Lesson 15.4 next-link progression.

- Week 15 is now complete. Next planned module: Week 16 — Capstone.


## Week 16 Overview update

- Added Week 16 Overview: Capstone.
- Replaced the generic Week 16 placeholder with a researched capstone lesson map covering scenario/charter, enterprise assessment/risk register, detection/IR/forensic evidence drill, governance/privacy/legal/third-party executive briefing, and final portfolio/defense/career roadmap.
- Grounded the overview in NIST CSF 2.0, NIST SP 800-37 Rev. 2, NIST SP 800-53A Rev. 5, NIST SP 800-55 Vol. 1, NIST SP 800-115, NIST SP 800-61 Rev. 3, CISA Cross-Sector Cybersecurity Performance Goals, and NIST SP 800-181 Rev. 1 NICE Framework.
- Focused on authorization, evidence quality, scope control, risk reasoning, control assessment, incident-response integration, governance reporting, portfolio structure, and oral defense readiness.
- Updated navigation, search index, glossary, root redirect, home page status, and Lesson 15.5 next-link progression.

- Week 16 has begun. Next planned item: Lesson 16.1 — Capstone Scenario, Charter, and Success Criteria.


## Week 16 Lesson 16.1 update

- Added Lesson 16.1: Capstone Scenario, Charter, and Success Criteria.
- Built the capstone foundation around fictional scenario design, scope, authorization boundary, stakeholders, decision rights, success criteria, evidence rules, rubric, and portfolio sanitization.
- Research basis includes NIST CSF 2.0, NIST SP 800-37 Rev. 2, NIST SP 800-53A Rev. 5, NIST SP 800-115, NIST SP 800-61 Rev. 3, CISA CPGs, and the NICE Framework.
- Added a safe local JSON + Python charter-readiness lab. The lab performs no scanning, network activity, authentication, exploitation, cloud access, or real assessment.
- Updated Week 16 overview, navigation, search index, glossary, root redirect, home page status, and Week 16 progression.
- Next planned item after Lesson 16.1: Lesson 16.2 — Enterprise Security Assessment and Risk Register.



## Week 16 Lesson 16.2 update

- Added Lesson 16.2: Enterprise Security Assessment and Risk Register.
- Added a researched capstone lesson covering assessment planning, asset/data/dependency mapping, control evidence review, risk statements, scoring discipline, residual risk, treatment decisions, evidence notebooks, and executive risk rollups.
- Added a safe fictional local Python lab that generates a risk register from course-provided JSON and flags evidence/ownership/control-readiness warnings without network activity or real assessment.
- Updated Week 16 overview, Lesson 16.1 progression, navigation, search index, glossary, root redirect, README, and home page status.
- Next planned item: Lesson 16.3 — Detection, Incident Response, and Forensic Evidence Drill.


## Week 16 Lesson 16.3 update

- Added Lesson 16.3: Detection, Incident Response, and Forensic Evidence Drill.
- Added safe fictional telemetry/evidence lab for alert triage, evidence manifest review, incident timeline construction, declaration recommendation, containment/recovery recommendations, and situation-report support.
- Updated Week 16 overview, navigation, search, glossary, root redirect, README, and home-page status.
- Research basis: NIST SP 800-61 Rev. 3, NIST SP 800-86, NIST SP 800-92, NIST IR 8387, CISA incident/vulnerability response playbooks, MITRE ATT&CK, and NIST SP 800-84.
- Next planned item: Lesson 16.4 — Governance, Privacy, Legal, and Third-Party Executive Brief.


## Week 16 Lesson 16.4 update

- Added Lesson 16.4: Governance, Privacy, Legal, and Third-Party Executive Brief.
- Added a researched capstone lesson covering executive decision support, governance ownership, privacy/legal escalation, third-party risk, contractual-notice candidates, materiality caution, and fact/inference/unknown discipline.
- Added a safe fictional local Python lab that builds executive-brief, escalation, supplier-risk, and decision-log artifacts without network activity or real reporting.
- Updated Week 16 overview, Lesson 16.3 progression, navigation, search index, glossary, root redirect, README, and home-page status.
- Next planned item: Lesson 16.5 — Final Portfolio, Defense, and Career Roadmap.


## Week 16 Lesson 16.5 update

- Added Lesson 16.5: Final Portfolio, Defense, and Career Roadmap.
- Added a researched capstone completion lesson covering portfolio evidence, claim-evidence matrices, sanitization, final defense, reviewer questions, NICE-style role mapping, skills inventory, measurable career roadmaps, and ethical public-portfolio boundaries.
- Research basis includes NIST CSF 2.0, NIST SP 800-53A Rev. 5, NIST SP 800-55 Volumes 1 and 2, NIST SP 800-181 Rev. 1, current NICE Framework component guidance, CISA Cross-Sector Cybersecurity Performance Goals, and CISA NICCS NICE tooling.
- Added a safe fictional local Python lab that reviews a capstone portfolio manifest, verifies required sections, checks evidence references, flags unsupported claims, reviews defense readiness, and evaluates career-roadmap quality.
- Updated Week 16 overview, Lesson 16.4 progression, navigation, search index, glossary, root redirect, README, and home-page status.
- Week 16 is complete. The 16-week MS Cybersecurity course path is now complete.
