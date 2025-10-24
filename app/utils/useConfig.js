// utils/config.js
export const useConfig = () => {
    const config = useRuntimeConfig();
    return {
        version: config.public.version,
        basePath: config.public.basePath,
        imgPath: config.public.imgPath
    };
};
