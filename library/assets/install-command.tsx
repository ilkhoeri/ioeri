"use client";

import { useEffect, useState } from "react";
import { TerminalOutlineIcon } from "@/modules";
import { CopyToggle } from "@/library/components/toggle";
import { appRoutes } from "@/library/routes";

import style from "@/library/styles/ioeri.module.css";

export function InstallCommand() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const allCommands = appRoutes["frameworks"].flatMap((framework) => framework.data.map((item) => item.cmd));

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % allCommands.length);
    }, 8000);

    return () => clearInterval(interval);
  }, [allCommands.length]);

  const currentCmd = allCommands[currentIndex];

  return (
    <div className="grid sm:grid-cols-2 mt-8">
      <div className="overflow-hidden relative border border-muted rounded-xl bg-subtle bg-muted/40 backdrop-blur">
        <div className="flex flex-col gap-4 relative z-10">
          <div className="font-mono flex flex-col mb-4 last:mb-0">
            <hgroup className="flex items-center justify-between overflow-hidden min-h-[48px] px-3 rounded-t-md border-b-[0.5px] border-b-muted bg-[#eaecee] dark:bg-[#202425]">
              <p className="flex items-center gap-2 h-10 select-none font-medium truncate text-muted-foreground font-mono">
                <TerminalOutlineIcon className="size-[18px] mt-0.5 text-constructive" />
                Terminal
              </p>

              <CopyToggle
                text={`npx ${currentCmd}`}
                className="border-[0.5px] relative top-auto right-auto text-muted-foreground bg-background ml-auto"
              />
            </hgroup>

            <pre className="relative rounded-b-md overflow-x-auto webkit-scrollbar py-8 pl-4 pr-2 leading-[19px] text-color bg-background border border-transparent whitespace-nowrap flex flex-col">
              <code className="w-max leading-normal flex flex-row items-center text-nowrap whitespace-pre bg-transparent border-none text-color relative overflow-hidden box-border">
                <p className="text-muted-foreground">-&nbsp;</p>
                <p className="text-[#e34ba9]">npx&nbsp;</p>
                <p data-cmd={currentCmd} className={style.cmd} />
              </code>
            </pre>
          </div>
        </div>
      </div>
    </div>
  );
}
