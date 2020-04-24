import { CalculatorService } from "./calculator.service";
import { LoggerService } from "./logger.service";
import { TestBed } from "@angular/core/testing";

describe("Calculator Service", () => {
  let calService: CalculatorService;
  let loggerSpy: any;
  beforeEach(() => {
    //Logger Service is dependency service. So we can check how many times its calling in add method
    //using spy() Approach-1 9, 10
    //This is only for unit testing. Its not recommended for backend /datanse services.
    //  const logger = new LoggerService();
    //spyOn(logger, "log"); //it will spy on logger instance and replace with new log method.
    //Approach-2 -Recommended.
    // CreateSpyObj() will mock the data for service.
    loggerSpy = jasmine.createSpyObj("LoggerService", ["log"]);

    //To Add Dependency Injection services --use TestBed..
    TestBed.configureTestingModule({
      providers: [
        CalculatorService,
        { provide: LoggerService, useValue: loggerSpy },
      ],
    });
    //calService = new CalculatorService(loggerSpy);
    //OR To make it as singlton--dependency Injection..
    calService = TestBed.get(CalculatorService);
  });
  fit("should add 2 numbers", () => {
    const result = calService.add(1, 2);
    expect(result).toBe(3, "Some thing went wrong!!!");
    expect(loggerSpy.log).toHaveBeenCalledTimes(1); //checking how many times its calling
  });

  fit("should subtract 2 numbers", () => {
    const calService = new CalculatorService(new LoggerService());
    const result = calService.subtract(3, 2);
    expect(result).toBe(1, "Subtraction went wrong :(");
  });
});
