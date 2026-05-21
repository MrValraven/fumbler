export const HER_COPY = {
  subtitle: { l1: "he thinks he's about to", l2: 'fumble you. confirm?' },
  noticeTitle: 'INCOMING FUMBLE:',
  fields: { timer: 'PATIENCE:', loc: 'EFFORT:', time: 'PLANS:', resched: 'CHEMISTRY:' },
  values: { loc: 'nonexistent', time: 'never proposed', resched: 'flatlining' },
  primary: 'Y',
  secondary: 'N',
  gameOver: 'INSPECT QUEUE',
};

export const HIM_COPY = {
  subtitle: { l1: "you're about to", l2: 'fumble a baddie!' },
  noticeTitle: 'SYSTEM NOTICE:',
  fields: { timer: 'DATE TIMER:', loc: 'LOCATION:', time: 'TIME:', resched: 'ATTEMPTS TO RESCHEDULE:' },
  values: { loc: 'missing', time: 'missing', resched: 'not found' },
  primary: 'lock in',
  secondary: 'log out',
  gameOver: 'GAME OVER!',
};

export function getCopy(mode) {
  return mode === 'her' ? HER_COPY : HIM_COPY;
}

export function getViewMode() {
  if (typeof window === 'undefined') return 'him';
  const p = new URLSearchParams(window.location.search);
  const v = p.get('as');
  return v === 'her' ? 'her' : v === 'them' ? 'them' : 'him';
}
