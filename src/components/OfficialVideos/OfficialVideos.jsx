const OfficialVideos = (mediaId, mediaType) => {
  
  const {results: videos} = useFetchData(`${mediaType}/${mediaId}/videos`)

  return (
    <>
       <h1>official videos</h1>
        <section className="official__carrousel slider">
          {videos?.map(video => (
            <div key={video.id} className="offucial__card slide">
              <div className="official__image">
                <Img src={`https://img.youtube.com/vi/${video.key}/mqdefault.jpg`} width="220px" height="120px" alt="official" />
                <span className="official__player">Play</span>       
              </div>
            <p className="official__title">{video.name}</p>
          </div>))} 
        </section>
    </>
  )
}

export default OfficialVideos
