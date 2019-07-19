import { Injectable } from '@angular/core';
import { Student } from '../students/student.model';
import { Course } from '../courses/course.model';

@Injectable({
	providedIn: 'root'
})
export class DataLoaderService {

	constructor() { }

	public selectedCourse: Course = null
	public selectedStudent: Student = null

	public studentsList: Array<Student> = [
		{
			id: 'stu_001',
			firstName: 'Shanaka',
			lastName: 'Chethana',
			email: 'shanakachethana@gmail.com',
			courseList: [
				{
					id: 'cou_001'
				},
				{
					id: 'cou_002'
				},
				{
					id: 'cou_003'
				}
			]
		},
		{
			id: 'stu_002',
			firstName: 'Ushani',
			lastName: 'Bonifus',
			email: 'ushanibonifus@gmail.com',
			courseList: [
				{
					id: 'cou_001'
				},
				{
					id: 'cou_002'
				}
			]
		},
		{
			id: 'stu_003',
			firstName: 'Jon',
			lastName: 'Snow',
			email: 'jonsnow@gmail.com',
			courseList: [
				{
					id: 'cou_002'
				},
				{
					id: 'cou_003'
				}
			]
		}
	]

	public coursesList: Array<Course> = [
		{
			id: 'cou_001',
			courseName: 'Computational Mathematics',
			courseDescription: 'Computational mathematics is a field closely connected with a variety of other mathematical branches, as for often times a better mathematical understanding of the problem leads to innovative numerical techniques.',
			courseType: 'compulsory',
			studentList: [
				{
					id: 'stu_001'
				},
				{
					id: 'stu_002'
				}
			]
		},
		{
			id: 'cou_002',
			courseName: 'Software Engineering',
			courseDescription: 'Software engineering is the process of analyzing user needs and designing, constructing, and testing end user applications that will satisfy these needs through the use of software programming languages. It is the application of engineering principles to software development.',
			courseType: 'compulsory',
			studentList: [
				{
					id: 'stu_001'
				},
				{
					id: 'stu_002'
				},
				{
					id: 'stu_003'
				}

			]
		},
		{
			id: 'cou_003',
			courseName: 'Business Studies',
			courseDescription: 'Business Studies is a broad subject in the Social Sciences, allowing the in-depth study of a range of specialties such as accountancy, finance, organisation, human resources management and marketing.',
			courseType: 'elective',
			studentList: [
				{
					id: 'stu_001'
				},
				{
					id: 'stu_003'
				}

			]
		}
	]


	//delete course from list
	public deleteCourse(course: Course) {
		let index = this.coursesList.findIndex(obj => obj.id === course.id)
		this.coursesList.splice(index, 1)
	}

	//update course
	public updateCourse(course: Course) {
		let tempCourse: Course = this.coursesList.find(x => x.id == course.id);

	}

	//add new course
	public addNewCourse(course: Course) {
		this.coursesList.push(course)
	}

	//delete student from list
	public deleteStudent(student: Student) {
		let index = this.studentsList.findIndex(obj => obj.id === student.id)
		this.studentsList.splice(index, 1)
	}

	//update student
	public updateStudent(student: Student) {
		let tempStudent: Student = this.studentsList.find(x => x.id == student.id);

	}

	//add new student
	public addNewStudent(student: Student) {
		this.studentsList.push(student)
	}

	/**
	 * get course list of a student
	 * return course list
	 */
	public getCourseListOfStudent(student: Student): any {
		let tempStudent: Student = this.studentsList.find(x => x.id == student.id);
		let courseList: Array<Course> = []
		tempStudent.courseList.forEach((element: any) => {
			let tempCourse: Course = this.coursesList.find(x => x.id == element.id);
			courseList.push(tempCourse)
		});
		return courseList
	}

	/**
	 * get student list of a course
	 * return student list
	 */
	public getStudentListOfCourse(course: Course): any {
		let tempCourse: Course = this.coursesList.find(x => x.id == course.id);
		let studentList: Array<Student> = []
		tempCourse.studentList.forEach((element: any) => {
			let tempStudent: Student = this.studentsList.find(x => x.id == element.id);
			studentList.push(tempStudent)
		});
		return studentList
	}
}
