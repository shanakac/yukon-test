import { Component, OnInit } from '@angular/core';
import { ComponentLoaderService } from 'src/app/util/component-loader.service';
import { Constants } from 'src/app/util/constants';

@Component({
	selector: 'app-student-add-edit',
	templateUrl: './student-add-edit.component.html',
	styleUrls: ['./student-add-edit.component.scss']
})
export class StudentAddEditComponent implements OnInit {

	public compTitle: string = 'Add New Student'

	constructor(private clService: ComponentLoaderService) { }

	ngOnInit() {
	}

	/**
	   * back button click event
	   */
	public back() {
		this.clService.changeComponentEmit(Constants.COMP_NAME.student_list)
	}

	/**
	 * save button click event
	 * add new student
	 */
	public saveStudent() {

	}

}
