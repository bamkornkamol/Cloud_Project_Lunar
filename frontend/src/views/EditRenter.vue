<template>
    <section id="app" style="font-family: 'Prompt', sans-serif;">
        <NavBar />
        <div class="flex flex-col items-center mt-10">
        <h1 class="text-4xl mb-4">รายละเอียดผู้เช่า</h1>
        <form class="flex flex-col items-center w-5/12">
            <div class="grid grid-cols-2 w-full">
                <div class="flex flex-col m-1 ml-5">
                    <label for="num_room">เลขห้อง</label>
                    <input :value="renter[0].num_room" id="num_room" type="text" placeholder="เลขห้อง" class="border border-gray-300 rounded-xl p-3 mb-3 w-full"/>
                </div>
                <div class="flex flex-col m-1 ml-5">
                    <label for="type">ประเภทห้อง</label>
                    <input :value="renter[0].type" id="type" type="text" placeholder="ประเภทห้อง" class="border border-gray-300 rounded-xl p-3 mb-3 w-full"/>
                </div>
                <div class="flex flex-col m-1 ml-5">
                    <label for="price">ราคาห้อง</label>
                    <input :value="renter[0].price" id="price" type="text" placeholder="ราคา" class="border border-gray-300 rounded-xl p-3 mb-3 w-full"/>
                </div>
                <div class="flex flex-col m-1 ml-5">
                    <label for="email">อีเมลผู้ใช้</label>
                    <input :value="renter[0].email" id="email" type="text" placeholder="E-mail" class="border border-gray-300 rounded-xl p-3 mb-3 w-full"/>
                </div>
                <div class="flex flex-col m-1 ml-5">
                    <label for="">ชื่อผู้เช่า</label>
                    <input :value="renter[0].name1" id="name1" type="text" placeholder="ชื่อผู้เช่า1" class="border border-gray-300 rounded-xl p-3 mb-3 w-full"/>
                </div>
                <div class="flex flex-col m-1 ml-5">
                    <label for="">เบอร์ผู้เช่า</label>
                    <input :value="renter[0].phone1" id="phone1" type="text" placeholder="เบอร์โทรผู้เช่า1" class="border border-gray-300 rounded-xl p-3 mb-3 w-full"/>
                </div>
                <div class="flex flex-col m-1 ml-5">
                    <label for="">ชื่อผู้เช่า</label>
                    <input :value="renter[0].name2" id="name2" type="text" placeholder="ชื่อผู้เช่า2" class="border border-gray-300 rounded-xl p-3 mb-3 w-full"/>
                </div>
                <div class="flex flex-col m-1 ml-5">
                    <label for="">เบอร์ผู้เช่า</label>
                    <input :value="renter[0].phone2" id="phone2" type="text" placeholder="เบอร์โทรผู้เช่า2" class="border border-gray-300 rounded-xl p-3 mb-3 w-full"/>
                </div>
            </div>
            <div class="grid grid-cols-2 gap-3">
                <input @click="regis()" value="แก้ไข" class="cursor-pointer bg-[#2E4E73] hover:bg-gray-500 text-white px-4 py-2 rounded-xl text-center"/>
                <input @click="renterAll()" value="ย้อนกลับ" class="cursor-pointer border-2 border-[#2E4E73] hover:bg-gray-500 text-black px-4 py-2 rounded-xl text-center"/>
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
      dorId: this.$route.params.dorId,
      rentId: this.$route.params.rentId,
      renter:null,
    }
  },
    created() {
        axios.get("http://47.129.60.17:3000/detailRenter/" + this.userId+'/'+this.dorId+'/'+this.rentId)
        .then((response) => {
            this.renter = response.data.renter[0];
            console.log(this.renter)
        })
        .catch((err) => {
            console.log(err);
        });
    },
    methods: {
        regis(){
            if(document.getElementById("num_room").value==null || document.getElementById("type").value==null || document.getElementById("price").value==null || document.getElementById("email").value==null ||
            "name1", document.getElementById("name1").value==null || document.getElementById("phone1").value==null || document.getElementById("num_room").value=="" || document.getElementById("type").value=="" || document.getElementById("price").value=="" || document.getElementById("email").value=="" ||
            "name1", document.getElementById("name1").value=="" || document.getElementById("phone1").value==""){
                Swal.fire({
                    position: 'center',
                    icon: 'info',
                    title: 'กรุณากรอกข้อมูลให้ครบถ้วน',
                    showConfirmButton: false,
                    timer: 1500
                })
            }else{
                let formData = new FormData();
                formData.append("num_room", document.getElementById("num_room").value);
                formData.append("type", document.getElementById("type").value);
                formData.append("price", document.getElementById("price").value);
                formData.append("email", document.getElementById("email").value);
                formData.append("name1", document.getElementById("name1").value);
                formData.append("phone1", document.getElementById("phone1").value);
                if(document.getElementById("name2") == ''){
                    formData.append("name2", '-');
                }else{
                    formData.append("name2", document.getElementById("name2").value);
                }
                if(document.getElementById("phone2") == ''){
                    formData.append("phone2", '-');
                }else{
                    formData.append("phone2", document.getElementById("phone2").value);
                }
                
                for (const value of formData.values()){
                    console.log(value);
                }

                axios.put("http://47.129.60.17:3000/editRenter/"+this.userId+'/'+this.dorId+'/'+this.rentId, formData, {
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
                        this.$router.push('/EditRenter/'+this.userId+'/'+this.dorId+'/'+this.rentId)
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
