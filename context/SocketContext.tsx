"use client";
import { auth } from "@/auth";
import { createContext, useCallback, useContext, useEffect, useState } from "react";
import { io, Socket } from "socket.io-client";

interface iSocketContext {
    localStream: MediaStream | null,
}

export const SocketContext = createContext<iSocketContext | null >(null);

export const SocketContextProvider = ({children}:{children:React.ReactNode}) => {
    const [socket, setSocket] = useState<Socket | null>(null);
    const [isSocketConnected, setIsSocketConnected] = useState<boolean>(false);
    const [localStream, setLocalStream] = useState<MediaStream | null>(null);

    const getMediaStream = useCallback(async(faceMode?: string) => {
        if (localStream){
            return localStream;
        }

        try {
            const devices = await navigator.mediaDevices.enumerateDevices();
            const videoDevices = devices.filter(device => device.kind === 'videoinput');

            const stream = await navigator.mediaDevices.getUserMedia({
                audio: true,
                video: {
                    width: {min: 640, ideal: 1280, max: 1920},
                    height: {min: 360, ideal: 720, max: 1080},
                    frameRate: {min: 16, ideal: 30, max: 30},
                    facingMode: videoDevices.length >  0 ? faceMode : undefined
                }
            })

            setLocalStream(stream)
            return stream;
        } catch (error){
            console.log("Failed to get stream")
            setLocalStream(null);
            return null;
        }
    }, [localStream])

    console.log('isConnected: ', isSocketConnected);
    //initialize the socket
    useEffect(()=>{
        const newSocket = io();
        setSocket(newSocket);


        return () => {
            newSocket.disconnect();
        }
    }, []);

    useEffect(()=> {
        if (socket===null) return;

        if (socket.connected){
            onConnect();
        }

        async function onConnect(){
            setIsSocketConnected(true);

            const stream = await getMediaStream();
        }

        function onDisconnect(){
            setIsSocketConnected(false);
        }

        socket.on('connect', onConnect);
        socket.on('disconnect', onDisconnect);

        return ()=>{
            socket.off('connect', onConnect)
            socket.off('disconnect', onDisconnect)
        }
    }, [socket]);

    return <SocketContext.Provider value={{localStream: localStream}}>
        {children}
    </SocketContext.Provider>
}

export const useSocket = () => {
    const context = useContext(SocketContext);

    if (context === null) {
        throw new Error("useSocket must be used within a SocketContextProvider")
    }

    return context;
}