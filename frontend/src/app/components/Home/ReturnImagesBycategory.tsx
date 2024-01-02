import { trpc } from '../../utils/ConnectTotRPC';
import { getImagesByCategory } from 'service-a/src/services/imagesService';

export default function returnImagesByCategory(category: string) {
  const { data } = trpc.getImagesByCategory.useQuery(category);
  if (data) return data
}