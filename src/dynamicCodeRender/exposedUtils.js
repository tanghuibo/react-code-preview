import * as React from "react";
import * as Antd from 'antd';
import * as AntdIcon from '@ant-design/icons';

const exposedMap = {
    react: React,
    antd: Antd,
    '@ant-design/icons': AntdIcon,
};


export const exposedMapConvert = name => {
    const data = exposedMap[name];
    if(data == null) {
        throw new Error("don't have " + name);
    }
    return data;
}