var app = new Vue({
    el: '#table',
    data: {
        arrayUsers: [],
        selectedGender: "",
        quantityEntered: null,
        error: false,
        user: [],
        selectedRow: "",
    },   
    methods: {
        genderFilter(){
            this.arrayUsers = JSON.parse(localStorage.getItem("tableUsers"));
            if(this.selectedGender == "all"){
                this.arrayUsers = JSON.parse(localStorage.getItem("tableUsers"));
            } else {
                const fil = this.arrayUsers.filter(user => user.gender == this.selectedGender)
                this.arrayUsers = fil; 
            }
        },
        quanFilter() {
            this.arrayUsers = JSON.parse(localStorage.getItem("tableUsers"));
            if (this.quantityEntered > this.arrayUsers.length || this.quantityEntered < 0){
                this.error = true;
            } else {
                this.error = false;
                let number = Number(this.quantityEntered);
                let newArray = this.arrayUsers.slice(0, number)
                this.arrayUsers = newArray;
            }
        },
        deleteRow(index){
            this.arrayUsers.splice(index, 1)
        },
        logout() {
            window.location = "../index.html";
        }
    },
    mounted(){
        
    },
    created(){
        let users = JSON.parse(localStorage.getItem("users"));
        let username = localStorage.getItem("name");
        let index = users.findIndex(ul => ul.username === username)
        users.splice(index, 1);
        this.arrayUsers = users;
        localStorage.setItem("tableUsers", JSON.stringify(this.arrayUsers))
        this.user = JSON.parse(localStorage.getItem("client"));
    }
  })