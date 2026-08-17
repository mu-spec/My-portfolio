import { Container } from "@/components/ui/container";
import { primaryNav } from "@/config/navigation";
import { siteConfig } from "@/config/site";

/**
 * Footer foundation.
 *
 * Contains only verified information: the wordmark, the reserved section
 * links and the confirmed GitHub profile. Contact details and social links
 * are added in a later milestone once verified.
 */
export function SiteFooter() {
  const year = new Date().getFullYear();

  return (
    <footer className="mt-auto border-t border-line">
      <Container>
        <div className="flex flex-col gap-10 py-14 sm:py-16">
          <div className="flex flex-col gap-8 sm:flex-row sm:items-start sm:justify-between">
            <div className="flex flex-col gap-2">
              <span className="text-[0.9375rem] font-semibold tracking-tight text-ink">
                {siteConfig.name}
              </span>
              <span className="text-sm text-ink-subtle">{siteConfig.role}</span>
            </div>

            <nav aria-label="Footer">
              <ul className="flex flex-wrap gap-x-6 gap-y-3">
                {primaryNav.map((item) => (
                  <li key={item.href}>
                    <a
                      href={item.href}
                      className="rounded-xs text-sm text-ink-muted transition-colors hover:text-ink focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--color-focus)]"
                    >
                      {item.label}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          </div>

          {/* Contact details and any approved profile links are added in a
              later milestone. Source repositories are private and are never
              linked here. */}
          <div className="border-t border-line pt-8">
            <p className="text-sm text-ink-subtle">
              © {year} {siteConfig.name}
            </p>
          </div>
        </div>
      </Container>
    </footer>
  );
}
