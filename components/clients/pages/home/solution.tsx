import { Transform } from "@/modules";

import style from "./ioeri.module.css";

export function Solution() {
  return (
    <section id="learn-more" className={style.solution_section}>
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
        <path
          fillRule="evenodd"
          d="M2.25 13.5a8.25 8.25 0 018.25-8.25.75.75 0 01.75.75v6.75H18a.75.75 0 01.75.75 8.25 8.25 0 01-16.5 0z"
          clipRule="evenodd"
        />
        <path
          fillRule="evenodd"
          d="M12.75 3a.75.75 0 01.75-.75 8.25 8.25 0 018.25 8.25.75.75 0 01-.75.75h-7.5a.75.75 0 01-.75-.75V3z"
          clipRule="evenodd"
        />
      </svg>

      <div>
        <figure>
          <Transform
            el={"img"}
            withoutOpacity
            transform={{
              before: "rotateX(0) rotateZ(0)",
              after: "rotateX(51deg) rotateZ(43deg)",
              style: "preserve-3d",
            }}
            transition="all ease 0.5s 0.35s, box-shadow ease-in-out 0.5s 0.6s"
            src="/images/clients/pie.svg"
            alt="image"
            loading="lazy"
            width="100"
            height="100"
          />
        </figure>

        <article>
          <h4>Development is carried out by passionate developers</h4>
          <p>
            Nobis minus voluptatibus pariatur dignissimos libero quaerat iure expedita at? Asperiores nemo possimus
            nesciunt dicta veniam aspernatur quam mollitia. <br /> <br /> Vitae error, quaerat officia delectus
            voluptatibus explicabo quo pariatur impedit, at reprehenderit aliquam a ipsum quas voluptatem. Quo pariatur
            asperiores eum amet.
          </p>

          <div className={style.wrap_bottom}>
            <div className={style.inner_top}>
              <div>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                  <path
                    fillRule="evenodd"
                    d="M4.848 2.771A49.144 49.144 0 0112 2.25c2.43 0 4.817.178 7.152.52 1.978.292 3.348 2.024 3.348 3.97v6.02c0 1.946-1.37 3.678-3.348 3.97a48.901 48.901 0 01-3.476.383.39.39 0 00-.297.17l-2.755 4.133a.75.75 0 01-1.248 0l-2.755-4.133a.39.39 0 00-.297-.17 48.9 48.9 0 01-3.476-.384c-1.978-.29-3.348-2.024-3.348-3.97V6.741c0-1.946 1.37-3.68 3.348-3.97zM6.75 8.25a.75.75 0 01.75-.75h9a.75.75 0 010 1.5h-9a.75.75 0 01-.75-.75zm.75 2.25a.75.75 0 000 1.5H12a.75.75 0 000-1.5H7.5z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>

              <div>
                <h4>Chat Anytime</h4>
                <p>Asperiores nemo possimus nesciunt quam mollitia.</p>
              </div>
            </div>

            <div className={style.inner_bottom}>
              <div>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                  <path
                    fillRule="evenodd"
                    d="M11.54 22.351l.07.04.028.016a.76.76 0 00.723 0l.028-.015.071-.041a16.975 16.975 0 001.144-.742 19.58 19.58 0 002.683-2.282c1.944-1.99 3.963-4.98 3.963-8.827a8.25 8.25 0 00-16.5 0c0 3.846 2.02 6.837 3.963 8.827a19.58 19.58 0 002.682 2.282 16.975 16.975 0 001.145.742zM12 13.5a3 3 0 100-6 3 3 0 000 6z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>

              <div>
                <h4>Real Time Location</h4>
                <p>Asperiores nemo possimus nesciunt quam mollitia.</p>
              </div>
            </div>
          </div>
        </article>
      </div>
    </section>
  );
}
