let vm = new Vue({
    el: "#app",
    data: {
      users: [],
      userEntered: "",
      passwordEntered: "",
      error: false,
      aux: "",
    },
    methods: {
      verifyUser() {
        const userValidation = this.users.find((u) => u.username == this.userEntered);
        const passwordValidation = this.users.find((u) => u.password == this.passwordEntered);
  
        if (passwordValidation && userValidation) {
          let client = this.users.filter((u) => u.username == this.userEntered);
          localStorage.setItem("name", this.userEntered);
          localStorage.setItem("client", JSON.stringify(client));
          Swal.fire({
            icon: 'success',
            title: `Inicio sesión como ${client[0].name.first}`,
            showConfirmButton: false,
            timer: 1800
          })
          this.error = false;
            setTimeout(function() {
              window.location = "./Table/table.html";
              // window.location = "#";
            }, 2000);
        } else {
          this.error = true;
          Swal.fire({
            icon: 'error',
            title: 'Inicio de sesión fallido',
            text: 'Revise sus credenciales de ingreso.',
            showConfirmButton: false,
            timer: 2500
          })
        }
      },
      // async getFlag(endpoint){
      //   try {
      //     let url = `https://countryflagsapi.com/png/${endpoint}`
      //     const response = await fetch(url)
      //     const data = await response.json();
      //     console.log("Aquí"+data)
      //   }
      //   catch(e){
      //     console.log(e);
      //   }
      //     // let url = `https://countryflagsapi.com/png/${endpoint}`
      //     // await fetch(url)
      //     // .then(response => response.url.json())
      //     // .then(d => (this.users.url = d))
      // },
      async getUsers(){
        await fetch("https://randomuser.me/api/?results=10")
        .then(response => response.json())
        .then(d => (this.users = d.results))
        this.updateLocalStorage();
      },
      // updateFlag() {
      //   this.users.forEach(e => {
      //     this.getFlag(e.country);
      //     console.log(this.aux)
      //   });
      // },
        updateLocalStorage(){
            let aux = [];
            this.users.map(u => {
              // let flag = this.getFlag(u.location.country, aux)
              // console.log(flag)
                aux.push({
                    pic: u.picture.medium,
                    name: u.name,
                    age: u.dob.age,
                    country: u.location.country,
                    email: u.email,
                    phone: u.phone,
                    cell: u.cell,
                    gender: u.gender,
                    username: u.login.username,
                    password: u.login.password,
                    url: "",
                })
                ;
            })
            this.users = aux;
            // this.updateFlag()
            localStorage.setItem("users", JSON.stringify(this.users))
        },
    },
    created() {
        localStorage.getItem("users") != null ? this.users = JSON.parse(localStorage.getItem("users")) : this.getUsers();
    }, 
    mounted(){
      
    }

  });