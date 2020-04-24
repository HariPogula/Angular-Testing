import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { LoggerService } from "./logger.service";

@Injectable({ providedIn: "root" })
export class TestService {
  constructor(private logger: LoggerService) {}
  multiplyNumbers(a: number, b: number) {
    this.logger.log("Multiplying the numbers");
    return a * b;
  }
  divideNumbers(a: number, b: number) {
    this.logger.log("Division of numbers");
    return a % b;
  }
}
