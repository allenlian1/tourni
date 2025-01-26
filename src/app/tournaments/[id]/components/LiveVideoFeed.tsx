'use client'; // Mark this as a Client Component

import React, { useEffect, useRef } from 'react';

export function LiveVideoFeed() {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const enableVideoStream = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ video: true });
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
        }
      } catch (err) {
        console.error('Error accessing the webcam:', err);
      }
    };

    enableVideoStream();

    // Cleanup function to stop the video stream when the component unmounts
    return () => {
      if (videoRef.current && videoRef.current.srcObject) {
        const stream = videoRef.current.srcObject as MediaStream;
        stream.getTracks().forEach(track => track.stop());
      }
    };
  }, []);

  return (
    <div className="flex justify-center items-center h-full">
      <video ref={videoRef} autoPlay playsInline className="max-w-full max-h-full" />
    </div>
  );
}