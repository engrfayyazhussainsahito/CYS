# Lesson 13.3 — Reconnaissance, Enumeration, and Attack Surface Mapping

## Purpose
Teach authorized reconnaissance as controlled asset and exposure mapping, not unrestricted probing. The lesson emphasizes scope, passive evidence, owner validation, inventory reconciliation, cloud/SaaS/identity boundaries, third-party restrictions, evidence quality, and defensive decision support.

## Research anchors
- NIST SP 800-115 — planned technical security testing, analysis of findings, and mitigation strategy development.
- OWASP WSTG Information Gathering — search-engine discovery, fingerprinting, metafile review, attack-surface identification, entry points, execution paths, and architecture mapping.
- MITRE ATT&CK Reconnaissance TA0043 — active/passive gathering of organization, network, host, identity, website, DNS, certificate, and technical-database information.
- NCSC External Attack Surface Management — continuous monitoring, automated asset discovery, exposed services, DNS misconfigurations, email-security weaknesses, legacy suppliers, and anomalous assets.
- CISA Cyber Hygiene Services — authorized monitoring and assessment of internet-accessible assets for weak configurations and known vulnerabilities.
- NIST SP 800-53 Rev. 5 — control context for inventory, vulnerability monitoring, configuration management, audit, access control, and continuous monitoring.

## Key sections
1. Introduction
2. Learning outcomes
3. Research anchors
4. Safety and authorization boundary
5. Terms that are often confused
6. Mental model: from names to risk decisions
7. Passive reconnaissance
8. Active enumeration
9. What belongs on an attack-surface map
10. Inventory reconciliation
11. Web application and API surface
12. Cloud and SaaS surface
13. Identity and human surface
14. Prioritizing observations
15. Evidence quality rules
16. Common failure modes
17. Fictional training-portal scenario
18. Attack-surface mapping workflow
19. Minimal mapping template
20. Safe local Python observation-mapper lab
21. Self-assessment
22. Portfolio deliverables
23. Further reading

## Lab safety
The lab performs no scanning, crawling, DNS lookups, web requests, authentication, exploitation, credential use, or network activity. It only evaluates fictional JSON records for authorization status, owner confidence, evidence quality, exposure, and next actions.
