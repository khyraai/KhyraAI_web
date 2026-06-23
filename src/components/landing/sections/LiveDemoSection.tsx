import { useEffect, useMemo, useState } from "react";
import { ArrowRight, RotateCcw } from "lucide-react";
import { useLiveDemoSession, SiriOrb, DEMO_LANGUAGES, DEMO_ROLES, DEMO_VOICES, type DemoConfig } from "@/components/live-demo-modal";
import { RevealSection } from "@/components/landing/ui/RevealSection";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const defaultRoleId = "front_desk";
const defaultLanguageCode = "en-IN";
const defaultVoiceId = "voice_1";

function getDefaultDemoConfig(roleId: string, domainId: string, languageCode: string, voiceId: string, voiceLabel: string): DemoConfig {
  return { roleId, domainId, languageCode, voiceId, voiceLabel };
}

export function LiveDemoSection() {
  const [active, setActive] = useState(false);
  
  const [roleId, setRoleId] = useState<string>(defaultRoleId);
  const role = useMemo(
    () => DEMO_ROLES.find((item) => item.id === roleId) ?? DEMO_ROLES[0],
    [roleId],
  );
  const [domainId, setDomainId] = useState<string>(role.domains[0].id);
  const [languageCode, setLanguageCode] = useState<string>(defaultLanguageCode);
  const [voiceId, setVoiceId] = useState<string>(defaultVoiceId);

  useEffect(() => {
    if (!role.domains.some((domain) => domain.id === domainId)) {
      setDomainId(role.domains[0].id);
    }
  }, [domainId, role.domains]);

  const domain = useMemo(
    () => role.domains.find((item) => item.id === domainId) ?? role.domains[0],
    [domainId, role.domains],
  );

  const voice = useMemo(
    () => DEMO_VOICES.find((item) => item.id === voiceId) ?? DEMO_VOICES[0],
    [voiceId],
  );

  const config = useMemo(
    () =>
      getDefaultDemoConfig(
        role.id,
        domain.id,
        languageCode,
        voice.id,
        `${voice.label} · ${voice.gender}`,
      ),
    [domain.id, languageCode, role.id, voice.gender, voice.id, voice.label],
  );

  const { sessionState, orbState, statusLabel, errorMsg, micVolumeRef, endConversation } = useLiveDemoSession(config, active);

  const handleEndConversation = () => {
    endConversation();
    setActive(false);
  };

  const configGrid = (locked: boolean) => (
    <div className={locked ? "pointer-events-none opacity-80 transition-opacity" : "transition-opacity"}>
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <p className="text-[10px] uppercase tracking-wider opacity-60 mb-1.5">Agent role</p>
          <Select value={roleId} onValueChange={locked ? undefined : setRoleId}>
            <SelectTrigger className="h-11 rounded-xl border border-primary-foreground/15 bg-primary-foreground/5 px-3.5 text-xs transition hover:bg-primary-foreground/10 focus:ring-1 focus:ring-primary-foreground/30 text-primary-foreground">
              <SelectValue placeholder="Choose role" />
            </SelectTrigger>
            <SelectContent>
              {DEMO_ROLES.map((item) => (
                <SelectItem key={item.id} value={item.id}>{item.label}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div>
          <p className="text-[10px] uppercase tracking-wider opacity-60 mb-1.5">Industry</p>
          <Select value={domainId} onValueChange={locked ? undefined : setDomainId}>
            <SelectTrigger className="h-11 rounded-xl border border-primary-foreground/15 bg-primary-foreground/5 px-3.5 text-xs transition hover:bg-primary-foreground/10 focus:ring-1 focus:ring-primary-foreground/30 text-primary-foreground">
              <SelectValue placeholder="Choose industry" />
            </SelectTrigger>
            <SelectContent>
              {role.domains.map((item) => (
                <SelectItem key={item.id} value={item.id}>{item.label}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div>
          <p className="text-[10px] uppercase tracking-wider opacity-60 mb-1.5">Language</p>
          <Select value={languageCode} onValueChange={locked ? undefined : setLanguageCode}>
            <SelectTrigger className="h-11 rounded-xl border border-primary-foreground/15 bg-primary-foreground/5 px-3.5 text-xs transition hover:bg-primary-foreground/10 focus:ring-1 focus:ring-primary-foreground/30 text-primary-foreground">
              <SelectValue placeholder="Choose language" />
            </SelectTrigger>
            <SelectContent>
              {DEMO_LANGUAGES.map((item) => (
                <SelectItem key={item.code} value={item.code}>{item.label}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div>
          <p className="text-[10px] uppercase tracking-wider opacity-60 mb-1.5">Voice</p>
          <Select value={voiceId} onValueChange={locked ? undefined : setVoiceId}>
            <SelectTrigger className="h-11 rounded-xl border border-primary-foreground/15 bg-primary-foreground/5 px-3.5 text-xs transition hover:bg-primary-foreground/10 focus:ring-1 focus:ring-primary-foreground/30 text-primary-foreground">
              <SelectValue placeholder="Choose voice" />
            </SelectTrigger>
            <SelectContent>
              {DEMO_VOICES.map((item) => (
                <SelectItem key={item.id} value={item.id}>{item.label} · {item.gender}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>
      <div className="mt-4 flex flex-wrap gap-1.5">
        {[role.label, domain.label, DEMO_LANGUAGES.find((item) => item.code === languageCode)?.label ?? "", voice.label + " · " + voice.gender].map((tag) => (
          <span key={tag} className="rounded-full border border-primary-foreground/20 px-2.5 py-0.5 text-[10px] opacity-60">{tag}</span>
        ))}
      </div>
    </div>
  );

  return (
    <RevealSection id="demo" className="mx-auto max-w-7xl px-6 py-24">
      <div className={`overflow-hidden rounded-[2.5rem] border border-border transition-colors duration-500 shadow-xl ${active ? 'bg-beige text-primary' : 'bg-primary text-primary-foreground'}`}>

        {/* ── "Live demo" label ── */}
        <div className="transition-all duration-500 ease-in-out" style={{ padding: active ? "1.5rem 2.5rem 0.25rem" : "2.5rem 2.5rem 0" }}>
          <div className="text-[10px] uppercase tracking-[0.2em] opacity-70">Live demo</div>
        </div>

        {/* ── Mobile (stacked, no slide) ── */}
        <div className="md:hidden p-6 pt-4 flex flex-col gap-6">
          {!active ? (
            <>
              <div>
                <h2 className="mt-2 font-display text-4xl tracking-tight leading-[1.1]">Hear Khyra before you buy.</h2>
                <p className="mt-4 text-sm opacity-80 leading-relaxed max-w-sm">Pick a role, pick a language, and have a live conversation with a Khyra agent right now. No sign-up.</p>
              </div>
              <div className="rounded-3xl bg-white/5 border border-white/10 p-5 flex flex-col gap-5 text-primary-foreground shadow-inner backdrop-blur-xl">
                {configGrid(false)}
                <div className="pt-2">
                  <button onClick={() => setActive(true)} className="flex w-full items-center justify-center gap-2 rounded-full bg-primary-foreground py-3.5 text-sm font-semibold text-primary hover:opacity-90 active:scale-95 transition">
                    Start conversation <ArrowRight className="h-4 w-4" />
                  </button>
                  <p className="mt-3 text-center text-[10px] opacity-40">This demo does not store any data.</p>
                </div>
              </div>
            </>
          ) : (
            <div className="flex flex-col items-center gap-4 py-6">
              <SiriOrb state={orbState} volumeRef={micVolumeRef} size={160} />
              <p className={`text-xs font-medium ${sessionState === "error" ? "text-red-500" : "opacity-60"}`}>
                {statusLabel}
              </p>
              <div className="text-center leading-snug mt-2">
                <p className="text-sm font-medium opacity-90">{voice.label} · {role.label}</p>
                <p className="mt-0.5 text-xs opacity-60">{domain.label}</p>
              </div>
              <div className="mt-8 w-full">
                {sessionState === "ended" || sessionState === "error" ? (
                  <button onClick={handleEndConversation} className="flex w-full items-center justify-center gap-2 rounded-full bg-primary/10 py-3.5 text-sm font-semibold hover:bg-primary/20 active:scale-95 transition">
                    <RotateCcw className="h-4 w-4" /> Close &amp; reconfigure
                  </button>
                ) : (
                  <button onClick={handleEndConversation} className="flex w-full items-center justify-center gap-2 rounded-full bg-red-500/10 text-red-600 py-3.5 text-sm font-semibold hover:bg-red-500/20 active:scale-95 transition">
                    End conversation
                  </button>
                )}
              </div>
            </div>
          )}
        </div>

        {/* ── Desktop (sliding panels) ── */}
        <div className="relative hidden md:block" style={{ minHeight: 460 }}>

          {/* Panel A: Text copy */}
          <div
            className="absolute inset-y-0 left-0 flex flex-col justify-between py-10 pl-14 pr-8 transition-all duration-500 ease-in-out"
            style={{
              width: "50%",
              opacity: active ? 0 : 1,
              transform: active ? "translateX(-20px)" : "translateX(0)",
              pointerEvents: active ? "none" : "auto",
            }}
          >
            <div>
              <h2 className="mt-2 font-display text-5xl tracking-tight leading-[1.05]">Hear Khyra<br />before you buy.</h2>
              <p className="mt-5 max-w-sm text-sm opacity-80 leading-relaxed">
                Pick a role, pick a language, and have a live conversation with a Khyra agent right now. No sign-up.
              </p>
            </div>
            <div className="flex flex-wrap gap-3 pb-2 mt-8">
              <button onClick={() => setActive(true)} className="inline-flex items-center gap-2 rounded-full bg-primary-foreground px-6 py-3 text-sm font-semibold text-primary transition hover:opacity-90 active:scale-95">
                Configure &amp; try <ArrowRight className="h-4 w-4" />
              </button>
              <a href="/book-demo" className="inline-flex items-center gap-2 rounded-full border border-primary-foreground/30 bg-white/5 px-6 py-3 text-sm font-semibold transition hover:bg-white/10">
                Book a demo
              </a>
            </div>
          </div>

          {/* Panel B: Config card */}
          <div
            className="absolute inset-y-0 p-6"
            style={{
              width: "50%",
              left: active ? 0 : "50%",
              transition: "left 0.6s cubic-bezier(0.34, 1.56, 0.64, 1)",
            }}
          >
            <div className="flex h-full flex-col justify-between rounded-3xl bg-primary border border-white/10 p-7 text-primary-foreground shadow-inner backdrop-blur-xl">
              {configGrid(active)}
              
              <div className="mt-6">
                {!active ? (
                  <button
                    onClick={() => setActive(true)}
                    className="flex w-full items-center justify-center gap-2 rounded-full bg-primary-foreground py-3.5 text-sm font-semibold text-primary transition hover:opacity-90 active:scale-95 shadow-md"
                  >
                    Start conversation <ArrowRight className="h-4 w-4" />
                  </button>
                ) : (sessionState === "ended" || sessionState === "error") ? (
                  <button
                    onClick={handleEndConversation}
                    className="flex w-full items-center justify-center gap-2 rounded-full bg-primary-foreground/10 py-3.5 text-sm font-semibold text-primary-foreground transition hover:bg-primary-foreground/20 active:scale-95"
                  >
                    <RotateCcw className="h-4 w-4" /> Close &amp; reconfigure
                  </button>
                ) : (
                  <button
                    onClick={handleEndConversation}
                    className="flex w-full items-center justify-center gap-2 rounded-full bg-primary-foreground py-3.5 text-sm font-semibold text-primary transition hover:opacity-90 active:scale-95 shadow-md"
                  >
                    End conversation
                  </button>
                )}
                <p className="mt-3 text-center text-[10px] opacity-40">This demo does not store any data.</p>
              </div>
            </div>
          </div>

          {/* Panel C: Siri orb */}
          <div
            className="absolute inset-y-0 right-0 p-6"
            style={{
              width: "50%",
              transform: active ? "translateX(0)" : "translateX(100%)",
              opacity: active ? 1 : 0,
              transition: "transform 0.6s cubic-bezier(0.34, 1.56, 0.64, 1), opacity 0.4s ease",
            }}
          >
            <div className="flex h-full flex-col items-center justify-center gap-4 px-4 py-5">
              <SiriOrb state={orbState} volumeRef={micVolumeRef} size={200} />

              <div className="flex flex-col items-center mt-2">
                <p className={`text-xs font-medium tracking-wide uppercase ${sessionState === "error" ? "text-red-500" : "text-primary/60"}`}>
                  {statusLabel}
                </p>

                <div className="text-center leading-snug mt-4">
                  <p className="text-base font-semibold text-primary/90">
                    {voice.label} · {role.label}
                  </p>
                  {domain && (
                    <p className="mt-1 text-sm text-primary/60">
                      {domain.label}
                    </p>
                  )}
                </div>
              </div>

              {sessionState !== "ended" && sessionState !== "error" && (
                <button 
                  onClick={handleEndConversation} 
                  className="mt-6 text-xs font-medium text-primary/40 hover:text-primary/80 transition-colors uppercase tracking-wider"
                >
                  End conversation
                </button>
              )}
            </div>
          </div>
        </div>

      </div>
    </RevealSection>
  );
}
