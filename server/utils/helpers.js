function getAverageRating(ratings) {
  console.log('Ratings!!:', ratings);
  let ratingsCount = 0;
  let ratingTotal = 0;
  for (let i = 0; i < ratings.length; i += 1) {
    ratingsCount += parseInt(ratings[i][1], 10);
    ratingTotal += parseInt(ratings[i][0], 10) * parseInt(ratings[i][1], 10);
  }
  const averageRating = ratingTotal / ratingsCount;
  console.log('avgRatings!!:', averageRating);
  return averageRating;
}

export default getAverageRating;
