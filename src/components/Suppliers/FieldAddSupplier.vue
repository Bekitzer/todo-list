<template>
  <v-form @submit="addSupplier">
    <v-row
      class="pa-4"
    >
      <v-col
        cols="12"
        sm="6"
        md="2"
      >
        <v-text-field
          v-model="supplierName"
          label="שם ספק"
          outlined
          hide-details
        ></v-text-field>
      </v-col>
      <v-col
        cols="12"
        sm="6"
        md="2"
      >
        <v-text-field
          v-model="supplierPhone"
          label="טלפון משרד"
          outlined
          hide-details
        ></v-text-field>
      </v-col>
      <v-col
        cols="12"
        sm="6"
        md="2"
      >
        <v-text-field
          v-model="supplierEmail"
          label="אימייל"
          outlined
          hide-details
        ></v-text-field>
      </v-col>
      <v-col
        cols="12"
        sm="6"
        md="2"
      >
        <v-text-field
          v-model="supplierNumber"
          label="מספר עוסק"
          outlined
          hide-details
        ></v-text-field>
      </v-col>
      <v-col
        cols="12"
        sm="6"
        md="2"
      >
        <v-text-field
          v-model="supplierType"
          label="סוג חברה"
          outlined
          hide-details
        ></v-text-field>
      </v-col>
      <v-col
        cols="12"
        sm="6"
        md="2"
      >
        <v-text-field
          v-model="supplierAddress"
          label="כתובת חברה"
          outlined
          hide-details
        ></v-text-field>
      </v-col>
      <v-col
        cols="12"
        sm="6"
        md="2"
      >
        <v-text-field
          v-model="supplierContactPerson"
          label="שם איש קשר"
          outlined
          hide-details
        ></v-text-field>
      </v-col>
      <v-col
        cols="12"
        sm="6"
        md="2"
      >
        <v-text-field
          v-model="supplierContactPersonPhone"
          label="טלפון איש קשר"
          outlined
          hide-details
        ></v-text-field>
      </v-col>
      <v-col
        cols="12"
        sm="6"
        md="2"
      >
        <v-btn
          outlined
          block
          height="56px"
          :disabled="supplierFieldInvalid"
          type="submit"
        >
          שמור לקוח
        </v-btn>
      </v-col>
    </v-row>
  </v-form>
</template>

<script>
  export default {
    name: 'FieldAddSupplier',
    data: () => ({
      supplierName: '',
      supplierPhone: '',
      supplierEmail: '',
      supplierNumber: '',
      supplierType: '',
      supplierAddress: '',
      supplierContactPerson: '',
      supplierContactPersonPhone: '',
    }),
    computed: {
      supplierFieldInvalid() {
        return (
          !this.supplierName ||
          !this.supplierPhone ||
          !this.supplierEmail ||
          !this.supplierNumber ||
          !this.supplierType ||
          !this.supplierAddress ||
          !this.supplierContactPerson ||
          !this.supplierContactPersonPhone
        )
      }
    },
    methods:{
      addSupplier() {
        if(!this.supplierFieldInvalid){
          const supplierFields = {
            name: this.supplierName,
            phone: this.supplierPhone,
            email: this.supplierEmail,
            number: this.supplierNumber,
            type: this.supplierType,
            address: this.supplierAddress,
            contactPerson: this.supplierContactPerson,
            contactPersonPhone: this.supplierContactPersonPhone
          }

          this.$store.dispatch('addSupplier', supplierFields)
          this.supplierName = ''
          this.supplierPhone = ''
          this.supplierEmail = ''
          this.supplierNumber = ''
          this.supplierType = ''
          this.supplierAddress = ''
          this.supplierContactPerson = ''
          this.supplierContactPersonPhone = ''
        }
      }
    }
  }
</script>