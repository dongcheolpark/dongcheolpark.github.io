import { useRef, useState } from 'react';
import { createRoot } from 'react-dom/client';
import { minimumLength, transition } from './feedback-state.mjs';

const studentNames = ['학생 A', '학생 B'];
const labels = { pending: '선택 전', draft: '작성 중', skipped: '미작성', complete: '완료' };
const example = '오늘 수업에서는 두 분수의 분모를 같게 만든 뒤 크기를 비교하는 방법을 연습했습니다. 처음에는 분모를 곱한 뒤 분자를 그대로 두었지만, 그림으로 분수의 크기를 확인하면서 분자에도 같은 수를 곱해야 하는 이유를 설명할 수 있었습니다. 다음 수업 전에는 교재의 연습 문제 세 개를 풀고, 분모를 어떻게 맞췄는지 풀이 옆에 적어 보세요. 틀린 문제는 정답을 바로 확인하기보다 그림을 그려 두 분수의 크기를 비교한 뒤 풀이를 다시 점검하면 좋겠습니다.';

function skipStudent(student) {
  const feedback = transition(student.feedback, 'skip');
  return feedback === student.feedback ? student : { feedback, draft: null };
}

function FeedbackDemo() {
  const [students, setStudents] = useState(() =>
    studentNames.map(() => ({ feedback: { stage: 'pending', text: '' }, draft: null }))
  );
  const [selected, setSelected] = useState(0);
  const [editingComplete, setEditingComplete] = useState(false);
  const [status, setStatus] = useState('');
  const editor = useRef(null);
  const startButton = useRef(null);

  const student = students[selected];
  const complete = student.feedback.stage === 'complete';
  const showEditor = student.feedback.stage === 'draft' || editingComplete;
  const text = student.draft ?? student.feedback.text;

  function updateStudent(update) {
    setStudents((current) => current.map((entry, index) =>
      index === selected ? update(entry) : entry
    ));
  }

  function selectStudent(index) {
    setSelected(index);
    setEditingComplete(false);
    setStatus('');
  }

  function startEditing() {
    setStatus('');
    setEditingComplete(complete);
    updateStudent((entry) => ({ ...entry, feedback: transition(entry.feedback, 'start') }));
    requestAnimationFrame(() => editor.current?.focus());
  }

  function skip() {
    if (complete) {
      setStatus('완료된 피드백은 미작성으로 변경할 수 없습니다.');
      return;
    }
    updateStudent(skipStudent);
    setStatus('선택한 학생을 미작성으로 표시했습니다.');
  }

  function skipAll() {
    setStudents((current) => current.map(skipStudent));
    setEditingComplete(false);
    setStatus(students.some((entry) => entry.feedback.stage === 'complete')
      ? '완료된 피드백은 유지하고, 나머지 학생을 미작성으로 표시했습니다.'
      : '모든 학생을 미작성으로 표시했습니다.');
  }

  function save() {
    const feedback = transition(student.feedback, 'save', text);
    if (feedback === student.feedback) {
      setStatus('피드백을 200자 이상 입력하세요.');
      editor.current?.focus();
      return;
    }
    updateStudent(() => ({ feedback, draft: null }));
    setEditingComplete(false);
    setStatus('피드백이 저장되었습니다.');
    startButton.current?.focus();
  }

  return (
    <div className="demo">
      <p className="demo-intro">학생을 바꿔 피드백을 작성하고, 전체 미작성을 적용해 완료 항목이 유지되는지 확인할 수 있습니다.</p>
      <fieldset className="student-switch">
        <legend>학생 선택</legend>
        {studentNames.map((name, index) => (
          <label key={name}>
            <input type="radio" name="student" value={index} checked={selected === index} onChange={() => selectStudent(index)} />
            {' '}{name}
          </label>
        ))}
      </fieldset>
      <ul className="states" aria-label="학생 상태">
        {students.map(({ feedback }, index) => (
          <li key={studentNames[index]} data-stage={feedback.stage}>
            {studentNames[index]} · {labels[feedback.stage]}
          </li>
        ))}
      </ul>
      <div className="demo-actions">
        <button type="button" ref={startButton} onClick={startEditing}>{complete ? '피드백 수정' : '작성 선택'}</button>
        <button type="button" aria-disabled={complete} onClick={skip}>미작성 선택</button>
        <button type="button" onClick={skipAll}>전체 미작성</button>
      </div>
      <div className="editor" hidden={!showEditor}>
        <label htmlFor="feedback-text">피드백 내용</label>
        <textarea
          id="feedback-text"
          ref={editor}
          rows={4}
          aria-describedby="feedback-count"
          value={text}
          onChange={(event) => {
            const draft = event.currentTarget.value;
            updateStudent((entry) => ({ ...entry, draft }));
          }}
        />
        <div className="editor-meta">
          <button type="button" onClick={() => {
            updateStudent((entry) => ({ ...entry, draft: example }));
            setStatus('');
          }}>예시 채우기</button>
          <span id="feedback-count">{text.trim().length} / {minimumLength}자</span>
        </div>
        <div className="demo-actions">
          <button className="save" type="button" onClick={save}>저장</button>
        </div>
      </div>
      <p className="demo-status" role="status">{status}</p>
    </div>
  );
}

const root = document.getElementById('feedback-demo');
createRoot(root).render(<FeedbackDemo />);
