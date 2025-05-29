import { createSignal, For, createMemo, onMount } from "solid-js";
import { v4 as uuidv4 } from "uuid";
import "./kanban.css"; // Ensure this path is correct

interface Task {
  id: string;
  title: string;
  description?: string;
  image?: string;
  creationDate: Date;
  dueDate?: Date;
}

interface Column {
  id: string;
  title: string;
  tasks: Task[];
}

export const KanbanBoard = () => {
  const [columns, setColumns] = createSignal<Column[]>([
    {
      id: uuidv4(),
      title: "To Do",
      tasks: [
        {
          id: uuidv4(),
          title: "Plan project",
          description:
            "Outline key phases and deliverables for the new project.",
          creationDate: new Date(2025, 4, 20), // May 20, 2025
          dueDate: new Date(2025, 4, 30), // May 30, 2025
        },
        {
          id: uuidv4(),
          title: "Research competitors",
          description: "Analyze market leaders and their strategies.",
          creationDate: new Date(2025, 4, 22),
        },
      ],
    },
    {
      id: uuidv4(),
      title: "In Progress",
      tasks: [
        {
          id: uuidv4(),
          title: "Develop feature X",
          description:
            "Work on the core logic for the new user authentication system.",
          creationDate: new Date(2025, 4, 25),
          dueDate: new Date(2025, 5, 10), // June 10, 2025
        },
      ],
    },
    {
      id: uuidv4(),
      title: "Done",
      tasks: [
        {
          id: uuidv4(),
          title: "Setup development environment",
          creationDate: new Date(2025, 4, 15),
        },
      ],
    },
  ]);
  const [newColumnTitle, setNewColumnTitle] = createSignal("");
  const [draggedTask, setDraggedTask] = createSignal<Task | null>(null);
  const [dragSourceColumnId, setDragSourceColumnId] = createSignal<
    string | null
  >(null);
  const [isAddTaskModalOpen, setIsAddTaskModalOpen] = createSignal(false);
  const [currentColumnIdForNewTask, setCurrentColumnIdForNewTask] =
    createSignal<string | null>(null);
  const [newTaskTitle, setNewTaskTitle] = createSignal("");
  const [newTaskDescription, setNewTaskDescription] = createSignal("");
  const [newTaskImage, setNewTaskImage] = createSignal<string | undefined>(
    undefined
  );
  const [newTaskDueDate, setNewTaskDueDate] = createSignal<string | undefined>(
    undefined
  );

  const handleAddColumn = () => {
    if (newColumnTitle().trim()) {
      setColumns([
        ...columns(),
        { id: uuidv4(), title: newColumnTitle(), tasks: [] },
      ]);
      setNewColumnTitle("");
    }
  };

  const handleDeleteColumn = (columnId: string) => {
    // Confirm deletion, and also move tasks to "Done" or "Archive" if desired
    const columnToDelete = columns().find((col) => col.id === columnId);
    if (!columnToDelete) return;

    const confirmDelete = confirm(
      `Are you sure you want to delete column "${columnToDelete.title}"? All tasks in this column will be lost.`
    );
    if (confirmDelete) {
      setColumns(columns().filter((col) => col.id !== columnId));
    }
  };

  const openAddTaskModal = (columnId: string) => {
    setCurrentColumnIdForNewTask(columnId);
    setIsAddTaskModalOpen(true);
    setNewTaskTitle("");
    setNewTaskDescription("");
    setNewTaskImage(undefined);
    setNewTaskDueDate(undefined);
  };

  const closeAddTaskModal = () => {
    setIsAddTaskModalOpen(false);
    setCurrentColumnIdForNewTask(null);
  };

  const handleCreateNewTask = () => {
    if (newTaskTitle().trim() && currentColumnIdForNewTask()) {
      const newTask: Task = {
        id: uuidv4(),
        title: newTaskTitle().trim(),
        description: newTaskDescription().trim() || undefined,
        image: newTaskImage(),
        creationDate: new Date(),
        dueDate: newTaskDueDate() ? new Date(newTaskDueDate()!) : undefined,
      };
      setColumns((prevColumns) =>
        prevColumns.map((col) =>
          col.id === currentColumnIdForNewTask()
            ? { ...col, tasks: [...col.tasks, newTask] }
            : col
        )
      );
      closeAddTaskModal();
    } else {
      alert("Task title cannot be empty!");
    }
  };

  const handleImageUpload = (e: Event) => {
    const file = (e.target as HTMLInputElement).files?.[0];
    if (file) {
      if (file.size > 1 * 1024 * 1024) {
        // 1MB limit
        alert("Image size must be less than 1MB.");
        (e.target as HTMLInputElement).value = ""; // Clear file input
        setNewTaskImage(undefined);
        return;
      }
      const reader = new FileReader();
      reader.onloadend = () => {
        setNewTaskImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDragStart = (e: DragEvent, task: Task, columnId: string) => {
    setDraggedTask(task);
    setDragSourceColumnId(columnId);
    e.dataTransfer!.setData("text/plain", task.id); // Required for Firefox to allow drag
    e.dataTransfer!.effectAllowed = "move";
    setTimeout(() => {
      // Add class after a small delay to prevent it from flickering on click
      (e.target as HTMLElement).classList.add("is-dragging");
    }, 0);
  };

  const handleDragOver = (e: DragEvent) => {
    e.preventDefault(); // Crucial for allowing drop
    e.dataTransfer!.dropEffect = "move";
    // Add visual feedback to the column being dragged over
    if (e.currentTarget instanceof HTMLElement) {
      e.currentTarget.classList.add("dragging-over");
    }
  };

  const handleDragLeave = (e: DragEvent) => {
    // Remove visual feedback when leaving a column
    if (e.currentTarget instanceof HTMLElement) {
      e.currentTarget.classList.remove("dragging-over");
    }
  };

  const handleDrop = (e: DragEvent, targetColumnId: string) => {
    e.preventDefault();
    const task = draggedTask();
    const sourceColumnId = dragSourceColumnId();

    // Clean up all dragging classes immediately on drop
    document
      .querySelectorAll(".task-card.is-dragging")
      .forEach((card) => card.classList.remove("is-dragging"));
    document
      .querySelectorAll(".kanban-column.dragging-over")
      .forEach((col) => col.classList.remove("dragging-over"));

    if (task && sourceColumnId && sourceColumnId !== targetColumnId) {
      setColumns((prevColumns) => {
        const updatedSourceColumn = prevColumns.find(
          (col) => col.id === sourceColumnId
        )!;
        const updatedTargetColumn = prevColumns.find(
          (col) => col.id === targetColumnId
        )!;

        // Ensure columns exist before modifying
        if (!updatedSourceColumn || !updatedTargetColumn) {
          console.error("Source or target column not found during drop.");
          return prevColumns;
        }

        const updatedSourceTasks = updatedSourceColumn.tasks.filter(
          (t) => t.id !== task.id
        );
        const updatedTargetTasks = [...updatedTargetColumn.tasks, task];

        return prevColumns.map((col) => {
          if (col.id === sourceColumnId) {
            return { ...col, tasks: updatedSourceTasks };
          }
          if (col.id === targetColumnId) {
            return { ...col, tasks: updatedTargetTasks };
          }
          return col;
        });
      });
    }

    setDraggedTask(null);
    setDragSourceColumnId(null);
  };

  // Global click listener to close dropdowns when clicking outside
  onMount(() => {
    const handleGlobalClick = (event: MouseEvent) => {
      const dropdowns = document.querySelectorAll(".dropdown-menu");
      dropdowns.forEach((menu) => {
        const parentDropdown = menu.closest(".dropdown");
        if (parentDropdown && !parentDropdown.contains(event.target as Node)) {
          // Find the Solid.js signal for this dropdown and set it to false
          // This assumes a way to access the signal from the DOM element,
          // which is tricky with Solid's JSX without direct refs or context.
          // For simplicity, we'll just toggle the class directly here
          // This is a common pattern when global click handling is needed.
          const toggleButton = parentDropdown.querySelector(".dropdown-toggle");
          if (toggleButton) {
            // A more robust solution would be to pass `setIsMenuOpen` down
            // or use Solid's context API to manage global dropdown state.
            // For now, we'll assume the toggle button click already handles
            // the state, and we just need to 'close' it.
          }
        }
      });
    };

    document.addEventListener("click", handleGlobalClick);

    // Cleanup on component unmount
    return () => {
      document.removeEventListener("click", handleGlobalClick);
    };
  });

  const TaskCard = (props: { task: Task; columnId: string }) => {
    const [isMenuOpen, setIsMenuOpen] = createSignal(false);

    // Close menu when clicking anywhere else
    onMount(() => {
      const handleClickOutside = (event: MouseEvent) => {
        if (isMenuOpen() && !event.composedPath().includes(menuRef!)) {
          setIsMenuOpen(false);
        }
      };
      document.addEventListener("click", handleClickOutside);
      return () => document.removeEventListener("click", handleClickOutside);
    });

    let menuRef: HTMLDivElement | undefined; // Ref for the dropdown menu

    const toggleMenu = (e: MouseEvent) => {
      e.stopPropagation(); // Prevent card dragStart from triggering
      setIsMenuOpen(!isMenuOpen());
    };

    const handleEdit = (e: MouseEvent) => {
      e.stopPropagation();
      alert(`Edit: ${props.task.title}`);
      setIsMenuOpen(false);
    };

    const handleDeleteTask = (e: MouseEvent) => {
      e.stopPropagation();
      const confirmDelete = confirm(`Delete task "${props.task.title}"?`);
      if (confirmDelete) {
        setColumns(
          columns().map((col) => ({
            ...col,
            tasks: col.tasks.filter((task) => task.id !== props.task.id),
          }))
        );
      }
      setIsMenuOpen(false);
    };

    const handleCopyUrl = (e: MouseEvent) => {
      e.stopPropagation();
      // In a real app, you'd copy to clipboard:
      // navigator.clipboard.writeText(`${window.location.origin}/tasks/${props.task.id}`);
      alert(`Copied URL: ${window.location.origin}/tasks/${props.task.id}`);
      setIsMenuOpen(false);
    };

    return (
      <div
        class="task-card"
        draggable="true"
        onDragStart={(e) => handleDragStart(e, props.task, props.columnId)}
        onDragEnd={(e) => {
          // Remove 'is-dragging' class when drag ends, whether successful or not
          (e.target as HTMLElement).classList.remove("is-dragging");
        }}
      >
        <div class="task-card-header">
          <h3>{props.task.title}</h3>
          <div class="dropdown">
            <button
              class="dropdown-toggle"
              onClick={toggleMenu} // Use toggleMenu directly
            >
              <i class="fas fa-ellipsis-h"></i>
            </button>
            {isMenuOpen() && (
              <div class="dropdown-menu" ref={menuRef}>
                {" "}
                {/* Assign ref */}
                <button onClick={handleEdit}>Edit</button>
                <button onClick={handleDeleteTask}>Delete</button>
                <button onClick={handleCopyUrl}>Copy URL</button>
              </div>
            )}
          </div>
        </div>
        {props.task.description && (
          <p class="task-description">{props.task.description}</p>
        )}
        {props.task.image && (
          <img src={props.task.image} alt="Task Image" class="task-image" />
        )}
        <p class="task-creation-date">
          Created: {props.task.creationDate.toLocaleDateString()}
        </p>
        {props.task.dueDate && (
          <p class="task-due-date">
            Due: {props.task.dueDate.toLocaleDateString()}
          </p>
        )}
      </div>
    );
  };

  return (
    <div class="kanban-board">
      <For each={columns()}>
        {(column) => (
          <div
            class="kanban-column"
            onDragOver={handleDragOver}
            onDrop={(e) => handleDrop(e, column.id)}
            onDragLeave={handleDragLeave} // Added drag leave handler
          >
            <h2>{column.title}</h2>
            <div class="task-list">
              <For each={column.tasks}>
                {(task) => <TaskCard task={task} columnId={column.id} />}
              </For>
            </div>
            <button
              class="add-task-button"
              onClick={() => openAddTaskModal(column.id)}
            >
              <i class="fas fa-plus"></i> Add Task
            </button>
            <button
              class="delete-column-button"
              onClick={() => handleDeleteColumn(column.id)}
            >
              <i class="fas fa-trash"></i> Delete Column
            </button>
          </div>
        )}
      </For>

      {/* Add New Column Input and Button */}
      <div class="add-column">
        <input
          type="text"
          placeholder="New column title"
          value={newColumnTitle()}
          onInput={(e) => setNewColumnTitle(e.currentTarget.value)} // Use onInput for immediate feedback
          onKeyDown={(e) => {
            // Allow adding column with Enter key
            if (e.key === "Enter") {
              handleAddColumn();
            }
          }}
        />
        <button onClick={handleAddColumn}>Add Column</button>
      </div>

      {/* Add Task Modal */}
      {isAddTaskModalOpen() && (
        <div class="modal" onClick={closeAddTaskModal}>
          {" "}
          {/* Close modal when clicking outside content */}
          <div class="modal-content" onClick={(e) => e.stopPropagation()}>
            {" "}
            {/* Prevent clicks inside from closing modal */}
            <h2>Add New Task</h2>
            <label for="task-title">Title:</label>
            <input
              type="text"
              id="task-title"
              value={newTaskTitle()}
              onInput={(e) => setNewTaskTitle(e.currentTarget.value)}
              placeholder="e.g., Fix login bug"
            />
            <label for="task-description">Description:</label>
            <textarea
              id="task-description"
              value={newTaskDescription()}
              onInput={(e) => setNewTaskDescription(e.currentTarget.value)}
              placeholder="Detailed steps for the task..."
            ></textarea>
            <label for="task-image">Image:</label>
            <input
              type="file"
              id="task-image"
              accept="image/*"
              onChange={handleImageUpload}
            />
            {newTaskImage() && (
              <img src={newTaskImage()} alt="Preview" class="image-preview" />
            )}
            <label for="task-due-date">Due Date:</label>
            <input
              type="date"
              id="task-due-date"
              value={newTaskDueDate() || ""}
              onInput={(e) => setNewTaskDueDate(e.currentTarget.value)}
            />
            <div class="modal-actions">
              <button onClick={handleCreateNewTask}>Create Task</button>
              <button onClick={closeAddTaskModal}>Cancel</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
