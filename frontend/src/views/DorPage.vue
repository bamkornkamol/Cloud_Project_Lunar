<template>
  <section id="app" style="font-family: 'Prompt', sans-serif">
    <NavBar />
    <div class="flex flex-row mt-14 mx-20">
            <div class="basis-5/6">
                <h1 class='text-6xl font-medium tracking-wide mb-5'>{{dormitory[0].name}}</h1>
                <p class="text-xl">{{dormitory[0].address}} {{dormitory[0].parish}} {{dormitory[0].district}} {{dormitory[0].province}} {{dormitory[0].post}}</p>
                <p class="text-xl text-gray-400 mt-2 flex flex-row">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" class="w-6 h-6 mr-3 opacity-50"><!--!Font Awesome Free 6.5.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.--><path d="M164.9 24.6c-7.7-18.6-28-28.5-47.4-23.2l-88 24C12.1 30.2 0 46 0 64C0 311.4 200.6 512 448 512c18 0 33.8-12.1 38.6-29.5l24-88c5.3-19.4-4.6-39.7-23.2-47.4l-96-40c-16.3-6.8-35.2-2.1-46.3 11.6L304.7 368C234.3 334.7 177.3 277.7 144 207.3L193.3 167c13.7-11.2 18.4-30 11.6-46.3l-40-96z"/></svg>
                  {{dormitory[0].phone}}
                </p>
            </div>
            <div class="flex flex-row mx-10 gap-5 justify-end basis-1/6">
                <div class="h-12 w-8/12 flex justify-end">
                    <button @click="editDor()" class="text-white font-medium p-3 rounded-3xl bg-[#2E4E73] hover:bg-gray-500">แก้ไขข้อมูล</button>
                </div>
            </div>
    </div >
    <div class="w-full flex justify-center items-center mt-5 mb-20">
      <div class="w-9/12 border-2 border-[#2E4E73] p-5 rounded-2xl">
        <p class="mb-2">จำนวนห้อง : {{dormitory[0].room}} ห้อง</p>
        <p class="mb-2">จำนวนชั้น : {{dormitory[0].floor}} ชั้น</p>
        <p class="mb-2">ค่าน้ำ (/หน่วย) : {{dormitory[0].water}} บาท</p>
        <p class="mb-2">ค่าไฟ (/หน่วย) : {{dormitory[0].light}} บาท</p>
        <p class="mb-2">วันตัดรอบบิล : วันที่ {{dormitory[0].duedate}}</p>
        <hr class="border border-[#2E4E73] bg-[#2E4E73]">
        <p class="mb-2">จำนวนห้องว่าง : {{parseInt(dormitory[0].room)-parseInt(renter.length)}} ห้อง</p>
        <p class="mb-2">ห้องที่มีผู้เช่า :</p>
        <div class="grid grid-cols-12 gap-2" >
          <div v-for="val in renter" :key="val">
            <div class="mb-2 bg-[#2E4E73] text-center text-white rounded-xl p-1 text-sm">{{val.num_room}}</div>
          </div>
        </div>
      </div>
    </div>
    <FooterBar />
  </section>
</template>

<script>
// check
import axios from "axios";
import NavBar from "./NavBar.vue";
import FooterBar from './FooterBar.vue'

export default {
  components: {
    NavBar,
    FooterBar
  },
  data() {
    return {
      dormitory: null,
      renter: null,
      userId : this.$route.params.userId,
      dorId : this.$route.params.dorId
    };
  },
  created() {
      axios.get("http://localhost:3000/Dormitory/" + this.$route.params.userId+'/' + this.$route.params.dorId)
      .then((response) => {
        this.dormitory = response.data.dormitory[0];
        this.renter = response.data.renter[0];
        console.log(response)
      })
      .catch((err) => {
        console.log(err);
      });
  },
  methods: {
        editDor(){
          this.$router.push('/EditDormitory/'+this.userId+'/'+this.dorId)
        }
    }
};
</script>
