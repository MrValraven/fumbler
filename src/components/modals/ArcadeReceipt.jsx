import { useEffect } from 'react';
import { sfxFanfare } from '../../audio/audioEngine.js';

export function ArcadeReceipt({ name, intensity, onClose }) {
  useEffect(() => {
    sfxFanfare();
  }, []);

  const stamp = name ? name.toUpperCase() : 'PLAYER 1';
  const receiptNo = 4000 + Math.floor(Math.random() * 999);
  const stars = '★'.repeat(intensity) + '☆'.repeat(5 - intensity);
  const now = new Date();
  const dateStr = now.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }).toUpperCase();
  const timeStr = now.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });

  return (
    <div className="rc-overlay" onClick={onClose}>
      <div className="rc-paper" onClick={(e) => e.stopPropagation()}>
        <div className="rc-rip rc-rip-top" />

        <div className="rc-head">
          <div className="rc-brand">★ FUMBLE INC. ★</div>
          <div className="rc-sub">DEPT. OF ROMANCE RECOVERY</div>
          <div className="rc-sub">1-800-LOCK-IN-NOW</div>
        </div>

        <div className="rc-divider">- - - - - - - - - - - - - - - - - - -</div>

        <div className="rc-row"><span>RECEIPT #</span><span>{receiptNo}</span></div>
        <div className="rc-row"><span>DATE</span><span>{dateStr}</span></div>
        <div className="rc-row"><span>TIME</span><span>{timeStr}</span></div>
        <div className="rc-row"><span>CASHIER</span><span>RIZZ_BOT_07</span></div>
        <div className="rc-row"><span>CUSTOMER</span><span>{stamp}</span></div>

        <div className="rc-divider">- - - - - - - - - - - - - - - - - - -</div>

        <div className="rc-status">▼ FUMBLE PREVENTED ▼</div>
        <div className="rc-stars">{stars}</div>

        <div className="rc-divider">- - - - - - - - - - - - - - - - - - -</div>

        <div className="rc-items">
          <div className="rc-item"><span>1x RIZZ ACTIVATED</span><span>$00.00</span></div>
          <div className="rc-item"><span>1x EGO RESTORED</span><span>$00.00</span></div>
          <div className="rc-item"><span>1x BADDIE RETAINED</span><span>$00.00</span></div>
          <div className="rc-item"><span>1x DATE LOCKED</span><span>$00.00</span></div>
          <div className="rc-item"><span>1x CALENDAR USED</span><span>$00.01</span></div>
        </div>

        <div className="rc-divider">- - - - - - - - - - - - - - - - - - -</div>

        <div className="rc-totals">
          <div className="rc-row"><span>SUBTOTAL</span><span>$00.01</span></div>
          <div className="rc-row"><span>TAX</span><span>$00.00</span></div>
          <div className="rc-row rc-total"><span>TOTAL</span><span>A FUTURE</span></div>
        </div>

        <div className="rc-divider">- - - - - - - - - - - - - - - - - - -</div>

        <div className="rc-footer">
          <div>★ THANK YOU FOR NOT FUMBLING ★</div>
          <div className="rc-tiny">all sales final · no refunds on rizz</div>
          <div className="rc-tiny">if she texts back, smile</div>
        </div>

        <div className="rc-barcode">
          {Array.from({ length: 48 }).map((_, i) => (
            <div key={i} className="rc-bar" style={{ width: `${1 + (i * 7919) % 4}px` }} />
          ))}
        </div>
        <div className="rc-barcode-no">
          *FBL{receiptNo}{intensity}{Math.floor(Math.random() * 9)}*
        </div>

        <div className="rc-rip rc-rip-bot" />

        <button className="rc-close" onClick={(e) => { e.stopPropagation(); onClose(); }}>
          [ tear receipt ]
        </button>
      </div>
    </div>
  );
}
