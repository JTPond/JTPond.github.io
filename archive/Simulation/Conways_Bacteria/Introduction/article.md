![Sample Board](./assets/header.gif)

# Conway's Bacteria

*Modified rules for Conway's game of life with colony forming behavior.*

## Repository

[GitHub](https://github.com/JTPond/Conways_Bacteria)

**Please leave comments as issue threads**

## Context

While watching a popular YouTube video introduction to Conway's Game of Life, I noticed that all the clips they showed of pixel art animations of a GoL board looked like little bacteria. That started getting me interested in how it produces stable states, or "colonies". This was when I started looking into writing my own version in Rust. My first instinct was to see what would happen if a cell could gain height in certain situations. This project is the result of research into that idea.

Another thing I'm doing with this project is practicing a number of techniques that I think will be important in future projects, like collecting data with Calcify and analyzing it with ICalcify, outputting animations using the gif crate, and using rayon for multiprocessing. Conway's Bacteria uses all of these things, and I couldn't be more happy with how it's going.

## Basic Rules

  0. Fixed border board, no infinite, or periodic boundary conditions.
  1. If a Cell and all of it's neighbors are either 0 or 1, then follow standard [CGoL rules](https://en.wikipedia.org/wiki/Conway%27s_Game_of_Life).
  2. If a Cell has exactly 4 neighbors, one on each side, or one on each corner, it starts a Colony with its neighbors and grows to 2. Now it and all of it's neighbors follow Colony rules.
  3. If a cell is in a Colony, but with a height of 0, then if the sum of its neighbors' heights is greater or equal to 4 times its tallest neighbor then it goes to 1.
  4. If a cell is in a Colony, but with a height of 1 to one less than the maximum height, then if the sum of its neighbors' heights is greater or equal to 8 times its own height then it increases by 1.
  5. If a cell is at the maximum height or any of it's neighbors are one less than the maximum height, or greater, the cell is stable and nothing happens.

## Code

I went very simple with the program itself, and there are some upgrades I could do to cut down on compiles between runs, but it's a single file, so as long as I'm not updating my dependencies it compiles super fast.

### Rules

This is how the algorithm above is handled, the `self` being mentioned is the `Bacteria` struct that these functions implement.

```rust
  fn single_tick(&mut self) {
      let t_sum: u16 = self.neighbors.iter().sum();
      if t_sum == 3 {
          if self.height == 0 {
              self.height = 1;
          }
      }
      else if t_sum < 2 || t_sum > 3{
          if t_sum == 4 {
              let e_sum: u16 = self.neighbors.iter().enumerate()
              			.filter(|(i,_)| i%2 == 0).map(|(_,x)| x).sum();
              let o_sum: u16 = self.neighbors.iter().enumerate()
              			.filter(|(i,_)| i%2 != 0).map(|(_,x)| x).sum();
              if e_sum == 4 || o_sum == 4 {
                  self.height += 1;
              } else {
                  if self.height == 1 {
                      self.height = 0;
                  }
              }
          } else {
              if self.height == 1 {
                  self.height = 0;
              }
          }
      }
  }

  fn colony_tick(&mut self, n_max: u16) {
      let t_sum: u16 = self.neighbors.iter().sum::<u16>();
      if t_sum >= (8*(self.height-1)).into() {
          if self.height > 0 {
              self.height += 1;
          }
      }
      else if self.height == 0 {
          if t_sum >= 4*n_max {
              self.height += 1;
          }
      }
  }

  pub fn tick(&mut self) {
      if let Some(n_max) = self.neighbors.iter().max() {
          let b_max = *n_max;
          if b_max <= 1 && self.height <= 1 {
              self.single_tick();
          } else if b_max < 3 && self.height <= 3  {
              self.colony_tick(b_max);
          }
      }
  }
```

Check out the rest on [GitHub](https://github.com/JTPond/Conways_Bacteria)

## Things I'm interested in

So far in my research I've found interesting variability in both how much of the board is seeded (sneezed on?) and also the maximum allowed height. I've seen this affect the time to a max height colony, the length of the initial dip in number of live cells, and the time to a stable board where the total height on the board stops growing.
