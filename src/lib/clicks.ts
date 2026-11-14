import { getClicksCollection } from "./mongodb";

/** 링크 id → 클릭 수. DB가 없거나 연결에 실패하면 빈 객체. */
export async function getClickCounts(): Promise<Record<string, number>> {
  try {
    const collection = await getClicksCollection();
    if (!collection) return {};
    const docs = await collection.find().toArray();
    return Object.fromEntries(docs.map((doc) => [doc._id, doc.count]));
  } catch (error) {
    console.error("클릭 수를 불러오지 못했습니다:", error);
    return {};
  }
}

/** 클릭 수를 1 올린다. DB가 설정되지 않았으면 false. */
export async function incrementClick(id: string): Promise<boolean> {
  const collection = await getClicksCollection();
  if (!collection) return false;
  await collection.updateOne(
    { _id: id },
    { $inc: { count: 1 } },
    { upsert: true },
  );
  return true;
}
