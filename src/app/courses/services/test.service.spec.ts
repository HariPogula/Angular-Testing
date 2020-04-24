import { TestService } from "./test.service";
import { TestBed } from "@angular/core/testing";
import { LoggerService } from "./logger.service";
describe("Test Service", () => {
  let testService: TestService;
  let loggerSpy: any;
  beforeEach(() => {
    loggerSpy = jasmine.createSpyObj("LoggerService", ["log"]);
    TestBed.configureTestingModule({
      providers: [TestService, { provide: LoggerService, useValue: loggerSpy }],
    });
    testService = TestBed.get(TestService);
  });
  it("should multiply 2 numbers", () => {
    const result = testService.multiplyNumbers(2, 3);
    expect(result).toBe(6);
    expect(loggerSpy.log).toHaveBeenCalledTimes(1);
  });
  {
  }

  it("should divide 2 numbers", () => {
    const result = testService.divideNumbers(4, 2);
    expect(result).toBe(0);
  });
});
