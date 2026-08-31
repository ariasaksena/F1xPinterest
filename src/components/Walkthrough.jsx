import { useRef, useState } from 'react'
import { createPortal } from 'react-dom'

/**
 * Floating corner walkthrough player.
 *
 * TO ADD YOUR VIDEO:
 *   1. Put your file at  src/assets/walkthrough.mp4
 *   2. Uncomment the import line below and the `src` line in <video>.
 *   Or, if hosting on YouTube/Vimeo, set HOSTED_URL to the direct file URL.
 */
import walkthrough from '../assets/walkthrough.mp4'
import poster from '../assets/walkthrough-poster.jpg'
const HOSTED_URL = '' // set to a hosted URL to use that instead of the local file

export default function Walkthrough() {
  const videoRef = useRef(null)
  const [minimized, setMinimized] = useState(true)
  const [playing, setPlaying] = useState(false)

  const src = HOSTED_URL || walkthrough

  const play = () => {
    const v = videoRef.current
    if (!v) return
    v.play()
    setPlaying(true)
  }

  return createPortal(
    <div className={`wt${minimized ? ' wt--min' : ''}`}>
      {!minimized && <span className="wt__tape" />}

      <button
        className="wt__min"
        onClick={() => setMinimized((m) => !m)}
        aria-label={minimized ? 'Show walkthrough' : 'Hide walkthrough'}
      >
        {minimized ? '+' : '\u2013'}
      </button>

      <button className="wt__pill" onClick={() => setMinimized(false)}>
        Watch the walkthrough
      </button>

      <div className="wt__frame">
        {src ? (
          <>
            <video
              ref={videoRef}
              src={src}
              poster={poster}
              preload="metadata"
              controls={playing}
              playsInline
              onEnded={() => setPlaying(false)}
            />
            {!playing && (
              <button className="wt__play" onClick={play} aria-label="Play walkthrough">
                <i />
              </button>
            )}
          </>
        ) : (
          <div className="wt__ph">
            <b>60-second walkthrough</b>
            <span>Video coming soon</span>
          </div>
        )}
      </div>

      <div className="wt__cap">a quick tour, from me</div>
    </div>,
    document.body
  )
}
