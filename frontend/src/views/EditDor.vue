<template>
    <section id="app" style="font-family: 'Prompt', sans-serif;">
        <NavBar />
        <div class="mb-20">
            <form>
                <div class="flex flex-row w-full mt-10">
                    <h5 class="text-3xl font-medium tracking-wide mx-10 basis-3/4">แก้ไขข้อมูลหอพัก</h5>
                    <div class="flex flex-row mx-10 gap-5 justify-end basis-1/4">
                        <input readonly='true' value="บันทึก" @click="regis()" class="cursor-pointer text-white w-10/12 font-medium p-3 rounded-3xl bg-[#2E4E73] hover:bg-gray-500 text-center">
                        <router-link to="" class="w-10/12">
                            <button @click="homeLogin()" to="" class="w-full border-2 font-medium p-2 rounded-3xl border-[#2E4E73] text-[#2E4E73] text-center">ยกเลิก</button>
                        </router-link>
                    </div>
                </div>
            
                <div class="flex flex-col mb-5 mt-5 mx-10">
                    <!-- <h1 class="font-medium text-xl">ข้อมูลหอพักทั่วไป</h1> -->
                    <div>
                        <p class=" mb-3 font-medium text-lg">ชื่อหอพัก :</p>
                        <input :value="dormitory[0].name" id="name" type="text" class="border-2 border-gray rounded-lg p-2 w-2/4 shadow-lg">
                    </div>
                </div>
                <div class="flex flex-col mb-5 mx-10">
                    <h1 class=" mb-3 font-medium text-lg">ที่อยู่ :</h1>
                    <div class="grid grid-cols-3">
                        <div>
                            <p class="mt-3 mb-3">เลขที่/ถนน/ซอย/อาคาร</p>
                            <input :value="dormitory[0].address" id="address" type="text" class="border-2 border-gray rounded-lg p-2 w-10/12 shadow-lg">
                        </div>
                        <div>
                            <p class="mt-3 mb-3">จังหวัด</p>
                            <input :value="dormitory[0].province" id="province" type="text" class="border-2 border-gray rounded-lg p-2 w-10/12 shadow-lg">
                        </div>
                        <div>
                            <p class="mt-3 mb-3">เขต/อำเภอ</p>
                            <input :value="dormitory[0].district" id="district" type="text" class="border-2 border-gray rounded-lg p-2 w-10/12 shadow-lg">
                        </div>
                        <div>
                            <p class="mt-3 mb-3">แขวง/ตำบล</p>
                            <input :value="dormitory[0].parish" id="parish" type="text" class="border-2 border-gray rounded-lg p-2 w-10/12 shadow-lg">
                        </div>
                        <div>
                            <p class="mt-3 mb-3">รหัสไปรษณีย์</p>
                            <input :value="dormitory[0].post" id="post" type="text" class="border-2 border-gray rounded-lg p-2 w-10/12 shadow-lg">
                        </div>
                        <div>
                            <p class="mt-3 mb-3">เบอร์โทรศัพท์</p>
                            <input :value="dormitory[0].phone" id="phone" type="text" class="border-2 border-gray rounded-lg p-2 w-10/12 shadow-lg">
                        </div>
                    </div>
                </div>
                <div class="flex flex-col mb-5 mt-5 mx-10">
                    <div class="grid grid-cols-3">
                        <div>
                            <h1 class="mt-3 mb-3 font-medium">จำนวนห้อง :</h1>
                            <input :value="dormitory[0].room" id="room" type="number" v-bind:class="{'border-red-600':checkroom}" class="border-2 border-gray rounded-lg p-2 w-10/12 shadow-lg">
                        </div>
                        <div>
                            <h1 class="mt-3 mb-3 font-medium">จำนวนชั้น :</h1>
                            <input :value="dormitory[0].floor" id="floor" type="number" v-bind:class="{'border-red-600':checkfloor}" class="border-2 border-gray rounded-lg p-2 w-10/12 shadow-lg">
                        </div>
                        <div>
                            <h1 class="mt-3 mb-3 font-medium">วันตัดรอบบิล :</h1>
                            <input :value="dormitory[0].duedate" id="duedate" type="number" v-bind:class="{'border-red-600':checkDue}" class="border-2 border-gray rounded-lg p-2 w-10/12 shadow-lg">
                        </div>
                        <div>
                            <h1 class="mt-3 mb-3 font-medium">ค่าน้ำ (/หน่วย) : </h1>
                            <input :value="dormitory[0].water" id="water" type="number" v-bind:class="{'border-red-600':checkwater}" class="border-2 border-gray rounded-lg p-2 w-10/12 shadow-lg">
                        </div>
                        <div>
                            <h1 class="mt-3 mb-3 font-medium">ค่าไฟ (/หน่วย) :</h1>
                            <input :value="dormitory[0].light" id="light" type="number" v-bind:class="{'border-red-600':checklight}" class="border-2 border-gray rounded-lg p-2 w-10/12 shadow-lg">
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
import NavBar from './NavBar.vue';
import FooterBar from './FooterBar.vue'
import axios from "axios";
import Swal from 'sweetalert2'

export default {
  components: {
    NavBar,
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
            dormitory:null,
            userId : this.$route.params.userId,
            dorId : this.$route.params.dorId,
            checkDue: false,
            checkroom: false,
            checkfloor: false,
            checkwater: false,
            checklight: false,
        };
    },
    created() {
        axios.get("http://47.129.60.17:3000/Dormitory/" + this.$route.params.userId+'/' + this.$route.params.dorId)
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
        regis(){
            if(
            document.getElementById("name").value=="" || document.getElementById("address").value=="" || document.getElementById("province").value=="" || document.getElementById("district").value=="" ||
            document.getElementById("parish").value=="" || document.getElementById("post").value=="" || document.getElementById("phone").value=="" || document.getElementById("room").value=="" ||
            document.getElementById("floor").value=="" || document.getElementById("water").value=="" || document.getElementById("light").value=="" || document.getElementById("duedate").value==""){
                Swal.fire({
                    position: 'center',
                    icon: 'info',
                    title: 'กรุณากรอกข้อมูลให้ครบถ้วน',
                    showConfirmButton: false,
                    timer: 1500
                })
            }else if(document.getElementById("duedate").value>=32 || document.getElementById("duedate").value<=0){
                this.checkDue = true;
                Swal.fire({
                    position: 'center',
                    icon: 'info',
                    title: 'กรุณากรอกวันที่ตัดรอบบิลให้ถูกต้อง',
                    showConfirmButton: false,
                    timer: 1500
                })
            }else if(document.getElementById("room").value<=0){
                this.checkroom = true;
                Swal.fire({
                    position: 'center',
                    icon: 'info',
                    title: 'กรุณากรอกข้อมูลให้ถูกต้อง',
                    showConfirmButton: false,
                    timer: 1500
                })
            }else if(document.getElementById("floor").value<=0){
                this.checkfloor = true;
                Swal.fire({
                    position: 'center',
                    icon: 'info',
                    title: 'กรุณากรอกข้อมูลให้ถูกต้อง',
                    showConfirmButton: false,
                    timer: 1500
                })
            }else if(document.getElementById("water").value<=0){
                this.checkwater = true;
                Swal.fire({
                    position: 'center',
                    icon: 'info',
                    title: 'กรุณากรอกข้อมูลให้ถูกต้อง',
                    showConfirmButton: false,
                    timer: 1500
                })
            }else if(document.getElementById("light").value<=0){
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
                formData.append("name", document.getElementById('name').value);
                formData.append("address", document.getElementById('address').value);
                formData.append("province", document.getElementById('province').value);
                formData.append("district", document.getElementById('district').value);
                formData.append("parish", document.getElementById('parish').value);
                formData.append("post", document.getElementById('post').value);
                formData.append("phone", document.getElementById('phone').value);
                formData.append("room", document.getElementById('room').value);
                formData.append("floor", document.getElementById('floor').value);
                formData.append("water", document.getElementById('water').value);
                formData.append("light", document.getElementById('light').value);
                formData.append("duedate", document.getElementById('duedate').value);
                
                for (const value of formData.values()){
                    console.log(value);
                }

                axios.put("http://47.129.60.17:3000/editDormitory/"+this.userId+'/'+this.dorId, formData, {
                    headers: {
                        "Content-Type": "multipart/form-data",
                    },
                })
                .then((response) => {
                    console.log(response.data[0])
                    Swal.fire({
                        position: 'center',
                        icon: 'success',
                        title: 'แก้ไขสำเร็จ',
                        showConfirmButton: false,
                        timer: 1500
                    }).then(() => {
                        this.$router.push('/Dormitory/'+this.userId+'/'+this.dorId)
                    })
                }).catch((err) => {
                    console.log(err)
                })
            }
        },
        homeLogin(){
            this.$router.push('/Dormitory/'+this.userId+'/'+this.dorId)
        }
    }
}
</script>