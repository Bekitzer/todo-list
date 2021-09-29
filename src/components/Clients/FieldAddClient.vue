<template>
  <v-form @submit="addClient">
    <v-row>                  
      <v-col
        cols="12"
        sm="6"
        md="3"
      >
        <v-text-field
          v-model="clientName" 
          label="שם חברה/תאגיד"
          filled            
          hide-details  
        ></v-text-field>
      </v-col>
      <v-col
        cols="12"
        sm="6"
        md="3"
      >
        <v-text-field
          v-model="clientNumber" 
          label="מספר עוסק"
          filled            
          hide-details  
        ></v-text-field>
      </v-col>
      <v-col
        cols="12"
        sm="6"
        md="3"
      >
        <v-text-field
          v-model="clientType" 
          label="סוג חברה"
          filled            
          hide-details  
        ></v-text-field>
      </v-col>
      <v-col
        cols="12"
        sm="6"
        md="3"
      >
        <v-text-field
          v-model="clientAddress" 
          label="כתובת חברה"
          filled            
          hide-details  
        ></v-text-field>
      </v-col>
      <v-col
        cols="12"
        sm="6"
        md="3"
      >
        <v-text-field
          v-model="clientPhone" 
          label="טלפון חברה"
          filled            
          hide-details
        ></v-text-field>
      </v-col>      
      <v-col
        cols="12"
        sm="6"
        md="3"
      >
        <v-text-field
          v-model="clientContactPerson" 
          label="שם איש קשר"
          filled            
          hide-details
        ></v-text-field>
      </v-col>
      <v-col
        cols="12"
        sm="6"
        md="3"
      >
        <v-text-field
          v-model="clientContactPersonPhone" 
          label="טלפון איש קשר"
          filled            
          hide-details
        ></v-text-field>
      </v-col>
      <v-col
        cols="12"
        sm="6"
        md="3"
      >
        <v-btn 
          block
          height="56px"
          :disabled="clientFieldInvalid"
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
    name: 'FieldAddClient',
    data: () => ({ 
      clientName: '',
      clientNumber: '',
      clientType: '',
      clientAddress: '',
      clientPhone: '',            
      clientContactPerson: '',
      clientContactPersonPhone: '',      
    }),
    computed: {
      clientFieldInvalid() {
        return (
          !this.clientName ||
          !this.clientNumber ||
          !this.clientType ||
          !this.clientAddress ||
          !this.clientPhone ||
          !this.clientContactPerson ||
          !this.clientContactPersonPhone
        )
      }
    },
    methods:{
      addClient() {               
        if(!this.clientFieldInvalid){
          const clientFields = {
            name: this.clientName,
            number: this.clientNumber,
            type: this.clientType,
            address: this.clientAddress,
            phone: this.clientPhone,
            contactPerson: this.clientContactPerson,
            contactPersonPhone: this.clientContactPersonPhone
          }
         
          this.$store.dispatch('addClient', clientFields)
          this.clientName = ''
          this.clientNumber = ''
          this.clientType = ''
          this.clientAddress = ''
          this.clientPhone = ''      
          this.clientContactPerson = ''
          this.clientContactPersonPhone = '' 
        }        
      }
    }
  }
</script>