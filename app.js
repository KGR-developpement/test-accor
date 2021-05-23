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

        let distance = helper.distance(pointA.lat, pointA.lng, pointB.lat, pointB.lng);
        
        if (distance <= radius) {
            hotel.distance = Math.round(distance);
            sortedHotel.push(hotel);
        }
    })

    return sortedHotel;
}

function findHotelNearbyWithBestOffer(lat, lng, radius, date) {
    let hotels = findHotelsNearby(lat, lng, radius, date);
    let prices = priceService.getPrices();
    let sortedHotelsByPrice = [];

    hotels.forEach(hotel => {
        prices.forEach(price => {
            if (price.ridCode === hotel.ridCode) {
                price.offers.forEach(offer => {
                    if (offer.fare === 'STANDARD' && offer.date === date) {
                        sortedHotelsByPrice.push({
                            hotel,
                            price: offer.price,
                        });
                    }
                })
            }
        })
    })
    
    let cheapestHotels = sortedHotelsByPrice
        .sort((a, b) => a.price - b.price)
        .filter(hotel => hotel.price === sortedHotelsByPrice[0].price)
        .sort((a, b) => a.hotel.distance - b.hotel.distance);
    
    return cheapestHotels[0]?.hotel || null;
}

console.log(findHotelsNearby(48.856564, 2.351711, 2000))
console.log(findHotelNearbyWithBestOffer(48.856564, 2.351711, 2000, '11/01/2021'))

module.exports = {
    findHotelsNearby: findHotelsNearby,
    findHotelNearbyWithBestOffer: findHotelNearbyWithBestOffer
}
