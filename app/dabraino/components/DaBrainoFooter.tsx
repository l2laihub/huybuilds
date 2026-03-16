import Link from "next/link";
import { StoreBadges } from "./StoreBadges";

export function DaBrainoFooter() {
  return (
    <footer className="border-t border-[#F0E6D8] bg-[#FFF3E0]/50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
          <div>
            <h3 className="text-lg font-bold text-[#2D1B0E] mb-3">DaBraino</h3>
            <p className="text-sm text-[#6B5744] mb-4">
              Math Bingo for Kids. Free, safe, and fun.
            </p>
            <StoreBadges size="sm" />
          </div>

          <div>
            <h4 className="text-sm font-semibold text-[#2D1B0E] uppercase tracking-wider mb-3">
              Links
            </h4>
            <ul className="space-y-2">
              {[
                { href: "/dabraino", label: "Home" },
                { href: "/dabraino/faq", label: "FAQ" },
                { href: "/dabraino/support", label: "Support" },
                { href: "/dabraino/privacy", label: "Privacy Policy" },
              ].map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-[#6B5744] hover:text-[#9B59B6] transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-semibold text-[#2D1B0E] uppercase tracking-wider mb-3">
              Contact
            </h4>
            <a
              href="mailto:hello@huybuilds.app"
              className="text-sm text-[#6B5744] hover:text-[#9B59B6] transition-colors"
            >
              hello@huybuilds.app
            </a>
          </div>
        </div>

        <div className="mt-10 pt-6 border-t border-[#F0E6D8] text-center">
          <p className="text-xs text-[#6B5744]">
            &copy; 2026 huybuilds. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
