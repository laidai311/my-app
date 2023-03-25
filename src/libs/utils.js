
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
