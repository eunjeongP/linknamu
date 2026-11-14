import { MongoClient, type Collection } from "mongodb";

export type ClickDoc = {
  _id: string; // 링크 id
  count: number;
};

const globalForMongo = globalThis as typeof globalThis & {
  _mongoClientPromise?: Promise<MongoClient>;
};

/**
 * 클릭 수 컬렉션을 돌려준다.
 * MONGODB_URI가 설정되지 않았으면 null (클릭 수 집계 없이 페이지만 동작).
 */
export async function getClicksCollection(): Promise<Collection<ClickDoc> | null> {
  const uri = process.env.MONGODB_URI;
  if (!uri) return null;

  // 개발 모드 HMR과 서버리스 재호출에서 연결을 재사용한다.
  if (!globalForMongo._mongoClientPromise) {
    // 연결이 안 될 때 페이지가 오래 멈추지 않도록 5초 안에 포기한다.
    const promise = new MongoClient(uri, {
      serverSelectionTimeoutMS: 5000,
    }).connect();
    // 연결 실패 시 다음 요청에서 다시 시도할 수 있게 캐시를 비운다.
    promise.catch(() => {
      if (globalForMongo._mongoClientPromise === promise) {
        globalForMongo._mongoClientPromise = undefined;
      }
    });
    globalForMongo._mongoClientPromise = promise;
  }

  const client = await globalForMongo._mongoClientPromise;
  return client
    .db(process.env.MONGODB_DB || "linknamu")
    .collection<ClickDoc>("clicks");
}
