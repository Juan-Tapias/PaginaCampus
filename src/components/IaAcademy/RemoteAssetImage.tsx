'use client';

import { useMemo, useState } from 'react';

type RemoteAssetImageProps = {
  src: string;
  fallbackSrc?: string;
  alt: string;
  className?: string;
  draggable?: boolean;
};

export default function RemoteAssetImage({
  src,
  fallbackSrc,
  alt,
  className,
  draggable = false,
}: RemoteAssetImageProps) {
  const [failed, setFailed] = useState(false);

  const resolvedSrc = useMemo(() => {
    if (!failed) return src;
    return fallbackSrc || src;
  }, [failed, fallbackSrc, src]);

  return (
    <img
      src={resolvedSrc}
      alt={alt}
      className={className}
      draggable={draggable}
      onError={() => setFailed(true)}
    />
  );
}
