import { Component, OnInit } from '@angular/core';
import { Constants } from '../util/constants';
import { Router } from '@angular/router';

@Component({
	selector: 'app-sidebar',
	templateUrl: './sidebar.component.html',
	styleUrls: ['./sidebar.component.scss'],
	inputs: ['selectedMenuItem']
})
export class SidebarComponent implements OnInit {

	public selectedMenuItem: string = ''
	public componentNames: any = Constants.COMP_NAME

	constructor(private router: Router) { }

	ngOnInit() {
	}

	public sideItemClick(sidebarItem: string) {
		this.selectedMenuItem = sidebarItem
		switch (sidebarItem) {
			case Constants.COMP_NAME.courses:
				this.router.navigateByUrl(Constants.COMP_NAME.courses)
				break;
			case Constants.COMP_NAME.students:
				this.router.navigateByUrl(Constants.COMP_NAME.students)
				break;
			default:
				break;
		}
	}

}
