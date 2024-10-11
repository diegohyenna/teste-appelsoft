import { Location } from '@angular/common';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatToolbarModule } from '@angular/material/toolbar';
import { By } from '@angular/platform-browser';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';

import { MenuComponent } from './menu.component';

describe('MenuComponent', () => {
  let component: MenuComponent;
  let fixture: ComponentFixture<MenuComponent>;
  let router: Router;
  let location: Location;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MenuComponent],
      imports: [
        MatToolbarModule,
        MatMenuModule,
        MatIconModule,
        NoopAnimationsModule,
        RouterTestingModule.withRoutes([
          { path: 'dashboard', component: MenuComponent },
          { path: 'delivery', component: MenuComponent },
        ]),
      ],
    }).compileComponents();
    router = TestBed.inject(Router);
    location = TestBed.inject(Location);
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    router.initialNavigation();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display toolbar with correct text', () => {
    const toolbarElement = fixture.debugElement.query(
      By.css('mat-toolbar')
    ).nativeElement;
    expect(toolbarElement.textContent).toContain('Teste AppelSoft');
  });

  it('should display menu button with icon', () => {
    const menuButtonElement = fixture.debugElement.query(
      By.css('button[mat-icon-button]')
    );
    expect(menuButtonElement).toBeTruthy();

    const iconElement = menuButtonElement.query(
      By.css('mat-icon')
    ).nativeElement;
    expect(iconElement.textContent).toBe('menu');
  });

  it('should display menu items with correct icons and text', () => {
    const menu = fixture.debugElement.query(By.css('[aria-label="menu"]'));
    menu.triggerEventHandler('click', null);
    fixture.detectChanges();

    const menuItems = fixture.debugElement.queryAll(By.css('.menu-item'));

    expect(menuItems.length).toBe(2);

    const dashboardItem = menuItems[0].nativeElement;
    expect(dashboardItem.textContent).toContain('Home');
    const dashboardIcon = menuItems[0].query(By.css('mat-icon')).nativeElement;
    expect(dashboardIcon.textContent).toBe('dashboard');

    const deliveryItem = menuItems[1].nativeElement;
    expect(deliveryItem.textContent).toContain('Transações');
    const deliveryIcon = menuItems[1].query(By.css('mat-icon')).nativeElement;
    expect(deliveryIcon.textContent).toBe('list_alt');
  });

  it('should navigate to /dashboard when Dashboard menu item is clicked', async () => {
    const menu = fixture.debugElement.query(By.css('.menu'));
    menu.triggerEventHandler('click', null);
    fixture.detectChanges();

    await fixture.whenStable();

    const menuItems = fixture.debugElement.queryAll(By.css('.menu-item'));
    const dashboardItem = menuItems[0];
    dashboardItem.nativeElement.click();
    fixture.detectChanges();

    await fixture.whenStable();
    expect(location.path()).toBe('/dashboard');
  });
});
