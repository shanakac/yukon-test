import { Component, OnInit } from '@angular/core';
import { Student } from '../student.model';
import { Constants } from '../../util/constants';
import { DataLoaderService } from 'src/app/util/data-loader.service';
import { ComponentLoaderService } from 'src/app/util/component-loader.service';

@Component({
	selector: 'app-student-list',
	templateUrl: './student-list.component.html',
	styleUrls: ['./student-list.component.scss']
})
export class StudentListComponent implements OnInit {

	public studentList: Array<Student> = []

	constructor(private dataService: DataLoaderService, private clService: ComponentLoaderService) {
		this.studentList = this.dataService.studentsList
	}

	ngOnInit() {
	}

	/**
	 * add new student
	 */
	public addNewStudent() {
		this.clService.changeComponentEmit(Constants.COMP_NAME.student_add_edit)
	}

	/**
	 * edit student button click event
	 */
	public studentEdit(student: Student) {
		this.dataService.selectedStudent = student
		this.clService.changeComponentEmit(Constants.COMP_NAME.student_add_edit)
	}

	/**
	 * delete student button click event
	 */
	public studentDelete(student: Student) {
		this.dataService.deleteStudent(student)
	}

	/**
	 * show student desctiption
	 */
	public studentDescription(student: Student) {
		this.dataService.selectedStudent = student
		this.clService.changeComponentEmit(Constants.COMP_NAME.student_detail)
	}

}
