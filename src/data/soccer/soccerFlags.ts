/* AFC */

import australia from "../../assets/soccer/flags/australia.jpg";
import iran from "../../assets/soccer/flags/iran.jpg";
import iraq from "../../assets/soccer/flags/iraq.jpg";
import japan from "../../assets/soccer/flags/japan.jpg";
import jordan from "../../assets/soccer/flags/jordan.jpg";
import qatar from "../../assets/soccer/flags/qatar.jpg";
import saudiArabia from "../../assets/soccer/flags/saudi-arabia.jpg";
import southKorea from "../../assets/soccer/flags/south-korea.jpg";
import uzbekistan from "../../assets/soccer/flags/uzbekistan.jpg";

/* CAF */

import algeria from "../../assets/soccer/flags/algeria.jpg";
import capeVerde from "../../assets/soccer/flags/cape-verde.jpg";
import egypt from "../../assets/soccer/flags/egypt.jpg";
import ghana from "../../assets/soccer/flags/ghana.jpg";
import morocco from "../../assets/soccer/flags/morocco.jpg";
import senegal from "../../assets/soccer/flags/senegal.jpg";
import southAfrica from "../../assets/soccer/flags/south-africa.jpg";
import tunisia from "../../assets/soccer/flags/tunisia.jpg";
import congo from "../../assets/soccer/flags/congodr.jpg";
import ivoryCoast from "../../assets/soccer/flags/cote-divoire.jpg";
import cameroon from "../../assets/soccer/flags/cameroon.jpg";

/* CONCACAF */

import canada from "../../assets/soccer/flags/canada.jpg";
import curacao from "../../assets/soccer/flags/curacao.jpg";
import haiti from "../../assets/soccer/flags/haiti.jpg";
import mexico from "../../assets/soccer/flags/mexico.jpg";
import panama from "../../assets/soccer/flags/panama.jpg";
import usa from "../../assets/soccer/flags/usa.jpg";

/* CONMEBOL */

import argentina from "../../assets/soccer/flags/argentina.jpg";
import brazil from "../../assets/soccer/flags/brazil.jpg";
import colombia from "../../assets/soccer/flags/colombia.jpg";
import ecuador from "../../assets/soccer/flags/ecuador.jpg";
import paraguay from "../../assets/soccer/flags/paraguay.jpg";
import uruguay from "../../assets/soccer/flags/uruguay.jpg";

/* UEFA */

import austria from "../../assets/soccer/flags/austria.jpg";
import belgium from "../../assets/soccer/flags/belgium.jpg";
import croatia from "../../assets/soccer/flags/croatia.jpg";
import england from "../../assets/soccer/flags/england.png";
import france from "../../assets/soccer/flags/france.jpg";
import germany from "../../assets/soccer/flags/germany.jpg";
import netherlands from "../../assets/soccer/flags/netherland.jpg";
import norway from "../../assets/soccer/flags/norway.jpg";
import portugal from "../../assets/soccer/flags/portugal.jpg";
import scotland from "../../assets/soccer/flags/scotland.jpg";
import spain from "../../assets/soccer/flags/spain.jpg";
import sweden from "../../assets/soccer/flags/sweden.jpg";
import switzerland from "../../assets/soccer/flags/switzerland.jpg";
import turkey from "../../assets/soccer/flags/turkey.jpg";

/* OFC */

import newZealand from "../../assets/soccer/flags/new-zealand.jpg";

export const soccerFlags: Record<string, string> = {
  australia,
  iran,
  iraq,
  japan,
  jordan,
  qatar,
  "saudi-arabia": saudiArabia,
  "south-korea": southKorea,
  uzbekistan,

  algeria,
  "cape-verde": capeVerde,
  cameroon,
  egypt,
  ghana,
  morocco,
  senegal,
  "south-africa": southAfrica,
  tunisia,
  "dr-congo": congo,
  "ivory-coast": ivoryCoast,

  canada,
  curacao,
  haiti,
  mexico,
  panama,
  "united-states": usa,

  argentina,
  brazil,
  colombia,
  ecuador,
  paraguay,
  uruguay,

  austria,
  belgium,
  croatia,
  england,
  france,
  germany,
  netherlands,
  norway,
  portugal,
  scotland,
  spain,
  sweden,
  switzerland,
  turkiye: turkey,

  "new-zealand": newZealand,
};