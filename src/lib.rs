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
struct SnakeCell(i32);

#[wasm_bindgen]
pub struct Snake {
    body: Vec<SnakeCell>,
    direction: Direction,
}

impl Snake {
    pub fn new(spawn_index: i32) -> Snake {
        Self {
            body: vec![SnakeCell(spawn_index)],
            direction: Direction::Right,
        }
    }
}

#[wasm_bindgen]
pub struct World {
    width: i32,
    snake: Snake,
}

#[wasm_bindgen]
impl World {
    pub fn new(width: i32, index: i32) -> World {
        Self {
            width,
            snake: Snake::new(index),
        }
    }

    pub fn snake_spawn(&self) -> i32 {
        self.snake.body[0].0
    }

    pub fn update_snake(&mut self, input: Option<Direction>) {
        let snake_head = self.snake_spawn();
        let (row, col) = (snake_head / self.width, snake_head % self.width);
        if let Some(direction) = input {
            self.snake.direction = direction
        }
        let (x, y) = match self.snake.direction {
            Direction::Up => ((row - 1) % self.width, col),
            Direction::Down => ((row + 1) % self.width, col),
            Direction::Left => (row, (col - 1) % self.width),
            Direction::Right => (row, (col + 1) % self.width),
        };
        self.snake.body[0].0 = (x * self.width) + y;
    }
}

#[wasm_bindgen]
#[derive(PartialEq, Clone, Copy)]
pub enum Direction {
    Up,
    Down,
    Left,
    Right,
}
