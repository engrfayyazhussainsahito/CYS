# Lesson 5.3: Buffer Overflows and Memory Corruption

## Purpose
Teach buffer overflows and memory corruption from a defensive, first-principles perspective without real-world exploitation instructions.

## Major concepts
- Buffers, boundaries, indexes, and null terminators
- Out-of-bounds reads and writes
- Stack-based and heap-based buffer overflows
- Off-by-one and integer-overflow length mistakes
- Crash vs exploitability
- AddressSanitizer, compiler warnings, fuzzing, and safe triage
- Secure remediation and professional reporting

## Safe lab
Students compile a local toy C program with AddressSanitizer, observe the sanitizer finding, patch the root cause with explicit length validation, and write a defensive report.
