'use client';

import { useState, useEffect } from 'react';

interface SequenceConfig {
  folderPath: string;
  frameCount: number;
  prefix?: string;
  extension?: string;
}

export function useImagePreloader(sequences: SequenceConfig[]) {
  const [images, setImages] = useState<HTMLImageElement[]>([]);
  const [loaded, setLoaded] = useState(false);
  const [firstFrameLoaded, setFirstFrameLoaded] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let isCancelled = false;
    const loadSequences = async () => {
      const allFrameConfigs: { src: string; index: number }[] = [];
      let globalIndex = 0;

      for (const seq of sequences) {
        const { folderPath, frameCount, prefix = '', extension = '.jpg' } = seq;
        for (let i = 1; i <= frameCount; i++) {
          const paddedIndex = i.toString().padStart(3, '0');
          allFrameConfigs.push({
            src: `${folderPath}/${prefix}${paddedIndex}${extension}`,
            index: globalIndex++
          });
        }
      }

      const totalFrames = allFrameConfigs.length;
      const imgArray: HTMLImageElement[] = new Array(totalFrames);
      let loadedCount = 0;

      // Load in batches to avoid overwhelming the browser/network
      const batchSize = 30;
      for (let i = 0; i < allFrameConfigs.length; i += batchSize) {
        if (isCancelled) break;
        
        const batch = allFrameConfigs.slice(i, i + batchSize);
        await Promise.all(batch.map(async (config) => {
          const img = new Image();
          img.src = config.src;
          
          await new Promise((resolve) => {
            img.onload = async () => {
              try {
                if (img.decode) {
                  await img.decode();
                }
                resolve(true);
              } catch (e) {
                resolve(true);
              }
            };
            img.onerror = resolve;
          });

          if (!isCancelled) {
            imgArray[config.index] = img;
            loadedCount++;
            if (config.index === 0) setFirstFrameLoaded(true);
            setProgress((loadedCount / totalFrames) * 100);
          }
        }));
      }

      if (!isCancelled) {
        setImages(imgArray);
        setLoaded(true);
      }
    };

    loadSequences();

    return () => {
      isCancelled = true;
    };
  }, [sequences]);

  return { images, loaded, firstFrameLoaded, progress };
}
