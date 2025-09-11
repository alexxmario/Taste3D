import React, { useEffect, useState } from 'react';

interface PerformanceStats {
  fps: number;
  memory: number;
  loadTime: number;
}

const PerformanceMonitor: React.FC = () => {
  const [stats, setStats] = useState<PerformanceStats>({
    fps: 0,
    memory: 0,
    loadTime: 0
  });
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    let frameCount = 0;
    let lastTime = performance.now();
    let animationId: number;

    const updateFPS = () => {
      frameCount++;
      const currentTime = performance.now();
      
      if (currentTime >= lastTime + 1000) {
        const fps = Math.round((frameCount * 1000) / (currentTime - lastTime));
        
        setStats(prev => ({
          ...prev,
          fps,
          memory: (performance as any).memory ? 
            Math.round((performance as any).memory.usedJSHeapSize / 1048576) : 0,
          loadTime: Math.round(performance.now())
        }));

        frameCount = 0;
        lastTime = currentTime;
      }
      
      animationId = requestAnimationFrame(updateFPS);
    };

    animationId = requestAnimationFrame(updateFPS);

    // Toggle visibility with Ctrl+Shift+P
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.ctrlKey && e.shiftKey && e.key === 'P') {
        setIsVisible(prev => !prev);
      }
    };

    window.addEventListener('keydown', handleKeyPress);

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener('keydown', handleKeyPress);
    };
  }, []);

  if (!isVisible) return null;

  const getFPSColor = (fps: number) => {
    if (fps >= 55) return 'text-green-400';
    if (fps >= 30) return 'text-yellow-400';
    return 'text-red-400';
  };

  return (
    <div className="fixed top-4 right-4 z-50 bg-black/80 text-white p-3 rounded-lg font-mono text-sm backdrop-blur-sm">
      <div className="text-xs text-gray-400 mb-1">Performance Monitor</div>
      <div className="space-y-1">
        <div className={`flex justify-between gap-4 ${getFPSColor(stats.fps)}`}>
          <span>FPS:</span>
          <span className="font-bold">{stats.fps}</span>
        </div>
        <div className="flex justify-between gap-4 text-blue-400">
          <span>Memory:</span>
          <span>{stats.memory}MB</span>
        </div>
        <div className="flex justify-between gap-4 text-purple-400">
          <span>Load:</span>
          <span>{stats.loadTime}ms</span>
        </div>
      </div>
      <div className="text-xs text-gray-500 mt-2">
        Ctrl+Shift+P to toggle
      </div>
    </div>
  );
};

export default PerformanceMonitor;