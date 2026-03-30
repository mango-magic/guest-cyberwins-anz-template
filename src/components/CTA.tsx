const CTA = () => {
  return (
    <section id="cta" className="relative overflow-hidden bg-[hsl(var(--background1))] py-24">
      {/* Top border */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-exclusive-purple/30 to-transparent" />
      
      {/* Subtle glow */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 h-[400px] w-[600px] rounded-full bg-exclusive-purple/5 blur-[100px]" />
      
      <div className="container relative z-10 mx-auto px-6">
        <div className="mx-auto max-w-2xl text-center space-y-10">
          <h2 className="font-sans text-3xl font-semibold text-[hsl(var(--foreground1))] md:text-4xl">
            What You <span className="text-exclusive-orange">Receive</span>
          </h2>
          
          <div className="space-y-4 text-left">
            {[
              { label: "Full interview video", desc: "professionally edited while keeping your natural tone" },
              { label: "Custom intro video", desc: "a short, polished introduction for your content" },
              { label: "Your own song", desc: "a custom audio bumper created specifically for you" },
              { label: "Multiple highlight clips", desc: "short, shareable moments from your conversation" },
              { label: "Quote clips", desc: "your best insights, formatted for social sharing" },
              { label: "Private dedicated website", desc: "all your content in one shareable place" },
            ].map((item, index) => (
              <div key={index} className="flex items-start space-x-3 py-2">
                <div className="flex-shrink-0 mt-2 h-1.5 w-1.5 rounded-full bg-exclusive-orange" />
                <p className="font-sans text-base text-[hsl(var(--foreground1)/0.9)] font-light">
                  <span className="font-medium text-foreground1">{item.label}</span> — {item.desc}
                </p>
              </div>
            ))}
          </div>
          
          <div className="pt-6 space-y-4">
            <div className="h-px w-full bg-gradient-to-r from-transparent via-[hsl(var(--border)/0.2)] to-transparent" />
            <p className="font-sans text-lg text-[hsl(var(--foreground1))] font-medium">
              All content formatted. Ready to share. Yours to use however you choose.
            </p>
            <p className="font-sans text-sm text-[hsl(var(--muted-foreground1))] font-light">
              LinkedIn Live broadcast • Global cybersecurity audience • Professional content amplification
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTA;
