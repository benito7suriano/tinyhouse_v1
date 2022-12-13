interface Body {
  query: string
}

export const server = {
  fetch: async (body: Body) => {
    const res = await fetch('/api')
  },
}
