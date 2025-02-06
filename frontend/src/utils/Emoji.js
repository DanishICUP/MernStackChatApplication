const emojis = [
    "😀", "😂", "😍", "🥳", "😎", "🤔", "🙈", "🎉", "💖", "🔥", 
    "🌟", "🍕", "🐱", "🐶", "🦄", "🚀", "🌈", "🍔", "🍩", "⚽", 
    "🎵", "🎮", "📚", "✈️", "🌍", "🎂", "🧸", "💡", "🔒", "🏆"
  ];
  
  // Function to generate a random emoji
  const getRandomEmoji = () => {
    const randomIndex = Math.floor(Math.random() * emojis.length);
    return emojis[randomIndex];
  };
  
  export default getRandomEmoji;
  