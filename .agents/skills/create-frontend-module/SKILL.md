---
name: create-frontend-module
description: >-
  Standardized procedure and strict ZERO-MOCK rules for creating or modifying any frontend module in restobar-frontend (React 19 + Vite + TypeScript + TanStack Query + Tailwind + shadcn/ui). Use this skill whenever creating a new feature module, page, component, API service, or hook in the frontend.
---

# Skill: Create Frontend Module (`restobar-frontend`) — ZERO MOCK POLICY

Use this skill whenever you create or modify a feature module in `restobar-frontend`. This skill enforces a **100% Real Data Architecture** so that mock or fake data NEVER leaks into production.

---

## 🚨 CRITICAL RULE: ZERO MOCK DATA ALLOWED

In previous projects, leaving mocked arrays or fake promises in frontend components caused fake data to appear in production. Therefore, you MUST follow these rules without exception:

1. **NEVER create hardcoded arrays of domain data** (e.g., `const mockTables = [...]`, `const initialTournaments = [...]`, `const dummyProducts = [...]`) in any page, component, hook, or service.
2. **NEVER use `setTimeout` or `Promise.resolve(...)` to fake an API call.**
3. **Every single data read (`GET`) and write (`POST`, `PATCH`, `DELETE`) MUST go through `apiClient` (`@/lib/api-client`) to the real NestJS backend.**
4. **If the backend database has 0 records**, the UI must render a clean **Empty State** component with a button to create the first record via the real `POST` endpoint.
5. **If the backend server is offline or returns an error**, the UI must render a real **Error State** with a "Reintentar" button that triggers `refetch()`, NEVER fallback to fake data!

---

## 1. Mandatory Directory Structure

Every feature module MUST live in `src/modules/<module-name>/` (matching the backend module name, e.g., `tournament`, `billiards`, `floor-plan`, `pos`, `inventory`, `cash-register`) with this exact structure:

```text
src/modules/<module-name>/
├── pages/
│   └── <ModuleName>Page.tsx           # Main route view for the module
├── components/
│   ├── <ModuleName>List.tsx           # Table or grid displaying real records
│   └── <ModuleName>FormModal.tsx      # Create/Edit dialog using React Hook Form + Zod
├── hooks/
│   └── use-<module-name>.ts           # TanStack Query hooks (useQuery, useMutation)
├── services/
│   └── <module-name>.service.ts       # Pure Axios calls using apiClient
├── types/
│   └── <module-name>.types.ts         # TypeScript interfaces matching backend Entities & DTOs
└── schemas/
    └── <module-name>.schema.ts        # Zod validation schemas for forms
```

---

## 2. Step-by-Step Implementation Rules

### Step 1: Define Types (`types/<module-name>.types.ts`)
Define the TypeScript interfaces that match the exact JSON returned by the NestJS backend entity, plus `Create<ModuleName>Payload` and `Update<ModuleName>Payload`.

### Step 2: Create the Zod Schema (`schemas/<module-name>.schema.ts`)
Define the validation rules using `zod` with clear Spanish error messages:
```typescript
import { z } from 'zod';

export const createTournamentSchema = z.object({
  name: z.string().min(3, 'El nombre debe tener al menos 3 caracteres'),
  gameType: z.enum(['POOL_8', 'POOL_9', 'CARAMBOLA']),
  maxPlayers: z.coerce.number().int().min(4, 'Mínimo 4 jugadores'),
  entryFee: z.coerce.number().min(0, 'La inscripción no puede ser negativa'),
});

export type CreateTournamentFormValues = z.infer<typeof createTournamentSchema>;
```

### Step 3: Create the Real API Service (`services/<module-name>.service.ts`)
Use `apiClient` from `@/lib/api-client`. Do NOT put any hardcoded fallback data here:
```typescript
import { apiClient } from '@/lib/api-client';
import type { Tournament, CreateTournamentPayload, UpdateTournamentPayload } from '../types/tournament.types';

export const tournamentService = {
  getAll: async (): Promise<Tournament[]> => {
    const { data } = await apiClient.get<Tournament[]>('/tournament');
    return data;
  },
  getById: async (id: string): Promise<Tournament> => {
    const { data } = await apiClient.get<Tournament>(`/tournament/${id}`);
    return data;
  },
  create: async (payload: CreateTournamentPayload): Promise<Tournament> => {
    const { data } = await apiClient.post<Tournament>('/tournament', payload);
    return data;
  },
  update: async (id: string, payload: UpdateTournamentPayload): Promise<Tournament> => {
    const { data } = await apiClient.patch<Tournament>(`/tournament/${id}`, payload);
    return data;
  },
  remove: async (id: string): Promise<void> => {
    await apiClient.delete(`/tournament/${id}`);
  },
};
```

### Step 4: Create TanStack Query Hooks (`hooks/use-<module-name>.ts`)
Wrap all service methods with `useQuery` and `useMutation`. On mutation success, always invalidate the query cache and trigger a `sonner` toast:
```typescript
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';
import { tournamentService } from '../services/tournament.service';

export const TOURNAMENT_QUERY_KEY = ['tournaments'] as const;

export function useTournaments() {
  return useQuery({
    queryKey: TOURNAMENT_QUERY_KEY,
    queryFn: tournamentService.getAll,
  });
}
```

### Step 5: Build Touch-First Dark-Mode Components & Page (`components/` & `pages/`)
Every page MUST explicitly handle the 4 states of `useQuery`:
1. **`isLoading`**: Render skeleton cards or `<LoadingState />`.
2. **`isError`**: Render `<ErrorState onRetry={() => refetch()} />`.
3. **`data?.length === 0`**: Render `<EmptyState />` with a CTA button to open the creation modal.
4. **`data && data.length > 0`**: Render the real data list/grid/table.

---

## 3. Verification Checklist Before Finishing

1. Search your new files in `src/modules/<module-name>/` for any occurrence of `mock`, `dummy`, `fake`, or `setTimeout`. There must be **zero** matches.
2. Run `npm run build` in `restobar-frontend` to verify there are 0 TypeScript or Vite bundling errors.
