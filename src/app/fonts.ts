import { Cormorant_Garamond, IBM_Plex_Mono, Montserrat } from "next/font/google";

const serif = Cormorant_Garamond({ variable: "--font-cormorant", subsets: ["latin"], weight: ["400", "500", "600"] });
const sans = Montserrat({ variable: "--font-montserrat", subsets: ["latin"] });
const mono = IBM_Plex_Mono({ variable: "--font-plex-mono", subsets: ["latin"], weight: ["400", "500"] });

export const fontVariables = [serif.variable, sans.variable, mono.variable].join(" ");
