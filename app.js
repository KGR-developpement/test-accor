const userService = require('./services/user-service');
const hotelService = require('./services/hotel-service');
const priceService = require('./services/price-service');
const helper = require('./services/helper');

function findHotelsNearby(lat, lng, radius) {
    const convertToRadian = (point) => {
        return point * Math.PI / 180;
    }
    const hotels = hotelService.getHotels();
    const pointA = {
        lat: convertToRadian(lat),
        lng: convertToRadian(lng),
    }
    const pointB = {};
    let sortedHotel = [];

    hotels.forEach((hotel) => {
        pointB.lat = convertToRadian(hotel.latitude);
        pointB.lng = convertToRadian(hotel.longitude);
        let distance = 6371 * Math.acos(Math.sin(pointA.lat) * Math.sin(pointB.lat) + Math.cos(pointA.lat) * Math.cos(pointB.lat) * Math.cos(pointB.lng - pointA.lng));
        distance = distance * 1000;

        if (distance <= radius) {
            hotel.distance = Math.round(distance);
            sortedHotel.push(hotel);
        }
    })

    return sortedHotel;
}

function findHotelNearbyWithBestOffer(lat, lng, radius, date) {
    // TODO implement me
    return null;
}

console.log(findHotelsNearby(48.856564, 2.351711, 2000))

module.exports = {
    findHotelsNearby: findHotelsNearby,
    findHotelNearbyWithBestOffer: findHotelNearbyWithBestOffer
}
