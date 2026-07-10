# To-Do List 기능 명세서 — `todo.js` vs `Todo.tsx` 비교

## 1. 기능 명세 (동일 요구사항)

| ID | 기능 | 설명 | todo.js | Todo.tsx |
|----|------|------|---------|----------|
| F-01 | 할 일 추가 | 입력 후 추가 버튼 또는 Enter로 목록에 추가 | ✅ | ✅ |
| F-02 | 빈 값 방지 | 공백만 입력 시 추가하지 않음 | ✅ | ✅ |
| F-03 | 할 일 표시 | 목록에 텍스트와 완료 버튼 표시 | ✅ | ✅ |
| F-04 | 완료(삭제) | 완료 버튼 클릭 시 해당 항목 제거 | ✅ | ✅ |
| F-05 | 입력창 초기화 | 추가 후 입력창 비우기 | ✅ | ✅ |
| F-06 | 고유 식별 | 각 항목에 `id` 부여 (`Date.now()`) | ✅ | ✅ |

**데이터 구조 (공통)**

```typescript
{
  id: number;
  text: string;
  done: boolean;
}
```

---

## 2. 파일 구성 비교

| 구분 | todo.js (바닐라 JS) | Todo.tsx (React + TS) |
|------|---------------------|------------------------|
| UI | `index.html` (정적 HTML) | `Todo.tsx` (JSX) |
| 로직 | `todo.js` | `Todo.tsx` |
| 스타일 | `todo.css` | `todo.css` (동일 클래스명) |
| 실행 | 브라우저에서 HTML 직접 열기 | React 빌드 환경 필요 |
| 코드량 | JS 72줄 + HTML 26줄 | TSX 63줄 (UI+로직 통합) |

---

## 3. 아키텍처 비교

### 3.1 todo.js — 수동 DOM 동기화

```
[데이터 todos] ──push/filter──▶ [renderTodos()] ──innerHTML──▶ [DOM]
                                      ▲
[이벤트] ──querySelector/closest/data-id──┘
```

**흐름**

1. `DOMContentLoaded` 후 DOM 요소를 `querySelector`로 찾음
2. 데이터 변경 (`push`, `filter`)
3. `renderTodos()`를 **직접 호출**해 화면 갱신
4. 이벤트는 `form submit`, `ul click`(이벤트 위임)으로 처리

### 3.2 Todo.tsx — 선언적 UI + 자동 렌더링

```
[상태 todos, input] ──setState──▶ [React 재렌더] ──▶ [DOM]
         ▲
[이벤트 onSubmit, onClick] ──직접 id 전달──┘
```

**흐름**

1. `useState`로 데이터·입력값 관리
2. `setTodos`, `setInput`으로 상태만 변경
3. React가 변경된 상태 기준으로 UI **자동 갱신**
4. 이벤트는 JSX에서 해당 요소에 **직접 연결**

---

## 4. 기능별 구현 대응표

### F-01 할 일 추가

| | todo.js | Todo.tsx |
|---|---------|----------|
| 트리거 | `form.addEventListener('submit')` | `<form onSubmit={handleSubmit}>` |
| 입력값 | `input.value.trim()` | `input.trim()` (state) |
| 데이터 추가 | `todos.push({...})` | `setTodos(prev => [...prev, {...}])` |
| 화면 갱신 | `renderTodos()` **수동 호출** | **자동** (setState 후) |
| 입력 초기화 | `input.value = ''` | `setInput('')` |

### F-04 완료(삭제)

| | todo.js | Todo.tsx |
|---|---------|----------|
| 트리거 | `ul` click + 이벤트 위임 | `<button onClick={() => handleDone(todo.id)}>` |
| 대상 식별 | `closest` → `data-id` → `Number()` | `todo.id` **직접 전달** |
| 데이터 삭제 | `todos = todos.filter(...)` | `setTodos(prev => prev.filter(...))` |
| 화면 갱신 | `renderTodos()` **수동 호출** | **자동** |

### F-03 목록 렌더링

| | todo.js | Todo.tsx |
|---|---------|----------|
| 방식 | `map` → HTML **문자열** → `innerHTML` | `map` → **JSX** |
| DOM 접근 | `ul.innerHTML = html` | React Virtual DOM 경유 |
| 재렌더 | 함수 호출마다 전체 교체 | 상태 변경 시 해당 부분만 갱신 |

---

## 5. todo.js의 단점 → Todo.tsx가 보완하는 방식

### 5.1 DOM과 로직의 분리·수동 연결

**JS 단점**

- HTML(`index.html`)과 JS(`todo.js`)가 분리되어 있음
- `querySelector`로 요소를 찾고, 클래스명이 맞아야 동작
- HTML 구조 변경 시 JS 선택자도 함께 수정해야 함

**TSX 보완**

- UI와 로직이 한 파일에 있음
- JSX에서 `className`, `onClick` 등을 **선언적으로** 연결
- "이 버튼을 누르면 이 함수"가 코드 위치상 바로 보임

---

### 5.2 데이터 ↔ 화면 동기화를 개발자가 직접 관리

**JS 단점**

```javascript
todos.push({...});
renderTodos();  // 빼먹으면 화면 안 바뀜
```

- 데이터 변경과 화면 갱신이 **별도 단계**
- `renderTodos()` 호출을 **매번 기억**해야 함
- 호출 누락 시 버그 발생

**TSX 보완**

```tsx
setTodos((prev) => [...prev, newTodo]);
// renderTodos() 불필요 — React가 자동 처리
```

- **상태만 바꾸면 UI가 따라옴**
- "데이터 → 화면" 파이프라인을 프레임워크가 담당

---

### 5.3 HTML 문자열로 UI 작성

**JS 단점**

```javascript
return `
    <li class="todo-item" data-id="${todo.id}">
        <p>${todo.text}</p>
        ...
    </li>
`;
ul.innerHTML = html;
```

- HTML을 **문자열**로 작성 → 따옴표·들여쓰기·XSS 주의
- 문법 하이라이트·자동완성 약함
- `innerHTML`은 기존 DOM·이벤트를 **전부 날림**

**TSX 보완**

```tsx
<li key={todo.id} className="todo-item">
    <p>{todo.text}</p>
    ...
</li>
```

- HTML과 유사한 **JSX** → 에디터 지원·가독성 좋음
- `{todo.text}`로 값 삽입 → 문자열 조합 실수 감소
- React가 DOM diff로 필요한 부분만 갱신

---

### 5.4 이벤트 처리의 간접성

**JS 단점**

```javascript
ul.addEventListener('click', (e) => {
    const doneButton = e.target.closest('.todo-done-button');
    if (!doneButton) return;
    const li = doneButton.closest('.todo-item');
    const id = Number(li.dataset.id);
    // ...
});
```

- **이벤트 위임** 패턴 이해 필요
- `closest`, `data-id`, `Number()` 등 **역추적** 단계가 많음
- "어떤 할 일"인지 DOM에서 다시 찾아야 함

**TSX 보완**

```tsx
<button onClick={() => handleDone(todo.id)}>완료</button>
```

- 클릭 시 **`todo.id`를 직접 전달**
- DOM 탐색·`data-id` 불필요
- 코드 의도가 한눈에 들어옴

---

### 5.5 입력값 관리의 이원화

**JS 단점**

```javascript
const text = input.value.trim();
// ...
input.value = '';
input.focus();
```

- 입력값은 **DOM**이 들고 있음
- JS는 DOM을 읽고·쓰는 **명령형** 코드 필요

**TSX 보완**

```tsx
const [input, setInput] = useState('');
<input value={input} onChange={(e) => setInput(e.target.value)} />
```

- 입력값도 **상태**로 관리
- DOM 직접 조작 없이 `setInput('')`으로 초기화

---

### 5.6 타입 안정성 부재 (JS) → TS 보완

**JS 단점**

- `todos` 배열 요소 형태가 **주석으로만** 설명됨
- `{ id, text, done }` 오타·누락을 **실행 전에** 잡기 어려움

**TSX 보완**

```tsx
type Todo = {
    id: number;
    text: string;
    done: boolean;
};
const [todos, setTodos] = useState<Todo[]>([]);
```

- 데이터 구조를 **타입으로 명시**
- IDE 자동완성·컴파일 시점 오류 검출

---

### 5.7 DOM 준비 시점 관리

**JS 단점**

```javascript
document.addEventListener('DOMContentLoaded', () => {
    const form = document.querySelector('.todo-form');
    // form이 null이면?
});
```

- 스크립트 위치·로드 순서에 따라 DOM 미준비 위험
- `querySelector` 결과가 `null`일 수 있음

**TSX 보완**

- 컴포넌트는 **마운트된 뒤** JSX가 DOM으로 변환
- `ref`/`querySelector` 없이도 UI 요소에 바로 이벤트 연결

---

## 6. 왜 React + TSX를 쓰는가 (요약)

| 관점 | 바닐라 JS | React + TSX |
|------|-----------|-------------|
| **사고 모델** | DOM을 직접 조작 | 상태를 바꾸면 UI가 반영 |
| **코드 패턴** | 명령형 (어떻게 그릴지) | 선언형 (무엇을 보여줄지) |
| **유지보수** | 파일·선택자·렌더 호출 분산 | 한 컴포넌트에 응집 |
| **확장** | 기능 추가 시 render/이벤트 연쇄 수정 | state·handler·JSX 추가 위주 |
| **협업/규모** | 작은 예제엔 단순 | 화면·기능이 커질수록 유리 |

**TSX를 쓰는 이유 (한 줄)**

> DOM·이벤트·렌더링을 직접 이어 붙이는 부담을 React에 맡기고, **비즈니스 로직(상태 변경)** 에만 집중하기 위해.

---

## 7. todo.js가 여전히 가치 있는 이유

React가 "편하다"고 해서 JS가 쓸모없는 것은 아닙니다.

| todo.js 학습 가치 | 설명 |
|-------------------|------|
| 브라우저 동작 이해 | DOM, 이벤트 버블링, `innerHTML` |
| 데이터-UI 연결 원리 | "상태 변경 → 화면 갱신"의 **수동 버전** |
| 프레임워크 없이 동작 | 빌드·런타임 없이 바로 실행 |
| React 내부 이해 | React가 대신 해 주는 일이 **무엇인지** 체감 |

**비유**

- **todo.js**: 엔진·변속기·핸들을 직접 조작
- **Todo.tsx**: 핸들(상태)만 돌리면 나머지는 자동

---

## 8. 트레이드오프 (TSX의 비용)

| 항목 | 내용 |
|------|------|
| 빌드 환경 | Vite, CRA 등 설정 필요 |
| 러닝 커브 | `useState`, JSX, hooks, TypeScript |
| 런타임 | React 라이브러리 로드 |
| 단순 페이지 | 정적 HTML+JS 한 파일이 더 가벼울 수 있음 |

---

## 9. 결론

| 비교 항목 | todo.js | Todo.tsx |
|-----------|---------|----------|
| 기능 | 동일 | 동일 |
| 핵심 로직 (`push`, `filter`) | 동일 | 동일 |
| DOM/이벤트/렌더링 | **개발자가 전부 작성** | **React가 대부분 처리** |
| 가독성 (의도 파악) | 흐름 추적 필요 | JSX + handler로 직관적 |
| 코드량 | 분산 (HTML+JS) | 통합 (TSX 한 파일) |
| 적합한 상황 | 학습·소규모·의존성 최소 | 중대형 UI·팀 협업·상태 많은 화면 |

**정리:** `todo.js`에서 느낀 불편함(DOM 찾기, `renderTodos` 반복, 이벤트 위임, HTML 문자열, HTML/JS 분리)은 React TSX에서 **상태 기반 선언적 UI**로 대체됩니다. 그래서 같은 기능이라도 TSX는 **"무엇을 보여줄지"** 에만 집중할 수 있고, 이것이 실무에서 React를 쓰는 주된 이유입니다.

---

## 관련 파일

- `todo/todo.js` — 바닐라 JavaScript 구현
- `todo/Todo.tsx` — React + TypeScript 구현
- `todo/index.html` — 바닐라 JS용 HTML
- `todo/todo.css` — 공통 스타일
