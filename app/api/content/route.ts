import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const slug = searchParams.get("slug");

    if (!slug) {
      return NextResponse.json({ error: "Slug is required" }, { status: 400 });
    }

    const content = await prisma.pageContent.findUnique({
      where: { page: slug },
    });
    
    let defaultData = null;
    if (slug === "placements") {
       defaultData = {
          recruiters: ["MRF", "Apollo Tyres", "CEAT", "Balkrishna Industries (BKT)", "TVS Srichakra", "JK Tyre", "Reliance Industries", "Pidilite"],
          stats: { highestPackage: "12 LPA", averagePackage: "5.5 LPA", placementRate: "85%" }
       };
    } else if (slug === "higher-studies") {
       defaultData = {
          universities: ["University of Akron (USA)", "University of Massachusetts Amherst (USA)", "Max Planck Institute (Germany)", "Kyushu University (Japan)"],
          exams: ["GATE (Engineering Sciences)", "CSIR NET (Chemical Sciences)", "GRE", "TOEFL / IELTS"]
       };
    }

    return NextResponse.json({ content: content?.body || "", data: content?.data || defaultData });
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch content" }, { status: 500 });
  }
}
