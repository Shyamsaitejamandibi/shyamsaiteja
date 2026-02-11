import { NextResponse } from "next/server";

const HACKATIME_BASE_URL = "https://hackatime.hackclub.com/api/v1";

function getDateRange(range: string): { start_date: string; end_date: string } {
  const end = new Date();
  const start = new Date();

  switch (range) {
    case "last_7_days":
      start.setDate(end.getDate() - 7);
      break;
    case "last_30_days":
      start.setDate(end.getDate() - 30);
      break;
    case "last_6_months":
      start.setMonth(end.getMonth() - 6);
      break;
    case "last_year":
      start.setFullYear(end.getFullYear() - 1);
      break;
    case "all_time":
    default:
      // 10 years back
      start.setFullYear(end.getFullYear() - 10);
      break;
  }

  const fmt = (d: Date) => d.toISOString().split("T")[0]; // YYYY-MM-DD
  return { start_date: fmt(start), end_date: fmt(end) };
}

export async function GET(request: Request) {
  const username = process.env.HACKATIME_USERNAME;
  const apiKey = process.env.HACKATIME_API_KEY;

  if (!username) {
    return NextResponse.json(
      { error: "Hackatime username not configured" },
      { status: 500 },
    );
  }

  const { searchParams } = new URL(request.url);
  const range = searchParams.get("range") || "all_time";
  const { start_date, end_date } = getDateRange(range);

  try {
    const headers: Record<string, string> = {
      "Content-Type": "application/json",
    };

    if (apiKey) {
      headers["Authorization"] = `Bearer ${apiKey}`;
    }

    const url = `${HACKATIME_BASE_URL}/users/${username}/stats?start_date=${start_date}&end_date=${end_date}`;

    const response = await fetch(url, {
      headers,
      next: { revalidate: 3600 },
    });

    if (!response.ok) {
      throw new Error(`Hackatime API responded with ${response.status}`);
    }

    const responseData = await response.json();
    const stats = responseData.data || responseData;

    return NextResponse.json(stats);
  } catch (error) {
    console.error("Hackatime API error:", error);
    return NextResponse.json(
      { error: "Failed to fetch Hackatime data" },
      { status: 500 },
    );
  }
}
