/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect } from "react"

type chatbotProps = {
    name: string
    transcriptPath: string
    host: string
}

export default function GuestChatbot({ name, transcriptPath, host }: chatbotProps) {
    console.log(transcriptPath)
    useEffect(() => {
        const existing = document.getElementById("n8n-chat")
        if (existing) return;

        async function trigger() {
            const res = await fetch(transcriptPath);
            const text = await res.text();

            // ── 1. Store data on window so the injected script can read it safely ──
            (window as any).__cyberWinsName = name;
            (window as any).__cyberWinsHost = host;
            (window as any).__cyberWinsTranscript = text;

            // ── 2. Container ──────────────────────────────────────────────
            const container = document.createElement("div")
            container.id = "n8n-chat"
            document.body.appendChild(container)

            // ── 3. n8n chat styles ────────────────────────────────────────
            const styleLink = document.createElement("link")
            styleLink.href = "https://cdn.jsdelivr.net/npm/@n8n/chat/dist/style.css"
            styleLink.rel = "stylesheet"
            document.head.appendChild(styleLink)

            // ── 4. Google Fonts ───────────────────────────────────────────
            const fontLink = document.createElement("link")
            fontLink.href = "https://fonts.googleapis.com/css2?family=Roboto:wght@400;700&family=Lora:wght@400;500&family=Montserrat:wght@600&display=swap"
            fontLink.rel = "stylesheet"
            document.head.appendChild(fontLink)

            // ── 5. Brand + chat styles ────────────────────────────────────
            const brandStyle = document.createElement("style")
            brandStyle.id = "cyber-brand-style"
            brandStyle.textContent = `
      :root {
        --cyber--primary: #90027D;
        --cyber--secondary: #C23BD4;
        --cyber--surface: #FEFEFE;
        --cyber--dark: #1A1A2E;
        --cyber--text: #1A1A2E;

        --chat--color-primary: var(--cyber--primary);
        --chat--color-secondary: var(--cyber--secondary);
        --chat--color-heading: var(--cyber--text);

        --chat--font-family: 'Lora', serif;
        --chat--heading-font-family: 'Montserrat', sans-serif;
        --chat--spacing: 1.25rem;
        --chat--border-radius: 12px;
        --chat--message--font-size: 1rem;
        --chat--message-line-height: 1.6;
        --chat--heading--font-size: 1.5rem;
        --chat--subtitle--font-size: 1rem;

        --chat--header--background: var(--cyber--surface);
        --chat--header--color: var(--chat--color-heading);
        --chat--toggle--background: var(--chat--color-primary);
        --chat--toggle--hover--background: #b003a0;
        --chat--toggle--active--background: var(--cyber--secondary);
        --chat--toggle--color: #ffffff;
        --chat--toggle--size: 56px;

        --chat--message--user--background: var(--cyber--primary);
        --chat--message--user--color: #ffffff;
        --chat--message--bot--background: #f0e6f5;
        --chat--message--bot--color: var(--chat--color-heading);

        --page--background: var(--cyber--surface);
        --page--text: var(--cyber--text);
      }

      html, body, .n8n-chat-widget *, .n8n-chat-widget {
        font-family: var(--chat--font-family) !important;
        font-weight: 400 !important;
        color: var(--page--text) !important;
      }

      .n8n-chat-widget h1,
      .n8n-chat-widget h2,
      .n8n-chat-widget h3,
      .n8n-chat-widget .chat-header__title {
        font-family: var(--chat--heading-font-family) !important;
        font-weight: 600 !important;
        color: var(--chat--color-heading) !important;
      }

      .n8n-chat-widget .chat-header {
        background: var(--chat--header--background) !important;
        color: var(--chat--header--color) !important;
      }

      .n8n-chat-widget .chat-toggle {
        background: var(--chat--toggle--background) !important;
        color: var(--chat--toggle--color) !important;
        width: var(--chat--toggle--size) !important;
        height: var(--chat--toggle--size) !important;
      }

      .n8n-chat-widget .message--user {
        background: var(--chat--message--user--background) !important;
        color: var(--chat--message--user--color) !important;
      }

      .n8n-chat-widget .message--bot {
        background: var(--chat--message--bot--background) !important;
        color: var(--chat--message--bot--color) !important;
      }

      n8n-chat {
        position: fixed !important;
        bottom: 20px !important;
        right: 20px !important;
        z-index: 9999 !important;
      }

      #n8n-chat .n8n-chat-widget,
      .n8n-chat-widget {
        direction: ltr !important;
        unicode-bidi: isolate !important;
      }

      .n8n-chat-widget .chat-footer,
      .n8n-chat-widget .chat-input,
      .n8n-chat-widget .message-input,
      .n8n-chat-widget .chat-input__row,
      .n8n-chat-widget .chat-input__actions {
        display: flex !important;
        align-items: center !important;
        gap: 8px !important;
      }

      .n8n-chat-widget textarea,
      .n8n-chat-widget input[type="text"],
      .n8n-chat-widget .chat-input__textarea {
        flex: 1 1 auto !important;
        min-width: 0 !important;
      }

      .n8n-chat-widget .chat-input__actions,
      .n8n-chat-widget button[type="submit"],
      .n8n-chat-widget button[aria-label="Send"],
      .n8n-chat-widget .send-button {
        margin-left: auto !important;
        order: 2 !important;
      }

      .n8n-chat-widget .chat-input .left-icon,
      .n8n-chat-widget .chat-input__left {
        order: 0 !important;
        margin-right: 8px !important;
      }

      @media (max-width: 600px) {
        .n8n-chat-widget .chat-toggle {
          width: 48px !important;
          height: 48px !important;
        }
      }
    `
            document.head.appendChild(brandStyle)

            // ── 6. Chat init script ───────────────────────────────────────
            // NOTE: No dynamic values are interpolated into this string.
            // All runtime data is read from window globals set above.
            const script = document.createElement("script")
            script.type = "module"
            script.innerHTML = `
      try {
        import('https://cdn.jsdelivr.net/npm/@n8n/chat/dist/chat.bundle.es.js').then(({ createChat }) => {
          const guestName = window.__cyberWinsName;
          const guestHost = window.__cyberWinsHost;
          const transcript = window.__cyberWinsTranscript;

          createChat({
            webhookUrl: 'https://automations.manymangoes.com.au/webhook/517ebaa3-16fc-4ef4-b2e5-6f7bb2794acb/chat',
            containerId: 'n8n-chat',
            botName: 'Cyber Wins Assistant',
            target: '#n8n-chat',
            mode: 'window',
            showWelcomeScreen: false,
            loadPreviousSession: false,
            metadata: {
              guest: guestName,
              host: guestHost,
              transcript: transcript
            },
            initialMessages: [
              'Hi there! 👋',
              'Welcome to Cyber Wins Podcast! Ask me anything about our conversation with ' + guestName
            ],
            i18n: {
              en: {
                title: 'Cyber Wins Assistant 👋',
                subtitle: 'Ready to Score Your Next Win?',
                getStarted: 'Start Chat',
                inputPlaceholder: 'Type your message...',
              },
            },
            theme: {
              primary: '#90027D',
              secondary: '#C23BD4',
              heading: '#1A1A2E',
              cta: '#90027D'
            }
          });

          const poll = setInterval(() => {
            try {
              const host = document.querySelector('n8n-chat');
              if (!host) return;
              const shadow = host.shadowRoot;
              if (!shadow) return;

              if (!shadow.getElementById('cyber-injected-style')) {
                const s = document.createElement('style');
                s.id = 'cyber-injected-style';
                s.textContent = \`
                  :host { direction: ltr !important; unicode-bidi: isolate !important; }

                  .chat-footer,
                  .chat-input,
                  .message-input,
                  .chat-input__row,
                  .chat-input__actions {
                    display: flex !important;
                    align-items: center !important;
                    gap: 8px !important;
                  }

                  textarea,
                  input[type="text"],
                  .chat-input__textarea {
                    flex: 1 1 auto !important;
                    min-width: 0 !important;
                  }

                  .chat-input__actions,
                  button[type="submit"],
                  button[aria-label="Send"],
                  .send-button {
                    margin-left: auto !important;
                    order: 2 !important;
                  }

                  .chat-input .left-icon,
                  .chat-input__left {
                    order: 0 !important;
                    margin-right: 8px !important;
                  }
                \`;
                shadow.appendChild(s);
              }

              const powered = shadow.querySelector('.chat-powered-by, .powered-by, .chat-footer__powered');
              if (powered) powered.remove();

              host.setAttribute('dir', 'ltr');

              clearInterval(poll);
            } catch (e) {
              console.warn('chat widget customization failed:', e);
            }
          }, 200);

          setTimeout(() => clearInterval(poll), 10000);
        });
      } catch (err) {
        console.error('Failed to load n8n chat widget', err);
      }
    `
            document.body.appendChild(script)

            return () => {
                container.remove()
                script.remove()
                styleLink.remove()
                fontLink.remove()
                brandStyle.remove()
                delete (window as any).__cyberWinsName;
                delete (window as any).__cyberWinsHost;
                delete (window as any).__cyberWinsTranscript;
            }
        }
        trigger()

    }, [host, name, transcriptPath])

    return null
}