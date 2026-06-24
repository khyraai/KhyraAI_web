import { useCallback, useEffect, useRef, useState } from "react";
import { X, RotateCcw } from "lucide-react";

// ─────────────────────────── Config (mirrors product_demo_voice/src/config.py) ─────

export const DEMO_ROLES = [
  {
    id: "front_desk",
    label: "Front Desk",
    description: "Reception & appointment management",
    domains: [
      { id: "dental_clinic", label: "Dental Clinic" },
      { id: "veterinary_clinic", label: "Veterinary Clinic" },
      { id: "spa_salon", label: "Spa & Salon" },
      { id: "therapist_clinic", label: "Therapist & Wellness" },
      { id: "hotel_resort", label: "Hotel & Resort" },
      { id: "cosmetic_clinic", label: "Cosmetic Clinic" },
      { id: "general_clinic", label: "General Clinic" },
    ],
  },
  {
    id: "lead_followup",
    label: "Lead Follow-Up",
    description: "Consultative outbound sales",
    domains: [
      { id: "ai_voice_services", label: "AI Voice Services" },
      { id: "real_estate", label: "Real Estate" },
      { id: "it_projects", label: "IT Projects" },
    ],
  },
  {
    id: "support_line",
    label: "Support Line",
    description: "Enterprise technical support desk",
    domains: [
      { id: "devops_support", label: "DevOps Support" },
      { id: "access_management_support", label: "Access Management" },
      { id: "saas_product_support", label: "SaaS Product Support" },
    ],
  },
] as const;

export const DEMO_LANGUAGES = [
  { code: "en-IN", label: "English" },
  { code: "hi-IN", label: "Hindi" },
  { code: "kn-IN", label: "Kannada" },
  { code: "ta-IN", label: "Tamil" },
  { code: "te-IN", label: "Telugu" },
  { code: "ml-IN", label: "Malayalam" },
  { code: "bn-IN", label: "Bengali" },
  { code: "gu-IN", label: "Gujarati" },
  { code: "mr-IN", label: "Marathi" },
  { code: "pa-IN", label: "Punjabi" },
  { code: "od-IN", label: "Odia" },
] as const;

export const DEMO_VOICES = [
  { id: "voice_1", label: "Simran", gender: "Female" },
  { id: "voice_2", label: "Kavya", gender: "Female" },
  { id: "voice_3", label: "Neha", gender: "Female" },
  { id: "voice_4", label: "Priya", gender: "Female" },
  { id: "voice_5", label: "Pooja", gender: "Female" },
  { id: "voice_6", label: "Rahul", gender: "Male" },
  { id: "voice_7", label: "Rohan", gender: "Male" },
  { id: "voice_8", label: "Aditya", gender: "Male" },
  { id: "voice_9", label: "Amit", gender: "Male" },
  { id: "voice_10", label: "Ratan", gender: "Male" },
] as const;

// ─────────────────────────── Types ───────────────────────────────────────────

export interface DemoConfig {
  roleId: string;
  domainId: string;
  languageCode: string;
  voiceId: string;
  voiceLabel: string;
}

export type SessionState = "connecting" | "idle" | "listening" | "thinking" | "speaking" | "error" | "ended";

export interface Message {
  role: "user" | "agent";
  text: string;
}

// ─────────────────────────── Siri-style orb (canvas) ─────────────────────────

export type OrbState = "connecting" | "idle" | "listening" | "thinking" | "speaking";

const ORB_PALETTES: Record<OrbState, string[]> = {
  connecting: ["#2d6a4f", "#52b788", "#74c69d", "#40916c"],
  idle: ["#1f4a3f", "#2d6a4f", "#40916c", "#52b788"],
  listening: ["#40916c", "#52b788", "#74c69d", "#95d5b2"],
  thinking: ["#1f4a3f", "#2d6a4f", "#40916c", "#52b788"],
  speaking: ["#52b788", "#1f4a3f", "#40916c", "#74c69d"],
};

export function SiriOrb({ state, size = 240, volumeRef }: { state: OrbState; size?: number; volumeRef?: { current: number } }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animRef = useRef<number>(0);
  const stateRef = useRef<OrbState>(state);

  useEffect(() => { stateRef.current = state; }, [state]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const W = 400; // fixed internal resolution — blobs never clip
    const H = 400;
    const cx = 200;
    const cy = 200;
    const sc = 1;   // draw at natural scale; CSS handles visual sizing
    let smoothVol = 0;

    function drawBlob(
      x: number, y: number, r: number,
      color: string, alpha: number, blur: number,
    ) {
      ctx!.save();
      ctx!.globalAlpha = alpha;
      ctx!.filter = `blur(${blur}px)`;
      const g = ctx!.createRadialGradient(x, y, 0, x, y, r);
      g.addColorStop(0, color);
      g.addColorStop(1, "rgba(0,0,0,0)");
      ctx!.fillStyle = g;
      ctx!.beginPath();
      ctx!.arc(x, y, r, 0, Math.PI * 2);
      ctx!.fill();
      ctx!.restore();
    }

    const animate = (ts: number) => {
      ctx.clearRect(0, 0, W, H);

      // Voice-reactive volume — EMA-smoothed so there are no jittery jumps
      const rawVol = volumeRef?.current ?? 0;
      smoothVol = smoothVol * 0.88 + rawVol * 0.12;
      const normVol = Math.min(1, Math.max(0, (smoothVol - 0.01) / 0.14));

      const s = stateRef.current;
      const speed = s === "speaking" ? 1.8 : s === "listening" ? 1.4 : s === "thinking" ? 1.0 : 0.45;
      const t = ts * 0.001 * speed;
      const colors = ORB_PALETTES[s];
      const volBoost = s === "listening" ? normVol * 48 : 0;
      const spread = (s === "speaking" ? 95 : s === "listening" ? 82 : s === "thinking" ? 68 : 55) + volBoost;
      const alpha = s === "idle" || s === "connecting" ? 0.60 : 0.76 + (s === "listening" ? normVol * 0.14 : 0);

      // Subtle wobble movement when user speaks
      const wobble = s === "listening" ? normVol * 9 : 0;
      const wobX = cx + Math.sin(ts * 0.0037) * wobble;
      const wobY = cy + Math.cos(ts * 0.0029) * wobble;

      // Rotating coloured blobs
      for (let i = 0; i < colors.length; i++) {
        const phase = (i * Math.PI * 2) / colors.length;
        const angle = t * (0.6 + i * 0.28) + phase;
        const dist = spread + Math.sin(t * (1.1 + i * 0.35) + i * 1.3) * (spread * 0.32);
        const bx = wobX + Math.cos(angle) * dist;
        const by = wobY + Math.sin(angle * 0.88 + i * 0.18) * dist;
        const br = 118 + Math.sin(t * (1.2 + i * 0.45) + i) * 32 + volBoost * 0.5;
        drawBlob(bx, by, br, colors[i], alpha, 32);
      }

      // Soft diffuse centre glow — no harsh dot
      const pulse = Math.sin(t * 2.5) * 12;
      const coreR = (s === "speaking" ? 115 : s === "listening" ? 98 : 82) + pulse + volBoost * 0.6;
      const cg = ctx.createRadialGradient(wobX, wobY, 0, wobX, wobY, coreR);
      cg.addColorStop(0, "rgba(255,255,255,0.15)");
      cg.addColorStop(0.3, colors[0] + "44");
      cg.addColorStop(1, "rgba(0,0,0,0)");
      ctx.save();
      ctx.filter = "blur(28px)";
      ctx.fillStyle = cg;
      ctx.beginPath();
      ctx.arc(wobX, wobY, coreR, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();

      animRef.current = requestAnimationFrame(animate);
    };

    animRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animRef.current);
  }, []);

  return (
    <canvas
      ref={canvasRef}
      width={400}
      height={400}
      className="select-none rounded-full"
      style={{ width: size, height: size }}
    />
  );
}

// ─────────────────────────── Audio helpers ───────────────────────────────────

export function float32ToInt16(float32: Float32Array<ArrayBufferLike>): ArrayBuffer {
  const out = new Int16Array(float32.length);
  for (let i = 0; i < float32.length; i++) {
    out[i] = Math.max(-32768, Math.min(32767, Math.round(float32[i] * 32767)));
  }
  return out.buffer;
}

export function int16ToFloat32(buf: ArrayBuffer): Float32Array<ArrayBuffer> {
  const i16 = new Int16Array(buf);
  const f32 = new Float32Array(i16.length);
  for (let i = 0; i < i16.length; i++) f32[i] = i16[i] / 32768;
  return f32;
}

// ─────────────────────────── LiveDemoModal ───────────────────────────────────

export const WS_URL: string =
  (import.meta.env as Record<string, string>).VITE_DEMO_WS_URL ?? "ws://localhost:8000/ws";

// ─────────────────────────── VAD constants ───────────────────────────────────
const SILENCE_MS = 1500;          // ms of silence after speech → flush
const RMS_THRESHOLD = 0.025;         // RMS level to classify as speech
const MIN_SPEECH_MS = 400;           // discard clips shorter than this
const BUFFER_CAP_BYTES = 5 * 16_000 * 2; // force-flush after 5 s of audio

export function useLiveDemoSession(config: DemoConfig, active: boolean) {
  const [sessionState, setSessionState] = useState<SessionState>("connecting");
  const [errorMsg, setErrorMsg] = useState("");

  const sessionStateRef = useRef<SessionState>("connecting");
  const wsRef = useRef<WebSocket | null>(null);
  const playbackCtxRef = useRef<AudioContext | null>(null);
  const nextPlayTimeRef = useRef<number>(0);
  const recordCtxRef = useRef<AudioContext | null>(null);
  const processorRef = useRef<ScriptProcessorNode | null>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const configRef = useRef(config);
  const aiSpeakingRef = useRef<boolean>(false);
  const speechStartedRef = useRef<boolean>(false);
  const silenceTimerRef = useRef<number | null>(null);
  const audioBufferRef = useRef<ArrayBuffer[]>([]);
  const bufferBytesRef = useRef<number>(0);
  const micVolumeRef = useRef<number>(0);

  // Update configRef if config changes (though usually active is false when config changes)
  useEffect(() => {
    configRef.current = config;
  }, [config]);

  const setState = useCallback((s: SessionState) => {
    sessionStateRef.current = s;
    setSessionState(s);
  }, []);

  // ── PCM playback ────────────────────────────────────────────────────────────
  const playChunk = useCallback((buf: ArrayBuffer) => {
    if (!playbackCtxRef.current || playbackCtxRef.current.state === "closed") {
      playbackCtxRef.current = new AudioContext({ sampleRate: 16000 });
      nextPlayTimeRef.current = 0;
    }
    const ctx = playbackCtxRef.current;
    const f32 = int16ToFloat32(buf);
    const abuf = ctx.createBuffer(1, f32.length, 16000);
    abuf.copyToChannel(f32, 0);
    const src = ctx.createBufferSource();
    src.buffer = abuf;
    src.connect(ctx.destination);
    const now = ctx.currentTime;
    const start = Math.max(now, nextPlayTimeRef.current);
    src.start(start);
    nextPlayTimeRef.current = start + abuf.duration;
  }, []);

  // ── VAD helpers ─────────────────────────────────────────────────────────────
  const cleanupMic = useCallback(() => {
    if (silenceTimerRef.current !== null) {
      clearTimeout(silenceTimerRef.current);
      silenceTimerRef.current = null;
    }
    processorRef.current?.disconnect();
    processorRef.current = null;
    recordCtxRef.current?.close().catch(() => { });
    recordCtxRef.current = null;
    streamRef.current?.getTracks().forEach((t) => t.stop());
    streamRef.current = null;
  }, []);

  const startListening = useCallback(() => {
    speechStartedRef.current = false;
    audioBufferRef.current = [];
    bufferBytesRef.current = 0;
    if (silenceTimerRef.current !== null) {
      clearTimeout(silenceTimerRef.current);
      silenceTimerRef.current = null;
    }
    setState("listening");
  }, [setState]);

  const stopListening = useCallback(() => {
    if (silenceTimerRef.current !== null) {
      clearTimeout(silenceTimerRef.current);
      silenceTimerRef.current = null;
    }
    speechStartedRef.current = false;
    audioBufferRef.current = [];
    bufferBytesRef.current = 0;
  }, []);

  const flushAudio = useCallback(() => {
    const buffers = audioBufferRef.current;
    if (!speechStartedRef.current || buffers.length === 0) return;
    const totalBytes = buffers.reduce((s, b) => s + b.byteLength, 0);
    const durationMs = (totalBytes / 2 / 16_000) * 1000;
    speechStartedRef.current = false;
    audioBufferRef.current = [];
    bufferBytesRef.current = 0;
    if (durationMs < MIN_SPEECH_MS) return;
    setState("thinking");
    const ws = wsRef.current;
    if (ws?.readyState === WebSocket.OPEN) {
      for (const buf of buffers) ws.send(buf);
      ws.send(JSON.stringify({ type: "audio_end" }));
    }
  }, [setState]);

  const startMic = useCallback(async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        audio: { channelCount: 1, echoCancellation: true, noiseSuppression: true, autoGainControl: true },
        video: false,
      });
      streamRef.current = stream;
      const ctx = new AudioContext({ sampleRate: 16_000 });
      recordCtxRef.current = ctx;
      if (ctx.state === "suspended") await ctx.resume();
      const source = ctx.createMediaStreamSource(stream);
      // eslint-disable-next-line @typescript-eslint/no-deprecated
      const processor = ctx.createScriptProcessor(2048, 1, 1);
      processorRef.current = processor;
      processor.onaudioprocess = (e) => {
        if (aiSpeakingRef.current) { micVolumeRef.current = 0; return; }
        const floats = e.inputBuffer.getChannelData(0);
        let sum = 0;
        for (let i = 0; i < floats.length; i++) sum += floats[i] * floats[i];
        const rms = Math.sqrt(sum / floats.length);
        micVolumeRef.current = rms;
        const isSpeech = rms > RMS_THRESHOLD;
        const pcm = new Int16Array(floats.length);
        for (let i = 0; i < floats.length; i++)
          pcm[i] = Math.max(-32768, Math.min(32767, Math.round(floats[i] * 32767)));
        if (isSpeech) {
          speechStartedRef.current = true;
          if (silenceTimerRef.current !== null) {
            clearTimeout(silenceTimerRef.current);
            silenceTimerRef.current = null;
          }
          audioBufferRef.current.push(pcm.buffer.slice(0));
          bufferBytesRef.current += pcm.buffer.byteLength;
          if (bufferBytesRef.current >= BUFFER_CAP_BYTES) flushAudio();
        } else if (speechStartedRef.current && silenceTimerRef.current === null) {
          silenceTimerRef.current = window.setTimeout(() => {
            silenceTimerRef.current = null;
            if (speechStartedRef.current && !aiSpeakingRef.current) flushAudio();
          }, SILENCE_MS);
        }
      };
      source.connect(processor);
      processor.connect(ctx.destination);
      startListening();
    } catch {
      setErrorMsg("Microphone access denied.");
      setState("error");
    }
  }, [setState, startListening, flushAudio]);

  // ── WebSocket lifecycle ──────────────────────────────────────────────────────
  useEffect(() => {
    if (!active) return;
    const cfg = configRef.current;
    const ws = new WebSocket(WS_URL);
    ws.binaryType = "arraybuffer";
    wsRef.current = ws;

    ws.onopen = () => {
      ws.send(
        JSON.stringify({
          type: "init",
          role: cfg.roleId,
          domain: cfg.domainId,
          language: cfg.languageCode,
          voice_id: cfg.voiceId,
        }),
      );
    };

    ws.onmessage = (evt) => {
      if (evt.data instanceof ArrayBuffer) {
        playChunk(evt.data);
        if (sessionStateRef.current !== "speaking") setState("speaking");
        return;
      }

      let data: { type: string; text?: string; message?: string };
      try { data = JSON.parse(evt.data as string); }
      catch { return; }

      switch (data.type) {
        case "ready":
          startMic();
          break;
        case "response_text":
          aiSpeakingRef.current = true;
          stopListening();
          setState("speaking");
          break;
        case "audio_end":
          nextPlayTimeRef.current = 0;
          aiSpeakingRef.current = false;
          startListening();
          break;
        case "error":
          setErrorMsg(data.message ?? "Unknown error");
          setState("error");
          break;
      }
    };

    ws.onerror = () => {
      setErrorMsg("Cannot reach demo server. Make sure it is running.");
      setState("error");
    };

    ws.onclose = () => {
      if (sessionStateRef.current !== "error") setState("ended");
    };

    return () => {
      ws.close();
      cleanupMic();
      playbackCtxRef.current?.close().catch(() => { });
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [active]);

  const endConversation = useCallback(() => {
    wsRef.current?.close();
    cleanupMic();
    playbackCtxRef.current?.close().catch(() => { });
    setState("ended");
    setTimeout(() => {
      sessionStateRef.current = "connecting";
      setSessionState("connecting");
      setErrorMsg("");
    }, 520);
  }, [cleanupMic, setState]);

  // ── Derived orb state ───────────────────────────────────────────────────────
  const orbState: OrbState = (() => {
    if (sessionState === "listening") return "listening";
    if (sessionState === "thinking") return "thinking";
    if (sessionState === "speaking") return "speaking";
    if (sessionState === "connecting") return "connecting";
    return "idle";
  })();

  const statusLabel = {
    connecting: "Connecting…",
    idle: "Ready — just speak",
    listening: "Listening…",
    thinking: "Thinking…",
    speaking: "Speaking…",
    error: errorMsg || "Error",
    ended: "Session ended",
  }[sessionState];

  return {
    sessionState,
    orbState,
    statusLabel,
    errorMsg,
    micVolumeRef,
    endConversation,
  };
}

