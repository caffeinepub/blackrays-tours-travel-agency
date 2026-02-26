import { useGetPublicPackages } from '../hooks/useQueries';
import PackageCard from '../components/packages/PackageCard';
import { Package, Loader2 } from 'lucide-react';

export default function PackagesPage() {
  const { data: packages, isLoading, isError } = useGetPublicPackages();

  return (
    <div className="min-h-screen" style={{ backgroundColor: 'var(--light-beige)' }}>
      {/* Hero */}
      <section
        className="relative py-20 px-4 sm:px-6 lg:px-8 overflow-hidden"
        style={{ backgroundColor: 'var(--deep-charcoal)' }}
      >
        <div className="absolute inset-0 opacity-10"
          style={{ backgroundImage: 'radial-gradient(circle at 70% 50%, var(--gold-accent) 0%, transparent 60%)' }}
        />
        <div className="relative max-w-4xl mx-auto text-center">
          <p className="text-sm font-semibold tracking-widest uppercase mb-4" style={{ color: 'var(--gold-accent)' }}>
            Explore India
          </p>
          <h1 className="font-display text-4xl sm:text-5xl font-bold text-white mb-4">
            Tour Packages
          </h1>
          <p className="text-lg" style={{ color: 'rgba(250,247,242,0.75)' }}>
            Handcrafted travel experiences for every kind of explorer.
          </p>
        </div>
      </section>

      {/* Packages Grid */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          {isLoading && (
            <div className="flex flex-col items-center justify-center py-24 gap-4">
              <Loader2 className="w-8 h-8 animate-spin" style={{ color: 'var(--warm-grey)' }} />
              <p className="text-sm" style={{ color: 'var(--warm-grey)' }}>Loading packages...</p>
            </div>
          )}

          {isError && (
            <div
              className="rounded-2xl p-8 text-center"
              style={{ backgroundColor: 'var(--warm-sand)', border: '1px solid var(--border)' }}
            >
              <p className="font-semibold mb-2" style={{ color: 'var(--charcoal)' }}>Unable to load packages</p>
              <p className="text-sm" style={{ color: 'var(--warm-grey)' }}>Please try again later or contact us directly.</p>
            </div>
          )}

          {!isLoading && !isError && packages && packages.length === 0 && (
            <div className="flex flex-col items-center justify-center py-24 gap-4 text-center">
              <div
                className="w-16 h-16 rounded-2xl flex items-center justify-center"
                style={{ backgroundColor: 'var(--warm-sand)' }}
              >
                <Package className="w-8 h-8" style={{ color: 'var(--warm-grey)' }} />
              </div>
              <h3 className="font-display text-xl font-bold" style={{ color: 'var(--charcoal)' }}>
                No Packages Yet
              </h3>
              <p className="text-sm max-w-sm" style={{ color: 'var(--warm-grey)' }}>
                We're curating amazing travel packages. Check back soon or contact us for custom packages.
              </p>
            </div>
          )}

          {!isLoading && !isError && packages && packages.length > 0 && (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {packages.map((pkg) => (
                <PackageCard key={pkg.id} package={pkg} />
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
