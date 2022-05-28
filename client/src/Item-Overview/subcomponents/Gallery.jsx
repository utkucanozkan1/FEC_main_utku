/* eslint-disable jsx-a11y/no-static-element-interactions */
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
    // Url schema error quick hardcoded fix
    let thumbnailUrl = photos[i]?.thumbnail_url;
    if (thumbnailUrl.length > 0 && thumbnailUrl[0] !== 'h') {
      thumbnailUrl = thumbnailUrl.substring(1, thumbnailUrl.length);
    }
    const css = { backgroundImage: `url(${thumbnailUrl})` };
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
    e.stopPropagation();
    const { classList } = e.target;
    // Click events work in mysterious ways
    if (classList.contains('expand-view')) {
      const gallerySection = document.querySelector('.gallery-section');
      const checkoutSection = document.querySelector('.checkout-section');

      if (gallerySection.classList.contains('gallery-section-expanded')) {
        if (classList.contains('expand-view-button')) {
          // Remove expanded view
          gallerySection.classList.remove('gallery-section-expanded');
          checkoutSection.setAttribute('style', 'display:inline-block');
        } else if (classList.contains('gallery-container') || classList.contains('image-navigation')) {
          // Nav elements to be displayed/hidden
          // const navEls = ['.image-navigation', '.image-list-wrapper', '.expand-view-wrapper']
          //   .map((class) => document.querySelector(class));
          const galleryNav = document.querySelector('.image-navigation');
          const carouselNav = document.querySelector('.image-list-wrapper');
          const expandViewBtn = document.querySelector('.expand-view-wrapper');

          const galleryContainerClassList = document.querySelector('.gallery-container').classList;
          if (galleryContainerClassList.contains('gallery-container-zoomed')) {
            // Zoom in on pictures, add back navigation elements
            galleryContainerClassList.remove('gallery-container-zoomed');
            galleryNav.style.display = 'flex';
            carouselNav.style.display = 'flex';
            expandViewBtn.style.display = 'flex';
          } else {
            // Zoom in on pictures, remove navigation elements
            galleryContainerClassList.add('gallery-container-zoomed');
            galleryNav.style.display = 'none';
            carouselNav.style.display = 'none';
            expandViewBtn.style.display = 'none';
          }
        }
      } else {
        // Add expanded view
        gallerySection.classList.add('gallery-section-expanded');
        checkoutSection.setAttribute('style', 'display:none');
      }
    }
  };

  const expandImage = (e) => {
    e.preventDefault();
    const galleryContainer = document.querySelector('.gallery-container');
    if (galleryContainer.classList.contains('gallery-container-zoomed')) {
      // Get % of cursor position, related to galleryContainer measurements
      const x = Math.round((e.clientX / galleryContainer.offsetWidth) * 100);
      const y = Math.round((e.clientY / galleryContainer.offsetHeight) * 100);

      // Move to the % part of the expanded image on mousemove
      galleryContainer.style.backgroundSize = '250%';
      galleryContainer.style.backgroundPosition = `${x}% ${y}%`;
    } else {
      // Reset
      galleryContainer.style.backgroundSize = 'contain';
      galleryContainer.style.backgroundPosition = 'center';
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
    const nextPageStartIndex = (Math.floor(imageIndex / 4) + 1) * 4;
    const prevPageStartIndex = (Math.floor(imageIndex / 4) - 1) * 4;
    if (action === 'carouselNext') {
      //
      if (nextPageStartIndex < photos.length) {
        setImageIndex(nextPageStartIndex);
      }
    } else if (action === 'carouselPrev') {
      if (prevPageStartIndex >= 0) {
        setImageIndex(prevPageStartIndex);
      }
    }
  };

  useEffect(() => {
    // Make sure the current image has selected status
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

    // Right button
    if (imageIndex + 1 > photos.length - 1) {
      navRight.style.display = 'none';
    } else {
      navRight.style.display = 'block';
    }
    // Left Button
    if (imageIndex - 1 < 0) {
      navLeft.style.display = 'none';
    } else {
      navLeft.style.display = 'block';
    }

    // Carousel Up
    if (imageIndex < 4) {
      carouselUp.style.display = 'none';
    } else {
      carouselUp.style.display = 'block';
    }
    // Carousel Down
    const nextPageStartIndex = (Math.floor(imageIndex / 4) + 1) * 4;
    if (nextPageStartIndex < photos.length) {
      carouselDown.style.display = 'block';
    } else {
      carouselDown.style.display = 'none';
    }
  });

  return (
    <section className="gallery-section" onMouseMove={expandImage}>
      <section
        className="gallery-container expand-view"
        style={{ backgroundImage: `url(${photos[imageIndex]?.url})` }}
        onClick={expandView}
      >
        {/* Expand view wrapper */}
        <div className="expand-view-wrapper">
          <button type="button" id="expand-view" className="expand-view-button expand-view" onClick={expandView}>
            <i className="fa-solid fa-expand expand-view expand-view-button" />
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

        <div className="image-navigation expand-view">
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
