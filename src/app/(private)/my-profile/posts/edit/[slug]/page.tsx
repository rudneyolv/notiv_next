/** @format */

import EditPost from "@/components/page-components/my-profile/posts/edit-post/edit-post";

interface EditPostPageParams {
  params: Promise<{ slug: string }>;
}

export default async function EditPostPage({ params }: EditPostPageParams) {
  const { slug } = await params;

  return <EditPost slug={slug} />;
}
