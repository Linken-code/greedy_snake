;(() => {
  // ../pkg/wasm_game.js
  var import_meta = {}
  var wasm
  var cachedTextDecoder = new TextDecoder('utf-8', { ignoreBOM: true, fatal: true })
  cachedTextDecoder.decode()
  var cachegetUint8Memory0 = null
  function getUint8Memory0() {
    if (cachegetUint8Memory0 === null || cachegetUint8Memory0.buffer !== wasm.memory.buffer) {
      cachegetUint8Memory0 = new Uint8Array(wasm.memory.buffer)
    }
    return cachegetUint8Memory0
  }
  function getStringFromWasm0(ptr, len) {
    return cachedTextDecoder.decode(getUint8Memory0().subarray(ptr, ptr + len))
  }
  var World = class {
    static __wrap(ptr) {
      const obj = Object.create(World.prototype)
      obj.ptr = ptr
      return obj
    }
    __destroy_into_raw() {
      const ptr = this.ptr
      this.ptr = 0
      return ptr
    }
    free() {
      const ptr = this.__destroy_into_raw()
      wasm.__wbg_world_free(ptr)
    }
    static new(width, index) {
      var ret = wasm.world_new(width, index)
      return World.__wrap(ret)
    }
    snake_spawn() {
      var ret = wasm.world_snake_spawn(this.ptr)
      return ret >>> 0
    }
    update_snake() {
      wasm.world_update_snake(this.ptr)
    }
  }
  async function load(module, imports) {
    if (typeof Response === 'function' && module instanceof Response) {
      if (typeof WebAssembly.instantiateStreaming === 'function') {
        try {
          return await WebAssembly.instantiateStreaming(module, imports)
        } catch (e) {
          if (module.headers.get('Content-Type') != 'application/wasm') {
            console.warn(
              '`WebAssembly.instantiateStreaming` failed because your server does not serve wasm with `application/wasm` MIME type. Falling back to `WebAssembly.instantiate` which is slower. Original error:\n',
              e
            )
          } else {
            throw e
          }
        }
      }
      const bytes = await module.arrayBuffer()
      return await WebAssembly.instantiate(bytes, imports)
    } else {
      const instance = await WebAssembly.instantiate(module, imports)
      if (instance instanceof WebAssembly.Instance) {
        return { instance, module }
      } else {
        return instance
      }
    }
  }
  async function init(input) {
    if (typeof input === 'undefined') {
      input = new URL('wasm_game_bg.wasm', import.meta.url)
    }
    const imports = {}
    imports.wbg = {}
    imports.wbg.__wbindgen_throw = function (arg0, arg1) {
      throw new Error(getStringFromWasm0(arg0, arg1))
    }
    if (
      typeof input === 'string' ||
      (typeof Request === 'function' && input instanceof Request) ||
      (typeof URL === 'function' && input instanceof URL)
    ) {
      input = fetch(input)
    }
    const { instance, module } = await load(await input, imports)
    wasm = instance.exports
    init.__wbindgen_wasm_module = module
    return wasm
  }
  var wasm_game_default = init

  // index.ts
  wasm_game_default().then(() => {
    const worldWidth = 20
    const cell_size = 20
    const fps = 2
    const world = World.new(worldWidth, 12)
    const canvas = document.getElementById('snake-canvas')
    const context = canvas.getContext('2d')
    canvas.width = worldWidth * cell_size
    canvas.height = worldWidth * cell_size
    const run = () => {
      setTimeout(() => {
        context.clearRect(0, 0, canvas.width, canvas.height)
        world.update_snake()
        initCanvas(world, context, worldWidth, cell_size)
        requestAnimationFrame(run)
      }, 1e3 / fps)
    }
    initCanvas(world, context, worldWidth, cell_size)
    run()
  })
  var initCanvas = (world, context, worldWidth, cell_size) => {
    draw(context, worldWidth, cell_size)
    drawSnake(world, context, worldWidth, cell_size)
  }
  var draw = (context, worldWidth, cell_size) => {
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
  var drawSnake = (world, context, worldWidth, cell_size) => {
    const snake_index = world.snake_spawn()
    const row = Math.floor(snake_index / worldWidth)
    const col = snake_index % worldWidth
    context.beginPath()
    context.fillRect(col * cell_size, row * cell_size, cell_size, cell_size)
    context.stroke()
  }
})()
