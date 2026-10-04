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
  { id: "voice_1", label: "Priya", gender: "Female" },
  { id: "voice_2", label: "Kavya", gender: "Female" },
  { id: "voice_3", label: "Neha", gender: "Female" },
  { id: "voice_4", label: "Simran", gender: "Female" },
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
const SILENCE_MS = 1200;       // ms of silence after speech → send {"type": "audio_end"}
const RMS_THRESHOLD = 0.01;    // RMS level to classify as speech (Rule 2: normal speech is 0.009 - 0.018)

export function useLiveDemoSession(config: DemoConfig, active: boolean) {
  const [sessionState, setSessionState] = useState<SessionState>("connecting");
  const [errorMsg, setErrorMsg] = useState("");

  const sessionStateRef = useRef<SessionState>("connecting");
  const wsRef = useRef<WebSocket | null>(null);
  const audioCtxRef = useRef<AudioContext | null>(null);
  const playheadRef = useRef<number>(0);
  const processorRef = useRef<ScriptProcessorNode | null>(null);
  const analyserRef = useRef<AnalyserNode | null>(null);
  const sourceRef = useRef<MediaStreamAudioSourceNode | null>(null);
  const muteGainRef = useRef<GainNode | null>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const configRef = useRef(config);
  const isAgentSpeakingRef = useRef<boolean>(false);
  const isProcessingStateRef = useRef<boolean>(false);
  const sendingAudioRef = useRef<boolean>(false);
  const silenceTimerRef = useRef<number | null>(null);
  const audioEndTimeoutRef = useRef<number | null>(null);
  const micVolumeRef = useRef<number>(0);

  useEffect(() => {
    configRef.current = config;
  }, [config]);

  const setState = useCallback((s: SessionState) => {
    sessionStateRef.current = s;
    setSessionState(s);
  }, []);

  // ── PCM Queue Playback (Rule 3) ─────────────────────────────────────────────
  const enqueueAudioChunk = useCallback((arrayBuffer: ArrayBuffer) => {
    let ctx = audioCtxRef.current;
    if (!ctx || ctx.state === "closed") {
      const AudioCtxClass =
        window.AudioContext ||
        (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      ctx = new AudioCtxClass({ sampleRate: 16000 });
      audioCtxRef.current = ctx;
      playheadRef.current = ctx.currentTime;
    }
    // Check 2: AudioContext state is "running", not "suspended", when audio chunks arrive
    if (ctx.state === "suspended") {
      console.warn("[AudioContext] Suspended when chunk arrived! Resuming...");
      ctx.resume().catch((err) => console.error("[AudioContext] Resume failed:", err));
    }

    const int16 = new Int16Array(arrayBuffer);
    const floatData = new Float32Array(int16.length);
    for (let i = 0; i < int16.length; i++) {
      floatData[i] = int16[i] / 32768;
    }
    const audioBuf = ctx.createBuffer(1, floatData.length, 16000);
    audioBuf.copyToChannel(floatData, 0);

    const source = ctx.createBufferSource();
    source.buffer = audioBuf;
    source.connect(ctx.destination);

    const now = ctx.currentTime;
    if (playheadRef.current < now) {
      playheadRef.current = now;
    }
    source.start(playheadRef.current);
    playheadRef.current += audioBuf.duration;

    console.log(
      `[Audio] Enqueued chunk: ${arrayBuffer.byteLength}B | AudioContext state: ${ctx.state} | Queue ahead: ${(playheadRef.current - now).toFixed(2)}s`
    );
  }, []);

  // ── Mic Cleanup ─────────────────────────────────────────────────────────────
  const cleanupMic = useCallback(() => {
    if (silenceTimerRef.current !== null) {
      clearTimeout(silenceTimerRef.current);
      silenceTimerRef.current = null;
    }
    if (audioEndTimeoutRef.current !== null) {
      clearTimeout(audioEndTimeoutRef.current);
      audioEndTimeoutRef.current = null;
    }
    sendingAudioRef.current = false;
    isAgentSpeakingRef.current = false;
    isProcessingStateRef.current = false;

    if (processorRef.current) {
      try {
        processorRef.current.disconnect();
        processorRef.current.onaudioprocess = null;
      } catch {}
      processorRef.current = null;
    }
    if (muteGainRef.current) {
      try {
        muteGainRef.current.disconnect();
      } catch {}
      muteGainRef.current = null;
    }
    if (sourceRef.current) {
      try {
        sourceRef.current.disconnect();
      } catch {}
      sourceRef.current = null;
    }
    if (analyserRef.current) {
      try {
        analyserRef.current.disconnect();
      } catch {}
      analyserRef.current = null;
    }
    if (streamRef.current) {
      streamRef.current.getTracks().forEach((t) => t.stop());
      streamRef.current = null;
    }
    if (audioCtxRef.current && audioCtxRef.current.state !== "closed") {
      audioCtxRef.current.close().catch(() => {});
      audioCtxRef.current = null;
    }
    playheadRef.current = 0;
    micVolumeRef.current = 0;
  }, []);

  // ── Start Microphone & VAD (Rule 2 & Rule 3) ────────────────────────────────
  const startMic = useCallback(async () => {
    try {
      let ctx = audioCtxRef.current;
      if (!ctx || ctx.state === "closed") {
        const AudioCtxClass =
          window.AudioContext ||
          (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
        ctx = new AudioCtxClass({ sampleRate: 16000 });
        audioCtxRef.current = ctx;
        playheadRef.current = ctx.currentTime;
      }
      if (ctx.state === "suspended") {
        await ctx.resume();
      }

      let stream = streamRef.current;
      if (!stream || !stream.active) {
        stream = await navigator.mediaDevices.getUserMedia({
          audio: {
            sampleRate: 16000,
            channelCount: 1,
            echoCancellation: true,
            noiseSuppression: true,
            autoGainControl: true,
          },
          video: false,
        });
        streamRef.current = stream;
      }

      // Cleanup prior node setup if re-invoked
      if (processorRef.current) {
        try {
          processorRef.current.disconnect();
          processorRef.current.onaudioprocess = null;
        } catch {}
        processorRef.current = null;
      }
      if (muteGainRef.current) {
        try {
          muteGainRef.current.disconnect();
        } catch {}
        muteGainRef.current = null;
      }
      if (sourceRef.current) {
        try {
          sourceRef.current.disconnect();
        } catch {}
        sourceRef.current = null;
      }

      const source = ctx.createMediaStreamSource(stream);
      sourceRef.current = source;

      const analyser = ctx.createAnalyser();
      analyser.fftSize = 512;
      analyserRef.current = analyser;

      // ScriptProcessorNode: 4096 buffer size (~256ms at 16kHz)
      const processor = ctx.createScriptProcessor(4096, 1, 1);
      processorRef.current = processor;

      // Connect through zero-gain node so Web Audio graph stays alive without routing mic to speakers
      const muteGain = ctx.createGain();
      muteGain.gain.value = 0;
      muteGainRef.current = muteGain;

      source.connect(analyser);
      analyser.connect(processor);
      processor.connect(muteGain);
      muteGain.connect(ctx.destination);

      processor.onaudioprocess = (e) => {
        const ws = wsRef.current;
        if (!ws || ws.readyState !== WebSocket.OPEN) return;

        const floats = e.inputBuffer.getChannelData(0);
        let sum = 0;
        for (let i = 0; i < floats.length; i++) sum += floats[i] * floats[i];
        const rms = Math.sqrt(sum / floats.length);

        // Rule 3 / Check 5: Microphone is muted while agent audio is playing to eliminate speaker echo
        const now = ctx?.currentTime ?? 0;
        const isAgentSpeaking = isAgentSpeakingRef.current || now < playheadRef.current;
        if (isAgentSpeaking || isProcessingStateRef.current) {
          if (silenceTimerRef.current !== null) {
            clearTimeout(silenceTimerRef.current);
            silenceTimerRef.current = null;
          }
          sendingAudioRef.current = false;
          micVolumeRef.current = 0;
          return;
        }

        micVolumeRef.current = rms;
        const isUserSpeech = rms > RMS_THRESHOLD; // Check 3: RMS > 0.01

        if (isUserSpeech) {
          // Check 3: Verify by logging RMS in console when speaking
          console.log(`[VAD] User speaking | RMS: ${rms.toFixed(4)} (Threshold: ${RMS_THRESHOLD})`);

          if (silenceTimerRef.current !== null) {
            clearTimeout(silenceTimerRef.current);
            silenceTimerRef.current = null;
          }

          if (!sendingAudioRef.current) {
            sendingAudioRef.current = true;
            setState("listening");
          }

          // Check 4: Chunks are streamed live, not accumulated into a giant array
          const int16 = new Int16Array(floats.length);
          for (let i = 0; i < floats.length; i++) {
            int16[i] = Math.max(-32768, Math.min(32767, Math.round(floats[i] * 32767)));
          }
          ws.send(int16.buffer);
        } else {
          // Step 6: When silence is detected for ~1.2s, send {"type": "audio_end"}
          if (sendingAudioRef.current && silenceTimerRef.current === null) {
            silenceTimerRef.current = window.setTimeout(() => {
              if (!sendingAudioRef.current) return;
              console.log(`[VAD] Silence detected for ${SILENCE_MS}ms. Sending audio_end.`);
              sendingAudioRef.current = false;
              silenceTimerRef.current = null;
              isProcessingStateRef.current = true;
              setState("thinking");
              if (ws.readyState === WebSocket.OPEN) {
                ws.send(JSON.stringify({ type: "audio_end" }));
              }
            }, SILENCE_MS);
          }
        }
      };

      setState("listening");
    } catch (err) {
      console.error("Microphone setup error:", err);
      setErrorMsg("Microphone access denied.");
      setState("error");
    }
  }, [setState]);

  // ── Unlock Audio & Pre-request Mic in User Gesture (Rule 1) ──────────────────
  const startConversation = useCallback(async () => {
    try {
      if (!audioCtxRef.current || audioCtxRef.current.state === "closed") {
        const AudioCtxClass =
          window.AudioContext ||
          (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
        audioCtxRef.current = new AudioCtxClass({ sampleRate: 16000 });
        playheadRef.current = audioCtxRef.current.currentTime;
      }
      if (audioCtxRef.current.state === "suspended") {
        await audioCtxRef.current.resume();
      }
      console.log(`[AudioContext] Successfully unlocked on user gesture. State: ${audioCtxRef.current.state}`);
    } catch (e) {
      console.warn("AudioContext unlock error:", e);
    }

    try {
      if (!streamRef.current || !streamRef.current.active) {
        streamRef.current = await navigator.mediaDevices.getUserMedia({
          audio: {
            sampleRate: 16000,
            channelCount: 1,
            echoCancellation: true,
            noiseSuppression: true,
            autoGainControl: true,
          },
          video: false,
        });
        console.log("[Mic] MediaStream access granted.");
      }
    } catch (e) {
      console.warn("Pre-request mic error:", e);
    }
  }, []);

  // ── WebSocket lifecycle (Step 1-7) ───────────────────────────────────────────
  useEffect(() => {
    if (!active) return;

    // Ensure audio context is ready
    if (!audioCtxRef.current || audioCtxRef.current.state === "closed") {
      const AudioCtxClass =
        window.AudioContext ||
        (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      audioCtxRef.current = new AudioCtxClass({ sampleRate: 16000 });
      playheadRef.current = audioCtxRef.current.currentTime;
    }
    if (audioCtxRef.current.state === "suspended") {
      audioCtxRef.current.resume().catch(() => {});
    }

    const cfg = configRef.current;
    console.log(`[WS] Connecting to ${WS_URL}...`);
    const ws = new WebSocket(WS_URL);

    // Check 1: ws.binaryType = "arraybuffer" is set right after creating the WebSocket
    ws.binaryType = "arraybuffer";
    wsRef.current = ws;

    // Step 2: Init payload on open
    ws.onopen = () => {
      const initPayload = {
        type: "init",
        role: cfg.roleId,
        domain: cfg.domainId,
        language: cfg.languageCode,
        voice_id: cfg.voiceId,
      };
      console.log("[WS] Connected. Sending init:", initPayload);
      ws.send(JSON.stringify(initPayload));
    };

    // Step 3, 4, 7: Handle incoming messages and binary audio chunks
    ws.onmessage = (evt) => {
      if (evt.data instanceof ArrayBuffer) {
        enqueueAudioChunk(evt.data);
        isAgentSpeakingRef.current = true;
        setState("speaking");
        return;
      }

      let data: { type: string; text?: string; message?: string };
      try {
        data = JSON.parse(evt.data as string);
      } catch {
        return;
      }

      console.log("[WS] Message received:", data);

      switch (data.type) {
        case "ready": // Step 3
          console.log("[WS] Server ready. Starting microphone.");
          startMic();
          break;
        case "response_text": // Step 4.1 / 7.1
          console.log("[AI] Response text:", data.text);
          isAgentSpeakingRef.current = true;
          isProcessingStateRef.current = false;
          setState("speaking");
          break;
        case "audio_end": { // Step 4.3 / 7.3
          console.log("[WS] Server sent audio_end for current turn.");
          const ctx = audioCtxRef.current;
          const remainingMs = ctx
            ? Math.max(300, (playheadRef.current - ctx.currentTime) * 1000 + 200)
            : 400;

          if (audioEndTimeoutRef.current !== null) {
            clearTimeout(audioEndTimeoutRef.current);
          }
          audioEndTimeoutRef.current = window.setTimeout(() => {
            audioEndTimeoutRef.current = null;
            if (sessionStateRef.current !== "ended" && sessionStateRef.current !== "error") {
              isAgentSpeakingRef.current = false;
              isProcessingStateRef.current = false;
              if (ctx) playheadRef.current = ctx.currentTime;
              setState("listening");
              console.log("[Audio] Agent playback ended. Microphone listening for user.");
            }
          }, remainingMs);
          break;
        }
        case "error":
          console.error("[WS] Server error:", data.message);
          isProcessingStateRef.current = false;
          isAgentSpeakingRef.current = false;
          setErrorMsg(data.message ?? "Unknown error");
          setState("error");
          break;
      }
    };

    ws.onerror = (err) => {
      console.error("[WS] Connection error:", err);
      setErrorMsg("Cannot reach demo server. Make sure it is running.");
      setState("error");
    };

    ws.onclose = (evt) => {
      console.log(`[WS] Connection closed (code: ${evt.code}, reason: ${evt.reason || "none"})`);
      if (sessionStateRef.current !== "error") setState("ended");
    };

    return () => {
      try {
        ws.close();
      } catch {}
      cleanupMic();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [active]);

  const endConversation = useCallback(() => {
    try {
      wsRef.current?.close();
    } catch {}
    wsRef.current = null;
    cleanupMic();
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
    startConversation,
    endConversation,
  };
}
