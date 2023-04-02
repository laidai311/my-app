import SimpleGallery from "@/components/Photoswipe";

export default function PhotoswipePage(props) {
  return (
    <div className="">
      <SimpleGallery
        galleryID="my-test-gallery"
        images={[
          {
            largeURL: "https://cdn.photoswipe.com/photoswipe-demo-images/photos/1/img-2500.jpg",
            thumbnailURL: "https://cdn.photoswipe.com/photoswipe-demo-images/photos/1/img-200.jpg",
            _id: "6425007218",
          },
          {
            largeURL: "https://cdn.photoswipe.com/photoswipe-demo-images/photos/2/img-2500.jpg",
            thumbnailURL: "https://cdn.photoswipe.com/photoswipe-demo-images/photos/2/img-200.jpg",
            _id: "642500bc3669d53218",
          },
          {
            largeURL: "https://cdn.photoswipe.com/photoswipe-demo-images/photos/3/img-2500.jpg",
            thumbnailURL: "https://cdn.photoswipe.com/photoswipe-demo-images/photos/3/img-200.jpg",
            _id: "6425007c52e5bc38",
          },
        ]}
        videos={[
          {
            _id: "6425007c52e5bc3669d53218",
            location: "https://khonhapho.sgp1.cdn.digitaloceanspaces.com/mp4-2-1680146556381.mp4",
            originalname: "mp4 2.mp4",
            supplier: "digitaloceanspaces_khonhapho",
            largeURL: "https://khonhapho.sgp1.cdn.digitaloceanspaces.com/mp4-2-1680146556381.mp4",
            thumbnailURL: "https://cdn.photoswipe.com/photoswipe-demo-images/photos/1/img-200.jpg",
          },
        ]}
      />
    </div>
  );
}
