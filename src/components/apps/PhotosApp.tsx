import './PhotosApp.css'

const PhotosApp = () => {
  const photos = [
    'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=300&h=300&fit=crop',
    'https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=300&h=300&fit=crop',
    'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=300&h=300&fit=crop',
    'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=300&h=300&fit=crop',
    'https://images.unsplash.com/photo-1472214103451-9374bd1c798e?w=300&h=300&fit=crop',
    'https://images.unsplash.com/photo-1418065460487-3956ef138b8e?w=300&h=300&fit=crop',
    'https://images.unsplash.com/photo-1501436513145-30f24e19fcc4?w=300&h=300&fit=crop',
    'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=300&h=300&fit=crop',
  ]

  return (
    <div className="photos-app">
      <div className="photos-header">
        <h2>Photos</h2>
        <div className="photos-info">
          {photos.length} photos
        </div>
      </div>
      
      <div className="photos-grid">
        {photos.map((photo, index) => (
          <div key={index} className="photo-item">
            <img src={photo} alt={`Photo ${index + 1}`} />
          </div>
        ))}
      </div>
    </div>
  )
}

export default PhotosApp