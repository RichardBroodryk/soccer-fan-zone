import { useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./PodcastsPage.module.css";

import podcastsHero from "../assets/images/raz/Podcastsmainpage.png";

/* PODCAST IMAGES — AUTHORITATIVE PATHS */
import eggchasersImg from "../assets/images/podcasts/eggchasers.jpg";
import gbrImg from "../assets/images/podcasts/the-gbr.jpg";
import aotearoaImg from "../assets/images/podcasts/aotearoa.jpg";
import twoCentsImg from "../assets/images/podcasts/2cents.jpg";
import ausRugbyImg from "../assets/images/podcasts/aus-rugby.jpg";
import brendenNelImg from "../assets/images/podcasts/bnel.jpg";
import scrumQueensImg from "../assets/images/podcasts/scrumqueens.jpg";
import keoZelsImg from "../assets/images/podcasts/keo-zels.jpg";
import womensRugbyPodImg from "../assets/images/podcasts/wrp-ireland.jpg";

/* ================= TYPES ================= */

type Episode = {
  id: number;
  title: string;
  date: string;
  duration: string;
  tournament: string;
  downloads: string;
  summary: string;
};

type Podcast = {
  id: number;
  name: string;
  region: string;
  language: string;
  focus: string[];
  description: string;
  url: string;
  image: string;
  episodes: Episode[];
  isPartner?: boolean; // NEW: optional partner flag
};

/* ================= PAGE ================= */

export default function PodcastsPage() {
  const [activeTournament, setActiveTournament] = useState<string>("all");
  const navigate = useNavigate();

  const tournaments = [
    { id: "all", label: "All" },
    { id: "six-nations", label: "Six Nations" },
    { id: "rugby-world-cup", label: "World Cup" },
    { id: "rugby-championship", label: "Rugby Championship" },
    { id: "premiership", label: "Premiership" },
    { id: "womens-rugby", label: "Women’s Rugby" },
  ];

  const podcasts: Podcast[] = [
    {
      id: 1,
      name: "The Eggchasers Podcast",
      region: "United Kingdom",
      language: "English",
      focus: ["Six Nations", "Premiership"],
      url: "https://www.eggchasers.com",
      image: eggchasersImg,
      description:
        "One of the world’s most listened-to rugby podcasts, mixing opinion, humour, and sharp analysis.",
      episodes: [],
      // isPartner: true, // activate when they become a partner
    },
    {
      id: 2,
      name: "The Good, The Bad & The Rugby",
      region: "United Kingdom",
      language: "English",
      focus: ["Six Nations", "Premiership"],
      url: "https://goodbadandtherugby.com",
      image: gbrImg,
      description:
        "Hosted by James Haskell, Mike Tindall, and Alex Payne — insight with personality and insider access.",
      episodes: [],
    },
    {
      id: 3,
      name: "Aotearoa Rugby Pod",
      region: "New Zealand",
      language: "English",
      focus: ["Rugby Championship"],
      url: "https://www.nzherald.co.nz",
      image: aotearoaImg,
      description:
        "Deep analysis of New Zealand rugby, All Blacks pathways, and Super Rugby dynamics.",
      episodes: [],
    },
    {
      id: 4,
      name: "Two Cents Rugby",
      region: "New Zealand",
      language: "English",
      focus: ["Rugby Championship", "World Cup"],
      url: "https://www.youtube.com/@TwoCentsRugby",
      image: twoCentsImg,
      description:
        "Popular fan-led rugby breakdowns with clear tactical explanation and global reach.",
      episodes: [],
    },
    {
      id: 5,
      name: "Rugby Australia Podcast",
      region: "Australia",
      language: "English",
      focus: ["Rugby Championship"],
      url: "https://www.rugby.com.au",
      image: ausRugbyImg,
      description:
        "Official Rugby Australia podcast covering Wallabies, pathways, and domestic rugby.",
      episodes: [],
    },
    {
      id: 6,
      name: "Brenden Nel Rugby",
      region: "South Africa",
      language: "English",
      focus: ["Rugby Championship", "World Cup"],
      url: "https://www.news24.com",
      image: brendenNelImg,
      description:
        "South African rugby insights from one of the country’s most respected rugby journalists.",
      episodes: [],
    },
    {
      id: 7,
      name: "Keo & Zels",
      region: "South Africa",
      language: "English",
      focus: ["Rugby Championship", "World Cup"],
      url: "https://www.youtube.com/@KeoandZels",
      image: keoZelsImg,
      description:
        "Former internationals Keo and Zels deliver candid discussion, humour, and modern player insight.",
      episodes: [],
    },
    {
      id: 8,
      name: "The Scrum Queens",
      region: "Global",
      language: "English",
      focus: ["Women’s Rugby"],
      url: "https://www.scrumqueens.com",
      image: scrumQueensImg,
      description:
        "The leading women’s rugby platform covering international tests, World Cups, and the growth of the women’s game.",
      episodes: [],
    },
    {
      id: 9,
      name: "The Women’s Rugby Podcast",
      region: "Ireland",
      language: "English",
      focus: ["Women’s Rugby", "Six Nations"],
      url: "https://www.womensrugby.ie",
      image: womensRugbyPodImg,
      description:
        "Ireland-focused women’s rugby coverage, discussing players, performance, and the international game.",
      episodes: [],
    },
  ];

  /* FILTER */
  const filtered =
    activeTournament === "all"
      ? podcasts
      : podcasts.filter((p) =>
          p.focus.some(
            (f) =>
              f.toLowerCase().replace(/\s+/g, "-") === activeTournament
          )
        );

  /* SORT: partners first */
  const filteredPodcasts = [...filtered].sort((a, b) => {
    const aPartner = a.isPartner ? 1 : 0;
    const bPartner = b.isPartner ? 1 : 0;
    return bPartner - aPartner;
  });

  return (
    <div className={styles.page}>
      {/* HERO */}
      <header className={styles.hero}>
        <img src={podcastsHero} alt="" className={styles.heroImage} />
        <div className={styles.heroText}>
          <h1>Rugby Podcasts</h1>
          <p>
            Long-form rugby conversations, expert analysis,
            <br />
            and voices from across the game.
          </p>
        </div>
      </header>

      {/* BACK TO STUDIO */}
      <div className={styles.backWrap}>
        <button
          className={styles.back}
          onClick={() => navigate("/media")}
        >
          ← Back to The Rugby Studio
        </button>
      </div>

      {/* FILTERS */}
      <nav className={styles.filters}>
        {tournaments.map((t) => (
          <button
            key={t.id}
            className={`${styles.filterBtn} ${
              activeTournament === t.id ? styles.active : ""
            }`}
            onClick={() => setActiveTournament(t.id)}
          >
            {t.label}
          </button>
        ))}
      </nav>

      {/* PODCAST GRID */}
      <section className={styles.grid}>
        {filteredPodcasts.map((podcast) => (
          <article key={podcast.id} className={styles.card}>
            <header className={styles.cardHeader}>
              <img
                src={podcast.image}
                alt={`${podcast.name} logo`}
                className={styles.podcastImage}
              />
              <div>
                <h3>{podcast.name}</h3>
                <span className={styles.meta}>
                  {podcast.region} • {podcast.language}
                </span>
              </div>
            </header>

            <p className={styles.description}>{podcast.description}</p>

            <a
              href={podcast.url}
              target="_blank"
              rel="noreferrer"
              className={styles.externalLink}
            >
              Visit Podcast →
            </a>
          </article>
        ))}
      </section>

      {/* JOIN */}
      <section className={styles.join}>
        <h3>Have a Rugby Podcast?</h3>
        <p>
          Join the Rugby Studio to reach a global rugby audience. Listing,
          discovery, and monetisation opportunities available.
        </p>
        <button className={styles.joinBtn}>Apply to Join</button>
      </section>
    </div>
  );
}
