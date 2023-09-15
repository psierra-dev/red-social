function timePost(date) {
  const now = new Date().getTime();
  const timePost = new Date(date).getTime();

  const minutes = (now - timePost) / (1000 * 60);
  console.log(minutes, "min");
  if (minutes <= 60) {
    return minutes;
  }
  const hours = (now - timePost) / (1000 * 60 * 60);
  return Math.round(hours);
}

const datePrueba = [
  "2023-09-14T19:05:46.799724+00:00",
  "2023-09-14T21:05:46.799724+00:00",
];

console.log(timePost(datePrueba[0]));
console.log(timePost(datePrueba[1]));
