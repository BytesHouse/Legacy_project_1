import * as L from "leaflet";

const greenCar = new L.Icon({
  iconUrl: "/assets/images/car.svg",
  iconRetinaUrl: "/assets/images/car.svg",
  iconAnchor: [10, 10],
  iconSize: new L.Point(20, 20),
});

const greenAir = new L.Icon({
  iconUrl: "/assets/images/aeroplane.svg",
  iconRetinaUrl: "/assets/images/aeroplane.svg",
  iconAnchor: [10, 10],
  iconSize: new L.Point(20, 20),
});

const greenBoat = new L.Icon({
  iconUrl: "/assets/images/boat.svg",
  iconRetinaUrl: "/assets/images/boat.svg",
  iconAnchor: [10, 10],
  iconSize: new L.Point(20, 20),
});

const greenTrain = new L.Icon({
  iconUrl: "/assets/images/train.svg",
  iconRetinaUrl: "/assets/images/train.svg",
  iconAnchor: [10, 10],
  iconSize: new L.Point(20, 20),
});

const greenWalk = new L.Icon({
  iconUrl: "/assets/images/walk.svg",
  iconRetinaUrl: "/assets/images/walk.svg",
  iconAnchor: [10, 10],
  iconSize: new L.Point(20, 20),
});

export { greenCar, greenAir, greenBoat, greenTrain, greenWalk };
