const jwt = require("jsonwebtoken");


function authMiddleware(req, res, next) {
  let authHeader = req.headers.authorization;
  // Check if the authorization header is present and starts with "Bearer "
  if (!authHeader ||!authHeader.startsWith("Bearer ")){
    return res.status(401).send({ msg: "Unauthorized - Missing or invalid token format" });
  }
  const clientToken = authHeader.split(" ")[1];
  
  try {
    const decodedToken = jwt.verify(clientToken, process.env.SECRET_KEY);
    req.user = decodedToken;
    next();
  } catch (error) {
    console.error(error.message);
    const errorMsg = error.name === "TokenExpiredError"
    ? "Token expired. Please log in again."
    : "Invalid or malformed token";
    res.status(401).send({ msg: errorMsg });
  }
}
const authRoleMiddleware = (allowedRoles) => {
  return (req, res, next) => {
    try{
      if(!req.user){ 
        return res.status(401).send({ msg: "Unauthorized User" });
      }
    if(!allowedRoles.includes(req.user.role)){
      return res.status(403).send({msg:"Forbidden - You don't have permission to access this resource"});
    }
  next();
  }catch (error) {
    console.error("Error in authRoleMiddleware" , error.message);
    res.status(403).send({ msg: "Unauthorized User", error: error.message });
  }}};
module.exports = {authMiddleware, authRoleMiddleware, checkUserStatus};