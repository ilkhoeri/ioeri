// by default selectors using className ".embeded-image"
function MyComponent() {
  useImagePopup();

  return (
    <div>
      <article>
        <img className="embeded-image" src="https://.../a.png" alt="" width="50" height="50" />
        <img className="embeded-image" src="https://.../b.jpg" alt="" width="50" height="50" />
        <img className="embeded-image" src="https://.../c.svg" alt="" width="50" height="50" />
      </article>
    </div>
  );
}

function MyComponent() {
  useImagePopup({ selectors: "[data-popup]" });

  return (
    <div>
      <article>
        <img data-popup="" src="https://.../a.png" alt="" width="50" height="50" />
        <img data-popup="" src="https://.../b.jpg" alt="" width="50" height="50" />
        <img data-popup="" src="https://.../c.svg" alt="" width="50" height="50" />
      </article>
    </div>
  );
}

function MyComponent() {
  useImagePopup({ selectors: "img" });

  return (
    <div>
      <article>
        <img src="https://.../a.png" alt="" width="50" height="50" />
        <img src="https://.../b.jpg" alt="" width="50" height="50" />
        <img data-popup="" src="https://.../c.svg" alt="" width="50" height="50" />
      </article>
      <img className="embeded-image" src="https://.../x.png" alt="" width="50" height="50" />
      <img className="" src="https://.../y.png" alt="" width="50" height="50" />
    </div>
  );
}