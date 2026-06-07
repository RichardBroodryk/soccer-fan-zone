// src/utils/soccer/getStadiumImages.ts

import { stadiums } from "../../data/soccer/stadiums";

import atlanta1 from "../../assets/soccer/stadiums/atlanta1.jpg";
import atlanta2 from "../../assets/soccer/stadiums/atlanta2.jpg";

import boston1 from "../../assets/soccer/stadiums/boston1.jpg";
import boston2 from "../../assets/soccer/stadiums/boston2.jpg";

import dallas1 from "../../assets/soccer/stadiums/dallas1.jpg";
import dallas2 from "../../assets/soccer/stadiums/dallas2.jpg";

import guadalajara1 from "../../assets/soccer/stadiums/guadalajara1.jpg";
import guadalajara2 from "../../assets/soccer/stadiums/guadalajara2.jpg";

import houston1 from "../../assets/soccer/stadiums/houston1.jpg";
import houston2 from "../../assets/soccer/stadiums/houston2.jpg";

import kansasCity1 from "../../assets/soccer/stadiums/kansas-city1.jpg";
import kansasCity2 from "../../assets/soccer/stadiums/kansas-city2.jpg";

import losAngeles1 from "../../assets/soccer/stadiums/los-angeles1.jpg";
import losAngeles2 from "../../assets/soccer/stadiums/los-angeles2.jpg";

import mexicoCity1 from "../../assets/soccer/stadiums/mexico-city1.jpg";
import mexicoCity2 from "../../assets/soccer/stadiums/mexico-city2.jpg";

import miami1 from "../../assets/soccer/stadiums/miami1.jpg";
import miami2 from "../../assets/soccer/stadiums/miami2.jpg";

import monterrey1 from "../../assets/soccer/stadiums/monterrey1.jpg";
import monterrey2 from "../../assets/soccer/stadiums/monterrey2.jpg";

import newYork1 from "../../assets/soccer/stadiums/new-york1.jpg";
import newYork2 from "../../assets/soccer/stadiums/new-york2.jpg";

import philadelphia1 from "../../assets/soccer/stadiums/philadelphia1.jpg";
import philadelphia2 from "../../assets/soccer/stadiums/philadelphia2.jpg";

import sanFrancisco1 from "../../assets/soccer/stadiums/san-francisco1.jpg";
import sanFrancisco2 from "../../assets/soccer/stadiums/san-francisco2.jpg";

import seattle1 from "../../assets/soccer/stadiums/seattle1.jpg";
import seattle2 from "../../assets/soccer/stadiums/seattle2.jpg";

import toronto1 from "../../assets/soccer/stadiums/toronto1.jpg";
import toronto2 from "../../assets/soccer/stadiums/toronto2.jpg";

import vancouver1 from "../../assets/soccer/stadiums/vancouver1.jpg";
import vancouver2 from "../../assets/soccer/stadiums/vancouver2.jpg";

/* CROWD */

import arrowheadCrowd from "../../assets/soccer/stadiums/arrowhead-crowd.jpg";
import attCrowd from "../../assets/soccer/stadiums/att-crowd.jpg";
import estadioAkronCrowd from "../../assets/soccer/stadiums/estadio-akron-crowd.jpg";
import estadioAztecaCrowd from "../../assets/soccer/stadiums/estadio-azteca-crowd.jpg";
import estadioBbvaCrowd from "../../assets/soccer/stadiums/estadio-bbva-crowd.jpg";
import gilletteCrowd from "../../assets/soccer/stadiums/gillette-crowd.jpg";
import hardrockCrowd from "../../assets/soccer/stadiums/hardrock-crowd.jpg";
import levisCrowd from "../../assets/soccer/stadiums/levis-crowd.jpg";
import lincolnCrowd from "../../assets/soccer/stadiums/lincoln-crowd.jpg";
import lumenFieldCrowd from "../../assets/soccer/stadiums/lumen-field-crowd.jpg";
import mercedesBenzCrowd from "../../assets/soccer/stadiums/mercedes-benz-crowd.jpg";
import metlifeCrowd from "../../assets/soccer/stadiums/metlife-crowd.jpg";
import nrgCrowd from "../../assets/soccer/stadiums/nrg-crowd.jpg";
import sofiCrowd from "../../assets/soccer/stadiums/sofi-crowd.jpg";
import bmoCrowd from "../../assets/soccer/stadiums/bmo-crowd.jpg";
import bcPlaceCrowd from "../../assets/soccer/stadiums/dc-place-crowd.jpg";

/* PREMIUM */

import arrowheadPremium from "../../assets/soccer/stadiums/arrowhead-premium.jpg";
import attPremium from "../../assets/soccer/stadiums/att-premium.jpg";
import estadioAkronPremium from "../../assets/soccer/stadiums/estadio-akron-premium.jpg";
import estadioAztecaPremium from "../../assets/soccer/stadiums/estadio-azteca-premium.jpg";
import estadioBbvaPremium from "../../assets/soccer/stadiums/estadio-bbva-premium.jpg";
import gillettePremium from "../../assets/soccer/stadiums/gillette-premium.jpg";
import hardrockPremium from "../../assets/soccer/stadiums/hardrock-premium.jpg";
import levisPremium from "../../assets/soccer/stadiums/levis-premium.jpg";
import lincolnPremium from "../../assets/soccer/stadiums/lincoln-premium.jpg";
import lumenFieldPremium from "../../assets/soccer/stadiums/lumen-field-premium.jpg";
import mercedesBenzPremium from "../../assets/soccer/stadiums/mercedes-benz-premium.jpg";
import metlifePremium from "../../assets/soccer/stadiums/metlife-premium.jpg";
import nrgPremium from "../../assets/soccer/stadiums/nrg-premium.jpg";
import sofiPremium from "../../assets/soccer/stadiums/sofi-premium.jpg";
import bmoPremium from "../../assets/soccer/stadiums/bmo-premium.jpg";
import bcPlacePremium from "../../assets/soccer/stadiums/bc-place-premium.jpg";

/* SKYLINE */

import arrowheadSkyline from "../../assets/soccer/stadiums/arrowhead-skyline.jpg";
import attSkyline from "../../assets/soccer/stadiums/att-skyline.jpg";
import estadioAkronSkyline from "../../assets/soccer/stadiums/estadio-akron-skyline.jpg";
import estadioAztecaSkyline from "../../assets/soccer/stadiums/estadio-azteca-skyline.jpg";
import estadioBbvaSkyline from "../../assets/soccer/stadiums/estadio-bbva-skyline.jpg";
import gilletteSkyline from "../../assets/soccer/stadiums/gillette-skyline.jpg";
import hardrockSkyline from "../../assets/soccer/stadiums/hardrock-skyline.jpg";
import levisSkyline from "../../assets/soccer/stadiums/levis-skyline.jpg";
import lincolnSkyline from "../../assets/soccer/stadiums/lincoln-skyline.jpg";
import lumenFieldSkyline from "../../assets/soccer/stadiums/lumen-field-skyline.jpg";
import mercedesBenzSkyline from "../../assets/soccer/stadiums/mercedes-benz-skyline.jpg";
import metlifeSkyline from "../../assets/soccer/stadiums/metlife-skyline.jpg";
import nrgSkyline from "../../assets/soccer/stadiums/nrg-skyline.jpg";
import sofiSkyline from "../../assets/soccer/stadiums/sofi-skyline.jpg";
import bmoSkyline from "../../assets/soccer/stadiums/bmo-skyline.jpg";
import bcPlaceSkyline from "../../assets/soccer/stadiums/bc-place-skyline.jpg";

import fallback from "../../assets/soccer/stadiums/atlanta1.jpg";

/* ======================================================
   STADIUM IMAGE MAP
   ====================================================== */

const stadiumImageMap: Record<
  string,
  string[]
> = {
  "mercedes-benz-stadium": [
    atlanta1,
    atlanta2,
  ],

  "gillette-stadium": [
    boston1,
    boston2,
  ],

  "att-stadium": [
    dallas1,
    dallas2,
  ],

  "estadio-akron": [
    guadalajara1,
    guadalajara2,
  ],

  "nrg-stadium": [
    houston1,
    houston2,
  ],

  "arrowhead-stadium": [
    kansasCity1,
    kansasCity2,
  ],

  "sofi-stadium": [
    losAngeles1,
    losAngeles2,
  ],

  "estadio-azteca": [
    mexicoCity1,
    mexicoCity2,
  ],

  "hard-rock-stadium": [
    miami1,
    miami2,
  ],

  "estadio-bbva": [
    monterrey1,
    monterrey2,
  ],

  "metlife-stadium": [
    newYork1,
    newYork2,
  ],

  "lincoln-financial-field": [
    philadelphia1,
    philadelphia2,
  ],

  "levis-stadium": [
    sanFrancisco1,
    sanFrancisco2,
  ],

  "lumen-field": [
    seattle1,
    seattle2,
  ],

  "bmo-field": [
    toronto1,
    toronto2,
  ],

  "bc-place": [
    vancouver1,
    vancouver2,
  ],
};

/* ======================================================
   CROWD MAP
   ====================================================== */

const stadiumCrowdMap: Record<
  string,
  string
> = {
  "arrowhead-stadium":
    arrowheadCrowd,

  "att-stadium":
    attCrowd,

  "bc-place":
    bcPlaceCrowd,

  "bmo-field":
    bmoCrowd,

  "estadio-akron":
    estadioAkronCrowd,

  "estadio-azteca":
    estadioAztecaCrowd,

  "estadio-bbva":
    estadioBbvaCrowd,

  "gillette-stadium":
    gilletteCrowd,

  "hard-rock-stadium":
    hardrockCrowd,

  "levis-stadium":
    levisCrowd,

  "lincoln-financial-field":
    lincolnCrowd,

  "lumen-field":
    lumenFieldCrowd,

  "mercedes-benz-stadium":
    mercedesBenzCrowd,

  "metlife-stadium":
    metlifeCrowd,

  "nrg-stadium":
    nrgCrowd,

  "sofi-stadium":
    sofiCrowd,
};

/* ======================================================
   PREMIUM MAP
   ====================================================== */

const stadiumPremiumMap: Record<
  string,
  string
> = {
  "arrowhead-stadium":
    arrowheadPremium,

  "att-stadium":
    attPremium,

  "bc-place":
    bcPlacePremium,

  "bmo-field":
    bmoPremium,

  "estadio-akron":
    estadioAkronPremium,

  "estadio-azteca":
    estadioAztecaPremium,

  "estadio-bbva":
    estadioBbvaPremium,

  "gillette-stadium":
    gillettePremium,

  "hard-rock-stadium":
    hardrockPremium,

  "levis-stadium":
    levisPremium,

  "lincoln-financial-field":
    lincolnPremium,

  "lumen-field":
    lumenFieldPremium,

  "mercedes-benz-stadium":
    mercedesBenzPremium,

  "metlife-stadium":
    metlifePremium,

  "nrg-stadium":
    nrgPremium,

  "sofi-stadium":
    sofiPremium,
};

/* ======================================================
   SKYLINE MAP
   ====================================================== */

const stadiumSkylineMap: Record<
  string,
  string
> = {
  "arrowhead-stadium":
    arrowheadSkyline,

  "att-stadium":
    attSkyline,

  "bc-place":
    bcPlaceSkyline,

  "bmo-field":
    bmoSkyline,

  "estadio-akron":
    estadioAkronSkyline,

  "estadio-azteca":
    estadioAztecaSkyline,

  "estadio-bbva":
    estadioBbvaSkyline,

  "gillette-stadium":
    gilletteSkyline,

  "hard-rock-stadium":
    hardrockSkyline,

  "levis-stadium":
    levisSkyline,

  "lincoln-financial-field":
    lincolnSkyline,

  "lumen-field":
    lumenFieldSkyline,

  "mercedes-benz-stadium":
    mercedesBenzSkyline,

  "metlife-stadium":
    metlifeSkyline,

  "nrg-stadium":
    nrgSkyline,

  "sofi-stadium":
    sofiSkyline,
};

/* ======================================================
   RESOLVE STADIUM
   ====================================================== */

export function resolveStadium(
  stadiumId?: string
) {
  if (!stadiumId) {
    return undefined;
  }

  return stadiums.find(
    (stadium) =>
      stadium.id === stadiumId
  );
}

/* ======================================================
   HERO IMAGE
   ====================================================== */

export function getStadiumHeroImage(
  stadiumId?: string
) {
  if (!stadiumId) {
    return fallback;
  }

  return (
    stadiumImageMap[
      stadiumId
    ]?.[0] || fallback
  );
}

/* ======================================================
   GALLERY IMAGES
   ====================================================== */

export function getStadiumGalleryImages(
  stadiumId?: string
) {
  if (!stadiumId) {
    return [];
  }

  return (
    stadiumImageMap[
      stadiumId
    ] || []
  );
}

/* ======================================================
   CROWD IMAGE
   ====================================================== */

export function getStadiumCrowdImage(
  stadiumId?: string
) {
  if (!stadiumId) {
    return fallback;
  }

  return (
    stadiumCrowdMap[
      stadiumId
    ] || fallback
  );
}

/* ======================================================
   PREMIUM IMAGE
   ====================================================== */

export function getStadiumPremiumImage(
  stadiumId?: string
) {
  if (!stadiumId) {
    return fallback;
  }

  return (
    stadiumPremiumMap[
      stadiumId
    ] || fallback
  );
}

/* ======================================================
   SKYLINE IMAGE
   ====================================================== */

export function getStadiumSkylineImage(
  stadiumId?: string
) {
  if (!stadiumId) {
    return fallback;
  }

  return (
    stadiumSkylineMap[
      stadiumId
    ] || fallback
  );
}