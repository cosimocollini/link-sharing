<script lang="ts" setup>
import { ref } from 'vue';
import { useField } from 'vee-validate';
import SvgIcon from '../SvgIcon.vue';

const props = defineProps<{
  inputId: string;
  rules?: any;
  modelValue: string | ArrayBuffer | null;
}>();

const emit = defineEmits<{
  (e: 'update:modelValue', file: string | ArrayBuffer | null): void;
}>();

const bgImage = ref(props.modelValue || null);

const { value, errorMessage, handleChange, meta } = useField(props.inputId, props.rules, {
  initialValue: props.modelValue || null
});

const dropZoneEl = ref<HTMLElement | null>(null);

const processFile = (file: File) => {
  const reader = new FileReader();
  reader.onloadend = () => {
    bgImage.value = reader.result;
    emit('update:modelValue', reader.result);
    handleChange(reader.result);
  };
  reader.readAsDataURL(file);
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

    <div class="file-upload-dropzone-wrapper">
      <button
        ref="dropZoneEl"
        class="file-upload-dropzone"
        type="button"
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
          name="profilePicture"
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
  </div>
</template>

<style scoped lang="scss">
@use '@/scss/abstracts' as *;

.file-upload-wrapper {
  background-color: $color-grey-light;
  padding: rem(20);
  border-radius: 12px;
  align-items: center;

  .file-upload-label {
    display: block;
    margin-bottom: rem(16);
  }

  .file-upload-dropzone {
    display: block;
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
    margin-bottom: rem(24);

    &:focus-visible,
    &.drag-over {
      outline: 2px solid $color-main;
      box-shadow: 0 0 0 2px rgba($color-main, 0.3);
    }

    .text-wrapper {
      @extend .heading-s;
      position: relative;
      color: $color-main;
      text-align: center;
      z-index: 1;

      .icon {
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
  @include respond-to('md') {
    display: flex;
    .file-upload-label {
      flex: 1;
      width: 30%;
    }
    .file-upload-dropzone-wrapper {
      display: flex;
      align-items: center;
      gap: rem(24);
      flex: 2;

      .file-upload-dropzone {
        display: flex;
        align-items: center;
        justify-content: center;
        margin-bottom: 0;
      }
    }
  }
}
</style>
