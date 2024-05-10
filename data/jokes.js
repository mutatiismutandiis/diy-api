import { v4 as uuidv4 } from "uuid";

// Array with all the jokes
export const jokes = [
  {
    id: uuidv4(),
    jokeText:
      "Why don't scientists trust atoms? Because they make up everything.",
    jokeType: "Science",
  },
  {
    id: uuidv4(),
    jokeText:
      "Why did the scarecrow win an award? Because he was outstanding in his field.",
    jokeType: "Puns",
  },
  {
    id: uuidv4(),
    jokeText:
      "I told my wife she was drawing her eyebrows too high. She looked surprised.",
    jokeType: "Puns",
  },
  {
    id: uuidv4(),
    jokeText:
      "What did one ocean say to the other ocean? Nothing, they just waved.",
    jokeType: "Wordplay",
  },
  {
    id: uuidv4(),
    jokeText:
      "Why do we never tell secrets on a farm? Because the potatoes have eyes and the corn has ears.",
    jokeType: "Wordplay",
  },
  {
    id: uuidv4(),
    jokeText: "How do you organize a space party? You planet!",
    jokeType: "Science",
  },
  {
    id: uuidv4(),
    jokeText:
      "Why don't some couples go to the gym? Because some relationships don't work out.",
    jokeType: "Puns",
  },
  {
    id: uuidv4(),
    jokeText:
      "Parallel lines have so much in common. It's a shame they'll never meet.",
    jokeType: "Math",
  },
  {
    id: uuidv4(),
    jokeText: "What do you call fake spaghetti? An impasta!",
    jokeType: "Food",
  },
  {
    id: uuidv4(),
    jokeText: "Why did the tomato turn red? Because it saw the salad dressing!",
    jokeType: "Food",
  },
  {
    id: uuidv4(),
    jokeText:
      "What do you get when you cross a snowman and a vampire? Frostbite!",
    jokeType: "Wordplay",
  },
  {
    id: uuidv4(),
    jokeText:
      "Why did the golfer bring two pairs of pants? In case he got a hole in one!",
    jokeType: "Sports",
  },
  {
    id: uuidv4(),
    jokeText:
      "Why are ghosts bad at lying? Because you can see right through them!",
    jokeType: "Wordplay",
  },
  {
    id: uuidv4(),
    jokeText: "Why can't you give Elsa a balloon? Because she will let it go.",
    jokeType: "Movies",
  },
  {
    id: uuidv4(),
    jokeText:
      "I'm reading a book about anti-gravity. It's impossible to put down!",
    jokeType: "Science",
  },
];

// Array with types
export const jokeTypes = jokes.map((joke) => joke.jokeType);
