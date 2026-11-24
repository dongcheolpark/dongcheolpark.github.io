export const minimumLength = 200;

export function transition(state, action, text = '') {
  switch (action) {
    case 'start':
      return state.stage === 'complete' ? state : { ...state, stage: 'draft' };
    case 'skip':
      return state.stage === 'complete' ? state : { stage: 'skipped', text: '' };
    case 'save':
      if (!['draft', 'complete'].includes(state.stage) || text.trim().length < minimumLength) {
        return state;
      }
      return { stage: 'complete', text: text.trim() };
    default:
      return state;
  }
}
