const userService = require('./services/user-service');
const hotelService = require('./services/hotel-service');
const priceService = require('./services/price-service');
const helper = require('./services/helper');

function findHotelsNearby(lat, lng, radius) {
    const hotels = hotelService.getHotels();
    const pointA = { lat, lng }
    const pointB = {};
    let sortedHotel = [];

    hotels.forEach((hotel) => {
        pointB.lat = hotel.latitude;
        pointB.lng = hotel.longitude;

        let distance = helper.distance(pointA.lat, pointA.lng, pointB.lat, pointB.lng) * 1000;
        
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
