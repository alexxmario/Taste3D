import React from 'react';
import { Button } from '@/components/ui/button';

const HeroSection: React.FC = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-16">
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl animate-float" />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-secondary/10 rounded-full blur-3xl animate-float" style={{ animationDelay: '-1s' }} />
      </div>

      <div className="relative z-10 text-center px-4 max-w-6xl mx-auto">
        {/* Main heading */}
        <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold mb-8 leading-tight">
          <span className="block text-foreground">Fă din meniul tău</span>
          <span className="block bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
            o adevărată experiență
          </span>
        </h1>

        {/* Subheading */}
        <p className="text-xl md:text-2xl text-muted-foreground mb-12 max-w-3xl mx-auto leading-relaxed">
          Transformă felurile de mâncare în experiențe vizuale unice cu modele 3D interactive și realitate augmentată. Oferă clienților posibilitatea să exploreze preparatele înainte să comande și crește-ți vânzările.
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
          <Button 
            size="lg"
            className="btn-hero text-lg px-8 py-4 min-w-[200px]"
            onClick={() => document.getElementById('showcase')?.scrollIntoView({ behavior: 'smooth' })}
          >
            Vezi Showcase 3D
          </Button>
          
          <Button 
            variant="outline"
            size="lg"
            className="text-lg px-8 py-4 min-w-[200px] border-2 border-primary/30 hover:border-primary/60 hover:bg-primary/10"
            onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
          >
            Începe Acum
          </Button>
        </div>

        {/* Key benefits */}
        <div className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
          <div className="p-6 rounded-xl bg-card/50 backdrop-blur-sm">
            <div className="text-3xl font-bold text-primary mb-2">AR</div>
            <div className="text-muted-foreground">Preparate care prind viață</div>
          </div>
          <div className="p-6 rounded-xl bg-card/50 backdrop-blur-sm">
            <div className="text-3xl font-bold text-secondary mb-2">3D</div>
            <div className="text-muted-foreground">Modele Interactive</div>
          </div>
          <div className="p-6 rounded-xl bg-card/50 backdrop-blur-sm">
            <div className="text-3xl font-bold text-accent mb-2">100%</div>
            <div className="text-muted-foreground">Optimizat Mobil</div>
          </div>
        </div>
      </div>

    </section>
  );
};

export default HeroSection;