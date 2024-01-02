import { trpc } from '../../utils/ConnectTotRPC';

export default function returnAllImages() {
  const { data } = trpc.getAllImages.useQuery();
  if (data) return data
}


