/**
 * validate.js - Validation of schemas
 * Validate:
 * Email
 * Username
 * Password
 * Phone number
 */

export const DISTANCE = (x1, y1, x2, y2) => {
  let R = 6371; // Radius of the earth in km
  let dLat = deg2rad(lat2-lat1);  // deg2rad below
  let dLon = deg2rad(lon2-lon1);
  let a =
    Math.sin(dLat/2) * Math.sin(dLat/2) +
    Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) *
    Math.sin(dLon/2) * Math.sin(dLon/2);
  let c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
  let d = R * c; // Distance in km
  return d;
};

export const GEO = {
    disatnce: DISTANCE,
    password: PASSWORD,
    phone: PHONE_NUMBER,
    fullName: FULL_NAME,
    username: USERNAME,
}