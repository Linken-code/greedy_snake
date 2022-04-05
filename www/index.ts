/*
 * @Author: Linken
 * @Date: 2022-04-04 21:38:06
 * @LastEditTime: 2022-04-05 23:06:38
 * @LastEditors: Linken
 * @Description: 学习wasm
 * @FilePath: \wasm-game\www\index.ts
 * 学习wasm,实现贪吃蛇
 */

import init, { World, Direction } from 'wasm_game'

init().then(() => {
  const worldWidth = 20
  const cell_size = 20
  const fps = 1
  const spawnPoint = Date.now() % (worldWidth * worldWidth)
  const world = World.new(worldWidth, spawnPoint)
  const canvas = <HTMLCanvasElement>document.getElementById('snake-canvas')
  const context = canvas.getContext('2d')
  canvas.width = worldWidth * cell_size
  canvas.height = worldWidth * cell_size

  const run = () => {
    setTimeout(() => {
      context.clearRect(0, 0, canvas.width, canvas.height)
      world.update_snake()
      initCanvas(world, context, worldWidth, cell_size)
      requestAnimationFrame(run)
    }, 1000 / fps)
  }

  initCanvas(world, context, worldWidth, cell_size)
  run()
  snake_move(world)
})
// init
const initCanvas = (world, context, worldWidth, cell_size) => {
  draw(context, worldWidth, cell_size)
  drawSnake(world, context, worldWidth, cell_size)
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
const drawSnake = (world, context, worldWidth, cell_size) => {
  const snake_index = world.snake_spawn()
  const row = Math.floor(snake_index / worldWidth)
  const col = snake_index % worldWidth

  context.beginPath()
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
