/**
 * Inline SVG payment + trust icons. No external requests, no tracking.
 */

const STROKE = "currentColor";

export function VisaIcon({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 48 32" className={className} aria-label="Visa" role="img">
      <rect width="48" height="32" rx="4" fill="none" stroke={STROKE} strokeWidth="1.2" />
      <text
        x="24"
        y="20"
        textAnchor="middle"
        fontFamily="Georgia, serif"
        fontWeight="700"
        fontSize="11"
        fill={STROKE}
        letterSpacing="2"
      >
        VISA
      </text>
    </svg>
  );
}

export function MastercardIcon({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 48 32" className={className} aria-label="Mastercard" role="img">
      <rect width="48" height="32" rx="4" fill="none" stroke={STROKE} strokeWidth="1.2" />
      <circle cx="20" cy="16" r="6" fill="#eb001b" opacity="0.85" />
      <circle cx="28" cy="16" r="6" fill="#f79e1b" opacity="0.85" />
    </svg>
  );
}

export function AmexIcon({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 48 32" className={className} aria-label="American Express" role="img">
      <rect width="48" height="32" rx="4" fill="#2e77bb" />
      <text
        x="24"
        y="14"
        textAnchor="middle"
        fontFamily="Helvetica, Arial, sans-serif"
        fontWeight="800"
        fontSize="7"
        fill="white"
      >
        AMERICAN
      </text>
      <text
        x="24"
        y="23"
        textAnchor="middle"
        fontFamily="Helvetica, Arial, sans-serif"
        fontWeight="800"
        fontSize="7"
        fill="white"
      >
        EXPRESS
      </text>
    </svg>
  );
}

export function PayPalIcon({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 48 32" className={className} aria-label="PayPal" role="img">
      <rect width="48" height="32" rx="4" fill="none" stroke={STROKE} strokeWidth="1.2" />
      <text
        x="24"
        y="20"
        textAnchor="middle"
        fontFamily="Georgia, serif"
        fontStyle="italic"
        fontWeight="700"
        fontSize="11"
        fill={STROKE}
      >
        PayPal
      </text>
    </svg>
  );
}

export function KlarnaIcon({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 48 32" className={className} aria-label="Klarna" role="img">
      <rect width="48" height="32" rx="4" fill="#ffa8cd" />
      <text
        x="24"
        y="20"
        textAnchor="middle"
        fontFamily="Helvetica, Arial, sans-serif"
        fontWeight="800"
        fontSize="11"
        fill="white"
        letterSpacing="1"
      >
        Klarna.
      </text>
    </svg>
  );
}

export function LockIcon({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true">
      <path
        d="M6 10V8a6 6 0 1112 0v2M5 10h14a1 1 0 011 1v9a1 1 0 01-1 1H5a1 1 0 01-1-1v-9a1 1 0 011-1z"
        fill="none"
        stroke={STROKE}
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function TruckIcon({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true">
      <path
        d="M3 6h11v10H3zM14 9h4l3 3v4h-7M7.5 18a1.5 1.5 0 100-3 1.5 1.5 0 000 3zM17.5 18a1.5 1.5 0 100-3 1.5 1.5 0 000 3z"
        fill="none"
        stroke={STROKE}
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function RefreshIcon({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true">
      <path
        d="M21 12a9 9 0 11-3-6.7L21 8M21 3v5h-5"
        fill="none"
        stroke={STROKE}
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function PaymentIcons({ className = "" }: { className?: string }) {
  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <VisaIcon className="h-6 w-9 text-ink/70" />
      <MastercardIcon className="h-6 w-9 text-ink/70" />
      <AmexIcon className="h-6 w-9" />
      <PayPalIcon className="h-6 w-9 text-ink/70" />
      <KlarnaIcon className="h-6 w-9" />
    </div>
  );
}
