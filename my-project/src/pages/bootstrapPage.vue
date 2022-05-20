<template>
  <div>
    <div>
      <b-button size="sm">default sm</b-button>
      <b-button variant="outline-danger">outline-danger</b-button>
      <b-button variant="success" size="lg">success lg</b-button>
      <b-button variant="outline-primary">outline-primary</b-button>
      <b-button href="#">I am a Link,jump #</b-button>
    </div>
    <div>
      <b-button variant="primary" squared >Primary squared </b-button>
      <b-button variant="link" href="#">link</b-button>
      <b-button pill  variant="success">pill</b-button>
      <b-button variant="danger" disabled >Danger disabled </b-button>
      <b-button variant="warning">Warning</b-button>
      <b-button pill  variant="info">Info</b-button>
      <b-button variant="light">Light</b-button>
      <b-button variant="dark">Dark</b-button>
    </div>
    <div>
      <b-button-group vertical>
        <b-button variant="success">Success</b-button>
        <b-button variant="info">Info</b-button>
        <b-button variant="warning">Warning</b-button>
      </b-button-group>

      <b-button-group>
        <b-button>Button 1</b-button>
        <b-button>Button 2</b-button>
        <b-button>Button 3</b-button>
      </b-button-group>

      <b-button-group>
<!--          <b-button>Button</b-button>-->
        <b-dropdown right text="Menu">
          <b-dropdown-item>Item 1</b-dropdown-item>
          <b-dropdown-item>Item 2</b-dropdown-item>
          <b-dropdown-divider></b-dropdown-divider>
          <b-dropdown-item>Item 3</b-dropdown-item>
        </b-dropdown>
        <b-dropdown right split text="Split Menu">
          <b-dropdown-item>Item 1</b-dropdown-item>
          <b-dropdown-item>Item 2</b-dropdown-item>
          <b-dropdown-divider></b-dropdown-divider>
          <b-dropdown-item>Item 3</b-dropdown-item>
        </b-dropdown>
      </b-button-group>
    </div>
    <div>
      <b-calendar v-model="date" @context="onContext"></b-calendar>
    </div>
    <div>
      <b-card
        title="Card Title"
        img-src="https://picsum.photos/600/300/?image=25"
        img-alt="Image"
        img-top
        tag="article"
        style="max-width: 20rem;"
        class="mb-2"
      >
        <b-card-text>
          Some quick example text to build on the card title and make up the bulk of the card's content.
        </b-card-text>

        <b-button href="#" variant="primary">Go somewhere</b-button>
      </b-card>
      <b-card
        overlay
        img-src="https://picsum.photos/900/250/?image=3"
        img-alt="Card Image"
        text-variant="white"
        title="Image Overlay"
        sub-title="Subtitle"
      >
        <b-card-text>
          Some quick example text to build on the card and make up the bulk of the card's content.
        </b-card-text>
      </b-card>
    </div>
    <div>
      <b-card-group deck>
        <b-card
          header="featured"
          header-tag="header"
          footer="Card Footer"
          footer-tag="footer"
          title="Title"
        >
          <b-card-text>Header and footers using props.</b-card-text>
          <b-button href="#" variant="primary">Go somewhere</b-button>
        </b-card>

        <b-card title="Title" header-tag="header" footer-tag="footer">
          <template v-slot:header>
            <h6 class="mb-0">Header Slot</h6>
          </template>
          <b-card-text>Header and footers using slots.</b-card-text>
          <b-button href="#" variant="primary">Go somewhere</b-button>
          <template v-slot:footer>
            <em>Footer Slot</em>
          </template>
        </b-card>
      </b-card-group>
    </div>
    <div>
      <b-card no-body class="overflow-hidden" style="max-width: 540px;">
        <b-row no-gutters>
          <b-col md="6">
            <b-card-img src="https://picsum.photos/400/400/?image=20" class="rounded-0"></b-card-img>
          </b-col>
          <b-col md="6">
            <b-card-body title="Horizontal Card">
              <b-card-text>
                This is a wider card with supporting text as a natural lead-in to additional content.
                This content is a little bit longer.
              </b-card-text>
            </b-card-body>
          </b-col>
        </b-row>
      </b-card>
    </div>
    <div>
        <b-card-group>
          <b-card title="Title" img-src="https://placekitten.com/g/300/450" img-alt="Image" img-top>
            <b-card-text>
              This is a wider card with supporting text below as a natural lead-in to additional content.
              This content is a little bit longer.
            </b-card-text>
            <template v-slot:footer>
              <small class="text-muted">Last updated 3 mins ago</small>
            </template>
          </b-card>

          <b-card title="Title" img-src="https://placekitten.com/g/300/450" img-alt="Image" img-top>
            <b-card-text>
              This card has supporting text below as a natural lead-in to additional content.
            </b-card-text>
            <template v-slot:footer>
              <small class="text-muted">Last updated 3 mins ago</small>
            </template>
          </b-card>

          <b-card title="Title" img-src="https://placekitten.com/g/300/450" img-alt="Image" img-top>
            <b-card-text>
              This is a wider card with supporting text below as a natural lead-in to additional content.
              This card has even longer content than the first to show that equal height action.
            </b-card-text>
            <template v-slot:footer>
              <small class="text-muted">Last updated 3 mins ago</small>
            </template>
          </b-card>
        </b-card-group>
      </div>
    <div>
      <b-carousel
        id="carousel-fade"
        style="text-shadow: 0px 0px 2px #000"
        controls
        indicators
        img-width="1024"
        img-height="480"
      >
        <b-carousel-slide
          caption="First slide"
          img-src="https://picsum.photos/1024/480/?image=10"
        ></b-carousel-slide>
      </b-carousel>
    </div>
    <div>
      <b-button v-b-toggle.collapse-1 variant="primary">Toggle Collapse</b-button>
      <b-collapse id="collapse-1" class="mt-2">
        <b-card>
          <p class="card-text">Collapse contents Here</p>
          <b-button v-b-toggle.collapse-1-inner size="sm">Toggle Inner Collapse</b-button>
          <b-collapse id="collapse-1-inner" class="mt-2">
            <b-card>Hello!</b-card>
          </b-collapse>
        </b-card>
      </b-collapse>
    </div>
    <div>
      <b-dropdown text="Button text via Prop">
        <b-dropdown-item href="#">An item</b-dropdown-item>
        <b-dropdown-item href="#">Another item</b-dropdown-item>
      </b-dropdown>

      <b-dropdown>
        <template v-slot:button-content>
          Custom <strong>Content</strong> with <em>HTML</em> via Slot
        </template>
        <b-dropdown-item href="#">An item</b-dropdown-item>
        <b-dropdown-item href="#">Another item</b-dropdown-item>
      </b-dropdown>
    </div>
    <div>
      <b-form @submit="onSubmit" @reset="onReset" v-if="show">
        <b-form-group
          id="input-group-1"
          label="Email address:"
          label-for="input-1"
          description="We'll never share your email with anyone else."
        >
          <b-form-input
            id="input-1"
            v-model="form.email"
            type="email"
            required
            placeholder="Enter email"
          ></b-form-input>
        </b-form-group>

        <b-form-group id="input-group-2" label="Your Name:" label-for="input-2">
          <b-form-input
            id="input-2"
            v-model="form.name"
            required
            placeholder="Enter name"
          ></b-form-input>
        </b-form-group>

        <b-form-group id="input-group-3" label="Food:" label-for="input-3">
          <b-form-select
            id="input-3"
            v-model="form.food"
            :options="foods"
            required
          ></b-form-select>
        </b-form-group>

        <b-form-group id="input-group-4">
          <b-form-checkbox-group v-model="form.checked" id="checkboxes-4">
            <b-form-checkbox value="me">Check me out</b-form-checkbox>
            <b-form-checkbox value="that">Check that out</b-form-checkbox>
          </b-form-checkbox-group>
        </b-form-group>
        <b-form-group id="input-group-5">
          <b-form-datepicker id="example-datepicker" required v-model="form.date" class="mb-2"></b-form-datepicker>
        </b-form-group>
        <b-form-group id="input-group-6">
          <b-form-select id="example-weekdays" v-model="form.weekday" :options="weekdays" class="mb-2"></b-form-select>
          <b-form-timepicker v-model="form.timepicker" locale="en"></b-form-timepicker>
        </b-form-group>

        <b-button type="submit" variant="primary">Submit</b-button>
        <b-button type="reset" variant="danger">Reset</b-button>
      </b-form>
      <b-card class="mt-3" header="Form Data Result">
        <pre class="m-0">{{ form }}</pre>
      </b-card>
    </div>
    <div>
      <b-img src="https://picsum.photos/300/150/?image=41" fluid alt="Fluid image"></b-img>
    </div>
    <div>
      <b-container fluid class="p-4 bg-dark">
        <b-row>
          <b-col>
            <b-img thumbnail fluid src="https://picsum.photos/250/250/?image=54" alt="Image 1"></b-img>
          </b-col>
          <b-col>
            <b-img thumbnail fluid src="https://picsum.photos/250/250/?image=58" alt="Image 2"></b-img>
          </b-col>
          <b-col>
            <b-img thumbnail fluid src="https://picsum.photos/250/250/?image=59" alt="Image 3"></b-img>
          </b-col>
        </b-row>
      </b-container>
    </div>
    <div>
      <b-jumbotron header="BootstrapVue" lead="Bootstrap v4 Components for Vue.js 2">
        <p>For more information visit website</p>
        <b-button variant="primary" href="#">More Info</b-button>
      </b-jumbotron>
    </div>
    <div>
      <b-list-group>
        <b-list-group-item>Cras justo odio</b-list-group-item>
        <b-list-group-item active>Dapibus ac facilisis in</b-list-group-item>
        <b-list-group-item>Morbi leo risus</b-list-group-item>
        <b-list-group-item>Porta ac consectetur ac</b-list-group-item>
        <b-list-group-item>Vestibulum at eros</b-list-group-item>
      </b-list-group>
    </div>
    <div>
      <b-button v-b-modal.modal-1>Launch demo modal</b-button>
      <!-- Using value -->
      <b-button v-b-modal="'modal-1'">Show Modal</b-button>
      <b-button id="show-btn" @click="$bvModal.show('modal-1')">Open Modal</b-button>
      <b-modal id="modal-1" title="BootstrapVue" hide-footer>
        <p class="my-4">Hello from modal!</p>
        <b-button class="mt-3" block @click="$bvModal.hide('modal-1')">Close Me</b-button>
      </b-modal>
    </div>
    <div>
      <!-- Image and text -->
      <b-navbar variant="faded" type="light">
        <b-navbar-brand href="#">
          <img src="https://placekitten.com/g/30/30" class="d-inline-block align-top" alt="Kitten">
          BootstrapVue navbar-brand
        </b-navbar-brand>
      </b-navbar>
    </div>
    <div>
      <!-- Use text in props -->
      <b-pagination
        v-model="currentPage"
        :total-rows="rows"
        :per-page="perPage"
        first-text="First"
        prev-text="Prev"
        next-text="Next"
        last-text="Last"
      ></b-pagination>
      <!-- Use emojis in props -->
      <b-pagination
        v-model="currentPage"
        :total-rows="rows"
        :per-page="perPage"
        first-text="⏮"
        prev-text="⏪"
        next-text="⏩"
        last-text="⏭"
        class="mt-4"
      ></b-pagination>
    </div>
    <div class="text-center my-3">
      <b-button v-b-popover.hover.top="'I am popover directive content!'" title="Popover Title">
        Hover Me
      </b-button>

      <b-button id="popover-target-1">
        Hover Me
      </b-button>
      <b-popover target="popover-target-1" triggers="hover" placement="top">
        <template v-slot:title>Popover Title</template>
        I am popover <b>component</b> content!
      </b-popover>
    </div>
    <div>
      <b-progress :value="value" :max="max" show-progress animated></b-progress>
      <b-progress class="mt-2" :max="max" show-value>
        <b-progress-bar :value="value * (6 / 10)" variant="success"></b-progress-bar>
        <b-progress-bar :value="value * (2.5 / 10)" variant="warning"></b-progress-bar>
        <b-progress-bar :value="value * (1.5 / 10)" variant="danger"></b-progress-bar>
      </b-progress>

      <b-button class="mt-3" @click="randomValue">Click me</b-button>
    </div>
    <div>
      <b-button variant="primary" disabled>
        <b-spinner small></b-spinner>
        <span class="sr-only">Loading...</span>
      </b-button>

      <b-button variant="primary" disabled>
        <b-spinner small type="grow"></b-spinner>
        Loading...
      </b-button>
    </div>
    <div class="text-center">
      <b-spinner label=""></b-spinner>
      <b-spinner type="grow" label=""></b-spinner>
      <b-spinner variant="primary" label=""></b-spinner>
      <b-spinner variant="primary" type="grow" label=""></b-spinner>
      <b-spinner variant="success" label=""></b-spinner>
      <b-spinner variant="success" type="grow" label=""></b-spinner>
    </div>
    <div>
      <b-table striped hover bordered outlined :items="items" :fields="fields"></b-table>
    </div>
    <div>
      <b-table :items="items" :fields="fields" striped responsive="sm">
        <template v-slot:cell(show_details)="row">
          <b-button size="sm" @click="row.toggleDetails" class="mr-2">
            {{ row.detailsShowing ? 'Hide' : 'Show'}} Details
          </b-button>

          <!-- As `row.showDetails` is one-way, we call the toggleDetails function on @change -->
          <b-form-checkbox v-model="row.detailsShowing" @change="row.toggleDetails">
            Details via check
          </b-form-checkbox>
        </template>

        <template v-slot:row-details="row">
          <b-card>
            <b-row class="mb-2">
              <b-col sm="3" class="text-sm-right"><b>Age:</b></b-col>
              <b-col>{{ row.item.age }}</b-col>
            </b-row>

            <b-row class="mb-2">
              <b-col sm="3" class="text-sm-right"><b>Is Active:</b></b-col>
              <b-col>{{ row.item.isActive }}</b-col>
            </b-row>

            <b-button size="sm" @click="row.toggleDetails">Hide Details</b-button>
          </b-card>
        </template>
      </b-table>
    </div>
    <div>
      <b-card no-body>
        <b-tabs pills card vertical>
          <b-tab title="Tab 1" active><b-card-text>Tab contents 1</b-card-text></b-tab>
          <b-tab title="Tab 2"><b-card-text>Tab contents 2</b-card-text></b-tab>
          <b-tab title="Tab 3"><b-card-text>Tab contents 3</b-card-text></b-tab>
        </b-tabs>
      </b-card>
    </div>
    <div>
      <b-tabs content-class="mt-3" lazy>
        <b-tab title="Tab 1"><b-alert show>I'm lazy mounted!</b-alert></b-tab>
        <b-tab title="Tab 2"><b-alert show>I'm lazy mounted too!</b-alert></b-tab>
      </b-tabs>
    </div>
    <div class="p-3 bg-secondary progress-bar-striped" style="min-height: 170px;">
      <b-button class="mb-2" variant="primary" @click="$bvToast.show('example-toast')">
        Show toast
      </b-button>
      <b-toast id="example-toast" title="BootstrapVue" static no-auto-hide>
        Hello, world! This is a toast message.
      </b-toast>
    </div>
    <div>
      <b-button @click="makeToast()" class="mb-2">Default</b-button>
      <b-button variant="primary" @click="makeToast('primary')" class="mb-2">Primary</b-button>
      <b-button variant="secondary" @click="makeToast('secondary')" class="mb-2">Secondary</b-button>
      <b-button variant="danger" @click="makeToast('danger')" class="mb-2">Danger</b-button>
      <b-button variant="warning" @click="makeToast('warning')" class="mb-2">Warning</b-button>
      <b-button variant="success" @click="makeToast('success')" class="mb-2">Success</b-button>
      <b-button variant="info" @click="makeToast('info')" class="mb-2">Info</b-button>
    </div>
    <div class="text-center my-3">
      <b-button v-b-tooltip.hover title="Tooltip directive content">
        Hover Me
      </b-button>

      <b-button id="tooltip-target-1">
        Hover Me
      </b-button>
      <b-tooltip target="tooltip-target-1" triggers="hover">
        I am tooltip <b>component</b> content!
      </b-tooltip>
    </div>
    <div>
      <b-icon-alarm></b-icon-alarm>
      <b-icon-backspace-reverse></b-icon-backspace-reverse>
      <b-icon icon="trophy"></b-icon>
    </div>
    <div class="h2 mb-0">
      <b-icon icon="battery-full" style="color: #7952b3;"></b-icon>
      <b-button size="sm" class="mb-2">
        <b-icon icon="gear-fill"></b-icon> Settings
      </b-button>
      <b-button variant="primary" class="mb-2">
        Pay now <b-icon icon="credit-card"></b-icon>
      </b-button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'bootstrapPage',
  data(){
    return {
      fields: ['first_name', 'last_name', 'show_details'],
      items: [
        { isActive: true, age: 40, first_name: 'Dickerson', last_name: 'Macdonald' },
        { isActive: false, age: 21, first_name: 'Larsen', last_name: 'Shaw' },
        {
          isActive: false,
          age: 89,
          first_name: 'Geneva',
          last_name: 'Wilson',
          _showDetails: true
        },
        { isActive: true, age: 38, first_name: 'Jami', last_name: 'Carney' }
      ],
      date:null,
      value: 45,
      max: 100,
      rows: 100,
      perPage: 10,
      currentPage: 1,
      form: {
        email: '',
        name: '',
        food: null,
        date:'',
        timepicker:'',
        checked: [],
        weekday:'',
      },
      weekdays:[
        { value: 0, text: 'Sunday' },
        { value: 1, text: 'Monday' },
        { value: 6, text: 'Saturday' }
      ],
      foods: [{ text: 'Select One', value: null }, 'Carrots', { text: 'Beans', value: 2 }, 'Tomatoes', 'Corn'],
      show: true,
    }
  },
  methods:{
    onContext(e){
      console.log(e)
    },
    randomValue() {
      this.value = Math.random() * this.max
    },
    onSubmit(evt) {
      evt.preventDefault()
      alert(JSON.stringify(this.form))
    },
    onReset(evt) {
      evt.preventDefault()
      // Reset our form values
      this.form.email = ''
      this.form.name = ''
      this.form.date = ''
      this.form.weekday = ''
      this.form.food = null
      this.form.checked = []
      // Trick to reset/clear native browser form validation state
      this.show = false
      this.$nextTick(() => {
        this.show = true
      })
    },
    makeToast(variant = null) {
      this.$bvToast.toast('Toast body content', {
        title: `Variant ${variant || 'default'}`,
        variant: variant,
        solid: true
      })
    },
  },
  mounted() {
  }
}
</script>

<style scoped>
div{
  margin: 5px 0;
}
</style>
