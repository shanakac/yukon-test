import { Component, OnInit } from '@angular/core';
import { ComponentLoaderService } from 'src/app/util/component-loader.service';
import { Constants } from 'src/app/util/constants';
import { Student } from '../student.model';
import { Course } from 'src/app/courses/course.model';
import { DataLoaderService } from 'src/app/util/data-loader.service';
import { FormBuilder, FormGroup, FormControl, Validators, FormArray } from '@angular/forms';

@Component({
	selector: 'app-student-add-edit',
	templateUrl: './student-add-edit.component.html',
	styleUrls: ['./student-add-edit.component.scss']
})
export class StudentAddEditComponent implements OnInit {

	public constant: any = Constants
	public compTitle: string = Constants.COMP_TITLE.student_add_new
	public selectedStudent: Student = null
	public allCoursesList: Array<Course> = []
	public allStudentsList: Array<Student> = []

	public formStudent: FormGroup;

	constructor(private clService: ComponentLoaderService, private dlService: DataLoaderService, private fb: FormBuilder) {
		if (this.dlService.selectedStudent != null) {
			//edit student
			this.compTitle = Constants.COMP_TITLE.student_edit
			this.selectedStudent = this.dlService.selectedStudent
		} else {
			//add new student
			this.compTitle = Constants.COMP_TITLE.student_add_new
		}
		this.allCoursesList = this.dlService.getAllCourses()
		this.allStudentsList = this.dlService.getAllStudents()
	}

	ngOnInit() {
		if (this.dlService.selectedStudent != null) {
			//edit student
			this.formStudent = this.fb.group({
				firstName: new FormControl(this.selectedStudent.firstName, Validators.required),
				lastName: new FormControl(this.selectedStudent.lastName, Validators.required),
				email: new FormControl(this.selectedStudent.email, [
					Validators.required,
					Validators.pattern("[a-zA-Z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-zA-Z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-zA-Z0-9](?:[a-zA-Z0-9-]*[a-zA-Z0-9])[.])+[a-zA-Z0-9](?:[a-zA-Z0-9-]*[a-zA-Z0-9])?")
				]),
				gender: new FormControl(this.selectedStudent.gender, Validators.required),
				assignCourses: new FormArray([])
			})
			this.addCoursesCheckBoxes(true)
		} else {
			//add new student
			this.formStudent = this.fb.group({
				firstName: new FormControl(null, Validators.required),
				lastName: new FormControl(null, Validators.required),
				email: new FormControl(null, [
					Validators.required,
					Validators.pattern("[a-zA-Z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-zA-Z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-zA-Z0-9](?:[a-zA-Z0-9-]*[a-zA-Z0-9])[.])+[a-zA-Z0-9](?:[a-zA-Z0-9-]*[a-zA-Z0-9])?")
				]),
				gender: new FormControl(null, Validators.required),
				assignCourses: new FormArray([])
			})
			this.addCoursesCheckBoxes(false)
		}
	}

	/**
	   * back button click event
	   */
	public back() {
		this.formStudent.reset()
		if(this.dlService.selectedStudent != null) this.dlService.selectedStudent = null 
		this.clService.changeComponentEmit(Constants.COMP_NAME.student_list)
	}

	/**
	 * save button click event
	 * add new student
	 */
	public saveStudent() {
		if(this.compTitle != Constants.COMP_TITLE.student_edit) {
			this.saveNewStudent()
		} else {
			this.updateStudent()
		}
	}

	/**
	 * add coursed chek boxes to the UI
	 */
	private addCoursesCheckBoxes(checkAssignCourse: boolean) {
		if(checkAssignCourse) {
			this.allCoursesList.map((obj, i) => {
				const fc = new FormControl(this.checkAssignCourses(obj));
				(this.formStudent.controls.assignCourses as FormArray).push(fc);
			})
		} else {
			this.allCoursesList.map((obj, i) => {
				const fc = new FormControl(false);
				(this.formStudent.controls.assignCourses as FormArray).push(fc);
			})
		}
	}

	//check assign courses with the selected course modal
	private checkAssignCourses(course: Course): boolean {
		return this.selectedStudent.courseList.some(function (obj) {
			return obj.id === course.id;
		})
	}

	//add new student
	private saveNewStudent() {
		console.log('[saveNewStudent]');
		let fn: string = this.formStudent.get('firstName').value
		let ln: string = this.formStudent.get('lastName').value
		let em: string = this.formStudent.get('email').value
		let gd: string = this.formStudent.get('gender').value
		//get selected student ids
		const selectedCourseIds = this.formStudent.value.assignCourses
			.map((v, i) => v ? { 'id' : this.allCoursesList[i].id } : null)
			.filter(v => v !== null);

		let id: string = 'stu_00' + (this.allStudentsList.length + 1)
		let tempStudent: Student = new Student(
			 id, fn, ln, em, gd, selectedCourseIds
		)
		this.dlService.addNewStudent(tempStudent)
		this.formStudent.reset()
		this.clService.changeComponentEmit(Constants.COMP_NAME.student_list)
	}


	//update student
	private updateStudent() {
		console.log('[updateStudent]');
		let fn: string = this.formStudent.get('firstName').value
		let ln: string = this.formStudent.get('lastName').value
		let em: string = this.formStudent.get('email').value
		let gd: string = this.formStudent.get('gender').value
		//get selected student ids
		const selectedCourseIds = this.formStudent.value.assignCourses
			.map((v, i) => v ? { 'id' : this.allCoursesList[i].id } : null)
			.filter(v => v !== null);

		this.selectedStudent.firstName = fn
		this.selectedStudent.lastName = ln
		this.selectedStudent.email = em
		this.selectedStudent.gender = gd
		this.selectedStudent.courseList = selectedCourseIds
		
		this.formStudent.reset()
		
		if (this.dlService.selectedStudent != null) this.dlService.selectedStudent = null
		this.clService.changeComponentEmit(Constants.COMP_NAME.student_list)
		
	}
}
