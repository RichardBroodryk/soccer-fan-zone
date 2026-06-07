import { AnthemNation } from "./anthemTypes";

import { afcAnthems } from "./afcAnthems";
import { cafAnthems } from "./cafAnthems";
import { concacafAnthems } from "./concacafAnthems";
import { conmebolAnthems } from "./conmebolAnthems";
import { ofcAnthems } from "./ofcAnthems";
import { uefaAnthems } from "./uefaAnthems";

export const anthemNations: AnthemNation[] = [
  ...afcAnthems,
  ...cafAnthems,
  ...concacafAnthems,
  ...conmebolAnthems,
  ...ofcAnthems,
  ...uefaAnthems
];

export default anthemNations;