interface PostPageParams {
  params: Promise<{ slug: string }>;
}

export default async function PostPage({ params }: PostPageParams) {
  const { slug } = await params;

  const post = await fetch("endpoint", {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization: "Bearer xxxx",
    },
    cache: "force-cache",
    next: {
      revalidate: 60,
      tags: ["posts"],
    },
  });

  console.log(post);

  return <div>{slug}</div>;
}
