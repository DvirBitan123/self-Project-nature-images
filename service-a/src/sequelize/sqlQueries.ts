
export const allImagesQuery = `
  select i.id, url, alt, description, 
  c.name as category,
  e.name as equipment,
  imageDate as date,
  location,
  lat, lng
  from images i JOIN categories c 
    ON i.category = c.id
  join equipment e
    on i.equipment = e.id
`;

// export const imageByCatQuery = `
// ${allImagesQuery} where
//   c.name = 
// `