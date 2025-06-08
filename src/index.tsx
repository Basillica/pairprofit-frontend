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
  ManageServiceProfiles,
  Calendar,
  ContactList,
  AboutUs,
} from "./pages";
import "./App.css";
import { EmailInbox } from "./components";
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
      <Route path="/listings" component={ServiceListings} />
      {/* <Route path="/:id" component={ServiceDetailsComponent}></Route> */}
      {/* ListingDetailPage */}

      {/* profiles urls */}
      <Route path={"/about"} component={AboutUs} />
      <Route path={"/contact"} component={ContactList} />
      <Route path="/profiles">
        <Route path="/" component={ServiceProviderListings}></Route>
        <Route path="/:id/dashboard" component={ProfileDashboard}></Route>
        <Route path={"/manage"} component={ManageServiceProfiles}></Route>
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
