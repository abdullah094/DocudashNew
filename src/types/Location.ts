export interface ILocation {
    coords:    LongLat;
    timestamp: number;
}
export interface LongLat {
    speed:            number;
    longitude:        number;
    latitude:         number;
    accuracy:         number;
    heading:          number;
    altitude:         number;
    altitudeAccuracy: number;
}