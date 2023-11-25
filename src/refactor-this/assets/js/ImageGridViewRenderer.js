function ImageGridViewRenderer() { }

ImageGridViewRenderer.prototype.render = function () {
  const mainView = document.getElementById("main-view");
  const pageQueryParam = window.location.search.includes('page') ? Number(window.location.search.split('page=')[1]) : 1;

  const renderImages = (images, idName) => {
    const itemView = document.getElementById(`${idName}-images`);
    if (!itemView) {
      console.error(`Element with ID ${idName} not found.`);
      return;
    }
  
    const imagesHTML = images.map(image => `
      <div class="col" style="height: 400px; padding: 10px;">
        <img class="image" src="${image.url}" alt="${image.name}" style="height: 100%; object-fit: cover; width: 100%;" />
        <div class="middle">
          <a class="btn btn-dark" href="${image.url}" download="${image.name}">DOWNLOAD</a>
        </div>
      </div>`).join('');
  
    itemView.innerHTML += imagesHTML;
  };

  const renderImagesByCategory = async (category) => {
    const validCategories = ['nature', 'architecture', 'fashion'];

    if (!validCategories.includes(category)) {
      console.error('Invalid category:', category);
      return;
    }

    const categoryImages = document.createElement('div');
    categoryImages.classList.add('container');
    categoryImages.innerHTML = `<div id="${category}-images" class="row row-cols-3"></div>`;
    mainView.appendChild(categoryImages);

    const getImagePromises = [
      ImageDataGetter.getImages(category, (pageQueryParam * 3) - 2),
      ImageDataGetter.getImages(category, (pageQueryParam * 3) - 1),
      ImageDataGetter.getImages(category, pageQueryParam * 3)
    ];

    try {
      const [images1, images2, images3] = await Promise.all(getImagePromises);
      renderImages(images1, category);
      renderImages(images2, category);
      renderImages(images3, category);
    } catch (error) {
      console.error(error);
    }
  };

  if (window.location.search.includes('?nature')) {
    renderImagesByCategory("nature");
  } else if (window.location.search.includes('?architecture')) {
    renderImagesByCategory("architecture");
  } else if (window.location.search.includes('?fashion')) {
    renderImagesByCategory("fashion");
  }

  const prevsearchstr = window.location.search.split('&page')[0] + '&page=' + (pageQueryParam - 1);
  const nextsearchstr = window.location.search.split('&page')[0] + '&page=' + (pageQueryParam + 1);
  const pagination = `
    <nav>
      <ul class="pagination">
        <li class="page-item"><a class="page-link" href="${prevsearchstr}">Previous</a></li>
        <li class="page-item"><a class="page-link" href="${nextsearchstr}">Next</a></li>
      </ul>
    </nav>`;

  mainView.insertAdjacentHTML('beforeend', pagination);
};
