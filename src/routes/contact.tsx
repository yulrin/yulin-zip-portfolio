import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { PageShell } from "@/components/Layout";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact — YULIN.zip" },
      { name: "description", content: "Hire YULIN for brand films, AI music videos, and spec campaigns." },
      { property: "og:title", content: "Contact — YULIN.zip" },
      { property: "og:description", content: "Currently booking projects for Spring 2026." },
    ],
  }),
  component: Contact,
});

function Contact() {
  const [sent, setSent] = useState(false);

  return (
    <PageShell>
      <section className="mx-auto max-w-6xl px-4 py-16 grid md:grid-cols-12 gap-10">
        <div className="md:col-span-5">
          <div className="sticker mb-3">⊹ CONTACT.zip</div>
          <h1 className="font-display text-6xl md:text-8xl leading-[0.9]">
            Let's <span className="text-chrome-pink">talk.</span>
          </h1>
          <p className="mt-4 font-body text-lg text-muted-foreground">
            Briefs, weird ideas, real budgets, half-formed treatments — all welcome.
            I reply within two business days.
          </p>

          <div className="mt-8 space-y-3">
            <a href="mailto:hello@yulin.zip" className="panel p-4 flex items-center gap-3 hover:-translate-y-0.5 transition-transform block">
              <span className="grid h-10 w-10 place-items-center rounded-full border-2 border-foreground bg-primary text-white">✉</span>
              <span>
                <div className="font-mono uppercase text-xs text-muted-foreground">Email</div>
                <div className="font-display text-xl">hello@yulin.zip</div>
              </span>
            </a>
            <a href="#" className="panel p-4 flex items-center gap-3 hover:-translate-y-0.5 transition-transform block">
              <span className="grid h-10 w-10 place-items-center rounded-full border-2 border-foreground bg-foreground text-background">@</span>
              <span>
                <div className="font-mono uppercase text-xs text-muted-foreground">Instagram</div>
                <div className="font-display text-xl">@yulin.zip</div>
              </span>
            </a>
            <a href="#" className="panel p-4 flex items-center gap-3 hover:-translate-y-0.5 transition-transform block">
              <span className="grid h-10 w-10 place-items-center rounded-full border-2 border-foreground bg-accent text-foreground">▶</span>
              <span>
                <div className="font-mono uppercase text-xs text-muted-foreground">Vimeo</div>
                <div className="font-display text-xl">vimeo.com/yulin</div>
              </span>
            </a>
          </div>

          <div className="mt-8 flex flex-wrap gap-2">
            <span className="sticker-pink">★ Booking Spring 2026</span>
            <span className="sticker">Seoul / Remote</span>
          </div>
        </div>

        <div className="md:col-span-7">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              setSent(true);
            }}
            className="panel p-6 md:p-8 space-y-5"
          >
            <span className="tape -top-2 left-10 -rotate-3" />
            <div>
              <label className="block font-mono uppercase text-sm mb-1">Your name</label>
              <input required type="text" className="w-full border-2 border-foreground rounded-full px-4 py-2 bg-background font-body" placeholder="e.g. Hana Park" />
            </div>
            <div>
              <label className="block font-mono uppercase text-sm mb-1">Email</label>
              <input required type="email" className="w-full border-2 border-foreground rounded-full px-4 py-2 bg-background font-body" placeholder="you@studio.com" />
            </div>
            <div>
              <label className="block font-mono uppercase text-sm mb-1">Project type</label>
              <select className="w-full border-2 border-foreground rounded-full px-4 py-2 bg-background font-body">
                <option>Brand Film</option>
                <option>Music Video</option>
                <option>Spec / Pitch</option>
                <option>Visual System / Lookbook</option>
                <option>Other / Let's chat</option>
              </select>
            </div>
            <div>
              <label className="block font-mono uppercase text-sm mb-1">Budget range</label>
              <div className="flex flex-wrap gap-2">
                {["< $5K", "$5–15K", "$15–40K", "$40K+", "Let's discuss"].map((b) => (
                  <label key={b} className="sticker cursor-pointer hover:bg-primary hover:text-white">
                    <input type="radio" name="budget" className="sr-only" /> {b}
                  </label>
                ))}
              </div>
            </div>
            <div>
              <label className="block font-mono uppercase text-sm mb-1">The brief</label>
              <textarea required rows={5} className="w-full border-2 border-foreground rounded-2xl px-4 py-3 bg-background font-body" placeholder="Tell me the idea, the goal, and the deadline." />
            </div>

            <div className="flex items-center justify-between gap-4 flex-wrap">
              <p className="font-mono text-sm text-muted-foreground">No newsletters. No spam. Just a reply.</p>
              <button type="submit" className="chrome-btn-pink">▶ Send brief</button>
            </div>

            {sent && (
              <div className="border-2 border-foreground bg-primary text-white rounded-2xl p-4 font-display text-xl text-center">
                ♥ Got it! I'll be in touch within 2 business days.
              </div>
            )}
          </form>
        </div>
      </section>
    </PageShell>
  );
}
