import React, { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import Header from '@/components/Header';

// Declare model-viewer as a custom element
declare global {
  namespace JSX {
    interface IntrinsicElements {
      'model-viewer': any;
    }
  }
}

const Presentation: React.FC = () => {
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

  // Handle AR button click for panini-caprese
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
        link.href = '/presentation/panini-caprese.usdz';
        link.rel = 'ar';
        link.style.display = 'none';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      } else if (device.isAndroid) {
        // Android AR using Scene Viewer
        const link = document.createElement('a');
        link.href = 'intent://arvr.google.com/scene-viewer/1.0?file=' + window.location.origin + '/presentation/panini-caprese.glb#Intent;scheme=https;package=com.google.android.googlequicksearchbox;action=android.intent.action.VIEW;S.browser_fallback_url=https://developers.google.com/ar;end;';
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
    <div className="min-h-screen relative overflow-hidden">
      <Header />

      {/* Background decoration - same as main site */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl animate-float" />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-secondary/10 rounded-full blur-3xl animate-float" style={{ animationDelay: '-1s' }} />
      </div>

      {/* Main content */}
      <div className="relative z-10 min-h-screen flex items-center justify-center px-4">
        <div className="max-w-4xl mx-auto text-center">
          {/* Product showcase */}
          <div className="bg-card rounded-xl p-8 shadow-2xl">
            {/* 3D Model Viewer */}
            <div className="mb-8 bg-muted/30 rounded-xl p-6">
              <model-viewer
                src="/presentation/panini-caprese.glb"
                ios-src="/presentation/panini-caprese.usdz"
                ar
                ar-modes="webxr scene-viewer quick-look"
                camera-controls
                auto-rotate
                shadow-intensity="1"
                min-camera-orbit="auto 0deg auto"
                max-camera-orbit="auto 90deg auto"
                style={{
                  width: '100%',
                  height: '300px',
                  backgroundColor: 'transparent'
                }}
                ar-placement="floor"
                loading="eager"
              >
                <div slot="ar-button" style={{ display: 'none' }}></div>
              </model-viewer>

              <p className="text-sm text-muted-foreground mt-4">
                Rotește pentru a explora modelul 3D din toate unghiurile
              </p>
            </div>

            {/* AR Button */}
            <Button
              onClick={handleARClick}
              size="lg"
              className="bg-gradient-to-r from-primary to-secondary hover:from-primary/90 hover:to-secondary/90 text-white px-12 py-4 text-lg"
              disabled={!deviceInfo.supportsAR}
            >
              {deviceInfo.supportsAR ? (
                deviceInfo.isIOS ? '📱 Vezi în Realitate Augmentată (iOS)' : '🤖 Vezi în Realitate Augmentată (Android)'
              ) : (
                '🔍 Vezi în AR (disponibil doar pe mobil)'
              )}
            </Button>

            {deviceInfo.supportsAR && (
              <p className="text-sm text-muted-foreground mt-4">
                {deviceInfo.isIOS
                  ? 'Necesită Safari pe iPhone/iPad pentru experiența AR'
                  : 'Necesită Google Chrome și Scene Viewer pentru AR'
                }
              </p>
            )}

            {!deviceInfo.supportsAR && (
              <p className="text-sm text-muted-foreground mt-4">
                Pentru a experimenta realitatea augmentată, vizitează această pagină pe un dispozitiv mobil
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Presentation;