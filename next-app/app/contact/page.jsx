import LinkBtn from "../components/LinkBtn";

export default function Contact() {
  return (
    <section>
      <h1 className="font-bold mt-8 text-2xl">Pratik Kuril</h1>
      <br />
      <p className="text-md text-gray-600 w-[75%]">
        A bit about me - I am a software engineer with a passion for web
        development and machine learning. I love building applications that are
        efficient, scalable, and user-friendly. In my free time, I enjoy
        exploring new technologies.
        <br />
      </p>
      <br />
      Following are my social media handles:
      <div className="links text-emerald-500 font-semibold flex flex-col gap-2 mt-4 ml-2">
        <a
          href="https://pratikkuril.xyz"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-emerald-600 "
        >
          My Portfolio 🔗
        </a>
        <a
          href="https://www.linkedin.com/in/kurilpratik/"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-emerald-600 "
        >
          Linkedin 🔗
        </a>
        <a
          href="https://www.behance.net/pratikkuril"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-emerald-600 "
        >
          Behance 🔗
        </a>
        <a
          href="https://www.x.com/kurilpratik"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-emerald-600 "
        >
          X (Twitter) 🔗
        </a>
      </div>
      <br />
      <br />
      <LinkBtn route="/" />
    </section>
  );
}
