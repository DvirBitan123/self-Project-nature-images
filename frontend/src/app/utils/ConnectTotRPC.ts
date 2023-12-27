import { createTRPCReact } from '@trpc/react-query';
import type AppRouter from '../../../../service-a/src/main'
 
export const trpc = createTRPCReact<AppRouter>();

