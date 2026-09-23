import { notFound } from "next/navigation";
import ImprovementReview from "@/components/ImprovementReview";
import { getImprovement, improvements } from "@/lib/coach";

export function generateStaticParams() {
  return improvements.map((i) => ({ slug: i.slug }));
}

export default async function ImprovementPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const imp = getImprovement(slug);
  if (!imp) notFound();

  return <ImprovementReview imp={imp} />;
}
