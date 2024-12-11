import { auth } from "@/app/_lib/auth";

export const middleware = auth;

export const config = {
  // awl lma ymatch /account y3ml redirect lel signin
  matcher: ["/account"],
};
