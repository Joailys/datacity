import React, { useState, useEffect } from 'react';
import { Play, Pause, RotateCcw, Calendar } from 'lucide-react';

interface TimeSliderProps {
  onDateRangeChange: (progressRatio: number) => void;
}

export const TimeSlider: React.FC<TimeSliderProps> = ({ onDateRangeChange }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(100);

  useEffect(() => {
    let interval: any = null;
    if (isPlaying) {
      interval = setInterval(() => {
        setProgress((prev) => {
          if (prev >= 100) {
            setIsPlaying(false);
            return 100;
          }
          const next = prev + 5;
          onDateRangeChange(next / 100);
          return next;
        });
      }, 300);
    } else {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [isPlaying, onDateRangeChange]);

  const handleSliderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = Number(e.target.value);
    setProgress(val);
    onDateRangeChange(val / 100);
  };

  const handleReset = () => {
    setIsPlaying(false);
    setProgress(100);
    onDateRangeChange(1.0);
  };

  return (
    <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-40 w-full max-w-xl px-4 pointer-events-auto">
      <div className="bg-white/90 border border-amber-200/90 rounded-2xl p-3 shadow-xl backdrop-blur-xl flex items-center gap-3">
        {/* Play/Pause Button */}
        <button
          onClick={() => {
            if (progress >= 100) setProgress(0);
            setIsPlaying(!isPlaying);
          }}
          className="p-2 rounded-xl bg-orange-600 text-white font-bold hover:brightness-110 active:scale-95 transition-all flex-shrink-0 shadow-md shadow-orange-500/20"
        >
          {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4 fill-current" />}
        </button>

        {/* Reset Button */}
        <button
          onClick={handleReset}
          title="Réinitialiser au présent"
          className="p-2 rounded-xl bg-amber-100/80 text-amber-900 hover:bg-amber-200 transition-colors flex-shrink-0"
        >
          <RotateCcw className="w-4 h-4" />
        </button>

        <div className="h-6 w-px bg-amber-200 flex-shrink-0" />

        {/* Time Slider Bar */}
        <div className="flex-1 space-y-1">
          <div className="flex items-center justify-between text-[11px] font-bold text-slate-800">
            <span className="flex items-center gap-1">
              <Calendar className="w-3 h-3 text-orange-600" />
              Time Travel SEO
            </span>
            <span className="font-mono text-orange-700 font-extrabold">
              {progress === 100 ? 'Aujourd\'hui (Direct)' : `J-${Math.round((1 - progress / 100) * 28)}d`}
            </span>
          </div>

          <input
            type="range"
            min="0"
            max="100"
            value={progress}
            onChange={handleSliderChange}
            className="w-full h-1.5 bg-amber-100 rounded-lg appearance-none cursor-pointer accent-orange-600"
          />
        </div>
      </div>
    </div>
  );
};
