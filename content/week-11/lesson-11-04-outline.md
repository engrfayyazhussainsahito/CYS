# Lesson 11.4 — Alert Triage, Investigation, and Threat Hunting

## Purpose
Teach students how to turn alerts into evidence-based decisions, write defensible case notes, escalate safely, and conduct hypothesis-driven threat hunts.

## Research anchors
- NIST SP 800-61 Rev. 3 — incident response recommendations aligned to CSF 2.0.
- CISA Cybersecurity Incident and Vulnerability Response Playbooks — standardized coordination, remediation, recovery, and tracking concepts.
- NIST SP 800-92 — log management infrastructure and operational process concepts.
- MITRE ATT&CK — shared vocabulary for adversary tactics, techniques, data components, detections, and analytics.
- Microsoft Sentinel and Splunk PEAK documentation — examples of structured hunting workflows.

## Major sections
1. Introduction
2. Learning outcomes
3. Research anchors
4. Authorization and privacy boundary
5. Triage-to-hunt workflow
6. Core definitions
7. Alert dispositions
8. First-pass triage questions
9. Severity/confidence/impact/urgency
10. Timeline building
11. Evidence quality checks
12. Investigation playbook
13. Analyst case notes
14. Escalation and containment boundaries
15. Threat hunting from first principles
16. Behavior-focused hunting
17. Common alert types
18. Safe local lab
19. Lab output interpretation
20. Feedback loop to detection engineering
21. Failure points
22. Triage checklist
23. Self-assessment
24. Practical deliverables
25. Further reading

## Lab
Fictional JSONL events plus Python triage script. The lab scores cases, emits analyst notes, and runs a hypothesis-driven hunt for MFA-fatigue followed by privileged directory changes.
