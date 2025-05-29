import { For } from "solid-js";
import css_module from "./style.module.css";

interface Connection {
  name: string;
  avatarUrl: string;
  link: string;
}

interface Post {
  userAvatarUrl: string;
  userName: string;
  timestamp: string;
  content: string;
  imageUrl?: string;
  likes: number;
  comments: number;
}

export const UserProfile = () => {
  const user = {
    name: "John Doe",
    title: "Software Engineer at Tech Innovations",
    profileImageUrl: "https://picsum.photos/seed/profile/150", // Added seed for consistent image
    worksAt: "Tech Innovations",
    studiesAt: "University X",
    livesIn: "New York, USA",
    website: "johndoe.com",
  };

  const connections: Connection[] = [
    {
      name: "Jane Smith",
      avatarUrl: "https://picsum.photos/seed/jane/30",
      link: "#",
    },
    {
      name: "Peter Jones",
      avatarUrl: "https://picsum.photos/seed/peter/30",
      link: "#",
    },
    {
      name: "Alice Brown",
      avatarUrl: "https://picsum.photos/seed/alice/30",
      link: "#",
    },
  ];

  const posts: Post[] = [
    {
      userAvatarUrl: "https://picsum.photos/seed/postuser1/40",
      userName: "Someone Else",
      timestamp: "2 hours ago", // Simplified timestamp for readability
      content:
        "Excited to share my latest article on SolidJS performance optimizations! It delves into fine-grained reactivity and how to get the most out of your applications. Check it out!",
      imageUrl: "https://picsum.photos/seed/post1/400/250", // Larger image for better visual impact
      likes: 15,
      comments: 3,
    },
    {
      userAvatarUrl: "https://picsum.photos/seed/postuser2/40",
      userName: "Another User",
      timestamp: "Yesterday",
      content:
        "Just finished an amazing online course on advanced web security. Highly recommend it to anyone looking to deepen their understanding of modern threats and defenses.",
      likes: 28,
      comments: 8,
    },
    {
      userAvatarUrl: "https://picsum.photos/seed/postuser3/40",
      userName: "Creative Coder",
      timestamp: "3 days ago",
      content:
        "Loving the new features in the latest VS Code update! The improved Git integration is a game-changer for my workflow.",
      likes: 42,
      comments: 12,
    },
  ];

  return (
    <div
      class={`container-fluid mx-auto py-4 ${css_module.profile_page_container}`}
    >
      <div class="row">
        {/* Left Column: Profile Info & Connections */}
        <div class="col-lg-4 col-md-5 mb-4">
          {" "}
          {/* Bootstrap column classes for responsiveness */}
          {/* Profile Card */}
          <div class={`${css_module.card} ${css_module.profile_card} mb-4`}>
            <div class={`${css_module.card_body} text-center`}>
              <img
                src={user.profileImageUrl}
                alt="Profile Picture"
                class={`${css_module.profile_img} rounded-circle img-thumbnail mt-3`}
              />
              <h4 class="card-title mb-1">{user.name}</h4> {/* Larger name */}
              <p class={`${css_module.text_muted} mb-3`}>{user.title}</p>
              <div class="d-flex justify-content-center mb-3">
                {" "}
                {/* Added margin bottom */}
                <a href="#" class="btn btn-primary btn-sm me-2">
                  <i class="fas fa-user-plus me-1"></i> Follow
                </a>
                <a href="#" class="btn btn-outline-secondary btn-sm">
                  <i class="fas fa-envelope me-1"></i> Message
                </a>
              </div>
            </div>
            <ul class="list-group list-group-flush">
              <li class={`${css_module.list_group_item}`}>
                <i class="fas fa-briefcase me-2"></i> Works at{" "}
                <a href="#" class="fw-bold">
                  {user.worksAt}
                </a>{" "}
                {/* Bold company name */}
              </li>
              <li class={`${css_module.list_group_item}`}>
                <i class="fas fa-graduation-cap me-2"></i> Studied at{" "}
                <a href="#" class="fw-bold">
                  {user.studiesAt}
                </a>{" "}
                {/* Bold university name */}
              </li>
              <li class={`${css_module.list_group_item}`}>
                <i class="fas fa-map-marker-alt me-2"></i> Lives in{" "}
                <a href="#" class="fw-bold">
                  {user.livesIn}
                </a>{" "}
                {/* Bold location */}
              </li>
              <li class={`${css_module.list_group_item}`}>
                <i class="fas fa-link me-2"></i>{" "}
                <a
                  href={`https://${user.website}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {user.website}
                </a>{" "}
                {/* Proper link handling */}
              </li>
            </ul>
          </div>
          {/* Connections Card */}
          <div class={`${css_module.card} mb-4`}>
            <div class={`${css_module.card_body}`}>
              <h6 class="card-title mb-3">
                <i class="fas fa-users me-2"></i> Connections (
                {connections.length}) {/* Show count */}
              </h6>
              <ul class="list-unstyled">
                <For each={connections}>
                  {(connection) => (
                    <li class="mb-2">
                      <a
                        href={connection.link}
                        class="d-flex align-items-center text-decoration-none text-dark"
                      >
                        <img
                          src={connection.avatarUrl}
                          alt={connection.name}
                          class="rounded-circle me-2"
                          style={{
                            width: "32px",
                            height: "32px",
                            "object-fit": "cover",
                          }}
                        />
                        <span class="fw-bold">{connection.name}</span>{" "}
                        {/* Bold connection name */}
                      </a>
                    </li>
                  )}
                </For>
                <li class="text-center mt-3">
                  <a
                    href="#"
                    class={`${css_module.text_muted} text-decoration-none`}
                  >
                    {" "}
                    {/* Ensure link styling */}
                    See All Connections
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Right Column: Create Post & Posts Feed */}
        <div class="col-lg-8 col-md-7">
          {" "}
          {/* Bootstrap column classes for responsiveness */}
          {/* Create Post Card */}
          <div class={`${css_module.card} mb-4`}>
            <div class={`${css_module.card_body}`}>
              <h6 class="card-title mb-3">Create Post</h6>
              <textarea
                class={`form-control ${css_module.post_textarea} mb-3`} // Changed class and added margin
                rows="3"
                placeholder={`What's on your mind, ${user.name}?`}
              ></textarea>
              <div class="d-flex justify-content-end align-items-center">
                {" "}
                {/* Aligned items for consistent height */}
                <button class="btn btn-primary btn-sm">
                  <i class="fas fa-pencil-alt me-2"></i> Post
                </button>
              </div>
            </div>
          </div>
          {/* Posts Feed */}
          <For each={posts}>
            {(post) => (
              <div class={`${css_module.card} ${css_module.post_card} mb-4`}>
                <div class={`${css_module.card_body}`}>
                  <div class="d-flex align-items-center mb-3">
                    <img
                      src={post.userAvatarUrl}
                      alt={post.userName}
                      class="rounded-circle me-3"
                      style={{
                        width: "48px",
                        height: "48px",
                        "object-fit": "cover",
                      }} // Larger post avatar
                    />
                    <div>
                      <h6 class="mb-0 fw-bold">{post.userName}</h6>{" "}
                      {/* Bold username */}
                      <small class={`${css_module.text_muted}`}>
                        {post.timestamp}
                      </small>
                    </div>
                  </div>
                  <p class="card-text mb-3">{post.content}</p>{" "}
                  {/* Added margin bottom */}
                  {post.imageUrl && (
                    <img
                      src={post.imageUrl}
                      alt="Post Image"
                      class="img-fluid rounded mb-3" // Added margin bottom
                      style={{
                        "max-width": "100%",
                        height: "auto",
                        "object-fit": "cover",
                      }}
                    />
                  )}
                  <div class="d-flex justify-content-between align-items-center border-top pt-3">
                    {" "}
                    {/* Added border-top and padding */}
                    <div>
                      <a href="#" class={`${css_module.action_link} me-3`}>
                        {" "}
                        {/* Custom action link style */}
                        <i class="far fa-heart me-1"></i> Like ({post.likes})
                      </a>
                      <a href="#" class={`${css_module.action_link}`}>
                        <i class="far fa-comment-alt me-1"></i> Comment (
                        {post.comments})
                      </a>
                    </div>
                    <a href="#" class={`${css_module.action_link}`}>
                      <i class="fas fa-share me-1"></i> Share
                    </a>
                  </div>
                </div>
              </div>
            )}
          </For>
          {/* Load More Posts Button */}
          <div class="text-center mt-4 mb-4">
            {" "}
            {/* Added top and bottom margin */}
            <button class="btn btn-outline-primary px-4 py-2 rounded-pill shadow-sm">
              {" "}
              {/* More Bootstrap styling */}
              Load More Posts
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
