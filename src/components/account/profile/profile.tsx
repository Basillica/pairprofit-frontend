import { For } from 'solid-js';
import css_module from './style.module.css'; // Assuming you have a style.css file

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
    name: 'John Doe',
    title: 'Software Engineer at Tech Innovations',
    profileImageUrl: 'https://picsum.photos/150',
    worksAt: 'Tech Innovations',
    studiesAt: 'University X',
    livesIn: 'New York, USA',
    website: 'johndoe.com',
  };

  const connections = [
    { name: 'Jane Smith', avatarUrl: 'https://picsum.photos/30', link: '#' },
    { name: 'Peter Jones', avatarUrl: 'https://picsum.photos/30', link: '#' },
    { name: 'Alice Brown', avatarUrl: 'https://picsum.photos/30', link: '#' },
  ];

  const posts = [
    {
      userAvatarUrl: 'https://picsum.photos/40',
      userName: 'Someone Else',
      timestamp: 'Posted 2 hours ago',
      content: 'This is a sample post content. It can include text, images, and links.',
      imageUrl: 'https://picsum.photos/150',
      likes: 15,
      comments: 3,
    },
    {
      userAvatarUrl: 'https://picsum.photos/40',
      userName: 'Another User',
      timestamp: 'Posted yesterday',
      content: 'Another interesting post with some thoughts and ideas.',
      likes: 28,
      comments: 8,
    },
  ];

  return (
    <div class="mt-5">
      <div class="flex flex-wrap -mx-2">
        
        <div class="md:w-4/12 px-2">
          <div class={`${css_module.card} mb-4`}>
            <div class={`${css_module.card_body} text-center`}>
              <img src={user.profileImageUrl} alt="Profile Picture" class="rounded-circle img-thumbnail mb-3" />
              <h5 class="card-title">{user.name}</h5>
              <p class={`card-text ${css_module.text_muted}`}>{user.title}</p>
              <div class="d-flex justify-content-center mb-2">
                <a href="#" class="btn btn-primary btn-sm me-2"><i class="fas fa-user-plus"></i> Follow</a>
                <a href="#" class="btn btn-outline-secondary btn-sm"><i class="fas fa-envelope"></i> Message</a>
              </div>
            </div>
            <ul class="list-group list-group-flush">
              <li class={`${css_module.list_group_item}`}><i class="fas fa-briefcase me-2"></i> Works at <a href="#">{user.worksAt}</a></li>
              <li class={`${css_module.list_group_item}`}><i class="fas fa-graduation-cap me-2"></i> Studied at <a href="#">{user.studiesAt}</a></li>
              <li class={`${css_module.list_group_item}`}><i class="fas fa-map-marker-alt me-2"></i> Lives in <a href="#">{user.livesIn}</a></li>
              <li class={`${css_module.list_group_item}`}><i class="fas fa-link me-2"></i> <a href="#">{user.website}</a></li>
            </ul>
          </div>

          <div class={`${css_module.card} mb-4`}>
            <div class={`${css_module.card_body}`}>
              <h6 class="card-title mb-3"><i class="fas fa-users me-2"></i> Connections</h6>
              <ul class="list-unstyled">
                <For each={connections}>{(connection) => (
                  <li class="mb-2">
                    <a href={connection.link} class="d-flex align-items-center text-decoration-none text-dark">
                      <img src={connection.avatarUrl} alt={connection.name} class="rounded-circle me-2" />
                      <span>{connection.name}</span>
                    </a>
                  </li>
                )}</For>
                <li class="text-center mt-3"><a href="#" class={`${css_module.text_muted}`}>See All Connections</a></li>
              </ul>
            </div>
          </div>

        </div>

        <div class="md:w-4/12 px-2">
          <div class={`${css_module.card} mb-4`}>
            <div class={`${css_module.card_body}`}>
              <h6 class="card-title mb-3">Create Post</h6>
              <textarea class={`${css_module.list_group_item} mb-2" rows="3"`} placeholder={`What's on your mind, ${user.name}?`}></textarea>
              <div class="d-flex justify-content-end">
                <button class="btn btn-primary btn-sm"><i class="fas fa-pencil-alt me-2"></i> Post</button>
              </div>
            </div>
          </div>

          <For each={posts}>{(post) => (
            <div class={`${css_module.card} mb-4`}>
              <div class={`${css_module.card_body}`}>
                <div class="d-flex align-items-center mb-3">
                  <img src={post.userAvatarUrl} alt={post.userName} class="rounded-circle me-2" />
                  <div>
                    <h6 class="mb-0">{post.userName}</h6>
                    <small class={`${css_module.text_muted}`}>{post.timestamp}</small>
                  </div>
                </div>
                <p class="card-text">{post.content}</p>
                {post.imageUrl && <img src={post.imageUrl} alt="Post Image" class="img-fluid rounded mb-2" />}
                <div class="d-flex justify-content-between align-items-center">
                  <div>
                    <a href="#" class={`${css_module.text_muted} me-2`}><i class="far fa-heart me-1"></i> Like ({post.likes})</a>
                    <a href="#" class={`${css_module.text_muted}`}><i class="far fa-comment-alt me-1"></i> Comment ({post.comments})</a>
                  </div>
                  <a href="#" class="${css_module.text_muted}"><i class="fas fa-share"></i> Share</a>
                </div>
              </div>
            </div>
          )}</For>

          <div class="text-center">
            <button class="inline-flex items-center justify-center px-4 py-2 border border-transparent text-base font-medium rounded-md shadow-sm">Load More Posts</button>
          </div>
        </div>

        <div class="md:w-4/12 px-2">
          <div class={`${css_module.card} mb-4`}>
            <div class={`${css_module.card_body}`}>
              <h6 class="card-title mb-3">Create Post</h6>
              <textarea class={`${css_module.list_group_item} mb-2" rows="3"`} placeholder={`What's on your mind, ${user.name}?`}></textarea>
              <div class="d-flex justify-content-end">
                <button class="btn btn-primary btn-sm"><i class="fas fa-pencil-alt me-2"></i> Post</button>
              </div>
            </div>
          </div>

          <For each={posts}>{(post) => (
            <div class={`${css_module.card} mb-4`}>
              <div class={`${css_module.card_body}`}>
                <div class="d-flex align-items-center mb-3">
                  <img src={post.userAvatarUrl} alt={post.userName} class="rounded-circle me-2" />
                  <div>
                    <h6 class="mb-0">{post.userName}</h6>
                    <small class={`${css_module.text_muted}`}>{post.timestamp}</small>
                  </div>
                </div>
                <p class="card-text">{post.content}</p>
                {post.imageUrl && <img src={post.imageUrl} alt="Post Image" class="img-fluid rounded mb-2" />}
                <div class="d-flex justify-content-between align-items-center">
                  <div>
                    <a href="#" class={`${css_module.text_muted} me-2`}><i class="far fa-heart me-1"></i> Like ({post.likes})</a>
                    <a href="#" class={`${css_module.text_muted}`}><i class="far fa-comment-alt me-1"></i> Comment ({post.comments})</a>
                  </div>
                  <a href="#" class={`${css_module.text_muted}`}><i class="fas fa-share"></i> Share</a>
                </div>
              </div>
            </div>
          )}</For>

          <div class="text-center">
            <button class="inline-flex items-center justify-center px-4 py-2 border border-transparent text-base font-medium rounded-md shadow-sm">Load More Posts</button>
          </div>
        </div>
      </div>
    </div>
  );
}