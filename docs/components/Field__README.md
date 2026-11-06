Wraps every control so label, help and error stay consistent.

```jsx
<Field label="Instituição" htmlFor="org" required help="Nome como aparece em contrato">
  <Input id="org" placeholder="Sesc São Paulo" />
</Field>
```

An `error` replaces the help text in `text-primary` with an orange mark on its left: orange text fails on light grounds (3.29:1 on white, brandbook p. 51), and the message carries the meaning in words, never by colour alone.
