import { useCallback, useEffect, useRef, useState } from "react";

// ─────────────────────────── Config ─────────────────────────────────────────

export const DEMO_ROLES = [
  {
    id: "support_line",
    label: "Customer Support & Operations",
    description: "Enterprise operational support & ticket resolution",
    domains: [
      { id: "saas_product_support", label: "Business Operations & SaaS" },
      { id: "access_management_support", label: "Account & Access Services" },
      { id: "devops_support", label: "Technical Operations Support" },
    ],
  },
  {
    id: "lead_followup",
    label: "Lead Qualification & Sales",
    description: "Inbound qualification, prospect scoring & meeting booking",
    domains: [
      { id: "real_estate", label: "Commercial & Residential Property" },
      { id: "it_projects", label: "Enterprise Technology Projects" },
      { id: "ai_voice_services", label: "Operational AI Services" },
    ],
  },
  {
    id: "front_desk",
    label: "Front Desk & Coordination",
    description: "Inbound call triage, appointment coordination & reception",
    domains: [
      { id: "general_clinic", label: "Medical & Healthcare Center" },
      { id: "hotel_resort", label: "Hotels & Hospitality" },
      { id: "dental_clinic", label: "Dental Clinic" },
      { id: "veterinary_clinic", label: "Veterinary Clinic" },
      { id: "spa_salon", label: "Spa & Wellness" },
      { id: "cosmetic_clinic", label: "Aesthetic Clinic" },
      { id: "therapist_clinic", label: "Consultation & Therapy" },
    ],
  },
] as const;

export const DEMO_LANGUAGES = [
  { code: "en", label: "English (Global)" },
  { code: "en-US", label: "English (US)" },
  { code: "en-GB", label: "English (UK)" },
] as const;

export const DEMO_VOICES = [
  { id: "voice_1", label: "Voice 01 (Professional)", gender: "Female" },
  { id: "voice_2", label: "Voice 02 (Warm)", gender: "Female" },
  { id: "voice_3", label: "Voice 03 (Direct)", gender: "Female" },
  { id: "voice_4", label: "Voice 04 (Balanced)", gender: "Female" },
  { id: "voice_5", label: "Voice 05 (Calm)", gender: "Female" },
  { id: "voice_6", label: "Voice 06 (Executive)", gender: "Male" },
  { id: "voice_7", label: "Voice 07 (Warm)", gender: "Male" },
  { id: "voice_8", label: "Voice 08 (Neutral)", gender: "Male" },
  { id: "voice_9", label: "Voice 09 (Authoritative)", gender: "Male" },
  { id: "voice_10", label: "Voice 10 (Conversational)", gender: "Male" },
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

    const W = 400;
    const H = 400;
    const cx = 200;
    const cy = 200;
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

      const rawVol = volumeRef?.current ?? 0;
      smoothVol = smoothVol * 0.88 + rawVol * 0.12;
      const normVol = Math.min(1, Math.max(0, (smoothVol - 0.01) / 0.14));

      const s = stateRef.current;
      const speed = s === "speaking" ? 1.8 : s === "listening" ? 1.4 : s === "thinking" ? 1.0 : 0.45;
      const t = ts * 0.001 * speed;
      const colors = ORB_PALETTES[s] || ORB_PALETTES.idle;
      const volBoost = s === "listening" ? normVol * 48 : 0;
      const spread = (s === "speaking" ? 95 : s === "listening" ? 82 : s === "thinking" ? 68 : 55) + volBoost;
      const alpha = s === "idle" || s === "connecting" ? 0.60 : 0.76 + (s === "listening" ? normVol * 0.14 : 0);

      const wobble = s === "listening" ? normVol * 9 : 0;
      const wobX = cx + Math.sin(ts * 0.0037) * wobble;
      const wobY = cy + Math.cos(ts * 0.0029) * wobble;

      for (let i = 0; i < colors.length; i++) {
        const phase = (i * Math.PI * 2) / colors.length;
        const angle = t * (0.6 + i * 0.28) + phase;
        const dist = spread + Math.sin(t * (1.1 + i * 0.35) + i * 1.3) * (spread * 0.32);
        const bx = wobX + Math.cos(angle) * dist;
        const by = wobY + Math.sin(angle * 0.88 + i * 0.18) * dist;
        const br = 118 + Math.sin(t * (1.2 + i * 0.45) + i) * 32 + volBoost * 0.5;
        drawBlob(bx, by, br, colors[i], alpha, 32);
      }

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

// ─────────────────────────── WebSocket URL & VAD ─────────────────────────────

export const WS_URL: string =
  (import.meta.env as Record<string, string>).VITE_DEMO_WS_URL ?? "ws://localhost:8000/ws";

const SILENCE_MS = 1500;
const RMS_THRESHOLD = 0.025;
const MIN_SPEECH_MS = 400;
const BUFFER_CAP_BYTES = 5 * 16_000 * 2;

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
  const connectTimeoutRef = useRef<number | null>(null);

  useEffect(() => {
    configRef.current = config;
  }, [config]);

  const setState = useCallback((s: SessionState) => {
    sessionStateRef.current = s;
    setSessionState(s);
  }, []);

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
      setErrorMsg("Microphone access denied or unavailable.");
      setState("error");
    }
  }, [setState, startListening, flushAudio]);

  // ── WebSocket lifecycle with timeout guard ──────────────────────────────────
  useEffect(() => {
    if (!active) return;
    const cfg = configRef.current;
    setState("connecting");
    setErrorMsg("");

    let ws: WebSocket;
    try {
      ws = new WebSocket(WS_URL);
      ws.binaryType = "arraybuffer";
      wsRef.current = ws;
    } catch {
      setErrorMsg("Live voice streaming unavailable.");
      setState("error");
      return;
    }

    // 5.5 second connection timeout guard so the user is never stuck in infinite connecting state
    connectTimeoutRef.current = window.setTimeout(() => {
      if (sessionStateRef.current === "connecting") {
        setErrorMsg("Live voice connection timed out. You can explore the workflow execution pipeline below.");
        setState("error");
        try { ws.close(); } catch { }
      }
    }, 5500);

    ws.onopen = () => {
      if (connectTimeoutRef.current) {
        clearTimeout(connectTimeoutRef.current);
        connectTimeoutRef.current = null;
      }
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
          setErrorMsg(data.message ?? "Operational session error");
          setState("error");
          break;
      }
    };

    ws.onerror = () => {
      if (connectTimeoutRef.current) {
        clearTimeout(connectTimeoutRef.current);
        connectTimeoutRef.current = null;
      }
      setErrorMsg("Live voice streaming server unavailable.");
      setState("error");
    };

    ws.onclose = () => {
      if (connectTimeoutRef.current) {
        clearTimeout(connectTimeoutRef.current);
        connectTimeoutRef.current = null;
      }
      if (sessionStateRef.current !== "error") setState("ended");
    };

    return () => {
      if (connectTimeoutRef.current) {
        clearTimeout(connectTimeoutRef.current);
        connectTimeoutRef.current = null;
      }
      try { ws.close(); } catch { }
      cleanupMic();
      playbackCtxRef.current?.close().catch(() => { });
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [active]);

  const endConversation = useCallback(() => {
    if (connectTimeoutRef.current) {
      clearTimeout(connectTimeoutRef.current);
      connectTimeoutRef.current = null;
    }
    wsRef.current?.close();
    cleanupMic();
    playbackCtxRef.current?.close().catch(() => { });
    setState("ended");
    setTimeout(() => {
      sessionStateRef.current = "connecting";
      setSessionState("connecting");
      setErrorMsg("");
    }, 500);
  }, [cleanupMic, setState]);

  const orbState: OrbState = (() => {
    if (sessionState === "listening") return "listening";
    if (sessionState === "thinking") return "thinking";
    if (sessionState === "speaking") return "speaking";
    if (sessionState === "connecting") return "connecting";
    return "idle";
  })();

  const statusLabel = {
    connecting: "Connecting to operational engine…",
    idle: "Ready — speak naturally",
    listening: "Listening…",
    thinking: "Evaluating business logic…",
    speaking: "Executing response…",
    error: errorMsg || "Session unavailable",
    ended: "Session completed",
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
