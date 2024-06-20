import { Injectable } from '@angular/core';
import { NavigationDropdown, NavigationItem, NavigationLink, NavigationSubheading } from '../interfaces/navigation-item.interface';
import { Subject, BehaviorSubject } from 'rxjs';
import { UserService } from '../../auth/user.service';
// import { SYSTEM_ADMIN, MANAGEMENT, STAFF, STUDENT, TENANT_ADMIN, PARENT, PARENT_ADMISSION } from 'src/app/shared/util/app.constants';
@Injectable({
    providedIn: 'root'
})
export class NavigationService {
    items: NavigationItem[] = [];

    sideItems = new Subject<NavigationItem[]>();

    private _openChangeSubject = new Subject<NavigationDropdown>();
    openChange$ = this._openChangeSubject.asObservable();

    constructor(private userService: UserService) {
        // this.getNavigationItems();
    }

    triggerOpenChange(item: NavigationDropdown) {
        this._openChangeSubject.next(item);
    }

    isLink(item: NavigationItem): item is NavigationLink {
        return item.type === 'link';
    }

    isDropdown(item: NavigationItem): item is NavigationDropdown {
        return item.type === 'dropdown';
    }

    isSubheading(item: NavigationItem): item is NavigationSubheading {
        return item.type === 'subheading';
    }

    getNavigationItems() {
        if (this.userService.isAuthenticated()) {
            this.userService.getUser().then(user => {
                if (user) {
                    this.items = [];
                    if (user.roles.length === 1) {
                        console.log('user role' + user.roles[0].name)
                        localStorage.setItem('userRole', user.roles[0].name);
                        switch (user.roles[0].name) {
                            // case SYSTEM_ADMIN:
                            //     this.getNavigationItemsForSystemAdmin();
                            //     break;
                            // case MANAGEMENT:
                            //     this.getDefaultNavigationItems();
                            //     break;
                            // case TENANT_ADMIN:
                            //     this.getDefaultNavigationItems();
                            //     this.getNavigationItemsForAdmin();
                            //     break;
                            // case STAFF:
                            //     this.getDefaultNavigationItems();
                            //     this.getCirculumSectionItemsForStaff();
                            //     this.getNavigationItemsForStaff();
                            //     this.getMaterialForStaff();
                            //     this.getAssignementManagementItemsForStaff();
                            //     break;
                            // case STUDENT:
                            //     this.getDefaultNavigationItems();
                            //     this.getNavigationItemsForStudent();
                            //     break;
                            // case PARENT:
                            //     this.getDefaultNavigationItems();
                            //     this.getNavigationItemsForParent();
                            //     break;
                            // case PARENT_ADMISSION:
                            //     //this.getDefaultNavigationItems(); 
                            //     this.getNavigationItemsForAdmissionParent();
                            //     break;
                            default:
                                this.items = [];
                        }
                    }
                    // if (user.roles.length === 2) {
                    //     if ((user.roles[0].name === STAFF && user.roles[1].name === TENANT_ADMIN) ||
                    //         (user.roles[0].name === TENANT_ADMIN && user.roles[1].name === STAFF)) {
                    //         this.getDefaultNavigationItems();
                    //         this.getNavigationItemsForStaffAndAdmin();
                    //         // this.getCommonNavigationItems();
                    //     }
                    // }
                    this.sideItems.next(this.items);
                    return this.items;
                }
            }).catch(err => {
                this.items = [];
                return this.items;
            });
        }
        return this.items;
    }


    getDefaultNavigationItems() {

        this.items.push({
            type: 'link',
            label: 'Dashboard',
            route: '/dashboard',
        });


    }

    setItemsEmpty() {
        this.sideItems.next([]);
        this.items = [];
    }
}
