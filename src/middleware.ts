import { NextRequest, NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";

export async function middleware(req: NextRequest) {
    const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });

    if (!token) {
        return NextResponse.json(
        { error: "Unauthorized access" },
        { status: 401 }
        );
    }
    
    if (token.exp && typeof token.exp === 'number' && token.exp * 1000 < Date.now()) {
        return NextResponse.json({ error: "Session expired" }, { status: 401 });
    }

    // Optionally, add more checks (e.g., verify roles, permissions, etc.)
    return NextResponse.next();
}

// Apply middleware to specific routes
export const config = {
    matcher: ["/api/cart/", "/api/cart/((?!general).*)"],
};
