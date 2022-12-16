export {}

declare global {
  interface Window {
    createObjectURL: any // 👈️ turn off type checking
  }
}
