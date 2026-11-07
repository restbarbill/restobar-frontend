import React from 'react';
import { Package } from 'lucide-react';
import { EmptyState, ErrorState, LoadingState } from '@/components/ui/data-states';
import { formatCurrency } from '@/lib/utils';
import { useProducts } from '../hooks/use-inventory';

export const InventoryPage: React.FC = () => {
  const { data: products, isLoading, isError, error, refetch } = useProducts();

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-white flex items-center gap-2.5">
          <Package className="h-6 w-6 text-emerald-400" />
          Catálogo de Productos, Recetas e Inventario
        </h1>
        <p className="text-sm text-slate-400">
          Control de cervezas, botellas, copeo, botanas y paquetes híbridos con imágenes en Cloudinary.
        </p>
      </div>

      {isLoading && <LoadingState label="Consultando inventario desde PostgreSQL..." />}

      {isError && <ErrorState error={error} onRetry={() => void refetch()} />}

      {!isLoading && !isError && products?.length === 0 && (
        <EmptyState
          title="El catálogo de productos está vacío"
          description="Registra tus cervezas, destilados, platillos y paquetes desde el endpoint real /api/v1/inventory/products."
        />
      )}

      {!isLoading && !isError && products && products.length > 0 && (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {products.map((product) => (
            <div
              key={product.id}
              className="rounded-2xl border border-slate-800 bg-slate-900 p-4"
            >
              <span className="text-[11px] font-semibold uppercase text-emerald-400">
                {product.category} • {product.sku}
              </span>
              <h3 className="mt-1 text-base font-bold text-white">{product.name}</h3>
              <div className="mt-3 flex items-center justify-between text-sm">
                <span className="font-bold text-white">
                  {formatCurrency(product.salePrice)}
                </span>
                <span className="text-xs text-slate-400">
                  Stock: {product.stockQuantity} {product.unitOfMeasure}
                </span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
