export const transformToEs5 = code => window.Babel.transform(code, {
    presets: ['es2015'],
    plugins: ['transform-react-jsx', 'transform-modules-amd'],
}).code;