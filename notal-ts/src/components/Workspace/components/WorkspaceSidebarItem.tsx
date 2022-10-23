import { Tooltip, Button } from "@components";
import { ReactNode } from "react";

interface WorkspaceSidebarItemProps {
  icon: ReactNode;
  title: string;
  onClick?: () => void;
}

export function WorkspaceSidebarItem({
  icon,
  title,
  onClick,
}: WorkspaceSidebarItemProps) {
  return (
    <Tooltip
      content={title}
      direction="right"
      containerClassName="justify-center items-center"
      allContainerClassName="w-10"
      outline
    >
      <Button
        className="justify-center"
        size="h-10"
        rounded="rounded-lg"
        light="border-2 border-neutral-200 dark:border-0 focus:outline-2 bg-neutral-100 dark:bg-neutral-900 backdrop-blur-sm shadow-lg"
        title={title}
        aria-label={title}
        onClick={onClick}
      >
        {icon}
      </Button>
    </Tooltip>
  );
}
