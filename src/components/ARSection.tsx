import React, { useEffect, useRef, useState } from 'react';
import { Button } from '@/components/ui/button';

// Declare model-viewer as a custom element
declare global {
  namespace JSX {
    interface IntrinsicElements {
      'model-viewer': any;
    }
  }
}

const ARSection: React.FC = () => {
  const modelContainerRef = useRef<HTMLDivElement>(null);
  const [deviceInfo, setDeviceInfo] = useState({ isIOS: false, isAndroid: false, supportsAR: false });

  // Device detection function
  const detectDevice = () => {
    const userAgent = navigator.userAgent;
    const isIOS = /iPhone|iPad|iPod/.test(userAgent);
    const isAndroid = /Android/.test(userAgent);
    const isSafari = /Safari/.test(userAgent) && !/Chrome/.test(userAgent);
    
    return {
      isIOS,
      isAndroid,
      isSafari,
      isMobile: isIOS || isAndroid,
      supportsAR: (isIOS && isSafari) || isAndroid
    };
  };

  // Handle AR button click
  const handleARClick = () => {
    const modelViewer = document.querySelector('model-viewer');
    if (modelViewer && (modelViewer as any).canActivateAR) {
      (modelViewer as any).activateAR();
    } else {
      // Fallback for direct AR activation
      const device = detectDevice();
      
      if (device.isIOS && device.isSafari) {
        // iOS AR using USDZ
        const link = document.createElement('a');
        link.href = '/ar/Iphone mozzarela pe cola auto fara io.usdz';
        link.rel = 'ar';
        link.style.display = 'none';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      } else if (device.isAndroid) {
        // Android AR using Scene Viewer
        const link = document.createElement('a');
        link.href = 'intent://arvr.google.com/scene-viewer/1.0?file=' + window.location.origin + '/ar/Iphone mozzarela pe cola auto fara io.glb#Intent;scheme=https;package=com.google.android.googlequicksearchbox;action=android.intent.action.VIEW;S.browser_fallback_url=https://developers.google.com/ar;end;';
        link.click();
      } else {
        alert('Realitatea augmentată este disponibilă doar pe dispozitive mobile (iOS Safari sau Android Chrome)');
      }
    }
  };

  // Initialize device detection
  useEffect(() => {
    setDeviceInfo(detectDevice());
  }, []);

  // Load model-viewer script
  useEffect(() => {
    const script = document.createElement('script');
    script.type = 'module';
    script.src = 'https://unpkg.com/@google/model-viewer/dist/model-viewer.min.js';
    document.head.appendChild(script);

    return () => {
      document.head.removeChild(script);
    };
  }, []);

  return (
    <section id="ar" className="py-20 px-4 bg-gradient-to-r from-primary/10 to-secondary/10">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            <span className="block text-foreground">Experiență</span>
            <span className="block bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              Augmented Reality
            </span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
            Explorează preparatele noastre în realitate augmentată. Vizualizează felurile de mâncare 
            direct în spațiul tău cu tehnologia AR avansată.
          </p>
        </div>

        <div className="flex justify-center">
          {/* Model Viewer with AR */}
          <div className="relative max-w-2xl w-full">
            <div className="bg-card rounded-xl p-6 shadow-xl">
              <model-viewer
                src="/ar/Iphone mozzarela pe cola auto fara io.glb"
                ios-src="/ar/Iphone mozzarela pe cola auto fara io.usdz"
                ar
                ar-modes="webxr scene-viewer quick-look"
                camera-controls
                auto-rotate
                shadow-intensity="1"
                min-camera-orbit="auto 0deg auto"
                max-camera-orbit="auto 90deg auto"
                style={{
                  width: '100%',
                  height: '400px',
                  backgroundColor: 'transparent'
                }}
                ar-placement="floor"
                loading="eager"
              >
                <div slot="ar-button" style={{ display: 'none' }}></div>
              </model-viewer>
              
              {/* Model Info */}
              <div className="mt-4 text-center">
                <h3 className="text-xl font-semibold mb-2">Model 3D interactiv</h3>
                <p className="text-muted-foreground text-sm mb-4">
                   Rotește pentru a explora din toate unghiurile
                </p>
                
                {/* AR Button */}
                <Button 
                  onClick={handleARClick}
                  className="bg-gradient-to-r from-primary to-secondary hover:from-primary/90 hover:to-secondary/90 text-white px-8 py-3"
                  disabled={!deviceInfo.supportsAR}
                >
                  {deviceInfo.supportsAR ? (
                    deviceInfo.isIOS ? '📱 Vedere în AR (iOS)' : '🤖 Vedere în AR (Android)'
                  ) : (
                    '🔍 Vedere în AR (doar mobil)'
                  )}
                </Button>
                
                {deviceInfo.supportsAR && (
                  <p className="text-xs text-muted-foreground mt-2">
                    {deviceInfo.isIOS 
                      ? 'Necesită Safari pe iPhone/iPad' 
                      : 'Necesită Google Chrome și Scene Viewer'
                    }
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ARSection;