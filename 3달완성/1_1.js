// 클로저 직접 작성
// 실습 포인트: 함수 호출 시 내부 상태가 독립적으로 유지되는지 확인
function counter() {
    let count = 0;
    return function () {
        count++;
        return count;
    };
}
// const c = counter();
// console.log(c());
// console.log(c());

// const a = counter();
// const b = counter();
// console.log(a()); // 1
// console.log(b()); // 1

// -----------------------------------------------------------------------------

// 이벤트 루프 & 비동기 흐름 실험
// 목표:비동기 실행 순서 이해

// console.log('start');
// setTimeout(() => console.log('timeout 0'), 0); // 일반대기시
// Promise.resolve().then(() => console.log('Promise 1')); //vie
// Promise.resolve().then(() => console.log('Promise 2')); // vie
// console.log('end');

// 내 예상 start end 1,2,time

// -----------------------------------------------------------------------------

// async/await 실험

// async function asyncTest() {
//     console.log('a');
//     await Promise.resolve();
//     console.log('b');
// }
// console.log('start');
// asyncTest();
// console.log('end');

// 내예상 start a  end b

// -----------------------------------------------------------------------------

// Promise 직접 구현 & 활용

function myPromise(executor) {
    let onResolve;
    const resolve = (value) => {
      setTimeout(() => onResolve(value), 0);
    };
    this.then = (callback) => { onResolve = callback; };
    executor(resolve);
  }

const p = new myPromise((res) => res(123));
p.then(console.log);
