import { useState, useEffect } from 'react';

export const formatTime = (time) => {
    let seconds = Math.floor(time % 60),
        minutes = Math.floor(time / 60) % 60,
        hours = Math.floor(time / 3600);

    seconds = seconds < 10 ? `0${seconds}` : seconds;
    minutes = minutes < 10 ? `0${minutes}` : minutes;
    hours = hours < 10 ? `0${hours}` : hours;

    if (hours == 0) {
        return `${minutes}:${seconds}`;
    }
    return `${hours}:${minutes}:${seconds}`;
};

const useVideoPlayer = (videoElem) => {
    const [playerState, setPlayerState] = useState({
        isPlaying: false,
        progress: 0,
        speed: 1,
        isMuted: false,
        volume: 0.8,
        duration: '00:00',
        currentTime: '00:00'
    });

    const togglePlay = () => {
        setPlayerState({
            ...playerState,
            isPlaying: !playerState.isPlaying
        });
    };

    useEffect(() => {
        if (videoElem) {
            playerState.isPlaying ? videoElem.play() : videoElem.pause();
        }
    }, [playerState.isPlaying, videoElem]);

    const handleOnTimeUpdate = () => {
        const progress = (videoElem.currentTime / videoElem.duration) * 100;
        const currentTime = formatTime(videoElem.currentTime);

        if (videoElem.currentTime == videoElem.duration) {
            setPlayerState({
                ...playerState,
                progress,
                currentTime,
                isPlaying: false
            });
        } else {
            setPlayerState({
                ...playerState,
                progress,
                currentTime
            });
        }
    };

    const handleDuration = () => {
        setPlayerState({
            ...playerState,
            duration: formatTime(videoElem?.duration)
        });
    };

    const handleVideoProgress = (event) => {
        const manualChange = Number(event.target.value);
        videoElem.currentTime = (videoElem.duration / 100) * manualChange;
        setPlayerState({
            ...playerState,
            progress: manualChange
        });
    };

    const handleVolumeProgress = (event) => {
        const manualChange = Number(event.target.value);
        videoElem.volume = manualChange;
        setPlayerState({
            ...playerState,
            volume: manualChange
        });
    };

    const handleVideoSpeed = (event) => {
        const speed = Number(event.target.value);
        videoElem.playbackRate = speed;
        setPlayerState({
            ...playerState,
            speed
        });
    };

    const toggleMute = () => {
        setPlayerState({
            ...playerState,
            isMuted: !playerState.isMuted
        });
    };

    useEffect(() => {
        if (videoElem) {
            playerState.isMuted ? (videoElem.muted = true) : (videoElem.muted = false);
        }
    }, [playerState.isMuted, videoElem]);

    return {
        playerState,
        togglePlay,
        handleOnTimeUpdate,
        handleVideoProgress,
        handleVideoSpeed,
        toggleMute,
        handleVolumeProgress,
        handleDuration
    };
};

export default useVideoPlayer;
