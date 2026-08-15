import { FaqSection } from "@/components/faq-section";
import { dict } from "@/lib/dict";

/**
 * Homepage FAQ. Reuses the shared FaqSection so the accordion behaviour and the
 * FAQPage structured data stay identical to the service and neighborhood pages.
 */
export function HomeFaq() {
  return <FaqSection items={[...dict.homeFaq.items]} bg="bg-white" />;
}
