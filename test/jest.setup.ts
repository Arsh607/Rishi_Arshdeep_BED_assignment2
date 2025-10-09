jest.mock("../src/config/firebaseConfig", () => {
  const stores: Record<string, Record<string, any>> = {};

  const makeCollection = (name: string) => {
    const store = (stores[name] ??= {});

    const makeDocRef = (docId: string) => ({
      get: jest.fn(async () => {
        const exists = Object.prototype.hasOwnProperty.call(store, docId);
        return { exists, id: docId, data: () => store[docId] };
      }),
      set: jest.fn(async (data: any) => {
        store[docId] = data;
        return true;
      }),
      update: jest.fn(async (data: any) => {
        if (!store[docId]) return false;
        Object.assign(store[docId], data);
        return true;
      }),
     delete: jest.fn(async () => {
        if (store[docId]) {
            delete store[docId];
            return true;
        }
        return true; 
        })
    });

    return {
      get: jest.fn(async () => ({
        docs: Object.entries(store).map(([id, data]) => ({
          id,
          data: () => data,
        })),
      })),
      add: jest.fn(async (data: any) => {
        const newId = String(Object.keys(store).length + 1);
        store[newId] = data;
        return { id: newId };
      }),
      doc: jest.fn((id: string) => makeDocRef(id)),
    };
  };

  return {
    db: {
      collection: jest.fn((name: string) => makeCollection(name)),
    },
    auth: {
      verifyIdToken: jest.fn(),
      getUser: jest.fn(),
    },
  };
});
