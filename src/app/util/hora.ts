export const timePosts = (date: string) => {
  const now = new Date().getTime();
  const timePost = new Date(date).getTime();

  const minutes = (now - timePost) / (1000 * 60);
  console.log(minutes, "min");
  if (minutes <= 60) {
    return Math.round(minutes) + ' ' + 'min';
  }
  const hours = (now - timePost) / (1000 * 60 * 60);
  return Math.round(hours) + ' ' + 'h';
};
