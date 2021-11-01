import { babel } from '@rollup/plugin-babel';

const plugins = [
    babel({
        babelHelpers: 'bundled',
    }),
];

const files = ['index.js', 'Result.js', 'Maybe.js'];

export default files.map((srcFile) => ({
    input: 'src/' + srcFile,
    plugins,
    output: {
        format: 'es',
        file: 'dist/es/' + srcFile,
    },
}));
