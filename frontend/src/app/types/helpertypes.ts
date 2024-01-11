import { MutationFunctionOptions, OperationVariables, DefaultContext, ApolloCache } from "@apollo/client";


export type AuthFuncType = (options?: MutationFunctionOptions<any, OperationVariables, DefaultContext, ApolloCache<any>> | undefined) => Promise<any>
