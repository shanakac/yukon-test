import { Component, OnInit } from '@angular/core';
import { Student } from '../student.model';
import { Course } from 'src/app/courses/course.model';
import { DataLoaderService } from 'src/app/util/data-loader.service';
import { ComponentLoaderService } from 'src/app/util/component-loader.service';
import { Constants } from 'src/app/util/constants';

@Component({
	selector: 'app-student-detail',
	templateUrl: './student-detail.component.html',
	styleUrls: ['./student-detail.component.scss']
})
export class StudentDetailComponent implements OnInit {

	public selectedStudent: Student = null
	public coursesList: Array<Course> = []

	constructor(private dlService: DataLoaderService, private clService: ComponentLoaderService) { 
		this.selectedStudent = dlService.selectedStudent
		this.coursesList = dlService.getCourseListOfStudent(this.selectedStudent)
	}

	ngOnInit() {
	}

	/**
	 * back button click event
	 */
	public back() {
		this.dlService.selectedStudent = null
		this.clService.changeComponentEmit(Constants.COMP_NAME.student_list)
	}

}
