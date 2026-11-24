const minimumLength = 200;
const studentCount = 2;
const labels = { pending: '선택 전', draft: '작성 중', skipped: '미작성', complete: '완료' };
const initial = () => ({ stage: 'pending', text: '' });

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

const example = '오늘 수업에서는 두 분수의 분모를 같게 만든 뒤 크기를 비교하는 방법을 연습했습니다. 처음에는 분모를 곱한 뒤 분자를 그대로 두었지만, 그림으로 분수의 크기를 확인하면서 분자에도 같은 수를 곱해야 하는 이유를 설명할 수 있었습니다. 다음 수업 전에는 교재의 연습 문제 세 개를 풀고, 분모를 어떻게 맞췄는지 풀이 옆에 적어 보세요. 틀린 문제는 정답을 바로 확인하기보다 그림을 그려 두 분수의 크기를 비교한 뒤 풀이를 다시 점검하면 좋겠습니다.';

if (typeof document !== 'undefined') {
  const root = document.querySelector('[data-feedback-demo]');
  if (root) setup(root);
}

function setup(root) {
  const students = Array.from({ length: studentCount }, initial);
  const stateList = root.querySelector('.states');
  const editor = root.querySelector('.editor');
  const text = root.querySelector('textarea');
  const count = root.querySelector('#feedback-count');
  const status = root.querySelector('.demo-status');
  const start = root.querySelector('[data-action="start"]');
  const skip = root.querySelector('[data-action="skip"]');
  const drafts = students.map(() => null);
  let selected = 0;
  let editingComplete = false;

  function updateCount() {
    count.textContent = text.value.trim().length + ' / ' + minimumLength + '자';
  }

  function render() {
    const state = students[selected];
    stateList.replaceChildren(...students.map((student, index) => {
      const entry = document.createElement('li');
      entry.textContent = '학생 ' + String.fromCharCode(65 + index) + ' · ' + labels[student.stage];
      entry.dataset.stage = student.stage;
      return entry;
    }));
    editor.hidden = state.stage !== 'draft' && !editingComplete;
    start.textContent = state.stage === 'complete' ? '피드백 수정' : '작성 선택';
    skip.setAttribute('aria-disabled', String(state.stage === 'complete'));
    text.value = drafts[selected] ?? state.text;
    updateCount();
  }

  root.addEventListener('change', (event) => {
    if (event.target.name !== 'student') return;
    selected = Number(event.target.value);
    editingComplete = false;
    status.textContent = '';
    render();
  });

  text.addEventListener('input', () => {
    drafts[selected] = text.value;
    updateCount();
  });

  root.addEventListener('click', (event) => {
    const action = event.target.closest('button')?.dataset.action;
    if (!action) return;
    const state = students[selected];
    status.textContent = '';

    switch (action) {
      case 'start':
        editingComplete = state.stage === 'complete';
        students[selected] = transition(state, 'start');
        render();
        text.focus();
        return;
      case 'skip':
        if (state.stage === 'complete') {
          status.textContent = '완료된 피드백은 미작성으로 변경할 수 없습니다.';
          return;
        }
        students[selected] = transition(state, 'skip');
        drafts[selected] = null;
        status.textContent = '선택한 학생을 미작성으로 표시했습니다.';
        break;
      case 'skipAll':
        students.forEach((student, index) => {
          students[index] = transition(student, 'skip');
          if (student.stage !== 'complete') drafts[index] = null;
        });
        editingComplete = false;
        status.textContent = students.some((student) => student.stage === 'complete')
          ? '완료된 피드백은 유지하고, 나머지 학생을 미작성으로 표시했습니다.'
          : '모든 학생을 미작성으로 표시했습니다.';
        break;
      case 'fill':
        drafts[selected] = example;
        break;
      case 'save': {
        const next = transition(state, 'save', text.value);
        if (next === state) {
          status.textContent = '피드백을 200자 이상 입력하세요.';
          text.focus();
          return;
        }
        students[selected] = next;
        drafts[selected] = null;
        editingComplete = false;
        status.textContent = '피드백이 저장되었습니다.';
        render();
        start.focus();
        return;
      }
      default:
        return;
    }
    render();
  });

  render();
  root.hidden = false;
}
