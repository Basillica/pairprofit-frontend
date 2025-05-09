/* @refresh reload */
import { render } from "solid-js/web";
import { Route, Router } from "@solidjs/router"; 
import { 
    Home, RootLayout,
    ServiceListings, ServiceProviderDashboard,
    Shitty, KanbanBoard,
    Page404
} from "./pages";
import './App.css'
import { EmailInbox, UserProfile } from "./components";
import { ServiceProviderListings } from "./components/account";

const root = document.getElementById('root');
if (import.meta.env.DEV && !(root instanceof HTMLElement)) {
    throw new Error(
      'Root element not found. Did you forget to add it to your index.html? Or maybe the id attribute got misspelled?',
    );
}

render(
    () => (
        <Router root={RootLayout}>
            <Route path={"/"}>
                <Route path="/" component={Home} />
                <Route path="/kanban" component={KanbanBoard} />
                {/* <Route path="/chat" component={LovelyChat}></Route> */}
                <Route path="/inbox" component={EmailInbox}></Route>
                {/* <Route path="/listings2" component={ServiceListingsV2}></Route>
                <Route path="/listings3" component={ServiceListingsV3}></Route> */}

                {/* listings urls */}
                <Route path="/listings">
                    <Route path="/" component={ServiceListings}></Route>
                    <Route path="/:id"></Route>
                    <Route path="/profiles" component={ServiceProviderListings} ></Route>
                    <Route path="/profiles/:id" component={UserProfile}></Route>
                    <Route path="/create"></Route>
                    <Route path="/profiles/create"></Route>
                </Route>

                {/* profiles urls */}
                <Route path="/profile">
                    <Route path="/"></Route>
                    <Route path="/dashboard" component={ServiceProviderDashboard}></Route>
                </Route>

                {/* public sharable profile */}
                <Route path="/public/profile"></Route>

                {/* chat page */}
                <Route path="/chat" component={Shitty}></Route>

            </Route>
            <Route path="*404" component={Page404} />
        </Router>
    ),
    root!
);