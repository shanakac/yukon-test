import { Component, OnInit } from '@angular/core';
import { Course } from '../course.model';
import { DataLoaderService } from 'src/app/util/data-loader.service';
import { Constants } from 'src/app/util/constants';
import { ComponentLoaderService } from 'src/app/util/component-loader.service';
import { Student } from 'src/app/students/student.model';

@Component({
	selector: 'app-course-detail',
	templateUrl: './course-detail.component.html',
	styleUrls: ['./course-detail.component.scss']
})
export class CourseDetailComponent implements OnInit {

	public selectedCourse: Course = null
	public studentsList: Array<Student> = []

	constructor(private dlService: DataLoaderService, private clService: ComponentLoaderService) { 
		this.selectedCourse = dlService.selectedCourse
		this.studentsList = dlService.getStudentListOfCourse(this.selectedCourse)
	}

	ngOnInit() {
	}

	/**
	 * back button click event
	 */
	public back() {
		this.dlService.selectedCourse = null
		this.clService.changeComponentEmit(Constants.COMP_NAME.course_list)
	}

}
