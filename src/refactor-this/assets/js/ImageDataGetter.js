function ImageDataGetter() { }

ImageDataGetter.getImages = async function (category, page) {
  try {
    const response = await fetch(`http://localhost:8888/images?category=${category}&page=${page}`);
    const result = await response.json();
    document.querySelector('.spinner-container').style.display = 'none'
    return result;
  } catch (error) {
    console.error('Error fetching images:', error);
    document.querySelector('.spinner-container').style.display = 'none';
    return [];
  }
};