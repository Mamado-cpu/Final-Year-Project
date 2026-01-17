// Haversine formula to calculate distance between two coordinates
function haversineDistance(coord1, coord2) {
    const toRad = (value) => (value * Math.PI) / 180;

    const R = 6371e3; // Earth radius in meters
    const φ1 = toRad(coord1.lat);
    const φ2 = toRad(coord2.lat);
    const Δφ = toRad(coord2.lat - coord1.lat);
    const Δλ = toRad(coord2.lng - coord1.lng);

    const a =
        Math.sin(Δφ / 2) * Math.sin(Δφ / 2) +
        Math.cos(φ1) * Math.cos(φ2) *
        Math.sin(Δλ / 2) * Math.sin(Δλ / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

    return R * c; // Distance in meters
}

module.exports = haversineDistance;