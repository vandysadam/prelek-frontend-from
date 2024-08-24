import parseLinkHeader from "parse-link-header";
import { ResponseWithLink } from "./api.types";

export const wrapResponseWithLink = <T>(
  data: T,
  link: string = ""
): ResponseWithLink<T> => {
  const links = parseLinkHeader(link);

  return {
    response: data,
    ...links,
  };
};
