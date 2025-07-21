export default interface WPPost {
  id: number
  slug: string
  title: {
    rendered: string
  }
  excerpt: {
    rendered: string
  }
  date: string
}