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

const ZodUserCategory = z.object({
  token: z.string(),
  categoryId: z.string().uuid()
})

const ZodUserImage = z.object({
  token: z.string(),
  imageId: z.string().uuid()
})

export {addImageZodSchema, ZodUserCategory, ZodUserImage}