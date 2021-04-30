<template>
  <div class="user-profile">
    <van-nav-bar
      class="app-nav-bar"
      title="个人信息"
      left-arrow
      @click-left="$router.back()"
    />
    <input
      type="file"
      hidden
      ref="file"
      accept="image/*"
      @change="onFileChange"
    />
    <van-cell title="头像" is-link center @click="$refs.file.click()">
      <van-image width="30" height="30" round fit="cover" :src="user.photo">
      </van-image>
    </van-cell>
    <van-cell
      @click="isEditNameShow = true"
      title="昵称"
      is-link
      :value="user.name"
    ></van-cell>
    <van-cell
      title="性别"
      is-link
      :value="user.gender === 0 ? '男' : '女'"
      @click="isEditGenderShow = true"
    ></van-cell>
    <van-cell
      title="生日"
      is-link
      :value="user.birthday"
      @click="isEditBirthdayShow = true"
    ></van-cell>

    <van-popup
      v-model="isEditNameShow"
      position="bottom"
      :style="{ height: '100%' }"
    >
      <update-name
        :name="user.name"
        @update-name="user.name = $event"
        v-if="isEditNameShow"
        @close="isEditNameShow = false"
      >
      </update-name>
    </van-popup>

    <van-popup v-model="isEditGenderShow" position="bottom">
      <update-gender v-model="user.gender" @close="isEditGenderShow = false">
      </update-gender>
    </van-popup>

    <van-popup v-model="isEditBirthdayShow" position="bottom">
      <update-birthday
        v-if="isEditBirthdayShow"
        @close="isEditBirthdayShow = false"
        v-model="user.birthday"
      ></update-birthday>
    </van-popup>



       <van-popup :style="{ height: '100%' }" class="update-photo-popup" v-model="isEditPhotoShow" position="bottom">
      <update-photo v-if="isEditPhotoShow" :file="previewImage" @close ="isEditPhotoShow =false" @update-photo ="user.photo =$event"></update-photo>
    </van-popup>
  </div>
</template>

<script>
import { getUserProfile } from "@/api/user";
import UpdateName from "./components/update-name";
import UpdateGender from "./components/update-gender";
import updateBirthday from "./components/update-birthday";
import UpdatePhoto  from "./components/update-photo"

export default {
  name: "UserProfile",
  props: {},
  data() {
    return {
      user: {},
      isEditNameShow: false,
      isEditGenderShow: false,
      isEditBirthdayShow: false,
      isEditPhotoShow:false,
      previewImage:null
    };
  },
  created() {
    this.loadUserProfile();
  },
  mounted() {},
  watch: {},
  computed: {},
  methods: {
    async loadUserProfile() {
      const { data } = await getUserProfile();
      console.log(data);
      this.user = data.data;
    },
    onFileChange() {



       this.isEditPhotoShow =true

     const Blob =this.$refs.file.files[0]
      this.previewImage = Blob


      this.$refs.file.value = "";
    },
  },
  components: { UpdateName, UpdateGender, updateBirthday,UpdatePhoto },
};
</script>
<style lang="less" scoped>
.van-popup {
  background-color: #f5f7f9;
}
.update-photo-popup{
  background-color: #000;
}
</style>