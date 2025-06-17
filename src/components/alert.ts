export default class WAlert extends HTMLElement {
  shadow: ShadowRoot;
  type: AlertType = "info";
  timeout: number | null = null;

  styles: Record<AlertType, {bg: string; border: string; color: string}> = {
    success: {bg: "#ECFDF5", border: "#10B981", color: "#065F46"},
    error: {bg: "#FEF2F2", border: "#EF4444", color: "#991B1B"},
    warning: {bg: "#FFFBEB", border: "#F59E0B", color: "#92400E"},
    info: {bg: "#EFF6FF", border: "#3B82F6", color: "#1E3A8A"},
  };

  constructor() {
    super();
    this.shadow = this.attachShadow({mode: "open"});
  }

  static get observedAttributes() {
    return ["type", "timeout"];
  }

  connectedCallback() {
    this.render();

    const timeoutAttr = this.getAttribute("timeout");
    if (timeoutAttr) {
      const ms = parseInt(timeoutAttr);
      if (!isNaN(ms)) {
        setTimeout(() => this.remove(), ms);
      }
    }
  }

  attributeChangedCallback(name: string, _: string, newValue: string) {
    if (name === "type" && newValue in this.styles) {
      this.type = newValue as AlertType;
    }
    if (name === "timeout") {
      this.timeout = parseInt(newValue);
    }
    this.render();
  }

  render() {
    const {bg, border, color} = this.styles[this.type];

    this.shadow.innerHTML = `
      <style>
        * {
          box-sizing: border-box;
        }

        .alert {
          position: relative;
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 1rem 1.25rem;
          padding-left: 1.5rem;
          margin: 0.75rem 0;
          background-color: ${bg};
          color: ${color};
          border-radius: 0.5rem;
          font-family: "Segoe UI", Roboto, sans-serif;
          font-size: 0.95rem;
          box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
        }

        .alert::before {
          content: "";
          position: absolute;
          left: 0;
          top: 0;
          height: 100%;
          width: 0.35rem;
          background-color: ${border};
          border-top-left-radius: 0.5rem;
          border-bottom-left-radius: 0.5rem;
        }

        .alert-content {
          flex: 1;
          padding-right: 1rem;
        }

        .close-btn {
          background-color: transparent;
          border: none;
          color: ${color};
          font-size: 1.2rem;
          cursor: pointer;
          padding: 0.2rem 0.4rem;
          margin-left: 0.5rem;
          line-height: 1;
          border-radius: 0.25rem;
          transition: background-color 0.2s ease;
        }

        .close-btn:hover {
          background-color: rgba(0, 0, 0, 0.05);
        }

        ::slotted(strong) {
          font-weight: 600;
        }
      </style>

      <div class="alert" role="alert">
        <div class="alert-content">
          <slot></slot>
        </div>
        <button class="close-btn" aria-label="Dismiss alert" title="Dismiss alert">✕</button>
      </div>
    `;

    this.shadow.querySelector(".close-btn")?.addEventListener("click", () => this.remove());
  }
}

type AlertType = "success" | "error" | "warning" | "info";
