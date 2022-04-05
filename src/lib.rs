mod utils;
use wasm_bindgen::prelude::*;
use wee_alloc::WeeAlloc;

// When the `wee_alloc` feature is enabled, use `wee_alloc` as the global
// allocator.
#[global_allocator]
static ALLOC: WeeAlloc = WeeAlloc::INIT;

#[wasm_bindgen]
extern "C" {
    fn alert(s: &str);
}

#[wasm_bindgen]
struct SnakeCell(usize);

#[wasm_bindgen]
pub struct Snake {
    body: Vec<SnakeCell>,
}

impl Snake {
    pub fn new(spawn_index: usize) -> Snake {
        Self {
            body: vec![SnakeCell(spawn_index)],
        }
    }
}

#[wasm_bindgen]
pub struct World {
    width: usize,
    size: usize,
    snake: Snake,
}

#[wasm_bindgen]
impl World {
    pub fn new(width: usize, index: usize) -> World {
        Self {
            width,
            size: width * width,
            snake: Snake::new(index),
        }
    }

    pub fn snake_spawn(&self) -> usize {
        self.snake.body[0].0
    }

    pub fn update_snake(&mut self) {
        let snake_head = self.snake_spawn();
        self.snake.body[0].0 = (snake_head + 1) % self.size;
    }
}
