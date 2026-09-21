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
          mtech: [
             "Polymer Processing & Tool/Mould Engineering",
             "Rubber Compounding & Tyre Manufacturing Technology",
             "Advanced Polymer Nanocomposites & Hybrid Blends"
          ],
          phd: [
             { "name": "Nanocomposites & Carbon Nanotubes", "code": "NC-01" },
             { "name": "Smart & Stimuli-Responsive Polymers", "code": "SP-02" }
          ],
          scholarships: [
             { "emoji": "💰", "title": "CSIR-UGC NET JRF", "badge": "National Fellowship", "stipend": "₹37,000 / mo + HRA", "details": "Premier national fellowship awarded through the Joint CSIR-UGC NET Chemical Sciences / Physical Sciences exam." }
          ],
          tips: [
             { "title": "GATE Strategy", "summary": "Choosing XE vs CY Discipline", "details": ["Engineering Sciences (XE) has Polymer Science (F) as a section.", "Chemistry (CY) is beneficial if your core organic chemistry is strong."] }
          ]
       };
    } else if (slug === "fresher-guide") {
       defaultData = {
          checklist: [
             { "id": 1, "title": "Get your ID card", "desc": "Issued by the university office; vital for library access, bus concessions, and semester exams." },
             { "id": 2, "title": "Join department WhatsApp", "desc": "Connect with your batchmates and official SFI channel for timely circulars, notes, and updates." }
          ],
          tips: [
             { "icon": "💡", "tag": "High Yield", "title": "Master the Lab Routine Early", "text": "Polymer practicals and vivas carry high weightage. Complete your rough records on the same day and secure faculty signatures promptly. Don't let lab backlogs snowball." }
          ],
          accordion: [
             { "id": 1, "icon": "📍", "title": "Department Location", "shortDesc": "PSRT near main library", "content": { "badge": "Campus Landmark", "points": [ { "label": "Prime Location", "detail": "Located behind the Central Library." } ], "note": "Tip: Arrive from main gate." } }
          ]
       };
    }

    return NextResponse.json({ content: content?.body || "", data: content?.data || defaultData });
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch content" }, { status: 500 });
  }
}
