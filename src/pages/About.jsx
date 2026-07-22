import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, ChevronUp } from 'lucide-react';
import NavBar from '@/components/calligraphy/NavBar';

const stats = [
  { pct: '40%', text: 'rate interest in Arabic calligraphy among younger generations as low' },
  { pct: '71%', text: 'believe lack of awareness is the biggest threat to preservation' },
  { pct: '66%', text: 'believe lack of training & access to learning is a key challenge' },
  { pct: '80%', text: 'believe integrating calligraphy into design curricula is most effective' },
  { pct: '50%', text: 'believe a Duolingo-style game is an effective preservation method' },
];

const journey = [
  { num: '01', title: 'Theory First', body: 'Each lesson begins with structured theory: the history, proportions, and philosophy behind the script. Master the "why" before you practice.' },
  { num: '02', title: 'Letter-by-Letter Practice', body: 'Using a simulated calligraphic nib at 40°, you draw each letter on a digital canvas with a ghost guide beneath your stroke.' },
  { num: '03', title: 'XP & Streaks', body: 'Every completed lesson earns XP. Daily streaks keep you accountable. Progress is saved to your personal rank board.' },
  { num: '04', title: 'Unlock the Next Mission', body: 'Lessons unlock sequentially, just like a game. Nail the fundamentals before moving to the next group of letters.' },
];

const quotes = [
  {
    speaker: 'Jasem AlNasrallah',
    role: 'Renowned Arabic Calligrapher, Kuwait',
    text: '"It is very important to start with learning & mastering the fundamentals before moving on to learning in your own personal way."',
  },
  {
    speaker: 'Abdulaziz AlAwadhi',
    role: 'Renowned Calligrapher, Kuwait',
    text: '"Technological advancements can actually help designers get into arabic calligraphy. We just need a platform for people to do it."',
  },
];

function AccordionItem({ title, children }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border-b" style={{ borderColor: 'var(--rule)' }}>
      <button
        onClick={() => setOpen(o => !o)}
        className="w-full flex items-center justify-between py-4 px-0 text-left"
      >
        <span style={{ fontFamily: 'Rajdhani', fontWeight: 700, fontSize: 16, textTransform: 'uppercase', color: 'var(--ink)', letterSpacing: '0.04em' }}>{title}</span>
        {open
          ? <ChevronUp className="w-4 h-4 flex-shrink-0" style={{ color: 'var(--zzz-yellow)' }} />
          : <ChevronDown className="w-4 h-4 flex-shrink-0" style={{ color: 'var(--ink-faint)' }} />}
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            style={{ overflow: 'hidden' }}
          >
            <div className="pb-5" style={{ fontFamily: 'Barlow', fontSize: 14, color: 'var(--ink-mid)', lineHeight: 1.7 }}>
              {children}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function About() {
  return (
    <div className="min-h-screen" style={{ background: 'var(--paper)' }}>
      <NavBar />

      {/* Hero */}
      <section className="pt-12 border-b border-rule" style={{ position: 'relative', overflow: 'hidden' }}>
        <div style={{
          position: 'absolute', top: '-10%', right: '-8%', width: '55%', height: '130%',
          backgroundImage: 'url(https://media.base44.com/images/public/6a41bd2ca6771bd95aa5d5f2/ec49070dc_3.png)',
          backgroundSize: 'cover', backgroundPosition: 'left center',
          mixBlendMode: 'soft-light', opacity: 0.55, pointerEvents: 'none',
        }} />
        <div className="max-w-6xl mx-auto px-6 py-16" style={{ position: 'relative' }}>
          <p className="label-mono mb-4" style={{ color: 'var(--zzz-yellow-dim)', letterSpacing: '0.2em' }}>Research + Mission</p>
          <h1 className="display-xl" style={{ maxWidth: 700 }}>
            SAVING<br />
            <span style={{ color: 'var(--ink-mid)' }}>KHATT</span><br />
            FROM EXTINCTION
          </h1>
          <p className="mt-6 max-w-xl" style={{ fontFamily: 'Barlow', fontSize: 16, color: 'var(--ink-mid)', lineHeight: 1.7 }}>
            In 2021, UNESCO declared Arabic calligraphy an endangered practice. Khattat is a response: a gamified, self-directed learning platform that builds a bridge between traditional methods and digital access, designed for young designers and creatives who want to learn but have no teacher.
          </p>
          <div className="mt-8 inline-block px-4 py-2 border" style={{ borderColor: 'var(--zzz-yellow)', background: 'var(--zzz-yellow-pale)' }}>
            <p style={{ fontFamily: 'Space Mono', fontSize: 11, letterSpacing: '0.12em', color: 'var(--zzz-yellow-dim)', textTransform: 'uppercase' }}>
              Research Question
            </p>
            <p className="mt-1" style={{ fontFamily: 'Rajdhani', fontWeight: 700, fontSize: 18, color: 'var(--ink)', lineHeight: 1.3 }}>
              How can we build a bridge between traditional and digital methods of Arabic calligraphy through gamification to prevent the practice from being extinct?
            </p>
          </div>
        </div>
      </section>

      <div className="max-w-6xl mx-auto px-6 py-12 grid grid-cols-1 lg:grid-cols-3 gap-12">

        {/* Left — mission + user journey */}
        <div className="lg:col-span-2 space-y-10">

          {/* Mission */}
          <div>
            <p className="label-mono mb-4" style={{ color: 'var(--zzz-yellow-dim)' }}>The Mission</p>
            <div className="sys-window">
              <div className="sys-titlebar"><span className="sys-titlebar-dot" /><span>What is Khattat?</span></div>
              <div className="p-6 space-y-4" style={{ fontFamily: 'Barlow', fontSize: 14, color: 'var(--ink-mid)', lineHeight: 1.8 }}>
                <p>
                  Khattat is a <strong style={{ color: 'var(--ink)' }}>gamified learning tool for designers</strong>. Not a cultural archive, and not just a font reference library. Its sole purpose is to make the <em>practice</em> of Arabic calligraphy learnable, step-by-step, without a traditional teacher.
                </p>
                <p>
                  Think of it as Duolingo, but for Arabic calligraphy. It structures a complex, traditionally gatekept art form into a digital, self-directed journey: from theory and Islamic art philosophy, to letter-by-letter drawing practice with XP rewards to maintain motivation.
                </p>
                <p>
                  The platform is for the <strong style={{ color: 'var(--ink)' }}>designer who is curious but doesn't know where to start</strong>. You don't need a reed pen. You don't need an ustaz. You just need to begin.
                </p>
              </div>
            </div>
          </div>

          {/* User Journey */}
          <div>
            <p className="label-mono mb-4" style={{ color: 'var(--zzz-yellow-dim)' }}>How it Works</p>
            <div className="sys-window">
              <div className="sys-titlebar"><span className="sys-titlebar-dot" /><span>The User Journey</span></div>
              <div className="divide-y" style={{ borderColor: 'var(--rule)' }}>
                {journey.map((step) => (
                  <div key={step.num} className="p-5 flex gap-5">
                    <span style={{ fontFamily: 'Space Mono', fontSize: 22, fontWeight: 700, color: 'var(--zzz-yellow)', lineHeight: 1, flexShrink: 0, minWidth: 36 }}>{step.num}</span>
                    <div>
                      <p style={{ fontFamily: 'Rajdhani', fontWeight: 700, fontSize: 16, textTransform: 'uppercase', color: 'var(--ink)', letterSpacing: '0.04em' }}>{step.title}</p>
                      <p className="mt-1" style={{ fontFamily: 'Barlow', fontSize: 13, color: 'var(--ink-mid)', lineHeight: 1.6 }}>{step.body}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Expert Quotes */}
          <div>
            <p className="label-mono mb-4" style={{ color: 'var(--zzz-yellow-dim)' }}>Expert Perspectives</p>
            <div className="space-y-4">
              {quotes.map((q) => (
                <div key={q.speaker} className="sys-window">
                  <div className="p-5">
                    <p style={{ fontFamily: 'Barlow', fontSize: 15, color: 'var(--ink)', lineHeight: 1.7, fontStyle: 'italic' }}>{q.text}</p>
                    <p className="mt-3" style={{ fontFamily: 'Space Mono', fontSize: 10, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--zzz-yellow-dim)' }}>{q.speaker}</p>
                    <p style={{ fontFamily: 'Barlow', fontSize: 12, color: 'var(--ink-faint)' }}>{q.role}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Research Methods */}
          <div>
            <p className="label-mono mb-4" style={{ color: 'var(--zzz-yellow-dim)' }}>Research Background</p>
            <div className="sys-window">
              <div className="sys-titlebar"><span className="sys-titlebar-dot" /><span>How this was developed</span></div>
              <div className="p-5 space-y-2">
                <AccordionItem title="Research Methods">
                  This project was developed through interviews with practicing Arabic calligraphers, surveys with 59 respondents, case studies of existing calligraphy workshops (including Werash Alkhatt), online resources, academic papers on game-based learning, and personal experimentation with multiple Arabic script styles.
                </AccordionItem>
                <AccordionItem title="Why Gamification?">
                  A 2024 Brunel University study found that 89% of pupils felt more engaged with game-based lessons, 93% said it improved their learning experience, and 82% reported increased confidence. Duolingo demonstrates the same principle at scale for language. Khattat applies this to Arabic calligraphy.
                </AccordionItem>
                <AccordionItem title="Why Start with Thuluth?">
                  Expert calligrapher Jasem AlNasrallah emphasised the importance of fundamentals before freestyle. Thuluth is one of the most foundational and widely taught scripts, making it the natural starting point. Once the basics are mastered here, learners can move to Naskh, Diwani, and beyond.
                </AccordionItem>
                <AccordionItem title="The Learning Philosophy">
                  The platform follows a three-stage model derived from expert consultation: (1) Learn Islamic art philosophy, (2) Learn and practice Arabic calligraphy letter by letter, (3) Apply what is learnt in different design contexts such as 3D, graphic design, and speculative work.
                </AccordionItem>
                <AccordionItem title="Target Audience">
                  Young designers and creatives aged 15–29 who are interested in Arabic calligraphy but lack access to formal instruction or traditional tools. The platform is designed to be used at home, self-directed, like Duolingo.
                </AccordionItem>
              </div>
            </div>
          </div>
        </div>

        {/* Right — stats + context */}
        <div className="space-y-6">

          {/* UNESCO callout */}
          <div className="sys-window">
            <div className="sys-titlebar"><span className="sys-titlebar-dot" /><span>Why Now</span></div>
            <div className="p-5">
              <p style={{ fontFamily: 'Barlow Condensed', fontWeight: 700, fontSize: 28, color: 'var(--zzz-yellow)', lineHeight: 1.1 }}>UNESCO 2021</p>
              <p className="mt-2" style={{ fontFamily: 'Barlow', fontSize: 13, color: 'var(--ink-mid)', lineHeight: 1.6 }}>
                Arabic calligraphy was added to UNESCO's Representative List of the Intangible Cultural Heritage of Humanity as an <strong style={{ color: 'var(--ink)' }}>endangered practice</strong>, due to the decline of calligraphers and teachers as technology advanced.
              </p>
            </div>
          </div>

          {/* Survey Stats */}
          <div className="sys-window">
            <div className="sys-titlebar"><span className="sys-titlebar-dot" /><span>Survey Results: 59 Responses</span></div>
            <div className="divide-y" style={{ borderColor: 'var(--rule)' }}>
              {stats.map((s) => (
                <div key={s.pct} className="p-4 flex gap-4 items-start">
                  <span style={{ fontFamily: 'Rajdhani', fontWeight: 700, fontSize: 26, color: 'var(--zzz-yellow)', lineHeight: 1, flexShrink: 0, minWidth: 52 }}>{s.pct}</span>
                  <p style={{ fontFamily: 'Barlow', fontSize: 12, color: 'var(--ink-mid)', lineHeight: 1.5 }}>{s.text}</p>
                </div>
              ))}
            </div>
          </div>

          {/* By Suad */}
          <div className="sys-window">
            <div className="sys-titlebar"><span className="sys-titlebar-dot" /><span>About the Designer</span></div>
            <div className="p-5">
              <p style={{ fontFamily: 'Rajdhani', fontWeight: 700, fontSize: 18, color: 'var(--ink)', textTransform: 'uppercase', letterSpacing: '0.04em' }}>Suad AlBahar</p>
              <p className="label-mono mt-1" style={{ color: 'var(--zzz-yellow-dim)' }}>MA Graphic Design</p>
              <p className="mt-3" style={{ fontFamily: 'Barlow', fontSize: 13, color: 'var(--ink-mid)', lineHeight: 1.6 }}>
                This project emerged from a personal frustration: being interested in Arabic calligraphy but having no accessible way to learn it digitally. Khattat is both a research outcome and a working prototype, built to test whether gamification can genuinely lower the barrier to entry for this endangered art form.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}