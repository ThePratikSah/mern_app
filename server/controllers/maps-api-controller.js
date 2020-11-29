import https from "https";

export const apiRequest = async (req, res, next) => {
  const origin = req.body.origin;
  const destination = req.body.destination;
  console.log(req.body);
  const url = `https://maps.googleapis.com/maps/api/distancematrix/json?origins=${origin.lat},${origin.lng}&destinations=${destination.lat},${destination.lng}&mode=driving&language=en-EN&sensor=false&key=${process.env.GOOGLE_API_KEY}`;
  try {
    https.get(url, (response) => {
      if (response.statusCode === 200) {
        response.on("data", (data) => {
          const distanceData = JSON.parse(data);
          // res.render('index', {data: weatherData});
          console.log(distanceData["rows"][0]["elements"][0]["distance"]);
          res.send(distanceData);
        });
      } else {
        return res.status(401).json({
          message: "Cannot resolve url",
        });
      }
    });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};
