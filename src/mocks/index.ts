async function initMocks() {
  if (process.env.NODE_ENV === "development") {
    if (typeof window !== "undefined") {
      const { worker } = await import("./browser");
      worker.start();
    } else {
      const { server } = await import("./server");
      server.listen();
    }
  }
}

initMocks();

export {};
