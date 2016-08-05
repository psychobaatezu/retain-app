import {Component} from "@angular/core";
import {NoteCard} from "./note-card";
import {inject} from "@angular/core/testing/test_injector";
import {TestComponentBuilder} from "@angular/core/testing/test_component_builder";
import {async} from "@angular/core/testing/async";
import {ComponentFixture} from "@angular/core/testing/component_fixture";

@Component({
  selector: 'note-card-test',
  directives: [
    NoteCard
  ],
  template: '<note-card [note]="note"></note-card>'
})
class TestComponent {
  note = {
    value: 'note',
    title: 'title',
    color: 'red',
    id: 1
  };
}

describe('NoteCard', () => {
  let builder: TestComponentBuilder;

  beforeEach(inject([TestComponentBuilder], (tcb: TestComponentBuilder) => {
    builder = tcb;
  }));

  it('should have correct title', async(() => {
    builder.createAsync(TestComponent)
        .then((fixture: ComponentFixture<TestComponent>) => {
          const title = fixture.nativeElement.querySelector('.title');
          fixture.detectChanges();

          expect(title.textContent.trim()).toEqual('title');
        });
  }));

  it('should toggle checkmark', async(() => {
    builder.createAsync(TestComponent)
        .then((fixture: ComponentFixture<TestComponent>) => {
          const noteCard = fixture.nativeElement.querySelector('.note-card');
          fixture.detectChanges();

          const evObj = document.createEvent('MouseEvents');
          evObj.initEvent('mouseenter', true, false);
          noteCard.dispatchEvent(evObj);
          fixture.detectChanges();

          let check = noteCard.querySelector('.icon');
          expect(check).toBeTruthy();

          evObj.initEvent('mouseleave', true, false);
          noteCard.dispatchEvent(evObj);
          fixture.detectChanges();

          check = noteCard.querySelector('.icon');
          expect(check).toBeNull();
        });
  }));
});
