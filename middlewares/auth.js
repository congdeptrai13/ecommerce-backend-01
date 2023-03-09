const jwt = require("jsonwebtoken");

const verifyToken = async (req, res, next) => {
  console.log(req.headers.authorization.split(" ")[1]);
  if (!req.headers.authorization) {
    return res.status(403).json({ msg: "Not authorized. No token" })
  }
  if (req.headers.authorization.startsWith("Bearer ")) {
    const token = req.headers.authorization.split(" ")[1]; //get the second element which is the token itself(first el is "Bearer" string)
    jwt.verify(token, process.env.JWT_SECRET, (err, data) => {
      if (err) return res.status(403).json({ msg: "Wrong or expired token" })
      else {
        req.user = data; //an object with the id and email of the user
        next();
      }
    });


  }
}
module.exports = verifyToken