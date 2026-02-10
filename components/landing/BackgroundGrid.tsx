export function BackgroundGrid() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-black via-cyber-bg to-black" />
      <div
        className="absolute inset-0 opacity-[0.18] matrix-flicker"
        style={{
          backgroundImage:
            "linear-gradient(rgba(0,255,65,0.08) 1px, transparent 1px), linear-gradient(90deg, rgba(0,255,65,0.08) 1px, transparent 1px)",
          backgroundSize: "44px 44px",
          backgroundPosition: "center",
          maskImage: "radial-gradient(ellipse at center, black 35%, transparent 70%)",
          WebkitMaskImage: "radial-gradient(ellipse at center, black 35%, transparent 70%)",
        }}
      />
      <div className="absolute inset-0 opacity-[0.10] scanlines scanner" />
    </div>
  );
}
