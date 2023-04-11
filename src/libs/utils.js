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
