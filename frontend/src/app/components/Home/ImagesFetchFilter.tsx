import returnAllImages from './ReturnAllImages';
import returnImagesByCategory from './ReturnImagesBycategory';


export default function ImagesFetchFilter(category: string) {
  if (category === 'All') {
    const allData = returnAllImages();
    return allData
  }

  else {
    const catData = returnImagesByCategory(category)
    return catData
  }
}
