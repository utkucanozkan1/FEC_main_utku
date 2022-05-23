import React from 'react';

function Gallery() {
  const thumbnails = [];
  for (let i = 1; i <= 5; i += 1) {
    let thumbnail = (
      <li>
        <button type="button" className="thumbnail"> </button>
      </li>
    );

    if (i === 2) {
      thumbnail = (
        <li>
          <button type="button" className="thumbnail thumbnail-selected"> </button>
        </li>
      );
    }

    thumbnails.push(thumbnail);
  }

  const expandView = (e) => {
    e.preventDefault();
    const gallerySection = document.querySelector('.gallery-section');
    const checkoutSection = document.querySelector('.checkout-section');

    if (gallerySection.classList.contains('gallery-section-expanded')) {
      gallerySection.classList.remove('gallery-section-expanded');
      checkoutSection.setAttribute('style', 'display:inline-block');
    } else {
      gallerySection.classList.add('gallery-section-expanded');
      checkoutSection.setAttribute('style', 'display:none');
    }
  };

  return (
    <section className="gallery-section">
      <section className="gallery-container">
        {/* Expand view wrapper */}
        <div className="expand-view-wrapper">
          <button type="button" id="expand-view" onClick={expandView}>
            <i className="fa-solid fa-expand" />
          </button>
        </div>

        <div className="image-list-wrapper">
          <button type="button" className="gallery-up">
            <i className="fa-solid fa-arrow-up" />
          </button>

          <ul className="thumbnails">
            {thumbnails.map((thumbnail, index) => (
              // eslint-disable-next-line react/no-array-index-key
              <React.Fragment key={index}>
                {thumbnail}
              </React.Fragment>
            ))}
          </ul>

          <button type="button" className="gallery-up">
            <i className="fa-solid fa-arrow-down" />
          </button>
        </div>

        <div className="image-navigation">
          <button type="button" className="gallery-left">
            <i className="fa-solid fa-arrow-left" />
          </button>
          <button type="button" className="gallery-right">
            <i className="fa-solid fa-arrow-right" />
          </button>
        </div>
      </section>
    </section>
  );
}

export default Gallery;
