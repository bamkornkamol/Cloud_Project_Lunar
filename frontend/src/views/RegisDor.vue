<template>
    <section id="app" style="font-family: 'Prompt', sans-serif;">
        <nav class="p-3" style="backgroundColor: #2E4E73; font-family: 'Prompt', sans-serif;">
          <div class="flex flex-row">
              <div class="flex flex-col basis-11/12">
                  <div class="flex flex-row mx-5">
                      <h1 class="text-white text-lg tracking-wider">LUNAR</h1>
                      <img src="../../public/uploads/moon.png" alt="moon" class="mx-2 w-7">
                  </div>
                  <h1 class="text-white text-lg tracking-wider mx-5">DORMITORY</h1>
              </div>
              <div class="flex justify-center content-center items-center w-32 basis-1/12">
                  <router-link to="/">
                    <button class="text-white text-base rounded-full border-2 px-3 py-2 " style="borderColor: #9ABDE3; font-family: 'Prompt', sans-serif;">ออกจากระบบ</button>
                  </router-link>
              </div>
          </div>
        </nav>
        <div class="mb-20">
            <form>
                <div class="flex flex-row w-full mt-10">
                    <h5 class="text-3xl font-medium tracking-wide mx-10 basis-3/4">ลงทะเบียนหอพัก</h5>
                    <div class="flex flex-row mx-10 gap-5 justify-end basis-1/4">
                        <input readonly="true" value="ยืนยัน" @click="regis()" class="text-white w-10/12 font-medium p-3 rounded-3xl bg-[#2E4E73] hover:bg-gray-500 text-center cursor-pointer">
                        <router-link to="" class="w-10/12">
                            <button @click="homeLogin()" to="" class="w-full border-2 font-medium p-2 rounded-3xl border-[#2E4E73] text-[#2E4E73] text-center">ยกเลิก</button>
                        </router-link>
                    </div>
                </div>
            
                <div class="flex flex-col mb-5 mt-5 mx-10">
                    <!-- <h1 class="font-medium text-xl">ข้อมูลหอพักทั่วไป</h1> -->
                    <div>
                        <p class=" mb-3 font-medium text-lg">ชื่อหอพัก :</p>
                        <input v-model="name" type="text" class="border-2 border-gray rounded-lg p-2 w-2/4 shadow-lg">
                    </div>
                </div>
                <div class="flex flex-col mb-5 mx-10">
                    <h1 class=" mb-3 font-medium text-lg">ที่อยู่ :</h1>
                    <div class="grid grid-cols-3">
                        <div>
                            <p class="mt-3 mb-3">เลขที่/ถนน/ซอย/อาคาร</p>
                            <input v-model="address" type="text" class="border-2 border-gray rounded-lg p-2 w-10/12 shadow-lg">
                        </div>
                        <div>
                            <p class="mt-3 mb-3">จังหวัด</p>
                            <input v-model="province" type="text" class="border-2 border-gray rounded-lg p-2 w-10/12 shadow-lg">
                        </div>
                        <div>
                            <p class="mt-3 mb-3">เขต/อำเภอ</p>
                            <input v-model="district" type="text" class="border-2 border-gray rounded-lg p-2 w-10/12 shadow-lg">
                        </div>
                        <div>
                            <p class="mt-3 mb-3">แขวง/ตำบล</p>
                            <input v-model="parish" type="text" class="border-2 border-gray rounded-lg p-2 w-10/12 shadow-lg">
                        </div>
                        <div>
                            <p class="mt-3 mb-3">รหัสไปรษณีย์</p>
                            <input v-model="post" type="text" class="border-2 border-gray rounded-lg p-2 w-10/12 shadow-lg">
                        </div>
                        <div>
                            <p class="mt-3 mb-3">เบอร์โทรศัพท์</p>
                            <input v-model="phone" type="text" class="border-2 border-gray rounded-lg p-2 w-10/12 shadow-lg">
                        </div>
                    </div>
                </div>
                <div class="flex flex-col mb-5 mt-5 mx-10">
                    <div class="grid grid-cols-3">
                        <div>
                            <h1 class="mt-3 mb-3 font-medium">จำนวนห้อง :</h1>
                            <input v-model="room" type="number" v-bind:class="{'border-red-600':checkroom}" class="border-2 border-gray rounded-lg p-2 w-10/12 shadow-lg">
                        </div>
                        <div>
                            <h1 class="mt-3 mb-3 font-medium">จำนวนชั้น :</h1>
                            <input v-model="floor" type="number" v-bind:class="{'border-red-600':checkfloor}" class="border-2 border-gray rounded-lg p-2 w-10/12 shadow-lg">
                        </div>
                        <div>
                            <h1 class="mt-3 mb-3 font-medium">วันที่ตัดรอบบิล :</h1>
                            <input v-model="duedate" type="number" v-bind:class="{'border-red-600':checkDue}" class="border-2 border-gray rounded-lg p-2 w-10/12 shadow-lg">
                        </div>
                        <div>
                            <h1 class="mt-3 mb-3 font-medium">ค่าน้ำ (/หน่วย) : </h1>
                            <input v-model="water" type="number" v-bind:class="{'border-red-600':checkwater}" class="border-2 border-gray rounded-lg p-2 w-10/12 shadow-lg">
                        </div>
                        <div>
                            <h1 class="mt-3 mb-3 font-medium">ค่าไฟ (/หน่วย) :</h1>
                            <input v-model="light" type="number" v-bind:class="{'border-red-600':checklight}" class="border-2 border-gray rounded-lg p-2 w-10/12 shadow-lg">
                        </div>
                    </div>
                </div>
            </form>
        </div>
        <FooterBar/>
    </section>
</template>

<script>
// check
// import NavBar from './NavBar.vue';
import FooterBar from './FooterBar.vue'
import axios from "axios";
import Swal from 'sweetalert2'

export default {
  components: {
    // NavBar,
    FooterBar
  },
  data() {
        return {
          name: null,
          address: null,
          province: null,
          district: null,
          parish: null,
          post:null,
          phone:null,
          room:null,
          floor:null,
          water:null,
          light:null,
          duedate:null,
          checkDue: false,
          checkroom: false,
          checkfloor: false,
          checkwater: false,
          checklight: false,
        };
    },
    methods: {
        regis(){
            if(this.name==null || this.address==null || this.province==null || this.district==null ||
            this.parish==null || this.post==null || this.phone==null || this.room==null ||
            this.floor==null || this.water==null || this.light==null || this.duedate==null ||
            this.name=="" || this.address=="" || this.province=="" || this.district=="" ||
            this.parish=="" || this.post=="" || this.phone=="" || this.room=="" ||
            this.floor=="" || this.water=="" || this.light=="" || this.duedate==""){
                Swal.fire({
                    position: 'center',
                    icon: 'info',
                    title: 'กรุณากรอกข้อมูลให้ครบถ้วน',
                    showConfirmButton: false,
                    timer: 1500
                })
            }else if(this.duedate>=32 || this.duedate<=0){
                this.checkDue = true;
                Swal.fire({
                    position: 'center',
                    icon: 'info',
                    title: 'กรุณากรอกวันที่ตัดรอบบิลให้ถูกต้อง',
                    showConfirmButton: false,
                    timer: 1500
                })
            }else if(this.room<=0){
                this.checkroom = true;
                Swal.fire({
                    position: 'center',
                    icon: 'info',
                    title: 'กรุณากรอกข้อมูลให้ถูกต้อง',
                    showConfirmButton: false,
                    timer: 1500
                })
            }else if(this.floor<=0){
                this.checkfloor = true;
                Swal.fire({
                    position: 'center',
                    icon: 'info',
                    title: 'กรุณากรอกข้อมูลให้ถูกต้อง',
                    showConfirmButton: false,
                    timer: 1500
                })
            }else if(this.water<=0){
                this.checkwater = true;
                Swal.fire({
                    position: 'center',
                    icon: 'info',
                    title: 'กรุณากรอกข้อมูลให้ถูกต้อง',
                    showConfirmButton: false,
                    timer: 1500
                })
            }else if(this.light<=0){
                this.checklight = true;
                Swal.fire({
                    position: 'center',
                    icon: 'info',
                    title: 'กรุณากรอกข้อมูลให้ถูกต้อง',
                    showConfirmButton: false,
                    timer: 1500
                })
            }else{
                let formData = new FormData();
                formData.append("name", this.name);
                formData.append("address", this.address);
                formData.append("province", this.province);
                formData.append("district", this.district);
                formData.append("parish", this.parish);
                formData.append("post", this.post);
                formData.append("phone", this.phone);
                formData.append("room", this.room);
                formData.append("floor", this.floor);
                formData.append("water", this.water);
                formData.append("light", this.light);
                formData.append("duedate", this.duedate);
                
                for (const value of formData.values()){
                    console.log(value);
                }

                axios.post("http://localhost:3000/RegisDor/"+this.$route.params.userId, formData, {
                    headers: {
                        "Content-Type": "multipart/form-data",
                    },
                })
                .then((response) => {
                    console.log(response.data[0])
                    Swal.fire({
                        position: 'center',
                        icon: 'success',
                        title: 'ลงทะเบียนหอพักสำเร็จ',
                        showConfirmButton: false,
                        timer: 1500
                    }).then(() => {
                        this.$router.push('/HomeLogin/'+this.$route.params.userId)
                    })
                }).catch((err) => {
                    console.log(err)
                })
            }
        },
        homeLogin(){
            this.$router.push('/HomeLogin/'+this.$route.params.userId)
        }
    }
}
</script>