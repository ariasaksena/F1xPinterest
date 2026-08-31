import { useState, useEffect } from 'react'
import { createPortal } from 'react-dom'
import Squiggle from '../components/Squiggle'
import Walkthrough from '../components/Walkthrough'
import hdrAbout from '../assets/hdr-about.png'
import hdrJournal from '../assets/hdr-journal.png'
import systemmap from '../assets/systemmap.jpg'
import e1m from '../assets/ev1-main.jpg'; import e1a from '../assets/ev1-a.jpg'; import e1b from '../assets/ev1-b.jpg'
import e2m from '../assets/ev2-main.jpg'; import e2a from '../assets/ev2-a.jpg'; import e2b from '../assets/ev2-b.jpg'
import e3m from '../assets/ev3-main.jpg'; import e3a from '../assets/ev3-a.jpg'; import e3b from '../assets/ev3-b.jpg'
import e4m from '../assets/ev4-main.jpg'; import e4a from '../assets/ev4-a.jpg'; import e4b from '../assets/ev4-b.jpg'
import e5a from '../assets/ev5-a.jpg'; import e5b from '../assets/ev5-b.jpg'

const EVENTS = [
  { year: '2021', title: 'F1 Passion Begins', caption: 'the 2021 season', main: e1m, shots: [e1a, e1b], rot: '-2.4deg',
    body: 'I started watching Formula One during the 2021 season, when the championship came down to a rivalry between Max Verstappen and Lewis Hamilton. Drive to Survive filled in everything the race broadcasts did not show. What held my attention was not only the racing but the people and the machinery behind it: the driver personalities, the rivalries between teams, and the engineering that decides who wins.' },
  { year: '2022', title: 'Creativity x F1', caption: 'race weekend spreads', main: e2m, shots: [e2a, e2b], rot: '1.8deg',
    body: 'I began recording everything I was learning in a journal, building a spread for each race weekend with the circuit, the stats, and the results. I decorated my basement for watch parties and made my own merchandise. Formula One stopped being only something I watched and became a creative outlet, a place to bring a more feminine and design-driven side to the sport. Pinterest was where I found nearly all of that inspiration, which is part of why this project ended up there.' },
  { year: '2024', title: 'Visualizing Myself', caption: 'first Grand Prix', main: e3m, shots: [e3a, e3b], rot: '-1.6deg',
    body: 'I attended a Grand Prix in person, met several of the drivers I had followed for years, and watched the cars race in front of me. Seeing how the teams operated up close changed what I paid attention to. I became far more interested in the engineering side of the sport, and for the first time I could picture myself working in it.' },
  { year: '2021 to Present', title: 'Pursuing STEM', caption: 'the long game', main: e4m, shots: [e4a, e4b], rot: '2.2deg',
    body: 'Alongside all of this, I was taking as many STEM subjects as I could, and they were the ones I enjoyed most because of how logical and systematic the thinking is. I started computer science in sixth grade and committed to it seriously once I reached high school in 2023. The courses got difficult, but Formula One was the reason I kept going, including in classes where I was the only girl, because I could see myself building a career in tech or in the sport itself.' },
  { year: '2026', title: 'My Project', caption: 'F1 meets Pinterest', card: true, shots: [e5a, e5b], rot: '-1.9deg',
    body: 'This project is where both sides of my work finally met. The creative side, which I had spent years developing through journals, design, and Pinterest, and the technical side, which I had been building through computer science. I used them together to research a real gap in the Formula One system and to design, model, and build a product around it. Formula Planner is the result: an idea I found through the sport I love, supported by data, and built by hand.' },
]

const LINEAR = [
  { no: '01', title: 'Choosing the Focus', rot: '-.8deg',
    text: 'Every project I have done well began with a subject I already cared about. Outside of academics, that subject is Formula One. It is where I learned to organize a community by founding my school\u2019s F1 Club, where I have developed my creative work, and a big reason I became interested in STEM and decided to pursue computer science, including in classes where I am the only girl. I wanted this internship to focus on something I would keep thinking about after hours.' },
  { no: '02', title: 'Mapping the System', rot: '.7deg', art: systemmap, artCap: 'the system map, drawn by hand',
    text: 'Before proposing a solution, I mapped the Formula One ecosystem by hand: teams, drivers, sponsors, fans, merchandise, hospitality, and broadcasting, along with how money and attention move between them. The gap became clear during that exercise. Zero F1 teams and zero drivers have an official Pinterest account. That finding led me to research how Pinterest differs from other platforms and what it could offer a brand like F1.' },
  { no: '03', title: 'The Counterfactual', rot: '-.6deg',
    text: 'To test whether the gap actually mattered, I reversed the question and asked what would happen to the Formula One system if Pinterest did not exist. This forced me to show that Pinterest was genuinely different rather than interchangeable with Instagram or TikTok. Three findings held up: its user base matches F1\u2019s fastest-growing group of young female fans, those users arrive with high purchase intent, and the platform is one of the largest trip-planning sites online.' },
  { no: '04', title: 'Testing the Weakness', rot: '1deg',
    text: 'Midway through, I found the strongest argument against my own idea. Anyone can build a Pinterest board of shoppable links for free, so I made one to test it. The result showed me the difference: Pinterest is very good at distribution, but it cannot hold a multi-part plan, it does not pay the account owner, and it cannot prove that a pin led to a booking. This changed how I framed the product. The site does not compete with Pinterest boards. It adds the payment and tracking layer that makes posting them worth doing.' },
]

const BRANCH = {
  money: { no: '05', label: 'Monetization Path', title: 'Quantifying the Opportunity', rot: '-.9deg',
    text: 'I turned those findings into numbers through market research and an opportunity cost analysis. My first assumption was that Pinterest would work best for teams, drivers, and merchandise. The analysis showed otherwise. Merchandise is a small purchase decided in minutes, while a race weekend involves flights, hotels, tickets, and dining planned over several weeks, worth thousands of dollars per attendee. The long-term opportunity was in travel and bookings. That also solved the tracking problem, because bookings are completed through links that can be measured.',
    text2: 'I then built a season-long cash flow model on real data, including Google Trends search interest for Las Vegas Grand Prix travel terms, visitor spending reports from host cities, race-weekend hotel pricing, F1 fan demographic surveys, Pinterest conversion benchmarks, and current ticket and merchandise prices. Building it taught me to keep every assumption visible so anyone can challenge it, to link the two sides of the model so audience growth actually drives bookings, and to vary the numbers by race instead of applying one flat rate. The result is a range with a break-even point rather than a single figure.' },
  product: { no: '06', label: 'Product Path', title: 'The Product Concept', rot: '.9deg',
    text: 'Formula Planner is a platform where official race accounts build and publish shoppable guides to their own race weekend. The Las Vegas Grand Prix, for example, creates an account and assembles a set of guides: where to stay, a three-day VIP itinerary, and what to wear on race day. Each guide is a collection of real products and bookings, presented as images that link directly to the hotel, the ticket vendor, the restaurant, or the store. It works the way ShopMy works for fashion creators, except the subject is an entire race weekend rather than an outfit.',
    text2: 'The Pinterest connection is what makes it run. From the images inside a guide, the account generates a single collage that it posts to Pinterest as a pin. A fan planning a trip finds that pin, clicks it, and lands on the guide, where every item is bookable in one place. Because every click passes through the site, each booking can be traced back to the pin that produced it, and the account earns a commission on what it sells. The promoter and the city tourism board benefit directly, since both are measured on filled hotels and ticket sales. Building this taught me as much about project management as it did about product. I had to define an MVP that was realistic for the time I had, which meant deciding what to leave out.' },
}

const FINAL = { no: '07', title: 'The Launch', rot: '-.7deg',
  text: 'The build was the most familiar stage for me. My goal was to show both sides of my work: the computer science needed to ship a working React site, and the design skills to present the project in a way that looks like mine instead of a template.' }

function CardArt() {
  return (
    <div className="cardart">
      <div className="cardart__yr">2026</div>
      <div className="cardart__f1">FORMULA 1</div>
      <div className="cardart__x">&times;</div>
      <div className="cardart__pin">Pinterest</div>
      <div className="cardart__rule" />
      <div className="cardart__sub">Formula Planner</div>
    </div>
  )
}

function Overlay({ ev, onClose }) {
  useEffect(() => {
    const esc = (e) => e.key === 'Escape' && onClose()
    document.addEventListener('keydown', esc)
    document.body.style.overflow = 'hidden'
    return () => { document.removeEventListener('keydown', esc); document.body.style.overflow = '' }
  }, [onClose])

  return createPortal(
    <div className="ov" onClick={onClose}>
      <div className="ov__card" onClick={(e) => e.stopPropagation()}>
        <button className="ov__x" onClick={onClose} aria-label="Close">&times;</button>
        <div className="ov__yr">{ev.year}</div>
        <h3 className="ov__ttl">{ev.title}</h3>
        <div className="ov__grid">
          <div className="ov__shots">
            <div className="ov__shot ov__shot--main" style={{ '--r': '-1.2deg' }}>
              {ev.card ? <CardArt /> : <img src={ev.main} alt="" />}
            </div>
            <div className="ov__shots" style={{ gridTemplateColumns: '1fr 1fr', display: 'grid' }}>
              {ev.shots.map((s, i) => (
                <div className="ov__shot" key={i} style={{ '--r': i === 0 ? '1.6deg' : '-1.8deg' }}>
                  <img src={s} alt="" />
                </div>
              ))}
            </div>
          </div>
          <div className="ov__body">
            <p>{ev.body}</p>
          </div>
        </div>
      </div>
    </div>,
    document.body
  )
}

export default function About() {
  const [open, setOpen] = useState(null)

  return (
    <div className="scrap fade-in">
      <Walkthrough />
      <header className="scrap__hdr">
        <img src={hdrAbout} alt="About Me" />
        <p className="scrap__bio">
          Hi, I am Aria, a rising senior from New Jersey. My two biggest interests are Formula One and
          computer science, and for a long time I treated them as separate things. This project is where they
          finally met. I built Formula Planner during an externship with a mentor at Pinterest, using it to
          research a real gap in the Formula One system and then design, model, and build a product around it.
        </p>
      </header>

      <div className="tl">
        {EVENTS.map((ev, i) => (
          <div className="tl__row" key={i}>
            <div className="tl__side">
              <button className="polas" onClick={() => setOpen(ev)} aria-label={`Open ${ev.title}`}>
                <div className="pola" style={{ '--rot': ev.rot }}>
                  <span className="pola__tape" />
                  {ev.card ? <CardArt /> : <img src={ev.main} alt="" />}
                  <span className="pola__cap">{ev.caption}</span>
                </div>
              </button>
            </div>
            <span className="tl__dot" />
            <div className="tl__meta">
              <div className="tl__yr">{ev.year}</div>
              <h2 className="tl__ttl">{ev.title}</h2>
            </div>
          </div>
        ))}
      </div>

      <header className="scrap__hdr scrap__hdr--journal" style={{ paddingTop: 'clamp(54px,8vw,96px)' }}>
        <img src={hdrJournal} alt="Discovery Journal" />
        <p className="scrap__intro">How the thinking moved, step by step.</p>
      </header>

      <div className="map">
        {LINEAR.map((n, i) => {
          const side = i % 2 === 0 ? 'l' : 'r'
          return (
            <div key={n.no}>
              <div className={`map__row map__row--${side}`}>
                <article className="node" style={{ '--rot': n.rot }}>
                  <span className={`node__tape${side === 'r' ? ' node__tape--r' : ''}`} />
                  <div className="node__no">{n.no}</div>
                  <h3 className="node__ttl">{n.title}</h3>
                  <p className="node__txt">{n.text}</p>
                  {n.art && (
                    <>
                      <div className="node__art"><img src={n.art} alt="Hand-drawn F1 system map" /></div>
                      <div className="node__artcap">{n.artCap}</div>
                    </>
                  )}
                </article>
              </div>
              <div className="arrowwrap">
                <Squiggle dir={side === 'l' ? 'lr' : 'rl'} variant={i} />
              </div>
            </div>
          )
        })}

        <div className="forkcue">
          <span>The work splits in two from here</span>
        </div>

        <div className="fork">
          {[BRANCH.money, BRANCH.product].map((n, i) => (
            <div className="fork__col" key={n.no}>
              <Squiggle dir={i === 0 ? 'rl' : 'lr'} variant={i + 1} />
              <div className="pathlbl">{n.label}</div>
              <article className="node" style={{ '--rot': n.rot }}>
                <span className={`node__tape${i === 1 ? ' node__tape--r' : ''}`} />
                <div className="node__no">{n.no}</div>
                <h3 className="node__ttl">{n.title}</h3>
                <p className="node__txt">{n.text}</p>
                {n.text2 && <p className="node__txt" style={{ marginTop: '12px' }}>{n.text2}</p>}
              </article>
            </div>
          ))}
        </div>

        <div className="converge">
          <Squiggle dir="lr" variant={3} />
          <Squiggle dir="rl" variant={0} />
        </div>

        <div className="final">
          <article className="node" style={{ '--rot': FINAL.rot }}>
            <span className="node__tape" />
            <div className="node__no">{FINAL.no}</div>
            <h3 className="node__ttl">{FINAL.title}</h3>
            <p className="node__txt">{FINAL.text}</p>
          </article>
        </div>
      </div>

      <p className="jrnl__end">and that is how Formula Planner came together.</p>

      {open && <Overlay ev={open} onClose={() => setOpen(null)} />}
    </div>
  )
}
