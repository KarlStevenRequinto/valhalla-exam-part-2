function ImageGridViewRenderer() { }

ImageGridViewRenderer.prototype.render = function () {
  function renderNatureImages(images) {
    const natureView = document.getElementById("nature-images");
    natureView.innerHTML += images.map(image => `
      <div class="col" style="height: 400px; padding: 10px;">
        <img class="image" src="${image.url}" alt="${image.name}" style="height: 100%; object-fit: cover; width: 100%;" />
        <div class="middle">
          <a class="btn btn-dark" href="${image.url}" download="${image.name}">DOWNLOAD</a>
        </div>
      </div>`).join('');
  }

  function renderArchitectureImages(images) {
    const natureView = document.getElementById("architecture-images");
    natureView.innerHTML += images.map(image => `
      <div class="col" style="height: 400px; padding: 10px;">
        <img class="image" src="${image.url}" alt="${image.name}" style="height: 100%; object-fit: cover; width: 100%;" />
        <div class="middle">
          <a class="btn btn-dark" href="${image.url}" download="${image.name}">DOWNLOAD</a>
        </div>
      </div>`).join('');
  }

  function renderFashionImages(images) {
    const natureView = document.getElementById("fashion-images");
    natureView.innerHTML += images.map(image => `
      <div class="col" style="height: 400px; padding: 10px;">
        <img class="image" src="${image.url}" alt="${image.name}" style="height: 100%; object-fit: cover; width: 100%;" />
        <div class="middle">
          <a class="btn btn-dark" href="${image.url}" download="${image.name}">DOWNLOAD</a>
        </div>
      </div>`).join('');
  }

  var nav =
    '<nav class="navbar navbar-expand-lg navbar-light bg-light">'
    + '  <a class="navbar-brand" href="#">Photo Sharing App</a>'
    + '  <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">'
    + '    <span class="navbar-toggler-icon"></span>'
    + '  </button>'
    + '  <div class="collapse navbar-collapse" id="navbarNavAltMarkup">'
    + '    <div class="navbar-nav">'
    + '      <a class="nav-link active" href="?nature">Nature <span class="sr-only">(current)</span></a>'
    + '      <a class="nav-link" href="?architecture">Architecture</a>'
    + '      <a class="nav-link" href="?fashion">Fashion</a>'
    + '    </div>'
    + '  </div>'
    + '</nav>';

  document.getElementById("main-view").innerHTML = nav;

  var page = 1;
  if (window.location.search.includes('page')) {
    page = Number(window.location.search.split('page=')[1]);
  }

  if (window.location.search.includes('?nature')) {
    document.getElementById("main-view").innerHTML +=
      '<div class="container">'
      + '  <div id="nature-images" class="row row-cols-3"></div>'
      + '</div>';
    ImageDataGetter.getImages("nature", (page * 3) - 2)
      .then(renderNatureImages);

    ImageDataGetter.getImages("nature", (page * 3) - 1)
      .then(renderNatureImages);

    ImageDataGetter.getImages("nature", page * 3)
      .then(renderNatureImages);
  } else if (window.location.search.includes('?architecture')) {
    document.getElementById("main-view").innerHTML +=
      '<div class="container">'
      + '  <div id="architecture-images" class="row row-cols-3"></div>'
      + '</div>';
    ImageDataGetter.getImages("architecture", (page * 3) - 2)
      .then(renderArchitectureImages);

    ImageDataGetter.getImages("architecture", (page * 3) - 1)
      .then(renderArchitectureImages);

    ImageDataGetter.getImages("architecture", page * 3)
      .then(renderArchitectureImages);
  } else if (window.location.search.includes('?fashion')) {
    document.getElementById("main-view").innerHTML +=
      '<div class="container">'
      + '  <div id="fashion-images" class="row row-cols-3"></div>'
      + '</div>';
    ImageDataGetter.getImages("fashion", (page * 3) - 2)
      .then(renderFashionImages);

    ImageDataGetter.getImages("fashion", (page * 3) - 1)
      .then(renderFashionImages);

    ImageDataGetter.getImages("fashion", page * 3)
      .then(renderFashionImages);
  }

  var prevsearchstr = window.location.search.split('&page')[0] + '&page=' + (page - 1);
  var nextsearchstr = window.location.search.split('&page')[0] + '&page=' + (page + 1);
  var pagination =
    '<nav>'
    + '  <ul class="pagination">'
    + '    <li class="page-item"><a class="page-link" href="' + prevsearchstr + '">Previous</a></li>'
    + '    <li class="page-item"><a class="page-link" href="' + nextsearchstr + '">Next</a></li>'
    + '  </ul>'
    + '</nav>';

  document.getElementById("main-view").innerHTML += pagination;
};
