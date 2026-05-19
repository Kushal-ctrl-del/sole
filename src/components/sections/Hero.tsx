import { Link } from 'react-router-dom';
import { ArrowRight, Zap } from 'lucide-react';

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-sole-black">
      {/* Background Image */}
      <div className="absolute inset-0">
        <img
          src="https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=1600&q=80"
          alt="Hero sneaker"
          className="w-full h-full object-cover opacity-20"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-sole-black via-sole-black/80 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-sole-black via-transparent to-transparent" />
      </div>

      {/* Amber accent line */}
      <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-48 bg-sole-amber rounded-r" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="max-w-2xl">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-3 py-1.5 border border-sole-amber/30 rounded-full bg-sole-amber/10 mb-6 animate-fade-in opacity-0" style={{ animationDelay: '0.1s', animationFillMode: 'forwards' }}>
            <Zap size={12} className="text-sole-amber fill-sole-amber" />
            <span className="font-body text-xs text-sole-amber uppercase tracking-widest">India's #1 Sneaker Drop</span>
          </div>

          {/* Headline */}
          <h1 className="font-display text-[72px] sm:text-[96px] lg:text-[120px] leading-none text-sole-white tracking-tight animate-fade-up opacity-0" style={{ animationDelay: '0.2s', animationFillMode: 'forwards' }}>
            STEP
            <br />
            <span className="text-sole-amber">DIFFERENT.</span>
          </h1>

          <p className="font-body text-base sm:text-lg text-sole-muted leading-relaxed mt-6 max-w-md animate-fade-up opacity-0" style={{ animationDelay: '0.35s', animationFillMode: 'forwards' }}>
            Premium sneakers curated for the Indian streetwear scene. AI-powered discovery. 48-hour reservations. Authentic kicks.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 mt-10 animate-fade-up opacity-0" style={{ animationDelay: '0.5s', animationFillMode: 'forwards' }}>
            <Link
              to="/shop"
              className="group inline-flex items-center justify-center gap-2 px-8 py-4 bg-sole-amber text-sole-black font-body font-bold text-sm uppercase tracking-wider rounded-xl hover:bg-sole-amber/90 transition-all duration-200 hover:shadow-[0_4px_24px_rgba(245,166,35,0.5)]"
            >
              Shop Now
              <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform duration-200" />
            </Link>
            <Link
              to="/shop?new=true"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 border border-sole-border text-sole-white font-body font-medium text-sm uppercase tracking-wider rounded-xl hover:border-sole-amber/40 hover:text-sole-amber transition-all duration-200"
            >
              New Arrivals
            </Link>
          </div>

          {/* Stats */}
          <div className="flex items-center gap-8 mt-16 animate-fade-up opacity-0" style={{ animationDelay: '0.65s', animationFillMode: 'forwards' }}>
            {[
              { value: '10+', label: 'Premium Brands' },
              { value: '100%', label: 'Authentic' },
              { value: '48hr', label: 'Reservation Hold' },
            ].map(stat => (
              <div key={stat.label}>
                <p className="font-display text-2xl text-sole-amber tracking-wider">{stat.value}</p>
                <p className="font-body text-xs text-sole-muted mt-0.5">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 animate-fade-in opacity-0" style={{ animationDelay: '1s', animationFillMode: 'forwards' }}>
        <span className="font-body text-xs text-sole-muted uppercase tracking-widest">Scroll</span>
        <div className="w-px h-8 bg-gradient-to-b from-sole-muted to-transparent" />
      </div>
    </section>
  );
}
