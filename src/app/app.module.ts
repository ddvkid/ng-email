import { BrowserModule } from '@angular/platform-browser';
import { APP_INITIALIZER, NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { SharedModule } from './shared/shared.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ComposeEmailComponent } from './components/compose-email/compose-email.component';
import { StartupService } from './@core/startup/startup.service';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { CoreModule } from './@core/core.module';
import { AddressFieldComponent } from './components/address-field/address-field.component';
import { MessageService } from 'primeng/components/common/messageservice';
import { NotificationInterceptor } from './shared/notification.interceptor';
import { ConfirmationService } from 'primeng/primeng';

export function StartupServiceFactory(startupService: StartupService): Function {
    return () => startupService.getSettings();
}

@NgModule({
    declarations: [
        AppComponent,
        ComposeEmailComponent,
        AddressFieldComponent
    ],
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        HttpClientModule,
        CoreModule,
        SharedModule
    ],
    providers: [
        StartupService,
        {
            provide: APP_INITIALIZER,
            useFactory: StartupServiceFactory,
            deps: [StartupService],
            multi: true
        },
        { provide: HTTP_INTERCEPTORS, useClass: NotificationInterceptor, multi: true },
        MessageService,
        ConfirmationService
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }
