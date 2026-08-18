import { NavLink } from "@/components/layout/nav-link";
import { Container } from "@/components/ui/container";
import { primaryNav } from "@/config/navigation";
import { getContactEmail, siteConfig } from "@/config/site";

/**
 * Site footer.
 *
 * Contains only verified information: the wordmark, the role, the primary
 * navigation and — once configured — a direct email link. Application source
 * repositories are private and are never linked here.
 */
export function SiteFooter() {
  const year = new Date().getFullYear();
  const email = getContactEmail();

  return (
    <footer className="mt-auto border-t border-line">
      <Container>
        <div className="flex flex-col gap-10 py-14 sm:py-16">
          <div className="flex flex-col gap-8 sm:flex-row sm:items-start sm:justify-between">
            <div className="flex flex-col gap-2">
              <span className="text-[0.9375rem] font-semibold tracking-tight text-ink">
                {siteConfig.name}
              </span>
              <span className="text-[0.9375rem] text-ink-subtle">{siteConfig.role}</span>
            </div>

            <nav aria-label="Footer">
              <ul className="flex flex-wrap gap-x-6 gap-y-3">
                {primaryNav.map((item) => (
                  <li key={item.href}>
                    <NavLink
                      href={item.href}
                      className="rounded-xs text-[0.9375rem] text-ink-muted transition-colors hover:text-ink focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--color-focus)]"
                      activeClassName="text-ink"
                    >
                      {item.label}
                    </NavLink>
                  </li>
                ))}
              </ul>
            </nav>
          </div>

          {/* Only a verified address is ever rendered. No profile or
              repository links: application source stays private. */}
          <div className="flex flex-col gap-4 border-t border-line pt-8 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-sm text-ink-subtle">
              © {year} {siteConfig.name}
            </p>

            {email ? (
              <a
                href={`mailto:${email}`}
                className="rounded-xs text-sm text-ink-muted transition-colors hover:text-ink focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--color-focus)]"
              >
                {email}
              </a>
            ) : null}
          </div>
        </div>
      </Container>
    </footer>
  );
}
