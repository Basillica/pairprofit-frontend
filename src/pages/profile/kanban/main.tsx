import { createSignal, For, createMemo, onMount } from 'solid-js';
import { v4 as uuidv4 } from 'uuid';
import './style.css'; // Assuming you'll have a kanban.css file

// interface Task {
//   id: string;
//   title: string;
//   description?: string;
// }

// interface Column {
//   id: string;
//   title: string;
//   tasks: Task[];
// }

// export const KanbanBoard = () => {
//   const [columns, setColumns] = createSignal<Column[]>([
//     { id: uuidv4(), title: 'To Do', tasks: [{ id: uuidv4(), title: 'Task 1', description: 'Description for task 1' }] },
//     { id: uuidv4(), title: 'In Progress', tasks: [{ id: uuidv4(), title: 'Task 2' }] },
//     { id: uuidv4(), title: 'Done', tasks: [] },
//   ]);
//   const [newColumnTitle, setNewColumnTitle] = createSignal('');
//   const [draggedTask, setDraggedTask] = createSignal<Task | null>(null);
//   const [dragSourceColumnId, setDragSourceColumnId] = createSignal<string | null>(null);

//   const handleAddColumn = () => {
//     if (newColumnTitle().trim()) {
//       setColumns([...columns(), { id: uuidv4(), title: newColumnTitle(), tasks: [] }]);
//       setNewColumnTitle('');
//     }
//   };

//   const handleDeleteColumn = (columnId: string) => {
//     setColumns(columns().filter(col => col.id !== columnId));
//   };

//   const handleAddTask = (columnId: string) => {
//     const newTaskTitle = prompt('Enter new task title:');
//     if (newTaskTitle) {
//       setColumns(columns().map(col =>
//         col.id === columnId ? { ...col, tasks: [...col.tasks, { id: uuidv4(), title: newTaskTitle }] } : col
//       ));
//     }
//   };

//   const handleDragStart = (e: DragEvent, task: Task, columnId: string) => {
//     setDraggedTask(task);
//     setDragSourceColumnId(columnId);
//     e.dataTransfer!.setData('text/plain', task.id); // Required for Firefox
//     e.dataTransfer!.effectAllowed = 'move';
//     // Add a dragging class to the dragged element for styling
//     (e.target as HTMLElement).classList.add('is-dragging');
//   };

//   const handleDragOver = (e: DragEvent) => {
//     e.preventDefault();
//     e.dataTransfer!.dropEffect = 'move';
//   };

//   const handleDrop = (e: DragEvent, targetColumnId: string) => {
//     e.preventDefault();
//     const task = draggedTask();
//     const sourceColumnId = dragSourceColumnId();

//     if (task && sourceColumnId !== targetColumnId) {
//       setColumns(prevColumns => {
//         // Remove task from source column
//         const updatedSourceColumn = prevColumns.find(col => col.id === sourceColumnId)!;
//         const updatedSourceTasks = updatedSourceColumn.tasks.filter(t => t.id !== task.id);

//         // Add task to target column
//         const updatedTargetColumn = prevColumns.find(col => col.id === targetColumnId)!;
//         const updatedTargetTasks = [...updatedTargetColumn.tasks, task];

//         return prevColumns.map(col => {
//           if (col.id === sourceColumnId) {
//             return { ...col, tasks: updatedSourceTasks };
//           }
//           if (col.id === targetColumnId) {
//             return { ...col, tasks: updatedTargetTasks };
//           }
//           return col;
//         });
//       });
//       setDraggedTask(null);
//       setDragSourceColumnId(null);
//     }
//     // Remove dragging class from all task cards
//     document.querySelectorAll('.task-card').forEach(card => card.classList.remove('is-dragging'));
//   };

//   const TaskCard = (props: { task: Task; columnId: string }) => {
//     const [isMenuOpen, setIsMenuOpen] = createSignal(false);

//     const toggleMenu = (e: MouseEvent) => {
//       e.stopPropagation(); // Prevent drag from triggering
//       setIsMenuOpen(!isMenuOpen());
//     };

//     const handleEdit = (e: MouseEvent) => {
//       e.stopPropagation();
//       alert(`Edit: ${props.task.title}`);
//       setIsMenuOpen(false);
//     };

//     const handleDeleteTask = (e: MouseEvent) => {
//       e.stopPropagation();
//       const confirmDelete = confirm(`Delete task "${props.task.title}"?`);
//       if (confirmDelete) {
//         setColumns(columns().map(col => ({
//           ...col,
//           tasks: col.tasks.filter(task => task.id !== props.task.id),
//         })));
//       }
//       setIsMenuOpen(false);
//     };

//     const handleCopyUrl = (e: MouseEvent) => {
//       e.stopPropagation();
//       alert(`Copy URL: /tasks/${props.task.id}`);
//       setIsMenuOpen(false);
//     };

//     return (
//       <div
//         class="task-card"
//         draggable="true"
//         onDragStart={(e) => handleDragStart(e, props.task, props.columnId)}
//         onDragEnd={() => document.querySelectorAll('.task-card').forEach(card => card.classList.remove('is-dragging'))}
//       >
//         <div class="task-card-header">
//           <h3>{props.task.title}</h3>
//           <div class="dropdown">
//             <button class="dropdown-toggle" onClick={toggleMenu}>
//               <i class="fas fa-ellipsis-h"></i>
//             </button>
//             {isMenuOpen() && (
//               <div class="dropdown-menu">
//                 <button onClick={handleEdit}>Edit</button>
//                 <button onClick={handleDeleteTask}>Delete</button>
//                 <button onClick={handleCopyUrl}>Copy URL</button>
//               </div>
//             )}
//           </div>
//         </div>
//         {props.task.description && <p class="task-description">{props.task.description}</p>}
//       </div>
//     );
//   };

//   return (
//     <div class="kanban-board">
//       <For each={columns()}>{(column) => (
//         <div
//           class="kanban-column"
//           onDragOver={handleDragOver}
//           onDrop={(e) => handleDrop(e, column.id)}
//         >
//           <h2>{column.title}</h2>
//           <div class="task-list">
//             <For each={column.tasks}>{(task) => <TaskCard task={task} columnId={column.id} />}</For>
//           </div>
//           <button class="add-task-button" onClick={() => handleAddTask(column.id)}>
//             <i class="fas fa-plus"></i> Add Task
//           </button>
//           <button class="delete-column-button" onClick={() => handleDeleteColumn(column.id)}>
//             <i class="fas fa-trash"></i> Delete Column
//           </button>
//         </div>
//       )}</For>

//       <div class="add-column">
//         <input
//           type="text"
//           placeholder="New column title"
//           value={newColumnTitle()}
//           onChange={(e) => setNewColumnTitle(e.currentTarget.value)}
//         />
//         <button onClick={handleAddColumn}>Add Column</button>
//       </div>
//     </div>
//   );
// };


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
    { id: uuidv4(), title: 'To Do', tasks: [{ id: uuidv4(), title: 'Task 1', description: 'Description for task 1', creationDate: new Date() }] },
    { id: uuidv4(), title: 'In Progress', tasks: [{ id: uuidv4(), title: 'Task 2', creationDate: new Date() }] },
    { id: uuidv4(), title: 'Done', tasks: [] },
  ]);
  const [newColumnTitle, setNewColumnTitle] = createSignal('');
  const [draggedTask, setDraggedTask] = createSignal<Task | null>(null);
  const [dragSourceColumnId, setDragSourceColumnId] = createSignal<string | null>(null);
  const [isAddTaskModalOpen, setIsAddTaskModalOpen] = createSignal(false);
  const [currentColumnIdForNewTask, setCurrentColumnIdForNewTask] = createSignal<string | null>(null);
  const [newTaskTitle, setNewTaskTitle] = createSignal('');
  const [newTaskDescription, setNewTaskDescription] = createSignal('');
  const [newTaskImage, setNewTaskImage] = createSignal<string | undefined>(undefined);
  const [newTaskDueDate, setNewTaskDueDate] = createSignal<string | undefined>(undefined);

  const handleAddColumn = () => {
    if (newColumnTitle().trim()) {
      setColumns([...columns(), { id: uuidv4(), title: newColumnTitle(), tasks: [] }]);
      setNewColumnTitle('');
    }
  };

  const handleDeleteColumn = (columnId: string) => {
    setColumns(columns().filter(col => col.id !== columnId));
  };

  const openAddTaskModal = (columnId: string) => {
    setCurrentColumnIdForNewTask(columnId);
    setIsAddTaskModalOpen(true);
    setNewTaskTitle('');
    setNewTaskDescription('');
    setNewTaskImage(undefined);
    setNewTaskDueDate(undefined);
  };

  const closeAddTaskModal = () => {
    setIsAddTaskModalOpen(false);
    setCurrentColumnIdForNewTask(null);
  };

  const handleCreateNewTask = () => {
    if (currentColumnIdForNewTask()) {
      const newTask: Task = {
        id: uuidv4(),
        title: newTaskTitle(),
        description: newTaskDescription(),
        image: newTaskImage(),
        creationDate: new Date(),
        dueDate: newTaskDueDate() ? new Date(newTaskDueDate()!) : undefined,
      };
      setColumns(prevColumns =>
        prevColumns.map(col =>
          col.id === currentColumnIdForNewTask() ? { ...col, tasks: [...col.tasks, newTask] } : col
        )
      );
      closeAddTaskModal();
    }
  };

  const handleImageUpload = (e: Event) => {
    const file = (e.target as HTMLInputElement).files?.[0];
    if (file) {
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
    e.dataTransfer!.setData('text/plain', task.id); // Required for Firefox
    e.dataTransfer!.effectAllowed = 'move';
    (e.target as HTMLElement).classList.add('is-dragging');
  };

  const handleDragOver = (e: DragEvent) => {
    e.preventDefault();
    e.dataTransfer!.dropEffect = 'move';
  };

  const handleDrop = (e: DragEvent, targetColumnId: string) => {
    e.preventDefault();
    const task = draggedTask();
    const sourceColumnId = dragSourceColumnId();

    if (task && sourceColumnId !== targetColumnId) {
      setColumns(prevColumns => {
        const updatedSourceColumn = prevColumns.find(col => col.id === sourceColumnId)!;
        const updatedSourceTasks = updatedSourceColumn.tasks.filter(t => t.id !== task.id);
        const updatedTargetColumn = prevColumns.find(col => col.id === targetColumnId)!;
        const updatedTargetTasks = [...updatedTargetColumn.tasks, task];

        return prevColumns.map(col => {
          if (col.id === sourceColumnId) {
            return { ...col, tasks: updatedSourceTasks };
          }
          if (col.id === targetColumnId) {
            return { ...col, tasks: updatedTargetTasks };
          }
          return col;
        });
      });
      setDraggedTask(null);
      setDragSourceColumnId(null);
    }
    document.querySelectorAll('.task-card').forEach(card => card.classList.remove('is-dragging'));
  };

  const TaskCard = (props: { task: Task; columnId: string }) => {
    const [isMenuOpen, setIsMenuOpen] = createSignal(false);

    const toggleMenu = (e: MouseEvent) => {
      e.stopPropagation();
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
        setColumns(columns().map(col => ({
          ...col,
          tasks: col.tasks.filter(task => task.id !== props.task.id),
        })));
      }
      setIsMenuOpen(false);
    };

    const handleCopyUrl = (e: MouseEvent) => {
      e.stopPropagation();
      alert(`Copy URL: /tasks/${props.task.id}`);
      setIsMenuOpen(false);
    };

    return (
      <div
        class="task-card"
        draggable="true"
        onDragStart={(e) => handleDragStart(e, props.task, props.columnId)}
        onDragEnd={() => document.querySelectorAll('.task-card').forEach(card => card.classList.remove('is-dragging'))}
      >
        <div class="task-card-header">
          <h3>{props.task.title}</h3>
          <div class="dropdown">
            <button class="dropdown-toggle" onClick={(e) => { e.stopPropagation(); toggleMenu(e); }}>
              <i class="fas fa-ellipsis-h"></i>
            </button>
            {isMenuOpen() && (
              <div class="dropdown-menu">
                <button onClick={handleEdit}>Edit</button>
                <button onClick={handleDeleteTask}>Delete</button>
                <button onClick={handleCopyUrl}>Copy URL</button>
              </div>
            )}
          </div>
        </div>
        {props.task.description && <p class="task-description">{props.task.description}</p>}
        {props.task.image && <img src={props.task.image} alt="Task Image" class="task-image" />}
        <p class="task-creation-date">Created: {props.task.creationDate.toLocaleDateString()}</p>
        {props.task.dueDate && <p class="task-due-date">Due: {props.task.dueDate.toLocaleDateString()}</p>}
      </div>
    );
  };

  return (
    <div class="kanban-board">
      <For each={columns()}>{(column) => (
        <div
          class="kanban-column"
          onDragOver={handleDragOver}
          onDrop={(e) => handleDrop(e, column.id)}
        >
          <h2>{column.title}</h2>
          <div class="task-list">
            <For each={column.tasks}>{(task) => <TaskCard task={task} columnId={column.id} />}</For>
          </div>
          <button class="add-task-button" onClick={() => openAddTaskModal(column.id)}>
            <i class="fas fa-plus"></i> Add Task
          </button>
          <button class="delete-column-button" onClick={() => handleDeleteColumn(column.id)}>
            <i class="fas fa-trash"></i> Delete Column
          </button>
        </div>
      )}</For>

      <div class="add-column">
        <input
          type="text"
          placeholder="New column title"
          value={newColumnTitle()}
          onChange={(e) => setNewColumnTitle(e.currentTarget.value)}
        />
        <button onClick={handleAddColumn}>Add Column</button>
      </div>

      {/* Add Task Modal */}
      {isAddTaskModalOpen() && (
        <div class="modal">
          <div class="modal-content">
            <h2>Add New Task</h2>
            <label for="task-title">Title:</label>
            <input type="text" id="task-title" value={newTaskTitle()} onChange={(e) => setNewTaskTitle(e.currentTarget.value)} />

            <label for="task-description">Description:</label>
            <textarea id="task-description" value={newTaskDescription()} onChange={(e) => setNewTaskDescription(e.currentTarget.value)}></textarea>

            <label for="task-image">Image:</label>
            <input type="file" id="task-image" accept="image/*" onChange={handleImageUpload} />
            {newTaskImage() && <img src={newTaskImage()} alt="Preview" class="image-preview" />}

            <label for="task-due-date">Due Date:</label>
            <input type="date" id="task-due-date" value={newTaskDueDate() || ''} onChange={(e) => setNewTaskDueDate(e.currentTarget.value)} />

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