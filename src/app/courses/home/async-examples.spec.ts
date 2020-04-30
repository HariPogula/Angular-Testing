import { fakeAsync, tick, flush, flushMicrotasks } from "@angular/core/testing";
import { of } from "rxjs";
import { delay } from "rxjs/operators";

describe("Async Testing Examples", () => {
  it("Async tests with Jasmine done function", (done: DoneFn) => {
    let test = false;
    setTimeout(() => {
      test = true;
      expect(test).toBeTruthy();
      done();
    }, 1000);
  });

  it("Asynchrounous Test Example-SetTimeOut()", fakeAsync(() => {
    let test = false;
    setTimeout(() => {
      test = true;
      expect(test).toBeTruthy();
    }, 1000);
    //since this is async, we need advance the time greater than or equal to 1000.
    // tick(1000);
    flush(); //This methos exceutes all async methods . So we dont need to advance the time using tick()
  }));

  it("Async Example -using Promise()", fakeAsync(() => {
    let test = false;
    console.log("Creating the Promise");
    Promise.resolve().then(() => {
      console.log("Promise evolved succesfully");
      test = true;
      // return Promise.resolve();
    });
    //   .then(() => {
    //     console.log("Second then() evaluated successfully..");
    //   });

    flushMicrotasks(); //To run all Micro Tasks of promise() before running the assertions.
    console.log("Running test assertions");
    expect(test).toBeTruthy();
  }));

  it("Async Test Example with Promise and setTimeOut()", fakeAsync(() => {
    let counter = 0;
    Promise.resolve().then(() => {
      counter += 10;
      setTimeout(() => {
        counter += 1;
      }, 1000);
    });

    //Initial Value
    expect(counter).toBe(0);

    //After resolving the Promsie()
    flushMicrotasks();
    expect(counter).toBe(10);

    //After resolving the setTimeOut()
    flush();
    expect(counter).toBe(11);
  }));

  it("Aync test example with Observable", fakeAsync(() => {
    let test = false;
    console.log("Creating Observable");
    //const test$ = of(test); // This is Synchronous
    const test$ = of(test).pipe(delay(1000));
    test$.subscribe(() => {
      test = true;
    });
    tick(1000);
    console.log("Running test assertions");
    expect(test).toBeTruthy();
  }));
});
