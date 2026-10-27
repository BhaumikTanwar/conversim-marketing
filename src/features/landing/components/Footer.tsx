/* eslint-disable @typescript-eslint/no-explicit-any */
import { Link } from "react-router";
import { motion } from "framer-motion";
import { storyblokEditable } from "@storyblok/react";
import { EASE } from "../../../lib/animations";
import { scrollToSection } from "../../../lib/utils";

interface FooterLink {
  _uid?: string;
  _editable?: string;
  component?: string;
  label?: string;
  url?: string;
  open_in_new_tab?: boolean;
}

interface FooterColumn {
  _uid?: string;
  _editable?: string;
  component?: string;
  heading?: string;
  links?: FooterLink[];
}

interface SocialLink {
  _uid?: string;
  _editable?: string;
  component?: string;
  label?: string;
  url?: string;
  open_in_new_tab?: boolean;
}

interface FooterBlok {
  _uid?: string;
  _editable?: string;
  component?: string;

  logo?: {
    filename?: string;
    alt?: string;
  };

  brand_name?: string;
  description?: string;

  footer_columns?: FooterColumn[];

  copyright_text?: string;

  social_links?: SocialLink[];
}

interface FooterProps {
  blok?: FooterBlok;
}

const defaultColumns: FooterColumn[] = [
  {
    heading: "Product",
    links: [
      {
        label: "Use Cases",
        url: "#use-cases",
      },
      {
        label: "How It Works",
        url: "#how-it-works",
      },
      {
        label: "Pricing",
        url: "#pricing",
      },
    ],
  },
  {
    heading: "Company",
    links: [
      {
        label: "About Us",
        url: "#",
      },
      {
        label: "Contact",
        url: "#",
      },
      {
        label: "Privacy Policy",
        url: "#",
      },
    ],
  },
];

const defaultSocialLinks: SocialLink[] = [
  {
    label: "LinkedIn",
    url: "https://www.linkedin.com/company/conversim",
    open_in_new_tab: true,
  },
];

export default function Footer({ blok }: FooterProps) {
  const columns = blok?.footer_columns ?? defaultColumns;

  const socialLinks = blok?.social_links ?? defaultSocialLinks;

  const brandName = blok ? blok.brand_name?.trim() || "" : "ConverSim";

  const description = blok
    ? blok.description?.trim() || ""
    : "Revolutionizing professional training through hyper-realistic AI avatar simulations.";

  const copyright = blok
    ? blok.copyright_text?.trim() || ""
    : "© {year} Conversim. All rights reserved.";

  function handleLinkClick(
    event: React.MouseEvent<HTMLAnchorElement>,
    url?: string,
  ) {
    if (!url) return;

    const isHomeAnchor = url.startsWith("#") || url.startsWith("/#");
    if (isHomeAnchor) {
      event.preventDefault();
      scrollToSection(url.replace(/^\/?#/, ""), event);
    }
  }

  function renderBrandName() {
    if (brandName.toLowerCase() === "conversim") {
      return (
        <>
          Conver<span className="text-brand">Sim</span>
        </>
      );
    }

    return brandName;
  }

  function renderCopyright() {
    return copyright.replace(
      "{year}",
      String(new Date().getFullYear()),
    );
  }

  return (
    <motion.footer
      {...(blok ? storyblokEditable(blok as any) : {})}
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.5, ease: EASE }}
      className="bg-slate-50 border-t border-slate-200 pt-16 md:pt-20 pb-10 z-content relative"
    >
      <div className="max-w-[1280px] 2xl:max-w-[1440px] 3xl:max-w-[1760px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12 mb-12 md:mb-16">

          {/* Brand */}
          {(blok?.logo?.filename || brandName || description) && <div className="col-span-2">
            <Link
              className="flex items-center gap-2.5 mb-5"
              to="/"
              onClick={(e) => scrollToSection("", e)}
            >
              {blok?.logo?.filename ? (
                <img
                  src={blok.logo.filename}
                  alt={blok.logo.alt || brandName}
                  className="h-8 w-auto"
                />
              ) : null}

              {brandName && <span className="font-semibold text-lg text-slate-900 tracking-tight">
                {renderBrandName()}
              </span>}
            </Link>

            {description && <p className="text-slate-600 text-sm max-w-sm leading-relaxed">
              {description}
            </p>}
          </div>}

          {/* Footer Columns */}
          {columns.map((column, columnIndex) => (
            <div
              key={
                column._uid ||
                `${column.heading || "column"}-${columnIndex}`
              }
              {...(column._uid
                ? storyblokEditable(column as any)
                : {})}
            >
              {column.heading && <h4 className="text-sm font-semibold text-slate-900 mb-5">
                {column.heading}
              </h4>}

              <ul className="space-y-3 text-sm">
                {(column.links || []).filter((link) => link.label && link.url).map((link, linkIndex) => {
                  const url = link.url || "#";
                  const isHomeAnchor = url.startsWith("#") || url.startsWith("/#");

                  return (
                    <li
                      key={
                        link._uid ||
                        `${link.label || "link"}-${linkIndex}`
                      }
                      {...(link._uid
                        ? storyblokEditable(link as any)
                        : {})}
                    >
                      <a
                        className="text-slate-600 hover:text-slate-900 transition-colors"
                        href={isHomeAnchor ? `/#${url.replace(/^\/?#/, "")}` : url}
                        target={
                          link.open_in_new_tab
                            ? "_blank"
                            : undefined
                        }
                        rel={
                          link.open_in_new_tab
                            ? "noopener noreferrer"
                            : undefined
                        }
                        onClick={(e) =>
                          handleLinkClick(e, url)
                        }
                      >
                        {link.label}
                      </a>
                    </li>
                  );
                })}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom */}
        <div className="border-t border-slate-200 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-slate-500">
          {copyright && <p>{renderCopyright()}</p>}

          <div className="flex gap-6">
            {socialLinks.filter((social) => social.label && social.url).map((social, index) => (
              <a
                key={
                  social._uid ||
                  `${social.label || "social"}-${index}`
                }
                {...(social._uid
                  ? storyblokEditable(social as any)
                  : {})}
                target={
                  social.open_in_new_tab
                    ? "_blank"
                    : undefined
                }
                rel={
                  social.open_in_new_tab
                    ? "noopener noreferrer"
                    : undefined
                }
                className="hover:text-slate-900 transition-colors"
                href={social.url || "#"}
              >
                {social.label}
              </a>
            ))}
          </div>
        </div>
      </div>
    </motion.footer>
  );
}
