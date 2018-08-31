import resolve from 'rollup-plugin-node-resolve'
import commonjs from 'rollup-plugin-commonjs'
import builtins from 'rollup-plugin-node-builtins'
import globals from 'rollup-plugin-node-globals'
import json from 'rollup-plugin-json'
import babel from 'rollup-plugin-babel'

export default {
  plugins: [
    babel({
      babelrc: false,
      presets: [['@babel/preset-env', { modules: false }]]
    }),
    resolve({
      browser: true,
      extensions: [ '.js', '.json' ],
      preferBuiltins: false
    }),
    commonjs({
      namedExports: { 'dist/index.js': ['md2sb' ] }
    }),
    json(),
    globals(),
    builtins()
  ]
}
