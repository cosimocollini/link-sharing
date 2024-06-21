<template>
    <div class="file-upload-wrapper">
        <div class="field">
            <label for="fileUpload" :style="{ 'background-image': 'url(' + bgImage + ')' }"
                :class="{ 'full': bgImage != '' }">
                <div class="text-wrapper">
                    <SvgIcon name="image" />
                    <span class="empty-label">+ Upload image</span>
                    <span class="full-label">Change image</span>
                </div>

                <input name="fileUpload" id="fileUpload" type="file" @change="handleUpload"
                    accept="image/png, image/jpeg" />

            </label>

            <p class="file-description">Image must be below 1024x1024px. Use PNG or JPG format.</p>
        </div>

        <p class="message" v-show="errorMessage || meta.valid">
            {{ errorMessage }}
        </p>
    </div>
</template>

<script lang="ts" setup>
    import { ref } from 'vue'
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
        meta,
    } = useField("fileUpload", props.rules, {
        initialValue: props.value,
    });

    const handleUpload = (e: Event) => {
        var _URL = window.URL || window.webkitURL;
        var file, img;
        const target = e.target as HTMLInputElement;
        if (target.files && (file = target.files[0])) {
            img = new Image();
            var objectUrl = _URL.createObjectURL(file);
            img.onload = function () {
                _URL.revokeObjectURL(objectUrl);
            };
            img.src = objectUrl;
            bgImage.value = objectUrl;
            handleChange(e);
        }
    }
</script>
