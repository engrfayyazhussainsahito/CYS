# Lesson 12.2 Outline — Evidence Preservation and Digital Forensics Fundamentals

## Purpose
Teach evidence-aware incident response before deeper host, memory, network, and cloud evidence collection.

## Research basis
- NIST IR 8387: digital evidence preservation considerations.
- NIST SP 800-86: collection, examination, analysis, and reporting model for incident response forensics.
- NIST CSRC Glossary: chain of custody definition.
- NIST Evidence Management: preventing compromise, contamination, degradation, and tracking custody.
- NIST IR 8354: scientific foundations and limitations of digital investigation techniques.
- NIST SP 800-61 Rev. 3 and CISA response playbooks for response context.

## Sections
1. Introduction
2. Learning outcomes
3. Research anchors
4. Safety and legal boundary
5. Evidence qualities: integrity, provenance, relevance, context, custody
6. Forensic process
7. Preservation versus acquisition, examination, analysis, reporting
8. Digital evidence types
9. Chain of custody
10. Hashing and integrity checks
11. Order of volatility
12. Evidence-aware response actions
13. Documentation discipline
14. Scope and minimum necessary collection
15. Common evidence sources
16. Forensic readiness
17. Scientific limits and uncertainty
18. What not to do
19. Preservation workflow
20. Common failure points
21. Safe local lab
22. Lab interpretation
23. Self-assessment
24. Deliverables
25. Further reading

## Lab
Fictional JSONL evidence manifest plus Python validator. The lab checks required metadata, UTC timestamp format, collection/event order, chain-of-custody depth, and SHA-256 hashes of fictional artifact text.
