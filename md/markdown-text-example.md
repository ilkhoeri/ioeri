<div align="center">
  <a href="https://www.npmjs.com/org/ioeri" target="_blank">
    <img src="https://raw.githubusercontent.com/ioeridev/.github/main/profile/ioeri-512x512.png" alt="ioeri" height="200" style="width: 200px;height: 200px;border-radius: 8px;overflow: hidden;" />
  </a>
</div>

<h1 align="center"><strong>ioeri Documentation.</strong></h1>

<h3 align="center">
  <code>ioeri</code> it′s means leading, pronounced /yori/, <code>🔊</code> like ′iori′ spoken Yoruba.
</h3>

___

Team support <ioeri.dev@gmail.com>. You can contact this email.

___

```
document.addEventListener("click", function (event) {
  const target = event.target as HTMLElement;

  if (target && target.closest(".clipboard-button")) {
    const button = target.closest(".clipboard-button") as HTMLElement;
    const useElement = button.querySelector("use") as SVGUseElement;

    const textToCopy = button.getAttribute("data-value");
    if (textToCopy) {
      navigator.clipboard
        .writeText(textToCopy)
        .then(() => {
          button.setAttribute("data-copied", "success");
          alert("Text copied to clipboard!");
        })
        .catch((err) => {
          console.error("Failed to copy text: ", err);
        });
    }
  }
});
```

```
function stripHtml(text: string) {
  text = text.replace(/<[^>]*>/g, "");
  text = text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;")
    .replace(/\*/g, "")
    .replace(/\_/g, "");
  return text.trim();
}
```

___

## [core - component ui repository](https://github.com/ioeridev/ioeri)

<div align="left">
  <a href="https://www.npmjs.com/package/ioeri">
    <img src="https://badgen.net/npm/v/ioeri" alt="version" />
  </a>
  <a href="https://npmjs.org/package/ioeri">
    <img src="https://badgen.now.sh/npm/dm/ioeri" alt="downloads" />
  </a>
</div>

1 How do we build a component independently without depending on other components.
2 How does a polymorphic component carry valid properties for itself.
3 Complicated but fun to use.

> You can guide or [join our community](https://github.com/ioeridev/ioeri/blob/master/CONTRIBUTING.md) to build multi-functional polymorphic projects.

## [ioeri-presetcss - styles css preset](https://github.com/ioeridev/ioeri-presetcss)

<div align="left">
  <a href="https://www.npmjs.com/package/ioeri-presetcss">
    <img src="https://badgen.net/npm/v/ioeri-presetcss" alt="version" />
  </a>
  <a href="https://npmjs.org/package/ioeri-presetcss">
    <img src="https://badgen.now.sh/npm/dm/ioeri-presetcss" alt="downloads" />
  </a>
</div>

- ioeri components work in their own style, but some aspects require compatibility with other ui.
- The ui projects we build are not to be competitors or substitutes but rather to complete the specific needs that are common to users.
- <code>′ioeri-presetcss′</code> will allow that to happen and work fine by adding configuration to <code>postcss.config.js</code>.

> See the [documentation](https://github.com/ioeridev/ioeri-presetcss) and how it works.

## [cn-ex - className extend](https://github.com/ioeridev/cn-ex)

<div align="left">
  <a href="https://www.npmjs.com/package/cn-ex">
    <img src="https://badgen.net/npm/v/cn-ex" alt="version" />
  </a>
  <a href="https://npmjs.org/package/cn-ex">
    <img src="https://badgen.now.sh/npm/dm/cn-ex" alt="downloads" />
  </a>
</div>

- The utility functions of class string groups and conditionals.

> See the [documentation](https://github.com/ioeridev/cn-ex) and how it works.

## [ioeri-icons - Popular brand and unpopularity icons](https://github.com/ioeridev/ioeri-icons)

<div align="left">
  <a href="https://www.npmjs.com/package/ioeri-icons">
    <img src="https://badgen.net/npm/v/ioeri-icons" alt="version" />
  </a>
  <a href="https://npmjs.org/package/ioeri-icons">
    <img src="https://badgen.now.sh/npm/dm/ioeri-icons" alt="downloads" />
  </a>
</div>

- Popular brand and unpopularity icons for React app.

> See the [documentation](https://github.com/ioeridev/ioeri-icons) and how it works.

<!--

**Here are some ideas to get you started:**

🙋‍♀️ A short introduction - what is your organization all about?
🌈 Contribution guidelines - how can the community get involved?
👩‍💻 Useful resources - where can the community find your docs? Is there anything else the community should know?
🍿 Fun facts - what does your team eat for breakfast?
🧙 Remember, you can do mighty things with the power of [Markdown](https://docs.github.com/github/writing-on-github/getting-started-with-writing-and-formatting-on-github/basic-writing-and-formatting-syntax)
-->
