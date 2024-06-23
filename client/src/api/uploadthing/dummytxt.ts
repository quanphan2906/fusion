export const fetchText = () => {
  return new Promise<{ original: string, revised: string }[]>((resolve) => {
    setTimeout(() => {
      resolve([
        {
          original: "The best way to get started is to quit talking and begin doing.",
          revised: "The optimal way to start is to stop talking and take action."
        },
        {
          original: "The pessimist sees difficulty in every opportunity.",
          revised: "The pessimist finds obstacles in every chance."
        },
        {
          original: "Don’t let yesterday take up too much of today.",
          revised: "Don’t allow yesterday to consume today."
        },
        {
          original: "You learn more from failure than from success.",
          revised: "Failures provide more lessons than successes."
        },
        {
          original: "It’s not whether you get knocked down, it’s whether you get up.",
          revised: "What matters is not falling, but rising after the fall."
        }
      ]);
    }, 1000); // Simulate a delay
  });
};
