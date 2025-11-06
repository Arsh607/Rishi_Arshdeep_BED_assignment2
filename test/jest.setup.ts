jest.mock("../src/config/firebaseConfig", () => {
  const store: Record<string, any> = {};

  const mockDoc = (docId: string) => ({
    get: jest.fn(async () => ({
      exists: !!store[docId],
      data: () => store[docId],
    })),
    set: jest.fn(async (data) => {
      store[docId] = data;
      return true;
    }),
    update: jest.fn(async (data) => {
      if (store[docId]) {
        Object.assign(store[docId], data);
        return true;
      }
      return false;
    }),
    delete: jest.fn(async () => {
      if (store[docId]) {
        delete store[docId];
        return true;
      }
      return false;
    }),
  });

  const mockCollection = {
    get: jest.fn(async () => ({
      docs: Object.entries(store).map(([id, data]) => ({
        id,
        data: () => data,
      })),
    })),
    add: jest.fn(async (data) => {
      const newId = (Object.keys(store).length + 1).toString();
      store[newId] = data;
      return { id: newId }; // ✅ guarantee an id is returned
    }),
    doc: jest.fn((id: string) => mockDoc(id)),
  };

  return {
    db: {
      collection: jest.fn(() => mockCollection),
    },
    auth: {
      verifyIdToken: jest.fn(),
      getUser: jest.fn(),
    },
  };
});
