import { useNavigate } from "react-router-dom";
import styles from "./OfficialsMen.module.css";

/* FLAGS */
import england from "../../assets/images/flags/england.png";
import newZealand from "../../assets/images/flags/new-zealand.jpg";
import australia from "../../assets/images/flags/australia.jpg";
import france from "../../assets/images/flags/france.jpg";
import ireland from "../../assets/images/flags/ireland.jpg";
import southAfrica from "../../assets/images/flags/south-africa.jpg";
import georgia from "../../assets/images/flags/georgia.jpg";

/* IMAGES — MODERN */
import barnes from "../../assets/images/officials/men/modern/wayne-barnes.jpg";
import okeeffe from "../../assets/images/officials/men/modern/ben-okeeffe.jpg";
import gardner from "../../assets/images/officials/men/modern/angus-gardener.jpg";
import pearce from "../../assets/images/officials/men/modern/luke-pearce.jpg";
import raynal from "../../assets/images/officials/men/modern/mathieu-raynal.jpg";
import brace from "../../assets/images/officials/men/modern/andrew-brace.jpg";
import berry from "../../assets/images/officials/men/modern/nic-berry.jpg";
import dickson from "../../assets/images/officials/men/modern/karl-dickson.jpg";
import carley from "../../assets/images/officials/men/modern/matthew-carly.jpg";
import amashukeli from "../../assets/images/officials/men/modern/nika-amashukeli.jpg";
import williams from "../../assets/images/officials/men/modern/paul-williams.jpg";
import peyper from "../../assets/images/officials/men/modern/jaco-peyper.jpg";

/* IMAGES — HISTORIC */
import owens from "../../assets/images/officials/men/historic/nigel-owens.jpg";
import kaplan from "../../assets/images/officials/men/historic/jonathan-kaplan.jpg";
import watson from "../../assets/images/officials/men/historic/andre-watson.jpg";
import garces from "../../assets/images/officials/men/historic/jerome-garces.jpg";
import bevan from "../../assets/images/officials/men/historic/derek-bevan.jpg";
import walsh from "../../assets/images/officials/men/historic/steve-walsh.jpg";
import obrien from "../../assets/images/officials/men/historic/paddy-obrien.jpg";
import white from "../../assets/images/officials/men/historic/chris-white.jpg";
import doyle from "../../assets/images/officials/men/historic/jp-doyle.jpg";
import gauzere from "../../assets/images/officials/men/historic/pascal-gauzere.jpg";
import poite from "../../assets/images/officials/men/historic/romain-poite.jpeg";

export default function OfficialsMen() {
  const navigate = useNavigate();

  return (
    <main className={styles.page}>
      {/* HERO */}
      <section className={styles.hero}>
        <h1>Match Officials — Men</h1>
        <p className={styles.heroSub}>
          International referees who shaped the professional game through
          authority, consistency, and stewardship at the highest level.
        </p>
      </section>

      {/* BACK */}
      <div className={styles.backWrap}>
        <button
          className={styles.back}
          onClick={() => navigate("/heritage/officials")}
        >
          ← Back to Officials
        </button>
      </div>

      {/* MODERN ERA */}
      <section className={styles.sectionMuted}>
        <h2>Elite Era (2019 → Present)</h2>
        <p>
          The modern professional era of globally appointed match officials
          operating under World Rugby’s elite panel system.
        </p>
      </section>

      <section className={styles.grid}>
        {[
          [
            barnes,
            england,
            "Wayne Barnes",
            "2006–2023",
            "RWC Final 2023",
            "A defining referee of the professional era, trusted with rugby’s most demanding fixtures and finals."
          ],
          [
            okeeffe,
            newZealand,
            "Ben O’Keeffe",
            "2013–Present",
            "RWC knockouts",
            "A globally appointed referee whose consistency across hemispheres reflects modern elite officiating."
          ],
          [
            gardner,
            australia,
            "Angus Gardner",
            "2012–Present",
            "RC deciders",
            "A long-serving international official valued for physical control and adaptability."
          ],
          [
            pearce,
            england,
            "Luke Pearce",
            "2015–Present",
            "Six Nations",
            "Recognised for communication, clarity, and tempo management at Test level."
          ],
          [
            raynal,
            france,
            "Mathieu Raynal",
            "2011–Present",
            "RWC knockouts",
            "A senior international referee with extensive World Cup and Six Nations experience."
          ],
          [
            brace,
            ireland,
            "Andrew Brace",
            "2012–Present",
            "Six Nations",
            "A consistent presence in European and international Test rugby."
          ],
          [
            berry,
            australia,
            "Nic Berry",
            "2016–Present",
            "International Tests",
            "A former international player bringing modern game understanding to officiating."
          ],
          [
            dickson,
            england,
            "Karl Dickson",
            "2015–Present",
            "International Tests",
            "An experienced referee reflecting the professional pathway from domestic to global appointments."
          ],
          [
            carley,
            england,
            "Matthew Carley",
            "2013–Present",
            "International Tests",
            "A steady international official trusted across World Rugby competitions."
          ],
          [
            amashukeli,
            georgia,
            "Nika Amashukeli",
            "2017–Present",
            "RWC appointments",
            "A landmark figure representing the expansion of elite officiating beyond traditional nations."
          ],
          [
            williams,
            newZealand,
            "Paul Williams",
            "2016–Present",
            "International Tests",
            "A Southern Hemisphere referee trusted with major international fixtures."
          ],
          [
            peyper,
            southAfrica,
            "Jaco Peyper",
            "2008–Present",
            "RWC knockouts",
            "One of South Africa’s most prominent referees across multiple World Cups."
          ],
        ].map(([img, flag, name, years, achievement, bio]) => (
          <article key={name as string} className={styles.card}>
            <div className={styles.cardHeader}>
              <img src={img as string} alt={name as string} className={styles.portrait} />
              <div>
                <h3>{name}</h3>
                <img src={flag as string} alt="" className={styles.flag} />
                <span className={styles.meta}>{years}</span>
                <span className={styles.era}>{achievement}</span>
                <p className={styles.bio}>{bio}</p>
              </div>
            </div>
          </article>
        ))}
      </section>

      {/* HISTORIC ERA */}
      <section className={styles.sectionMuted}>
        <h2>Professional Foundations (1991 → 2018)</h2>
        <p>
          Officials who defined standards during rugby’s transition into the
          professional era.
        </p>
      </section>

      <section className={styles.grid}>
        {[
          [
            owens,
            england,
            "Nigel Owens",
            "2003–2020",
            "Multiple RWCs",
            "A defining voice of modern refereeing, known for law knowledge and authority."
          ],
          [
            kaplan,
            southAfrica,
            "Jonathan Kaplan",
            "1997–2014",
            "Record Test referee",
            "For many years the most capped Test referee, setting global benchmarks."
          ],
          [
            watson,
            southAfrica,
            "André Watson",
            "1996–2003",
            "RWC Finals",
            "One of the few referees to officiate multiple Rugby World Cup finals."
          ],
          [
            garces,
            france,
            "Jérôme Garcès",
            "2006–2019",
            "RWC Final 2019",
            "A senior French referee whose career culminated in a World Cup final."
          ],
          [
            bevan,
            england,
            "Derek Bevan",
            "1989–2001",
            "Multiple RWCs",
            "A prominent official of the amateur-to-professional transition era."
          ],
          [
            walsh,
            newZealand,
            "Steve Walsh",
            "1994–2015",
            "RWC appointments",
            "A highly visible referee spanning both amateur and professional eras."
          ],
          [
            obrien,
            newZealand,
            "Paddy O’Brien",
            "1988–2002",
            "IRB Ref Manager",
            "An influential referee who later shaped global officiating structures."
          ],
          [
            white,
            england,
            "Chris White",
            "1999–2013",
            "Six Nations",
            "A respected English official contributing to European Test consistency."
          ],
          [
            doyle,
            england,
            "JP Doyle",
            "2008–2017",
            "International Tests",
            "An international referee active during increasing professional scrutiny."
          ],
          [
            gauzere,
            france,
            "Pascal Gauzère",
            "2010–2018",
            "Six Nations",
            "A senior French official with extensive European Test experience."
          ],
          [
            poite,
            france,
            "Romain Poite",
            "2008–2019",
            "Six Nations",
            "A familiar figure in European officiating during the later professional era."
          ],
        ].map(([img, flag, name, years, achievement, bio]) => (
          <article key={name as string} className={styles.card}>
            <div className={styles.cardHeader}>
              <img src={img as string} alt={name as string} className={styles.portrait} />
              <div>
                <h3>{name}</h3>
                <img src={flag as string} alt="" className={styles.flag} />
                <span className={styles.meta}>{years}</span>
                <span className={styles.era}>{achievement}</span>
                <p className={styles.bio}>{bio}</p>
              </div>
            </div>
          </article>
        ))}
      </section>

      {/* TMO */}
      <section className={styles.section}>
        <h2>Television Match Officials (TMO)</h2>
        <p>
          Introduced in the professional era, TMOs provide decision support for
          scoring, foul play, and critical match incidents.
        </p>
        <ul className={styles.tmoList}>
          <li>Joy Neville — Rugby World Cup, Six Nations</li>
          <li>Marius Jonker — Rugby World Cup, Rugby Championship</li>
          <li>Ben Whitehouse — Six Nations</li>
          <li>Tom Foley — International Tests</li>
          <li>Brian MacNeice — International Tests</li>
          <li>Brendon Pickerill — Rugby World Cup</li>
        </ul>
      </section>
    </main>
  );
}
