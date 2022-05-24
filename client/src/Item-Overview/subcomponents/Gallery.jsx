/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { useState, useEffect } from 'react';

function Gallery(props) {
  const {
    styles, styleIndex,
  } = { ...props }.data;

  const [imageIndex, setImageIndex] = useState(0);
  const { photos } = styles[styleIndex];

  // Allow for only up to 4 thumbnails at a time
  const startIndex = Math.floor(imageIndex / 4) * 4;
  const endIndex = startIndex + 3 < photos.length ? startIndex + 3 : photos.length - 1;

  const thumbnails = [];
  for (let i = startIndex; i <= endIndex; i += 1) {
    const css = { backgroundImage: `url(${photos[i]?.thumbnail_url})` };
    const classList = i !== imageIndex ? 'thumbnail' : 'thumbnail thumbnail-selected';
    thumbnails.push((
      <li>
        <button type="button" className={classList} style={css} data-index={i}> </button>
      </li>
    ));
  }

  // Event Handlers
  // Expand gallery to 100% width
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

  const thumbnailClick = (e) => {
    e.preventDefault();
    if (e.target.classList.contains('thumbnail')) {
      const index = parseInt(e.target.getAttribute('data-index'), 10);
      setImageIndex(index);
    }
  };

  const arrowNavigationClick = (e) => {
    e.preventDefault();
    const action = e.target.getAttribute('data-action');
    if (action) {
      if (action === 'imageNext') {
        if (imageIndex + 1 < photos.length) {
          setImageIndex(imageIndex + 1);
        }
      } else if (action === 'imagePrev') {
        if (imageIndex - 1 >= 0) {
          setImageIndex(imageIndex - 1);
        }
      }
    }
  };

  const arrowThumbnailClick = (e) => {
    e.preventDefault();
    const action = e.target.getAttribute('data-action');
    const page = Math.floor(imageIndex / 4) * 4;
    if (action === 'carouselNext') {
      if (page + 1 < photos.length && page !== 0) {
        setImageIndex(page + 1);
      } else if (page === 0 && page + 4 < photos.length) {
        setImageIndex(page + 4);
      }
    } else if (action === 'carouselPrev') {
      if (page > 0) {
        setImageIndex(page - 4);
      }
    }
  };

  useEffect(() => {
    // Make sure the correct image index is displaying
    document.querySelectorAll('[data-index]').forEach((thumbnail) => {
      thumbnail.classList.remove('thumbnail-selected');
      if (parseInt(thumbnail.getAttribute('data-index'), 10) === imageIndex) {
        thumbnail.classList.add('thumbnail-selected');
      }
    });

    // Hide/display nav buttons -> TODO: tech debt refactor
    const carouselUp = document.querySelector('.gallery-up');
    const carouselDown = document.querySelector('.gallery-down');
    const navLeft = document.querySelector('.gallery-left');
    const navRight = document.querySelector('.gallery-right');

    if (imageIndex < 4) {
      carouselDown.style.display = 'block';
      carouselUp.style.display = 'none';
      if (imageIndex === 0) {
        navLeft.style.display = 'none';
      } else {
        navLeft.style.display = 'block';
      }
    } else if (imageIndex > photos.length - 4) {
      carouselUp.style.display = 'block';
      carouselDown.style.display = 'none';
      if (imageIndex === photos.length - 1) {
        navRight.style.display = 'none';
      } else {
        navRight.style.display = 'block';
      }
    }

    if (imageIndex + 1 < photos.length) {
      navRight.style.display = 'block';
    }
    if (imageIndex > 0) {
      navLeft.style.display = 'block';
    }
  });

  return (
    <section className="gallery-section">
      <section
        className="gallery-container"
        style={{ backgroundImage: `url(${photos[imageIndex]?.url})` }}
      >
        {/* Expand view wrapper */}
        <div className="expand-view-wrapper">
          <button type="button" id="expand-view" onClick={expandView}>
            <i className="fa-solid fa-expand" />
          </button>
        </div>

        <div className="image-list-wrapper">
          <button type="button" className="gallery-up" data-action="carouselPrev" onClick={arrowThumbnailClick}>
            <i className="fa-solid fa-arrow-up" data-action="carouselPrev" />
          </button>

          <ul className="thumbnails" onClick={thumbnailClick}>
            {thumbnails.map((thumbnail, index) => (
              // eslint-disable-next-line react/no-array-index-key
              <React.Fragment key={index}>
                {thumbnail}
              </React.Fragment>
            ))}
          </ul>

          <button type="button" className="gallery-down" data-action="carouseNext" onClick={arrowThumbnailClick}>
            <i className="fa-solid fa-arrow-down" data-action="carouselNext" />
          </button>
        </div>

        <div className="image-navigation">
          <div className="nav-button-wrapper">
            <button type="button" className="gallery-left" data-action="imagePrev" onClick={arrowNavigationClick}>
              <i className="fa-solid fa-arrow-left" data-action="imagePrev" />
            </button>
          </div>
          <div className="nav-button-wrapper">
            <button type="button" className="gallery-right" data-action="imageNext" onClick={arrowNavigationClick}>
              <i className="fa-solid fa-arrow-right" data-action="imageNext" />
            </button>
          </div>
        </div>
      </section>
    </section>
  );
}

export default Gallery;
