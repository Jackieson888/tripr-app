<template>
  <header>
    <div class="container-fluid">
      <div class="row">
        <div class="col-12 text-center shadow-sm d-flex align-items-center justify-content-center head">
          <i @click="goToAccountPage" class="mdi selectable mdi-close f-26 close-btn"></i>
          <h1 class="heading-font t-shad">
            About Us
          </h1>
        </div>
      </div>
    </div>
  </header>
  <body class="">
    <div class="mt-4 container-fluid">
      <div class="row">
        <div class="col-12 d-flex flex-row justify-content-center p-0">
          <div class="d-flex">
            <img src="https://media-exp1.licdn.com/dms/image/C4E03AQF7hran7CDr4g/profile-displayphoto-shrink_200_200/0/1618256982954?e=1639612800&v=beta&t=2Fooc7xmJ5VlexI_Lzqf8Cdgy37C9FNrMOyIKHBlNOk" alt="" class="prof-pic">
          </div>
          <div class="ms-3">
            <h2 class=" me-3 head-font">
              Scott Fennie
            </h2>
            <div class="d-flex justify-content-end me-3">
              <a href="https://github.com/ScottFennie"><i class=" ps-1 mdi mdi-github f-22 text-primary"></i></a>
              <a href="https://www.linkedin.com/in/scott-fennie/"><i class=" ps-1 mdi mdi-linkedin f-22 text-primary"></i></a>
            </div>
          </div>
        </div>
        <div class="col-12 mt-4 d-flex flex-row justify-content-center p-0">
          <div class="ms-3">
            <h2 class=" me-3 head-font">
              Nathan Hendricks
            </h2>
            <div class="d-flex justify-content-start me-3">
              <a href="https://github.com/NathanHendricks"><i class=" ps-1 mdi mdi-github f-24 text-primary"></i></a>
              <a href="https://www.linkedin.com/in/nathan-hendricks-621998222/"><i class=" ps-1 mdi mdi-linkedin f-24 text-primary"></i></a>
            </div>
          </div>
          <div>
            <img src="https://ca.slack-edge.com/T1GGQN1RU-U02B8L2NZEH-5462bea7479a-512" alt="" class="prof-pic shadow">
          </div>
        </div>
        <div class="col-12 mt-4 d-flex flex-row justify-content-center p-0">
          <div>
            <img src="https://avatars.githubusercontent.com/u/86324061?v=4" alt="" class="prof-pic">
          </div>
          <div class="ms-3">
            <h2 class=" me-3 head-font">
              Drew McReynolds
            </h2>
            <div class="d-flex justify-content-end me-3">
              <a href="https://github.com/drewmcreynolds"><i class=" ps-1 mdi mdi-github f-22 text-primary"></i></a>
              <a href="https://www.linkedin.com/in/drewmcreynolds/"><i class=" ps-1 mdi mdi-linkedin f-22 text-primary"></i></a>
            </div>
          </div>
        </div>
        <div class="col-12 mt-4 d-flex flex-row justify-content-center p-0">
          <div class="ms-3">
            <h2 class=" me-3 head-font">
              Jackson Schacher
            </h2>
            <div class="d-flex justify-content-start me-3">
              <a href="https://github.com/JacksonSchacher"><i class=" ps-1 mdi mdi-github f-22 text-primary"></i></a>
              <a href="https://www.linkedin.com/in/jackson-schacher/">
                <i class=" ps-1 mdi mdi-linkedin f-22 text-primary"></i></a>
            </div>
          </div>
          <div>
            <img src="https://avatars.githubusercontent.com/u/84756850?v=4" alt="" class="prof-pic">
          </div>
        </div>
        <div class="col-12 mt-4 d-flex flex-row justify-content-center">
          <div>
            <img src="https://media-exp1.licdn.com/dms/image/C5603AQHi4kI0j-klbw/profile-displayphoto-shrink_200_200/0/1633567864628?e=1639612800&v=beta&t=cma8H1Oo_0Wf3LRDbolmk0ce76z-FsEc7W3PXdVM_MU" alt="" class="prof-pic">
          </div>
          <div class="ms-3">
            <h2 class=" me-3 head-font">
              Quinn Perri
            </h2>
            <div class="d-flex justify-content-end me-3">
              <a href="https://github.com/KranberryKin"><i class=" ps-1 mdi mdi-github f-22 text-primary"></i></a>
              <a href="https://www.linkedin.com/in/quinnton-perri-b12b18222/"><i class=" ps-1 mdi mdi-linkedin f-22 text-primary"></i></a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </body>
</template>

<script>
import { router } from '../router'
import Pop from '../utils/Pop'
export default {
  name: 'AboutPage',
  setup() {
    return {
      goToAccountPage() {
        try {
          router.push({ name: 'Login' })
        } catch (error) {
          Pop.toast(error.message, 'error')
        }
      }
    }
  }
}
</script>

<style lang="scss">
.head{
height: 10vh;
border-bottom: 2px #A28558 solid;

}
.heading-font {
color: #A28558;
font-family: museo-slab,serif;
font-weight: 600;
font-size: 2.25rem;
}
.prof-pic{
  border-radius: 50%;
  width: 15vh;
  z-index: 2;
  padding: 3vw;
  background-image: url(../assets/img/pic-bg.png);
  background-position: center;
  background-size: 35vw;
  filter: drop-shadow(2px 0 4px rgba(0, 0, 0, 0.25));
}
.head-font{
  font-family: museo-slab,serif;
  font-weight: 300;
  color: #A28558;
}
.t-shad{
    background-color: #A28558;
  color: transparent;
  text-shadow: 2px 2px 3px rgba(204, 163, 99, 0.5);
  -webkit-background-clip: text;
     -moz-background-clip: text;
          background-clip: text;
}
.close-btn {
  color: #A28558;
  position: absolute;
  right: 1vw;
  top: 0;
}
</style>
