<script setup lang="ts">
import { computed } from 'vue';
import { useUserStore } from '@/stores/user';
import { LINKS } from '@/constants';

const userStore = useUserStore();

const userImage = computed(() => {
  return userStore.user.profilePicture ? URL.createObjectURL(userStore.user.profilePicture) : false;
});
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
      <div
        class="image"
        :class="{ empty: !userImage }"
        :style="{ backgroundImage: userImage ? `url(${userImage})` : 'none' }"
      ></div>
      <div
        class="name px-4"
        :class="{ empty: !userStore.user.firstName || !userStore.user.lastName }"
      >
        <span v-if="userStore.user.firstName && userStore.user.lastName"
          >{{ userStore.user.firstName }} {{ userStore.user.lastName }}</span
        >
      </div>
      <div class="email px-4" :class="{ empty: !userStore.user.email }">
        <span v-if="userStore.user.email">{{ userStore.user.email }}</span>
      </div>
      <div
        v-if="userStore.getLinks.length > 0"
        v-for="(link, i) in userStore.getLinks"
        class="link body-s px-2"
        :class="{ empty: !link.name || !link.url }"
        :style="{ backgroundColor: LINKS[link.name as keyof typeof LINKS]?.color }"
        :key="i"
      >
        <SvgIcon v-if="link.name" :name="link.name" color="#FFF" />
        <span v-if="link.name" class="ml-1">{{
          LINKS[link.name as keyof typeof LINKS]?.label
        }}</span>
        <SvgIcon v-if="link.name" name="arrow-right" color="#FFF" />
      </div>
      <template v-for="(n, i) in 5" :key="i">
        <div v-if="!userStore.getLinks[i]" class="link empty"></div>
      </template>
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
      background-repeat: no-repeat;
      background-size: cover;
      background-position: center;

      &:not(.empty) {
        outline: 4px solid $color-main;
      }
    }

    .name {
      display: block;
      margin: 24px auto 0;
      font-size: 18px;
      font-weight: 600;
      color: $color-dark;
      text-align: center;

      &.empty {
        width: 160px;
        height: 16px;
        border-radius: 16px;
      }
    }

    .email {
      display: block;
      margin: 12px auto 56px auto;
      text-align: center;

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
        fill: $white;
        color: $white;

        &:last-child {
          margin-left: auto;
        }
      }
    }
  }
}
</style>
