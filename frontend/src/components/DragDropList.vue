<script setup lang="ts">
import { computed, ref } from 'vue';

interface Link {
  id: string;
  name?: string;
  url?: string;
}

const props = defineProps<{
  initialItems: Link[];
}>();

const emit = defineEmits<{
  (e: 'update:items', items: Link[]): void;
}>();

const items = ref<Link[]>([...props.initialItems]);
const isDragging = ref(false);
const dragIndex = ref<number | null>(null);
const dragOverIndex = ref<number | null>(null);
const isKeyboardDragging = ref(false);
const dragItemId = ref<string | number | null>(null);
const originalIndex = ref<number | null>(null);

const displayItems = computed(() => {
  if (
    !isDragging.value ||
    dragItemId.value === null ||
    dragOverIndex.value === null ||
    originalIndex.value === null
  ) {
    return props.initialItems;
  }

  const draggedItem = props.initialItems.find((item) => item.id === dragItemId.value);
  if (!draggedItem) return props.initialItems;

  const result = [...props.initialItems];

  const tempResult = [...props.initialItems];
  tempResult.splice(originalIndex.value, 1);
  tempResult.splice(dragOverIndex.value, 0, draggedItem);

  return tempResult;
});

const handleDragStart = (event: DragEvent, index: number, itemId: string | number) => {
  if (!event.dataTransfer) return;

  isDragging.value = true;
  dragIndex.value = index;

  dragItemId.value = itemId;
  originalIndex.value = index;

  event.dataTransfer.effectAllowed = 'move';
  event.dataTransfer.setData('text/plain', index.toString());

  if (event.target instanceof HTMLElement) {
    const clone = event.target.cloneNode(true) as HTMLElement;
    clone.style.opacity = '0.5';
    clone.style.position = 'absolute';
    clone.style.left = '-1000px';
    clone.style.top = '-1000px';
    document.body.appendChild(clone);

    event.dataTransfer.setDragImage(clone, 20, 20);

    setTimeout(() => {
      document.body.removeChild(clone);
    }, 0);
  }

  announceToScreenReader(`Inizio trascinamento elemento ${index + 1} di ${items.value.length}`);
};

const handleDragOver = (event: DragEvent, index: number) => {
  if (!event.dataTransfer) return;
  event.dataTransfer.dropEffect = 'move';
};

const handleDragEnter = (event: DragEvent, index: number) => {
  if (dragItemId.value !== null) {
    dragOverIndex.value = index;
    announceToScreenReader(`Sopra l'elemento ${index + 1}`);
  }
};

const handleDragLeave = (event: DragEvent, index: number) => {
  if (dragOverIndex.value === index) {
  }
};

const handleDrop = (event: DragEvent, index: number) => {
  if (
    dragIndex.value === null ||
    dragIndex.value === index ||
    originalIndex.value === null ||
    dragItemId.value === null
  )
    return;

  const fromIndex = dragIndex.value;
  const toIndex = index;

  moveItem(fromIndex, toIndex);

  dragOverIndex.value = null;

  announceToScreenReader(`Elemento spostato alla posizione ${index + 1}`);
};

const handleDragEnd = () => {
  isDragging.value = false;
  dragIndex.value = null;
  dragOverIndex.value = null;

  dragItemId.value = null;
  originalIndex.value = null;
};

const handleKeyDown = (event: KeyboardEvent, index: number) => {
  const key = event.key;

  if (isKeyboardDragging.value) {
    switch (key) {
      case 'ArrowUp':
        if (index >= 0) {
          event.preventDefault();
          dragOverIndex.value !== null ? dragOverIndex.value-- : (dragOverIndex.value = index - 1);
          announceToScreenReader(`Anteprima sopra l'elemento ${index}`);
        }
        break;
      case 'ArrowDown':
        if (index < items.value.length - 1) {
          event.preventDefault();
          dragOverIndex.value !== null ? dragOverIndex.value++ : (dragOverIndex.value = index + 1);
          announceToScreenReader(`Anteprima sotto l'elemento ${index + 2}`);
        }
        break;
      case ' ':
      case 'Enter':
        event.preventDefault();
        if (dragOverIndex.value !== null) {
          moveItem(index, dragOverIndex.value);
          announceToScreenReader(`Elemento spostato alla posizione ${dragOverIndex.value + 1}`);
        }
        // Reset
        isKeyboardDragging.value = false;
        dragIndex.value = null;
        dragOverIndex.value = null;
        break;
      case 'Escape':
        event.preventDefault();
        isKeyboardDragging.value = false;
        dragIndex.value = null;
        dragOverIndex.value = null;
        announceToScreenReader('Operazione di trascinamento annullata');
        break;
    }
  } else {
    switch (key) {
      case ' ':
      case 'Enter':
        event.preventDefault();
        isKeyboardDragging.value = true;
        dragIndex.value = index;
        announceToScreenReader(
          `Elemento ${index + 1} selezionato. Utilizzare le frecce per spostarlo e Spazio per confermare.`
        );
        break;
    }
  }
};

const moveItem = (fromIndex: number, toIndex: number) => {
  const newItems = [...items.value];
  const [movedItem] = newItems.splice(fromIndex, 1);
  newItems.splice(toIndex, 0, movedItem);

  items.value = newItems;

  emit('update:items', newItems);
};

const announceToScreenReader = (message: string) => {
  const announcement = document.createElement('div');
  announcement.setAttribute('aria-live', 'assertive');
  announcement.setAttribute('class', 'screen-reader-only');
  announcement.textContent = message;

  document.body.appendChild(announcement);

  setTimeout(() => {
    document.body.removeChild(announcement);
  }, 1000);
};
</script>

<template>
  <div class="draggable-container">
    <TransitionGroup
      tag="ul"
      name="list"
      class="draggable-list"
      aria-describedby="dragInstructions"
    >
      <li
        v-for="(item, index) in displayItems"
        :key="item.id"
        :class="{
          'draggable-item': true,
          'is-dragging': isDragging && dragItemId === item.id,
          'is-preview': isDragging && dragOverIndex === index && dragItemId !== item.id,
          'drag-placeholder': isDragging && originalIndex === index && dragItemId === item.id,
          'preview-keyboard': dragOverIndex === index && isKeyboardDragging
        }"
        :aria-grabbed="isDragging && dragIndex === index ? 'true' : 'false'"
        :aria-dropeffect="dragOverIndex === index ? 'move' : 'none'"
        :data-index="index"
        :id="`item-${item.id}`"
        tabindex="0"
        draggable="true"
        @dragstart="handleDragStart($event, index, item.id)"
        @dragend="handleDragEnd"
        @dragover.prevent="handleDragOver($event, index)"
        @dragenter.prevent="handleDragEnter($event, index)"
        @dragleave="handleDragLeave($event, index)"
        @drop.prevent="handleDrop($event, index)"
        @keydown="handleKeyDown($event, index)"
      >
        <div v-if="$slots.item" class="item-content">
          <slot name="item" v-bind="{ item, index }"></slot>
        </div>
      </li>
    </TransitionGroup>
    <div id="dragInstructions" class="screen-reader-only">
      To reorder items, use the up and down arrow keys to select an item, then press Space to select
      it, use the arrows again to move it, and press Space to confirm the new position.
    </div>
  </div>
</template>

<style scoped lang="scss">
@use '@/scss/abstracts' as *;

.draggable-container {
  width: 100%;
  margin: 0 auto;
}

.draggable-list {
  list-style: none;
  padding: 0;
  margin: 0;
  position: relative;
}

.draggable-item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-radius: 12px;
  margin-bottom: 8px;
  cursor: grab;
  position: relative;
  user-select: none;
  touch-action: none;
}

.draggable-item:focus-visible {
  outline: 2px solid $color-main;
  box-shadow: 0 0 0 2px rgba(52, 152, 219, 0.3);
}

.draggable-item.is-dragging {
  opacity: 0.4;
  border: 2px dashed $color-main;
}

.draggable-item.list-move {
  pointer-events: none;
}

.draggable-item.drop-preview {
  border: 2px dashed $color-main;
  background-color: rgba(52, 152, 219, 0.1);
}

.preview-keyboard {
  border: 2px dashed $color-main;
  background-color: rgba(52, 152, 219, 0.1);
}

/* Original Style */
/* .draggable-item.drag-placeholder {
  opacity: 0.2;
  background-color: #e0e0e0;
  border: 2px dashed #999;
  pointer-events: none;
} */

.draggable-item.is-preview {
  border: 2px dashed $color-main;
  background-color: rgba(52, 152, 219, 0.1);
}

.item-content {
  flex: 1;
}

.screen-reader-only {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border: 0;
}

.list-move,
.list-enter-active,
.list-leave-active {
  transition: all 0.5s ease;
}

.list-enter-from,
.list-leave-to {
  opacity: 0;
  transform: translateY(30px);
}

.list-leave-active {
  position: absolute;
}
</style>
