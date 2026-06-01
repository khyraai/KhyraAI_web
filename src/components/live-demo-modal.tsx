import { useCallback, useEffect, useRef, useState } from "react";
import { X, Mic, MicOff, RotateCcw } from "lucide-react";

// ─────────────────────────── Config (mirrors product_demo_voice/src/config.py) ─────

export const DEMO_ROLES = [
  {
    id: "front_desk",
    label: "Front Desk",
    description: "Reception & appointment management",
    domains: [
      { id: "dental_clinic",        label: "Dental Clinic"        },
      { id: "veterinary_clinic",    label: "Veterinary Clinic"    },
      { id: "spa_salon",            label: "Spa & Salon"          },
      { id: "therapist_clinic",     label: "Therapist & Wellness" },
      { id: "hotel_resort",         label: "Hotel & Resort"       },
      { id: "cosmetic_clinic",      label: "Cosmetic Clinic"      },
      { id: "general_clinic",       label: "General Clinic"       },
    ],
  },
  {
    id: "lead_followup",
    label: "Lead Follow-Up",
    description: "Consultative outbound sales",
    domains: [
      { id: "ai_voice_services",    label: "AI Voice Services"    },
      { id: "real_estate",          label: "Real Estate"          },
      { id: "it_projects",          label: "IT Projects"          },
    ],
  },
  {
    id: "support_line",
    label: "Support Line",
    description: "Enterprise technical support desk",
    domains: [
      { id: "devops_support",             label: "DevOps Support"       },
      { id: "access_management_support",  label: "Access Management"    },
      { id: "saas_product_support",       label: "SaaS Product Support" },
    ],
  },
] as const;

export const DEMO_LANGUAGES = [
  { code: "en-IN", label: "English"   },
  { code: "hi-IN", label: "Hindi"     },
  { code: "kn-IN", label: "Kannada"   },
  { code: "ta-IN", label: "Tamil"     },
  { code: "te-IN", label: "Telugu"    },
  { code: "ml-IN", label: "Malayalam" },
  { code: "bn-IN", label: "Bengali"   },
  { code: "gu-IN", label: "Gujarati"  },
  { code: "mr-IN", label: "Marathi"   },
  { code: "pa-IN", label: "Punjabi"   },
  { code: "od-IN", label: "Odia"      },
] as const;

export const DEMO_VOICES = [
  { id: "voice_1",  label: "Priya",  gender: "Female" },
  { id: "voice_2",  label: "Kavya",  gender: "Female" },
  { id: "voice_3",  label: "Neha",   gender: "Female" },
  { id: "voice_4",  label: "Simran", gender: "Female" },
  { id: "voice_5",  label: "Pooja",  gender: "Female" },
  { id: "voice_6",  label: "Rahul",  gender: "Male"   },
  { id: "voice_7",  label: "Rohan",  gender: "Male"   },
  { id: "voice_8",  label: "Aditya", gender: "Male"   },
  { id: "voice_9",  label: "Amit",   gender: "Male"   },
  { id: "voice_10", label: "Ratan",  gender: "Male"   },
] as const;

// ─────────────────────────── Types ───────────────────────────────────────────

export interface DemoConfig {
  roleId:       string;
  domainId:     string;
  languageCode: string;
  voiceId:      string;
  voiceLabel:   string;
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
  idle:       ["#1f4a3f", "#2d6a4f", "#40916c", "#52b788"],
  listening:  ["#40916c", "#52b788", "#74c69d", "#95d5b2"],
  thinking:   ["#1f4a3f", "#2d6a4f", "#40916c", "#52b788"],
  speaking:   ["#52b788", "#1f4a3f", "#40916c", "#74c69d"],
};

export function SiriOrb({ state, size = 240 }: { state: OrbState; size?: number }) {
  const canvasRef  = useRef<HTMLCanvasElement>(null);
  const animRef    = useRef<number>(0);
  const stateRef   = useRef<OrbState>(state);

  useEffect(() => { stateRef.current = state; }, [state]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const W  = 400; // fixed internal resolution — blobs never clip
    const H  = 400;
    const cx = 200;
    const cy = 200;
    const sc = 1;   // draw at natural scale; CSS handles visual sizing

    function drawBlob(
      x: number, y: number, r: number,
      color: string, alpha: number, blur: number,
    ) {
      ctx!.save();
      ctx!.globalAlpha    = alpha;
      ctx!.filter         = `blur(${blur}px)`;
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

      const s       = stateRef.current;
      const speed   = s === "speaking" ? 1.8 : s === "listening" ? 1.4 : s === "thinking" ? 1.0 : 0.45;
      const t       = ts * 0.001 * speed;
      const colors  = ORB_PALETTES[s];
      const spread  = (s === "speaking" ? 72 : s === "listening" ? 65 : s === "thinking" ? 55 : 42) * sc;
      const alpha   = s === "idle" || s === "connecting" ? 0.55 : 0.72;

      // Rotating coloured blobs
      for (let i = 0; i < colors.length; i++) {
        const phase  = (i * Math.PI * 2) / colors.length;
        const angle  = t * (0.6 + i * 0.28) + phase;
        const dist   = spread + Math.sin(t * (1.1 + i * 0.35) + i * 1.3) * (spread * 0.32);
        const bx     = cx + Math.cos(angle) * dist;
        const by     = cy + Math.sin(angle * 0.88 + i * 0.18) * dist;
        const br     = (88 + Math.sin(t * (1.2 + i * 0.45) + i) * 26) * sc;
        drawBlob(bx, by, br, colors[i], alpha, 20 * sc);
      }

      // Bright centre glow
      const pulse   = Math.sin(t * 2.5) * 6 * sc;
      const coreR   = (s === "speaking" ? 44 : s === "listening" ? 40 : 34) * sc + pulse;
      const cg      = ctx.createRadialGradient(cx, cy, 0, cx, cy, coreR);
      cg.addColorStop(0,   "rgba(255,255,255,0.95)");
      cg.addColorStop(0.4, colors[0] + "bb");
      cg.addColorStop(1,   "rgba(0,0,0,0)");
      ctx.save();
      ctx.filter    = `blur(${3 * sc}px)`;
      ctx.fillStyle = cg;
      ctx.beginPath();
      ctx.arc(cx, cy, coreR, 0, Math.PI * 2);
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
  const i16   = new Int16Array(buf);
  const f32   = new Float32Array(i16.length);
  for (let i = 0; i < i16.length; i++) f32[i] = i16[i] / 32768;
  return f32;
}

// ─────────────────────────── LiveDemoModal ───────────────────────────────────

export const WS_URL: string =
  (import.meta.env as Record<string, string>).VITE_DEMO_WS_URL ?? "ws://localhost:8000/ws";

export function LiveDemoModal({
  config,
  onClose,
}: {
  config: DemoConfig;
  onClose: () => void;
}) {
  const [sessionState, setSessionState] = useState<SessionState>("connecting");
  const [messages,     setMessages]     = useState<Message[]>([]);
  const [errorMsg,     setErrorMsg]     = useState("");

  const sessionStateRef  = useRef<SessionState>("connecting");
  const wsRef            = useRef<WebSocket | null>(null);
  const playbackCtxRef   = useRef<AudioContext | null>(null);
  const nextPlayTimeRef  = useRef<number>(0);
  const recordCtxRef     = useRef<AudioContext | null>(null);
  const processorRef     = useRef<ScriptProcessorNode | null>(null);
  const streamRef        = useRef<MediaStream | null>(null);
  const messagesEndRef   = useRef<HTMLDivElement>(null);
  const configRef        = useRef(config);

  const setState = useCallback((s: SessionState) => {
    sessionStateRef.current = s;
    setSessionState(s);
  }, []);

  // Auto-scroll transcript
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // ── PCM playback ────────────────────────────────────────────────────────────
  const playChunk = useCallback((buf: ArrayBuffer) => {
    if (!playbackCtxRef.current || playbackCtxRef.current.state === "closed") {
      playbackCtxRef.current = new AudioContext({ sampleRate: 16000 });
      nextPlayTimeRef.current = 0;
    }
    const ctx    = playbackCtxRef.current;
    const f32    = int16ToFloat32(buf);
    const abuf   = ctx.createBuffer(1, f32.length, 16000);
    abuf.copyToChannel(f32, 0);
    const src    = ctx.createBufferSource();
    src.buffer   = abuf;
    src.connect(ctx.destination);
    const now    = ctx.currentTime;
    const start  = Math.max(now, nextPlayTimeRef.current);
    src.start(start);
    nextPlayTimeRef.current = start + abuf.duration;
  }, []);

  // ── Recording ───────────────────────────────────────────────────────────────
  const stopRecording = useCallback(() => {
    processorRef.current?.disconnect();
    processorRef.current = null;
    recordCtxRef.current?.close().catch(() => {});
    recordCtxRef.current = null;
    streamRef.current?.getTracks().forEach((t) => t.stop());
    streamRef.current = null;
  }, []);

  const startRecording = useCallback(async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true, video: false });
      streamRef.current  = stream;

      const nativeCtx    = new AudioContext();
      recordCtxRef.current = nativeCtx;
      const nativeSR     = nativeCtx.sampleRate;
      const TARGET       = 16000;

      const source       = nativeCtx.createMediaStreamSource(stream);
      // eslint-disable-next-line @typescript-eslint/no-deprecated
      const processor    = nativeCtx.createScriptProcessor(4096, 1, 1);
      processorRef.current = processor;

      processor.onaudioprocess = (e) => {
        if (!wsRef.current || wsRef.current.readyState !== WebSocket.OPEN) return;
        const input  = e.inputBuffer.getChannelData(0);
        let samples  = input;

        if (nativeSR !== TARGET) {
          const ratio  = nativeSR / TARGET;
          const len    = Math.round(input.length / ratio);
          samples      = new Float32Array(len);
          for (let i  = 0; i < len; i++) samples[i] = input[Math.round(i * ratio)];
        }

        wsRef.current.send(float32ToInt16(samples));
      };

      source.connect(processor);
      processor.connect(nativeCtx.destination);

      setState("listening");
    } catch {
      setErrorMsg("Microphone access denied.");
      setState("error");
    }
  }, [setState]);

  const handleMicClick = useCallback(async () => {
    const s = sessionStateRef.current;
    if (s === "listening") {
      stopRecording();
      if (wsRef.current?.readyState === WebSocket.OPEN) {
        wsRef.current.send(JSON.stringify({ type: "audio_end" }));
      }
      setState("thinking");
    } else if (s === "idle") {
      await startRecording();
    }
  }, [startRecording, stopRecording, setState]);

  // ── WebSocket lifecycle ──────────────────────────────────────────────────────
  useEffect(() => {
    const cfg = configRef.current;
    const ws  = new WebSocket(WS_URL);
    ws.binaryType = "arraybuffer";
    wsRef.current = ws;

    ws.onopen = () => {
      ws.send(
        JSON.stringify({
          type:     "init",
          role:     cfg.roleId,
          domain:   cfg.domainId,
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
          setState("connecting");
          break;
        case "response_text":
          if (data.text) setMessages((p) => [...p, { role: "agent", text: data.text! }]);
          setState("speaking");
          break;
        case "transcript":
          if (data.text) {
            setMessages((p) => {
              const last = p[p.length - 1];
              if (last?.role === "user") return [...p.slice(0, -1), { role: "user", text: data.text! }];
              return [...p, { role: "user", text: data.text! }];
            });
          }
          break;
        case "audio_end":
          nextPlayTimeRef.current = 0;
          setState("idle");
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
      stopRecording();
      playbackCtxRef.current?.close().catch(() => {});
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // ── Derived orb state ───────────────────────────────────────────────────────
  const orbState: OrbState = (() => {
    if (sessionState === "listening")  return "listening";
    if (sessionState === "thinking")   return "thinking";
    if (sessionState === "speaking")   return "speaking";
    if (sessionState === "connecting") return "connecting";
    return "idle";
  })();

  const statusLabel = {
    connecting: "Connecting…",
    idle:       "Tap mic to speak",
    listening:  "Listening… tap to send",
    thinking:   "Thinking…",
    speaking:   "Speaking…",
    error:      errorMsg || "Error",
    ended:      "Session ended",
  }[sessionState];

  const canTapMic = sessionState === "idle" || sessionState === "listening";

  // ── Render ──────────────────────────────────────────────────────────────────
  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Live Demo"
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 backdrop-blur-sm"
      onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
    >
      <div className="relative flex h-[92vh] max-h-[740px] w-full max-w-md flex-col overflow-hidden rounded-3xl bg-[#080b12] shadow-2xl ring-1 ring-white/10">

        {/* ── Header ── */}
        <div className="flex items-center justify-between px-6 pt-5 pb-2">
          <div>
            <p className="text-[10px] uppercase tracking-[0.22em] text-white/40">Khyra AI · Live Demo</p>
            <p className="mt-0.5 text-sm font-medium text-white/75">{config.voiceLabel}</p>
          </div>
          <button
            onClick={onClose}
            className="rounded-full p-2 text-white/40 transition hover:bg-white/10 hover:text-white"
            aria-label="Close demo"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* ── Orb ── */}
        <div className="flex justify-center py-2">
          <SiriOrb state={orbState} />
        </div>

        {/* ── Status ── */}
        <p
          className={`text-center text-xs font-medium ${
            sessionState === "error" ? "text-red-400" : "text-white/45"
          }`}
        >
          {statusLabel}
        </p>

        {/* ── Transcript ── */}
        <div className="mx-4 mt-3 flex-1 overflow-y-auto rounded-2xl bg-white/5 p-3">
          {messages.length === 0 && (
            <p className="mt-6 text-center text-xs text-white/25">
              Conversation transcript will appear here
            </p>
          )}
          <div className="space-y-2.5">
            {messages.map((m, i) => (
              <div
                key={i}
                className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={`max-w-[85%] rounded-2xl px-4 py-2.5 text-sm leading-relaxed ${
                    m.role === "user"
                      ? "bg-[#1f4a3f] text-white/90"
                      : "bg-white/12 text-white/85"
                  }`}
                >
                  {m.text}
                </div>
              </div>
            ))}
          </div>
          <div ref={messagesEndRef} />
        </div>

        {/* ── Mic button ── */}
        <div className="flex flex-col items-center gap-2 py-5">
          {sessionState === "ended" || sessionState === "error" ? (
            <button
              onClick={onClose}
              className="flex items-center gap-2 rounded-full bg-white/10 px-5 py-2.5 text-sm text-white/80 transition hover:bg-white/20"
            >
              <RotateCcw className="h-4 w-4" />
              Close &amp; reconfigure
            </button>
          ) : (
            <button
              onClick={handleMicClick}
              disabled={!canTapMic}
              aria-label={sessionState === "listening" ? "Stop recording" : "Start recording"}
              className={`flex h-16 w-16 items-center justify-center rounded-full transition-all duration-200 ${
                sessionState === "listening"
                  ? "scale-110 bg-red-500 shadow-lg shadow-red-500/50"
                  : canTapMic
                  ? "bg-white/15 hover:bg-white/25 active:scale-95"
                  : "cursor-not-allowed bg-white/5 opacity-40"
              }`}
            >
              {sessionState === "listening" ? (
                <MicOff className="h-7 w-7 text-white" />
              ) : (
                <Mic className="h-7 w-7 text-white" />
              )}
            </button>
          )}
          <p className="text-[10px] text-white/25">This demo does not store any data.</p>
        </div>
      </div>
    </div>
  );
}
