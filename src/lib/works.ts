import railway from "@/assets/work-railway.jpg";
import sodeung from "@/assets/work-sodeung.jpg";
import paris from "@/assets/work-paris.jpg";
import dior from "@/assets/work-dior.jpg";
import arcade from "@/assets/work-arcade.jpg";
import chromeflora from "@/assets/work-chromeflora.jpg";
import skincare from "@/assets/work-skincare.jpg";
import glitch from "@/assets/work-glitch.jpg";

export const CATEGORIES = [
  "AI Brand Film",
  "Music Video",
  "Animation",
  "Fashion Visual",
  "Experimental",
] as const;

export type Category = (typeof CATEGORIES)[number];

export type Work = {
  slug: string;
  title: string;
  subtitle?: string;
  category: Category;
  categoryLabel: string;
  year: string;
  client?: string;
  duration?: string;
  thumb: string;
  tags: string[];
  description: string; // short blurb for cards
  concept: string;
  role: string;
  tools: string[];
  process: string[];
  output: string;
  improved: string;
  featured?: boolean;
};

export const works: Work[] = [
  {
    slug: "midnight-railway-diner",
    title: "철길심야식당",
    subtitle: "Midnight Railway Diner",
    category: "Experimental",
    categoryLabel: "Short Film / AI Narrative",
    year: "2025",
    duration: "2:48",
    thumb: railway,
    tags: ["AI Film", "Storytelling", "Neon", "Korean"],
    description:
      "A neon-drenched AI short about a tiny diner beside an active railway, and the strangers passing through it.",
    concept:
      "A nocturnal slice-of-life portrait of a tiny diner perched beside an active railway. Strangers, steam, and the last train of the night — a meditation on the people we only meet under fluorescent light.",
    role: "Director · AI Visualist · Editor",
    tools: ["Runway Gen-3", "Midjourney v6", "Suno", "DaVinci Resolve", "After Effects"],
    process: [
      "Wrote a 6-scene shot list inspired by 1990s Korean cinematography.",
      "Generated 200+ stills in Midjourney with a locked character LoRA for continuity.",
      "Animated shots in Runway with motion brushes for steam, rain, and train pass-bys.",
      "Composited and color-graded in Resolve to match a Kodak Vision3 500T look.",
    ],
    output: "A 2:48 short film selected for the 2025 Seoul AI Film Showcase.",
    improved:
      "Built a custom character reference workflow so the same chef appeared in every shot without drift — the biggest leap in continuity I've shipped to date.",
    featured: true,
  },
  {
    slug: "sodeung",
    title: "SODEUNG",
    subtitle: "소등 / Lights Out",
    category: "Music Video",
    categoryLabel: "Music Video / AI Editorial",
    year: "2025",
    client: "SODEUNG (indie)",
    duration: "3:24",
    thumb: sodeung,
    tags: ["Music Video", "Dreamcore", "Portrait", "Pastel"],
    description:
      "A dream-logic music video for indie artist SODEUNG — dissolving rooms, translucent fabrics, soft pastel memory.",
    concept:
      "A dream-logic music video for indie artist SODEUNG. Translucent fabrics, dissolving rooms, a heroine who keeps forgetting which version of herself she is.",
    role: "Concept Director · AI Cinematographer",
    tools: ["Kling 1.6", "Flux Pro", "Topaz Video AI", "Premiere Pro"],
    process: [
      "Shot mood-board with the artist over a 2-hour video call.",
      "Generated 14 unique 'rooms' as latent environments, each tinted a different memory color.",
      "Used Kling for slow-mo fabric and hair motion, upscaled 4x with Topaz.",
      "Cut to the song's breath rhythm rather than the kick — the result feels like inhaling.",
    ],
    output: "Released on the artist's official channels, 480K+ views in the first month.",
    improved:
      "Stopped over-prompting. Letting the model 'breathe' with shorter prompts produced softer, more cinematic frames than my previous over-engineered attempts.",
    featured: true,
  },
  {
    slug: "post-apocalypse-paris",
    title: "Post-Apocalypse Paris",
    subtitle: "Fashion Campaign Spec",
    category: "Fashion Visual",
    categoryLabel: "Fashion Film / Spec Campaign",
    year: "2025",
    duration: "0:35",
    thumb: paris,
    tags: ["Fashion", "Spec", "Cinematic", "Editorial"],
    description:
      "A speculative luxury campaign — couture as survival in an emptied Paris. Anthem film + 9 vertical cutdowns.",
    concept:
      "A speculative campaign: what if a luxury house staged its FW collection in a Paris emptied by time? Couture as defiant survival, not nostalgia.",
    role: "Creative Director · Stylist (Digital) · Editor",
    tools: ["Midjourney v6", "Runway Gen-3 Alpha Turbo", "Magnific", "After Effects"],
    process: [
      "Wrote a 1-page treatment in the voice of a Système D zine.",
      "Generated 6 hero looks, locked the silhouette, and varied lighting only.",
      "Animated dust, wind, and fabric flow in Runway for living stills.",
      "Cut to a 35s anthem film + 9 vertical cutdowns for social.",
    ],
    output: "A complete spec film + key art kit used to pitch to two European fashion houses.",
    improved:
      "Treated AI as a costume department, not a magic button. Building a real treatment first made every prompt sharper and the final look feel art-directed.",
    featured: true,
  },
  {
    slug: "dior-adidas",
    title: "Dior / Adidas",
    subtitle: "Brand Visual Project",
    category: "AI Brand Film",
    categoryLabel: "Brand Collab / Visual System",
    year: "2024",
    client: "Spec — Dior × Adidas",
    thumb: dior,
    tags: ["Brand", "Sportswear", "Luxury", "System"],
    description:
      "An imagined Dior × Adidas capsule: monogrammed tracksuits photographed in the cool light of a couture atelier.",
    concept:
      "An imagined Dior × Adidas capsule — monogrammed tracksuits photographed in the cool, clinical light of a couture atelier. A visual study in restraint.",
    role: "Art Director · AI Generalist",
    tools: ["Stable Diffusion XL", "ComfyUI", "Photoshop", "Figma"],
    process: [
      "Built a ComfyUI graph for consistent product-on-model rendering.",
      "Designed a typographic system pairing Dior's serif with Adidas's grotesque.",
      "Produced 12 hero stills + 4 motion loops for a fictional lookbook.",
      "Mocked the campaign into wild postings, OOH, and an e-comm page.",
    ],
    output: "A 24-page lookbook PDF + motion reel, used as a portfolio centerpiece.",
    improved:
      "Learned to think like an art director instead of a prompter — composition and crop decisions made the work look commissioned, not generated.",
    featured: true,
  },
  {
    slug: "arcade-heart",
    title: "ARCADE HEART",
    subtitle: "アーケード・ハート",
    category: "Music Video",
    categoryLabel: "Music Video / Y2K Visualizer",
    year: "2025",
    client: "MEGUMI*",
    duration: "2:58",
    thumb: arcade,
    tags: ["Music Video", "Y2K", "Gyaru", "Neon"],
    description:
      "A pink-saturated arcade fever dream for J-pop newcomer MEGUMI*. CRT glow, gyaru styling, all AI-shot in one night.",
    concept:
      "A love letter to the Shibuya game center at 2am. The track is a confession; the visuals are the kind of memory you can only recover with neon in your eyes.",
    role: "Director · AI Cinematographer · Edit",
    tools: ["Kling 1.6", "Midjourney v6", "Magnific", "After Effects"],
    process: [
      "Locked a single hot-pink LUT across all generations for cohesion.",
      "Generated 80 candidate shots, kept 22, ordered them as a 4-act arc.",
      "Added CRT scanlines, chroma split, and VHS jitter in After Effects.",
      "Synced cuts to the rhythm guitar, not the kick — gave it a 90s MV feel.",
    ],
    output: "Released across socials, picked up by 3 J-pop blogs in week one.",
    improved:
      "Stopped fighting the model on lighting. Picked a palette early and let every prompt inherit it — finished in 3 days instead of 3 weeks.",
    featured: true,
  },
  {
    slug: "chrome-flora",
    title: "CHROME FLORA",
    subtitle: "Loop Study 03",
    category: "Animation",
    categoryLabel: "Animation / Generative Loop",
    year: "2025",
    duration: "0:30 loop",
    thumb: chromeflora,
    tags: ["Animation", "Generative", "3D", "Loop"],
    description:
      "A 30-second seamless loop of liquid chrome flowers blooming in a void — built as a stage backdrop for live shows.",
    concept:
      "A meditation in pink chrome. Flowers as machines, machines as flowers — bloom and collapse forever.",
    role: "Animator · Generative Designer",
    tools: ["Stable Video Diffusion", "Houdini", "TouchDesigner", "After Effects"],
    process: [
      "Modeled hero bloom in Houdini, exported as image sequence.",
      "Fed sequence to SVD for variation passes; kept 8 unique blooms.",
      "Comped seamless loop point in After Effects, masked transitions in TD.",
      "Delivered 4K vertical + horizontal masters for stage and social.",
    ],
    output: "Used as live backdrop for two indie label showcases in Seoul and Tokyo.",
    improved:
      "Hybrid pipeline: AI for variation, traditional 3D for the hero. Best of both — control where it matters, surprise everywhere else.",
  },
  {
    slug: "ai-mizu",
    title: "AI / MIZU",
    subtitle: "Skincare Brand Film",
    category: "AI Brand Film",
    categoryLabel: "Brand Film / Product Launch",
    year: "2025",
    client: "MIZU (spec)",
    duration: "0:45",
    thumb: skincare,
    tags: ["Brand", "Skincare", "Product", "Editorial"],
    description:
      "A weightless brand film for a fictional skincare line — porcelain bottles floating in pink milk, shot entirely in AI.",
    concept:
      "Beauty work without a studio: a 45-second launch film proving an AI pipeline can deliver agency-grade product motion at one-tenth the cost.",
    role: "Director · Producer · Editor",
    tools: ["Sora", "Flux Pro", "Topaz Video AI", "DaVinci Resolve"],
    process: [
      "Built the bottle as a 3D reference, fed renders to Flux as image conditioning.",
      "Generated 14 product-motion clips in Sora, kept the 6 cleanest.",
      "Color-graded in Resolve to a soft pink-cream brand palette.",
      "Delivered hero film + 6 cut-down product shots for PDP.",
    ],
    output: "Spec piece pitched to two indie beauty brands; led to one paid follow-up.",
    improved:
      "Pre-built a 3D bottle as visual scaffolding — eliminated 90% of product drift between shots.",
    featured: true,
  },
  {
    slug: "static-self",
    title: "STATIC SELF",
    subtitle: "Experimental Portrait",
    category: "Experimental",
    categoryLabel: "Experimental / Datamosh",
    year: "2024",
    duration: "1:12",
    thumb: glitch,
    tags: ["Experimental", "Glitch", "VHS", "Portrait"],
    description:
      "A self-portrait dissolving into pink CRT noise. An experiment in letting the model break on purpose.",
    concept:
      "What happens when you stop hiding the seams. Every glitch is left in, every artifact framed — a portrait of the medium, not the face.",
    role: "Director · Editor",
    tools: ["Runway Gen-2", "Datamoshing scripts", "After Effects", "Premiere"],
    process: [
      "Generated 30 portrait clips with deliberately conflicting prompts.",
      "Datamoshed I-frames across clips to bleed identity between them.",
      "Added scanline + chroma-split passes for CRT decay.",
      "Cut to a single sub-bass tone — no music, just texture.",
    ],
    output: "Shown at an experimental shorts night in Hongdae, Dec 2024.",
    improved:
      "Stopped chasing 'clean' output. Embracing failure as material opened a whole new direction in the work.",
  },
];

export const getWork = (slug: string) => works.find((w) => w.slug === slug);
export const featuredWorks = works.filter((w) => w.featured);
