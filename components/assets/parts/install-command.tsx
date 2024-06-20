"use client";

import { useEffect, useState } from "react";
import { TerminalOutlineIcon } from "@/modules";
import { CopyToggle } from "@/components/ui/toggle";
import { frameworks } from "@/routes";

import css from "./ioeri.module.css";

export function InstallCommand() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const TYPING = frameworks.map((i) => i.cmd);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % frameworks.length);
    }, 8000);

    return () => clearInterval(interval);
  }, []);

  const cmd = frameworks[currentIndex].cmd;

  return (
    <div className="grid sm:grid-cols-2 mt-8">
      <div className="py-8 px-4 overflow-hidden relative border rounded-xl bg-subtle bg-muted/40 backdrop-blur">
        <div className="flex flex-col gap-4 relative z-10">
          <div className="font-mono flex flex-col mb-4 last:mb-0">
            <hgroup className="flex items-center justify-between overflow-hidden min-h-[40px] px-3 rounded-t-md border-b-[0.5px] border-b-muted bg-[#eaecee] dark:bg-[#202425]">
              <p className="flex items-center gap-2 h-10 select-none font-medium truncate text-muted-foreground">
                <TerminalOutlineIcon className="size-[18px] mt-0.5 text-constructive" />
                Terminal
              </p>

              <CopyToggle
                text={`npx ${cmd}`}
                className="border-[0.5px] relative top-auto right-auto text-muted-foreground bg-background ml-auto"
              />
            </hgroup>

            <pre className="relative rounded-b-md overflow-x-auto webkit-scrollbar p-4 pl-1.5 leading-[19px] text-color bg-background border border-transparent whitespace-nowrap flex flex-col">
              <code className="w-max leading-normal flex flex-row items-center text-nowrap whitespace-pre bg-transparent border-none text-color relative overflow-hidden box-border">
                <p className="text-muted-foreground">-&nbsp;</p>
                <p className="text-[#e34ba9]">npx&nbsp;</p>
                <p data-cmd={cmd} className={css.cmd} />
              </code>
            </pre>
          </div>
        </div>
      </div>
    </div>
  );
}
