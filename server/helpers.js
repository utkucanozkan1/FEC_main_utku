function getAverageRating(ratings) {
  const averageRating = ratings.reduce((prevRating, curRating) => (
    (prevRating + curRating))) / ratings.length;
  return averageRating;
}

export default getAverageRating;
