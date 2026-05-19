import Hero from '../components/sections/Hero';
import FeaturedDrops from '../components/sections/FeaturedDrops';
import BrandStrip from '../components/sections/BrandStrip';
import { Product } from '../types';

interface HomeProps {
  onQuickAdd: (product: Product) => void;
}

export default function Home({ onQuickAdd }: HomeProps) {
  return (
    <main>
      <Hero />
      <BrandStrip />
      <FeaturedDrops onQuickAdd={onQuickAdd} />

      {/* AI Feature Banner */}
      <section className="py-20 bg-sole-surface border-y border-sole-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                icon: '🔍',
                title: 'AI-Powered Search',
                desc: 'Describe what you want in plain language. "Lightweight running shoes under ₹15K for men" — done.',
              },
              {
                icon: '👟',
                title: 'Virtual Try-On',
                desc: 'Upload a photo and let Gemini AI tell you how the shoe fits your style. Real feedback, instant.',
              },
              {
                icon: '⏱',
                title: '48-Hour Reserve',
                desc: 'Love a pair? Reserve it for 48 hours while you decide. No pressure, no rush.',
              },
            ].map((feature, i) => (
              <div
                key={i}
                className="p-6 rounded-2xl border border-sole-border hover:border-sole-amber/30 transition-all duration-300 hover:bg-sole-hover group"
              >
                <div className="text-3xl mb-4">{feature.icon}</div>
                <h3 className="font-display text-xl text-sole-white tracking-wide mb-2">{feature.title}</h3>
                <p className="font-body text-sm text-sole-muted leading-relaxed">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Banner */}
      <section className="py-24 relative overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1600185365483-26d7a4cc7519?w=1400&q=80"
            alt="Sneaker background"
            className="w-full h-full object-cover opacity-15"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-sole-black to-sole-black/80" />
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="font-body text-xs text-sole-amber uppercase tracking-widest mb-4">Limited Drops</p>
          <h2 className="font-display text-5xl sm:text-7xl text-sole-white tracking-tight mb-6">
            HEAT DROPS<br />
            <span className="text-sole-amber">WEEKLY.</span>
          </h2>
          <p className="font-body text-base text-sole-muted max-w-md mx-auto mb-10">
            New arrivals every week. AI search to find your fit instantly. Reserve before they're gone.
          </p>
          <a
            href="/shop"
            className="inline-flex items-center gap-2 px-10 py-4 bg-sole-amber text-sole-black font-body font-bold text-sm uppercase tracking-wider rounded-xl hover:bg-sole-amber/90 transition-all duration-200 hover:shadow-[0_4px_24px_rgba(245,166,35,0.5)]"
          >
            Shop the Drop
          </a>
        </div>
      </section>
    </main>
  );
}
