import React, { useState, useRef, useCallback, Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, PerspectiveCamera, useGLTF } from '@react-three/drei';
import * as THREE from 'three';
import LazyImage from './LazyImage';

// Import actual food images
import carbonaraPhoto from '../assets/img/carbonara.jpg';
import ciuperciPhoto from '../assets/img/ciuperci.jpg';
import crevetePhoto from '../assets/img/crevete.jpg';
import sofranPhoto from '../assets/img/sofran.jpg';

// Import 3D models as URLs
import carbonaraModel from '../assets/3d/carbonara.glb?url';
import ciuperciModel from '../assets/3d/ciuperci.glb?url';
import creveteModel from '../assets/3d/crevete.glb?url';
import sofranModel from '../assets/3d/sofran.glb?url';

// 3D food models loaded from GLB files
const CarbonaraModel = () => {
  const { scene } = useGLTF(carbonaraModel);
  console.log('Carbonara scene loaded:', scene);
  
  const clonedScene = scene.clone();
  
  // Ensure materials are visible
  clonedScene.traverse((child: any) => {
    if (child.isMesh) {
      child.castShadow = true;
      child.receiveShadow = true;
      if (child.material) {
        child.material.needsUpdate = true;
      }
    }
  });
  
  return <primitive object={clonedScene} scale={8} position={[0, -1.5, 0]} />;
};

const CiuperciModel = () => {
  const { scene } = useGLTF(ciuperciModel);
  console.log('Ciuperci scene loaded:', scene);
  
  const clonedScene = scene.clone();
  
  clonedScene.traverse((child: any) => {
    if (child.isMesh) {
      child.castShadow = true;
      child.receiveShadow = true;
      if (child.material) {
        child.material.needsUpdate = true;
      }
    }
  });
  
  return <primitive object={clonedScene} scale={15} position={[0, -1.5, 0]} />;
};

const CreveteModel = () => {
  const { scene } = useGLTF(creveteModel);
  console.log('Crevete scene loaded:', scene);
  
  const clonedScene = scene.clone();
  
  clonedScene.traverse((child: any) => {
    if (child.isMesh) {
      child.castShadow = true;
      child.receiveShadow = true;
      if (child.material) {
        child.material.needsUpdate = true;
      }
    }
  });
  
  return <primitive object={clonedScene} scale={18} position={[0, -1.5, 0]} />;
};

const SofranModel = () => {
  const { scene } = useGLTF(sofranModel);
  console.log('Sofran scene loaded:', scene);
  
  const clonedScene = scene.clone();
  
  clonedScene.traverse((child: any) => {
    if (child.isMesh) {
      child.castShadow = true;
      child.receiveShadow = true;
      if (child.material) {
        child.material.needsUpdate = true;
      }
    }
  });
  
  return <primitive object={clonedScene} scale={16} position={[0, -1.5, 2]} />;
};

// Lazy preload models after initial render
setTimeout(() => {
  useGLTF.preload(carbonaraModel);
  useGLTF.preload(ciuperciModel);
  useGLTF.preload(creveteModel);
  useGLTF.preload(sofranModel);
}, 2000);

interface ShowcaseItemProps {
  image: string;
  title: string;
  model: React.ComponentType;
  index: number;
}

const ShowcaseItem: React.FC<ShowcaseItemProps> = ({ image, title, model: Model, index }) => {
  const [isRevealed, setIsRevealed] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  
  // Get orbit target based on model index - 4th model (Sofran) has different target
  const getOrbitTarget = (): [number, number, number] => {
    return index === 3 ? [0, -1.5, 2] : [0, 0, 0];
  };
  
  // Images maintain their natural aspect ratio
  const getImageClasses = () => {
    return "w-full h-auto";
  };

  const handleToggle3D = useCallback(() => {
    console.log('Toggle 3D clicked, current state:', isRevealed);
    setIsRevealed(prev => !prev);
  }, [isRevealed]);

  return (
    <div className="showcase-card w-full max-w-sm mx-auto">
      <div 
        className="relative overflow-hidden rounded-xl"
      >
        {/* Food Photo */}
        <div 
          className={`relative transition-opacity duration-200 ${isRevealed ? 'opacity-0' : 'opacity-100'}`}
        >
          <LazyImage 
            src={image} 
            alt={title}
            className={getImageClasses()}
          />
          <div className="absolute bottom-3 right-3 z-20">
            <button 
              onClick={handleToggle3D}
              className="bg-black/80 hover:bg-black/95 text-white px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 shadow-lg hover:shadow-xl pointer-events-auto"
              type="button"
            >
              Vezi 3D
            </button>
          </div>
        </div>

        {/* 3D Model */}
        <div 
          className={`absolute inset-0 flex items-center justify-center transition-opacity duration-200 ${isRevealed ? 'opacity-100' : 'opacity-0'}`}
        >
          <div className="w-full h-full">
            {isRevealed && (
            <Suspense fallback={<div className="w-full h-full bg-muted flex items-center justify-center">Se încarcă...</div>}>
              <Canvas
                ref={canvasRef}
                className="three-canvas"
                camera={{ position: [0, 0, 8], fov: 50 }}
                gl={{ 
                  antialias: true, 
                  alpha: true,
                  powerPreference: "high-performance"
                }}
                performance={{ min: 0.5 }}
                dpr={[1, 2]}
                shadows
              >
                <PerspectiveCamera makeDefault position={[0, 0, 8]} />
                
                {/* Enhanced lighting for better model visibility */}
                <ambientLight intensity={1.5} />
                <directionalLight 
                  position={[10, 10, 5]} 
                  intensity={2.0}
                  castShadow
                  shadow-mapSize={[1024, 1024]}
                />
                <directionalLight position={[-10, -10, -5]} intensity={1.0} />
                <pointLight position={[0, 5, 5]} intensity={1.2} />
                <pointLight position={[5, 0, 5]} intensity={0.8} />
                <pointLight position={[-5, 0, 5]} intensity={0.8} />
                
                {/* 3D Model */}
                <group rotation={[0, 0, 0]}>
                  <Model />
                </group>
                
                <OrbitControls 
                  enablePan={false}
                  enableZoom={true}
                  minDistance={6}
                  maxDistance={12}
                  autoRotate
                  autoRotateSpeed={0.5}
                  maxPolarAngle={Math.PI * 55 / 180}
                  minPolarAngle={0}
                  target={getOrbitTarget()}
                />
              </Canvas>
            </Suspense>
          )}
          {isRevealed && (
            <div className="absolute bottom-3 left-3 z-20">
              <button 
                onClick={handleToggle3D}
                className="bg-black/80 hover:bg-black/95 text-white px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 shadow-lg hover:shadow-xl pointer-events-auto"
                type="button"
              >
                ← Înapoi la Poză
              </button>
            </div>
          )}
          </div>
        </div>
      </div>
      
    </div>
  );
};

const Performance3DShowcase: React.FC = () => {
  const showcaseItems = [
    {
      image: carbonaraPhoto,
      title: "Carbonara Delicioasă",
      model: CarbonaraModel
    },
    {
      image: ciuperciPhoto,
      title: "Ciuperci Premium",
      model: CiuperciModel
    },
    {
      image: crevetePhoto,
      title: "Creveți Proaspeți", 
      model: CreveteModel
    },
    {
      image: sofranPhoto,
      title: "Sofran Aromat",
      model: SofranModel
    }
  ];

  return (
    <section className="py-20 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Meniul Nostru Interactiv 3D
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Descoperă viitorul prezentării alimentelor! Apasă pe orice imagine pentru a dezvălui modelul 3D interactiv.
            Tehnologia noastră avansată asigură tranziții fluide și o experiență vizuală de excepție.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {showcaseItems.map((item, index) => (
            <ShowcaseItem
              key={index}
              image={item.image}
              title={item.title}
              model={item.model}
              index={index}
            />
          ))}
        </div>

      </div>
    </section>
  );
};

export default Performance3DShowcase;