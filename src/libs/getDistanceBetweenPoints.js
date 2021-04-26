const getDistanceBetweenPoints = (centerPoint, point) => {
    return window.google.maps.geometry.spherical.computeDistanceBetween(centerPoint, point);
}

export default getDistanceBetweenPoints;
