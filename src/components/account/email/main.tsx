import { For, createSignal, createEffect } from "solid-js";
import "./style.css"; // Assuming you have a style.css file with the provided styles

interface Email {
  id: number;
  sender: string;
  subject: string;
  date: string;
  isUnread?: boolean;
  isStarred?: boolean;
  hasAttachment?: boolean;
}

export const EmailInbox = () => {
  const [emails, setEmails] = createSignal<Email[]>([
    {
      id: 1,
      sender: "Sender 1",
      subject: "Subject of email 1",
      date: "Today, 10:30 AM",
      hasAttachment: true,
    },
    {
      id: 2,
      sender: "Sender 2",
      subject: "Another subject line",
      date: "Yesterday, 2:15 PM",
      isUnread: true,
    },
    {
      id: 3,
      sender: "Sender 3",
      subject: "Important update",
      date: "May 1, 2025, 9:00 AM",
      isStarred: true,
    },
    {
      id: 4,
      sender: "Sender 4",
      subject: "Quick question",
      date: "April 30, 2025, 5:45 PM",
      hasAttachment: true,
    },
    {
      id: 5,
      sender: "Sender 5",
      subject: "Meeting reminder",
      date: "April 29, 2025, 11:00 AM",
      isUnread: true,
    },
  ]);

  const [unreadFilter, setUnreadFilter] = createSignal(false);
  const [importantFilter, setImportantFilter] = createSignal(false);
  const [selectedEmails, setSelectedEmails] = createSignal<number[]>([]);
  const [selectAll, setSelectAll] = createSignal(false);

  const filteredEmails = () => {
    return emails().filter((email) => {
      const showsUnread = !unreadFilter() || (unreadFilter() && email.isUnread);
      const showsImportant =
        !importantFilter() || (importantFilter() && email.isStarred);
      return showsUnread && showsImportant;
    });
  };

  const handleUnreadChange = (event: Event) => {
    setUnreadFilter((event.target as HTMLInputElement).checked);
  };

  const handleImportantChange = (event: Event) => {
    setImportantFilter((event.target as HTMLInputElement).checked);
  };

  const handleSelectEmail = (id: number, event: Event) => {
    const checked = (event.target as HTMLInputElement).checked;
    setSelectedEmails((prev) => {
      if (checked) {
        return [...prev, id];
      } else {
        return prev.filter((emailId) => emailId !== id);
      }
    });
  };

  const handleSelectAllChange = (event: Event) => {
    const checked = (event.target as HTMLInputElement).checked;
    setSelectAll(checked);
    if (checked) {
      setSelectedEmails(filteredEmails().map((email) => email.id));
    } else {
      setSelectedEmails([]);
    }
  };

  createEffect(() => {
    if (filteredEmails().length > 0) {
      setSelectAll(selectedEmails().length === filteredEmails().length);
    } else {
      setSelectAll(false);
    }
  });

  const markAsRead = () => {
    setEmails((prev) =>
      prev.map((email) =>
        selectedEmails().includes(email.id)
          ? { ...email, isUnread: false }
          : email
      )
    );
    setSelectedEmails([]);
    setSelectAll(false);
  };

  const markAsUnread = () => {
    setEmails((prev) =>
      prev.map((email) =>
        selectedEmails().includes(email.id)
          ? { ...email, isUnread: true }
          : email
      )
    );
    setSelectedEmails([]);
    setSelectAll(false);
  };

  const starEmail = () => {
    setEmails((prev) =>
      prev.map((email) =>
        selectedEmails().includes(email.id)
          ? { ...email, isStarred: !email.isStarred }
          : email
      )
    );
    setSelectedEmails([]);
    setSelectAll(false);
  };

  const deleteEmail = () => {
    setEmails((prev) =>
      prev.filter((email) => !selectedEmails().includes(email.id))
    );
    setSelectedEmails([]);
    setSelectAll(false);
  };

  return (
    <div class="email-app">
      <aside class="email-app-sidebar">
        <button class="compose-btn">
          <i class="fas fa-plus me-2"></i> Compose
        </button>
        <ul class="nav-list">
          <li class="nav-item">
            <a class="nav-link active" href="#">
              <i class="fas fa-inbox me-2"></i> Inbox
              <span class="badge bg-primary rounded-pill">
                {emails().filter((e) => e.isUnread).length}
              </span>
            </a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="#">
              <i class="fas fa-star me-2"></i> Starred
            </a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="#">
              <i class="fas fa-paper-plane me-2"></i> Sent
            </a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="#">
              <i class="fas fa-file-alt me-2"></i> Drafts
              <span class="badge bg-secondary rounded-pill">3</span>
            </a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="#">
              <i class="fas fa-trash me-2"></i> Trash
            </a>
          </li>
        </ul>
        <hr />
        <h6>Filters</h6>
        <div class="form-check">
          <input
            class="form-check-input"
            type="checkbox"
            id="unread"
            checked={unreadFilter()}
            onChange={handleUnreadChange}
          />
          <label class="form-check-label" for="unread">
            Unread
          </label>
        </div>
        <div class="form-check">
          <input
            class="form-check-input"
            type="checkbox"
            id="important"
            checked={importantFilter()}
            onChange={handleImportantChange}
          />
          <label class="form-check-label" for="important">
            Important
          </label>
        </div>
        <hr />
        <h6>Labels</h6>
        <ul class="nav-list">
          <li class="nav-item">
            <a class="nav-link" href="#">
              <i class="fas fa-circle text-primary me-2"></i> Work
            </a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="#">
              <i class="fas fa-circle text-success me-2"></i> Personal
            </a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="#">
              <i class="fas fa-circle text-warning me-2"></i> Urgent
            </a>
          </li>
        </ul>
      </aside>

      <main class="email-app-main-content">
        <div class="header-controls">
          <h3>Inbox</h3>
          <div class="search-box">
            <input
              type="text"
              class="form-control form-control-sm"
              placeholder="Search emails..."
            />
            <button class="btn btn-outline-secondary btn-sm">
              <i class="fas fa-search"></i>
            </button>
          </div>
        </div>

        <div class="toolbar">
          <div class="form-check">
            <input
              class="form-check-input"
              type="checkbox"
              id="selectAll"
              checked={selectAll()}
              onChange={handleSelectAllChange}
            />
            <label class="form-check-label" for="selectAll"></label>
          </div>
          <div class="btn-group btn-group-sm">
            <button
              class="btn btn-outline-secondary"
              onClick={markAsRead}
              disabled={selectedEmails().length === 0}
            >
              <i class="fas fa-envelope-open"></i> Mark as Read
            </button>
            <button
              class="btn btn-outline-secondary"
              onClick={markAsUnread}
              disabled={selectedEmails().length === 0}
            >
              <i class="fas fa-envelope"></i> Mark as Unread
            </button>
            <button
              class="btn btn-outline-secondary"
              onClick={starEmail}
              disabled={selectedEmails().length === 0}
            >
              <i class="fas fa-star"></i> Star
            </button>
            <button
              class="btn btn-outline-secondary"
              onClick={deleteEmail}
              disabled={selectedEmails().length === 0}
            >
              <i class="fas fa-trash"></i> Delete
            </button>
          </div>
          <div class="ms-auto dropdown">
            <button
              class="btn btn-outline-secondary btn-sm dropdown-toggle"
              type="button"
              id="sortDropdown"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              Sort by Date
            </button>
            <ul
              class="dropdown-menu dropdown-menu-end"
              aria-labelledby="sortDropdown"
            >
              <li>
                <a class="dropdown-item" href="#">
                  Date (Newest First)
                </a>
              </li>
              <li>
                <a class="dropdown-item" href="#">
                  Date (Oldest First)
                </a>
              </li>
              <li>
                <a class="dropdown-item" href="#">
                  Sender (A-Z)
                </a>
              </li>
              <li>
                <a class="dropdown-item" href="#">
                  Sender (Z-A)
                </a>
              </li>
              <li>
                <a class="dropdown-item" href="#">
                  Subject (A-Z)
                </a>
              </li>
              <li>
                <a class="dropdown-item" href="#">
                  Subject (Z-A)
                </a>
              </li>
            </ul>
          </div>
        </div>

        <ul class="email-list">
          <For each={filteredEmails()}>
            {(email) => (
              <li
                class={`list-group-item d-flex align-items-center ${
                  email.isUnread ? "unread" : ""
                } ${email.isStarred ? "starred" : ""}`}
              >
                <div class="form-check">
                  <input
                    class="form-check-input"
                    type="checkbox"
                    id={`email${email.id}`}
                    checked={selectedEmails().includes(email.id)}
                    onChange={(event) => handleSelectEmail(email.id, event)}
                  />
                  <label
                    class="form-check-label"
                    for={`email${email.id}`}
                  ></label>
                </div>
                <span class="fw-bold">{email.sender}</span> -
                <span class="subject">{email.subject}</span>
                <span class="ms-auto text-muted small">{email.date}</span>
                {email.hasAttachment && (
                  <i class="fas fa-paperclip ms-2 text-muted"></i>
                )}
                {email.isStarred && (
                  <i class="fas fa-star text-warning ms-2"></i>
                )}
              </li>
            )}
          </For>
        </ul>

        <div class="pagination-container">
          <nav aria-label="Page navigation">
            <ul class="pagination pagination-sm">
              <li class="page-item disabled">
                <a class="page-link" href="#" aria-label="Previous">
                  <span aria-hidden="true">&laquo;</span>
                </a>
              </li>
              <li class="page-item active">
                <a class="page-link" href="#">
                  1
                </a>
              </li>
              <li class="page-item">
                <a class="page-link" href="#">
                  2
                </a>
              </li>
              <li class="page-item">
                <a class="page-link" href="#">
                  3
                </a>
              </li>
              <li class="page-item">
                <a class="page-link" href="#" aria-label="Next">
                  <span aria-hidden="true">&raquo;</span>
                </a>
              </li>
            </ul>
          </nav>
        </div>
      </main>
    </div>
  );
};
