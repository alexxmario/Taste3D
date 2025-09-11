import React, { useState, useEffect, useCallback } from 'react';
import { Button } from '@/components/ui/button';
import Header from '@/components/Header';
import { ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';
import LazyImage from '@/components/LazyImage';

// Import only a few images eagerly for initial load
const portfolioImageModules = import.meta.glob('../assets/portfolio/*.{png,jpg,jpeg,PNG,JPG,JPEG}', { 
  query: '?url',
  import: 'default'
}) as Record<string, () => Promise<string>>;

const Portfolio: React.FC = () => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [portfolioImages, setPortfolioImages] = useState<{ [key: string]: string }>({});
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadImages = async () => {
      const loadedImages: { [key: string]: string } = {};
      
      // Load only first 8 images initially
      const imageEntries = Object.entries(portfolioImageModules);
      const initialBatch = imageEntries.slice(0, 8);
      
      for (const [path, loader] of initialBatch) {
        try {
          loadedImages[path] = await loader();
        } catch (error) {
          console.warn(`Failed to load image: ${path}`, error);
        }
      }
      
      setPortfolioImages(loadedImages);
      setIsLoading(false);
      
      // Load remaining images in background
      const remainingBatch = imageEntries.slice(8);
      if (remainingBatch.length > 0) {
        setTimeout(async () => {
          for (const [path, loader] of remainingBatch) {
            try {
              const imageUrl = await loader();
              setPortfolioImages(prev => ({ ...prev, [path]: imageUrl }));
            } catch (error) {
              console.warn(`Failed to load image: ${path}`, error);
            }
          }
        }, 1000);
      }
    };

    loadImages();
  }, []);

  // Handle keyboard navigation for modal
  const handleKeyDown = useCallback((event: KeyboardEvent) => {
    if (event.key === 'Escape') {
      setSelectedImage(null);
    }
  }, []);

  useEffect(() => {
    if (selectedImage) {
      document.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden'; // Prevent background scrolling
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'unset';
    };
  }, [selectedImage, handleKeyDown]);

  // Convertim pozele importate în format pentru galerie
  const imageList = Object.entries(portfolioImages).map(([filepath, src], index) => {
    // Extragem numele fișierului din calea completă
    const filename = filepath.split('/').pop() || '';
    
    return {
      id: index + 1,
      src: src,
      filename: filename,
      title: "Fotografie Profesională"
    };
  });

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="flex items-center justify-center min-h-[60vh]">
          <div className="text-center">
            <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4" />
            <p className="text-muted-foreground">Se încarcă portofoliul...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      {/* Hero Section */}
      <section className="pt-24 pb-16 px-4">
        <div className="max-w-7xl mx-auto">
          {/* Back Button */}
          <div className="mb-8">
            <Link to="/">
              <Button variant="ghost" className="flex items-center gap-2 hover:gap-3 transition-all">
                <ArrowLeft size={20} />
                Înapoi la Acasă
              </Button>
            </Link>
          </div>

          {/* Page Title */}
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              <span className="block text-foreground">Portofoliul</span>
              <span className="block bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                Nostru Culinar
              </span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
              O colecție de fotografii culinare profesionale care captează esența și frumusețea 
              preparatelor. Fiecare imagine spune o poveste despre pasiunea pentru gastronomie.
            </p>
          </div>
        </div>
      </section>

      {/* Gallery */}
      <section className="pb-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="columns-1 md:columns-2 lg:columns-3 xl:columns-4 gap-6 space-y-6">
            {imageList.map((image) => (
              <div
                key={image.id}
                className="group relative overflow-hidden rounded-xl bg-card shadow-lg hover:shadow-2xl transition-all duration-300 cursor-pointer mb-6 break-inside-avoid"
                onClick={() => setSelectedImage(image.src)}
              >
                <div className="overflow-hidden">
                  <LazyImage
                    src={image.src}
                    alt={image.title}
                    className="w-full h-auto object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                
                {/* Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                </div>

                {/* Click indicator */}
                <div className="absolute top-3 right-3 bg-black/50 text-white px-2 py-1 rounded-full text-xs opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  ⚡
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Modal pentru imagine mare */}
      {selectedImage && (
        <div
          className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4"
          onClick={() => setSelectedImage(null)}
        >
          <div className="relative w-full h-full flex items-center justify-center">
            <img
              src={selectedImage}
              alt="Imagine portofoliu"
              className="max-w-[90vw] max-h-[90vh] w-auto h-auto object-contain rounded-lg shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            />
            <button
              onClick={() => setSelectedImage(null)}
              className="absolute top-4 right-4 bg-black/70 hover:bg-black/90 text-white w-10 h-10 rounded-full transition-colors flex items-center justify-center text-xl font-bold z-10"
            >
              ✕
            </button>
            {/* Navigation hint */}
            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-black/50 text-white px-4 py-2 rounded-full text-sm">
              Click oriunde sau apasă ESC pentru a închide
            </div>
          </div>
        </div>
      )}

      {/* Call to Action */}
      <section className="py-20 px-4 bg-card/20">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Gata să Îți Transformi Meniul?
          </h2>
          <Link to="/#contact">
            <Button size="lg" className="btn-hero">
              Solicită o Consultație Gratuită
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Portfolio;