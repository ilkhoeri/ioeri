"use client";
import { Command } from "@/modules/components/web";
import { CommandIcon, ComponentsIcon, HomeIcon } from "@/modules/icons";
import { SetProps, SetPropsSelect, useSetProps } from "../../__set_props";

export function Demo() {
  const props = useSetProps({ Str: "single" });
  const actions = props.str === "single" ? actionsSingle : actionsGroup; // prettier-ignore
  return (
    <div>
      <Command modal={false} defaultOpen actions={actions} nothingFound="Oops..." searchProps={{ autoFocus: false }} />
      <SetProps.Wrapper>
        <SetPropsSelect values={["single", "group"]} str={props.str} setStr={props.setStr} />
      </SetProps.Wrapper>
    </div>
  );
}

const actionsSingle = [
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

const actionsGroup = [
  {
    group: "Group 1",
    actions: [
      {
        id: "1",
        href: "",
        label: "Sunt aut facere repellat provident",
        description:
          "quia et suscipit suscipit recusandae consequuntur expedita et cum reprehenderit nostrum rerum est autem sunt architecto.",
      },
    ],
  },
  {
    group: "Group 2",
    actions: [
      {
        id: "1",
        href: "",
        label: "Qui est esse",
        description:
          "est rerum tempore vitae sequi sint nihil reprehenderit dolor beatae ea dolores neque fugiat blanditiis.",
      },
      {
        id: "2",
        href: "",
        label: "Occaecati excepturi optio reprehenderit",
        description:
          "repudiandae veniam quaerat sunt sed alias aut fugiat sit autem sed est voluptatem omnis possimus.",
      },
    ],
  },
  {
    group: "Group 3",
    actions: [
      {
        id: "1",
        href: "",
        label: "Nesciunt quas odio",
        description:
          "repudiandae veniam quaerat sunt sed alias aut fugiat sit autem sed est voluptatem omnis possimus esse voluptatibus.",
      },
      {
        id: "2",
        href: "",
        label: "Eum et est occaecati",
        description:
          "ullam et saepe reiciendis voluptatem adipisci sit amet autem assumenda provident rerum culpa quis hic commodi.",
      },
      {
        id: "3",
        href: "",
        label: "Molestias quasi exercitationem repellat qui ipsa sit aut",
        description:
          "et iusto sed quo iure voluptatem occaecati omnis eligendi aut ad voluptatem doloribus vel accusantium quis pariatur.",
      },
    ],
  },
];
