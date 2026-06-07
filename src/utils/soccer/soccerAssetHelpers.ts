import argentina from "../../assets/soccer/flags/argentina.jpg";
import australia from "../../assets/soccer/flags/australia.jpg";
import belgium from "../../assets/soccer/flags/belgium.jpg";
import brazil from "../../assets/soccer/flags/brazil.jpg";
import canada from "../../assets/soccer/flags/canada.jpg";
import colombia from "../../assets/soccer/flags/colombia.jpg";
import croatia from "../../assets/soccer/flags/croatia.jpg";
import england from "../../assets/soccer/flags/england.png";
import france from "../../assets/soccer/flags/france.jpg";
import germany from "../../assets/soccer/flags/germany.jpg";
import japan from "../../assets/soccer/flags/japan.jpg";
import mexico from "../../assets/soccer/flags/mexico.jpg";
import morocco from "../../assets/soccer/flags/morocco.jpg";
import netherlands from "../../assets/soccer/flags/netherland.jpg";
import portugal from "../../assets/soccer/flags/portugal.jpg";
import southAfrica from "../../assets/soccer/flags/south-africa.jpg";
import southKorea from "../../assets/soccer/flags/south-korea.jpg";
import spain from "../../assets/soccer/flags/spain.jpg";
import uruguay from "../../assets/soccer/flags/uruguay.jpg";
import usa from "../../assets/soccer/flags/usa.jpg";

import atlanta1 from "../../assets/soccer/stadiums/atlanta1.jpg";
import boston1 from "../../assets/soccer/stadiums/boston1.jpg";
import dallas1 from "../../assets/soccer/stadiums/dallas1.jpg";
import houston1 from "../../assets/soccer/stadiums/houston1.jpg";
import losAngeles1 from "../../assets/soccer/stadiums/los-angeles1.jpg";
import mexicoCity1 from "../../assets/soccer/stadiums/mexico-city1.jpg";
import miami1 from "../../assets/soccer/stadiums/miami1.jpg";
import newYork1 from "../../assets/soccer/stadiums/new-york1.jpg";
import seattle1 from "../../assets/soccer/stadiums/seattle1.jpg";
import toronto1 from "../../assets/soccer/stadiums/toronto1.jpg";
import vancouver1 from "../../assets/soccer/stadiums/vancouver1.jpg";

const flagMap: Record<
  string,
  string
> = {
  argentina,
  australia,
  belgium,
  brazil,
  canada,
  colombia,
  croatia,
  england,
  france,
  germany,
  japan,
  mexico,
  morocco,
  netherlands,
  portugal,
  "south-africa":
    southAfrica,
  "south-korea":
    southKorea,
  spain,
  uruguay,
  usa,
  "united-states": usa,
};

const stadiumMap: Record<
  string,
  string
> = {
  atlanta: atlanta1,
  boston: boston1,
  dallas: dallas1,
  houston: houston1,
  "los-angeles":
    losAngeles1,
  "mexico-city":
    mexicoCity1,
  miami: miami1,
  "new-york":
    newYork1,
  seattle: seattle1,
  toronto: toronto1,
  vancouver: vancouver1,
};

function normalize(
  value: string
) {
  return value
    .toLowerCase()
    .replace(/\s+/g, "-");
}

export function getTeamFlag(
  nation: string
) {
  return (
    flagMap[
      normalize(nation)
    ] || argentina
  );
}

export function getStadiumImage(
  value: string
) {
  return (
    stadiumMap[
      normalize(value)
    ] || atlanta1
  );
}