import z from 'zod';

const addImageZodSchema = z.object({
  url: z.string(),
    alt: z.string(),
    description: z.string(),
    category: z.string(),
    equipment: z.string(),
    date: z.string(),
    location: z.string(),
    lng: z.number(),
    lat: z.number()
  });

export default addImageZodSchema