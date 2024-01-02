import { trpc } from '../../utils/ConnectTotRPC';

export default function ReturnImgById(ID: string) {
  const { data } = trpc.getImageById.useQuery(ID);
  if (data) return data
}