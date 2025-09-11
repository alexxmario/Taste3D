interface ImagePreloader {
  preload: (urls: string[]) => Promise<void[]>;
  preloadSingle: (url: string) => Promise<void>;
}

const createImagePreloader = (): ImagePreloader => {
  const cache = new Set<string>();

  const preloadSingle = (url: string): Promise<void> => {
    if (cache.has(url)) {
      return Promise.resolve();
    }

    return new Promise((resolve, reject) => {
      const img = new Image();
      
      img.onload = () => {
        cache.add(url);
        resolve();
      };
      
      img.onerror = () => {
        reject(new Error(`Failed to preload image: ${url}`));
      };
      
      img.src = url;
    });
  };

  const preload = (urls: string[]): Promise<void[]> => {
    return Promise.all(urls.map(url => preloadSingle(url)));
  };

  return { preload, preloadSingle };
};

export const imagePreloader = createImagePreloader();