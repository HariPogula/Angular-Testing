import { CoursesService } from "./courses.service";
import { TestBed } from "@angular/core/testing";
import {
  HttpClientTestingModule,
  HttpTestingController,
} from "@angular/common/http/testing";
import { COURSES, findLessonsForCourse } from "../../../../server/db-data";
import { Course } from "../model/course";
import { HttpErrorResponse } from "@angular/common/http";

describe("Course Service", () => {
  let coursesServie: CoursesService;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [CoursesService],
    });

    coursesServie = TestBed.get(CoursesService);
    httpTestingController = TestBed.get(HttpTestingController);
  });

  it("should retrieve all courses", () => {
    coursesServie.findAllCourses().subscribe((courses) => {
      expect(courses).toBeTruthy("No Courses returned."); //Error message when there are no courses
      expect(courses.length).toBe(12, "Incorrect Length");

      const course = courses.find((course) => course.id == 12);
      expect(course.titles.description).toBe("Angular Testing Course");
    });

    const req = httpTestingController.expectOne("/api/courses");
    expect(req.request.method).toEqual("GET");
    //flush will give the mock up data. check the api by running server
    req.flush({ payload: Object.values(COURSES) });
    //To verify we are calling expected api end point.OR we put them in afterEach()
    // httpTestingController.verify();
  });

  it("should find course by id", () => {
    coursesServie.findCourseById(12).subscribe((course) => {
      expect(course).toBeTruthy();
      expect(course.id).toBe(12);
    });

    const req = httpTestingController.expectOne("/api/courses/12");
    expect(req.request.method).toEqual("GET");
    req.flush(COURSES[12]); //mockup
  });

  it("should save the course", () => {
    const changes: Partial<Course> = {
      titles: { description: "Testing New Angular" },
    };

    coursesServie.saveCourse(12, changes).subscribe((course) => {
      expect(course.id).toBe(12);
    });

    const req = httpTestingController.expectOne("/api/courses/12");
    expect(req.request.method).toEqual("PUT");
    //check whether we are passing changes correctly.
    expect(req.request.body.titles.description).toEqual(
      changes.titles.description
    );
    req.flush({ ...COURSES[12], ...changes });
  });

  it("should return error when save course fails", () => {
    const changes: Partial<Course> = {
      titles: { description: "Testing New Angular" },
    };
    coursesServie.saveCourse(12, changes).subscribe(
      () => fail("the save course operation is failed."),

      (error: HttpErrorResponse) => {
        expect(error.status).toBe(500);
      }
    );
    const req = httpTestingController.expectOne("/api/courses/12");
    expect(req.request.method).toEqual("PUT");
    req.flush("Save Course Failed", {
      status: 500,
      statusText: "Internal Server Error",
    });
  });

  it("should list of lessons", () => {
    coursesServie.findLessons(12).subscribe((lessons) => {
      expect(lessons).toBeTruthy();
      expect(lessons.length).toBe(3);
    });
    const req = httpTestingController.expectOne(
      (req) => req.url === "/api/lessons"
    );
    expect(req.request.method).toEqual("GET");
    expect(req.request.params.get("courseId")).toEqual("12");
    expect(req.request.params.get("filter")).toEqual("");
    expect(req.request.params.get("sortOrder")).toEqual("asc");
    expect(req.request.params.get("pageNumber")).toEqual("0");
    expect(req.request.params.get("pageSize")).toEqual("3");
    req.flush({
      payload: findLessonsForCourse(12).slice(0, 3),
    });
  });

  afterEach(() => {
    httpTestingController.verify();
  });
});
