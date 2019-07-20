import { Component, OnInit } from '@angular/core';
import { Constants } from 'src/app/util/constants';
import { ComponentLoaderService } from 'src/app/util/component-loader.service';
import { DataLoaderService } from 'src/app/util/data-loader.service';
import { Course } from '../course.model';
import { FormBuilder, FormGroup, FormControl, Validators, FormArray } from '@angular/forms';
import { Student } from 'src/app/students/student.model';

@Component({
	selector: 'app-course-add-edit',
	templateUrl: './course-add-edit.component.html',
	styleUrls: ['./course-add-edit.component.scss']
})
export class CourseAddEditComponent implements OnInit {

	public constant: any = Constants
	public compTitle: string = Constants.COMP_TITLE.course_add_new
	public selectedCourse: Course = null
	public allStudentsList: Array<Student> = []
	public allCoursesList: Array<Course> = []

	public formCourse: FormGroup;

	constructor(private clService: ComponentLoaderService, private dlService: DataLoaderService, private fb: FormBuilder) {
		if (this.dlService.selectedCourse != null) {
			//edit mode
			this.compTitle = Constants.COMP_TITLE.course_edit
			this.selectedCourse = this.dlService.selectedCourse
		} else {
			//add new course
			this.compTitle = Constants.COMP_TITLE.course_add_new
		}
		this.allStudentsList = this.dlService.getAllStudents()
		this.allCoursesList = this.dlService.getAllCourses()
	}

	ngOnInit() {
		if(this.dlService.selectedCourse != null) {
			//edit course
			this.formCourse = this.fb.group({
				courseName: new FormControl(this.selectedCourse.courseName, Validators.required),
				courseDescription: new FormControl(this.selectedCourse.courseDescription, Validators.required),
				courseType: new FormControl(this.selectedCourse.courseType, Validators.required),
				assignStudents: new FormArray([])
			})
			this.addStudentsCheckBoxes(true)
		} else {
			//add new course
			this.formCourse = this.fb.group({
				courseName: new FormControl(null, Validators.required),
				courseDescription: new FormControl(null, Validators.required),
				courseType: new FormControl(null, Validators.required),
				assignStudents: new FormArray([])
			})
			this.addStudentsCheckBoxes(false)
		}
	}

	/**
	 * back button click event
	 */
	public back() {
		this.formCourse.reset()
		if (this.dlService.selectedCourse != null) this.dlService.selectedCourse = null
		this.clService.changeComponentEmit(Constants.COMP_NAME.course_list)
	}

	/**
	 * save button click event
	 * add new course
	 */
	public saveCourse() {
		if (this.compTitle != Constants.COMP_TITLE.course_edit) {
			this.saveNewCourse()
		} else {
			this.updateCourse()
		}
	}

	/*
	 *  add students check boxes to the UI 
	 */
	private addStudentsCheckBoxes(checkAssignStudent: boolean) {
		if(checkAssignStudent) {
			this.allStudentsList.map((obj, i) => {
				const fc = new FormControl(this.checkAssignStudents(obj));
				(this.formCourse.controls.assignStudents as FormArray).push(fc);
			})
		} else {
			this.allStudentsList.map((obj, i) => {
				const fc = new FormControl(false);
				(this.formCourse.controls.assignStudents as FormArray).push(fc);
			})
		}
		
	}

	//check assign students with the selected course modal
	private checkAssignStudents(stu: Student): boolean {
		return this.selectedCourse.studentList.some(function (obj) {
			return obj.id === stu.id;
		})
	}

	//add new course 
	private saveNewCourse() {
		console.log('[saveNewCourse]');
		let cn: string = this.formCourse.get('courseName').value
		let cd: string = this.formCourse.get('courseDescription').value
		let ct: string = this.formCourse.get('courseType').value
		//get selected student ids
		const selectedStudentIds = this.formCourse.value.assignStudents
			.map((v, i) => v ? { 'id' : this.allStudentsList[i].id } : null)
			.filter(v => v !== null);

		let id: string = 'cou_00' + (this.allCoursesList.length + 1)
		let tempCourse: Course = new Course(
			 id, cn, cd, ct, selectedStudentIds
		)
		this.dlService.addNewCourse(tempCourse)
		this.formCourse.reset()
		this.clService.changeComponentEmit(Constants.COMP_NAME.course_list)
	}

	//update course
	private updateCourse() {
		console.log('[updateCourse]');
		let cn: string = this.formCourse.get('courseName').value
		let cd: string = this.formCourse.get('courseDescription').value
		let ct: string = this.formCourse.get('courseType').value
		//get selected student ids
		const selectedStudentIds = this.formCourse.value.assignStudents
			.map((v, i) => v ? { 'id' : this.allStudentsList[i].id } : null)
			.filter(v => v !== null);

		this.selectedCourse.courseName = cn
		this.selectedCourse.courseDescription = cd
		this.selectedCourse.courseType = ct
		this.selectedCourse.studentList = selectedStudentIds
		
		this.formCourse.reset()
		
		if (this.dlService.selectedCourse != null) this.dlService.selectedCourse = null
		this.clService.changeComponentEmit(Constants.COMP_NAME.course_list)
		
	}

}
