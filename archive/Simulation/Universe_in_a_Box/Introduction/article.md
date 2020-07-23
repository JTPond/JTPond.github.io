# Universe in a Box

In Physics the phrase "You don't want to put the universe in a box" comes up a lot. Well after I first learned about the [Velocity Verlet](https://en.wikipedia.org/wiki/Verlet_integration) method of solving Newton's equations it's been my favorite test bed for practicing new languages and methods. I've done it in [Python](https://github.com/JTPond/universe-in-a-box), (which is not very good), Java, and most recently Rust in the form of the [Calcify Example](https://github.com/JTPond/calcify/tree/master/examples/universe_in_a_box).

The Rust example is my favorite and currently uses most of the most recent features in Calcify. It relies on Rayon for multithreading and actually runs pretty fast on my 3700x.

I plan on writing an article in the future looking at some of the results I've gotten in the past and maybe doing some more experiments with different objects mixed in with the simple particles. 
