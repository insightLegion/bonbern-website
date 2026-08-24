import TailwindImageAccordion from "@/components/ui/tailwind-image-accordion"
import { FooterCta } from "@/components/ui/ember-footer-cta"

export function TeamAccordionDemo() {
  return (
    <div className="w-full py-10">
      <TailwindImageAccordion />
    </div>
  )
}

export function FooterCtaDemo() {
  return (
    <div className="w-full">
      <FooterCta />
    </div>
  )
}

export default function Default() {
  return (
    <div className="w-full py-10 space-y-16">
      <TailwindImageAccordion />
      <FooterCta />
    </div>
  )
}
