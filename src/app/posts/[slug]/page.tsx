import Link from "next/link"
import { notFound } from "next/navigation"

interface WPPost {
  id: number
  slug: string
  title: {
    rendered: string
  }
  content: {
    rendered: string
  }
  date: string
  excerpt: {
    rendered: string
  }
  author: number
  featured_media: number
}

export async function generateStaticParams() {
  try {
    const res = await fetch("https://public-api.wordpress.com/wp/v2/sites/taiwodavid0027.wordpress.com/posts")

    if (!res.ok) {
      return []
    }

    const posts: WPPost[] = await res.json()
    return posts.map((post) => ({
      slug: post.slug,
    }))
  } catch (error) {
    console.error("Error generating static params:", error)
    return []
  }
}

async function getPostBySlug(slug: string): Promise<WPPost | null> {
  try {
    const res = await fetch(
      `https://public-api.wordpress.com/wp/v2/sites/taiwodavid0027.wordpress.com/posts?slug=${slug}`,
      {
        next: { revalidate: 60 },
      },
    )

    if (!res.ok) {
      return null
    }

    const data = await res.json()
    return data[0] || null
  } catch (error) {
    console.error("Error fetching post:", error)
    return null
  }
}

interface PostPageProps {
  params: Promise<{
    slug: string
  }>
}

export default async function PostPage({ params }: PostPageProps) {
  const { slug } = await params
  const post = await getPostBySlug(slug)

  if (!post) {
    notFound()
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    })
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-50 to-indigo-100">
      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-4 py-8">
        <article className="bg-white rounded-xl shadow-lg overflow-hidden">
          {/* Article Header */}
          <div className="px-8 py-6 border-b border-gray-200">
            <div className="flex items-center space-x-2 text-sm text-yellow-600 mb-4">
              <span className="bg-yellow-100 px-3 py-1 rounded-full font-medium">School News</span>
              <span className="text-gray-400">•</span>
              <time className="text-gray-600">{formatDate(post.date)}</time>
            </div>

            <h1
              className="text-3xl md:text-4xl font-bold text-gray-900 leading-tight mb-4"
              dangerouslySetInnerHTML={{ __html: post.title.rendered }}
            />
          </div>

          {/* Article Content */}
          <div className="px-8 py-6">
            <div
              className="prose prose-lg max-w-none prose-headings:text-gray-900 prose-p:text-gray-700 prose-p:leading-relaxed prose-a:text-yellow-600 prose-a:no-underline hover:prose-a:underline prose-strong:text-gray-900 prose-ul:text-gray-700 prose-ol:text-gray-700"
              dangerouslySetInnerHTML={{ __html: post.content.rendered }}
            />
          </div>

          {/* Article Footer */}
          <div className="px-8 py-6 bg-gray-50 border-t border-gray-200">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="w-10 h-10 bg-gradient-to-r from-yellow-500 to-purple-600 rounded-full flex items-center justify-center">
                  <span className="text-white font-semibold text-sm">👨‍🏫</span>
                </div>
                <div>
                  <p className="font-medium text-gray-900">School Administrator</p>
                  <p className="text-sm text-gray-600">Published on {formatDate(post.date)}</p>
                </div>
              </div>
            </div>
          </div>
        </article>

        {/* Navigation */}
        <div className="mt-8 flex justify-center">
          <Link
            href="/posts"
            className="inline-flex items-center space-x-2 px-6 py-3 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow text-gray-700 hover:text-yellow-600"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            <span className="font-medium">Back to All Posts</span>
          </Link>
        </div>
      </main>
    </div>
  )
}
