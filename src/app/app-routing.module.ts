import { NgModule } from '@angular/core';
import { Routes, RouterModule, Route } from '@angular/router';
import { Constants } from './util/constants';

//components
import { CoursesComponent } from './courses/courses.component';
import { StudentsComponent } from './students/students.component';


const routes: Routes = [
	{ path: '', component: CoursesComponent, data: { allowed: false } },
	{ path: Constants.COMP_NAME.courses, component: CoursesComponent, data: { allowed: false } },
	{ path: Constants.COMP_NAME.students, component: StudentsComponent, data: { allowed: false } }
];

@NgModule({
	imports: [RouterModule.forRoot(routes)],
	exports: [RouterModule]
})
export class AppRoutingModule {
	public static getRoutingPaths(): Route[] {
		return routes
	}
}
