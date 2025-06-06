/* @refresh reload */
import { render } from "solid-js/web";
import { Route, Router } from "@solidjs/router";
import {
  LoginPage,
  RootLayout,
  ServiceListings,
  ListingDetailPage,
  ServiceDetailsComponent,
  ServiceProviderDashboard,
  KanbanBoard,
  LovelyChat,
  Page404,
  ProfileDashboard,
  ProviderProfileComponent,
  CreateProviderProfileComponent,
  Calendar,
} from "./pages";
import "./App.css";
import { EmailInbox, UserProfile } from "./components";
import { ServiceProviderListings } from "./components/account";
import { HomePage } from "./pages/profile";

const root = document.getElementById("root");
if (import.meta.env.DEV && !(root instanceof HTMLElement)) {
  throw new Error(
    "Root element not found. Did you forget to add it to your index.html? Or maybe the id attribute got misspelled?"
  );
}

render(
  () => (
    <Router root={RootLayout}>
      <Route path="/" component={HomePage} />
      <Route path="/kanban" component={KanbanBoard} />
      <Route path="/inbox" component={EmailInbox}></Route>
      <Route path="/listings">
        <Route path="/" component={ServiceListings}></Route>
        <Route path="/:id" component={ServiceDetailsComponent}></Route>
        <Route path="/profiles" component={ServiceProviderListings}></Route>
        <Route path="/profiles/:id" component={UserProfile}></Route>
        <Route path="/create"></Route>
        <Route path="/profiles/create"></Route>
      </Route>

      {/* profiles urls */}
      <Route path="/profile">
        <Route path="/" component={ProfileDashboard}></Route>
        <Route path={"/:id"} component={ProviderProfileComponent}></Route>
        <Route
          path={"/create"}
          component={CreateProviderProfileComponent}
        ></Route>
        <Route path="/calendar" component={Calendar}></Route>
        <Route path="/dashboard" component={ServiceProviderDashboard}></Route>
      </Route>

      {/* chat page */}
      <Route path="/chat" component={LovelyChat}></Route>
      {/* </Route> */}

      {/* public sharable profile */}
      <Route path="/login" component={LoginPage} />
      <Route path="/public/profile"></Route>
      <Route path="*404" component={Page404} />
    </Router>
  ),
  root!
);
