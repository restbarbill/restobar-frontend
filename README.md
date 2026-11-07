# RestoBar & Billar — Frontend (`restobar-frontend`)

Interfaz POS Touch-First, Control de Relojes de Billar, KDS y Panel Administrativo construido con **React 19**, **Vite 6**, **TypeScript**, **Tailwind CSS v4**, **TanStack Query**, **Zustand**, **React Hook Form + Zod** y **Socket.io-client**.

## 🚨 Política Estricta: Cero Datos Mockeados (Zero Mock Policy)
Todo módulo dentro de `src/modules/<module-name>/` se conecta exclusivamente a los endpoints reales del backend (`restobar-backend`) mediante `apiClient` (`src/lib/api-client.ts`).

## Estructura Obligatoria por Módulo (`src/modules/<module-name>/`)
- `pages/` — Vistas principales conectadas al router.
- `components/` — Modales, tablas y tarjetas del módulo.
- `hooks/` — Hooks de TanStack Query (`useQuery`, `useMutation`).
- `services/` — Peticiones HTTP reales con Axios (`apiClient`).
- `types/` — Interfaces TypeScript alineadas con las entidades del backend.
- `schemas/` — Validación de formularios con `zod`.
