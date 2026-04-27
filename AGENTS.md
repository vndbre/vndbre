# AGENTS.md

This is a web application - redesigned version of the VNDB.org website.

## API docs

https://api.vndb.org/kana

## Task Completion Requirements

- All of `bun run format:check`, `bun run lint`, and `bun run typecheck:tsgo` must pass before considering tasks completed.

## Commit message style

You MUST use conventional commits specification for commit message and body - https://www.conventionalcommits.org/en/v1.0.0/#specification

## Maintainability

Long term maintainability is a core priority. If you add new functionality, first check if there is shared logic that can be extracted to a separate module. Duplicate logic across multiple files is a code smell and should be avoided. Don't be afraid to change existing code. Don't take shortcuts by just adding local logic to solve a problem.

## Core Priorities

1. Performance first.
2. Reliability first.
3. Type-safety is a MUST.
4. Code should be readable.

If a tradeoff is required, choose correctness and robustness over short-term convenience.
