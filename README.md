# Baniyas Store (Next.js)

Addis marketplace UI — meetup or vendor delivery. Built for the Moro web stack.

## Stack

- **Next.js 15** (App Router)
- **React 19**
- **Tailwind CSS v4**
- **lucide-react** / **motion**

## Develop

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Dev server on port 3000 |
| `npm run build` | Production build |
| `npm start` | Serve production build |
| `npm run typecheck` | TypeScript check |

## Structure

```
src/
  app/           # Next.js App Router (layout, page, globals)
  components/    # UI (home, shell, plp, pdp, me, …)
  context/       # AppProvider (cart, nav, listings)
  data/          # Mock listings & categories
  types.ts
```

Navigation is still client-driven via `AppContext` (SPA-style shell inside Next). Easy to split into real routes later for the Moro monorepo.
