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
