"use client";

import { useEffect, useRef, useState } from "react";
import { Pause, Play, SkipBack, SkipForward, Volume2, VolumeX } from "lucide-react";
import Waveform from "./Waveform";

export default function MusicPlayer({
  title = "WHAT IS THE EXTIMATE",
  artist = "DJ Extimate feat. Idowest",
  audioUrl,
  duration = "03:42",
}: {
  title?: string;
  artist?: string;
  audioUrl?: string | null;
  duration?: string;
}) {
  const [playing, setPlaying] = useState(false);
  const [muted, setMuted] = useState(false);
  const [elapsed, setElapsed] = useState("00:00");
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    const onTime = () => {
      const m = Math.floor(audio.currentTime / 60)
        .toString()
        .padStart(2, "0");
      const s = Math.floor(audio.currentTime % 60)
        .toString()
        .padStart(2, "0");
      setElapsed(`${m}:${s}`);
    };
    audio.addEventListener("timeupdate", onTime);
    audio.addEventListener("ended", () => setPlaying(false));
    return () => audio.removeEventListener("timeupdate", onTime);
  }, []);

  function toggle() {
    if (!audioUrl) {
      // No audio file wired up yet — reflect state visually only.
      setPlaying((v) => !v);
      return;
    }
    const audio = audioRef.current;
    if (!audio) return;
    if (playing) {
      audio.pause();
    } else {
      audio.play().catch(() => {});
    }
    setPlaying((v) => !v);
  }

  return (
    <div className="sticky top-20 z-40 border-y border-line bg-surface/95 backdrop-blur-md">
      <div className="shell flex h-[72px] items-center gap-4 md:gap-6">
        {audioUrl && <audio ref={audioRef} src={audioUrl} muted={muted} />}

        <div className="flex min-w-0 items-center gap-3 md:w-64">
          <div className="grid h-11 w-11 shrink-0 place-items-center rounded-lg bg-ember-sweep">
            <span className="font-display text-lg text-ink">E</span>
          </div>
          <div className="min-w-0">
            <p className="truncate font-body text-[13px] font-medium text-bone">{title}</p>
            <p className="truncate font-mono text-[11px] uppercase tracking-wide text-stone">
              {artist}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3 md:gap-4 shrink-0">
          <button className="text-bone/50 hover:text-bone transition-colors hidden sm:block" aria-label="Previous track">
            <SkipBack size={16} />
          </button>
          <button
            onClick={toggle}
            aria-label={playing ? "Pause" : "Play"}
            className="grid h-10 w-10 place-items-center rounded-full bg-ember text-ink transition-transform duration-200 hover:scale-105 active:scale-95"
          >
            {playing ? <Pause size={16} fill="currentColor" /> : <Play size={16} fill="currentColor" className="ml-0.5" />}
          </button>
          <button className="text-bone/50 hover:text-bone transition-colors hidden sm:block" aria-label="Next track">
            <SkipForward size={16} />
          </button>
        </div>

        <div className="hidden md:flex flex-1 items-center gap-3 min-w-0">
          <Waveform bars={46} active={playing} color="#FF5A1F" className="w-full" />
        </div>

        <span className="hidden sm:block shrink-0 font-mono text-[11px] tabular-nums text-stone">
          {elapsed} / {duration}
        </span>

        <button
          onClick={() => setMuted((v) => !v)}
          className="shrink-0 text-bone/50 hover:text-bone transition-colors"
          aria-label={muted ? "Unmute" : "Mute"}
        >
          {muted ? <VolumeX size={17} /> : <Volume2 size={17} />}
        </button>
      </div>
    </div>
  );
}
