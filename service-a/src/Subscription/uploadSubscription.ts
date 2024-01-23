import { observable } from "@trpc/server/observable";
import { EventEmitter } from "stream";

export const eventEmitter = new EventEmitter();

export const uploadSubscription = (input: string[]) => {
  return observable<string>((emit) => {
    input.forEach((category) => {        
      eventEmitter.on(`${category}_upload`, emit.next);
    })

    return () => {
      eventEmitter.off("upload", emit.next)
    }
  })
}