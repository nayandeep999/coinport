export { default } from "next-auth/middleware";

export const config = {
  matcher: [
    "/dashboard",
    "/p2p",
    "/transfer",
    "/transactions",
    "/approve-transfer",
  ],
};
