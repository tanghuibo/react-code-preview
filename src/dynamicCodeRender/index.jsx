import React, { useEffect, useState } from 'react';
import { transformToEs5 } from './babelUtils';
import { exposedMapConvert } from './exposedUtils';

const DynamicCodeRender = ({ code, params = {}, onError }) => {
    const [renderInfo, setRenderInfo] = useState(null);
    const processError = e => {
        if (onError) {
            onError(e);
        } else {
            console.error(e);
            throw e;
        }
    }
    useEffect(() => {
        if (code == null || code.trim() === '') {
            return;
        }
        try {
            const es5Code = transformToEs5(code);
            const temp = {};
            const define = (names, defineFunc) => defineFunc(...names.map((name, index) => index === 0 ? temp : exposedMapConvert(name)));
            eval(es5Code);
            setRenderInfo({
                Component: params => {
                    try {
                        const exportDefaultComponent = temp.default;
                        return exportDefaultComponent(params);
                    } catch(e) {
                        processError(e);
                        return null;
                    }
                },
            });

        } catch (e) {
            processError(e);
        }

    }, [code]);


    return renderInfo && <renderInfo.Component {...params} />
}

export default DynamicCodeRender;