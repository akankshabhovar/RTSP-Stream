import React, { useEffect, useRef } from 'react';

const StreamPlayer = ({ url }) => {
  const videoRef = useRef(null);
  const wsRef = useRef(null);
  const mediaSourceRef = useRef(null);
  const sourceBufferRef = useRef(null);

  useEffect(() => {
    const setupStream = async () => {
      try {
        mediaSourceRef.current = new MediaSource();
        videoRef.current.src = URL.createObjectURL(mediaSourceRef.current);

        mediaSourceRef.current.addEventListener('sourceopen', () => {
          sourceBufferRef.current = mediaSourceRef.current.addSourceBuffer('video/webm; codecs="vp8,vorbis"');
          wsRef.current = new WebSocket('ws://localhost:8000/ws/stream/');

          wsRef.current.onmessage = async (event) => {
            if (event.data instanceof Blob) {
              const buffer = await event.data.arrayBuffer();
              if (!sourceBufferRef.current.updating) {
                sourceBufferRef.current.appendBuffer(buffer);
              }
            }
          };

          wsRef.current.onopen = () => {
            wsRef.current.send(JSON.stringify({ url: url }));
          };
        });
      } catch (error) {
        console.error('Error setting up stream:', error);
      }
    };

    setupStream();

    return () => {
      if (wsRef.current) {
        wsRef.current.close();
      }
    };
  }, [url]);

  return (
    <video
      ref={videoRef}
      controls
      autoPlay
      style={{ width: '100%' }}
    />
  );
};

export default StreamPlayer;