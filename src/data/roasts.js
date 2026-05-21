export const ROAST_BANK = {
  1: [
    "you said you'd 'check your calendar' six days ago.",
    "the read receipt is doing more work than you are.",
    "she's not waiting forever, hero.",
    "'we should hang soon' is not a date.",
    "your dating life has a buffering wheel.",
  ],
  2: [
    "she is literally free. you are literally scared.",
    "three dots. seven minutes. then nothing. classic.",
    "the calendar is open. the boy is closed.",
    "'this week is crazy' she heard that on monday.",
    "you're losing to a tuesday.",
  ],
  3: [
    "she's about to unmatch and write a memoir.",
    "your group chat is staging an intervention.",
    "she's not 'busy', she just stopped caring.",
    "you have the audacity. you don't have the calendar.",
    "this is how it ends. with a 'haha yeah lets!' and no plan.",
  ],
  4: [
    "she's texting a man with a job and a Google Calendar.",
    "you typed 'lmk' instead of a time.",
    "this is embarrassing for your bloodline.",
    "the bar would've worked. the park would've worked. you picked neither.",
    "you are the reason she has a therapist.",
  ],
  5: [
    "she's matching with someone right now. yes, right now.",
    "you are the cautionary tale at her bachelorette.",
    "DELETE THE APP. RETURN TO THE FOREST.",
    "you fumbled. it is over. the fumble is complete.",
    "she's going to marry the guy who said 'friday 7pm'. it could've been you.",
  ],
};

export function pickRoast(intensity, seed = 0) {
  const tier = ROAST_BANK[Math.max(1, Math.min(5, intensity))];
  return tier[seed % tier.length];
}
