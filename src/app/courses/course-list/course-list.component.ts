import { Component, OnInit } from '@angular/core';
import { DataLoaderService } from 'src/app/util/data-loader.service';
import { Course } from '../course.model';
import { ComponentLoaderService } from 'src/app/util/component-loader.service';
import { Constants } from '../../util/constants';

@Component({
	selector: 'app-course-list',
	templateUrl: './course-list.component.html',
	styleUrls: ['./course-list.component.scss']
})
export class CourseListComponent implements OnInit {

	public courseList: Array<Course> = []

	constructor(private dataService: DataLoaderService, private clService: ComponentLoaderService) {
		this.courseList = this.dataService.coursesList
	 }

	ngOnInit() {
	}

	/**
	 * add new course 
	 */
	public addNewCourse() {
		this.clService.changeComponentEmit(Constants.COMP_NAME.course_add_edit)
	}

	/**
	 * edit course button click event
	 */
	public courseEdit(course: Course) {
		this.dataService.selectedCourse = course
	}

	/**
	 * delete course button click event
	 */
	public courseDelete(course: Course) {
		this.dataService.deleteCourse(course)
	}

	/**
	 * show course description
	 */ 
	public courseDescription(course: Course) {
		this.dataService.selectedCourse = course
		this.clService.changeComponentEmit(Constants.COMP_NAME.course_detail)
	}

}
