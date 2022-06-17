import type { LayoutProps } from "./Layout.d";

export function Layout({ children }: LayoutProps) {
  return (
    <div className="mx-auto transition-all overflow-x-hidden ease-in-out duration-300 overflow-auto dark:bg-black/50 bg-white h-full items-start w-full flex flex-col dark:text-white text-black">
      {children}
    </div>
  );
}
