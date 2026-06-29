# Lesson 13.4 — Vulnerability Validation, Exploit Safety, and Evidence

## Purpose
Teach vulnerability validation as authorized, least-invasive evidence work, not exploit performance.

## Research anchors
- NIST SP 800-115: planned technical testing, finding analysis, and mitigation strategy.
- FIRST CVSS v4.0: technical vulnerability characteristic and severity communication.
- FIRST EPSS: probability of exploitation activity in the wild over the next 30 days.
- CISA Known Exploited Vulnerabilities: prioritize remediation for vulnerabilities known to be exploited.
- SSVC: stakeholder-specific vulnerability response prioritization.
- NIST SP 800-40 Rev. 4: patch management as identify, prioritize, acquire, install, and verify.
- OWASP WSTG: structured web security testing references and identifiers.

## Safety boundary
No scanning, exploitation, credential testing, payloads, target commands, bypass walkthroughs, or real-system validation steps. The lab is local and fictional.

## Sections
1. Introduction
2. Learning outcomes
3. Research anchors
4. Safety and authorization boundary
5. Validation is not maximum exploitation
6. Validation ladder
7. Validation workflow
8. Scanner output is evidence, not truth
9. CVSS, EPSS, KEV, and SSVC
10. Exploit safety principles
11. Least-invasive proof patterns
12. Evidence package standard
13. Impact without overclaiming
14. False positives, false negatives, and uncertainty
15. Data handling during validation
16. Environment-specific validation limits
17. Remediation and retest criteria
18. Communication during validation
19. Case study: known exploited VPN vulnerability
20. Safe local lab: vulnerability validation decision aid
21. Self-assessment
22. Portfolio deliverables
23. Further reading

## Lab
Fictional JSON findings and a Python decision aid classify findings by authorization state, sensitivity, exploitation signals, and safe validation method. The lab performs no network activity.
