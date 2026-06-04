import { useCallback, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { httpsCallable } from "firebase/functions";
import { getCallableErrorMessage } from "../lib/callableError";
import { getFirebaseFunctions } from "../lib/firebase";
import "./AiAssistant.css";

type Mode = "chat" | "image";

type ChatMessage = {
  id: string;
  role: "user" | "assistant";
  text?: string;
  imageUrl?: string;
  imagePrompt?: string;
  error?: boolean;
};

type TextResponse = { type: "text"; answer: string };
type ImageResponse = { type: "image"; imageUrl: string; prompt: string };

function uid() {
  return `${Date.now()}-${Math.random().toString(36).slice(2, 9)}`;
}

function readDismissed() {
  try {
    return sessionStorage.getItem("ai-assistant-dismissed") === "1";
  } catch {
    return false;
  }
}

export function AiAssistant() {
  const [open, setOpen] = useState(() => !readDismissed());
  const [mode, setMode] = useState<Mode>("chat");
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: "welcome",
      role: "assistant",
      text: "Hi — I'm Edward's portfolio assistant. Ask about skills, stack, and projects — or switch to image mode for a visual concept.",
    },
  ]);
  const [configError, setConfigError] = useState<string | null>(null);
  const listRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    try {
      getFirebaseFunctions();
      setConfigError(null);
    } catch (e) {
      setConfigError(
        e instanceof Error ? e.message : "Firebase is not configured.",
      );
    }
  }, []);

  useEffect(() => {
    if (open && listRef.current) {
      listRef.current.scrollTop = listRef.current.scrollHeight;
    }
  }, [open, messages, loading]);

  useEffect(() => {
    if (open) {
      inputRef.current?.focus();
    }
  }, [open, mode]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeAssistant();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  const appendMessage = useCallback((msg: ChatMessage) => {
    setMessages((prev) => [...prev, msg]);
  }, []);

  const handleSubmit = async () => {
    const trimmed = input.trim();
    if (!trimmed || loading) return;

    if (configError) {
      appendMessage({
        id: uid(),
        role: "assistant",
        text: configError,
        error: true,
      });
      return;
    }

    const userMsg: ChatMessage = {
      id: uid(),
      role: "user",
      text: mode === "chat" ? trimmed : `Generate image: ${trimmed}`,
    };
    appendMessage(userMsg);
    setInput("");
    setLoading(true);

    try {
      const functions = getFirebaseFunctions();

      if (mode === "chat") {
        const ask = httpsCallable<{ message: string }, TextResponse>(
          functions,
          "askAssistant",
        );
        const { data } = await ask({ message: trimmed });
        appendMessage({
          id: uid(),
          role: "assistant",
          text: data.answer,
        });
      } else {
        const generate = httpsCallable<{ prompt: string }, ImageResponse>(
          functions,
          "generatePhoto",
        );
        const { data } = await generate({ prompt: trimmed });
        appendMessage({
          id: uid(),
          role: "assistant",
          text: `Concept: "${data.prompt}"`,
          imageUrl: data.imageUrl,
          imagePrompt: data.prompt,
        });
      }
    } catch (err) {
      appendMessage({
        id: uid(),
        role: "assistant",
        text: getCallableErrorMessage(err),
        error: true,
      });
    } finally {
      setLoading(false);
    }
  };

  const onKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    e.stopPropagation();
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      void handleSubmit();
    }
  };

  const closeAssistant = () => {
    setOpen(false);
    try {
      sessionStorage.setItem("ai-assistant-dismissed", "1");
    } catch {
      /* ignore */
    }
  };

  const ui = (
    <div
      className={`ai-assistant ${open ? "ai-assistant--open" : ""}`}
      aria-live="polite"
    >
      <div className="ai-assistant__dock">
        <section
          id="ai-assistant-panel"
          className={`ai-assistant__panel ${open ? "ai-assistant__panel--open" : ""}`}
          role="dialog"
          aria-modal="false"
          aria-label="Edward Night AI assistant"
          aria-hidden={!open}
        >
          <header className="ai-assistant__header">
            <div className="ai-assistant__brand">
              <span className="ai-assistant__avatar" aria-hidden>
                EN
              </span>
              <div>
                <p className="ai-assistant__eyebrow">Portfolio assistant</p>
                <h2 className="ai-assistant__title">Edward Night</h2>
              </div>
            </div>
            <button
              type="button"
              className="ai-assistant__close"
            onClick={closeAssistant}
            aria-label="Close assistant"
          >
            ×
          </button>
          </header>

          <div className="ai-assistant__modes" role="tablist">
            <button
              type="button"
              role="tab"
              aria-selected={mode === "chat"}
              className={`ai-assistant__mode ${mode === "chat" ? "ai-assistant__mode--active" : ""}`}
              onClick={() => setMode("chat")}
            >
              Ask
            </button>
            <button
              type="button"
              role="tab"
              aria-selected={mode === "image"}
              className={`ai-assistant__mode ${mode === "image" ? "ai-assistant__mode--active" : ""}`}
              onClick={() => setMode("image")}
            >
              Image
            </button>
          </div>

          <div className="ai-assistant__messages" ref={listRef}>
            {messages.map((msg) => (
              <article
                key={msg.id}
                className={`ai-assistant__bubble ai-assistant__bubble--${msg.role} ${msg.error ? "ai-assistant__bubble--error" : ""}`}
              >
                {msg.text && <p>{msg.text}</p>}
                {msg.imageUrl && (
                  <figure className="ai-assistant__figure">
                    <img
                      src={msg.imageUrl}
                      alt={msg.imagePrompt ?? "Generated concept"}
                      loading="lazy"
                    />
                  </figure>
                )}
              </article>
            ))}
            {loading && (
              <article className="ai-assistant__bubble ai-assistant__bubble--assistant ai-assistant__bubble--loading">
                <span className="ai-assistant__dots" aria-hidden>
                  <span />
                  <span />
                  <span />
                </span>
                <span className="visually-hidden">Assistant is thinking</span>
              </article>
            )}
          </div>

          <footer className="ai-assistant__composer">
            <label className="visually-hidden" htmlFor="ai-assistant-input">
              {mode === "chat" ? "Your question" : "Image prompt"}
            </label>
            <textarea
              id="ai-assistant-input"
              ref={inputRef}
              rows={2}
              placeholder={
                mode === "chat"
                  ? "Ask about skills, stack, projects…"
                  : "Describe a visual concept…"
              }
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={onKeyDown}
              disabled={loading}
            />
            <button
              type="button"
              className="ai-assistant__send"
              onClick={() => void handleSubmit()}
              disabled={loading || !input.trim()}
              aria-label="Send message"
            >
              <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden>
                <path
                  fill="currentColor"
                  d="M3.4 20.6 21 12 3.4 3.4l1.8 7.2L17 12l-11.8 1.4-1.8 7.2z"
                />
              </svg>
            </button>
          </footer>
        </section>

        <button
          type="button"
          className={`ai-assistant__fab ${open ? "ai-assistant__fab--open" : ""}`}
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          aria-controls="ai-assistant-panel"
          aria-label={open ? "Close assistant" : "Open Edward Night assistant"}
        >
          <span className="ai-assistant__fab-ring" aria-hidden />
          {!open && <span className="ai-assistant__fab-label">Ask AI</span>}
          <span className="ai-assistant__fab-icon" aria-hidden>
            {open ? (
              <svg
                viewBox="0 0 24 24"
                width="22"
                height="22"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
              >
                <path d="M6 6l12 12M18 6 6 18" />
              </svg>
            ) : (
              <svg viewBox="0 0 24 24" width="22" height="22" fill="currentColor">
                <path d="M20 2H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h4l4 4 4-4h4a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2Zm0 14H8l-2.5 2.5L8 18H4V4h16v12Z" />
              </svg>
            )}
          </span>
        </button>
      </div>
    </div>
  );

  return createPortal(ui, document.body);
}
