# TypeScript Rules

- `strict: true` is on. Don't disable it.
- Always use explicit types for function parameters and exported function return values.
- Prefer `interface` for object shapes, `type` for unions and aliases.
- Use the `@/*` path alias mapped to the project root — never deep relative imports like `../../../lib/foo`.
- No `any` without a single-line comment justifying why.
- Prefer `unknown` over `any` at boundaries; narrow with type guards.
- Naming: `PascalCase` for types/interfaces/components, `camelCase` for functions/variables, `SCREAMING_SNAKE_CASE` for module-level constants only.
- Type names should describe the data, not the shape: `ProjectData`, `BlogMeta` — not `IProject`, `TBlog`.
- Run `npx tsc --noEmit` before marking work done.
