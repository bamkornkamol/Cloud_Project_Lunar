<template>
  <section id="app" style="font-family: 'Prompt', sans-serif">
    <NavBar />
    <div class="flex flex-row mt-14 mx-20">
            <div class="basis-5/6">
                <h1 class='text-5xl font-medium tracking-wide mb-5'>{{dormitory[0].name}}</h1>
                <p>{{dormitory[0].address}} {{dormitory[0].parish}} {{dormitory[0].district}} {{dormitory[0].province}} {{dormitory[0].post}}</p>
                <p>{{dormitory[0].phone}}</p>
            </div>
            <div class="flex flex-row mx-10 gap-5 justify-end basis-1/6">
                <div class="h-12 w-8/12 flex justify-end">
                    <button @click="editDor()" class="text-white font-medium p-3 rounded-3xl bg-[#2E4E73] hover:bg-gray-500">แก้ไขข้อมูล</button>
                </div>
            </div>
    </div >
    <div class="w-full flex justify-center items-center mt-5">
      <div class="w-9/12">
        <p>จำนวนห้อง : {{dormitory[0].room}}</p>
        <p>จำนวนชั้น : {{dormitory[0].floor}}</p>
        <p>ค่าน้ำ : (/หน่วย){{dormitory[0].water}}</p>
        <p>ค่าไฟ : (/หน่วย){{dormitory[0].light}}</p>
      </div>
    </div>
    <FooterBar />
  </section>
</template>

<script>
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
      userId : this.$route.params.userId,
      dorId : this.$route.params.dorId
    };
  },
  created() {
      axios.get("http://localhost:3000/Dormitory/" + this.$route.params.userId+'/' + this.$route.params.dorId)
      .then((response) => {
        this.dormitory = response.data.dormitory[0];
        console.log(this.$route.params.userId)
        console.log(response)
      })
      .catch((err) => {
        console.log(err);
      });
  },
  methods: {
        editDor(){
          console.log(this.userId, this.dorId)
          this.$router.push('/EditDormitory/'+this.userId+'/'+this.dorId)
        }
    }
};
</script>
