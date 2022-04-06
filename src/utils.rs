use rand::Rng;

pub fn random() -> i32 {
    let mut rng = rand::thread_rng();
    let random = rng.gen_range(0..400);
    random
}
