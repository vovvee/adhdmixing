import { Pause, Play, Volume2 } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'

type Props = { title: string; before: string; after: string }
type Mode = 'before' | 'after'

const format = (seconds: number) => `${Math.floor(seconds / 60)}:${String(Math.floor(seconds % 60)).padStart(2, '0')}`

export function AudioComparison({ title, before, after }: Props) {
  const audio = useRef<HTMLAudioElement>(null)
  const [mode, setMode] = useState<Mode>('after')
  const [playing, setPlaying] = useState(false)
  const [current, setCurrent] = useState(0)
  const [duration, setDuration] = useState(0)
  const [volume, setVolume] = useState(0.85)

  useEffect(() => { setPlaying(false); setCurrent(0); setDuration(0) }, [mode])
  useEffect(() => { if (audio.current) audio.current.volume = volume }, [volume])
  const toggle = () => { if (!audio.current) return; playing ? audio.current.pause() : audio.current.play().catch(() => undefined) }
  const changeMode = (next: Mode) => { if (next === mode) return; const wasPlaying = playing; setMode(next); requestAnimationFrame(() => { if (wasPlaying) audio.current?.play().catch(() => undefined) }) }
  const seek = (value: number) => { if (audio.current) audio.current.currentTime = value; setCurrent(value) }
  const file = mode === 'before' ? before : after
  const source = `${import.meta.env.BASE_URL}${file.replace(/^\//, '')}`
  return <div className="audio-box">
    <div className="audio-tabs" role="group" aria-label={`Compare ${title} versions`}>
      <button className={mode === 'after' ? 'active' : ''} onClick={() => changeMode('after')}>AFTER</button>
      <button className={mode === 'before' ? 'active' : ''} onClick={() => changeMode('before')}>BEFORE</button>
    </div>
    <audio ref={audio} key={source} src={source} preload="none"
      onPlay={() => setPlaying(true)} onPause={() => setPlaying(false)} onEnded={() => setPlaying(false)}
      onTimeUpdate={(e) => setCurrent(e.currentTarget.currentTime)} onLoadedMetadata={(e) => setDuration(e.currentTarget.duration)} />
    <div className="audio-row">
      <button className="play" onClick={toggle} aria-label={playing ? `Pause ${mode} version` : `Play ${mode} version`}>{playing ? <Pause size={16} fill="currentColor" /> : <Play size={16} fill="currentColor" />}</button>
      <span className="timer">{format(current)} / {duration ? format(duration) : '--:--'}</span>
      <input className="progress" aria-label="Audio progress" type="range" min="0" max={duration || 0} value={current} step="0.01" onChange={(e) => seek(Number(e.target.value))} />
      <label className="volume"><Volume2 size={15} /><input aria-label="Volume" type="range" min="0" max="1" step="0.05" value={volume} onChange={(e) => setVolume(Number(e.target.value))} /></label>
    </div>
  </div>
}
