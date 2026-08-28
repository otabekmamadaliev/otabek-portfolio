import { useMemo, useState } from 'react'
import { useLang } from '../i18n/lang.jsx'

/*
  The availability core from AURELIA, rebuilt small enough to live in the
  hero. It is the real thing, not a mock-up: seeded reservations occupy
  specific room-nights, selecting a span resolves each room against those
  reservations, and the price follows the nights you picked.

  Kept deliberately dependency-free - the point is that it is hand-written.
*/

const NIGHTS = 10

// Rates in PLN per night. Order matches ROOM_KEYS / t.engine.rooms.
const RATES = [320, 380, 460]

// Seeded reservations as [roomIndex, dayOffset]. Fixed rather than random:
// a grid that reshuffles on every reload reads as decoration, and this
// stands in for rows that would come out of a database.
const RESERVED = [
  [0, 2],
  [0, 3],
  [0, 7],
  [1, 1],
  [1, 2],
  [1, 8],
  [1, 9],
  [2, 4],
  [2, 5],
  [2, 6],
]

function startOfToday() {
  const d = new Date()
  d.setHours(0, 0, 0, 0)
  return d
}

function isReserved(room, day) {
  return RESERVED.some(([r, d]) => r === room && d === day)
}

function Engine() {
  const { t, lang } = useLang()
  const e = t.engine

  // anchor = first click, cursor = second. Null means nothing chosen yet.
  const [anchor, setAnchor] = useState(null)
  const [cursor, setCursor] = useState(null)

  const days = useMemo(() => {
    const base = startOfToday()
    return Array.from({ length: NIGHTS }, (_, i) => {
      const d = new Date(base)
      d.setDate(base.getDate() + i)
      return d
    })
  }, [])

  const locale = { en: 'en-GB', uz: 'uz-UZ', pl: 'pl-PL', ru: 'ru-RU' }[lang]

  const span =
    anchor === null
      ? null
      : {
          from: Math.min(anchor, cursor ?? anchor),
          to: Math.max(anchor, cursor ?? anchor),
        }

  const nights = span ? span.to - span.from + 1 : 0

  // The resolution step: a room survives only if none of its reserved
  // nights fall inside the selected span.
  const rooms = RATES.map((rate, room) => {
    if (!span) return { rate, free: null }
    for (let d = span.from; d <= span.to; d += 1) {
      if (isReserved(room, d)) return { rate, free: false }
    }
    return { rate, free: true }
  })

  const freeCount = rooms.filter((r) => r.free).length
  const cheapest = rooms
    .filter((r) => r.free)
    .reduce((min, r) => (min === null || r.rate < min ? r.rate : min), null)

  const total = cheapest === null ? null : cheapest * nights

  function pick(day) {
    if (anchor === null || cursor !== null) {
      setAnchor(day)
      setCursor(null)
    } else {
      setCursor(day)
    }
  }

  function reset() {
    setAnchor(null)
    setCursor(null)
  }

  const money = (n) =>
    new Intl.NumberFormat(locale, {
      style: 'currency',
      currency: 'PLN',
      maximumFractionDigits: 0,
    }).format(n)

  // label column + one column per night + verdict column
  const cols = `minmax(112px, auto) repeat(${NIGHTS}, minmax(34px, 1fr)) minmax(78px, auto)`

  const inSpan = (d) => span !== null && d >= span.from && d <= span.to

  return (
    <section className="rig" aria-label={e.title}>
      <div className="rig-bar">
        <h2 className="rig-title">
          <span className="lamp" aria-hidden="true" />
          {e.title}
        </h2>
        <span className="rig-src">{e.source}</span>
      </div>

      <p className="rig-hint" aria-live="polite">
        {span === null ? (
          e.hintPick
        ) : cursor === null ? (
          e.hintSecond
        ) : freeCount > 0 ? (
          <>
            {e.hintResult}{' '}
            <b>
              {freeCount}/{rooms.length} {e.roomsFree}
            </b>
          </>
        ) : (
          <b>{e.hintNone}</b>
        )}
      </p>

      <div className="rig-scroll">
        <div className="rig-grid" style={{ gridTemplateColumns: cols }}>
          {/* header row */}
          <span className="rig-room" aria-hidden="true" />
          {days.map((d, i) => (
            <button
              key={`h${i}`}
              type="button"
              className={`rig-head ${inSpan(i) ? 'in-span' : ''}`}
              onClick={() => pick(i)}
              aria-pressed={inSpan(i)}
              aria-label={d.toLocaleDateString(locale, {
                weekday: 'long',
                day: 'numeric',
                month: 'long',
              })}
            >
              <span className="dow">
                {d.toLocaleDateString(locale, { weekday: 'short' }).slice(0, 2)}
              </span>
              <span className="dom">{d.getDate()}</span>
            </button>
          ))}
          <span className="rig-room" aria-hidden="true" />

          {/* one row per room */}
          {rooms.map((room, r) => (
            <Row
              key={r}
              name={e.rooms[r]}
              rate={room.rate}
              free={room.free}
              roomIndex={r}
              inSpan={inSpan}
              onPick={pick}
              labels={e}
              money={money}
            />
          ))}
        </div>
      </div>

      <div className="rig-out">
        <div className="rig-stat">
          <span className="k">{e.kNights}</span>
          <span className="v">{nights || '--'}</span>
        </div>
        <div className="rig-stat">
          <span className="k">{e.kRooms}</span>
          <span className="v">{span ? `${freeCount}/${rooms.length}` : '--'}</span>
        </div>
        <div className="rig-stat">
          <span className="k">{e.kFrom}</span>
          <span className={`v ${total ? 'amber' : ''}`}>
            {total ? money(total) : '--'}
          </span>
        </div>
        <span className="spacer" />
        {span && (
          <button type="button" className="rig-reset" onClick={reset}>
            {e.clear}
          </button>
        )}
        <a
          className="rig-link"
          href="https://aurelia-booking.vercel.app"
          target="_blank"
          rel="noreferrer"
        >
          {e.seeFull} &#8599;
        </a>
      </div>
    </section>
  )
}

function Row({ name, rate, free, roomIndex, inSpan, onPick, labels, money }) {
  return (
    <>
      <span className="rig-room">
        {name}
        <span className="rate">{money(rate)}</span>
      </span>
      {Array.from({ length: NIGHTS }, (_, d) => {
        const booked = isReserved(roomIndex, d)
        const sel = inSpan(d)
        const cls = [
          'rig-cell',
          booked ? 'booked' : '',
          sel && booked ? 'in-span' : '',
          sel && !booked && free ? 'free-span' : sel ? 'in-span' : '',
        ]
          .filter(Boolean)
          .join(' ')
        return (
          <span
            key={d}
            className={cls}
            onClick={() => !booked && onPick(d)}
            aria-hidden="true"
          >
            {booked ? '×' : ''}
          </span>
        )
      })}
      <span
        className={`rig-row-state ${free === true ? 'free' : free === false ? 'blocked' : ''}`}
      >
        {free === true ? labels.free : free === false ? labels.blocked : ''}
      </span>
    </>
  )
}

export default Engine
