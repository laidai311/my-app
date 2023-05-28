export default {
    isAO(val) {
        return val instanceof Array || val instanceof Object;
    },
    isJSON(str) {
        try {
            return JSON.parse(str) && !!str;
        } catch (e) {
            return false;
        }
    },
    toSlug(s) {
        return s
            .toString()
            .normalize('NFD')
            .replace(/[\u0300-\u036f]/g, '') //remove diacritics
            .toLowerCase()
            .replace(/[đĐ]/g, 'd')
            .replace(/\s+/g, '-') //spaces to dashes
            .replace(/&/g, '-and-') //ampersand to and
            .replace(/[^\w\-]+/g, '') //remove non-words
            .replace(/\-\-+/g, '-') //collapse multiple dashes
            .replace(/^-+/, '') //trim starting dash
            .replace(/-+$/, ''); //trim ending dash
    },
    toCode(s) {
        return s
            .toString()
            .normalize('NFD')
            .replace(/[\u0300-\u036f]/g, '') //remove diacritics
            .toLowerCase()
            .replace(/[đĐ]/g, 'd')
            .replace(/&/g, ' and ') //ampersand to and
            .replace(/\s+/g, ' ') //spaces to dashes
            .replace(/[^\w\-]+/g, ' ') //remove non-words
            .trim();
    },
};
