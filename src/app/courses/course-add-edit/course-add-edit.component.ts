import { Component, OnInit } from '@angular/core';
import { Constants } from 'src/app/util/constants';
import { ComponentLoaderService } from 'src/app/util/component-loader.service';

@Component({
	selector: 'app-course-add-edit',
	templateUrl: './course-add-edit.component.html',
	styleUrls: ['./course-add-edit.component.scss']
})
export class CourseAddEditComponent implements OnInit {

	public compTitle: string = 'Add New Course'

	constructor(private clService: ComponentLoaderService) { }

	ngOnInit() {
	}

	/**
	 * back button click event
	 */
	public back() {
		this.clService.changeComponentEmit(Constants.COMP_NAME.course_list)
	}

	/**
	 * save button click event
	 * add new course
	 */
	public saveCourse() {

	}

}
