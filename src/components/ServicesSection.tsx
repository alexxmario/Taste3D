import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

const ServicesSection: React.FC = () => {
  const services = [
    {
      title: "Meniuri Interactive 3D & AR",
      description: "Clienții pot explora preparatele în detaliu și chiar le pot vizualiza direct pe masă prin realitate augmentată.",
      features: [
        "Modele 3D realiste, optimizate pentru web",
        "Animații și tranziții fluide la 60fps", 
        "Interacțiuni tactile responsive pe mobil",
        "Realitate augmentată integrată"
      ],
      icon: "🍽️"
    },
    {
      title: "Fotografie Culinară Profesională",
      description: "Fotografie culinară ce transmite gustul prin imagine.",
      features: [
        "Iluminare și compoziție de calitate studio",
        "Optimizate pentru afișaje de meniu digitale",
        "Imagini de înaltă rezoluție pentru toate platformele",
        "Timp rapid de livrare"
      ],
      icon: "📸"
    },
    {
      title: "Soluții Complete de Meniu",
      description: "Pachete complete care combină modelarea 3D și fotografia pentru impact maxim.",
      features: [
        "Stil vizual coordonat pe toate mediile",
        "Livrare optimizată pentru performanță",
        "Meniu creat pe stilul și identitatea brandului",
        "Suport și actualizări continue"
      ],
      icon: "🚀"
    }
  ];

  return (
    <section className="py-20 px-4 bg-card/20">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Serviciile Noastre
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Ne specializăm în experiențe de meniu digital ce combină tehnologia 3D și fotografia profesională pentru a pune în valoare fiecare preparat.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <Card 
              key={index}
              className="relative overflow-hidden bg-card border-border/50 hover:border-primary/30 transition-all duration-300 hover:shadow-xl hover:-translate-y-1"
            >
              <CardHeader className="text-center pb-4">
                <div className="text-6xl mb-4">{service.icon}</div>
                <CardTitle className="text-2xl font-bold">{service.title}</CardTitle>
                <CardDescription className="text-muted-foreground">
                  {service.description}
                </CardDescription>
              </CardHeader>
              
              <CardContent>
                <ul className="space-y-3">
                  {service.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-start gap-3">
                      <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0" />
                      <span className="text-sm text-muted-foreground leading-relaxed">
                        {feature}
                      </span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center mt-16">
          <h3 className="text-2xl font-bold mb-4">Gata să-ți Transformi Meniul?</h3>
          <p className="text-muted-foreground mb-8 max-w-2xl mx-auto text-lg font-semibold">
            Meniurile au trecut de la hârtie la digital, iar acum fac următorul pas: prezentări 3D și realitate augmentată.
          </p>
          <button 
            className="btn-hero"
            onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
          >
            Începe Proiectul Tău
          </button>
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;