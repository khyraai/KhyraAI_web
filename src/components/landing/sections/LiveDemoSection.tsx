import { useEffect, useMemo, useState } from "react";
import { ArrowRight, Mic } from "lucide-react";
import { LiveDemoModal, DEMO_LANGUAGES, DEMO_ROLES, DEMO_VOICES, type DemoConfig } from "@/components/live-demo-modal";
import { RevealSection } from "@/components/landing/ui/RevealSection";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const defaultRoleId = "front_desk";
const defaultLanguageCode = "en-IN";
const defaultVoiceId = "voice_1";

function getDefaultDemoConfig(roleId: string, domainId: string, languageCode: string, voiceId: string, voiceLabel: string): DemoConfig {
  return { roleId, domainId, languageCode, voiceId, voiceLabel };
}

export function LiveDemoSection() {
  const [isOpen, setIsOpen] = useState(false);
  const [roleId, setRoleId] = useState(defaultRoleId);
  const role = useMemo(
    () => DEMO_ROLES.find((item) => item.id === roleId) ?? DEMO_ROLES[0],
    [roleId],
  );
  const [domainId, setDomainId] = useState(role.domains[0].id);
  const [languageCode, setLanguageCode] = useState(defaultLanguageCode);
  const [voiceId, setVoiceId] = useState(defaultVoiceId);

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

  return (
    <>
      <RevealSection id="demo" className="mx-auto max-w-7xl px-6 py-24">
        <div className="overflow-hidden rounded-4xl bg-primary text-primary-foreground shadow-xl ring-1 ring-black/10">
          <div className="grid gap-10 px-8 py-12 md:grid-cols-[1.05fr_0.95fr] lg:px-14 lg:py-16">
            <div className="max-w-xl">
              <p className="text-[10px] text-primary-foreground/60">Live demo</p>
              <h2 className="mt-4 font-display text-4xl tracking-tight text-white md:text-5xl">
                Hear Khyra before you buy.
              </h2>
              <p className="mt-6 max-w-2xl text-xs leading-relaxed text-primary-foreground/60">
                Pick a role, pick a language, and have a live conversation with a Khyra agent right now. No sign-up.
              </p>

              <div className="mt-6 flex flex-wrap gap-2">
                <button
                  type="button"
                  onClick={() => setIsOpen(true)}
                  className="inline-flex items-center gap-2 rounded-full bg-background px-4 py-2 text-xs font-semibold text-foreground transition hover:bg-white/10"
                >
                  Configure & try <ArrowRight className="h-4 w-4" />
                </button>
                <a
                  href="/book-demo"
                  className="inline-flex items-center gap-2 rounded-full border border-primary-foreground/20 bg-white/5 px-4 py-2 text-xs font-semibold text-primary-foreground transition hover:bg-white/10"
                >
                  Book a demo
                </a>
              </div>
            </div>

            <div className="space-y-4 rounded-2xl border border-white/10 bg-white/3 p-4 shadow-inner backdrop-blur-xl md:p-5">
              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <p className="text-[10px] text-primary-foreground/65">Agent role</p>
                  <Select value={roleId} onValueChange={setRoleId}>
                    <SelectTrigger className="mt-2 h-10 rounded-xl border border-white/10 bg-white/5 px-3.5 text-xs text-white/70">
                      <SelectValue placeholder="Choose role" />
                    </SelectTrigger>
                    <SelectContent>
                      {DEMO_ROLES.map((item) => (
                        <SelectItem key={item.id} value={item.id}>
                          {item.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <p className="text-[10px] text-primary-foreground/65">Industry</p>
                  <Select value={domainId} onValueChange={setDomainId}>
                    <SelectTrigger className="mt-2 h-10 rounded-xl border border-white/10 bg-white/5 px-3.5 text-xs text-white/70">
                      <SelectValue placeholder="Choose industry" />
                    </SelectTrigger>
                    <SelectContent>
                      {role.domains.map((item) => (
                        <SelectItem key={item.id} value={item.id}>
                          {item.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <p className="text-[10px] text-primary-foreground/65">Language</p>
                  <Select value={languageCode} onValueChange={setLanguageCode}>
                    <SelectTrigger className="mt-2 h-10 rounded-xl border border-white/10 bg-white/5 px-3.5 text-xs text-white/70">
                      <SelectValue placeholder="Choose language" />
                    </SelectTrigger>
                    <SelectContent>
                      {DEMO_LANGUAGES.map((item) => (
                        <SelectItem key={item.code} value={item.code}>
                          {item.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <p className="text-[10px] text-primary-foreground/65">Voice</p>
                  <Select value={voiceId} onValueChange={setVoiceId}>
                    <SelectTrigger className="mt-2 h-10 rounded-xl border border-white/10 bg-white/5 px-3.5 text-xs text-white/70">
                      <SelectValue placeholder="Choose voice" />
                    </SelectTrigger>
                    <SelectContent>
                      {DEMO_VOICES.map((item) => (
                        <SelectItem key={item.id} value={item.id}>
                          {item.label} · {item.gender}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="flex flex-wrap gap-1 px-1">
                {[role.label, domain.label, DEMO_LANGUAGES.find((item) => item.code === languageCode)?.label ?? "", voice.label].map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full border border-white/15 bg-white/10 px-2 py-0.5 text-[8px] text-primary-foreground"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              <div className="mt-4">
                <button
                  type="button"
                  onClick={() => setIsOpen(true)}
                  className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-white px-4 py-2 text-xs font-semibold text-primary transition hover:bg-white/90"
                >
                  Start conversation
                  <ArrowRight className="h-4 w-4" />
                </button>
                <p className="mt-3 text-center text-xs text-primary-foreground/70">
                  This demo does not store any data.
                </p>
              </div>
            </div>
          </div>
        </div>
      </RevealSection>

      {isOpen ? <LiveDemoModal config={config} onClose={() => setIsOpen(false)} /> : null}
    </>
  );
}
