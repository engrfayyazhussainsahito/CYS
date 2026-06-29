# Lesson 4.3: Input Validation, Output Encoding, and Error Handling

## Purpose
Teach defensive input validation, output encoding, and error handling from first principles.

## Core ideas
- Input is any data entering a program.
- Validate at trust boundaries.
- Prefer allowlists and schemas for strict fields.
- Normalize and canonicalize before security decisions.
- Encode output for the exact destination context.
- Use parameterized APIs for structured destinations such as SQL.
- Separate safe public errors from protected private diagnostics.
- Do not log secrets.

## Lab
Build a local validation, output encoding, and controlled error-handling harness for a fictional student portal.
