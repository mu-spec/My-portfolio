import { Logo } from "@/components/layout/logo";
import { MobileNav } from "@/components/layout/mobile-nav";
import { NavLink } from "@/components/layout/nav-link";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { primaryCta, primaryNav } from "@/config/navigation";

/**
 * Site header.
 *
 * Server component by default — only the mobile disclosure ships JavaScript.
 * The desktop navigation is plain anchors, so it works without hydration.
 */
export function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 border-b border-line bg-base/85 backdrop-blur-md">
      <Container>
        <div className="flex h-16 items-center justify-between gap-6">
          <Logo />

          <nav aria-label="Primary" className="hidden md:block">
            <ul className="flex items-center gap-1">
              {primaryNav.map((item) => (
                <li key={item.href}>
                  <NavLink
                    href={item.href}
                    className="inline-flex h-10 items-center rounded-md px-3.5 text-[0.9375rem] font-medium text-ink-muted transition-colors hover:bg-elevated hover:text-ink focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-focus)]"
                    activeClassName="bg-elevated text-ink"
                  >
                    {item.label}
                  </NavLink>
                </li>
              ))}
            </ul>
          </nav>

          <div className="hidden md:block">
            <Button href={primaryCta.href} size="md">
              {primaryCta.label}
            </Button>
          </div>

          <MobileNav />
        </div>
      </Container>
    </header>
  );
}
