# vocal-harmonys

The "Vocal Harmony's" choir site — React + TypeScript + Vite. This is the frontend only;
all data and business logic (member accounts, the répertoire, donations, reservations, the
CD boutique...) live in the [vocal-harmonys-backend](../vocal-harmonys-backend) API. This
app never talks to a database directly, only to that API.

## Running it

```bash
npm install
cp .env.example .env.local   # only if the backend isn't on the default http://localhost:8080
npm run dev
```

The backend needs to be running (`vocal-harmonys-backend`, see its own README) for anything
beyond the static layout to work — every page fetches its content on mount.

## How it's organized

```
src/
  api/            One module per backend domain (choristers.ts, songs.ts, cds.ts, ...).
                   Each exports the TypeScript types the API returns and a small
                   fetch/submit function — this is the ONLY place that knows the backend's
                   URL shape. Pages never call fetch() directly.
  api/client.ts    The shared fetch wrapper every api/*.ts module is built on: resolves
                   the base URL, attaches the JWT (if logged in) as an Authorization
                   header, and throws an ApiError with the backend's error message on a
                   non-2xx response.
  auth.tsx         React context for the logged-in member. login()/logout() call
                   api/auth.ts, the JWT is kept in localStorage (see api/client.ts's
                   getToken/setToken) so a refresh doesn't log you out, and the session is
                   re-validated against GET /api/auth/me on load.
  pages/           One file per route. Any page that shows real content (as opposed to
                   pure layout) fetches it in a useEffect on mount — there's no client-side
                   cache or global store, each page owns its own loading state.
  components/      Shared UI (Header, Footer, Sidebar, the photo Carousel, ImageSlot...).
                   Footer and Sidebar also fetch their own data (partners, actualités)
                   since they appear on every page.
  constants.ts     The handful of values that are pure UI styling, not API content (the
                   accent color pairing used on badges, the donation amount presets).
```

A typical page, e.g. `Choristes.tsx`:

```tsx
const [choristers, setChoristers] = useState<Chorister[]>([]);

useEffect(() => {
  fetchChoristers().then(setChoristers);
}, []);
```

`fetchChoristers` (from `api/choristers.ts`) calls `api.get('/choristers')`, which is
public on the backend — no token needed. A gated read, like the répertoire, or a write,
like submitting a CD order, goes through the same `api` object; `client.ts` attaches the
token automatically whenever one is stored, so individual pages never touch
`Authorization` headers themselves.

## Forms

`Shop.tsx` (CD orders), `Donations.tsx`, and `Contact.tsx` (reservation + join-the-choir)
all follow the same pattern: read the submitted `FormData`, `await` the matching
`api/*.ts` submit function inside a `try/catch`, and show either the existing "merci"
confirmation UI or an inline error message pulled from the caught `ApiError`. There's a
`submitting` boolean disabling the button mid-request, since these are now real network
calls that can fail or take a moment — the old version just flipped a boolean instantly.
