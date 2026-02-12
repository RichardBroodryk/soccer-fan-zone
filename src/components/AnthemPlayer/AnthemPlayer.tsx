import { useEffect, useRef, useState } from "react";
import styles from "./AnthemPlayer.module.css";

/**
 * Global audio guard
 * Ensures only ONE anthem plays at a time
 */
let activeAudio: HTMLAudioElement | null = null;

type AnthemPlayerProps = {
  src: string;
  label?: string;
  accentColor?: string;
};

export default function AnthemPlayer({
  src,
  label = "Anthem Audio",
  accentColor = "#111111",
}: AnthemPlayerProps) {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);

  /* ---------- setup ---------- */
  useEffect(() => {
    const audio = new Audio(src);
    audioRef.current = audio;

    const onTimeUpdate = () => setCurrentTime(audio.currentTime);
    const onLoaded = () => setDuration(audio.duration || 0);
    const onEnded = () => setIsPlaying(false);

    audio.addEventListener("timeupdate", onTimeUpdate);
    audio.addEventListener("loadedmetadata", onLoaded);
    audio.addEventListener("ended", onEnded);

    return () => {
      audio.pause();
      audio.src = "";
      audio.removeEventListener("timeupdate", onTimeUpdate);
      audio.removeEventListener("loadedmetadata", onLoaded);
      audio.removeEventListener("ended", onEnded);

      if (activeAudio === audio) {
        activeAudio = null;
      }
    };
  }, [src]);

  /* ---------- controls ---------- */
  const play = () => {
    if (!audioRef.current) return;

    if (activeAudio && activeAudio !== audioRef.current) {
      activeAudio.pause();
    }

    activeAudio = audioRef.current;
    audioRef.current.play();
    setIsPlaying(true);
  };

  const pause = () => {
    audioRef.current?.pause();
    setIsPlaying(false);
  };

  const stop = () => {
    if (!audioRef.current) return;
    audioRef.current.pause();
    audioRef.current.currentTime = 0;
    setIsPlaying(false);
    setCurrentTime(0);
  };

  /* ---------- helpers ---------- */
  const formatTime = (t: number) => {
    const m = Math.floor(t / 60);
    const s = Math.floor(t % 60)
      .toString()
      .padStart(2, "0");
    return `${m}:${s}`;
  };

  const progress =
    duration > 0 ? (currentTime / duration) * 100 : 0;

  return (
    <div
      className={styles.player}
      style={{ borderColor: accentColor }}
    >
      <h3 className={styles.label}>{label}</h3>

      <div className={styles.controls}>
        {!isPlaying ? (
          <button onClick={play}>Play anthem</button>
        ) : (
          <button onClick={pause}>Pause</button>
        )}
        <button onClick={stop}>Stop</button>
      </div>

      <div className={styles.progressWrap}>
        <div
          className={styles.progress}
          style={{
            width: `${progress}%`,
            backgroundColor: accentColor,
          }}
        />
      </div>

      <div className={styles.time}>
        {formatTime(currentTime)} / {formatTime(duration)}
      </div>
    </div>
  );
}
