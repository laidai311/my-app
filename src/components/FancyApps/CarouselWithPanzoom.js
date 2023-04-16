import ReactCarousel from "components/Carousel";
import ReactPanzoom from "components/Panzoom";
import { isVideo } from "contents/Warehouse/utils";
import { useRef, useState } from "react";

const Slider = (props) => {
    const { media, indexSlider, has } = props;
    const [isReadyVideos, setIsReadyVideos] = useState(() => {
        let obj = {};
        media.forEach((element) => {
            obj[`${element?._id}-1`] = "none";
            obj[`${element?._id}-2`] = "block";
        });
        return obj;
    });
    const prevPage = useRef(null);

    return (
        <ReactCarousel
            className="w-full h-full bg-black"
            has={{ thumbs: !!has?.thumbs }}
            options={{
                infinite: false,
                initialPage: indexSlider || 0,
                initialSlider: indexSlider || 0,
                slidesPerPage: 1,
                transition: "slide",
                center: true,
                Dots: false,
                Autoplay: false,
                axis: "x",
                dragFree: false,
                enabled: true,
                Thumbs: {
                    type: "modern",
                    classes: {
                        container:
                            "f-thumbs f-carousel__thumbs is-modern is-horizontal bg-black",
                    },
                },
                on: {
                    selectSlide: (instance) => {
                        let prevVideoEl = null;

                        if (instance?.page) {
                            if (instance?.page < prevPage.current) {
                                prevVideoEl = instance?.container.querySelector(
                                    `.video-${instance?.page + 1}`
                                );
                            }
                            if (instance?.page > prevPage.current) {
                                prevVideoEl = instance?.container.querySelector(
                                    `.video-${instance?.page - 1}`
                                );
                            }
                        }
                        if (prevVideoEl) {
                            prevVideoEl.pause();
                        }
                        const currentVideoEl =
                            instance?.container.querySelector(
                                `.video-${instance?.page}`
                            );

                        if (currentVideoEl) {
                            currentVideoEl.play();
                        }
                        prevPage.current = instance?.page;
                    },
                },
            }}
        >
            <div className="f-carousel__viewport h-full w-full">
                <div className="w-full h-fit f-carousel__track" options={{}}>
                    {media?.map((item, index) =>
                        isVideo(item?.location) ? (
                            <div
                                key={index}
                                className="f-carousel__slide !overflow-hidden h-full !bg-black flex justify-center items-center"
                                data-thumb-src="/images/logo/logo-background-video.png"
                            >
                                <div className="w-full max-w-7xl h-fit relative ">
                                    <div
                                        style={{
                                            display:
                                                isReadyVideos?.[
                                                    `${item?._id}-1`
                                                ],
                                        }}
                                        className={`absolute inset-0 w-full h-full`}
                                    >
                                        <div className="w-32 h-12 font-semibold text-center bg-slate-100 rounded-md flex items-center justify-center mx-auto">
                                            Lỗi tải video!!
                                        </div>
                                    </div>
                                    <div
                                        style={{
                                            display:
                                                isReadyVideos?.[
                                                    `${item?._id}-2`
                                                ],
                                        }}
                                        className={`relative pt-[56.25%]`}
                                    >
                                        <video
                                            controls
                                            className={`video-${index} cursor-default absolute inset-0 w-full h-full object-contain bg-black`}
                                            preload="none"
                                            poster="/images/loadingImg.svg"
                                            src={`${item.location}`}
                                            onError={() => {
                                                setIsReadyVideos((prev) => ({
                                                    ...prev,
                                                    [`${item?._id}-1`]: "block",
                                                    [`${item?._id}-2`]: "none",
                                                }));
                                            }}
                                            onLoadedData={() => {
                                                setIsReadyVideos((prev) => ({
                                                    ...prev,
                                                    [`${item?._id}-1`]: "none",
                                                    [`${item?._id}-2`]: "block",
                                                }));
                                            }}
                                        />
                                    </div>
                                </div>
                            </div>
                        ) : (
                            <ReactPanzoom
                                has={{ toolbar: !!has?.toolbar }}
                                options={{
                                    click: false,
                                    dblClick: false,
                                    extraZoomFactor: 2,
                                    Toolbar: {
                                        display: [
                                            "zoomIn",
                                            "zoomOut",
                                            "toggle1to1",
                                            "reset",
                                        ],
                                    },
                                }}
                                key={index}
                                className="f-carousel__slide h-full w-full !bg-black !overflow-hidden"
                                data-thumb-src={item.location}
                            >
                                <div className=" h-full !w-full f-panzoom__viewport">
                                    <img
                                        className="w-full h-full object-contain bg-black f-panzoom__content"
                                        style={{
                                            width: "100%",
                                            height: "100%",
                                        }}
                                        src={item.location}
                                        data-lazy-src={item.location}
                                    />
                                </div>
                            </ReactPanzoom>
                        )
                    )}
                </div>
            </div>
        </ReactCarousel>
    );
};

export default Slider;
