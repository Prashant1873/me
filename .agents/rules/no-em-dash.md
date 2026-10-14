# Rule: Zero Em Dashes Policy

## Absolute Prohibition
Never use em dashes in this project under any circumstances:
- Prohibited character: em dash (Unicode code point U+2014)
- Prohibited HTML entities: mdash entity and decimal 8212 entity

## Applies To
- User-facing text, page titles, headlines, metadata, labels, and copy
- Code comments, docstrings, variable names, and string literals
- Markdown files, documentation, planning documents, tasks, and notes
- Test suites, test descriptions, and test assertions

## Permitted Replacements
When separating thoughts, ranges, attributes, or titles, use:
1. Standard hyphen-minus: `-` (or with spaces ` - `)
2. Colon: `:`
3. Comma: `,`
4. Standard hyphen for numeric ranges: `2022-2026` or `2022 - 2026`
5. Restructure the sentence without dashes

## Automated Enforcement
This policy is strictly enforced by:
- `scripts/check-no-em-dash.js`
- `tests/no-em-dash.spec.js`
- `npm run check:em-dash`
- Git pre-commit hook `.git/hooks/pre-commit`
