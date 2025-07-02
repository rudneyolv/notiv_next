/** @format */

import EditPost from "@/components/PageComponents/admin/EditPost/EditPost";
interface EditPostPageParams {
  params: Promise<{ slug: string }>;
}

export default async function EditPostPage({ params }: EditPostPageParams) {
  const { slug } = await params;

  return <EditPost slug={slug} />;
}
