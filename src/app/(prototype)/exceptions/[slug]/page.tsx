import { notFound } from "next/navigation";
import ExceptionDecision from "@/components/ExceptionDecision";
import { leadException } from "@/lib/data";

/**
 * Exception Detail.
 *
 * Dynamic so Activity Trace and further exceptions can resolve the same
 * customer record by slug. Only Sarah exists in the prototype fixture.
 */
export function generateStaticParams() {
  return [{ slug: leadException.slug }];
}

export default async function ExceptionDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  if (slug !== leadException.slug) notFound();

  return <ExceptionDecision />;
}
