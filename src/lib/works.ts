import railway from "@/assets/work-railway.jpg";
import sodeung from "@/assets/work-sodeung.jpg";
import paris from "@/assets/work-paris.jpg";
import dior from "@/assets/work-dior.jpg";

export type Work = {
  slug: string;
  title: string;
  subtitle?: string;
  category: string;
  year: string;
  thumb: string;
  tags: string[];
  concept: string;
  role: string;
  tools: string[];
  process: string[];
  output: string;
  improved: string;
};

export const works: Work[] = [
  {
    slug: "midnight-railway-diner",
    title: "철길심야식당",
    subtitle: "Midnight Railway Diner",
    category: "Short Film / AI Narrative",
    year: "2025",
    thumb: railway,
    tags: ["AI Film", "Storytelling", "Neon", "Korean"],
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
  },
  {
    slug: "sodeung",
    title: "SODEUNG",
    subtitle: "소등 / Lights Out",
    category: "Music Video / AI Editorial",
    year: "2025",
    thumb: sodeung,
    tags: ["Music Video", "Dreamcore", "Portrait", "Pastel"],
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
  },
  {
    slug: "post-apocalypse-paris",
    title: "Post-Apocalypse Paris",
    subtitle: "Fashion Campaign Spec",
    category: "Fashion Film / Spec Campaign",
    year: "2025",
    thumb: paris,
    tags: ["Fashion", "Spec", "Cinematic", "Editorial"],
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
  },
  {
    slug: "dior-adidas",
    title: "Dior / Adidas",
    subtitle: "Brand Visual Project",
    category: "Brand Collab / Visual System",
    year: "2024",
    thumb: dior,
    tags: ["Brand", "Sportswear", "Luxury", "System"],
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
  },
];

export const getWork = (slug: string) => works.find((w) => w.slug === slug);
