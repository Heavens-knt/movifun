const MediaImages = ({mediaId, mediaType}) => {
  const images = useFetchData(`${mediaType}/${mediaId}/images`)
  return (
    <>
      <h1>Images</h1>
      <section className="images__carrousel slider">
        {images?.slice(0, 20)?.map(image => <Img src={getImageUrl(image.file_path) || poster} key={image.file_path} className="image slide" width="300px" height="200px" alt="movie image" />)}
      </section>
    </>
  )
}

export default MediaImages
