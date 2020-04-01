import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, NavigationEnd, Router} from '@angular/router';
import {distinctUntilChanged, filter} from 'rxjs/operators';

import { BreadCrumb } from 'src/app/interfaces/breadcrumb';


@Component({
  selector: 'app-breadcrumbs',
  templateUrl: './breadcrumbs.component.html',
  styleUrls: ['./breadcrumbs.component.css'],
})
export class BreadcrumbsComponent implements OnInit {
  public breadcrumbs: BreadCrumb [];

  constructor(private activatedRoute: ActivatedRoute, private router: Router) {
    this.breadcrumbs = this.buildBreadCrumb(this.activatedRoute.root);
  }

  ngOnInit() {
    this.router.events.pipe(filter(event => event instanceof NavigationEnd),
      distinctUntilChanged(),
      ).subscribe(() => {
      this.breadcrumbs = this.buildBreadCrumb(this.activatedRoute.root);
    });
  }

   /**
   * Recursively build breadcrumb according to activated route.
   * @param route // specify the route
   * @param url // save the amount of url
   * @param breadcrumbs // saves the amount of labels
   */

  buildBreadCrumb(route: ActivatedRoute, url: string = '', breadcrumbs: BreadCrumb[] = []): BreadCrumb[] {
    // get the routes and labels
    let label =
      route.routeConfig && route.routeConfig.data ? route.routeConfig.data.breadcrumb :
      null;
    let path =
      route.routeConfig && route.routeConfig.data ? route.routeConfig.path : '';
    // attributes to detect whether the route is dynamic
    const lastRoutePart = path.split('/').pop();
    const isDynamicRoute = lastRoutePart.startsWith(':');

    // function that get the dynamic routes
    if (isDynamicRoute && !!route.snapshot) {
      const paramName = lastRoutePart.split(':')[1];
      path = path.replace(lastRoutePart, route.snapshot.params[paramName]);
      label = route.snapshot.params[paramName];
    }

    // Generate next url
    const nextUrl = path ? `${url}/${path}` : url;

    const breadcrumb: BreadCrumb = {
      label: label,
      url: nextUrl
    };
    // Only adding route with non-empty label
    const newBreadcrumbs = breadcrumb.label ? [...breadcrumbs, breadcrumb] : [...breadcrumbs];
    if (route.firstChild) {
      // If we are not on our current path yet,
      // there will be more children to look after, to build our breadcumb
      return this.buildBreadCrumb(route.firstChild, nextUrl, newBreadcrumbs);
    }
    return newBreadcrumbs;
  }
}
