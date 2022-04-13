;(() => {
  // ../pkg/wasm_game.js
  var import_meta = {}
  var wasm
  var heap = new Array(32).fill(void 0)
  heap.push(void 0, null, true, false)
  function getObject(idx) {
    return heap[idx]
  }
  var heap_next = heap.length
  function dropObject(idx) {
    if (idx < 36) return
    heap[idx] = heap_next
    heap_next = idx
  }
  function takeObject(idx) {
    const ret = getObject(idx)
    dropObject(idx)
    return ret
  }
  function addHeapObject(obj) {
    if (heap_next === heap.length) heap.push(heap.length + 1)
    const idx = heap_next
    heap_next = heap[idx]
    heap[idx] = obj
    return idx
  }
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
  function isLikeNone(x) {
    return x === void 0 || x === null
  }
  function handleError(f, args) {
    try {
      return f.apply(this, args)
    } catch (e) {
      wasm.__wbindgen_exn_store(addHeapObject(e))
    }
  }
  function getArrayU8FromWasm0(ptr, len) {
    return getUint8Memory0().subarray(ptr / 1, ptr / 1 + len)
  }
  var Direction = Object.freeze({ Up: 0, 0: 'Up', Down: 1, 1: 'Down', Left: 2, 2: 'Left', Right: 3, 3: 'Right' })
  var GameState = Object.freeze({ Stop: 0, 0: 'Stop', Run: 1, 1: 'Run' })
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
      return ret
    }
    get_reward_cell() {
      var ret = wasm.world_get_reward_cell(this.ptr)
      return ret
    }
    snake_cells() {
      var ret = wasm.world_snake_cells(this.ptr)
      return ret
    }
    snake_length() {
      var ret = wasm.world_snake_length(this.ptr)
      return ret
    }
    update_snake(input) {
      var ret = wasm.world_update_snake(this.ptr, isLikeNone(input) ? 4 : input)
      return ret >>> 0
    }
    game_rest(width, index) {
      var ret = wasm.world_game_rest(this.ptr, width, index)
      return World.__wrap(ret)
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
    imports.wbg.__wbg_getRandomValues_fb6b088efb6bead2 = function () {
      return handleError(function (arg0, arg1) {
        getObject(arg0).getRandomValues(getObject(arg1))
      }, arguments)
    }
    imports.wbg.__wbg_randomFillSync_654a7797990fb8db = function () {
      return handleError(function (arg0, arg1, arg2) {
        getObject(arg0).randomFillSync(getArrayU8FromWasm0(arg1, arg2))
      }, arguments)
    }
    imports.wbg.__wbg_static_accessor_NODE_MODULE_33b45247c55045b0 = function () {
      var ret = module
      return addHeapObject(ret)
    }
    imports.wbg.__wbindgen_object_drop_ref = function (arg0) {
      takeObject(arg0)
    }
    imports.wbg.__wbg_process_70251ed1291754d5 = function (arg0) {
      var ret = getObject(arg0).process
      return addHeapObject(ret)
    }
    imports.wbg.__wbindgen_is_object = function (arg0) {
      const val = getObject(arg0)
      var ret = typeof val === 'object' && val !== null
      return ret
    }
    imports.wbg.__wbg_versions_b23f2588cdb2ddbb = function (arg0) {
      var ret = getObject(arg0).versions
      return addHeapObject(ret)
    }
    imports.wbg.__wbg_node_61b8c9a82499895d = function (arg0) {
      var ret = getObject(arg0).node
      return addHeapObject(ret)
    }
    imports.wbg.__wbindgen_is_string = function (arg0) {
      var ret = typeof getObject(arg0) === 'string'
      return ret
    }
    imports.wbg.__wbg_require_2a93bc09fee45aca = function () {
      return handleError(function (arg0, arg1, arg2) {
        var ret = getObject(arg0).require(getStringFromWasm0(arg1, arg2))
        return addHeapObject(ret)
      }, arguments)
    }
    imports.wbg.__wbg_crypto_2f56257a38275dbd = function (arg0) {
      var ret = getObject(arg0).crypto
      return addHeapObject(ret)
    }
    imports.wbg.__wbg_msCrypto_d07655bf62361f21 = function (arg0) {
      var ret = getObject(arg0).msCrypto
      return addHeapObject(ret)
    }
    imports.wbg.__wbg_newnoargs_f579424187aa1717 = function (arg0, arg1) {
      var ret = new Function(getStringFromWasm0(arg0, arg1))
      return addHeapObject(ret)
    }
    imports.wbg.__wbg_call_89558c3e96703ca1 = function () {
      return handleError(function (arg0, arg1) {
        var ret = getObject(arg0).call(getObject(arg1))
        return addHeapObject(ret)
      }, arguments)
    }
    imports.wbg.__wbg_self_e23d74ae45fb17d1 = function () {
      return handleError(function () {
        var ret = self.self
        return addHeapObject(ret)
      }, arguments)
    }
    imports.wbg.__wbg_window_b4be7f48b24ac56e = function () {
      return handleError(function () {
        var ret = window.window
        return addHeapObject(ret)
      }, arguments)
    }
    imports.wbg.__wbg_globalThis_d61b1f48a57191ae = function () {
      return handleError(function () {
        var ret = globalThis.globalThis
        return addHeapObject(ret)
      }, arguments)
    }
    imports.wbg.__wbg_global_e7669da72fd7f239 = function () {
      return handleError(function () {
        var ret = global.global
        return addHeapObject(ret)
      }, arguments)
    }
    imports.wbg.__wbindgen_is_undefined = function (arg0) {
      var ret = getObject(arg0) === void 0
      return ret
    }
    imports.wbg.__wbg_buffer_5e74a88a1424a2e0 = function (arg0) {
      var ret = getObject(arg0).buffer
      return addHeapObject(ret)
    }
    imports.wbg.__wbg_new_e3b800e570795b3c = function (arg0) {
      var ret = new Uint8Array(getObject(arg0))
      return addHeapObject(ret)
    }
    imports.wbg.__wbg_set_5b8081e9d002f0df = function (arg0, arg1, arg2) {
      getObject(arg0).set(getObject(arg1), arg2 >>> 0)
    }
    imports.wbg.__wbg_length_30803400a8f15c59 = function (arg0) {
      var ret = getObject(arg0).length
      return ret
    }
    imports.wbg.__wbg_newwithlength_5f4ce114a24dfe1e = function (arg0) {
      var ret = new Uint8Array(arg0 >>> 0)
      return addHeapObject(ret)
    }
    imports.wbg.__wbg_subarray_a68f835ca2af506f = function (arg0, arg1, arg2) {
      var ret = getObject(arg0).subarray(arg1 >>> 0, arg2 >>> 0)
      return addHeapObject(ret)
    }
    imports.wbg.__wbindgen_object_clone_ref = function (arg0) {
      var ret = getObject(arg0)
      return addHeapObject(ret)
    }
    imports.wbg.__wbindgen_throw = function (arg0, arg1) {
      throw new Error(getStringFromWasm0(arg0, arg1))
    }
    imports.wbg.__wbindgen_memory = function () {
      var ret = wasm.memory
      return addHeapObject(ret)
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

  // utils/index.js
  function randomPointer(max) {
    return Math.floor(Math.random() * max)
  }

  // index.ts
  wasm_game_default().then(wasm2 => {
    const worldWidth = 20
    const cell_size = 20
    let fps = 2
    const spawnPoint = randomPointer(worldWidth * worldWidth)
    let world = World.new(worldWidth, spawnPoint)
    const canvas = document.getElementById('snake-canvas')
    const context = canvas.getContext('2d')
    canvas.width = worldWidth * cell_size
    canvas.height = worldWidth * cell_size
    let gameRunner = null
    let gameCanvas = null
    const run = () => {
      let len = world.snake_length()
      fps = Math.floor(len / 10) + 1
      gameRunner = setTimeout(() => {
        context.clearRect(0, 0, canvas.width, canvas.height)
        let state = world.update_snake()
        if (state === GameState.Stop) {
          clearTimeout(gameRunner)
          window.cancelAnimationFrame(gameCanvas)
          alert('\u6E38\u620F\u5931\u8D25')
          const restPoint = randomPointer(worldWidth * worldWidth)
          world = world.game_rest(worldWidth, restPoint)
          context.clearRect(0, 0, canvas.width, canvas.height)
          initCanvas(wasm2, world, context, worldWidth, cell_size)
          snake_move(world)
        } else {
          initCanvas(wasm2, world, context, worldWidth, cell_size)
          gameCanvas = requestAnimationFrame(run)
        }
      }, 1e3 / fps)
    }
    initCanvas(wasm2, world, context, worldWidth, cell_size)
    game_control(run)
    snake_move(world)
  })
  var initCanvas = (wasm2, world, context, worldWidth, cell_size) => {
    draw(context, worldWidth, cell_size)
    drawSnake(wasm2, world, context, worldWidth, cell_size)
    drawReward(world, context, worldWidth, cell_size)
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
  var drawSnake = (wasm2, world, context, worldWidth, cell_size) => {
    drawSnakeCells(wasm2, world, context, worldWidth, cell_size)
  }
  var drawSnakeCells = (wasm2, world, context, worldWidth, cell_size) => {
    const snakeCells = new Uint32Array(wasm2.memory.buffer, world.snake_cells(), world.snake_length())
    context.beginPath()
    snakeCells.forEach((item, index) => {
      const row = Math.floor(item / worldWidth)
      const col = item % worldWidth
      context.fillStyle = index === 0 ? 'green' : '#000000'
      context.fillRect(col * cell_size, row * cell_size, cell_size, cell_size)
    })
    context.stroke()
  }
  var drawReward = (world, context, worldWidth, cell_size) => {
    const index = world.get_reward_cell()
    const row = Math.floor(index / worldWidth)
    const col = index % worldWidth
    context.beginPath()
    context.fillStyle = '#FF0000'
    context.fillRect(col * cell_size, row * cell_size, cell_size, cell_size)
    context.stroke()
  }
  var snake_move = world => {
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
  var game_control = run => {
    let controlBtn = document.getElementById('game_control')
    controlBtn.addEventListener('click', () => {
      run()
    })
  }
})()
