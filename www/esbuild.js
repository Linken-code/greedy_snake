/*
 * @Author: Linken
 * @Date: 2022-04-04 22:21:44
 * @LastEditTime: 2022-04-09 20:36:48
 * @LastEditors: Linken
 * @Description: 学习wasm
 * @FilePath: \wasm-game\www\esbuild.js
 * 学习wasm,实现贪吃蛇
 */
require('esbuild')
  .build({
    entryPoints: ['index.ts'],
    bundle: true,
    target: ['chrome70'],
    outdir: 'public'
  })
  .catch(() => process.exit(1))
