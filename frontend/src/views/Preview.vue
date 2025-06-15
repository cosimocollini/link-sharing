<script setup lang="ts">
import { computed } from 'vue';
import { useFormStore } from '@/stores/form';
import { LINKS } from '@/constants';

const store = useFormStore();
</script>

<template>
  <div class="device-preview">
    <svg xmlns="http://www.w3.org/2000/svg" width="308" height="632" fill="none">
      <path
        stroke="#737373"
        d="M54.5 1h199C283.047 1 307 24.9528 307 54.5v523c0 29.547-23.953 53.5-53.5 53.5h-199C24.9528 631 1 607.047 1 577.5v-523C1 24.9528 24.9528 1 54.5 1Z"
      />
      <path
        fill="none"
        stroke="#737373"
        d="M56.5 11h24C86.8513 11 92 16.1487 92 22.5c0 8.0081 6.4919 14.5 14.5 14.5h95c8.008 0 14.5-6.4919 14.5-14.5 0-6.3513 5.149-11.5 11.5-11.5h24c24.577 0 44.5 19.9233 44.5 44.5v521c0 24.577-19.923 44.5-44.5 44.5h-195C31.9233 621 12 601.077 12 576.5v-521C12 30.9233 31.9233 11 56.5 11Z"
      />
    </svg>
    <div class="content-wrapper">
      <div class="image empty"></div>
      <div class="name empty"></div>
      <div class="email empty"></div>
      <div
        v-if="store.links.length > 0"
        v-for="(link, i) in store.links"
        class="link body-s px-2"
        :class="{ empty: !link.name || !link.url }"
        :style="{ backgroundColor: LINKS[link.name as keyof typeof LINKS]?.color }"
        :key="i"
      >
        <SvgIcon v-if="link.name" :name="link.name" />
        <span v-if="link.name" class="ml-1">{{
          LINKS[link.name as keyof typeof LINKS]?.label
        }}</span>
        <SvgIcon v-if="link.name" name="arrow-right" color="#FFF" />
      </div>
      <div v-for="i in 5" v-if="store.links.length === 0" :key="i" class="link empty"></div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@use '@/scss/abstracts' as *;

.empty {
  background-color: #eee;
}

.device-preview {
  position: relative;

  > svg {
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
  }

  .content-wrapper {
    position: absolute;
    top: 38px;
    left: 0;
    display: block;
    width: 100%;
    height: 575px;
    overflow-y: auto;
    -ms-overflow-style: none; /* IE and Edge */
    scrollbar-width: none; /* Firefox */

    &::-webkit-scrollbar {
      display: none;
    }

    .image {
      display: block;
      width: 100px;
      height: 100px;
      border-radius: 50%;
      margin: 24px auto 0;
    }

    .name {
      display: block;
      margin: 24px auto 0;

      &.empty {
        width: 160px;
        height: 16px;
        border-radius: 16px;
      }
    }

    .email {
      display: block;
      margin: 12px auto 56px auto;

      &.empty {
        width: 72px;
        height: 8px;
        border-radius: 8px;
      }
    }

    .link {
      display: flex;
      align-items: center;
      border-radius: 8px;
      height: 44px;
      width: 237px;
      margin: 20px auto 0;
      color: $white;

      &:first-child {
        margin-top: 56px;
      }

      svg {
        &:last-child {
          margin-left: auto;
        }
      }
    }
  }
}
</style>
