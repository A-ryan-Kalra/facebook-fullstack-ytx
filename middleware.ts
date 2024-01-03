export { default } from "next-auth/middleware";
import { NextRequest, NextResponse } from "next/server";

export async function middleware(request: NextRequest) {
  const authToken = request.cookies.get("next-auth.session-token")?.value;
  // console.log("this is middleware");
  // console.log(authToken);
  if (authToken) {
    return NextResponse.next();
  } else {
    return NextResponse.redirect(new URL("/", request.url));
  }
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: ["/notifications"],
};
