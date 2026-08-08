/* ==========================================================================
   Exhibition data — index
   Combines each volume into the single `exhibitions` array the rest of the
   app expects. To add a new exhibition:
     1. Create a new vol-XX.js in this folder, following the shape of an
        existing one (id, volume, status, headingPlain, headingAccent,
        intro, meta, dishes).
     2. Import it below and add it to the array.
   ========================================================================== */

//import { vol03 } from "./vol-03";
import { fritelier } from "./fritelier";
import { vol02 } from "./vol-02";
import { vol01 } from "./vol-01";

export const exhibitions = [fritelier, vol02, vol01];
