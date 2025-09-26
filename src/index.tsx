import React, { useEffect, useMemo, useState } from "react";
import ReactDOM from "react-dom/client";
import { motion } from "framer-motion";
import { Github, Link as LinkIcon, Mail, Moon, Sun, MapPin, FileText, Award as AwardIcon, GraduationCap, Briefcase, Linkedin, Instagram } from "lucide-react";
import "./index.css";

// =====================
// PROFILE
// =====================
const PROFILE = {
  name: "Medeea-Maria Marinescu",
  role: "Computer Science Student @ EPFL",
  location: "Lausanne, Switzerland",
  blurb:
    "CS student passionate about robotics, space engineering, and data-driven tools. I like building things end-to-end—from embedded sensors to web dashboards—and I’ve won awards in ESA/NASA team contests and the NSS Space Settlement competition.",
  email: "marinescumedeea5@gmail.com",
  socials: {
    github: "",
    website: "",
    linkedin: "https://www.linkedin.com/in/medeea-marinescu-945831322/",
    instagram: "https://www.instagram.com/medeea._.m/",
  },
};

// =====================
// PROJECTS
// =====================
const PROJECTS = [
  {
    title: "NSS Space Settlement — Grand Prize",
    year: 2024,
    summary:
      "Two-tori space settlement concept orbiting Mars with artificial gravity, radiation shielding, life support, and a secondary moon base for resource acquisition.",
    tech: ["Blender", "CAD", "Space Systems"],
    links: {
      //live: "website/nss_space_settlement.html",
      repo: "",
      docs: "docs/PROJECT_NOVA_2.pdf",
    },
    image: "images/nss1.png",
  },
  {
    title: "RoverEx — Pollution & Methane Study (IRPrO Bronze)",
    year: 2022,
    summary:
      "Custom rover with CO₂/CO/SO₂/CH₄ sensors comparing pre/post‑pandemic air quality in Bucharest; data collection via Raspberry Pi + Arduino and a React GUI.",
    tech: ["Arduino", "Raspberry Pi", "C", "Python", "React"],
    links: {
      //live: "website/irpro.html",
      repo: "",
      docs: "docs/Roverex.pdf",
    },
    image: "images/irpro_logo.png",
  },
  {
    title: "ESA Moon Camp — Pioneers (3rd Place)",
    year: 2021,
    summary:
      "3D‑modeled lunar base concept using Blender & Fusion 360, focused on habitat layout, shielding, and in‑situ resource use.",
    tech: ["Blender", "Fusion 360", "CAD"],
    links: {
      //live: "website/moon_camp.html",
      repo: "",
    },
    image: "images/nasa_logo.png",
  },
  {
    title: "Bucharest Science Festival — STEM Outreach",
    year: 2023,
    summary:
      "Volunteering to promote STEM through demos and talks across multiple festival editions.",
    tech: ["STEM Outreach", "Communication"],
    links: {
      //live: "website/bucharest_science_fair.html",
      repo: "",
    },
    image: "images/bucharest_science_fair.png",
  },
  {
    title: "MOV — Mentoring Online Volunteers",
    year: 2023,
    summary:
      "Online tutoring for students from rural areas in mathematics and English; developed teaching materials and exercises.",
    tech: ["Mentoring", "Education"],
    links: {
      //live: "website/mov.html",
      repo: "",
    },
    image: "images/mov.png",
  },
  {
    title: "KAIA Activity",
    year: 2023,
    summary:
      "Student initiative/workshop advancing peer learning. (Brief generated description—update if you prefer.)",
    tech: ["Leadership"],
    links: {
      //live: "website/kaia_activity.html",
      repo: "",
    },
    image: "images/kaia_activity.png",
  },
];

// Utility: unique tech tags for filters
const allTags = Array.from(
  new Set(PROJECTS.flatMap((p) => p.tech.map((t) => t.toLowerCase())))
).sort();

// Awards, Education, Experience
const AWARDS = [
  { title: "Grand Prize", org: "NSS Space Settlement", year: 2024 },
  { title: "Bronze Medal", org: "IRPrO — International Research Project Olympiad", year: 2022 },
  { title: "Third Place", org: "ESA Moon Camp Pioneers", year: 2021 },
];

const EDUCATION = [
  { school: "EPFL — Ecole Polytechnique Fédérale de Lausanne", program: "BSc Computer Science", when: "Sep 2024 – Present", location: "Lausanne, Switzerland" },
  { school: "\"Tudor Vianu\" National Highschool of Computer Science", program: "Computer Science & Mathematics (Baccalaureate 9.83/10)", when: "Sep 2020 – Jul 2024", location: "Bucharest, Romania" },
];

const EXPERIENCE = [
  { role: "First‑Year Trading & Technology Program (Intern)", org: "Jane Street", when: "Mar 2025 – Apr 2025", location: "London, UK", summary: "Explored trading & market‑making; learned about risk, market dynamics, and the role of technology." },
];

export default function PortfolioSite() {
  const [dark, setDark] = useState(true);
  const [q, setQ] = useState("");
  const [tag, setTag] = useState("");

  useEffect(() => {
    const saved = localStorage.getItem("theme");
    if (saved) setDark(saved === "dark");
  }, []);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", dark);
    localStorage.setItem("theme", dark ? "light" : "dark");
  }, [dark]);

  const filtered = useMemo(() => {
    const term = q.trim().toLowerCase();
    return PROJECTS.filter((p) => {
      const text = [p.title, p.summary, ...(p.tech || [])].join(" ").toLowerCase();
      const matchesText = !term || text.includes(term);
      const matchesTag = !tag || (p.tech || []).map((t) => t.toLowerCase()).includes(tag);
      return matchesText && matchesTag;
    });
  }, [q, tag]);

  return (
    <div className="min-h-screen bg-white text-slate-800 dark:bg-slate-950 dark:text-slate-100">
      <Header dark={dark} setDark={setDark} />
      <main className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <Hero />
        <AwardsStrip />
        <About />
        <EducationExperience />
        <Controls q={q} setQ={setQ} tag={tag} setTag={setTag} />
        <Projects projects={filtered} />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}

function Header({ dark, setDark }: { dark: boolean; setDark: (v: boolean) => void }) {
  return (
    <header className="sticky top-0 z-40 w-full border-b border-slate-200/60 bg-white/80 backdrop-blur dark:border-slate-800/60 dark:bg-slate-950/70">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3 sm:px-6 lg:px-8">
        <div className="flex items-center gap-2">
          <div className="h-8 w-8 rounded-2xl bg-gradient-to-tr from-indigo-500 to-purple-500" />
          <span className="font-semibold tracking-tight">{PROFILE.name}</span>
        </div>
        <nav className="hidden items-center gap-6 text-sm sm:flex">
          <a href="#about" className="hover:opacity-80">About</a>
          <a href="#edu-exp" className="hover:opacity-80">Education</a>
          <a href="#projects" className="hover:opacity-80">Projects</a>
          <a href="#contact" className="hover:opacity-80">Contact</a>
        </nav>
        <button
          aria-label="Toggle dark mode"
          onClick={() => setDark(!dark)}
          className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm shadow-sm hover:bg-slate-50 dark:border-slate-800 dark:bg-slate-900 dark:hover:bg-slate-800"
        >
          {dark ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
          <span className="hidden sm:inline">{dark ? "Light" : "Dark"}</span>
        </button>
      </div>
    </header>
  );
}

function Hero() {
  return (
    <section className="py-12 sm:py-16 md:py-20">
      <div className="grid items-center gap-8 md:grid-cols-2">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="space-y-5"
        >
          <p className="inline-flex items-center gap-2 text-sm text-indigo-600 dark:text-indigo-400">
            <span className="inline-flex h-2 w-2 rounded-full bg-indigo-500" />
            Available for projects
          </p>
          <h1 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
            {PROFILE.name}
          </h1>
          <p className="text-lg text-slate-600 dark:text-slate-300">{PROFILE.role}</p>
          <p className="max-w-prose text-slate-600 dark:text-slate-300">{PROFILE.blurb}</p>
          <div className="flex flex-wrap gap-3 pt-2">
            {PROFILE.socials.github && (
              <a
                href={PROFILE.socials.github}
                className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm shadow-sm hover:bg-slate-50 dark:border-slate-800 dark:bg-slate-900 dark:hover:bg-slate-800"
              >
                <Github className="h-4 w-4" /> GitHub
              </a>
            )}
            {PROFILE.socials.website && (
              <a
                href={PROFILE.socials.website}
                className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm shadow-sm hover:bg-slate-50 dark:border-slate-800 dark:bg-slate-900 dark:hover:bg-slate-800"
              >
                <LinkIcon className="h-4 w-4" /> Website
              </a>
            )}
            {PROFILE.socials.linkedin && (
              <a
                href={PROFILE.socials.linkedin}
                className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm shadow-sm hover:bg-slate-50 dark:border-slate-800 dark:bg-slate-900 dark:hover:bg-slate-800"
                target="_blank"
              >
                <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M4.98 3.5C4.98 4.88 3.87 6 2.5 6S0 4.88 0 3.5 1.12 1 2.5 1 4.98 2.12 4.98 3.5zM0 24h5V7H0v17zM7.5 7h4.6v2.6h.1c.6-1.2 2.2-2.6 4.5-2.6 4.8 0 5.7 3.1 5.7 7.1V24h-5v-7.7c0-1.8 0-4-2.5-4s-2.9 2-2.9 3.9V24h-5V7z"/>
                </svg>
                LinkedIn
              </a>
            )}
            {PROFILE.socials.instagram && (
              <a
                href={PROFILE.socials.instagram}
                className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm shadow-sm hover:bg-slate-50 dark:border-slate-800 dark:bg-slate-900 dark:hover:bg-slate-800"
                target="_blank"
              >
                <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M7.5 2h9A5.5 5.5 0 0 1 22 7.5v9A5.5 5.5 0 0 1 16.5 22h-9A5.5 5.5 0 0 1 2 16.5v-9A5.5 5.5 0 0 1 7.5 2zm0 2A3.5 3.5 0 0 0 4 7.5v9A3.5 3.5 0 0 0 7.5 20h9a3.5 3.5 0 0 0 3.5-3.5v-9A3.5 3.5 0 0 0 16.5 4h-9zM12 7a5 5 0 1 1 0 10 5 5 0 0 1 0-10zm0 2a3 3 0 1 0 0 6 3 3 0 0 0 0-6zm5.25-2a1.25 1.25 0 1 1 0 2.5 1.25 1.25 0 0 1 0-2.5z"/>
                </svg>
                Instagram
              </a>
            )}

          </div>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="relative"
        >
          <div className="flex h-full w-full items-center justify-center overflow-hidden rounded-3xl bg-white dark:bg-slate-950">
            <img
              src="/images/me.png"
              alt="Profile"
              className="max-h-full max-w-full object-contain rounded-3xl"
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function AwardsStrip() {
  return (
    <section id="awards" className="py-6">
      <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm dark:border-slate-800 dark:bg-slate-900">
        <div className="mb-3 flex items-center gap-2">
          <AwardIcon className="h-5 w-5" />
          <h2 className="text-lg font-semibold tracking-tight">Awards</h2>
        </div>
        <div className="grid gap-3 sm:grid-cols-3">
          {AWARDS.map((a, i) => (
            <div key={i} className="flex items-center justify-between rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-sm shadow-sm dark:border-slate-800 dark:bg-slate-950">
              <div className="space-y-0.5">
                <div className="font-medium">{a.org}</div>
                <div className="text-slate-600 dark:text-slate-300">{a.title}</div>
              </div>
              <span className="rounded-full bg-slate-100 px-2 py-0.5 text-xs text-slate-600 dark:bg-slate-800 dark:text-slate-300">{a.year}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function About() {
  return (
    <section id="about" className="py-12">
      <div className="grid gap-8 md:grid-cols-3">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="col-span-2"
        >
          <h2 className="text-2xl font-semibold tracking-tight">About</h2>
          <p className="mt-3 max-w-prose text-slate-600 dark:text-slate-300">
            I’m a {PROFILE.role.toLowerCase()} based in <span className="inline-flex items-center gap-1"><MapPin className="h-4 w-4" />{PROFILE.location}</span>. I care about
            developer experience, robotics, and space design. Below is a selection of my work. Use the search and filters to explore.
          </p>
        </motion.div>
        <motion.ul
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.05 }}
          className="space-y-2 rounded-2xl border border-slate-200 bg-slate-50 p-4 text-sm shadow-sm dark:border-slate-800 dark:bg-slate-900"
        >
          <li><span className="font-medium">Focus:</span> Robotics, Space Systems, Web</li>
          <li><span className="font-medium">Stack:</span> C/C++, Python, Java, React</li>
          <li><span className="font-medium">Interests:</span> CAD, embedded, data viz</li>
        </motion.ul>
      </div>
    </section>
  );
}

function EducationExperience() {
  return (
    <section id="edu-exp" className="py-12">
      <div className="grid gap-6 md:grid-cols-2">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900"
        >
          <div className="mb-3 flex items-center gap-2">
            <GraduationCap className="h-5 w-5" />
            <h3 className="text-lg font-semibold tracking-tight">Education</h3>
          </div>
          <ul className="space-y-3 text-sm">
            {EDUCATION.map((e, i) => (
              <li key={i} className="rounded-xl bg-slate-50 p-3 dark:bg-slate-950">
                <div className="font-medium">{e.school}</div>
                <div className="text-slate-600 dark:text-slate-300">{e.program}</div>
                <div className="text-xs text-slate-500">{e.when} · {e.location}</div>
              </li>
            ))}
          </ul>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.05 }}
          className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900"
        >
          <div className="mb-3 flex items-center gap-2">
            <Briefcase className="h-5 w-5" />
            <h3 className="text-lg font-semibold tracking-tight">Experience</h3>
          </div>
          <ul className="space-y-3 text-sm">
            {EXPERIENCE.map((x, i) => (
              <li key={i} className="rounded-xl bg-slate-50 p-3 dark:bg-slate-950">
                <div className="font-medium">{x.role} — {x.org}</div>
                <div className="text-xs text-slate-500">{x.when} · {x.location}</div>
                {x.summary && <p className="mt-1 text-slate-600 dark:text-slate-300">{x.summary}</p>}
              </li>
            ))}
          </ul>
        </motion.div>
      </div>
    </section>
  );
}

function Controls({ q, setQ, tag, setTag }: { q: string; setQ: (v: string) => void; tag: string; setTag: (v: string) => void }) {
  return (
    <section className="mb-4 border-y border-slate-200/70 bg-white/80 py-3 dark:border-slate-800/70 dark:bg-slate-950/70">
      <div className="mx-auto grid max-w-6xl grid-cols-1 gap-3 px-4 sm:grid-cols-3 sm:px-6 lg:px-8">
        <input
          type="text"
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="Search projects…"
          className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm shadow-sm placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:border-slate-800 dark:bg-slate-900"
        />
        <div className="flex flex-wrap gap-2 sm:col-span-2">
          <button
            onClick={() => setTag("")}
            className={`rounded-xl border px-3 py-2 text-sm shadow-sm ${
              tag === ""
                ? "border-indigo-500 bg-indigo-50 dark:bg-indigo-900/30"
                : "border-slate-200 bg-white hover:bg-slate-50 dark:border-slate-800 dark:bg-slate-900"
            }`}
          >
            All
          </button>
          {allTags.map((t) => (
            <button
              key={t}
              onClick={() => setTag(t)}
              className={`rounded-xl border px-3 py-2 text-sm shadow-sm capitalize ${
                tag === t
                  ? "border-indigo-500 bg-indigo-50 dark:bg-indigo-900/30"
                  : "border-slate-200 bg-white hover:bg-slate-50 dark:border-slate-800 dark:bg-slate-900"
              }`}
            >
              {t}
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}

function Projects({ projects }: { projects: typeof PROJECTS }) {
  return (
    <section id="projects" className="py-8">
      <h2 className="mb-4 text-2xl font-semibold tracking-tight">Projects</h2>
      {projects.length === 0 ? (
        <p className="text-slate-500 dark:text-slate-400">No projects match your search/filter.</p>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {projects.map((p, i) => (
            <motion.article
              key={`${p.title}-${i}`}
              initial={{ opacity: 0, y: 8 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.35, delay: i * 0.03 }}
              className="group overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition hover:shadow-md dark:border-slate-800 dark:bg-slate-900"
            >
              <div className="relative h-32 w-full flex items-center justify-center bg-slate-100 dark:bg-slate-800">
                {p.image ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={p.image} alt="" className="h-full w-full object-cover" />
                ) : (
                  <div className="flex h-full items-center justify-center text-slate-400">No image</div>
                )}
              </div>
              <div className="space-y-3 p-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-semibold leading-tight">{p.title}</h3>
                  <span className="rounded-full bg-slate-100 px-2 py-0.5 text-xs text-slate-600 dark:bg-slate-800 dark:text-slate-300">{p.year}</span>
                </div>
                <p className="text-sm text-slate-600 dark:text-slate-300">{p.summary}</p>
                <div className="flex flex-wrap gap-2">
                  {(p.tech || []).map((t) => (
                    <span key={t} className="rounded-full bg-slate-100 px-2 py-0.5 text-xs text-slate-600 dark:bg-slate-800 dark:text-slate-300">
                      {t}
                    </span>
                  ))}
                </div>
                <div className="flex items-center gap-2 pt-1">
                  {p.links?.repo && (
                    <a
                      href={p.links.repo}
                      className="inline-flex items-center gap-1 rounded-lg border border-slate-200 bg-white px-2.5 py-1.5 text-xs shadow-sm hover:bg-slate-50 dark:border-slate-800 dark:bg-slate-900"
                    >
                      <Github className="h-3.5 w-3.5" /> Code
                    </a>
                  )}
                  {p.links?.docs && (
                    <a
                      href={p.links.docs}
                      className="inline-flex items-center gap-1 rounded-lg border border-slate-200 bg-white px-2.5 py-1.5 text-xs shadow-sm hover:bg-slate-50 dark:border-slate-800 dark:bg-slate-900"
                    >
                      <FileText className="h-3.5 w-3.5" /> Docs
                    </a>
                  )}
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      )}
    </section>
  );
}

function Contact() {
  return (
    <section id="contact" className="py-16">
      <div className="rounded-2xl border border-slate-200 bg-gradient-to-tr from-indigo-50 to-purple-50 p-6 shadow-sm dark:border-slate-800 dark:from-indigo-950/30 dark:to-purple-950/20">
        <h2 className="text-2xl font-semibold tracking-tight">Contact</h2>
        <p className="mt-2 max-w-prose text-slate-600 dark:text-slate-300">
          Want to collaborate or have a role I’d be a fit for? Send me a proposal.
        </p>
        <div className="mt-4 flex flex-wrap items-center gap-3">
          <a
            href={`mailto:${PROFILE.email}`}
            className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm shadow-sm hover:bg-slate-50 dark:border-slate-800 dark:bg-slate-900 dark:hover:bg-slate-800"
          >
            <Mail className="h-4 w-4" /> {PROFILE.email}
          </a>
          {PROFILE.socials.website && (
            <a
              href={PROFILE.socials.website}
              className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm shadow-sm hover:bg-slate-50 dark:border-slate-800 dark:bg-slate-900 dark:hover:bg-slate-800"
            >
              <LinkIcon className="h-4 w-4" /> Portfolio
            </a>
          )}
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="border-t border-slate-200 py-6 text-center text-sm text-slate-500 dark:border-slate-800 dark:text-slate-400">
      © {new Date().getFullYear()} {PROFILE.name}. Built with React & Tailwind.
    </footer>
  );
}

// Bootstrap React
ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <PortfolioSite />
  </React.StrictMode>
);