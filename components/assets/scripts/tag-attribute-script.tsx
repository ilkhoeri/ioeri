import Script from "next/script";

const tagAttributeScript = `const allElements = document.querySelectorAll('body *');
            allElements.forEach((element) => {
              const elementName = element.tagName.toLowerCase();
              element.setAttribute('data-ioeri-el', elementName);
            });`;

export const TagAttributeScript = () => (
  <Script
    id="el-tagName"
    dangerouslySetInnerHTML={{
      __html: tagAttributeScript,
    }}
  />
);
