// Pass in ratings meta data. Array should look something like this:
// [[1, 15], [2, 9], [3, 23], [4, 6], [5, 11]]
function getAverageRating(ratings) {
  let ratingsCount = 0;
  let ratingTotal = 0;
  for (let i = 0; i < ratings.length; i += 1) {
    ratingsCount += parseInt(ratings[i][1], 10);
    ratingTotal += parseInt(ratings[i][0], 10) * parseInt(ratings[i][1], 10);
  }
  const averageRating = ratingTotal / ratingsCount;
  return averageRating;
}

export default getAverageRating;
