"use client";
import { Command } from "@/modules/components/web";
import { CommandIcon, ComponentsIcon, HomeIcon } from "@/modules/icons";
import { SetProps, SetPropsSelect, useSetProps } from "../../__set_props";

export function Demo() {
  const props = useSetProps({ Str: "single" });
  const data = props.str === "single" ? dataSingle : dataGroup; // prettier-ignore
  return (
    <div>
      <Command modal={false} defaultOpen actions={data} nothingFound="Oops..." searchProps={{ autoFocus: false }} />
      <SetProps.Wrapper>
        <SetPropsSelect values={["single", "group"]} str={props.str} setStr={props.setStr} />
      </SetProps.Wrapper>
    </div>
  );
}

const dataSingle = [
  {
    id: "1",
    href: "/",
    label: "Home",
    description: "Get to home page",
    leftSection: <HomeIcon size={18} />,
  },
  {
    id: "2",
    href: "/docs",
    label: "Docs",
    description: "Get to docs page",
    leftSection: <CommandIcon size={18} />,
  },
  {
    id: "3",
    href: "/docs/components",
    label: "Components",
    description: "Get to components page",
    leftSection: <ComponentsIcon size={18} />,
  },
];

const dataGroup = [
  {
    group: "Group (1)",
    actions: [
      {
        id: "1-1",
        href: "/",
        label: "Repellat provident",
        description:
          "expedita et cum reprehenderit nostrum rerum est autem sunt architecto.",
      },
      {
        id: "1-2",
        href: "",
        label: "Eum et est occaecati",
        description:
          "assumenda provident rerum culpa quis hic commodi.",
      },
    ],
  },
  {
    group: "Group (2)",
    actions: [
      {
        id: "2-1",
        href: "",
        label: "Qui est esse",
        description:
          "reprehenderit dolor beatae ea dolores neque fugiat blanditiis.",
      },
      {
        id: "2-2",
        href: "",
        label: "Optio reprehenderit",
        description:
          "aut fugiat sit autem sed est voluptatem omnis possimus.",
      },
    ],
  },
  {
    group: "Group (3)",
    actions: [
      {
        id: "3-1",
        href: "",
        label: "Nesciunt quas odio",
        description:
          "sit autem sed est voluptatem omnis possimus esse voluptatibus.",
      },
      {
        id: "3-2",
        href: "",
        label: "Repellat qui ipsa sit aut",
        description:
          "aut ad voluptatem doloribus vel accusantium quis pariatur.",
      },
    ],
  },
];
