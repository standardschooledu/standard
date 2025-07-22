import Link from "next/link";
import WPPost from "@/types/wppost";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ArrowRight, Calendar } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import Image from "next/image";

async function getPosts(): Promise<WPPost[]> {
  try {
    const res = await fetch(
      "https://public-api.wordpress.com/wp/v2/sites/taiwodavid0027.wordpress.com/posts",
      {
        next: { revalidate: 0 },
      }
    );

    if (!res.ok) {
      return [];
    }

    return res.json();
  } catch (error) {
    console.error("Error fetching posts:", error);
    return [];
  }
}

export default async function BlogPage() {
  const posts = await getPosts();

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-50 to-indigo-100">
      {/* Main Content */}
      <main className="max-w-6xl mx-auto px-4 py-8">
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-2">
            Latest Posts
          </h2>
          <p className="text-gray-600">
            Discover what's happening at our school
          </p>
        </div>

        {posts.length === 0 ? (
          <div className="text-center py-12">
            <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-gray-400 text-2xl">📝</span>
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              No posts available
            </h3>
            <p className="text-gray-600">Check back later for new content!</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {posts.map((post) => (
              // <article
              //   key={post.id}
              //   className="bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow overflow-hidden"
              // >
              //   <div className="p-6 h-full flex flex-col">
              //     <div className="flex items-center space-x-2 text-sm text-yellow-600 mb-3">
              //       <span className="bg-yellow-100 px-2 py-1 rounded-full font-medium">School News</span>
              //       <span className="text-gray-400">•</span>
              //       <time className="text-gray-600">{formatDate(post.date)}</time>
              //     </div>

              //     <h3
              //       className="text-xl font-bold text-gray-900 mb-3 line-clamp-2"
              //       dangerouslySetInnerHTML={{ __html: post.title.rendered }}
              //     />

              //     {post.excerpt?.rendered && (
              //       <div
              //         className="text-gray-600 mb-4 line-clamp-3"
              //         dangerouslySetInnerHTML={{ __html: post.excerpt.rendered }}
              //       />
              //     )}

              //     <Link
              //       href={`/posts/${post.slug}`}
              //       className="inline-flex items-center space-x-2 text-yellow-600 hover:text-yellow-700 mt-auto font-medium"
              //     >
              //       <span>Read More</span>
              //       <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              //         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              //       </svg>
              //     </Link>
              //   </div>
              // </article>
              <Card
                key={post.id}
                className="border-gray-50 pt-0 hover:shadow-lg transition-shadow overflow-hidden"
              >
                <div className="relative h-64">
                  <Image
                    src={post.jetpack_featured_media_url || "/file.jpg"}
                    alt={post.title.rendered}
                    fill
                    className="object-cover h-32"
                  />
                </div>
                <CardHeader>
                  <div className="flex items-center text-sm text-ash-500 mb-2">
                    <Calendar className="h-4 w-4 mr-1" />
                    {formatDate(post.date)}
                  </div>
                  <CardTitle className="text-ash-900 hover:text-primary transition-colors">
                    <Link href={`/blog/${post.id}`} dangerouslySetInnerHTML={{ __html: post.title.rendered }} />
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-gray-500 mb-4" dangerouslySetInnerHTML={{ __html: post.excerpt.rendered }} />
                  <Link
                    href={`/posts/${post.slug}`}
                    className="text-primary hover:text-gold-700 font-medium inline-flex items-center mt-auto"
                  >
                    Read More
                    <ArrowRight className="ml-1 h-4 w-4" />
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
