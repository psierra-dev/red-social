 const time = (date: string) => {
  const now = new Date().getTime();
  const timePost = new Date(date).getTime();

  const minutes = (now - timePost) / (1000 * 60);
  if (minutes <= 60) {
    return Math.round(minutes) + ' ' + 'min';
  }
  const hours = (now - timePost) / (1000 * 60 * 60);
  if(hours < 24){
    return Math.round(hours) + ' ' + 'h';

  }
  const day = (now - timePost) / (1000 * 60 * 60 * 24);

  return Math.round(day) + ' ' + 'días';
};

export default time
