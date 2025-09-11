import React, { useState, useRef, useCallback, Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, PerspectiveCamera, useGLTF } from '@react-three/drei';
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
  
  // Get zoom distances based on model index - zoom in more on all models
  const getZoomDistances = (): { min: number; max: number } => {
    if (index === 0) { // Carbonara - more zoom
      return { min: 3.5, max: 8 };
    } else if (index === 2) { // Crevete - just a bit closer 
      return { min: 3, max: 7 };
    } else { // Ciuperci and Sofran - zoom in more
      return { min: 2.5, max: 6 };
    }
  };

  // Get lighting intensity based on model index - brighten shadows for 3rd and 4th models
  const getLightingIntensity = () => {
    if (index === 2 || index === 3) { // Crevete and Sofran - brighter lighting
      return {
        ambient: 2.0,
        directional: 2.5,
        secondary: 1.5,
        point1: 1.5,
        point2: 1.2,
        point3: 1.2
      };
    }
    // Default lighting for other models
    return {
      ambient: 1.5,
      directional: 2.0,
      secondary: 1.0,
      point1: 1.2,
      point2: 0.8,
      point3: 0.8
    };
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
                <ambientLight intensity={getLightingIntensity().ambient} />
                <directionalLight 
                  position={[10, 10, 5]} 
                  intensity={getLightingIntensity().directional}
                  castShadow
                  shadow-mapSize={[2048, 2048]}
                  shadow-camera-far={50}
                  shadow-camera-left={-10}
                  shadow-camera-right={10}
                  shadow-camera-top={10}
                  shadow-camera-bottom={-10}
                />
                <directionalLight position={[-10, -10, -5]} intensity={getLightingIntensity().secondary} />
                <pointLight position={[0, 5, 5]} intensity={getLightingIntensity().point1} />
                <pointLight position={[5, 0, 5]} intensity={getLightingIntensity().point2} />
                <pointLight position={[-5, 0, 5]} intensity={getLightingIntensity().point3} />
                
                
                {/* 3D Model */}
                <group rotation={[0, 0, 0]}>
                  <Model />
                </group>
                
                <OrbitControls 
                  enablePan={false}
                  enableZoom={true}
                  minDistance={getZoomDistances().min}
                  maxDistance={getZoomDistances().max}
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