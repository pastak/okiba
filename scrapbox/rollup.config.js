import resolve from 'rollup-plugin-node-resolve'
import commonjs from 'rollup-plugin-commonjs'
import builtins from 'rollup-plugin-node-builtins'
import globals from 'rollup-plugin-node-globals'
import json from 'rollup-plugin-json'

export default {
  plugins: [
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
