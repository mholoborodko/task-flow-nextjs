'use client';

import clsx from 'clsx';
import { useEffect, useState } from 'react';

interface IconProps {
  name: string;
  size?: number;
  className?: string;
}

export const Icon: React.FC<IconProps> = ({ name, size = 24, className }) => {
  const [svg, setSvg] = useState<string | null>(null);

  useEffect(() => {
    const loadSvg = async () => {
      const response = await fetch(`/assets/icons/${name}.svg`);
      if (response.ok) {
        const svgText = await response.text();
        setSvg(
          svgText.replace(
            /(<svg[^>]+)>/,
            `$1 width="${size}" height="${size}" fill="currentColor">`
          )
        );
      }
    };

    loadSvg();
  }, [name, size]);

  if (!svg) return null;

  return (
    <span
      className={clsx('inline-block', className)}
      dangerouslySetInnerHTML={{ __html: svg }}
    />
  );
};
