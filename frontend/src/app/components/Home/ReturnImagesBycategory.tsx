import { trpc } from '../../utils/ConnectTotRPC';

export default function returnImagesByCategory(category: string) {
  const { data } = trpc.getImagesByCategory.useQuery(category);
  if (data) return data
}