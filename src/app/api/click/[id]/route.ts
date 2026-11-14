import { links } from "@/data/profile";
import { incrementClick } from "@/lib/clicks";

export async function POST(
  _request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;

  // 등록된 링크만 집계한다.
  if (!links.some((link) => link.id === id)) {
    return Response.json({ error: "존재하지 않는 링크입니다." }, { status: 404 });
  }

  try {
    const saved = await incrementClick(id);
    if (!saved) {
      return Response.json(
        { error: "MONGODB_URI가 설정되지 않았습니다." },
        { status: 503 },
      );
    }
    return Response.json({ ok: true });
  } catch (error) {
    console.error("클릭 수 저장 실패:", error);
    return Response.json({ error: "클릭 수 저장에 실패했습니다." }, { status: 500 });
  }
}
