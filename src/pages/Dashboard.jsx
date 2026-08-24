import { useState, useMemo } from 'react'
import {
  ResponsiveContainer, AreaChart, Area, LineChart, Line, BarChart, Bar,
  XAxis, YAxis, Tooltip, ReferenceLine,
} from 'recharts'
import { runSeason, multiSeason, platform, fmtUSD, fmtK } from '../model'
import { demand, raceWeek } from '../demand'

const OX = '#7A1818', TAUPE = '#7C6E5D', GOLD = '#B08D3E', SAND = '#D9CBB4', INK = '#1B1512'

function Tip({ active, payload, label, fmt }) {
  if (!active || !payload || !payload.length) return null
  return (
    <div className="rt">
      <b>{label}</b>
      {payload.map((p, i) => (
        <div key={i}>{p.name}: <b>{fmt ? fmt(p.value) : p.value}</b></div>
      ))}
    </div>
  )
}

export default function Dashboard() {
  const [scen, setScen] = useState('base')
  const s = useMemo(() => runSeason(scen), [scen])
  const ms = useMemo(() => multiSeason(scen), [scen])
  const plat = useMemo(() => platform(scen), [scen])

  return (
    <div className="fade-in">
      <div className="dash">
        <header className="dhero">
          <div className="dhero__eyebrow eyebrow">Investor Product Review</div>
          <h1 className="dhero__title">Should an official F1 race<br />account be on Pinterest?</h1>
          <p className="dhero__sub">Pinterest users plan trips and buy. F1&rsquo;s audience now matches them. No official account is there yet &mdash; here&rsquo;s what that&rsquo;s worth.</p>
        </header>
      </div>

      <div className="toggle">
        <span className="toggle__label">Scenario</span>
        {['conservative', 'base', 'optimistic'].map((k) => (
          <button key={k} className={scen === k ? 'on' : ''} onClick={() => setScen(k)}>{k}</button>
        ))}
      </div>

      <div className="dash">
        {/* 1 — THE GAP */}
        <section className="sec" style={{ borderTop: 'none' }}>
          <h2 className="sec__title">No official F1 account is on Pinterest.</h2>
          <div className="gap-grid">
            <div>
              <div className="gap-num">0</div>
              <p className="sec__lead" style={{ marginTop: 14 }}>
                Not one F1 team or driver has an official Pinterest account. Yet Pinterest&rsquo;s users are
                mostly women planning purchases, and F1&rsquo;s fanbase has shifted the same way. The audience
                is already there. No one is serving it.
              </p>
            </div>
            <div className="statrow" style={{ gridTemplateColumns: '1fr 1fr', margin: 0 }}>
              <div className="stat"><div className="stat__v">42%</div><div className="stat__k">of F1 fans are women</div></div>
              <div className="stat"><div className="stat__v">70%</div><div className="stat__k">of Pinterest is women</div></div>
              <div className="stat"><div className="stat__v">3 in 4</div><div className="stat__k">new F1 fans are women</div></div>
              <div className="stat"><div className="stat__v">Trips</div><div className="stat__k">what Pinterest is used for</div></div>
            </div>
          </div>
        </section>

        {/* 2 — DEMAND */}
        <section className="sec">
          <h2 className="sec__title">People plan the trip weeks before the race.</h2>
          <p className="sec__lead">
            A year of Google searches for the Las Vegas GP. Searches for the race itself spike only during race
            week, then disappear. But searches for <b>tickets and hotels</b> stay high all year and peak the
            week before the race. That&rsquo;s the booking window &mdash; and no official account is there to catch it.
          </p>
          <div className="chartbox">
            <div className="legend">
              <span><i style={{ background: OX }} />&ldquo;Las Vegas Grand Prix&rdquo;</span>
              <span><i style={{ background: TAUPE }} />&ldquo;&hellip; tickets&rdquo;</span>
              <span><i style={{ background: GOLD }} />&ldquo;&hellip; hotels&rdquo;</span>
            </div>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={demand} margin={{ top: 6, right: 8, bottom: 0, left: -18 }}>
                <XAxis dataKey="date" tick={{ fontSize: 10 }} interval={5} tickLine={false} axisLine={{ stroke: SAND }} />
                <YAxis tick={{ fontSize: 11 }} tickLine={false} axisLine={false} domain={[0, 100]} />
                <Tooltip content={<Tip />} />
                <ReferenceLine x={raceWeek} stroke={INK} strokeDasharray="3 3" label={{ value: 'Race week', position: 'top', fontSize: 10, fill: INK }} />
                <Line type="monotone" dataKey="attention" name="Race" stroke={OX} strokeWidth={2.4} dot={false} />
                <Line type="monotone" dataKey="tickets" name="Tickets" stroke={TAUPE} strokeWidth={1.8} dot={false} />
                <Line type="monotone" dataKey="hotels" name="Hotels" stroke={GOLD} strokeWidth={1.8} dot={false} />
              </LineChart>
            </ResponsiveContainer>
            <p className="sec__note">Google Trends, worldwide, relative interest 0&ndash;100 (a measure of timing, not raw search counts).</p>
          </div>
        </section>

        {/* 3 — ONE SEASON */}
        <section className="sec">
          <h2 className="sec__title">One season, race by race.</h2>
          <p className="sec__lead">
            The account loses money most of the year while it builds an audience, then earns it back at the big
            races. Las Vegas is the biggest single weekend. At base assumptions it reaches breakeven by the last
            race. Change the scenario above to see the range.
          </p>
          <div className="statrow">
            <div className="stat"><div className="stat__v">{fmtUSD(s.influenced)}</div><div className="stat__k">Visitor spend influenced</div></div>
            <div className="stat"><div className="stat__v">{fmtUSD(s.travel)}</div><div className="stat__k">Booking revenue kept</div></div>
            <div className="stat stat--ink"><div className="stat__v">{fmtK(s.endAud)}</div><div className="stat__k">Followers by year end</div></div>
            <div className="stat"><div className="stat__v">{fmtUSD(s.net)}</div><div className="stat__k">Profit / loss, year 1</div></div>
          </div>
          <div className="chartbox">
            <div className="chartcap">Running profit &amp; loss across the season &mdash; {scen} case</div>
            <ResponsiveContainer width="100%" height={300}>
              <AreaChart data={s.rows} margin={{ top: 6, right: 8, bottom: 0, left: 4 }}>
                <defs>
                  <linearGradient id="ox" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor={OX} stopOpacity={0.22} />
                    <stop offset="100%" stopColor={OX} stopOpacity={0.02} />
                  </linearGradient>
                </defs>
                <XAxis dataKey="name" tick={{ fontSize: 9 }} interval={2} tickLine={false} axisLine={{ stroke: SAND }} angle={-30} textAnchor="end" height={54} />
                <YAxis tick={{ fontSize: 11 }} tickFormatter={(v) => fmtUSD(v)} tickLine={false} axisLine={false} width={70} />
                <Tooltip content={<Tip fmt={fmtUSD} />} />
                <ReferenceLine y={0} stroke={INK} strokeWidth={1} label={{ value: 'break-even', position: 'insideTopLeft', fontSize: 10, fill: INK }} />
                <ReferenceLine x="Las Vegas" stroke={OX} strokeDasharray="3 3" label={{ value: 'Vegas', position: 'insideTopRight', fontSize: 10, fill: OX }} />
                <Area type="monotone" dataKey="cum" name="Running total" stroke={OX} strokeWidth={2.4} fill="url(#ox)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </section>

        {/* 4 — TWO ENGINES */}
        <section className="sec">
          <h2 className="sec__title">The audience is what drives the bookings.</h2>
          <p className="sec__lead">
            The followers and the bookings aren&rsquo;t separate things. The audience you build is who books the
            travel. In the {scen} case, <b>{fmtUSD(s.linkValue)}</b> of booking revenue comes purely from having
            built that audience first. Grow the following, and the bookings follow.
          </p>
          <div className="flow">
            <div className="flow__node">Step 1<b>Build followers</b></div>
            <span className="flow__arw">&rarr;</span>
            <div className="flow__node">Step 2<b>They plan a trip</b></div>
            <span className="flow__arw">&rarr;</span>
            <div className="flow__node">Step 3<b>Bookings &mdash; {fmtUSD(s.travel)}</b></div>
            <span className="flow__arw">&rarr;</span>
            <div className="flow__node">Plus<b>Merch &mdash; {fmtUSD(s.comm)}</b></div>
          </div>
        </section>

        {/* 5 — MULTI-SEASON */}
        <section className="sec">
          <h2 className="sec__title">Year 1 breaks even. Then it grows.</h2>
          <p className="sec__lead">
            The audience carries over and compounds each year while costs stay flat, so profit climbs. Year 1
            lands near breakeven. By Year 3 net reaches <b>{fmtUSD(ms[2].net)}</b>; by Year 5, <b>{fmtUSD(ms[4].net)}</b>.
            Growth slows as the audience nears its ceiling &mdash; a realistic curve, not an endless one.
          </p>
          <table className="mtable">
            <thead>
              <tr><th>Year</th><th>Visitor spend influenced</th><th>Net profit / loss</th></tr>
            </thead>
            <tbody>
              {ms.map((r, i) => (
                <tr key={r.season} className={i === 0 ? 'hl' : ''}>
                  <td>{r.season}</td>
                  <td>{fmtUSD(r.influenced)}</td>
                  <td className={'net ' + (r.net >= 0 ? 'pos' : 'neg')}>{fmtUSD(r.net)}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="chartbox">
            <div className="chartcap">Net profit by year &mdash; {scen} case</div>
            <ResponsiveContainer width="100%" height={260}>
              <BarChart data={ms} margin={{ top: 6, right: 8, bottom: 0, left: 10 }}>
                <XAxis dataKey="season" tick={{ fontSize: 12 }} tickLine={false} axisLine={{ stroke: SAND }} />
                <YAxis tick={{ fontSize: 11 }} tickFormatter={(v) => fmtUSD(v)} tickLine={false} axisLine={false} width={72} />
                <Tooltip content={<Tip fmt={fmtUSD} />} />
                <ReferenceLine y={0} stroke={INK} strokeWidth={1} />
                <Bar dataKey="net" name="Net" fill={OX} />
              </BarChart>
            </ResponsiveContainer>
          </div>
          <p className="sec__note">Forward projection on the assumptions above, not a forecast.</p>
        </section>

        {/* 6 — PARTNERSHIPS */}
        <section className="sec">
          <h2 className="sec__title">Booking partnerships add margin.</h2>
          <p className="sec__lead">
            Deals with hotels and ticketing partners raise the share of each booking the account keeps. Applied
            to the base case, that lifts booking revenue about <b>65% every year</b> &mdash; same audience, more
            revenue. Each pair of bars is one year: booking revenue on its own, then with partnerships.
          </p>
          <div className="chartbox">
            <div className="chartcap">Booking revenue per year &mdash; on its own vs with partnerships</div>
            <ResponsiveContainer width="100%" height={280}>
              <BarChart data={ms} margin={{ top: 6, right: 8, bottom: 0, left: 6 }} barGap={4}>
                <XAxis dataKey="season" tick={{ fontSize: 12 }} tickLine={false} axisLine={{ stroke: SAND }} />
                <YAxis tick={{ fontSize: 11 }} tickFormatter={(v) => fmtUSD(v)} tickLine={false} axisLine={false} width={64} />
                <Tooltip content={<Tip fmt={fmtUSD} />} />
                <Bar dataKey="travel" name="On its own" fill={SAND} />
                <Bar dataKey="travelPartner" name="With partnerships" fill={OX} />
              </BarChart>
            </ResponsiveContainer>
            <div className="legend" style={{ marginTop: 12 }}>
              <span><i style={{ background: SAND }} />On its own</span>
              <span><i style={{ background: OX }} />With partnerships</span>
            </div>
          </div>
        </section>

        {/* 7 — PLATFORM */}
        <section className="sec">
          <h2 className="sec__title">The real scale: more accounts.</h2>
          <p className="sec__lead">
            One account proves it works. The bigger opportunity is opening the tool to creators and influencers
            who build their own race guides. Each is a small business, and the platform takes a cut of every
            booking. At 100 creator accounts, that&rsquo;s <b>{fmtUSD(plat[4].gmv)}</b> in bookings and <b>{fmtUSD(plat[4].platformRev)}</b>
            {' '}a year to the platform. The chart shows platform revenue as accounts grow.
          </p>
          <div className="chartbox">
            <div className="chartcap">Yearly platform revenue by number of creator accounts (8% of bookings)</div>
            <ResponsiveContainer width="100%" height={280}>
              <BarChart data={plat} margin={{ top: 6, right: 8, bottom: 0, left: 12 }}>
                <XAxis dataKey="accounts" tick={{ fontSize: 12 }} tickLine={false} axisLine={{ stroke: SAND }} tickFormatter={(v) => v + ' accts'} />
                <YAxis tick={{ fontSize: 11 }} tickFormatter={(v) => fmtUSD(v)} tickLine={false} axisLine={false} width={78} />
                <Tooltip content={<Tip fmt={fmtUSD} />} />
                <Bar dataKey="platformRev" name="Platform revenue" fill={OX} />
              </BarChart>
            </ResponsiveContainer>
            <p className="sec__note">Platform revenue is 8% of total booking volume across all accounts, at Year-3 maturity.</p>
          </div>
        </section>

        {/* 8 — THE ASK */}
        <section className="sec">
          <h2 className="sec__title">What it comes down to.</h2>
          <p className="sec__lead">
            One official account lands near breakeven in Year 1, so the decision rests on the assumptions above &mdash;
            which you can change and test. What isn&rsquo;t in doubt: the audience is there, the booking window opens
            weeks before every race, and no official account is using it.
          </p>
          <p className="sec__lead" style={{ marginTop: 14 }}>
            Start with one race &mdash; Las Vegas &mdash; run by the promoter and the city&rsquo;s tourism board, who gain
            directly from full hotels and ticket sales. Prove it there, add booking partnerships, then open the
            platform to creators. Every step is measurable, because every booking is a tracked click.
          </p>
          <p className="sec__note">
            All figures are illustrative and driven by the assumptions in the scenario switch. Multi-year,
            partnership, and platform numbers are projections, not forecasts.
          </p>
        </section>
      </div>
    </div>
  )
}
