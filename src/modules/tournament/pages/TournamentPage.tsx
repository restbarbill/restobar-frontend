import React, { useState } from 'react';
import { Trophy, Plus, Calendar, Users } from 'lucide-react';
import { EmptyState, ErrorState, LoadingState } from '@/components/ui/data-states';
import { formatCurrency } from '@/lib/utils';
import { useTournaments } from '../hooks/use-tournament';
import { CreateTournamentModal } from '../components/CreateTournamentModal';

export const TournamentPage: React.FC = () => {
  const { data: rawTournaments, isLoading, isError, error, refetch } = useTournaments();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const tournaments = Array.isArray(rawTournaments) ? rawTournaments : [];

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white flex items-center gap-2.5">
            <Trophy className="h-6 w-6 text-amber-400" />
            Torneos de Billar (Pool & Carambola)
          </h1>
          <p className="text-sm text-slate-400">
            Gestión de llaves, inscripciones y bolsas de premios conectada al endpoint real /api/v1/tournament.
          </p>
        </div>

        <button
          type="button"
          onClick={() => setIsModalOpen(true)}
          className="inline-flex items-center gap-2 rounded-xl bg-emerald-500 px-4 py-2.5 text-sm font-semibold text-slate-950 hover:bg-emerald-400 transition cursor-pointer"
        >
          <Plus className="h-4 w-4" />
          Nuevo Torneo
        </button>
      </div>

      {isLoading && <LoadingState label="Consultando torneos desde PostgreSQL..." />}

      {isError && <ErrorState error={error} onRetry={() => void refetch()} />}

      {!isLoading && !isError && tournaments.length === 0 && (
        <EmptyState
          title="No hay torneos registrados en la base de datos"
          description="Organiza tu primer torneo de Bola 8, Bola 9 o Carambola. Los premios se calculan con precisión decimal en el servidor."
          actionLabel="Crear Primer Torneo"
          onAction={() => setIsModalOpen(true)}
        />
      )}

      {!isLoading && !isError && tournaments.length > 0 && (
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
          {tournaments.map((t) => (
            <div
              key={t.id}
              className="rounded-2xl border border-slate-800 bg-slate-900/90 p-5 shadow-lg"
            >
              <div className="flex items-start justify-between">
                <span className="rounded-md bg-amber-500/15 px-2.5 py-1 text-xs font-semibold text-amber-300 border border-amber-500/30">
                  {t.gameType} • {t.format}
                </span>
                <span className="text-xs font-medium text-emerald-400">{t.status}</span>
              </div>

              <h3 className="mt-3 text-lg font-bold text-white">{t.name}</h3>

              <div className="mt-4 grid grid-cols-2 gap-3 rounded-xl bg-slate-950/80 p-3 text-xs">
                <div>
                  <span className="text-slate-400">Inscripción</span>
                  <p className="mt-0.5 text-sm font-bold text-white">
                    {formatCurrency(t.entryFee)}
                  </p>
                </div>
                <div>
                  <span className="text-slate-400">Bolsa de Premios</span>
                  <p className="mt-0.5 text-sm font-bold text-emerald-400">
                    {formatCurrency(t.prizePool)}
                  </p>
                </div>
              </div>

              <div className="mt-4 flex items-center justify-between text-xs text-slate-400">
                <span className="flex items-center gap-1.5">
                  <Users className="h-3.5 w-3.5" />
                  {t.registeredPlayers} / {t.maxPlayers} jugadores
                </span>
                <span className="flex items-center gap-1.5">
                  <Calendar className="h-3.5 w-3.5" />
                  {new Date(t.startDate).toLocaleDateString('es-MX')}
                </span>
              </div>
            </div>
          ))}
        </div>
      )}

      <CreateTournamentModal open={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </div>
  );
};
