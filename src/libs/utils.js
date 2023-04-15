export const createCSSVariable = (propertyName, value) => {
  const doc = document.documentElement;
  doc.style.setProperty(propertyName, value);
};
export const isValueEmpty = async (obj) => {
  return await new Promise((resolve) => {
    Object.entries(obj).forEach((entry) => {
      if (!entry[1]) {
        resolve(true);
      }
    });
    resolve(false);
  });
};

// export const fetcherWithToken = async (url: string, token: string) => {
//     await axios
//       .get(url, {
//         headers: {
//           Authorization: `Bearer ${token}`,
//           Content-Type: 'application/json',
//         },
//         withCredentials: true,
//       })
//       .then((res) => res.data)
//       .catch((err) => {
//         if (err) {
//           throw new Error('There is error on your site');
//         }
//       });
//   };

// Simple fullscreen API helper,
// supports unprefixed and webkit-prefixed versions
function getFullscreenAPI() {
  let api;
  let enterFS;
  let exitFS;
  let elementFS;
  let changeEvent;
  let errorEvent;

  if (document.documentElement.requestFullscreen) {
    enterFS = 'requestFullscreen';
    exitFS = 'exitFullscreen';
    elementFS = 'fullscreenElement';
    changeEvent = 'fullscreenchange';
    errorEvent = 'fullscreenerror';
  } else if (document.documentElement.webkitRequestFullscreen) {
    enterFS = 'webkitRequestFullscreen';
    exitFS = 'webkitExitFullscreen';
    elementFS = 'webkitFullscreenElement';
    changeEvent = 'webkitfullscreenchange';
    errorEvent = 'webkitfullscreenerror';
  }

  if (enterFS) {
    api = {
      request: function (el) {
        if (enterFS === 'webkitRequestFullscreen') {
          el[enterFS](Element.ALLOW_KEYBOARD_INPUT);
        } else {
          el[enterFS]();
        }
      },

      exit: function () {
        return document[exitFS]();
      },

      isFullscreen: function () {
        return document[elementFS];
      },

      change: changeEvent,
      error: errorEvent,
    };
  }

  return api;
}

function getContainer() {
  const pswpContainer = document.createElement('div');
  pswpContainer.style.background = '#000';
  pswpContainer.style.width = '100%';
  pswpContainer.style.height = '100%';
  pswpContainer.style.display = 'none';
  document.body.appendChild(pswpContainer);
  return pswpContainer;
}

export const capitalize = (str) => str[0].toUpperCase() + str.slice(1);

// Helper function that takes in minutes from midnight and returns a string in the format "hh:mm AM/PM"
export const convertMinutesToHHMM = (minutes) => {
  const hours = Math.floor(minutes / 60);
  const minutesRemaining = minutes % 60;
  const amPm = hours >= 12 ? 'PM' : 'AM';
  const hoursRemaining = hours % 12;
  return `${hoursRemaining}:${
    minutesRemaining < 10 ? '0' : ''
  }${minutesRemaining} ${amPm}`;
};

const getWindow = () => (typeof window !== 'undefined' ? window : undefined);

const isWindow = (element) => element === window;

const getBoundingBox = (element) => element.getBoundingClientRect();

export function getDimensions(scrollElement, props) {
  if (!scrollElement) {
    return {
      height: props.serverHeight,
      width: props.serverWidth,
    };
  } else if (isWindow(scrollElement)) {
    const { innerHeight, innerWidth } = window;
    return {
      height: typeof innerHeight === 'number' ? innerHeight : 0,
      width: typeof innerWidth === 'number' ? innerWidth : 0,
    };
  } else {
    return getBoundingBox(scrollElement);
  }
}

/**
 * Gets the vertical and horizontal position of an element within its scroll container.
 * Elements that have been “scrolled past” return negative values.
 * Handles edge-case where a user is navigating back (history) from an already-scrolled page.
 * In this case the body’s top or left position will be a negative number and this element’s top or left will be increased (by that amount).
 */
export function getPositionOffset(element, container) {
  if (isWindow(container) && document.documentElement) {
    const containerElement = document.documentElement;
    const elementRect = getBoundingBox(element);
    const containerRect = getBoundingBox(containerElement);
    return {
      top: elementRect.top - containerRect.top,
      left: elementRect.left - containerRect.left,
    };
  } else {
    const scrollOffset = getScrollOffset(container);
    const elementRect = getBoundingBox(element);
    const containerRect = getBoundingBox(container);
    return {
      top: elementRect.top + scrollOffset.top - containerRect.top,
      left: elementRect.left + scrollOffset.left - containerRect.left,
    };
  }
}

/**
 * Gets the vertical and horizontal scroll amount of the element, accounting for IE compatibility
 * and API differences between `window` and other DOM elements.
 */
export function getScrollOffset(element) {
  if (isWindow(element) && document.documentElement) {
    return {
      top:
        'scrollY' in window
          ? window.scrollY
          : document.documentElement.scrollTop,
      left:
        'scrollX' in window
          ? window.scrollX
          : document.documentElement.scrollLeft,
    };
  } else {
    return {
      top: element.scrollTop,
      left: element.scrollLeft,
    };
  }
}
