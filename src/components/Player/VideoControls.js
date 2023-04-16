import useVideoPlayer, { formatTime } from './useVideoPlayer';
import { BsPauseFill, BsPlayFill } from 'react-icons/bs';
import { useEffect, useRef } from 'react';
import { FaExpandAlt } from 'react-icons/fa';
import { HiSpeakerXMark, HiSpeakerWave } from 'react-icons/hi2';

const VideoPlayer = (props) => {
    const { src, className } = props;
    const videoElement = useRef(null);
    const progressRef = useRef(null);
    const progressTimeRef = useRef(null);
    const containerRef = useRef(null);
    const {
        playerState,
        togglePlay,
        handleOnTimeUpdate,
        handleVideoProgress,
        toggleMute,
        handleVolumeProgress,
        handleDuration
    } = useVideoPlayer(videoElement.current);

    useEffect(() => {
        const handle = (e) => {
            let timelineWidth = e.target.clientWidth;
            let offsetX = e.offsetX;
            let percent = Math.floor((offsetX / timelineWidth) * videoElement.current.duration);
            offsetX =
                offsetX < 20 ? 20 : offsetX > timelineWidth - 20 ? timelineWidth - 20 : offsetX;
            progressTimeRef.current.style.left = `${offsetX - 17}px`;
            progressTimeRef.current.innerText = formatTime(percent);
        };
        if (progressRef.current) {
            progressRef.current.addEventListener('mousemove', handle);
        }

        const handleKey = () => {
            if (document.fullscreenElement) {
                containerRef.current.style.height = '100%';
            }
        };
        document.addEventListener('fullscreenchange', handleKey);

        return () => {
            if (progressRef.current) {
                progressRef.current.removeEventListener('mousemove', handle);
            }
            document.removeEventListener('fullscreenchange', handleKey);
        };
    }, [progressRef.current]);

    const handleToggleFullscreen = () => {
        if (document.fullscreenElement) {
            containerRef.current.style.height = '100%';
            if (document.exitFullscreen) {
                return document.exitFullscreen();
                // .then(() => (containerRef.current.style.height = '100%'));
            } else if (document.webkitExitFullscreen) {
                /* Safari */
                return document.webkitExitFullscreen();
            } else if (document.msExitFullscreen) {
                /* IE11 */
                return document.msExitFullscreen();
            }
        } else {
            containerRef.current.style.height = '100vh';
            if (containerRef.current.requestFullscreen) {
                containerRef.current.requestFullscreen();
            } else if (containerRef.current.webkitRequestFullscreen) {
                /* Safari */
                containerRef.current.webkitRequestFullscreen();
            } else if (containerRef.current.msRequestFullscreen) {
                /* IE11 */
                containerRef.current.msRequestFullscreen();
            }
        }
    };

    return (
        <div
            ref={containerRef}
            className={`relative overflow-hidden select-none bg-black group/container ${
                className ? className : ''
            }`}>
            <div className="absolute inset-0">
                <div className="h-full flex flex-col">
                    <div
                        className="grow flex items-center justify-center !cursor-pointer relative z-10"
                        onDoubleClick={handleToggleFullscreen}
                        onClick={togglePlay}>
                        {!playerState.isPlaying && <BsPlayFill size={90} fill="white" />}
                    </div>
                    <div className="items-center flex p-1.5 space-x-1 bg-gradient-to-t from-[#000000b3] to-transparent opacity-0 group-hover/container:opacity-100 transition-opacity ease-in-out relative z-30 delay-1000 group-hover/container:delay-75">
                        <button className="btn btn-circle btn-ghost btn-sm" onClick={togglePlay}>
                            {playerState.isPlaying ? (
                                <BsPauseFill size={20} fill="white" />
                            ) : (
                                <BsPlayFill size={20} fill="white" />
                            )}
                        </button>
                        <div className="flex text-white text-xs font-semibold space-x-1">
                            <span className="current-time">{playerState.currentTime}</span>
                            <span className="separator"> / </span>
                            <span className="video-duration">{playerState.duration}</span>
                        </div>
                        <div className="relative group grow flex items-center px-1">
                            <div
                                ref={progressTimeRef}
                                className="absolute -z-10 bottom-[250%] left-0 rounded-md bg-[#00000070] text-white px-2 py-1 text-xs hidden group-hover:inline-block">
                                00:00
                            </div>
                            <input
                                ref={progressRef}
                                type="range"
                                min="0"
                                max="100"
                                step="any"
                                className="w-full h-1 cursor-pointer"
                                value={playerState.progress}
                                onChange={handleVideoProgress}
                            />
                        </div>
                        <button
                            className="btn btn-circle btn-ghost btn-sm"
                            onClick={handleToggleFullscreen}>
                            <FaExpandAlt size={16} fill="white" />
                        </button>
                        <div className="relative group">
                            <div
                                style={{
                                    transform: 'rotate(270deg)',
                                    transformOrigin: 'left center'
                                }}
                                className="absolute -top-1.5 left-1/2 flex items-center w-20 h-5 invisible group-hover:visible transition-all ease-out">
                                <input
                                    type="range"
                                    min="0"
                                    max="1"
                                    step="any"
                                    className="m h-1 w-20"
                                    value={playerState.isMuted ? 0 : playerState.volume}
                                    onChange={handleVolumeProgress}
                                />
                            </div>
                            <button
                                className="btn btn-circle btn-ghost btn-sm"
                                onClick={toggleMute}>
                                {playerState.isMuted || playerState.volume === 0 ? (
                                    <HiSpeakerXMark size={20} fill="white" />
                                ) : (
                                    <HiSpeakerWave size={20} fill="white" />
                                )}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            <video
                ref={videoElement}
                width="100%"
                height="100%"
                className="bg-black"
                style={{ objectPosition: 'center' }}
                onTimeUpdate={handleOnTimeUpdate}
                onLoadedData={handleDuration}
                src={'/video.mp4'}
            />
        </div>
    );
};

export default VideoPlayer;
