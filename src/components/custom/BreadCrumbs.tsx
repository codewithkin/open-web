"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

function capitalize(str: string) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

function BreadCrumbs() {
  const pathname = usePathname();

  const pathSegments = pathname
    .split("/")
    .filter((segment) => segment.length > 0);

  const crumbs = pathSegments.map((segment, index) => {
    const href = "/" + pathSegments.slice(0, index + 1).join("/");

    return {
      label: decodeURIComponent(segment),
      href,
    };
  });

  return (
    <Breadcrumb>
      <BreadcrumbList className="mb-4">
        <BreadcrumbItem>
          <BreadcrumbLink asChild>
            <Link href="/">Home</Link>
          </BreadcrumbLink>
        </BreadcrumbItem>

        {crumbs.map((crumb, index) => (
          <div key={crumb.href} className="flex items-center">
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbLink asChild>
                <Link href={crumb.href}>
                  {capitalize(crumb.label.replace(/-/g, " "))}
                </Link>
              </BreadcrumbLink>
            </BreadcrumbItem>
          </div>
        ))}
      </BreadcrumbList>
    </Breadcrumb>
  );
}

export default BreadCrumbs;