/* eslint-disable @next/next/no-img-element */
import { ImageResponse } from "@vercel/og";
import { NextRequest } from "next/server";

export const config = {
  runtime: "experimental-edge",
};

export default async function emojiSlotOgHandler(req: NextRequest) {
  const { searchParams } = req.nextUrl;
  const emojis = searchParams.get("q") || "🎰 🎰 🎰";

  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "white",
        }}
      >
        <h1
          style={{
            fontSize: "150px",
            backgroundClip: "text",
          }}
        >
          {emojis}
        </h1>
      </div>
    ),
    {
      width: 1200,
      height: 630,
    },
  );
}
