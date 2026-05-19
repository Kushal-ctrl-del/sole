export default function BrandStrip() {
  const brands = ['Nike', 'Adidas', 'Jordan', 'ASICS', 'On Running', 'HOKA', 'New Balance', 'Puma'];

  return (
    <section className="py-10 border-y border-sole-border bg-sole-surface overflow-hidden">
      <div className="flex animate-[scroll_20s_linear_infinite] whitespace-nowrap">
        {[...brands, ...brands].map((brand, i) => (
          <span key={i} className="inline-flex items-center gap-6 mx-8">
            <span className="font-display text-2xl text-sole-muted/60 tracking-widest uppercase hover:text-sole-amber transition-colors cursor-default">
              {brand}
            </span>
            <span className="w-1 h-1 rounded-full bg-sole-amber/40" />
          </span>
        ))}
      </div>
      <style>{`
        @keyframes scroll {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
      `}</style>
    </section>
  );
}
