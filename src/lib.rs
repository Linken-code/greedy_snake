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

#[derive(Debug, PartialEq, Clone, Copy)]
pub struct SnakeCell(i32);

#[derive(Debug, PartialEq, Clone)]
pub struct Snake {
    body: Vec<SnakeCell>,
    direction: Direction,
}

impl Snake {
    pub fn new(spawn_index: i32) -> Snake {
        Self {
            body: vec![
                SnakeCell(spawn_index),
                SnakeCell(spawn_index - 1),
                SnakeCell(spawn_index - 2),
            ],
            direction: Direction::Down,
        }
    }
}

#[wasm_bindgen]
pub struct World {
    width: i32,
    snake: Snake,
    reward_cell: i32,
}

#[wasm_bindgen]
impl World {
    pub fn new(width: i32, index: i32) -> World {
        let snake = Snake::new(index);
        let reward_cell = World::new_reward_cell(&snake.body);
        World {
            width,
            reward_cell,
            snake,
        }
    }

    pub fn snake_spawn(&self) -> i32 {
        self.snake.body[0].0
    }

    fn new_reward_cell(snake_body: &Vec<SnakeCell>) -> i32 {
        let mut reward_cell;
        loop {
            reward_cell = utils::random();
            if !snake_body.contains(&SnakeCell(reward_cell)) {
                break;
            }
        }
        reward_cell
    }

    pub fn get_reward_cell(&self) -> i32 {
        self.reward_cell
    }

    pub fn snake_cells(&self) -> *const SnakeCell {
        self.snake.body.as_ptr()
    }

    pub fn snake_length(&self) -> i32 {
        self.snake.body.len() as i32
    }

    fn change_direction(&mut self, direction: Direction) -> (bool, GameState) {
        let mut state = GameState::Run;
        let mut run_direction = true;
        let snake_head = self.snake_spawn();
        let (row, col) = (snake_head / self.width, snake_head % self.width);
        let (x, y) = match self.snake.direction {
            Direction::Up if direction != Direction::Down => {
                self.snake.direction = direction;
                if row - 1 < 0 {
                    state = GameState::Stop;
                }
                ((row - 1), col)
            }
            Direction::Down if direction != Direction::Up => {
                self.snake.direction = direction;
                if row + 1 >= self.width {
                    state = GameState::Stop;
                }
                ((row + 1), col)
            }
            Direction::Left if direction != Direction::Right => {
                self.snake.direction = direction;
                if col - 1 < 0 {
                    state = GameState::Stop;
                }
                (row, (col - 1))
            }
            Direction::Right if direction != Direction::Left => {
                self.snake.direction = direction;
                if col + 1 >= self.width {
                    state = GameState::Stop;
                }
                (row, (col + 1))
            }
            _ => {
                run_direction = false;
                (row, col)
            }
        };

        match state {
            GameState::Run => {
                self.snake.body[0].0 = (x * self.width) + y;
                return (run_direction, state);
            }
            _ => return (run_direction, state),
        }
    }

    pub fn update_snake(&mut self, input: Option<Direction>) -> GameState {
        let right_direction: bool;
        let game_state;
        let temp = self.snake.body.clone();
        let len = self.snake.body.len();
        match input {
            Some(x) => {
                (right_direction, game_state) = self.change_direction(x);
            }
            None => {
                (right_direction, game_state) = self.change_direction(self.snake.direction);
            }
        }

        match game_state {
            GameState::Run if right_direction => {
                for i in 1..len {
                    self.snake.body[i] = temp[i - 1];
                }

                if self.snake.body[1..len].contains(&self.snake.body[0]) {
                    return GameState::Stop;
                }

                if self.reward_cell == self.snake_spawn() {
                    self.reward_cell = World::new_reward_cell(&self.snake.body);
                    self.snake.body.push(SnakeCell(self.snake.body[1].0));
                }
                return game_state;
            }
            _ => return GameState::Stop,
        }
    }

    pub fn game_rest(&mut self, width: i32, index: i32) -> Self {
        let world = World::new(width, index);
        Self { ..world }
    }
}

#[wasm_bindgen]
#[derive(Debug, PartialEq, Clone, Copy)]
pub enum Direction {
    Up,
    Down,
    Left,
    Right,
}

#[wasm_bindgen]
#[derive(Debug, Clone, Copy)]
pub enum GameState {
    Stop,
    Run,
}
