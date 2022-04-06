/*
 * @Author: Linken
 * @Date: 2022-04-04 21:38:06
 * @LastEditTime: 2022-04-06 21:26:44
 * @LastEditors: Linken
 * @Description: 学习wasm
 * @FilePath: \wasm-game\www\index.ts
 * 学习wasm,实现贪吃蛇
 */

import init, { World, Direction } from 'wasm_game'
import { randomPointer } from './utils/index'
init().then(wasm => {
  const worldWidth = 20
  const cell_size = 20
  const fps = 2
  const spawnPoint = randomPointer(worldWidth * worldWidth)
  const world = World.new(worldWidth, spawnPoint)
  const canvas = <HTMLCanvasElement>document.getElementById('snake-canvas')
  const context = canvas.getContext('2d')
  canvas.width = worldWidth * cell_size
  canvas.height = worldWidth * cell_size

  const run = () => {
    setTimeout(() => {
      context.clearRect(0, 0, canvas.width, canvas.height)
      world.update_snake()
      initCanvas(wasm, world, context, worldWidth, cell_size)
      requestAnimationFrame(run)
    }, 1000 / fps)
  }

  initCanvas(wasm, world, context, worldWidth, cell_size)
  run()
  snake_move(world)
})
// init
const initCanvas = (wasm, world, context, worldWidth, cell_size) => {
  draw(context, worldWidth, cell_size)
  drawSnake(wasm, world, context, worldWidth, cell_size)
  drawReward(world, context, worldWidth, cell_size)
}

//画布方法
const draw = (context, worldWidth, cell_size) => {
  context.beginPath()
  for (let i = 0; i < worldWidth + 1; i++) {
    context.moveTo(cell_size * i, 0)
    context.lineTo(cell_size * i, cell_size * worldWidth)
  }

  for (let x = 0; x < worldWidth + 1; x++) {
    context.moveTo(0, cell_size * x)
    context.lineTo(cell_size * worldWidth, cell_size * x)
  }

  context.stroke()
}

//画蛇
const drawSnake = (wasm, world, context, worldWidth, cell_size) => {
  drawSnakeCells(wasm, world, context, worldWidth, cell_size)
  context.stroke()
}

//蛇身
const drawSnakeCells = (wasm, world, context, worldWidth, cell_size) => {
  const snakeCells = new Uint32Array(wasm.memory.buffer, world.snake_cells(), world.snake_length())
  snakeCells.forEach((item, index) => {
    const row = Math.floor(item / worldWidth)
    const col = item % worldWidth
    context.beginPath()
    context.fillStyle = index ? '#000000' : 'green'
    context.fillRect(col * cell_size, row * cell_size, cell_size, cell_size)
  })
}

//奖励
const drawReward = (world, context, worldWidth, cell_size) => {
  const index = world.reward_cell()
  const row = Math.floor(index / worldWidth)
  const col = index % worldWidth

  context.beginPath()
  context.fillStyle = '#FF0000'
  context.fillRect(col * cell_size, row * cell_size, cell_size, cell_size)
  context.stroke()
}

//移动
const snake_move = world => {
  document.addEventListener('keyup', e => {
    switch (e.code) {
      case 'ArrowDown':
        world.update_snake(Direction.Down)
        break
      case 'ArrowUp':
        world.update_snake(Direction.Up)
        break
      case 'ArrowLeft':
        world.update_snake(Direction.Left)
        break
      case 'ArrowRight':
        world.update_snake(Direction.Right)
        break
    }
  })
}
