import { NavLinkItem } from "@/components/assets/connections/nav-link";
import { TitlePage } from "@/components/clients/title-page";

export const metadata = {
  title: "Components Native",
  description: "ioeri Next App - Components server",
};

export default async function Page() {
  return (
    <>
      <TitlePage title="components" />

      <hr className="my-0.5" />

      {billingRoutes.map((i, index) => (
        <CollapsibleProvider key={index}>
          <CollapsibleTrigger
            withArrow={false}
            aria-label="billing menu"
            className="s_content_item bg-background w-full hover:bg-background [--open-bg:hsl(var(--background))] flex items-center justify-start"
          >
            {i.title}
          </CollapsibleTrigger>

          <CollapsibleContent className="flex flex-col gap-px [--fz-item:12px] w-[--trigger-w] [--content-h:86px]">
            {i.data.map((i, index) => (
              <NavLinkItem
                key={index}
                href={i.href}
                title={`• ${i.title}`}
                classNames={{ link: "inline s_content_item" }}
              />
            ))}
          </CollapsibleContent>
        </CollapsibleProvider>
      ))}

      <hr className="my-0.5" />

      {billingRoutes.map((i, index) => (
        <Collapsible key={index} side="right">
          <CollapsibleTrigger
            aria-label="billing menu"
            className="s_content_item bg-background hover:bg-background [--open-bg:hsl(var(--background))] flex items-center data-[side=right]:flex-row data-[side=left]:flex-row-reverse"
          >
            {i.title}
          </CollapsibleTrigger>

          <CollapsibleContent className="flex gap-px [--fz-item:12px]">
            {i.data.map((i, index) => (
              <NavLinkItem
                key={index}
                href={i.href}
                title={`• ${i.title}`}
                classNames={{ link: "inline s_content_item" }}
              />
            ))}
          </CollapsibleContent>
        </Collapsible>
      ))}
    </>
  );
}

import {
  Collapsible,
  CollapsibleContent,
  CollapsibleProvider,
  CollapsibleTrigger,
  CreditCardIcon,
  DashboardIcon,
  IconsIcon,
  ServerCogIcon,
} from "@/modules";
const billingRoutes = [
  {
    title: "Billing and plans",
    description: "",
    icon: CreditCardIcon,
    data: [
      {
        title: "Plans and usage",
        description: "",
        href: `/billing/summary`,
        icon: DashboardIcon,
      },
      {
        title: "Spending limits",
        description: "",
        href: `/billing/spending-limits`,
        icon: ServerCogIcon,
      },
      {
        title: "Payment information",
        description: "",
        href: `/billing/payment-information`,
        icon: IconsIcon,
      },
    ],
  },
];
