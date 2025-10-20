import { render } from 'solid-js/web';
import { MatchFilters, Route, Router } from '@solidjs/router';
import {
    LoginPage,
    RootLayout,
    AuthLayout,
    ServiceListings,
    ServiceProviderDashboard,
    KanbanBoard,
    Page404,
    ProfileDashboard,
    ManageServiceProfiles,
    Calendar,
    ContactList,
    AboutUs,
    AccountSettings,
    NotificationsPage,
    // ChatPage,
    MailApp,
    ComposeMailApp,
    LoggerPage,
    InAppCallPage,
} from './pages';
import './App.css';
import {
    ServiceProviderListings,
    ProviderProfileDetail,
} from './components/account';
import { HomePage } from './pages/profile';
import { GetEnvConfig } from './environments';
import { UserLocationMap } from './pages/leaf';
import { PricingPage } from './pages/pricing';
import { NewRootLayout } from './pages/utils';
import { ClientLayout } from './apps/client';
import { ArtisanLayout } from './apps/artisan';
import {
    ClientsDashboardPage,
    ClientsJobSearchPage,
    ClientsJobPage,
    JobDetailPage,
    ClientPaymentPage,
    ClientChatPage,
    ClientNotificationPage,
    HelpSupportPage,
} from './apps/client/pages';

const root = document.getElementById('root');
if (import.meta.env.DEV && !(root instanceof HTMLElement)) {
    throw new Error(
        'Root element not found. Did you forget to add it to your index.html? Or maybe the id attribute got misspelled?'
    );
}

const config = GetEnvConfig();

const filters: MatchFilters = {
    parent: ['mom', 'dad'], // allow enum values
    id: /^\d+$/, // only allow numbers
    withHtmlExtension: (v: string) => v.length > 5 && v.endsWith('.html'), // only `*.html` extensions wanted
};

render(
    () => (
        <div>
            <title>{config?.title}</title>
            <Router root={RootLayout}>
                <Route path="/home" component={HomePage} />
                <Route path="/about" component={AboutUs} />
                <Route path="/login" component={LoginPage} />
                <Route path="/public/profile" />{' '}
                <Route path="/pricing" component={PricingPage} />
                <Route path="/sw.js" />
                <Route path="/brevo-frame.html" />
                <Route path={'/location'} component={UserLocationMap} />
                <Route path="/" component={AuthLayout}>
                    <Route path={'/client'} component={ClientLayout}>
                        <Route path="/dashboard">
                            <Route path="/" component={ClientsDashboardPage} />
                            <Route
                                path="/search"
                                component={ClientsJobSearchPage}
                            />
                        </Route>
                        <Route path="/jobs">
                            <Route path="/" component={ClientsJobPage} />
                            <Route path="/:jobId" component={JobDetailPage} />
                        </Route>
                        <Route path="/payments" component={ClientPaymentPage} />
                        <Route path="/inbox" component={ClientChatPage} />
                        <Route path="/email" />
                        <Route
                            path="/notification"
                            component={ClientNotificationPage}
                        />
                        <Route
                            path="/notifications"
                            component={NotificationsPage}
                        />
                        <Route path="/ai" />
                        <Route path="/support" component={HelpSupportPage} />
                        <Route path="/settings" />
                    </Route>
                    <Route path={'/artisan'} component={ArtisanLayout}>
                        <Route path="/dashboard" component={ProfileDashboard} />
                        <Route
                            path="/profile"
                            component={ManageServiceProfiles}
                        />
                        <Route path="/job-requests" />
                        <Route path="/jobs" />
                        <Route path="/contacts" />
                        <Route path="/earnings" />
                        <Route path="/subscriptions" />
                        <Route path="/inbox" />
                        <Route path="/email" component={MailApp} />
                        <Route
                            path="/email/compose"
                            component={ComposeMailApp}
                        />
                        <Route path="/calendar" component={Calendar} />
                        <Route path="/kanban" component={KanbanBoard} />
                        <Route path="/ai" />
                        <Route path="/help" />
                        <Route path="/settings" />
                    </Route>
                    <Route
                        path="/listings"
                        component={ServiceProviderListings}
                    />
                    <Route
                        path="/listings/:id"
                        component={ProviderProfileDetail}
                        matchFilters={filters}
                    />
                    <Route path="/requests" component={ServiceListings} />
                    <Route path="/logger" component={LoggerPage} />
                    <Route path="/contact">
                        <Route path="/email"></Route>
                        <Route path="/list" component={ContactList} />
                        <Route path="/call" component={InAppCallPage} />
                    </Route>
                    <Route path="/profile">
                        <Route path="/setting" component={AccountSettings} />
                        <Route
                            path="/dashboard"
                            component={ServiceProviderDashboard}
                        />
                    </Route>
                </Route>
                <Route path={'/root'} component={NewRootLayout} />
                <Route path="*404" component={Page404} />
            </Router>
        </div>
    ),
    root!
);
