import { async, TestBed, ComponentFixture } from "@angular/core/testing";
import { CoursesCardListComponent } from "./courses-card-list.component";
import { CoursesModule } from "../courses.module";
import { setupCourses } from "./../common/setup-test-data";
import { DebugElement } from "@angular/core";
import { By } from "@angular/platform-browser";

describe("CoursesCardListComponent", () => {
  let component: CoursesCardListComponent;
  let fixture: ComponentFixture<CoursesCardListComponent>;
  let el: DebugElement;
  //   async keyword is form testing MatCommonModule.
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      //We can declare the indual components. but its hard to identify them. so we can import them.
      //  declarations: [CoursesCardListComponent],
      imports: [CoursesModule],
    })
      .compileComponents()
      .then(() => {
        fixture = TestBed.createComponent(CoursesCardListComponent);
        component = fixture.componentInstance;
        el = fixture.debugElement;
      });
  }));

  it("should create component", () => {
    expect(component).toBeTruthy();
  });

  it("should display the course list", () => {
    // setupCourses() is kind of mock. In real time, we can use these kind of mocks.
    component.courses = setupCourses();
    // After assigning something, we need to tell there are some changes done using detectChanges().
    fixture.detectChanges();
    //To see the current status of DOM element
    //console.log(el.nativeElement.outerHTML);

    // course card class renedring the list of cards. so we are identifying DOM element using el.
    const cards = el.queryAll(By.css(".course-card"));
    expect(cards).toBeTruthy("Could not find cards");
    expect(cards.length).toBe(12, "Unexpected number of courses");
  });

  it("should disply the first course", () => {
    component.courses = setupCourses();
    fixture.detectChanges();
    const course = component.courses[0];
    const card = el.query(By.css(".course-card:first-child"));
    const title = el.query(By.css("mat-card-title"));
    const image = el.query(By.css("img"));
    console.log("Image source" + image);

    expect(card).toBeTruthy("Could not find first card");
    expect(title.nativeElement.textContent).toBe(course.titles.description);
    expect(image.nativeElement.src).toBe(course.iconUrl);
  });
});
