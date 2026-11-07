# Reglas de Arquitectura y Desarrollo — `restobar-frontend` (React 19 + Vite + TypeScript)

Este repositorio contiene el Frontend (POS, Control de Billar, KDS y Panel Administrativo) del sistema **RestoBar & Billar**.

---

## 🚨 REGLA DE ORO #1: PROHIBICIÓN ABSOLUTA DE DATOS MOCKEADOS (ZERO MOCK POLICY)

En proyectos anteriores se dejaron datos mockeados en el frontend que llegaron a producción. En este repositorio queda **ESTRICTAMENTE PROHIBIDO**:
1. Crear arreglos hardcodeados de datos de negocio (`const mockTables = [...]`, `const fakeTournaments = [...]`, `const initialProducts = [...]`) en páginas, componentes, hooks o servicios.
2. Usar `setTimeout` o `Promise.resolve` para simular respuestas del servidor.
3. Hacer fallback a datos falsos cuando una petición HTTP falla.

**Comportamiento Obligatorio:**
- Toda lectura y escritura debe usar `apiClient` (`@/lib/api-client`) dentro de `src/modules/<module-name>/services/<module-name>.service.ts` y consumirse mediante `@tanstack/react-query` (`useQuery`, `useMutation`) dentro de `src/modules/<module-name>/hooks/`.
- Toda vista debe manejar explícitamente los 4 estados reales de la API:
  1. `isLoading` -> Mostrar `<LoadingState />` o Skeletons.
  2. `isError` -> Mostrar `<ErrorState onRetry={refetch} />`.
  3. `data?.length === 0` -> Mostrar `<EmptyState />` indicando que aún no hay registros en la base de datos con un botón para crear el primero.
  4. `data && data.length > 0` -> Renderizar los registros reales provenientes del backend.

---

## 🏛️ REGLA DE ORO #2: ESTRUCTURA OBLIGATORIA DE CADA MÓDULO
Cada módulo (`auth`, `users`, `floor-plan`, `billiards`, `pos`, `kds`, `inventory`, `cash-register`, `tournament`, `reports`) debe vivir en `src/modules/<module-name>/` espejando el nombre del módulo en el backend:

```text
src/modules/<module-name>/
├── pages/                     # Vistas principales conectadas al router
├── components/                # Componentes exclusivos del módulo (tablas, tarjetas, modales)
├── hooks/                     # Custom hooks con TanStack Query (useQuery, useMutation)
├── services/                  # Llamadas Axios reales usando apiClient
├── types/                     # Interfaces TypeScript alineadas con las entidades/DTOs del backend
├── schemas/                   # Esquemas Zod para validación de formularios con React Hook Form
└── store/                     # (Opcional) Estado efímero de UI con Zustand
```

---

## 🛠️ USO OBLIGATORIO DE SKILLS
Antes de crear o modificar un módulo en este repositorio, lee y sigue paso a paso `.agents/skills/create-frontend-module/SKILL.md`.
