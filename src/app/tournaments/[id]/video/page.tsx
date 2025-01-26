"use client";
import { useEffect, useRef, useState } from "react";
import { useSocket } from "../../../../../context/SocketContext";

interface LiveStreamProps {
    stream: MediaStream | null,
    isLocalStream: boolean,
}

export default function LiveStream(){
    const [loading, setLoading] = useState<boolean>(true);
    const { localStream } = useSocket();
    const videoRef = useRef<HTMLVideoElement>(null);
    const [admin, setAdmin] = useState<string>('');

    useEffect(()=> {
        const isAdmin = async () => {
            const tournament_id = window.location.href.split('/')[4];
            console.log("TESTING ", tournament_id)

            const response = await fetch(`/api/stream?id=${tournament_id}`)
            const data = await response.json();

            // if (error){
            //     console.error("Error: ", error);
            //     return;
            // }

            if (!data.data){
                console.error("No data returned for video admin");
                return;
            }

            console.log("DATA DATA ", data.data)

            setAdmin(data.data[0].admin)
            
        }

        isAdmin();

        if (videoRef.current && localStream){
            videoRef.current.srcObject = localStream;
        }
    }, [localStream]);






    return (
        <div>
            {localStream &&
                <video ref={videoRef} muted={true} autoPlay playsInline className="rounded border w-full h-full" />}
        </div>
    );
}