<template>
    <section id="app" style="font-family: 'Prompt', sans-serif;">
        <NavBar />
        <div class='flex flex-col h-full items-center font-sans'>
            <form class='w-9/12 flex flex-row m-8'>
                <div class='basis-5/6 text-4xl'>{{dormitory[0].name}}</div>
                <div class='basis-1/6 text-lg items-end justify-end flex flex-row'>
                    <input v-model="date" id="date" type="month" class="w-7/12 border rounded-xl border-solid border-gray-300 p-2">
                    <input readonly="true" value="เลือก" @click="payAll()" class="w-5/12 bg-[#2E4E73] hover:bg-gray-500 text-white px-4 py-2 rounded-xl text-center cursor-pointer ml-3">
                </div>
            </form>
            <div class="flex flex-row w-9/12">
                <table class='basis-2/12 w-full rounded-xl text-center justify-center items-center h-max'>
                    <tr class='border-gray-300 border-2'>
                        <th class='p-2 border-gray-300 border-2 w-1/12'>เลขห้อง</th>
                        <th class='p-2 border-gray-300 border-2 w-2/12'></th>
                    </tr>
                    <tr class='border-gray-300 border-2' v-for="item in renter" :key="item">
                        <td class='p-2 border-gray-300 border-2 w-2/12'>{{item.num_room}}</td>
                        <td class='p-2 border-gray-300 border-2 w-1/12'>
                            <button @click="show_modal = !show_modal; show.push(item);" class="bg-[#2E4E73] hover:bg-gray-500 text-white w-full p-1 rounded-3xl text-center  cursor-pointer">แจ้งชำระ</button>
                        </td>
                    </tr>
                </table>
                <table class='basis-10/12 w-full rounded-xl text-center justify-center items-center h-max ml-5'>
                    <tr class='border-gray-300 border-2'>
                        <th class='p-2 border-gray-300 border-2'>เลขห้อง</th>
                        <th class='p-2 border-gray-300 border-2'>หน่วยน้ำ</th>
                        <th class='p-2 border-gray-300 border-2'>ค่าน้ำ</th>
                        <th class='p-2 border-gray-300 border-2'>หน่วยไฟ</th>
                        <th class='p-2 border-gray-300 border-2'>ค่าไฟ</th>
                        <th class='p-2 border-gray-300 border-2 w-2/12'>สถานะ</th>
                        <th class='p-2 border-gray-300 border-2 w-2/12'>ยืนยันการชำระเงิน</th>
                    </tr>
                    <tr class='border-gray-300 border-2' v-for="val in payment" :key="val">
                        <td class='p-2 border-gray-300 border-2 '>{{val.num_room}}</td>
                        <td class='p-2 border-gray-300 border-2'>{{val.water}}</td>
                        <td class='p-2 border-gray-300 border-2'>{{val.water*dorm[0].water}} บาท</td>
                        <td class='p-1 border-gray-300 border-2'>{{val.light}}</td>
                        <td class='p-2 border-gray-300 border-2'>{{val.light*dorm[0].light}} บาท</td>
                        <td class='p-2 border-gray-300 border-2 w-1/12' v-bind:class="{'text-emerald-500':val.status==1, 'text-red-600':val.status==0}" >{{val.status==0? 'ยังไม่ชำระ':'ชำระแล้ว'}}</td>
                        <td class='p-2 border-gray-300 border-2 w-1/12'>
                            <button @click="changeStatus(val.renter_id)" class="bg-[#2E4E73] hover:bg-gray-500 text-white w-full p-1 rounded-3xl text-center  cursor-pointer">ยืนยันการชำระเงิน</button>
                        </td>
                    </tr>
                </table>  
            </div>  
        </div>

        <div class="modal" v-bind:class="{'is-active':show_modal}">
            <div class="modal-background" @click="show_modal = !show_modal; show.splice(0);"  ></div>
            <div class="modal-card w-54" v-for="val in show" :key="val">
                <header class="modal-card-head">
                    <p class="modal-card-title w-full h-8">แจ้งชำระ {{val.id}}</p>
                </header> 
                <section class="modal-card-body flex flex-col justify-center content-center items-center">
                    <form id="payf" class="flex flex-col w-full justify-start content-start items-start space-y-3">
                        <label for="edit_fname">จำนวนน้ำ (/หน่วย)</label>
                        <input class="w-full p-2 border border-gray-300 border-solid rounded-lg" type="number" id="water">
                        <label for="edit_lname">จำนวนไฟ (/หน่วย)</label>
                        <input class="w-full p-2 border border-gray-300 border-solid rounded-lg" type="number" id="light" >
                        <div class="flex flex-row space-x-5 mt-3">
                            <input value="แจ้งชำระ" @click="regis(val.id, val.num_room); " class="bg-[#2E4E73] text-white p-2 w-20 hover:bg-emerald-700 rounded-xl">
                            <button @click="show_modal = !show_modal" class="bg-rose-500 text-white p-2 w-20 hover:bg-rose-700 rounded-xl">ยกเลิก</button>
                        </div>
                    </form>
                   
                </section>
            </div>
        </div>
        <FooterBar/>
    </section>
</template>

<script>
import NavBar from './NavBar.vue';
import FooterBar from './FooterBar.vue'
import axios from "axios";
import Swal from 'sweetalert2'
import emailjs from 'emailjs-com';

export default {
    components: {
        NavBar,
        FooterBar
    },
    data() {
        return {
          renter:null,
          payment:null,
          dorm:null,
          dormitory:null,
          userId : this.$route.params.userId,
          dorId : this.$route.params.dorId,
          show_modal: false,
          show:[],
          water:null,
          light:null,
          date:null,
          num_room:null,
          status: '0'
        };
    },
    created(){
        axios.get("http://localhost:3000/Dormitory/" + this.$route.params.userId+'/' + this.$route.params.dorId)
        .then((response) => {
            this.dormitory = response.data.dormitory[0];
            console.log(this.dormitory)
        })
        .catch((err) => {
            console.log(err);
        });
    }
    ,
    methods: {
        payAll(){
            this.renter=null;
            this.payment=null;
            axios.get("http://localhost:3000/renter/" + this.userId+'/'+this.dorId)
            .then((response) => {
                this.renter = response.data.renter[0];
                console.log(this.renter)
            })
            .catch((err) => {
                console.log(err);
            });

            let month = document.getElementById('date').value;
            axios.get("http://localhost:3000/payment/" + this.userId+'/'+this.dorId+'/'+month)
            .then((response) => {
                this.payment = response.data.payment[0];
                this.dorm = response.data.dorm[0];
                console.log(this.payment)
            })
            .catch((err) => {
                console.log(err);
            });
        },
        regis(id, num_room){
            let formData = new FormData();
            formData.append("water", document.getElementById('water').value);
            formData.append("light", document.getElementById('light').value);
            formData.append("num_room", num_room);
            formData.append("date", document.getElementById('date').value);
            formData.append("status", this.status);
            
            for (const value of formData.values()){
                console.log(value);
            }

            axios.post("http://localhost:3000/addPayment/"+this.userId+'/'+this.dorId+'/'+id, formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            })
            .then((response) => {
                console.log(response.data[0])
                this.sendEmail()
                Swal.fire({
                    position: 'center',
                    icon: 'success',
                    title: 'แจ้งชำระสำเร็จ',
                    showConfirmButton: false,
                    timer: 1500
                }).then(() => {
                    this.payAll()
                    this.show_modal = !this.show_modal
                })
            }).catch((err) => {
                console.log(err)
            })
        },
        changeStatus(id){
            let month = document.getElementById('date').value;
            axios.put("http://localhost:3000/editStatus/"+this.userId+'/'+this.dorId+'/'+id+'/'+month)
            .then((response) => {
                console.log(response.data[0])
                Swal.fire({
                    position: 'center',
                    icon: 'success',
                    title: 'ยืนยันการชำระ',
                    showConfirmButton: false,
                    timer: 1500
                }).then(() => {
                    this.payAll()
                })
            }).catch((err) => {
                console.log(err)
            })
        },
        sendEmail(){
            let formData = {
                "from_name": this.dormitory[0].name,
                "room": this.show[0].num_room,
                "month": document.getElementById('date').value,
                "price": this.show[0].price,
                "water": document.getElementById('water').value*this.dormitory[0].water,
                "num_w": document.getElementById('water').value,
                "light": document.getElementById('light').value*this.dormitory[0].light,
                "num_l": document.getElementById('light').value,
                "total": parseInt(document.getElementById('water').value*this.dormitory[0].water)+parseInt(document.getElementById('light').value*this.dormitory[0].light)+parseInt(this.show[0].price),
                "date": this.dormitory[0].duedate,
                "email": this.show[0].email,
            }

            emailjs.send('service_cczgqvd', 'template_rdu7t9c', formData, '6GRnsKGOMeF8oGpTo')
                .then((response) => {
                    console.log('Email ถูกส่งแล้ว', response);
                }).catch((err) => {
                    console.log(err)
                })
        }
    }
}
</script>

