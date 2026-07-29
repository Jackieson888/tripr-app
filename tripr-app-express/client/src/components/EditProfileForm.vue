<template>
  <form @submit.prevent="handleSubmit()">
    <div class="row d-flex bord p-0 mt-3">
      <label for="name" class="visually-hidden">Name:</label>
      <input type="text"
             class="form-control bord bg-primary p-3"
             name="name"
             id="name"
             placeholder="Name.."
             v-model="editable.name"
             required
      >
    </div>
    <div class="row d-flex bord mt-3">
      <label for="picture" class="visually-hidden">Picture:</label>
      <input type="img url"
             class="form-control bord bg-primary  p-3"
             name="picture"
             id="picture"
             placeholder="Picture.."
             v-model="editable.picture"
             required
      >
    </div>
    <div class="row">
      <div class="col-md-6">
        <button type="submit" class="btn btn-primary mt-3 p-3 text-shadow">
          <i>
            Update:
          </i>
        </button>
      </div>
    </div>
  </form>
</template>

<script>
import { ref } from '@vue/reactivity'
import { accountService } from '../services/AccountService.js'
import Pop from '../utils/Pop.js'
import { Modal } from 'bootstrap'
export default {
  setup() {
    const editable = ref({})
    return {
      editable,
      async handleSubmit() {
        try {
          await accountService.editProfile(editable.value)
          Pop.toast('Profile was Edited', 'success')
          const modal = Modal.getInstance(document.getElementById('editprofile-modal'))
          modal.hide()
          editable.value = {}
        } catch (error) {
          Pop.toast(error.message, 'error')
        }
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.text-shadow {
  border-radius: 3px;
  padding: .15rem 1rem;
  border: 3px dashed rgba(255,255,255,0.5);
  color: #A28558;
  text-shadow: 0px 2px 2px rgba(255,255,255,0.5);
}
.bord{
  border-color: rgb(44, 44, 44, 0.25);
  border-style: dashed;
  border-radius: 10px;
  padding: 0;}
</style>
