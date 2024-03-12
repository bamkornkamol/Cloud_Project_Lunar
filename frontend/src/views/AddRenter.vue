<template>
    <section id="app" style="font-family: 'Prompt', sans-serif;">
        <NavBar />
        <div class="flex flex-col items-center mt-10 mb-20">
        <h1 class="text-4xl mb-4">เพิ่มรายละเอียดผู้เช่า</h1>
        <form class="flex flex-col items-center w-5/12">
            <div class="grid grid-cols-2 w-full">
                <div class="flex flex-col m-1 ml-5">
                    <label class="" for="">เลขห้อง</label>
                    <input v-model="num_room" type="text" placeholder="เลขห้อง" class="border border-gray-300 rounded-xl p-3 mb-3 w-full"/>
                </div>
                <div class="flex flex-col m-1 ml-5">
                    <label for="">ประเภทห้อง</label>
                    <input v-model="type" type="text" placeholder="ประเภทห้อง" class="border border-gray-300 rounded-xl p-3 mb-3 w-full"/>
                </div>
                <div class="flex flex-col m-1 ml-5">
                    <label for="">ราคาห้อง</label>
                    <input v-model="price" type="text" placeholder="ราคา" class="border border-gray-300 rounded-xl p-3 mb-3 w-full"/>
                </div>
                <div class="flex flex-col m-1 ml-5">
                    <label for="">อีเมลผู้เช่า</label>
                    <input v-model="email" type="text" placeholder="E-mail" class="border border-gray-300 rounded-xl p-3 mb-3 w-full"/>
                </div>
                <div class="flex flex-col m-1 ml-5">
                    <label for="">ชื่อผู้เช่า</label>
                    <input v-model="name1" type="text" placeholder="ชื่อผู้เช่า1" class="border border-gray-300 rounded-xl p-3 mb-3 w-full"/>
                </div>
                <div class="flex flex-col m-1 ml-5">
                    <label for="">เบอร์โทรผู้เช่า</label>
                    <input v-model="phone1" type="text" placeholder="เบอร์โทรผู้เช่า1" class="border border-gray-300 rounded-xl p-3 mb-3 w-full"/>
                </div>
                <div class="flex flex-col m-1 ml-5">
                    <label for="">ชื่อผู้เช่า</label>
                    <input v-model="name2" type="text" placeholder="ชื่อผู้เช่า2" class="border border-gray-300 rounded-xl p-3 mb-3 w-full"/>
                </div>
                <div class="flex flex-col m-1 ml-5">
                    <label for="">เบอร์โทรผู้เช่า</label>
                    <input v-model="phone2" type="text" placeholder="เบอร์โทรผู้เช่า2" class="border border-gray-300 rounded-xl p-3 mb-3 w-full"/>
                </div>
            </div>
            <div class="grid grid-cols-2 gap-3 mt-3">
                <input @click="regis()" value="ยืนยัน" readonly='true' class="cursor-pointer bg-[#2E4E73] hover:bg-gray-500 text-white px-4 py-2 rounded-xl text-center"/>
                <input @click="renterAll()" value="ยกเลิก" readonly='true' class="cursor-pointer border-2 border-[#2E4E73] hover:bg-gray-500 text-black px-4 py-2 rounded-xl text-center"/>
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
  data(){
    return{
      num_room: null,
      type: null,
      price: null,
      email: null,
      name1: null,
      phone1:null,
      name2: null,
      phone2:null,
      userId: this.$route.params.userId,
      dorId: this.$route.params.dorId
    }
  },
    methods: {
        regis(){
            if(this.num_room==null || this.type==null || this.price==null || this.email==null ||
            this.name1==null || this.phone1==null || this.num_room=="" || this.type=="" || this.price=="" || this.email=="" ||
            this.name1=="" || this.phone1==""){
                Swal.fire({
                    position: 'center',
                    icon: 'info',
                    title: 'กรุณากรอกข้อมูลให้ครบถ้วน',
                    showConfirmButton: false,
                    timer: 1500
                })
            }else{
                let formData = new FormData();
                formData.append("num_room", this.num_room);
                formData.append("type", this.type);
                formData.append("price", this.price);
                formData.append("email", this.email);
                formData.append("name1", this.name1);
                formData.append("phone1", this.phone1);
                if(this.name2 == null){
                    this.name2 = '-'
                }
                formData.append("name2", this.name2);
                if(this.phone2 == null){
                    this.phone2 = '-'
                }
                formData.append("phone2", this.phone2);
                
                for (const value of formData.values()){
                    console.log(value);
                }

                axios.post("http://47.129.60.17:3000/addRenter/"+this.userId+'/'+this.dorId, formData, {
                    headers: {
                        "Content-Type": "multipart/form-data",
                    },
                })
                .then((response) => {
                    console.log(response.data[0])
                    Swal.fire({
                        position: 'center',
                        icon: 'success',
                        title: 'เพิ่มผู้เช่าสำเร็จ',
                        showConfirmButton: false,
                        timer: 1500
                    }).then(() => {
                        this.$router.push('/Renter/'+this.userId+'/'+this.dorId)
                    })
                }).catch((err) => {
                    console.log(err)
                })
            }
        },
        renterAll(){
            this.$router.push('/Renter/'+this.userId+'/'+this.dorId)
        },
    }
}
</script>
