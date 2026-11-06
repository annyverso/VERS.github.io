Use `Button` for any VERS call to action, never a bare styled `<a>`.

```jsx
<Button variant="accent" size="lg" href="/vers-apresenta">Conhecer o catálogo</Button>
```

- `variant`: `primary` (black, indigo on hover, the default), `accent` (lime, for the single most important action on a surface), `outline` (2px rule, inverts on hover), `ghost` (tertiary).
- Inside an element with `data-theme="vers-dark"` or `data-theme="vers-indigo"`, `primary` becomes lime.
- Labels are short, uppercase Nebulica Medium, verb-first: *Conhecer o catálogo*, *Falar com a VERS*, *Baixar o portfólio*. Never sentence case, never a full stop.
- Calls never use vision verbs as a metaphor for access (*ver*, *olhar*, *enxergar*): prefer *entrar*, *atravessar*, *descobrir*, *conhecer* (brandbook p. 76).
- Buttons do not scale, bounce or cast shadows.
