<script lang="ts" setup>
import { ref } from 'vue';
import { useField } from 'vee-validate';
import SvgIcon from '../SvgIcon.vue';

const props = defineProps<{
  inputId: string;
  rules?: any;
  value?: string;
}>();

const bgImage = ref('');

const {
  value: inputValue,
  errorMessage,
  handleChange,
  meta
} = useField('fileUpload', props.rules, {
  initialValue: props.value || null
});

const dropZoneEl = ref<HTMLElement | null>(null);

const processFile = (file: File) => {
  const _URL = window.URL || window.webkitURL;
  let img = new Image();
  const objectUrl = _URL.createObjectURL(file);
  img.onload = () => {
    _URL.revokeObjectURL(objectUrl);
  };
  img.src = objectUrl;
  bgImage.value = objectUrl;

  const fakeEvent = {
    target: {
      files: [file]
    }
  } as unknown as Event;
  handleChange(fakeEvent);
};

const handleUpload = (e: Event) => {
  const target = e.target as HTMLInputElement;
  if (target.files && target.files[0]) {
    processFile(target.files[0]);
  }
};

const onDrop = (e: DragEvent) => {
  e.preventDefault();
  e.stopPropagation();
  if (e.dataTransfer && e.dataTransfer.files && e.dataTransfer.files.length) {
    processFile(e.dataTransfer.files[0]);
  }

  if (dropZoneEl.value) {
    dropZoneEl.value.classList.remove('drag-over');
  }
};

const onDragOver = (e: DragEvent) => {
  e.preventDefault();
  e.stopPropagation();
  if (dropZoneEl.value) {
    dropZoneEl.value.classList.add('drag-over');
  }
};
const onDragLeave = (e: DragEvent) => {
  e.preventDefault();
  e.stopPropagation();
  if (dropZoneEl.value) {
    dropZoneEl.value.classList.remove('drag-over');
  }
};

const onKeyDown = (e: Event) => {
  if (e instanceof KeyboardEvent && (e.key === 'Enter' || e.key === ' ')) {
    e.preventDefault();
  }
  const inputEl = dropZoneEl.value?.querySelector('input[type="file"]') as HTMLInputElement | null;
  inputEl?.click();
};
</script>

<template>
  <div class="file-upload-wrapper">
    <label :for="props.inputId" class="file-upload-label body-m"> Profile picture </label>

    <button
      ref="dropZoneEl"
      class="file-upload-dropzone"
      role="button"
      aria-label="Upload image"
      tabindex="0"
      @keydown="onKeyDown"
      @click="onKeyDown"
      @dragover="onDragOver"
      @dragleave="onDragLeave"
      @drop="onDrop"
      :style="bgImage ? { backgroundImage: 'url(' + bgImage + ')' } : {}"
      :class="bgImage ? 'full' : 'empty'"
    >
      <div class="text-wrapper">
        <SvgIcon name="image" aria-hidden="true" />

        <span class="empty-label">+ Upload image</span>
        <span class="full-label">Change image</span>
      </div>

      <input
        name="fileUpload"
        :id="props.inputId"
        type="file"
        class="sr-only"
        @change="handleUpload"
        accept="image/png, image/jpeg"
        aria-describedby="file-upload-desc"
      />
    </button>

    <p id="file-upload-desc" class="sr-only">
      Select an image PNG or JPEG. Image must be below 1024x1024px.
    </p>

    <p class="body-s">Image must be below 1024x1024px. Use PNG or JPG format.</p>

    <p class="message" v-show="errorMessage">
      {{ errorMessage }}
    </p>
  </div>
</template>

<style scoped lang="scss">
@use '@/scss/abstracts' as *;

.file-upload-wrapper {
  background-color: $color-grey-light;
  padding: rem(20);
  border-radius: 12px;
  display: flex;
  align-items: center;
  gap: rem(24);

  .file-upload-label {
    flex: 1 1 auto;
  }

  > p {
    flex: 0 1 auto;
  }

  .file-upload-dropzone {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 193px;
    height: 193px;
    border-radius: 8px;
    background-color: $color-purple-light;
    cursor: pointer;
    background-repeat: no-repeat;
    background-size: cover;
    background-position: center center;
    position: relative;
    overflow: hidden;
    border: none;
    flex: 0 1 auto;

    &:focus-visible,
    &.drag-over {
      outline: 2px solid $color-main;
      box-shadow: 0 0 0 2px rgba($color-main, 0.3);
    }

    .text-wrapper {
      @extend .heading-s;
      color: $color-main;
      text-align: center;
      z-index: 1;

      svg {
        display: block;
        margin: 0 auto;
        margin-bottom: 8px;
        width: 32px;
        height: 32px;
      }

      .full-label {
        display: none;
      }
    }

    input[type='file'] {
      position: absolute;
      top: 0;
      left: 0;
      width: 0;
    }

    &.full {
      &::after {
        content: '';
        position: absolute;
        left: 0;
        top: 0;
        width: 100%;
        height: 100%;
        background-color: $black;
        opacity: 0.5;
      }

      .text-wrapper {
        color: $white;

        svg {
          path {
            fill: $white;
          }
        }

        .full-label {
          display: block;
        }
        .empty-label {
          display: none;
        }
      }
    }
  }
}
</style>
