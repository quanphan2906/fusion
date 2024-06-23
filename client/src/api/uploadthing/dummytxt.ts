export const fetchText = () => {
    return new Promise<string[]>((resolve) => {
      setTimeout(() => {
        resolve([
          "The best way to get started is to quit talking and begin doing.",
          "The pessimist sees difficulty in every opportunity.",
          "Don’t let yesterday take up too much of today.",
          "You learn more from failure than from success.",
          "It’s not whether you get knocked down, it’s whether you get up."
        ]);
      }, 1000); // Simulate a delay
    });
  };
  