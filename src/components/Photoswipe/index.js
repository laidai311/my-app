import "photoswipe/style.css";
import ObjectPosition from "./photoswipe-object-position";
import PhotoSwipeLightbox from "photoswipe/lightbox";
import PhotoSwipeVideoPlugin from "./photoswipe-video-plugin.esm.min";
import React, { useEffect, useLayoutEffect, useRef, useState } from "react";

function getImageDimensionsOf(url) {
  return new Promise((resolve) => {
    const image = new Image();
    image.src = url;
    image.onload = function () {
      resolve({ height: image.height, width: image.width });
    };
  });
}

function getVideoDimensionsOf(url) {
  return new Promise((resolve) => {
    // create the video element
    const video = document.createElement("video");

    // place a listener on it
    video.addEventListener(
      "loadedmetadata",
      function () {
        // retrieve dimensions
        const height = this.videoHeight;
        const width = this.videoWidth;

        // send back result
        resolve({ height, width });
      },
      false
    );

    // start download meta-datas
    video.src = url;
  });
}

export default function SimpleGallery(props) {
  useEffect(() => {
    let lightbox = new PhotoSwipeLightbox({
      gallery: "#" + props.galleryID,
      children: "a",
      pswpModule: () => import("photoswipe"),
      wheelToZoom: true,
      //   showHideAnimationType: "none",
      padding: { top: 20, bottom: 20 },
      errorMsg: "Không thể tải ảnh này!",
      indexIndicatorSep: " / ",
      closeTitle: "Đóng",
      zoomTitle: "Phóng to",
      arrowPrevTitle: "Lùi",
      arrowNextTitle: "Tiến",
    });
    new PhotoSwipeVideoPlugin(lightbox, {
      videoAttributes: { controls: "", playsinline: "", preload: "auto" },
      autoplay: true,

      // prevent drag/swipe gesture over the bottom part of video
      // set to 0 to disable
      preventDragOffset: 40,
    });
    new ObjectPosition(lightbox);

    lightbox.init();

    return () => {
      lightbox.destroy();
      lightbox = null;
    };
  }, []);

  const [dimensions, setDimensions] = useState({});

  useLayoutEffect(() => {
    props?.images?.forEach((image) => {
      getImageDimensionsOf(image?.largeURL).then((value) => {
        setDimensions((prev) => ({
          ...prev,
          [`${image?._id}`]: value,
        }));
      });
    });
    props?.videos?.forEach((video) => {
      getVideoDimensionsOf(video?.largeURL).then((value) => {
        setDimensions((prev) => ({
          ...prev,
          [`${video?._id}`]: value,
        }));
      });
    });
  }, [props?.videos]);

  return (
    <div className="pswp-gallery flex" id={props.galleryID}>
      {props.videos.map((video, index) => (
        <a
          key={props.galleryID + "-" + index}
          href={video.largeURL}
          data-pswp-video-src={video.largeURL}
          data-pswp-width={dimensions?.[`${video?._id}`]?.width || 1280}
          data-pswp-height={dimensions?.[`${video?._id}`]?.height || 720}
          data-pswp-type="video"
          target="_blank"
          rel="noreferrer"
        >
          <div className="relative inline-block">
            <img
              src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGQAAAA4CAQAAAChp5VTAAAARklEQVR42u3PAQ0AAAwCIO0f+u/hoAHNZUJFRERERERERERERERERERERERERERERERERERERERERERERERERERERER2Iw8h0zgBbPlo6AAAAABJRU5ErkJggg=="
              alt=""
              className="w-52 h-40 overflow-hidden object-cover relative"
            />
            <div className="absolute inset-12 z-[1]">
              <img src="/play-xxl.png" alt="" className="object-cover w-full h-full" />
            </div>
          </div>
        </a>
      ))}
      {props.images.map((image, index) => (
        <a
          href={image.largeURL}
          data-pswp-width={dimensions?.[`${image?._id}`]?.width || 1280}
          data-pswp-height={dimensions?.[`${image?._id}`]?.height || 720}
          key={props.galleryID + "-" + index}
          target="_blank"
          rel="noreferrer"
          data-cropped="true"
        >
          <img src={image.largeURL} alt="" className="inline-block w-52 h-40 object-cover" />
        </a>
      ))}
    </div>
  );
}
