export const sleep = (ms) =>

    new Promise((resolve) => setTimeout(resolve, ms));

export const truncate = (text, length = 50) => {

    if (!text) return "";

    return text.length > length
        ? `${text.substring(0, length)}...`
        : text;

};