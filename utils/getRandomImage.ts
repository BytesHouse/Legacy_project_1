export function getRandomImage() {
  const imageArr = [
    {
      src: "/assets/images/8-min.jpg",
      alt: "truck_01",
      imageBlur: "/assets/images/8-min.jpg",
    },
    {
      src: "/assets/images/9-min.jpg",
      alt: "truck_02",
      imageBlur: "/assets/images/9-min.jpg",
    },
    {
      src: "/assets/images/10-min.jpg",
      alt: "Road",
      imageBlur: "/assets/images/10-min.jpg",
    },
    {
      src: "/assets/images/11-min.jpg",
      alt: "Store",
      imageBlur: "/assets/images/11-min.jpg",
    },
  ];
  const random = Math.floor(Math.random() * imageArr.length);
  return imageArr[random];
}
