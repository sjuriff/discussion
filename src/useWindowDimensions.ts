import { useState, useEffect } from "react";

type WindowDimensions = {
    width: number | undefined;
    height: number | undefined;
};
//Some code to check the window dimensions. Since the component(even tho it is a client component) is rendered on severside
//we can't use the window object. So i needed to use this code. Propaply way to complex and heacy to do something as
//small as changing the popOver placement in the PostCreateForm. But i wanted to try to see if it worked
const useWindowDimensions = (): WindowDimensions => {
    const [windowDimensions, setWindowDimensions] = useState<WindowDimensions>({
        width: undefined,
        height: undefined,
    });

    useEffect(() => {
        function handleResize() {
            setWindowDimensions({
                width: window.innerWidth,
                height: window.innerHeight,
            });
        }
        handleResize();
        window.addEventListener("resize", handleResize);
        return (): void => window.removeEventListener("resize", handleResize);
    }, []);
    return windowDimensions;
}

export default useWindowDimensions