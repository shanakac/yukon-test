import { Injectable, Output, EventEmitter } from '@angular/core';
import { Constants } from './constants';

//components
import { CourseListComponent } from '../courses/course-list/course-list.component';
import { CourseDetailComponent } from '../courses/course-detail/course-detail.component';
import { CourseAddEditComponent } from '../courses/course-add-edit/course-add-edit.component';
import { StudentListComponent } from '../students/student-list/student-list.component';
import { StudentDetailComponent } from '../students/student-detail/student-detail.component';
import { StudentAddEditComponent } from '../students/student-add-edit/student-add-edit.component';


@Injectable({
	providedIn: 'root'
})
export class ComponentLoaderService {

	@Output() changeComponent: EventEmitter<any> = new EventEmitter()

	constructor() { }

	/**
	 * load component by component name 
	 * used for dynamic loading
	 * compName - component name (constant)
	 */ 
	public loadComponentByName(compName: string) {
		switch (compName) {
			case Constants.COMP_NAME.course_list:
				return CourseListComponent
			case Constants.COMP_NAME.course_detail:
				return CourseDetailComponent
			case Constants.COMP_NAME.course_add_edit:
				return CourseAddEditComponent
			case Constants.COMP_NAME.student_list:
				return StudentListComponent
			case Constants.COMP_NAME.student_detail:
				return StudentDetailComponent
			case Constants.COMP_NAME.student_add_edit:
				return StudentAddEditComponent
			default:
				break;
		}
	}

	public changeComponentEmit(compName: string) {
		this.changeComponent.emit({
			compName: compName
		})
	}

	public changeComponentExecute() {
		return this.changeComponent
	}


}
