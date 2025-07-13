import { render } from 'solid-js/web';
import { Route, Router } from '@solidjs/router';
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
    ChatApp,
    MailApp,
    ComposeMailApp,
    LoggerPage,
    CallerPage,
    CallerPageV2,
    CallerPageV3,
} from './pages';
import './App.css';
import { ServiceProviderListings } from './components/account';
import { HomePage } from './pages/profile';

const root = document.getElementById('root');
if (import.meta.env.DEV && !(root instanceof HTMLElement)) {
    throw new Error(
        'Root element not found. Did you forget to add it to your index.html? Or maybe the id attribute got misspelled?'
    );
}

render(
    () => (
        <Router root={RootLayout}>
            <Route path="/" component={HomePage} />
            <Route path="/about" component={AboutUs} />
            <Route path="/login" component={LoginPage} />
            <Route path="/public/profile" />{' '}
            <Route path="/caller" component={CallerPage} />
            <Route path="/caller2" component={CallerPageV2} />
            <Route path="/sw.js" />
            <Route path="/brevo-frame.html" />
            <Route path="/" component={AuthLayout}>
                <Route path="/listings" component={ServiceListings} />
                <Route path="/notifications" component={NotificationsPage} />
                <Route path="/logger" component={LoggerPage} />
                <Route path="/contact">
                    <Route path="/email">
                        <Route path="/inbox" component={MailApp} />
                        <Route path="/compose" component={ComposeMailApp} />
                    </Route>
                    <Route path="/chat" component={ChatApp} />

                    <Route path="/list" component={ContactList} />
                    <Route path="/call" component={CallerPageV3} />
                    {/* <Route path="/inbox" component={EmailInbox} />  */}
                    {/* <Route path="/message" component={LovelyChat} /> */}
                </Route>
                <Route path="/profile">
                    <Route path="/setting" component={AccountSettings} />
                    <Route
                        path="/dashboard"
                        component={ServiceProviderDashboard}
                    />
                </Route>
                <Route path="/profiles">
                    <Route path="/" component={ServiceProviderListings} />
                    <Route path="/manage" component={ManageServiceProfiles} />
                    <Route path="/kanban" component={KanbanBoard} />
                    <Route path="/dashboard" component={ProfileDashboard} />
                    <Route path="/calendar" component={Calendar} />
                </Route>
            </Route>
            <Route path="*404" component={Page404} />
        </Router>
    ),
    root!
);
