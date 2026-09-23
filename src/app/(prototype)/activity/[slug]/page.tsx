import { notFound } from "next/navigation";
import ActivityTrace from "@/components/ActivityTrace";
import { getTrace, traces } from "@/lib/activity";

export function generateStaticParams() {
  return traces.map((t) => ({ slug: t.slug }));
}

export default async function ActivityTracePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const trace = getTrace(slug);
  if (!trace) notFound();

  return <ActivityTrace trace={trace} />;
}
